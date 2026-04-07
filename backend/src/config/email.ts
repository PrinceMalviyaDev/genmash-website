import nodemailer from 'nodemailer';
import { env } from './env';

export const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_PORT === 465,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export async function verifyEmailConnection() {
  try {
    if (env.SMTP_USER) {
      await transporter.verify();
      console.log('Email service ready');
    }
  } catch {
    console.warn('Email service not configured or unavailable');
  }
}
