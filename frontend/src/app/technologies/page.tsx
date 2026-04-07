'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const categories = [
  { name: 'Frontend Development', color: 'from-blue-500 to-cyan-500', techs: ['React', 'Next.js', 'Vue.js', 'Angular', 'Tailwind CSS', 'TypeScript', 'HTML5/CSS3'] },
  { name: 'Backend Development', color: 'from-emerald-500 to-teal-500', techs: ['Node.js', 'Express.js', 'Python', 'Django', 'FastAPI', 'NestJS', 'GraphQL'] },
  { name: 'Mobile Development', color: 'from-purple-500 to-pink-500', techs: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo'] },
  { name: 'AI / Machine Learning', color: 'from-orange-500 to-red-500', techs: ['TensorFlow', 'PyTorch', 'OpenAI', 'LangChain', 'Hugging Face', 'Scikit-learn'] },
  { name: 'Automation & AI Agents', color: 'from-rose-500 to-pink-500', techs: ['n8n', 'LangGraph', 'CrewAI', 'Zapier', 'Custom Agents'] },
  { name: 'Cloud & DevOps', color: 'from-amber-500 to-orange-500', techs: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'GitHub Actions', 'Vercel', 'Terraform'] },
  { name: 'Databases', color: 'from-indigo-500 to-blue-500', techs: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'Supabase'] },
  { name: 'Game Development', color: 'from-green-500 to-emerald-500', techs: ['Unity', 'Unreal Engine', 'Godot', 'Phaser'] },
];

export default function TechnologiesPage() {
  return (
    <>
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-600 font-semibold text-sm tracking-wide uppercase mb-3">Our Expertise</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">Technologies We Use</h1>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">We master the latest technologies to deliver fast, scalable, and future-proof solutions.</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat, i) => (
              <motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${cat.color} mb-4`}>{cat.name}</div>
                <div className="flex flex-wrap gap-2">
                  {cat.techs.map(t => (
                    <span key={t} className="px-3 py-1.5 bg-white text-sm text-slate-600 font-medium rounded-lg border border-slate-150 hover:border-blue-300 hover:text-blue-600 transition-colors cursor-default">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need a Specific Technology?</h2>
          <p className="text-blue-100 text-lg mb-8">Our team is always learning. If you need expertise in a technology not listed, let&apos;s talk.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors">
            Contact Us <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
