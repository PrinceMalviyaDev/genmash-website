import { Router, Request, Response } from 'express';
import Project from '../models/Project';
import { authenticate, authorize } from '../middleware/auth';
import { getPagination, paginationMeta } from '../utils/pagination';

const router = Router();

// PUBLIC
router.get('/', async (req: Request, res: Response) => {
  try {
    const { page, limit, skip } = getPagination(req.query as any);
    const filter: any = { isVisible: true };
    if (req.query.projectType) filter.projectType = req.query.projectType;
    if (req.query.technology) filter.technologies = { $in: [req.query.technology] };

    const [data, total] = await Promise.all([
      Project.find(filter).sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit).lean(),
      Project.countDocuments(filter),
    ]);
    res.json({ success: true, data, pagination: paginationMeta(total, page, limit) });
  } catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch projects' } }); }
});

router.get('/featured', async (_req: Request, res: Response) => {
  try {
    const data = await Project.find({ isVisible: true, isFeatured: true }).sort({ order: 1 }).limit(6).lean();
    res.json({ success: true, data });
  } catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch featured projects' } }); }
});

router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug, isVisible: true }).lean();
    if (!project) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Project not found' } });
    res.json({ success: true, data: project });
  } catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch project' } }); }
});

// ADMIN
router.post('/', authenticate, authorize('super_admin', 'editor'), async (req: Request, res: Response) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (err: any) { res.status(400).json({ success: false, error: { code: 'CREATE_FAILED', message: err.message } }); }
});

router.put('/:id', authenticate, authorize('super_admin', 'editor'), async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Project not found' } });
    res.json({ success: true, data: project });
  } catch (err: any) { res.status(400).json({ success: false, error: { code: 'UPDATE_FAILED', message: err.message } }); }
});

router.delete('/:id', authenticate, authorize('super_admin'), async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Project not found' } });
    res.json({ success: true, data: { message: 'Project deleted' } });
  } catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to delete project' } }); }
});

router.patch('/:id/reorder', authenticate, authorize('super_admin', 'editor'), async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, { order: req.body.order }, { new: true });
    if (!project) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Project not found' } });
    res.json({ success: true, data: project });
  } catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to reorder' } }); }
});

export default router;
