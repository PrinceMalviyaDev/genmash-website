'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Star, Loader2 } from 'lucide-react';
import AdminModal from '@/components/admin/AdminModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Field, TextInput, TextArea, Select, Checkbox, SubmitButton, CancelButton } from '@/components/admin/FormField';
import { testimonialsApi } from '@/lib/adminApi';

type Testimonial = {
  _id: string;
  clientName: string;
  company: string;
  designation: string;
  photo: string;
  review: string;
  rating: number;
  projectType: string;
  isFeatured: boolean;
  isVisible: boolean;
};

const emptyForm = {
  clientName: '', company: '', designation: '', photo: '',
  review: '', rating: 5, projectType: '', isFeatured: false, isVisible: true,
};

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    try { setItems(await testimonialsApi.list()); } catch (e: any) { setError(e.message); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setError(''); setModalOpen(true); };
  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({
      clientName: t.clientName, company: t.company, designation: t.designation || '',
      photo: t.photo || '', review: t.review, rating: t.rating,
      projectType: t.projectType || '', isFeatured: t.isFeatured, isVisible: t.isVisible,
    });
    setError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setError('');
    try {
      if (editing) await testimonialsApi.update(editing._id, form);
      else await testimonialsApi.create(form);
      setModalOpen(false);
      await load();
    } catch (e: any) { setError(e.message); }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirmId) return;
    setDeleting(true);
    try { await testimonialsApi.remove(confirmId); setConfirmId(null); await load(); }
    catch (e: any) { setError(e.message); }
    setDeleting(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Testimonials</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700"><Plus size={16} /> Add Testimonial</button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="animate-spin text-blue-600" size={24} /></div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-100 p-16 text-center text-sm text-slate-400">No testimonials yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map(t => (
            <div key={t._id} className="bg-white rounded-xl border border-slate-100 p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900">{t.clientName}</p>
                  <p className="text-sm text-slate-500">{t.company}</p>
                  <div className="flex gap-0.5 mt-2">
                    {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={12} className="text-amber-400 fill-amber-400" />)}
                  </div>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">{t.review}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  {t.isFeatured && <span className="px-2 py-0.5 text-xs bg-blue-50 text-blue-600 rounded-full">Featured</span>}
                  {!t.isVisible && <span className="px-2 py-0.5 text-xs bg-slate-100 text-slate-500 rounded-full">Hidden</span>}
                  <div className="flex gap-1 mt-1">
                    <button onClick={() => openEdit(t)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil size={14} /></button>
                    <button onClick={() => setConfirmId(t._id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Testimonial' : 'New Testimonial'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs">{error}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Client Name" required>
              <TextInput required value={form.clientName} onChange={e => setForm({ ...form, clientName: e.target.value })} />
            </Field>
            <Field label="Company" required>
              <TextInput required value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
            </Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Designation">
              <TextInput value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })} />
            </Field>
            <Field label="Photo URL">
              <TextInput placeholder="https://..." value={form.photo} onChange={e => setForm({ ...form, photo: e.target.value })} />
            </Field>
          </div>
          <Field label="Review" required>
            <TextArea required rows={4} value={form.review} onChange={e => setForm({ ...form, review: e.target.value })} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Rating" required>
              <Select value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })}>
                {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} star{n !== 1 && 's'}</option>)}
              </Select>
            </Field>
            <Field label="Project Type">
              <TextInput placeholder="web / mobile / ai" value={form.projectType} onChange={e => setForm({ ...form, projectType: e.target.value })} />
            </Field>
          </div>
          <div className="flex gap-6">
            <Checkbox label="Featured" checked={form.isFeatured} onChange={v => setForm({ ...form, isFeatured: v })} />
            <Checkbox label="Visible" checked={form.isVisible} onChange={v => setForm({ ...form, isVisible: v })} />
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <CancelButton onClick={() => setModalOpen(false)} />
            <SubmitButton loading={saving}>{editing ? 'Save Changes' : 'Create Testimonial'}</SubmitButton>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog
        open={!!confirmId}
        message="This testimonial will be permanently deleted."
        onConfirm={handleDelete}
        onCancel={() => setConfirmId(null)}
        loading={deleting}
      />
    </div>
  );
}
