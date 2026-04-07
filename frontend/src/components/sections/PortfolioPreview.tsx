'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProjectCard from '@/components/shared/ProjectCard';
import { getFeaturedProjects } from '@/lib/api';

export default function PortfolioPreview() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    getFeaturedProjects().then(p => setProjects(p.slice(0, 3))).catch(() => {});
  }, []);

  if (projects.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-blue-600 font-semibold text-sm tracking-wide uppercase mb-3">Our Work</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Featured Projects</h2>
          <p className="mt-4 text-slate-500 text-lg">Explore some of our recent projects and see how we turn ideas into reality</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {projects.map((project: any, i: number) => (
            <motion.div key={project._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/portfolio" className="inline-flex items-center gap-2 px-6 py-3 text-blue-600 font-semibold border-2 border-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
            View All Projects <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
