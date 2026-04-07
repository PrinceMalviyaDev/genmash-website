'use client';
import { Plus, Pencil, Trash2, Users } from 'lucide-react';
const jobs = [
  { id: '1', title: 'Senior Full Stack Developer', department: 'Engineering', location: 'Hybrid', applications: 8, isActive: true },
  { id: '2', title: 'React Native Developer', department: 'Mobile', location: 'Remote', applications: 5, isActive: true },
  { id: '3', title: 'AI/ML Engineer', department: 'AI', location: 'Indore', applications: 12, isActive: true },
  { id: '4', title: 'Frontend Intern', department: 'Engineering', location: 'Indore', applications: 22, isActive: true },
];
export default function AdminCareersPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Job Postings</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700"><Plus size={16} /> Add Job</button>
      </div>
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-slate-100 text-left">
            <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Job Title</th>
            <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Department</th>
            <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Location</th>
            <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Applications</th>
            <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Actions</th>
          </tr></thead>
          <tbody>
            {jobs.map(j => (
              <tr key={j.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                <td className="px-4 py-3 text-sm font-medium text-slate-900">{j.title}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{j.department}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{j.location}</td>
                <td className="px-4 py-3"><span className="inline-flex items-center gap-1 text-sm text-blue-600"><Users size={12} />{j.applications}</span></td>
                <td className="px-4 py-3"><div className="flex gap-1">
                  <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil size={14} /></button>
                  <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
