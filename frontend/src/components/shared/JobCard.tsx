import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import { MapPin, Briefcase, Clock } from 'lucide-react';

interface JobCardProps {
  title: string;
  slug: string;
  department: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  postedAt: string;
}

const locationLabels: Record<string, string> = {
  remote: 'Remote',
  indore: 'Indore, India',
  hybrid: 'Hybrid',
};

export default function JobCard({
  title,
  slug,
  department,
  location,
  jobType,
  experienceLevel,
  postedAt,
}: JobCardProps) {
  return (
    <Link
      href={`/careers/${slug}`}
      className="group block bg-white rounded-2xl border border-slate-100 p-6 hover:border-blue-200 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-slate-500 mt-1">{department}</p>
        </div>
        <Badge variant="default">{jobType}</Badge>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-400">
        <span className="flex items-center gap-1.5">
          <MapPin size={14} />
          {locationLabels[location] || location}
        </span>
        <span className="flex items-center gap-1.5">
          <Briefcase size={14} />
          {experienceLevel}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={14} />
          {new Date(postedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
      </div>
    </Link>
  );
}
