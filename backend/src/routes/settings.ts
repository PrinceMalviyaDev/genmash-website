import { Router, Request, Response } from 'express';
import SiteSettings from '../models/SiteSettings';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const settings = await SiteSettings.findOneAndUpdate({}, {}, { new: true, upsert: true });
    res.json({ success: true, data: settings });
  } catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch settings' } }); }
});

router.put('/', authenticate, authorize('super_admin'), async (req: Request, res: Response) => {
  try {
    const settings = await SiteSettings.findOneAndUpdate({}, req.body, { new: true, upsert: true, runValidators: true });
    res.json({ success: true, data: settings });
  } catch (err: any) { res.status(400).json({ success: false, error: { code: 'UPDATE_FAILED', message: err.message } }); }
});

export default router;
