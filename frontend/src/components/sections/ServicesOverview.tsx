'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ServiceCard from '@/components/shared/ServiceCard';
import { getServices } from '@/lib/api';

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const cardVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function ServicesOverview() {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    getServices().then(s => setServices(s.slice(0, 6))).catch(() => {});
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-blue-600 font-semibold text-sm tracking-wide uppercase mb-3">What We Do</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Services We Offer</h2>
          <p className="mt-4 text-slate-500 text-lg">End-to-end software development services tailored to your business needs</p>
        </div>
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service: any) => (
            <motion.div key={service._id || service.slug} variants={cardVariants}>
              <ServiceCard title={service.title} slug={service.slug} icon={service.icon} shortDescription={service.shortDescription} />
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-12 text-center">
          <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 text-blue-600 font-semibold border-2 border-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
            View All Services <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
