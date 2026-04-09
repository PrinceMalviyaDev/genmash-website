import { Router, Request, Response } from 'express';
import TeamMember from '../models/TeamMember';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const data = await TeamMember.find({ isVisible: true }).sort({ order: 1 }).lean();
    res.json({ success: true, data });
  } catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch team' } }); }
});

// ADMIN - list all including hidden
router.get('/admin/all', authenticate, async (_req: Request, res: Response) => {
  try {
    const data = await TeamMember.find().sort({ order: 1, createdAt: -1 }).lean();
    res.json({ success: true, data });
  } catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch team' } }); }
});

router.post('/', authenticate, authorize('super_admin', 'editor'), async (req: Request, res: Response) => {
  try { res.status(201).json({ success: true, data: await TeamMember.create(req.body) }); }
  catch (err: any) { res.status(400).json({ success: false, error: { code: 'CREATE_FAILED', message: err.message } }); }
});

router.put('/:id', authenticate, authorize('super_admin', 'editor'), async (req: Request, res: Response) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!member) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Member not found' } });
    res.json({ success: true, data: member });
  } catch (err: any) { res.status(400).json({ success: false, error: { code: 'UPDATE_FAILED', message: err.message } }); }
});

router.delete('/:id', authenticate, authorize('super_admin'), async (req: Request, res: Response) => {
  try { await TeamMember.findByIdAndDelete(req.params.id); res.json({ success: true, data: { message: 'Member deleted' } }); }
  catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to delete' } }); }
});

export default router;
