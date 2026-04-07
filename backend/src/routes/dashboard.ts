import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import Project from '../models/Project';
import BlogPost from '../models/BlogPost';
import ContactMessage from '../models/ContactMessage';
import QuoteRequest from '../models/QuoteRequest';
import Application from '../models/Application';
import Subscriber from '../models/Subscriber';

const router = Router();

router.get('/', authenticate, async (_req: Request, res: Response) => {
  try {
    const [projects, blogPosts, messages, unreadMessages, quotes, newQuotes, applications, subscribers] = await Promise.all([
      Project.countDocuments(),
      BlogPost.countDocuments({ status: 'published' }),
      ContactMessage.countDocuments(),
      ContactMessage.countDocuments({ isRead: false }),
      QuoteRequest.countDocuments(),
      QuoteRequest.countDocuments({ status: 'new' }),
      Application.countDocuments(),
      Subscriber.countDocuments({ isActive: true }),
    ]);

    const recentMessages = await ContactMessage.find().sort({ createdAt: -1 }).limit(5).lean();
    const recentQuotes = await QuoteRequest.find().sort({ createdAt: -1 }).limit(5).lean();

    res.json({
      success: true,
      data: {
        stats: { projects, blogPosts, messages, unreadMessages, quotes, newQuotes, applications, subscribers },
        recentMessages,
        recentQuotes,
      },
    });
  } catch { res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch dashboard data' } }); }
});

export default router;
