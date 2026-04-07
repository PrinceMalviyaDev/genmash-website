import { validateEnv, env } from './config/env';
import { connectDB } from './config/db';
import { verifyEmailConnection } from './config/email';
import app from './app';

async function start() {
  validateEnv();
  await connectDB();
  await verifyEmailConnection();

  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
