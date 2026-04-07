import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { env } from './config/env';
import { publicLimiter } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';

// Route imports
import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import blogRoutes from './routes/blog';
import serviceRoutes from './routes/services';
import testimonialRoutes from './routes/testimonials';
import clientRoutes from './routes/clients';
import pricingRoutes from './routes/pricing';
import teamRoutes from './routes/team';
import careerRoutes from './routes/careers';
import contactRoutes from './routes/contact';
import quoteRoutes from './routes/quotes';
import mediaRoutes from './routes/media';
import settingsRoutes from './routes/settings';
import subscriberRoutes from './routes/subscribers';
import dashboardRoutes from './routes/dashboard';

const app = express();

// Security
app.use(helmet());
app.use(cors({
  origin: env.FRONTEND_URL,
  credentials: true,
}));

// Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Logging
if (env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Rate limiting
app.use('/api/', publicLimiter);

// Routes
const v1 = '/api/v1';
app.use(`${v1}/auth`, authRoutes);
app.use(`${v1}/projects`, projectRoutes);
app.use(`${v1}/blog`, blogRoutes);
app.use(`${v1}/services`, serviceRoutes);
app.use(`${v1}/testimonials`, testimonialRoutes);
app.use(`${v1}/clients`, clientRoutes);
app.use(`${v1}/pricing`, pricingRoutes);
app.use(`${v1}/team`, teamRoutes);
app.use(`${v1}/careers`, careerRoutes);
app.use(`${v1}/contact`, contactRoutes);
app.use(`${v1}/quotes`, quoteRoutes);
app.use(`${v1}/media`, mediaRoutes);
app.use(`${v1}/settings`, settingsRoutes);
app.use(`${v1}/subscribers`, subscriberRoutes);
app.use(`${v1}/admin/dashboard`, dashboardRoutes);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use(errorHandler);

export default app;
