'use client';

import { useEffect, useState } from 'react';
import { Mail, MailOpen, Trash2, Clock, Loader2, Check } from 'lucide-react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import AdminModal from '@/components/admin/AdminModal';
import { inquiriesApi } from '@/lib/adminApi';

type Message = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export default function AdminInquiriesPage() {
  const [items, setItems] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [viewing, setViewing] = useState<Message | null>(null);

  const load = async () => {
    setLoading(true);
    try { setItems(await inquiriesApi.list()); } catch (e: any) { setError(e.message); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const toggleRead = async (m: Message) => {
    try {
      await inquiriesApi.update(m._id, { isRead: !m.isRead });
      setItems(items.map(x => x._id === m._id ? { ...x, isRead: !x.isRead } : x));
    } catch (e: any) { setError(e.message); }
  };

  const openView = async (m: Message) => {
    setViewing(m);
    if (!m.isRead) {
      try {
        await inquiriesApi.update(m._id, { isRead: true });
        setItems(items.map(x => x._id === m._id ? { ...x, isRead: true } : x));
      } catch { /* ignore */ }
    }
  };

  const handleDelete = async () => {
    if (!confirmId) return;
    setDeleting(true);
    try { await inquiriesApi.remove(confirmId); setConfirmId(null); await load(); }
    catch (e: any) { setError(e.message); }
    setDeleting(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Contact Messages</h1>

      {error && <div className="p-3 mb-4 rounded-lg bg-red-50 text-red-700 text-xs">{error}</div>}

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="animate-spin text-blue-600" size={24} /></div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-100 p-16 text-center text-sm text-slate-400">No messages yet.</div>
      ) : (
        <div className="space-y-3">
          {items.map(msg => (
            <div key={msg._id}
              className={`bg-white rounded-xl border p-5 transition-shadow ${msg.isRead ? 'border-slate-100' : 'border-blue-200 bg-blue-50/30'}`}>
              <div className="flex items-start justify-between gap-4">
                <button onClick={() => openView(msg)} className="flex items-start gap-3 text-left flex-1 min-w-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.isRead ? 'bg-slate-100 text-slate-400' : 'bg-blue-100 text-blue-600'}`}>
                    {msg.isRead ? <MailOpen size={18} /> : <Mail size={18} />}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm ${msg.isRead ? 'text-slate-700' : 'font-semibold text-slate-900'}`}>{msg.name}</p>
                      <span className="text-xs text-slate-400 truncate">{msg.email}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-900 mt-0.5 truncate">{msg.subject}</p>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-1">{msg.message}</p>
                  </div>
                </button>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-slate-400 flex items-center gap-1 whitespace-nowrap">
                    <Clock size={10} />{new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                  <button onClick={() => toggleRead(msg)}
                    title={msg.isRead ? 'Mark as unread' : 'Mark as read'}
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Check size={14} />
                  </button>
                  <button onClick={() => setConfirmId(msg._id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminModal open={!!viewing} onClose={() => setViewing(null)} title="Message Details">
        {viewing && (
          <div className="space-y-3 text-sm">
            <div><span className="text-slate-500">From:</span> <span className="text-slate-900 font-medium">{viewing.name}</span></div>
            <div><span className="text-slate-500">Email:</span> <a href={`mailto:${viewing.email}`} className="text-blue-600 hover:underline">{viewing.email}</a></div>
            {viewing.phone && <div><span className="text-slate-500">Phone:</span> <span className="text-slate-900">{viewing.phone}</span></div>}
            <div><span className="text-slate-500">Subject:</span> <span className="text-slate-900 font-medium">{viewing.subject}</span></div>
            <div><span className="text-slate-500">Date:</span> <span className="text-slate-900">{new Date(viewing.createdAt).toLocaleString()}</span></div>
            <div className="pt-3 border-t border-slate-100">
              <p className="text-slate-500 mb-2">Message:</p>
              <p className="text-slate-900 whitespace-pre-wrap">{viewing.message}</p>
            </div>
          </div>
        )}
      </AdminModal>

      <ConfirmDialog
        open={!!confirmId}
        message="This message will be permanently deleted."
        onConfirm={handleDelete}
        onCancel={() => setConfirmId(null)}
        loading={deleting}
      />
    </div>
  );
}
