'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { getTestimonials } from '@/lib/api';

export default function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    getTestimonials().then(setTestimonials).catch(() => {});
  }, []);

  if (testimonials.length === 0) return null;

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const t = testimonials[current];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-blue-600 font-semibold text-sm tracking-wide uppercase mb-3">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">What Our Clients Say</h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-slate-50 rounded-3xl p-8 sm:p-12 min-h-[280px]">
            <Quote size={48} className="absolute top-6 right-8 text-blue-100" fill="currentColor" />
            <AnimatePresence mode="wait">
              <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <div className="flex gap-1 mb-5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} className={i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} />)}</div>
                <blockquote className="text-lg sm:text-xl text-slate-700 leading-relaxed">&ldquo;{t.review}&rdquo;</blockquote>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">{t.clientName[0]}</div>
                  <div><div className="font-semibold text-slate-900">{t.clientName}</div><div className="text-sm text-slate-500">{t.designation}, {t.company}</div></div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-blue-300 hover:text-blue-600 transition-colors"><ChevronLeft size={18} /></button>
            <div className="flex gap-2">{testimonials.map((_: any, i: number) => <button key={i} onClick={() => setCurrent(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-blue-600 w-8' : 'bg-slate-200 hover:bg-slate-300'}`} />)}</div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-blue-300 hover:text-blue-600 transition-colors"><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
