import { Router, Request, Response } from 'express';
import ContactMessage from '../models/ContactMessage';
import { authenticate, authorize } from '../middleware/auth';
import { sendContactNotification, sendConfirmationEmail } from '../services/emailService';
import { formLimiter } from '../middleware/rateLimiter';

const router = Router();

// PUBLIC
router.post('/', formLimiter, async (req: Request, res: Response) => {
  try {
    const message = await ContactMessage.create(req.body);

    try {
      await sendContactNotification(req.body);
      await sendConfirmationEmail(req.body.email, req.body.name, 'contact');
    } catch { /* email failure shouldn't block submission */ }

    res.status(201).json({ success: true, data: { message: 'Message sent successfully' } });
  } catch (err: any) { res.status(400).json({ success: false, error: { code: 'SUBMIT_FAILED', message: err.message } }); }
});

// ADMIN
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const data = await ContactMessage.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, data });
  } catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch messages' } }); }
});

router.patch('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const msg = await ContactMessage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!msg) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Message not found' } });
    res.json({ success: true, data: msg });
  } catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to update message' } }); }
});

router.delete('/:id', authenticate, authorize('super_admin'), async (req: Request, res: Response) => {
  try { await ContactMessage.findByIdAndDelete(req.params.id); res.json({ success: true, data: { message: 'Message deleted' } }); }
  catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to delete' } }); }
});

export default router;
