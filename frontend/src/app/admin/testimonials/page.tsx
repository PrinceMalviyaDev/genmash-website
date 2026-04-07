'use client';

import { Plus, Pencil, Trash2, Star } from 'lucide-react';

const items = [
  { id: '1', clientName: 'Rajesh Kumar', company: 'TechStart India', rating: 5, isFeatured: true },
  { id: '2', clientName: 'Sarah Mitchell', company: 'HealthBridge', rating: 5, isFeatured: false },
  { id: '3', clientName: 'Amit Sharma', company: 'LogiFlow', rating: 5, isFeatured: true },
  { id: '4', clientName: 'Emily Chen', company: 'EduLearn', rating: 4, isFeatured: false },
];

export default function AdminTestimonialsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Testimonials</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700"><Plus size={16} /> Add Testimonial</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(t => (
          <div key={t.id} className="bg-white rounded-xl border border-slate-100 p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-slate-900">{t.clientName}</p>
                <p className="text-sm text-slate-500">{t.company}</p>
                <div className="flex gap-0.5 mt-2">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={12} className="text-amber-400 fill-amber-400" />)}</div>
              </div>
              <div className="flex gap-1">
                {t.isFeatured && <span className="px-2 py-0.5 text-xs bg-blue-50 text-blue-600 rounded-full">Featured</span>}
                <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil size={14} /></button>
                <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
