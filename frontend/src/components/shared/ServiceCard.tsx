'use client';

import Link from 'next/link';
import { ArrowRight, Globe, Smartphone, Brain, Bot, Gamepad2, Cloud, Wrench, RefreshCw, MessageSquare, Monitor, Building2, Code, Palette } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Globe, Smartphone, Brain, Bot, Gamepad2, Cloud, Wrench, RefreshCw,
  MessageSquare, Monitor, Building2, Code, Palette,
};

interface ServiceCardProps {
  title: string;
  slug: string;
  icon: string;
  shortDescription: string;
}

export default function ServiceCard({ title, slug, icon, shortDescription }: ServiceCardProps) {
  const Icon = iconMap[icon] || Globe;

  return (
    <Link
      href={`/services/${slug}`}
      className="group block p-7 bg-white border border-slate-100 rounded-2xl hover:border-blue-200 hover:shadow-lg hover:shadow-blue-600/5 transition-all duration-300"
    >
      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        <Icon size={24} />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-sm text-slate-500 leading-relaxed">{shortDescription}</p>
      <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
        Learn more <ArrowRight size={14} />
      </div>
    </Link>
  );
}
