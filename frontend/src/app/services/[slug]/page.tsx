'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { getService } from '@/lib/api';

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-100 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors">
        <span className="font-medium text-slate-900">{q}</span>
        {open ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
      </button>
      {open && <div className="px-5 pb-5 text-sm text-slate-500 leading-relaxed">{a}</div>}
    </div>
  );
}

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getService(slug).then(setData).catch(() => {}).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="pt-40 pb-20 text-center text-slate-400">Loading...</div>;
  if (!data) return <div className="pt-40 pb-20 text-center"><h1 className="text-2xl font-bold text-slate-900">Service not found</h1><Link href="/services" className="mt-4 inline-block text-blue-600">Back to Services</Link></div>;

  return (
    <>
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="text-blue-400 font-semibold text-sm tracking-wide uppercase mb-3">Our Services</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">{data.title}</h1>
            <p className="mt-5 text-lg text-slate-300 leading-relaxed">{data.fullDescription || data.shortDescription}</p>
            <div className="mt-8">
              <Link href="/get-quote" className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25">
                Start Your Project <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {data.technologies?.length > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Technologies We Use</h2>
            <div className="flex flex-wrap gap-3">
              {data.technologies.map((tech: string) => (
                <span key={tech} className="px-4 py-2 bg-slate-50 text-slate-700 font-medium rounded-lg border border-slate-100 hover:border-blue-300 hover:text-blue-600 transition-colors">{tech}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {data.process?.length > 0 && (
        <section className="py-16 lg:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-10">Our Development Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.process.map((step: any, i: number) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="bg-white p-6 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm mb-4">{step.step || i + 1}</div>
                  <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {(data.startingPrice || data.timeline) && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
              {data.startingPrice && <div className="p-6 bg-blue-50 rounded-2xl"><p className="text-sm text-blue-600 font-medium mb-1">Starting From</p><p className="text-3xl font-bold text-slate-900">{data.startingPrice}</p></div>}
              {data.timeline && <div className="p-6 bg-slate-50 rounded-2xl"><p className="text-sm text-slate-500 font-medium mb-1">Estimated Timeline</p><p className="text-3xl font-bold text-slate-900">{data.timeline}</p></div>}
            </div>
          </div>
        </section>
      )}

      {data.faqs?.length > 0 && (
        <section className="py-16 lg:py-24 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {data.faqs.map((faq: any, i: number) => <FAQ key={i} q={faq.question} a={faq.answer} />)}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 text-lg mb-8">Tell us about your project and get a free quote within 24 hours.</p>
          <Link href="/get-quote" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg">Get a Free Quote <ArrowRight size={18} /></Link>
        </div>
      </section>
    </>
  );
}
