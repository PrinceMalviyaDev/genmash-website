import { Router, Request, Response } from 'express';
import Media from '../models/Media';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { uploadImage } from '../middleware/upload';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/uploadService';

const router = Router();

router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const filter: any = {};
    if (req.query.type) filter.type = req.query.type;
    const data = await Media.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ success: true, data });
  } catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch media' } }); }
});

router.post('/', authenticate, authorize('super_admin', 'editor'), uploadImage.single('file'), async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, error: { code: 'NO_FILE', message: 'No file uploaded' } });

    const folder = (req.body.folder as string) || 'general';
    const result = await uploadToCloudinary(req.file.buffer, folder);

    const media = await Media.create({
      filename: req.file.originalname,
      url: result.url,
      publicId: result.publicId,
      type: req.file.mimetype.startsWith('image/') ? 'image' : 'document',
      size: req.file.size,
      uploadedBy: req.admin!.id,
    });

    res.status(201).json({ success: true, data: media });
  } catch (err: any) { res.status(400).json({ success: false, error: { code: 'UPLOAD_FAILED', message: err.message } }); }
});

router.delete('/:id', authenticate, authorize('super_admin'), async (req: Request, res: Response) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Media not found' } });
    await deleteFromCloudinary(media.publicId);
    await Media.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: { message: 'Media deleted' } });
  } catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to delete media' } }); }
});

export default router;
