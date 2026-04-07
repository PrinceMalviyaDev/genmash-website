import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import { Clock, User } from 'lucide-react';

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  author: { name: string };
  publishedAt: string;
  readTime: number;
  category: string;
}

export default function BlogCard({
  title,
  slug,
  excerpt,
  author,
  publishedAt,
  readTime,
  category,
}: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg transition-shadow"
    >
      <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
        <span className="text-slate-300 text-5xl font-bold">{title[0]}</span>
      </div>
      <div className="p-5">
        <Badge>{category}</Badge>
        <h3 className="mt-3 text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="mt-2 text-sm text-slate-500 line-clamp-2">{excerpt}</p>
        <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <User size={12} />
            {author.name}
          </span>
          <span>{new Date(publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {readTime} min read
          </span>
        </div>
      </div>
    </Link>
  );
}
