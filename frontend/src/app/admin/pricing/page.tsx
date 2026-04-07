'use client';
import { Plus, Pencil, Trash2, Sparkles } from 'lucide-react';
const plans = [
  { id: '1', name: 'Starter Website', price: '$500', isPopular: false, isActive: true },
  { id: '2', name: 'Business Website', price: '$2,000', isPopular: true, isActive: true },
  { id: '3', name: 'E-commerce', price: '$5,000', isPopular: false, isActive: true },
  { id: '4', name: 'Custom AI Solution', price: '$8,000', isPopular: false, isActive: true },
];
export default function AdminPricingPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Pricing Plans</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700"><Plus size={16} /> Add Plan</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map(p => (
          <div key={p.id} className={`bg-white rounded-xl border p-5 ${p.isPopular ? 'border-blue-200' : 'border-slate-100'}`}>
            {p.isPopular && <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full mb-2"><Sparkles size={10} /> Popular</span>}
            <h3 className="text-lg font-semibold text-slate-900">{p.name}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-1">{p.price}</p>
            <div className="mt-4 flex gap-1">
              <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil size={14} /></button>
              <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
