'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import AdminModal from '@/components/admin/AdminModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Field, TextInput, TextArea, Checkbox, SubmitButton, CancelButton } from '@/components/admin/FormField';
import { servicesApi } from '@/lib/adminApi';

type Service = {
  _id: string;
  title: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  timeline: string;
  startingPrice: string;
  isActive: boolean;
  order: number;
};

const emptyForm = {
  title: '', icon: '', shortDescription: '', fullDescription: '',
  technologies: '', timeline: '', startingPrice: '', isActive: true, order: 0,
};

export default function AdminServicesPage() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    try { setItems(await servicesApi.list()); } catch (e: any) { setError(e.message); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setError(''); setModalOpen(true); };
  const openEdit = (s: Service) => {
    setEditing(s);
    setForm({
      title: s.title, icon: s.icon || '', shortDescription: s.shortDescription,
      fullDescription: s.fullDescription, technologies: (s.technologies || []).join(', '),
      timeline: s.timeline || '', startingPrice: s.startingPrice || '',
      isActive: s.isActive, order: s.order || 0,
    });
    setError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setError('');
    const payload = {
      title: form.title, icon: form.icon, shortDescription: form.shortDescription,
      fullDescription: form.fullDescription,
      technologies: form.technologies.split(',').map(t => t.trim()).filter(Boolean),
      timeline: form.timeline, startingPrice: form.startingPrice,
      isActive: form.isActive, order: Number(form.order) || 0,
    };
    try {
      if (editing) await servicesApi.update(editing._id, payload);
      else await servicesApi.create(payload);
      setModalOpen(false);
      await load();
    } catch (e: any) { setError(e.message); }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirmId) return;
    setDeleting(true);
    try { await servicesApi.remove(confirmId); setConfirmId(null); await load(); }
    catch (e: any) { setError(e.message); }
    setDeleting(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Services</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700"><Plus size={16} /> Add Service</button>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 divide-y divide-slate-50">
        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="animate-spin text-blue-600" size={24} /></div>
        ) : items.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-16">No services yet.</p>
        ) : (
          items.map(s => (
            <div key={s._id} className="flex items-center gap-3 p-4 hover:bg-slate-50/50">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">{s.title}</p>
                <p className="text-xs text-slate-500 line-clamp-1">{s.shortDescription}</p>
              </div>
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${s.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                {s.isActive ? 'Active' : 'Inactive'}
              </span>
              <button onClick={() => openEdit(s)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil size={14} /></button>
              <button onClick={() => setConfirmId(s._id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
            </div>
          ))
        )}
      </div>

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Service' : 'New Service'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs">{error}</div>}
          <Field label="Title" required>
            <TextInput required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          </Field>
          <Field label="Icon (emoji or name)">
            <TextInput placeholder="🚀 or lucide icon name" value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} />
          </Field>
          <Field label="Short Description" required>
            <TextArea required rows={2} value={form.shortDescription} onChange={e => setForm({ ...form, shortDescription: e.target.value })} />
          </Field>
          <Field label="Full Description" required>
            <TextArea required rows={5} value={form.fullDescription} onChange={e => setForm({ ...form, fullDescription: e.target.value })} />
          </Field>
          <Field label="Technologies (comma-separated)">
            <TextInput placeholder="React, Node.js" value={form.technologies} onChange={e => setForm({ ...form, technologies: e.target.value })} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Timeline">
              <TextInput placeholder="4-8 weeks" value={form.timeline} onChange={e => setForm({ ...form, timeline: e.target.value })} />
            </Field>
            <Field label="Starting Price">
              <TextInput placeholder="$500" value={form.startingPrice} onChange={e => setForm({ ...form, startingPrice: e.target.value })} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Display Order">
              <TextInput type="number" value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })} />
            </Field>
            <div className="pt-7">
              <Checkbox label="Active" checked={form.isActive} onChange={v => setForm({ ...form, isActive: v })} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <CancelButton onClick={() => setModalOpen(false)} />
            <SubmitButton loading={saving}>{editing ? 'Save Changes' : 'Create Service'}</SubmitButton>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog
        open={!!confirmId}
        message="This service will be permanently deleted."
        onConfirm={handleDelete}
        onCancel={() => setConfirmId(null)}
        loading={deleting}
      />
    </div>
  );
}
