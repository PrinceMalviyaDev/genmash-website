'use client';

import { useEffect, useState } from 'react';
import { DollarSign, Trash2, Loader2, Eye } from 'lucide-react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import AdminModal from '@/components/admin/AdminModal';
import { quotesApi } from '@/lib/adminApi';

type Quote = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  projectSubtype: string;
  budgetRange: string;
  timeline: string;
  description: string;
  referenceLinks: string;
  attachment: string;
  status: 'new' | 'in_review' | 'quoted' | 'won' | 'lost';
  notes: string;
  createdAt: string;
};

const statusColors: Record<string, string> = {
  new: 'bg-blue-50 text-blue-600',
  in_review: 'bg-amber-50 text-amber-600',
  quoted: 'bg-purple-50 text-purple-600',
  won: 'bg-emerald-50 text-emerald-600',
  lost: 'bg-red-50 text-red-600',
};

export default function AdminQuotesPage() {
  const [items, setItems] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [viewing, setViewing] = useState<Quote | null>(null);

  const load = async () => {
    setLoading(true);
    try { setItems(await quotesApi.list()); } catch (e: any) { setError(e.message); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const updateStatus = async (q: Quote, status: Quote['status']) => {
    try {
      await quotesApi.update(q._id, { status });
      setItems(items.map(x => x._id === q._id ? { ...x, status } : x));
    } catch (e: any) { setError(e.message); }
  };

  const handleDelete = async () => {
    if (!confirmId) return;
    setDeleting(true);
    try { await quotesApi.remove(confirmId); setConfirmId(null); await load(); }
    catch (e: any) { setError(e.message); }
    setDeleting(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Quote Requests</h1>

      {error && <div className="p-3 mb-4 rounded-lg bg-red-50 text-red-700 text-xs">{error}</div>}

      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="animate-spin text-blue-600" size={24} /></div>
        ) : items.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-16">No quote requests yet.</p>
        ) : (
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
                {items.map(q => (
                  <tr key={q._id} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-slate-900">{q.name}</p>
                      <p className="text-xs text-slate-400">{q.email}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{q.projectType}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      <span className="inline-flex items-center gap-1"><DollarSign size={12} />{q.budgetRange}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500">{q.timeline}</td>
                    <td className="px-4 py-3">
                      <select value={q.status} onChange={e => updateStatus(q, e.target.value as Quote['status'])}
                        className={`px-2 py-0.5 text-xs font-medium rounded-full border-0 outline-none cursor-pointer ${statusColors[q.status]}`}>
                        <option value="new">New</option>
                        <option value="in_review">In Review</option>
                        <option value="quoted">Quoted</option>
                        <option value="won">Won</option>
                        <option value="lost">Lost</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">
                      {new Date(q.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button onClick={() => setViewing(q)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Eye size={14} /></button>
                        <button onClick={() => setConfirmId(q._id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AdminModal open={!!viewing} onClose={() => setViewing(null)} title="Quote Request Details">
        {viewing && (
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div><span className="text-slate-500">Name:</span> <span className="text-slate-900 font-medium">{viewing.name}</span></div>
              <div><span className="text-slate-500">Company:</span> <span className="text-slate-900">{viewing.company || '—'}</span></div>
              <div><span className="text-slate-500">Email:</span> <a href={`mailto:${viewing.email}`} className="text-blue-600 hover:underline">{viewing.email}</a></div>
              <div><span className="text-slate-500">Phone:</span> <span className="text-slate-900">{viewing.phone}</span></div>
              <div><span className="text-slate-500">Project Type:</span> <span className="text-slate-900">{viewing.projectType}</span></div>
              <div><span className="text-slate-500">Budget:</span> <span className="text-slate-900">{viewing.budgetRange}</span></div>
              <div><span className="text-slate-500">Timeline:</span> <span className="text-slate-900">{viewing.timeline}</span></div>
              <div><span className="text-slate-500">Status:</span> <span className={`px-2 py-0.5 text-xs rounded-full ${statusColors[viewing.status]}`}>{viewing.status}</span></div>
            </div>
            <div className="pt-3 border-t border-slate-100">
              <p className="text-slate-500 mb-2">Description:</p>
              <p className="text-slate-900 whitespace-pre-wrap">{viewing.description}</p>
            </div>
            {viewing.referenceLinks && (
              <div><span className="text-slate-500">References:</span> <span className="text-slate-900">{viewing.referenceLinks}</span></div>
            )}
            {viewing.attachment && (
              <div><a href={viewing.attachment} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-xs">View attachment ↗</a></div>
            )}
          </div>
        )}
      </AdminModal>

      <ConfirmDialog
        open={!!confirmId}
        message="This quote request will be permanently deleted."
        onConfirm={handleDelete}
        onCancel={() => setConfirmId(null)}
        loading={deleting}
      />
    </div>
  );
}
