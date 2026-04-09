'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Sparkles, Loader2, X } from 'lucide-react';
import AdminModal from '@/components/admin/AdminModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Field, TextInput, Checkbox, SubmitButton, CancelButton } from '@/components/admin/FormField';
import { pricingApi } from '@/lib/adminApi';

type Feature = { text: string; included: boolean };

type Plan = {
  _id: string;
  name: string;
  icon: string;
  targetAudience: string;
  startingPrice: string;
  features: Feature[];
  timeline: string;
  isPopular: boolean;
  isActive: boolean;
  order: number;
};

const emptyForm = {
  name: '', icon: '', targetAudience: '', startingPrice: '',
  features: [{ text: '', included: true }] as Feature[],
  timeline: '', isPopular: false, isActive: true, order: 0,
};

export default function AdminPricingPage() {
  const [items, setItems] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Plan | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    try { setItems(await pricingApi.list()); } catch (e: any) { setError(e.message); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setError(''); setModalOpen(true); };
  const openEdit = (p: Plan) => {
    setEditing(p);
    setForm({
      name: p.name, icon: p.icon || '', targetAudience: p.targetAudience,
      startingPrice: p.startingPrice,
      features: p.features?.length ? p.features : [{ text: '', included: true }],
      timeline: p.timeline || '', isPopular: p.isPopular, isActive: p.isActive,
      order: p.order || 0,
    });
    setError('');
    setModalOpen(true);
  };

  const addFeature = () => setForm({ ...form, features: [...form.features, { text: '', included: true }] });
  const removeFeature = (i: number) => setForm({ ...form, features: form.features.filter((_, idx) => idx !== i) });
  const updateFeature = (i: number, text: string) => {
    const next = [...form.features];
    next[i] = { ...next[i], text };
    setForm({ ...form, features: next });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setError('');
    const payload = {
      ...form,
      features: form.features.filter(f => f.text.trim()),
      order: Number(form.order) || 0,
    };
    try {
      if (editing) await pricingApi.update(editing._id, payload);
      else await pricingApi.create(payload);
      setModalOpen(false);
      await load();
    } catch (e: any) { setError(e.message); }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirmId) return;
    setDeleting(true);
    try { await pricingApi.remove(confirmId); setConfirmId(null); await load(); }
    catch (e: any) { setError(e.message); }
    setDeleting(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Pricing Plans</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700"><Plus size={16} /> Add Plan</button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="animate-spin text-blue-600" size={24} /></div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-100 p-16 text-center text-sm text-slate-400">No pricing plans yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map(p => (
            <div key={p._id} className={`bg-white rounded-xl border p-5 ${p.isPopular ? 'border-blue-200' : 'border-slate-100'}`}>
              {p.isPopular && <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full mb-2"><Sparkles size={10} /> Popular</span>}
              {!p.isActive && <span className="inline-block ml-1 px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded-full">Inactive</span>}
              <h3 className="text-lg font-semibold text-slate-900">{p.name}</h3>
              <p className="text-xs text-slate-500">{p.targetAudience}</p>
              <p className="text-2xl font-bold text-slate-900 mt-2">{p.startingPrice}</p>
              <p className="text-xs text-slate-400 mt-1">{p.features?.length || 0} features</p>
              <div className="mt-4 flex gap-1">
                <button onClick={() => openEdit(p)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil size={14} /></button>
                <button onClick={() => setConfirmId(p._id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Plan' : 'New Plan'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs">{error}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Plan Name" required>
              <TextInput required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </Field>
            <Field label="Icon">
              <TextInput value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} />
            </Field>
          </div>
          <Field label="Target Audience" required>
            <TextInput required placeholder="Small businesses" value={form.targetAudience} onChange={e => setForm({ ...form, targetAudience: e.target.value })} />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Starting Price" required>
              <TextInput required placeholder="$500" value={form.startingPrice} onChange={e => setForm({ ...form, startingPrice: e.target.value })} />
            </Field>
            <Field label="Timeline">
              <TextInput placeholder="4-6 weeks" value={form.timeline} onChange={e => setForm({ ...form, timeline: e.target.value })} />
            </Field>
          </div>
          <Field label="Features">
            <div className="space-y-2">
              {form.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <TextInput placeholder="Feature description" value={f.text} onChange={e => updateFeature(i, e.target.value)} />
                  <button type="button" onClick={() => removeFeature(i)} className="p-2 text-slate-400 hover:text-red-600"><X size={14} /></button>
                </div>
              ))}
              <button type="button" onClick={addFeature} className="text-xs text-blue-600 font-medium hover:underline">+ Add feature</button>
            </div>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Display Order">
              <TextInput type="number" value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })} />
            </Field>
            <div className="flex flex-col gap-2 pt-7">
              <Checkbox label="Popular" checked={form.isPopular} onChange={v => setForm({ ...form, isPopular: v })} />
              <Checkbox label="Active" checked={form.isActive} onChange={v => setForm({ ...form, isActive: v })} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <CancelButton onClick={() => setModalOpen(false)} />
            <SubmitButton loading={saving}>{editing ? 'Save Changes' : 'Create Plan'}</SubmitButton>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog
        open={!!confirmId}
        message="This pricing plan will be permanently deleted."
        onConfirm={handleDelete}
        onCancel={() => setConfirmId(null)}
        loading={deleting}
      />
    </div>
  );
}
