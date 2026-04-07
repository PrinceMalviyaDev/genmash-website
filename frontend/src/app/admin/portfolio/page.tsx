'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, Search } from 'lucide-react';

const sampleProjects = [
  { id: '1', title: 'E-Commerce Platform', clientName: 'RetailMax', projectType: 'web', isVisible: true, isFeatured: true },
  { id: '2', title: 'Healthcare App', clientName: 'MediCare Plus', projectType: 'mobile', isVisible: true, isFeatured: false },
  { id: '3', title: 'AI Support Bot', clientName: 'TechCorp', projectType: 'ai', isVisible: true, isFeatured: true },
  { id: '4', title: 'Logistics Dashboard', clientName: 'LogiFlow', projectType: 'web', isVisible: false, isFeatured: false },
];

export default function AdminPortfolioPage() {
  const [search, setSearch] = useState('');
  const filtered = sampleProjects.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Portfolio Projects</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
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
                <tr key={project.id} className="border-b border-slate-50 hover:bg-slate-50/50">
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
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Pencil size={14} /></button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
