'use client';

import { useState } from 'react';
import { Send, CheckCircle, FileText, MessageSquare, Rocket, Upload } from 'lucide-react';
import { submitQuote } from '@/lib/api';

export default function GetQuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    fd.delete('attachment'); // handle file separately if needed
    const data = Object.fromEntries(fd);
    try {
      await submitQuote(data);
    } catch {}
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 min-h-screen flex items-center">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={40} className="text-emerald-500" /></div>
          <h1 className="text-3xl font-bold text-slate-900">Quote Request Submitted!</h1>
          <p className="mt-3 text-slate-500 text-lg">Thank you! Our team will review your requirements and get back to you with a detailed quote within 48 hours.</p>
          <div className="mt-8 p-6 bg-slate-50 rounded-2xl text-left space-y-4">
            {[{ icon: FileText, step: 'We review your requirements' }, { icon: MessageSquare, step: 'Schedule a discovery call' }, { icon: Rocket, step: 'Deliver a detailed proposal' }].map((s, i) => (
              <div key={i} className="flex items-center gap-3"><div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600"><s.icon size={16} /></div><span className="text-sm text-slate-600">{s.step}</span></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-400 font-semibold text-sm tracking-wide uppercase mb-3">Start Your Project</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white">Get a Free Quote</h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">Tell us about your project and we&apos;ll provide a detailed estimate within 48 hours. No commitment required.</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name *</label><input name="name" type="text" required placeholder="Your name" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Email *</label><input name="email" type="email" required placeholder="you@company.com" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Phone *</label><input name="phone" type="tel" required placeholder="+91 98765 43210" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Company <span className="text-slate-400 font-normal">(optional)</span></label><input name="company" type="text" placeholder="Company name" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" /></div>
            </div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Project Type *</label>
              <select name="projectType" required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500">
                <option value="">Select project type</option>
                <option value="web">Website</option><option value="mobile">Mobile App</option><option value="ai">AI Solution</option><option value="automation">Automation</option><option value="game">Game</option><option value="desktop">Desktop App</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Budget Range *</label>
                <select name="budgetRange" required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500">
                  <option value="">Select budget</option>
                  <option>Under $1,000</option><option>$1,000 - $5,000</option><option>$5,000 - $15,000</option><option>$15,000 - $50,000</option><option>$50,000+</option>
                </select>
              </div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Timeline *</label>
                <select name="timeline" required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500">
                  <option value="">Select timeline</option>
                  <option>ASAP</option><option>1-3 months</option><option>3-6 months</option><option>6+ months</option><option>Flexible</option>
                </select>
              </div>
            </div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Project Description *</label>
              <textarea name="description" required rows={5} minLength={50} placeholder="Describe your project, goals, and any specific features you need (minimum 50 characters)..." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none" />
            </div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Reference Links <span className="text-slate-400 font-normal">(optional)</span></label><input name="referenceLinks" type="text" placeholder="Links to similar projects or inspiration" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" /></div>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center">
              <Upload size={24} className="text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-500">Attach a file (PDF, DOC, PNG, JPG — max 10MB)</p>
              <input name="attachment" type="file" className="mt-2 text-xs" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" />
            </div>
            <div className="flex items-start gap-3">
              <input name="ndaRequired" type="checkbox" id="nda" className="mt-1" /><label htmlFor="nda" className="text-sm text-slate-600">I require an NDA before discussing project details</label>
            </div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1.5">How did you hear about us?</label>
              <select name="source" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500">
                <option value="">Select option</option><option>Google Search</option><option>Social Media</option><option>Referral</option><option>LinkedIn</option><option>Other</option>
              </select>
            </div>
            <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white font-bold text-lg rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60 shadow-lg shadow-blue-600/25">
              {loading ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</> : <><Send size={18} /> Submit Quote Request</>}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
