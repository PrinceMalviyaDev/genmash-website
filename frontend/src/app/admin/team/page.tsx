'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import AdminModal from '@/components/admin/AdminModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Field, TextInput, TextArea, Checkbox, SubmitButton, CancelButton } from '@/components/admin/FormField';
import { teamApi } from '@/lib/adminApi';

type Member = {
  _id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  linkedin: string;
  github: string;
  order: number;
  isVisible: boolean;
};

const emptyForm = {
  name: '', role: '', photo: '', bio: '',
  linkedin: '', github: '', order: 0, isVisible: true,
};

export default function AdminTeamPage() {
  const [items, setItems] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Member | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    try { setItems(await teamApi.list()); } catch (e: any) { setError(e.message); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setError(''); setModalOpen(true); };
  const openEdit = (m: Member) => {
    setEditing(m);
    setForm({
      name: m.name, role: m.role, photo: m.photo || '', bio: m.bio || '',
      linkedin: m.linkedin || '', github: m.github || '',
      order: m.order || 0, isVisible: m.isVisible,
    });
    setError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setError('');
    const payload = { ...form, order: Number(form.order) || 0 };
    try {
      if (editing) await teamApi.update(editing._id, payload);
      else await teamApi.create(payload);
      setModalOpen(false);
      await load();
    } catch (e: any) { setError(e.message); }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirmId) return;
    setDeleting(true);
    try { await teamApi.remove(confirmId); setConfirmId(null); await load(); }
    catch (e: any) { setError(e.message); }
    setDeleting(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Team Members</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700"><Plus size={16} /> Add Member</button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="animate-spin text-blue-600" size={24} /></div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-100 p-16 text-center text-sm text-slate-400">No team members yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(m => (
            <div key={m._id} className="bg-white rounded-xl border border-slate-100 p-5 text-center">
              {m.photo ? (
                <img src={m.photo} alt={m.name} className="w-16 h-16 rounded-full object-cover mx-auto mb-3" />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
                  {m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
              )}
              <p className="font-semibold text-slate-900">{m.name}</p>
              <p className="text-sm text-blue-600">{m.role}</p>
              {!m.isVisible && <p className="text-[10px] text-slate-400 mt-1">Hidden</p>}
              <div className="mt-3 flex justify-center gap-1">
                <button onClick={() => openEdit(m)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil size={14} /></button>
                <button onClick={() => setConfirmId(m._id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Member' : 'New Member'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs">{error}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Name" required>
              <TextInput required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </Field>
            <Field label="Role" required>
              <TextInput required placeholder="Founder & CEO" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
            </Field>
          </div>
          <Field label="Photo URL">
            <TextInput placeholder="https://..." value={form.photo} onChange={e => setForm({ ...form, photo: e.target.value })} />
          </Field>
          <Field label="Bio">
            <TextArea rows={3} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="LinkedIn URL">
              <TextInput placeholder="https://linkedin.com/in/..." value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })} />
            </Field>
            <Field label="GitHub URL">
              <TextInput placeholder="https://github.com/..." value={form.github} onChange={e => setForm({ ...form, github: e.target.value })} />
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
            <SubmitButton loading={saving}>{editing ? 'Save Changes' : 'Create Member'}</SubmitButton>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog
        open={!!confirmId}
        message="This team member will be permanently deleted."
        onConfirm={handleDelete}
        onCancel={() => setConfirmId(null)}
        loading={deleting}
      />
    </div>
  );
}
