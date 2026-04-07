'use client';

import { motion } from 'framer-motion';
import ServiceCard from '@/components/shared/ServiceCard';

interface ServiceItem {
  _id?: string;
  title: string;
  slug: string;
  icon: string;
  shortDescription: string;
}

const fallbackServices: ServiceItem[] = [
  { title: 'Website Development', slug: 'website-development', icon: 'Globe', shortDescription: 'Modern, responsive websites built with React, Next.js, and cutting-edge technologies.' },
  { title: 'Mobile App Development', slug: 'mobile-app-development', icon: 'Smartphone', shortDescription: 'Native and cross-platform mobile apps for iOS and Android.' },
  { title: 'AI/ML Development', slug: 'ai-ml-development', icon: 'Brain', shortDescription: 'Custom AI solutions including machine learning models and NLP.' },
];

export default function ServicesContent({ services: apiServices }: { services?: ServiceItem[] }) {
  const services = apiServices && apiServices.length > 0 ? apiServices : fallbackServices;
  return (
    <>
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-600 font-semibold text-sm tracking-wide uppercase mb-3">What We Do</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">Our Services</h1>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            End-to-end software development services tailored to your business needs. From concept to deployment and beyond.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
