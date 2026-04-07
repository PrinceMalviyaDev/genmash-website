'use client';
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react';
const items = [
  { id: '1', title: 'Website Development', isActive: true, order: 1 },
  { id: '2', title: 'Mobile App Development', isActive: true, order: 2 },
  { id: '3', title: 'AI/ML Development', isActive: true, order: 3 },
  { id: '4', title: 'AI Agents & Automation', isActive: true, order: 4 },
  { id: '5', title: 'Cloud & DevOps', isActive: false, order: 5 },
];
export default function AdminServicesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Services</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700"><Plus size={16} /> Add Service</button>
      </div>
      <div className="bg-white rounded-xl border border-slate-100 divide-y divide-slate-50">
        {items.map(s => (
          <div key={s.id} className="flex items-center gap-3 p-4 hover:bg-slate-50/50">
            <GripVertical size={16} className="text-slate-300 cursor-grab" />
            <span className="flex-1 text-sm font-medium text-slate-900">{s.title}</span>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${s.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>{s.isActive ? 'Active' : 'Inactive'}</span>
            <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil size={14} /></button>
            <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
