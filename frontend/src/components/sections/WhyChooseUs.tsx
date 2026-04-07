'use client';

import { motion } from 'framer-motion';
import {
  Users,
  Clock,
  Headphones,
  DollarSign,
  Cpu,
  ShieldCheck,
} from 'lucide-react';

const reasons = [
  {
    icon: Users,
    title: 'Dedicated Team',
    description:
      'A skilled team of developers, designers, and project managers fully committed to your project.',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description:
      'We follow agile methodologies to ensure your project is delivered on schedule, every time.',
  },
  {
    icon: Headphones,
    title: 'Post-Launch Support',
    description:
      'Continuous maintenance and support after deployment to keep your product running smoothly.',
  },
  {
    icon: DollarSign,
    title: 'Transparent Pricing',
    description:
      'No hidden costs. Clear pricing with detailed breakdowns so you know exactly what you pay for.',
  },
  {
    icon: Cpu,
    title: 'Modern Tech Stack',
    description:
      'We use the latest frameworks and tools to build fast, scalable, and future-proof solutions.',
  },
  {
    icon: ShieldCheck,
    title: 'NDA Protected',
    description:
      'Your ideas are safe with us. We sign NDAs to protect your intellectual property and data.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
          className="absolute inset-0"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-blue-400 font-semibold text-sm tracking-wide uppercase mb-3">
            Why GenMash
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Why Choose Us
          </h2>
          <p className="mt-4 text-slate-400 text-lg">
            We combine expertise, dedication, and innovation to deliver exceptional results
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-7 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-blue-500/30 hover:bg-white/[0.08] transition-all group"
            >
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <reason.icon size={24} />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
