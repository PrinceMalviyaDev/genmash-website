import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function PrivacyPolicyPage() {
  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-slate-400 mb-10">Last updated: January 1, 2025</p>
        <div className="prose prose-slate max-w-none space-y-8">
          <div><h2 className="text-xl font-semibold text-slate-900 mb-3">1. Information We Collect</h2><p className="text-slate-600 leading-relaxed">We collect information you provide directly, such as your name, email, phone number, and project details when you fill out contact forms, quote requests, or job applications. We also collect usage data through analytics tools.</p></div>
          <div><h2 className="text-xl font-semibold text-slate-900 mb-3">2. How We Use Your Information</h2><p className="text-slate-600 leading-relaxed">We use your information to respond to inquiries, provide quotes, process job applications, send relevant communications, and improve our services. We do not sell your personal information to third parties.</p></div>
          <div><h2 className="text-xl font-semibold text-slate-900 mb-3">3. Cookies</h2><p className="text-slate-600 leading-relaxed">Our website uses cookies to enhance your browsing experience and analyze traffic through Google Analytics. You can control cookie preferences through your browser settings.</p></div>
          <div><h2 className="text-xl font-semibold text-slate-900 mb-3">4. Third-Party Services</h2><p className="text-slate-600 leading-relaxed">We use Google Analytics for traffic analysis, Cloudinary for media storage, and email services for communication. These services may collect data as described in their respective privacy policies.</p></div>
          <div><h2 className="text-xl font-semibold text-slate-900 mb-3">5. Data Security</h2><p className="text-slate-600 leading-relaxed">We implement industry-standard security measures to protect your data, including HTTPS encryption, secure data storage, and access controls. However, no method of transmission over the Internet is 100% secure.</p></div>
          <div><h2 className="text-xl font-semibold text-slate-900 mb-3">6. Your Rights</h2><p className="text-slate-600 leading-relaxed">You have the right to access, update, or delete your personal information. To exercise these rights, contact us at contact@genmash.com.</p></div>
          <div><h2 className="text-xl font-semibold text-slate-900 mb-3">7. Contact</h2><p className="text-slate-600 leading-relaxed">For questions about this privacy policy, contact us at <a href="mailto:contact@genmash.com" className="text-blue-600 hover:underline">contact@genmash.com</a>.</p></div>
        </div>
      </div>
    </section>
  );
}
