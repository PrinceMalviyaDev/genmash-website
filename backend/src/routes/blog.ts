import { Router, Request, Response } from 'express';
import BlogPost from '../models/BlogPost';
import { authenticate, authorize } from '../middleware/auth';
import { getPagination, paginationMeta } from '../utils/pagination';

const router = Router();

// PUBLIC
router.get('/', async (req: Request, res: Response) => {
  try {
    const { page, limit, skip } = getPagination(req.query as any);
    const filter: any = { status: 'published' };
    if (req.query.category) filter.category = req.query.category;
    if (req.query.tag) filter.tags = { $in: [req.query.tag] };
    if (req.query.search) filter.title = { $regex: req.query.search, $options: 'i' };

    const [data, total] = await Promise.all([
      BlogPost.find(filter).sort({ publishedAt: -1 }).skip(skip).limit(limit).lean(),
      BlogPost.countDocuments(filter),
    ]);
    res.json({ success: true, data, pagination: paginationMeta(total, page, limit) });
  } catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch posts' } }); }
});

router.get('/categories', async (_req: Request, res: Response) => {
  try {
    const categories = await BlogPost.distinct('category', { status: 'published' });
    res.json({ success: true, data: categories });
  } catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch categories' } }); }
});

router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findOneAndUpdate(
      { slug: req.params.slug, status: 'published' },
      { $inc: { views: 1 } },
      { new: true }
    ).lean();
    if (!post) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Post not found' } });
    res.json({ success: true, data: post });
  } catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch post' } }); }
});

// ADMIN
router.get('/admin/all', authenticate, async (req: Request, res: Response) => {
  try {
    const { page, limit, skip } = getPagination(req.query as any);
    const [data, total] = await Promise.all([
      BlogPost.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      BlogPost.countDocuments(),
    ]);
    res.json({ success: true, data, pagination: paginationMeta(total, page, limit) });
  } catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch posts' } }); }
});

router.post('/', authenticate, authorize('super_admin', 'editor'), async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.create(req.body);
    res.status(201).json({ success: true, data: post });
  } catch (err: any) { res.status(400).json({ success: false, error: { code: 'CREATE_FAILED', message: err.message } }); }
});

router.put('/:id', authenticate, authorize('super_admin', 'editor'), async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!post) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Post not found' } });
    res.json({ success: true, data: post });
  } catch (err: any) { res.status(400).json({ success: false, error: { code: 'UPDATE_FAILED', message: err.message } }); }
});

router.delete('/:id', authenticate, authorize('super_admin'), async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Post not found' } });
    res.json({ success: true, data: { message: 'Post deleted' } });
  } catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to delete post' } }); }
});

export default router;
