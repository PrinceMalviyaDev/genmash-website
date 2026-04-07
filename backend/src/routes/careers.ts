import { Router, Request, Response } from 'express';
import JobPosting from '../models/JobPosting';
import Application from '../models/Application';
import { authenticate, authorize } from '../middleware/auth';
import { uploadDocument } from '../middleware/upload';
import { uploadToCloudinary } from '../services/uploadService';
import { sendApplicationNotification, sendConfirmationEmail } from '../services/emailService';
import { formLimiter } from '../middleware/rateLimiter';

const router = Router();

// PUBLIC
router.get('/', async (_req: Request, res: Response) => {
  try {
    const data = await JobPosting.find({ isActive: true }).sort({ postedAt: -1 }).lean();
    res.json({ success: true, data });
  } catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch jobs' } }); }
});

router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const job = await JobPosting.findOne({ slug: req.params.slug, isActive: true }).lean();
    if (!job) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Job not found' } });
    res.json({ success: true, data: job });
  } catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch job' } }); }
});

// PUBLIC - Apply
router.post('/apply', formLimiter, uploadDocument.single('resume'), async (req: Request, res: Response) => {
  try {
    let resumeUrl = '';
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'resumes');
      resumeUrl = result.url;
    }

    const application = await Application.create({ ...req.body, resume: resumeUrl });

    try {
      await sendApplicationNotification({ name: req.body.name, email: req.body.email, role: req.body.role, experience: req.body.experience });
      await sendConfirmationEmail(req.body.email, req.body.name, 'application');
    } catch { /* email failure shouldn't block submission */ }

    res.status(201).json({ success: true, data: application });
  } catch (err: any) { res.status(400).json({ success: false, error: { code: 'SUBMIT_FAILED', message: err.message } }); }
});

// ADMIN
router.post('/', authenticate, authorize('super_admin', 'editor'), async (req: Request, res: Response) => {
  try { res.status(201).json({ success: true, data: await JobPosting.create(req.body) }); }
  catch (err: any) { res.status(400).json({ success: false, error: { code: 'CREATE_FAILED', message: err.message } }); }
});

router.put('/:id', authenticate, authorize('super_admin', 'editor'), async (req: Request, res: Response) => {
  try {
    const job = await JobPosting.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!job) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Job not found' } });
    res.json({ success: true, data: job });
  } catch (err: any) { res.status(400).json({ success: false, error: { code: 'UPDATE_FAILED', message: err.message } }); }
});

router.delete('/:id', authenticate, authorize('super_admin'), async (req: Request, res: Response) => {
  try { await JobPosting.findByIdAndDelete(req.params.id); res.json({ success: true, data: { message: 'Job deleted' } }); }
  catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to delete' } }); }
});

router.get('/:id/applications', authenticate, async (req: Request, res: Response) => {
  try {
    const data = await Application.find({ jobPosting: req.params.id }).sort({ createdAt: -1 }).lean();
    res.json({ success: true, data });
  } catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch applications' } }); }
});

router.patch('/applications/:id', authenticate, authorize('super_admin', 'editor'), async (req: Request, res: Response) => {
  try {
    const app = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!app) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Application not found' } });
    res.json({ success: true, data: app });
  } catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to update application' } }); }
});

export default router;
