'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import AdminModal from '@/components/admin/AdminModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Field, TextInput, Checkbox, SubmitButton, CancelButton } from '@/components/admin/FormField';
import { clientsApi } from '@/lib/adminApi';

type Client = {
  _id: string;
  name: string;
  logo: string;
  industry: string;
  projectType: string;
  isVisible: boolean;
  order: number;
};

const emptyForm = { name: '', logo: '', industry: '', projectType: '', isVisible: true, order: 0 };

export default function AdminClientsPage() {
  const [items, setItems] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    try { setItems(await clientsApi.list()); } catch (e: any) { setError(e.message); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setError(''); setModalOpen(true); };
  const openEdit = (c: Client) => {
    setEditing(c);
    setForm({
      name: c.name, logo: c.logo || '', industry: c.industry || '',
      projectType: c.projectType || '', isVisible: c.isVisible, order: c.order || 0,
    });
    setError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setError('');
    try {
      if (editing) await clientsApi.update(editing._id, form);
      else await clientsApi.create(form);
      setModalOpen(false);
      await load();
    } catch (e: any) { setError(e.message); }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirmId) return;
    setDeleting(true);
    try { await clientsApi.remove(confirmId); setConfirmId(null); await load(); }
    catch (e: any) { setError(e.message); }
    setDeleting(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Clients</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700"><Plus size={16} /> Add Client</button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="animate-spin text-blue-600" size={24} /></div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-100 p-16 text-center text-sm text-slate-400">No clients yet.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(c => (
            <div key={c._id} className="bg-white rounded-xl border border-slate-100 p-4 text-center group">
              <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-3 overflow-hidden">
                {c.logo ? <img src={c.logo} alt={c.name} className="w-full h-full object-contain" /> : <span className="text-xl font-bold text-blue-600">{c.name[0]}</span>}
              </div>
              <p className="text-sm font-medium text-slate-900 truncate">{c.name}</p>
              <p className="text-xs text-slate-400 truncate">{c.industry}</p>
              {!c.isVisible && <span className="inline-block mt-1 text-[10px] text-slate-400">Hidden</span>}
              <div className="mt-3 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(c)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil size={14} /></button>
                <button onClick={() => setConfirmId(c._id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Client' : 'New Client'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs">{error}</div>}
          <Field label="Company Name" required>
            <TextInput required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="Logo URL">
            <TextInput placeholder="https://..." value={form.logo} onChange={e => setForm({ ...form, logo: e.target.value })} />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Industry">
              <TextInput value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })} />
            </Field>
            <Field label="Project Type">
              <TextInput value={form.projectType} onChange={e => setForm({ ...form, projectType: e.target.value })} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Display Order">
              <TextInput type="number" value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })} />
            </Field>
            <div className="pt-7">
              <Checkbox label="Visible" checked={form.isVisible} onChange={v => setForm({ ...form, isVisible: v })} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <CancelButton onClick={() => setModalOpen(false)} />
            <SubmitButton loading={saving}>{editing ? 'Save Changes' : 'Create Client'}</SubmitButton>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog
        open={!!confirmId}
        message="This client will be permanently deleted."
        onConfirm={handleDelete}
        onCancel={() => setConfirmId(null)}
        loading={deleting}
      />
    </div>
  );
}
