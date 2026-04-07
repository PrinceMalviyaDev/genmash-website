'use client';
import { Plus, Pencil, Trash2, Link2 } from 'lucide-react';
const members = [
  { id: '1', name: 'Hariom Malviya', role: 'Founder & CEO' },
  { id: '2', name: 'Srishti Doshi', role: 'Co-Founder & CTO' },
  { id: '3', name: 'Ankit Patel', role: 'Lead Developer' },
  { id: '4', name: 'Priya Sharma', role: 'UI/UX Designer' },
];
export default function AdminTeamPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Team Members</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700"><Plus size={16} /> Add Member</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map(m => (
          <div key={m.id} className="bg-white rounded-xl border border-slate-100 p-5 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">{m.name.split(' ').map(n => n[0]).join('')}</div>
            <p className="font-semibold text-slate-900">{m.name}</p>
            <p className="text-sm text-blue-600">{m.role}</p>
            <div className="mt-3 flex justify-center gap-1">
              <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil size={14} /></button>
              <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
