'use client';

import { Plus, Pencil, Trash2, Search } from 'lucide-react';

const posts = [
  { id: '1', title: 'How to Choose the Right Tech Stack', category: 'Engineering', status: 'published', views: 245, date: 'Dec 15, 2025' },
  { id: '2', title: 'The Rise of AI Agents', category: 'AI', status: 'published', views: 189, date: 'Nov 28, 2025' },
  { id: '3', title: 'Building Scalable APIs', category: 'Backend', status: 'draft', views: 0, date: 'Nov 10, 2025' },
];

const statusColors: Record<string, string> = { published: 'bg-emerald-50 text-emerald-600', draft: 'bg-amber-50 text-amber-600', scheduled: 'bg-blue-50 text-blue-600' };

export default function AdminBlogPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Blog Posts</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"><Plus size={16} /> New Post</button>
      </div>
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
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
                <tr key={post.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">{post.title}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">{post.category}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusColors[post.status]}`}>{post.status}</span></td>
                  <td className="px-4 py-3 text-sm text-slate-500">{post.views}</td>
                  <td className="px-4 py-3 text-sm text-slate-400">{post.date}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1">
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Pencil size={14} /></button>
                    <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
