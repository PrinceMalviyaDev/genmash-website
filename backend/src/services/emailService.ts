import { transporter } from '../config/email';
import { env } from '../config/env';

const FROM = `"GenMash Software" <${env.SMTP_USER || 'noreply@genmash.com'}>`;

function emailTemplate(title: string, body: string): string {
  return `
  <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
    <div style="background:#2563eb;padding:24px 32px">
      <h1 style="color:#fff;margin:0;font-size:20px">GenMash Software Solutions</h1>
    </div>
    <div style="padding:32px">
      <h2 style="color:#0f172a;margin:0 0 16px">${title}</h2>
      ${body}
    </div>
    <div style="background:#f8fafc;padding:16px 32px;font-size:12px;color:#94a3b8;border-top:1px solid #e2e8f0">
      <p style="margin:0">GenMash Software Solutions &bull; Indore, India</p>
    </div>
  </div>`;
}

export async function sendContactNotification(data: { name: string; email: string; phone?: string; subject: string; message: string }) {
  const body = `
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
    <p><strong>Subject:</strong> ${data.subject}</p>
    <p><strong>Message:</strong></p>
    <p style="background:#f8fafc;padding:16px;border-radius:8px">${data.message}</p>
  `;

  await transporter.sendMail({
    from: FROM,
    to: env.SMTP_USER,
    subject: `New Contact: ${data.subject}`,
    html: emailTemplate('New Contact Message', body),
  });
}

export async function sendQuoteNotification(data: Record<string, any>) {
  const body = `
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
    <p><strong>Project Type:</strong> ${data.projectType}</p>
    <p><strong>Budget:</strong> ${data.budgetRange}</p>
    <p><strong>Timeline:</strong> ${data.timeline}</p>
    <p><strong>NDA Required:</strong> ${data.ndaRequired ? 'Yes' : 'No'}</p>
    <p><strong>Description:</strong></p>
    <p style="background:#f8fafc;padding:16px;border-radius:8px">${data.description}</p>
  `;

  await transporter.sendMail({
    from: FROM,
    to: env.SMTP_USER,
    subject: `New Quote Request from ${data.name}`,
    html: emailTemplate('New Quote Request', body),
  });
}

export async function sendApplicationNotification(data: { name: string; email: string; role: string; experience: string }) {
  const body = `
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Role:</strong> ${data.role}</p>
    <p><strong>Experience:</strong> ${data.experience}</p>
  `;

  await transporter.sendMail({
    from: FROM,
    to: env.SMTP_USER,
    subject: `New Job Application: ${data.role}`,
    html: emailTemplate('New Job Application', body),
  });
}

export async function sendConfirmationEmail(to: string, name: string, type: 'contact' | 'quote' | 'application') {
  const messages = {
    contact: 'Thank you for contacting us! We will get back to you within 24 hours.',
    quote: 'Thank you for your project inquiry! Our team will review your requirements and get back to you with a detailed quote within 48 hours.',
    application: 'Thank you for applying! We have received your application and will review it shortly.',
  };

  await transporter.sendMail({
    from: FROM,
    to,
    subject: 'Thank you for reaching out - GenMash Software Solutions',
    html: emailTemplate(`Hi ${name}!`, `<p>${messages[type]}</p><p>Best regards,<br>GenMash Team</p>`),
  });
}
