'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Link2, Send, CheckCircle, Clock } from 'lucide-react';
import { submitContact } from '@/lib/api';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd);
    try {
      await submitContact(data);
    } catch {}
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-600 font-semibold text-sm tracking-wide uppercase mb-3">Contact</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">Get in Touch</h1>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">Have a question or want to discuss a project? We&apos;d love to hear from you.</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'contact@genmash.com', href: 'mailto:contact@genmash.com' },
                { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
                { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', href: 'https://wa.me/919876543210' },
                { icon: Link2, label: 'LinkedIn', value: 'GenMash Software', href: 'https://linkedin.com/company/genmash' },
                { icon: MapPin, label: 'Location', value: 'Indore, Madhya Pradesh, India', href: undefined },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-slate-900 font-medium hover:text-blue-600 transition-colors">{item.value}</a>
                    ) : (
                      <p className="text-slate-900 font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="p-4 bg-blue-50 rounded-xl flex items-start gap-3 mt-8">
                <Clock size={18} className="text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Office Hours</p>
                  <p className="text-sm text-slate-500">Mon-Fri, 10:00 AM - 7:00 PM IST</p>
                  <p className="text-xs text-slate-400 mt-1">We typically respond within 24 hours</p>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="h-48 bg-slate-100 rounded-2xl flex items-center justify-center">
                <div className="text-center text-slate-400">
                  <MapPin size={32} className="mx-auto mb-2" />
                  <p className="text-sm">Google Maps</p>
                  <p className="text-xs">Indore, India</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">Message Sent!</h3>
                  <p className="mt-2 text-slate-500">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
                  <h2 className="text-xl font-semibold text-slate-900 mb-6">Send us a message</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Name *</label>
                      <input name="name" type="text" required placeholder="Your name" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Email *</label>
                      <input name="email" type="email" required placeholder="you@company.com" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone <span className="text-slate-400 font-normal">(optional)</span></label>
                    <input name="phone" type="tel" placeholder="+91 98765 43210" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject *</label>
                    <select name="subject" required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500">
                      <option value="">Select a subject</option>
                      <option>General Inquiry</option>
                      <option>Project Discussion</option>
                      <option>Support</option>
                      <option>Partnership</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Message *</label>
                    <textarea name="message" required rows={5} placeholder="Tell us what you need..." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none" />
                  </div>
                  <button type="submit" disabled={loading} className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60">
                    {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</> : <><Send size={16} /> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
