import { Router, Request, Response } from 'express';
import Client from '../models/Client';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const data = await Client.find({ isVisible: true }).sort({ order: 1 }).lean();
    res.json({ success: true, data });
  } catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch clients' } }); }
});

router.post('/', authenticate, authorize('super_admin', 'editor'), async (req: Request, res: Response) => {
  try { res.status(201).json({ success: true, data: await Client.create(req.body) }); }
  catch (err: any) { res.status(400).json({ success: false, error: { code: 'CREATE_FAILED', message: err.message } }); }
});

router.put('/:id', authenticate, authorize('super_admin', 'editor'), async (req: Request, res: Response) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!client) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Client not found' } });
    res.json({ success: true, data: client });
  } catch (err: any) { res.status(400).json({ success: false, error: { code: 'UPDATE_FAILED', message: err.message } }); }
});

router.delete('/:id', authenticate, authorize('super_admin'), async (req: Request, res: Response) => {
  try { await Client.findByIdAndDelete(req.params.id); res.json({ success: true, data: { message: 'Client deleted' } }); }
  catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to delete' } }); }
});

export default router;
