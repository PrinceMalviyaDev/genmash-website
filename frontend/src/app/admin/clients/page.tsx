'use client';
import { Plus, Pencil, Trash2 } from 'lucide-react';
const items = [
  { id: '1', name: 'TechStart India', industry: 'E-commerce' },
  { id: '2', name: 'HealthBridge', industry: 'Healthcare' },
  { id: '3', name: 'LogiFlow', industry: 'Logistics' },
  { id: '4', name: 'EduLearn Global', industry: 'Education' },
];
export default function AdminClientsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Clients</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700"><Plus size={16} /> Add Client</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(c => (
          <div key={c.id} className="bg-white rounded-xl border border-slate-100 p-4 text-center group">
            <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-3"><span className="text-xl font-bold text-blue-600">{c.name[0]}</span></div>
            <p className="text-sm font-medium text-slate-900">{c.name}</p>
            <p className="text-xs text-slate-400">{c.industry}</p>
            <div className="mt-3 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil size={14} /></button>
              <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
