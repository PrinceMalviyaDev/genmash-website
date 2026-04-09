'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, Search, Loader2 } from 'lucide-react';
import AdminModal from '@/components/admin/AdminModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Field, TextInput, TextArea, Select, Checkbox, SubmitButton, CancelButton } from '@/components/admin/FormField';
import { projectsApi } from '@/lib/adminApi';

type Project = {
  _id: string;
  title: string;
  clientName: string;
  projectType: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  isVisible: boolean;
  isFeatured: boolean;
  order: number;
};

const emptyForm = {
  title: '', clientName: '', projectType: 'web', description: '', thumbnail: '',
  technologies: '', isVisible: true, isFeatured: false, order: 0,
};

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    try { setProjects(await projectsApi.list()); } catch (e: any) { setError(e.message); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setError(''); setModalOpen(true); };
  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({
      title: p.title, clientName: p.clientName, projectType: p.projectType,
      description: p.description, thumbnail: p.thumbnail || '',
      technologies: (p.technologies || []).join(', '),
      isVisible: p.isVisible, isFeatured: p.isFeatured, order: p.order || 0,
    });
    setError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setError('');
    const payload = {
      title: form.title, clientName: form.clientName, projectType: form.projectType,
      description: form.description, thumbnail: form.thumbnail,
      technologies: form.technologies.split(',').map(t => t.trim()).filter(Boolean),
      isVisible: form.isVisible, isFeatured: form.isFeatured, order: Number(form.order) || 0,
    };
    try {
      if (editing) await projectsApi.update(editing._id, payload);
      else await projectsApi.create(payload);
      setModalOpen(false);
      await load();
    } catch (e: any) { setError(e.message); }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirmId) return;
    setDeleting(true);
    try { await projectsApi.remove(confirmId); setConfirmId(null); await load(); }
    catch (e: any) { setError(e.message); }
    setDeleting(false);
  };

  const filtered = projects.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Portfolio Projects</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={16} /> Add Project
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" />
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="animate-spin text-blue-600" size={24} /></div>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-16">No projects found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-slate-100 text-left">
                <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Project</th>
                <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Client</th>
                <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Type</th>
                <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Status</th>
                <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Actions</th>
              </tr></thead>
              <tbody>
                {filtered.map(project => (
                  <tr key={project._id} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-slate-900">{project.title}</p>
                      {project.isFeatured && <span className="text-xs text-blue-600">Featured</span>}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500">{project.clientName}</td>
                    <td className="px-4 py-3"><span className="px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">{project.projectType}</span></td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${project.isVisible ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                        {project.isVisible ? <><Eye size={10} /> Visible</> : <><EyeOff size={10} /> Hidden</>}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEdit(project)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Pencil size={14} /></button>
                        <button onClick={() => setConfirmId(project._id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Project' : 'New Project'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs">{error}</div>}
          <Field label="Title" required>
            <TextInput required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Client Name" required>
              <TextInput required value={form.clientName} onChange={e => setForm({ ...form, clientName: e.target.value })} />
            </Field>
            <Field label="Project Type" required>
              <Select required value={form.projectType} onChange={e => setForm({ ...form, projectType: e.target.value })}>
                <option value="web">Web</option>
                <option value="mobile">Mobile</option>
                <option value="ai">AI</option>
                <option value="automation">Automation</option>
                <option value="game">Game</option>
                <option value="desktop">Desktop</option>
              </Select>
            </Field>
          </div>
          <Field label="Description" required>
            <TextArea required rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </Field>
          <Field label="Thumbnail URL">
            <TextInput placeholder="https://..." value={form.thumbnail} onChange={e => setForm({ ...form, thumbnail: e.target.value })} />
          </Field>
          <Field label="Technologies (comma-separated)">
            <TextInput placeholder="React, Node.js, MongoDB" value={form.technologies} onChange={e => setForm({ ...form, technologies: e.target.value })} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Display Order">
              <TextInput type="number" value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })} />
            </Field>
            <div className="flex flex-col gap-2 pt-7">
              <Checkbox label="Visible" checked={form.isVisible} onChange={v => setForm({ ...form, isVisible: v })} />
              <Checkbox label="Featured" checked={form.isFeatured} onChange={v => setForm({ ...form, isFeatured: v })} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <CancelButton onClick={() => setModalOpen(false)} />
            <SubmitButton loading={saving}>{editing ? 'Save Changes' : 'Create Project'}</SubmitButton>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog
        open={!!confirmId}
        message="This project will be permanently deleted."
        onConfirm={handleDelete}
        onCancel={() => setConfirmId(null)}
        loading={deleting}
      />
    </div>
  );
}
