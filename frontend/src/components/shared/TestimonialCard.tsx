import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  clientName: string;
  company: string;
  designation?: string;
  photo?: string;
  review: string;
  rating: number;
}

export default function TestimonialCard({
  clientName,
  company,
  designation,
  review,
  rating,
}: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md transition-shadow">
      <Quote size={24} className="text-blue-100 mb-3" fill="currentColor" />
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}
          />
        ))}
      </div>
      <p className="text-sm text-slate-600 leading-relaxed mb-4">&ldquo;{review}&rdquo;</p>
      <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
          {clientName[0]}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{clientName}</p>
          <p className="text-xs text-slate-400">
            {designation ? `${designation}, ` : ''}{company}
          </p>
        </div>
      </div>
    </div>
  );
}
