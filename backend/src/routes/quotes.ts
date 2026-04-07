import { Router, Request, Response } from 'express';
import QuoteRequest from '../models/QuoteRequest';
import { authenticate, authorize } from '../middleware/auth';
import { uploadDocument } from '../middleware/upload';
import { uploadToCloudinary } from '../services/uploadService';
import { sendQuoteNotification, sendConfirmationEmail } from '../services/emailService';
import { formLimiter } from '../middleware/rateLimiter';

const router = Router();

// PUBLIC
router.post('/', formLimiter, uploadDocument.single('attachment'), async (req: Request, res: Response) => {
  try {
    let attachmentUrl = '';
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'attachments');
      attachmentUrl = result.url;
    }

    const quote = await QuoteRequest.create({ ...req.body, attachment: attachmentUrl });

    try {
      await sendQuoteNotification(req.body);
      await sendConfirmationEmail(req.body.email, req.body.name, 'quote');
    } catch { /* email failure shouldn't block submission */ }

    res.status(201).json({ success: true, data: { message: 'Quote request submitted successfully' } });
  } catch (err: any) { res.status(400).json({ success: false, error: { code: 'SUBMIT_FAILED', message: err.message } }); }
});

// ADMIN
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const data = await QuoteRequest.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, data });
  } catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch quotes' } }); }
});

router.patch('/:id', authenticate, authorize('super_admin', 'editor'), async (req: Request, res: Response) => {
  try {
    const quote = await QuoteRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!quote) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Quote not found' } });
    res.json({ success: true, data: quote });
  } catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to update quote' } }); }
});

router.delete('/:id', authenticate, authorize('super_admin'), async (req: Request, res: Response) => {
  try { await QuoteRequest.findByIdAndDelete(req.params.id); res.json({ success: true, data: { message: 'Quote deleted' } }); }
  catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to delete' } }); }
});

export default router;
