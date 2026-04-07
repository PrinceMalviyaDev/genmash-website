import { Router, Request, Response } from 'express';
import Service from '../models/Service';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const data = await Service.find({ isActive: true }).sort({ order: 1 }).lean();
    res.json({ success: true, data });
  } catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch services' } }); }
});

router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, isActive: true }).lean();
    if (!service) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Service not found' } });
    res.json({ success: true, data: service });
  } catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch service' } }); }
});

router.post('/', authenticate, authorize('super_admin', 'editor'), async (req: Request, res: Response) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (err: any) { res.status(400).json({ success: false, error: { code: 'CREATE_FAILED', message: err.message } }); }
});

router.put('/:id', authenticate, authorize('super_admin', 'editor'), async (req: Request, res: Response) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!service) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Service not found' } });
    res.json({ success: true, data: service });
  } catch (err: any) { res.status(400).json({ success: false, error: { code: 'UPDATE_FAILED', message: err.message } }); }
});

router.delete('/:id', authenticate, authorize('super_admin'), async (req: Request, res: Response) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Service not found' } });
    res.json({ success: true, data: { message: 'Service deleted' } });
  } catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to delete service' } }); }
});

export default router;
