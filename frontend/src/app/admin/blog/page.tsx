'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import AdminModal from '@/components/admin/AdminModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Field, TextInput, TextArea, Select, SubmitButton, CancelButton } from '@/components/admin/FormField';
import { blogApi } from '@/lib/adminApi';

const statusColors: Record<string, string> = {
  published: 'bg-emerald-50 text-emerald-600',
  draft: 'bg-amber-50 text-amber-600',
  scheduled: 'bg-blue-50 text-blue-600',
};

type BlogPost = {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'scheduled';
  featuredImage: string;
  author: { name: string; avatar: string; bio: string };
  views: number;
  createdAt: string;
  publishedAt?: string;
};

const emptyForm = {
  title: '', excerpt: '', content: '', category: '', tags: '',
  status: 'draft' as 'draft' | 'published' | 'scheduled',
  featuredImage: '', authorName: '', authorBio: '',
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    try { setPosts(await blogApi.list()); } catch (e: any) { setError(e.message); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setError('');
    setModalOpen(true);
  };

  const openEdit = (p: BlogPost) => {
    setEditing(p);
    setForm({
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      category: p.category,
      tags: (p.tags || []).join(', '),
      status: p.status,
      featuredImage: p.featuredImage || '',
      authorName: p.author?.name || '',
      authorBio: p.author?.bio || '',
    });
    setError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const payload = {
      title: form.title,
      excerpt: form.excerpt,
      content: form.content,
      category: form.category,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      status: form.status,
      featuredImage: form.featuredImage,
      author: { name: form.authorName, avatar: '', bio: form.authorBio },
    };
    try {
      if (editing) await blogApi.update(editing._id, payload);
      else await blogApi.create(payload);
      setModalOpen(false);
      await load();
    } catch (e: any) { setError(e.message); }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirmId) return;
    setDeleting(true);
    try { await blogApi.remove(confirmId); setConfirmId(null); await load(); }
    catch (e: any) { setError(e.message); }
    setDeleting(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Blog Posts</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={16} /> New Post
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="animate-spin text-blue-600" size={24} /></div>
        ) : posts.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-16">No blog posts yet. Click &ldquo;New Post&rdquo; to create one.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-slate-100 text-left">
                <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Title</th>
                <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Category</th>
                <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Status</th>
                <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Views</th>
                <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Date</th>
                <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Actions</th>
              </tr></thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post._id} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">{post.title}</td>
                    <td className="px-4 py-3 text-sm text-slate-500">{post.category}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusColors[post.status]}`}>{post.status}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500">{post.views || 0}</td>
                    <td className="px-4 py-3 text-sm text-slate-400">
                      {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEdit(post)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Pencil size={14} /></button>
                        <button onClick={() => setConfirmId(post._id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Post' : 'New Post'} maxWidth="max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs">{error}</div>}
          <Field label="Title" required>
            <TextInput required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          </Field>
          <Field label="Excerpt" required>
            <TextArea required rows={2} value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} />
          </Field>
          <Field label="Content (HTML/Markdown)" required>
            <TextArea required rows={8} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Category" required>
              <TextInput required placeholder="Engineering" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
            </Field>
            <Field label="Status">
              <Select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as any })}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
              </Select>
            </Field>
          </div>
          <Field label="Tags (comma-separated)">
            <TextInput placeholder="react, nextjs, tutorial" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
          </Field>
          <Field label="Featured Image URL">
            <TextInput placeholder="https://..." value={form.featuredImage} onChange={e => setForm({ ...form, featuredImage: e.target.value })} />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Author Name" required>
              <TextInput required value={form.authorName} onChange={e => setForm({ ...form, authorName: e.target.value })} />
            </Field>
            <Field label="Author Bio">
              <TextInput value={form.authorBio} onChange={e => setForm({ ...form, authorBio: e.target.value })} />
            </Field>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <CancelButton onClick={() => setModalOpen(false)} />
            <SubmitButton loading={saving}>{editing ? 'Save Changes' : 'Create Post'}</SubmitButton>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog
        open={!!confirmId}
        message="This blog post will be permanently deleted."
        onConfirm={handleDelete}
        onCancel={() => setConfirmId(null)}
        loading={deleting}
      />
    </div>
  );
}
