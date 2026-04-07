'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/shared/ProjectCard';
import { getProjects } from '@/lib/api';

const filters = ['All', 'Web', 'Mobile', 'AI', 'Automation', 'Desktop'];

export default function PortfolioPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('All');

  useEffect(() => {
    getProjects().then(setProjects).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = active === 'All' ? projects : projects.filter(p => p.projectType === active.toLowerCase());

  return (
    <>
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-600 font-semibold text-sm tracking-wide uppercase mb-3">Our Work</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">Portfolio</h1>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">Explore our projects and see how we turn ideas into impactful digital products.</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filters.map(f => (
              <button key={f} onClick={() => setActive(f)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${active === f ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                {f}
              </button>
            ))}
          </div>
          {loading ? (
            <div className="text-center py-20 text-slate-400">Loading projects...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-400">No projects found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map((project: any, i: number) => (
                <motion.div key={project.slug || project._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <ProjectCard {...project} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
