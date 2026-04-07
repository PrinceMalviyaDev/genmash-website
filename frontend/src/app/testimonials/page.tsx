'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TestimonialCard from '@/components/shared/TestimonialCard';
import { getTestimonials } from '@/lib/api';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTestimonials().then(setTestimonials).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-600 font-semibold text-sm tracking-wide uppercase mb-3">Testimonials</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">What Our Clients Say</h1>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">Real feedback from real clients who trusted us with their projects.</p>
        </div>
      </section>
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20 text-slate-400">Loading testimonials...</div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {testimonials.map((t: any, i: number) => (
                <motion.div key={t._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="break-inside-avoid">
                  <TestimonialCard {...t} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
