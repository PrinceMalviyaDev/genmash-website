'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Loader2, X } from 'lucide-react';
import AdminModal from '@/components/admin/AdminModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Field, TextInput, TextArea, Select, Checkbox, SubmitButton, CancelButton } from '@/components/admin/FormField';
import { careersApi } from '@/lib/adminApi';

type Job = {
  _id: string;
  title: string;
  department: string;
  location: 'remote' | 'indore' | 'hybrid';
  experienceLevel: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship';
  description: string;
  requirements: string[];
  responsibilities: string[];
  perks: string[];
  isActive: boolean;
};

const emptyForm = {
  title: '', department: '',
  location: 'remote' as 'remote' | 'indore' | 'hybrid',
  experienceLevel: '',
  jobType: 'full-time' as 'full-time' | 'part-time' | 'contract' | 'internship',
  description: '',
  requirements: [''],
  responsibilities: [''],
  perks: [''],
  isActive: true,
};

type ListKey = 'requirements' | 'responsibilities' | 'perks';

export default function AdminCareersPage() {
  const [items, setItems] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Job | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    try { setItems(await careersApi.list()); } catch (e: any) { setError(e.message); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setError(''); setModalOpen(true); };
  const openEdit = (j: Job) => {
    setEditing(j);
    setForm({
      title: j.title, department: j.department, location: j.location,
      experienceLevel: j.experienceLevel, jobType: j.jobType, description: j.description,
      requirements: j.requirements?.length ? j.requirements : [''],
      responsibilities: j.responsibilities?.length ? j.responsibilities : [''],
      perks: j.perks?.length ? j.perks : [''],
      isActive: j.isActive,
    });
    setError('');
    setModalOpen(true);
  };

  const addItem = (key: ListKey) => setForm({ ...form, [key]: [...form[key], ''] });
  const removeItem = (key: ListKey, i: number) => setForm({ ...form, [key]: form[key].filter((_, idx) => idx !== i) });
  const updateItem = (key: ListKey, i: number, value: string) => {
    const next = [...form[key]];
    next[i] = value;
    setForm({ ...form, [key]: next });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setError('');
    const payload = {
      ...form,
      requirements: form.requirements.filter(x => x.trim()),
      responsibilities: form.responsibilities.filter(x => x.trim()),
      perks: form.perks.filter(x => x.trim()),
    };
    try {
      if (editing) await careersApi.update(editing._id, payload);
      else await careersApi.create(payload);
      setModalOpen(false);
      await load();
    } catch (e: any) { setError(e.message); }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirmId) return;
    setDeleting(true);
    try { await careersApi.remove(confirmId); setConfirmId(null); await load(); }
    catch (e: any) { setError(e.message); }
    setDeleting(false);
  };

  const ListEditor = ({ label, field }: { label: string; field: ListKey }) => (
    <Field label={label}>
      <div className="space-y-2">
        {form[field].map((val, i) => (
          <div key={i} className="flex items-center gap-2">
            <TextInput value={val} onChange={e => updateItem(field, i, e.target.value)} />
            <button type="button" onClick={() => removeItem(field, i)} className="p-2 text-slate-400 hover:text-red-600"><X size={14} /></button>
          </div>
        ))}
        <button type="button" onClick={() => addItem(field)} className="text-xs text-blue-600 font-medium hover:underline">+ Add</button>
      </div>
    </Field>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Job Postings</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700"><Plus size={16} /> Add Job</button>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="animate-spin text-blue-600" size={24} /></div>
        ) : items.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-16">No job postings yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-slate-100 text-left">
                <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Title</th>
                <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Department</th>
                <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Location</th>
                <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Type</th>
                <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Status</th>
                <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Actions</th>
              </tr></thead>
              <tbody>
                {items.map(j => (
                  <tr key={j._id} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">{j.title}</td>
                    <td className="px-4 py-3 text-sm text-slate-500">{j.department}</td>
                    <td className="px-4 py-3 text-sm text-slate-500 capitalize">{j.location}</td>
                    <td className="px-4 py-3 text-sm text-slate-500">{j.jobType}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${j.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                        {j.isActive ? 'Active' : 'Closed'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button onClick={() => openEdit(j)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil size={14} /></button>
                        <button onClick={() => setConfirmId(j._id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Job' : 'New Job'} maxWidth="max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs">{error}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Title" required>
              <TextInput required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </Field>
            <Field label="Department" required>
              <TextInput required placeholder="Engineering" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} />
            </Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Location" required>
              <Select value={form.location} onChange={e => setForm({ ...form, location: e.target.value as any })}>
                <option value="remote">Remote</option>
                <option value="indore">Indore</option>
                <option value="hybrid">Hybrid</option>
              </Select>
            </Field>
            <Field label="Job Type" required>
              <Select value={form.jobType} onChange={e => setForm({ ...form, jobType: e.target.value as any })}>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </Select>
            </Field>
            <Field label="Experience Level" required>
              <TextInput required placeholder="2-4 years" value={form.experienceLevel} onChange={e => setForm({ ...form, experienceLevel: e.target.value })} />
            </Field>
          </div>
          <Field label="Description" required>
            <TextArea required rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </Field>
          <ListEditor label="Requirements" field="requirements" />
          <ListEditor label="Responsibilities" field="responsibilities" />
          <ListEditor label="Perks" field="perks" />
          <Checkbox label="Active (visible on careers page)" checked={form.isActive} onChange={v => setForm({ ...form, isActive: v })} />
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <CancelButton onClick={() => setModalOpen(false)} />
            <SubmitButton loading={saving}>{editing ? 'Save Changes' : 'Create Job'}</SubmitButton>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog
        open={!!confirmId}
        message="This job posting will be permanently deleted."
        onConfirm={handleDelete}
        onCancel={() => setConfirmId(null)}
        loading={deleting}
      />
    </div>
  );
}
