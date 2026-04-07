'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Badge from '@/components/ui/Badge';

interface ProjectCardProps {
  title: string;
  slug: string;
  clientName: string;
  projectType: string;
  description: string;
  thumbnail?: string;
  technologies: string[];
}

const typeVariants: Record<string, 'default' | 'success' | 'warning' | 'error' | 'neutral'> = {
  web: 'default',
  mobile: 'success',
  ai: 'warning',
  automation: 'error',
  game: 'neutral',
  desktop: 'neutral',
};

export default function ProjectCard({
  title,
  slug,
  clientName,
  projectType,
  description,
  technologies,
}: ProjectCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link
        href={`/portfolio/${slug}`}
        className="group block bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-shadow"
      >
        <div className="relative h-48 bg-gradient-to-br from-blue-600/80 to-purple-600/80 flex items-center justify-center">
          <span className="text-white/60 text-6xl font-bold">{title[0]}</span>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <ExternalLink size={18} className="text-slate-900" />
              </div>
            </div>
          </div>
          <div className="absolute top-3 left-3">
            <Badge variant={typeVariants[projectType] || 'default'}>
              {projectType.toUpperCase()}
            </Badge>
          </div>
        </div>
        <div className="p-5">
          <p className="text-xs text-slate-400 font-medium mb-1">{clientName}</p>
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="mt-1.5 text-sm text-slate-500 line-clamp-2">{description}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {technologies.slice(0, 4).map((tech) => (
              <span key={tech} className="px-2 py-0.5 text-xs bg-slate-50 text-slate-500 rounded-md border border-slate-100">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
