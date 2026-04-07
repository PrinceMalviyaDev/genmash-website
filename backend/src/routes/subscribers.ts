import { Router, Request, Response } from 'express';
import Subscriber from '../models/Subscriber';
import { authenticate } from '../middleware/auth';
import { formLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/', formLimiter, async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Email is required' } });

    const existing = await Subscriber.findOne({ email });
    if (existing) {
      if (!existing.isActive) {
        existing.isActive = true;
        existing.unsubscribedAt = undefined as any;
        await existing.save();
      }
      return res.json({ success: true, data: { message: 'Subscribed successfully' } });
    }

    await Subscriber.create({ email });
    res.status(201).json({ success: true, data: { message: 'Subscribed successfully' } });
  } catch (err: any) { res.status(400).json({ success: false, error: { code: 'SUBSCRIBE_FAILED', message: err.message } }); }
});

router.get('/', authenticate, async (_req: Request, res: Response) => {
  try {
    const data = await Subscriber.find({ isActive: true }).sort({ subscribedAt: -1 }).lean();
    res.json({ success: true, data });
  } catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch subscribers' } }); }
});

export default router;
