'use client';

import { motion } from 'framer-motion';

const techCategories = [
  {
    name: 'Frontend',
    technologies: ['React', 'Next.js', 'Vue.js', 'Angular', 'Tailwind CSS', 'TypeScript'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Backend',
    technologies: ['Node.js', 'Express', 'Python', 'Django', 'FastAPI', 'NestJS'],
    color: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'Mobile',
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'AI / ML',
    technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'LangChain', 'Hugging Face'],
    color: 'from-orange-500 to-red-500',
  },
  {
    name: 'Cloud & DevOps',
    technologies: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'GitHub Actions'],
    color: 'from-amber-500 to-orange-500',
  },
  {
    name: 'Databases',
    technologies: ['MongoDB', 'PostgreSQL', 'Redis', 'Firebase', 'MySQL'],
    color: 'from-indigo-500 to-blue-500',
  },
];

export default function TechStack() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-blue-600 font-semibold text-sm tracking-wide uppercase mb-3">
            Technologies
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Tech Stack We Master
          </h2>
          <p className="mt-4 text-slate-500 text-lg">
            We use the latest and most reliable technologies to build your solutions
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techCategories.map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors"
            >
              <div
                className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${category.color} mb-4`}
              >
                {category.name}
              </div>
              <div className="flex flex-wrap gap-2">
                {category.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-white text-sm text-slate-600 font-medium rounded-lg border border-slate-150 hover:border-blue-300 hover:text-blue-600 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
