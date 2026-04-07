'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { getProject } from '@/lib/api';

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const [cs, setCs] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProject(slug).then(setCs).catch(() => {}).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="pt-40 pb-20 text-center text-slate-400">Loading...</div>;
  if (!cs) return <div className="pt-40 pb-20 text-center"><h1 className="text-2xl font-bold text-slate-900">Project not found</h1><Link href="/portfolio" className="mt-4 inline-block text-blue-600">Back to Portfolio</Link></div>;

  const study = cs.caseStudy || {};

  return (
    <>
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/portfolio" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white mb-6 transition-colors"><ArrowLeft size={14} /> Back to Portfolio</Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge>{cs.projectType?.toUpperCase()}</Badge>
            <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-white">{cs.title}</h1>
            <p className="mt-3 text-lg text-slate-300">Client: {cs.clientName}</p>
          </motion.div>
        </div>
      </section>
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {study.overview && <div><h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2><p className="text-slate-600 leading-relaxed">{study.overview}</p></div>}
          {study.problem && <div><h2 className="text-2xl font-bold text-slate-900 mb-4">The Challenge</h2><p className="text-slate-600 leading-relaxed">{study.problem}</p></div>}
          {study.solution && <div><h2 className="text-2xl font-bold text-slate-900 mb-4">Our Solution</h2><p className="text-slate-600 leading-relaxed">{study.solution}</p></div>}
          {study.features?.length > 0 && <div><h2 className="text-2xl font-bold text-slate-900 mb-4">Key Features</h2><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{study.features.map((f: string) => <div key={f} className="flex items-start gap-2"><Check size={18} className="text-emerald-500 mt-0.5 shrink-0" /><span className="text-slate-600">{f}</span></div>)}</div></div>}
          {cs.technologies?.length > 0 && <div><h2 className="text-2xl font-bold text-slate-900 mb-4">Technologies Used</h2><div className="flex flex-wrap gap-2">{cs.technologies.map((t: string) => <span key={t} className="px-4 py-2 bg-slate-50 text-slate-700 font-medium rounded-lg border border-slate-100">{t}</span>)}</div></div>}
          {study.metrics?.length > 0 && <div><h2 className="text-2xl font-bold text-slate-900 mb-6">Results</h2><div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{study.metrics.map((m: any) => <div key={m.label} className="p-5 bg-blue-50 rounded-xl text-center"><p className="text-xl font-bold text-blue-600">{m.value}</p><p className="text-sm text-slate-500 mt-1">{m.label}</p></div>)}</div></div>}
        </div>
      </section>
      <section className="py-16 lg:py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Have a Similar Project?</h2>
          <p className="text-blue-100 text-lg mb-8">Let&apos;s discuss how we can help you achieve similar results.</p>
          <Link href="/get-quote" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors">Get a Free Quote <ArrowRight size={18} /></Link>
        </div>
      </section>
    </>
  );
}
