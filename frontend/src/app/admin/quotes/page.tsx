'use client';

import { Clock, DollarSign, Trash2 } from 'lucide-react';

const quotes = [
  { id: '1', name: 'Sarah Mitchell', email: 'sarah@health.com', projectType: 'Mobile App', budget: '$5K-$15K', timeline: '3-6 months', status: 'new', date: 'Apr 5, 2026' },
  { id: '2', name: 'Raj Patel', email: 'raj@ai.co', projectType: 'AI Solution', budget: '$15K-$50K', timeline: '3-6 months', status: 'in_review', date: 'Apr 3, 2026' },
  { id: '3', name: 'Emily Davis', email: 'emily@retail.com', projectType: 'Website', budget: '$1K-$5K', timeline: '1-3 months', status: 'quoted', date: 'Apr 1, 2026' },
  { id: '4', name: 'Tom Wilson', email: 'tom@startup.io', projectType: 'Web App', budget: '$5K-$15K', timeline: 'ASAP', status: 'won', date: 'Mar 28, 2026' },
];

const statusColors: Record<string, string> = {
  new: 'bg-blue-50 text-blue-600', in_review: 'bg-amber-50 text-amber-600',
  quoted: 'bg-purple-50 text-purple-600', won: 'bg-emerald-50 text-emerald-600', lost: 'bg-red-50 text-red-600',
};

export default function AdminQuotesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Quote Requests</h1>
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-slate-100 text-left">
              <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Client</th>
              <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Project</th>
              <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Budget</th>
              <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Timeline</th>
              <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Status</th>
              <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Date</th>
              <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Actions</th>
            </tr></thead>
            <tbody>
              {quotes.map(q => (
                <tr key={q.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="px-4 py-3"><p className="text-sm font-medium text-slate-900">{q.name}</p><p className="text-xs text-slate-400">{q.email}</p></td>
                  <td className="px-4 py-3 text-sm text-slate-600">{q.projectType}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 flex items-center gap-1"><DollarSign size={12} />{q.budget}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">{q.timeline}</td>
                  <td className="px-4 py-3">
                    <select defaultValue={q.status} className={`px-2 py-0.5 text-xs font-medium rounded-full border-0 ${statusColors[q.status]}`}>
                      <option value="new">New</option><option value="in_review">In Review</option><option value="quoted">Quoted</option><option value="won">Won</option><option value="lost">Lost</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400">{q.date}</td>
                  <td className="px-4 py-3"><button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
