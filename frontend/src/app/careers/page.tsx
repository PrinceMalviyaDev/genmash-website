'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wifi, BookOpen, Lightbulb, HeartHandshake } from 'lucide-react';
import JobCard from '@/components/shared/JobCard';
import { getCareers } from '@/lib/api';

const perks = [
  { icon: Wifi, title: 'Remote Friendly', desc: 'Work from anywhere. We trust our team.' },
  { icon: BookOpen, title: 'Learning Budget', desc: 'Annual budget for courses and conferences.' },
  { icon: Lightbulb, title: 'Innovation Time', desc: 'Dedicated time for side projects and R&D.' },
  { icon: HeartHandshake, title: 'Work-Life Balance', desc: 'Flexible hours and generous time off.' },
];

const benefits = ['Health Insurance', 'Paid Time Off', 'Performance Bonuses', 'Team Outings', 'Latest Hardware', 'Skill Development'];

export default function CareersPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCareers().then(setJobs).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-400 font-semibold text-sm tracking-wide uppercase mb-3">Careers</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white">Join Our Team</h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">Build the future of technology with passionate, talented people.</p>
        </div>
      </section>
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Why Work at GenMash?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk, i) => (
              <motion.div key={perk.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="p-6 bg-slate-50 rounded-2xl text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mx-auto mb-4"><perk.icon size={24} /></div>
                <h3 className="font-semibold text-slate-900">{perk.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {benefits.map(b => <span key={b} className="px-4 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-full">{b}</span>)}
          </div>
        </div>
      </section>
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Open Positions</h2>
          {loading ? <div className="text-center py-10 text-slate-400">Loading jobs...</div> : jobs.length === 0 ? <div className="text-center py-10 text-slate-400">No open positions right now.</div> : (
            <div className="space-y-4">
              {jobs.map((job: any, i: number) => (
                <motion.div key={job._id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <JobCard {...job} postedAt={job.postedAt || job.createdAt} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
