import { Router, Response } from 'express';
import jwt from 'jsonwebtoken';
import type { StringValue } from 'ms';
import Admin from '../models/Admin';
import { env } from '../config/env';
import { authenticate, AuthRequest } from '../middleware/auth';
import { authLimiter } from '../middleware/rateLimiter';

const router = Router();

// POST /login
router.post('/login', authLimiter, async (req, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Email and password are required' } });
    }

    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } });
    }

    admin.lastLogin = new Date();
    await admin.save();

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRE as StringValue }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      // 'none' required for cross-domain cookies (frontend/backend on different subdomains)
      sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      data: { token, admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Login failed' } });
  }
});

// GET /me
router.get('/me', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const admin = await Admin.findById(req.admin!.id);
    if (!admin) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Admin not found' } });
    res.json({ success: true, data: admin });
  } catch {
    res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to get profile' } });
  }
});

// POST /forgot-password
router.post('/forgot-password', authLimiter, async (req, res: Response) => {
  // Placeholder — would send password reset email
  res.json({ success: true, data: { message: 'If an account with that email exists, a reset link has been sent.' } });
});

// POST /logout
router.post('/logout', (_req, res: Response) => {
  res.clearCookie('token');
  res.json({ success: true, data: { message: 'Logged out' } });
});

export default router;
