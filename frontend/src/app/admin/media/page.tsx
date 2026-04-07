'use client';
import { Upload, Trash2, Image, FileText } from 'lucide-react';
const files = [
  { id: '1', name: 'hero-banner.jpg', type: 'image', size: '245 KB', date: 'Apr 5, 2026' },
  { id: '2', name: 'project-screenshot.png', type: 'image', size: '1.2 MB', date: 'Apr 3, 2026' },
  { id: '3', name: 'proposal.pdf', type: 'document', size: '890 KB', date: 'Apr 1, 2026' },
  { id: '4', name: 'team-photo.jpg', type: 'image', size: '2.1 MB', date: 'Mar 28, 2026' },
];
export default function AdminMediaPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Media Library</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700"><Upload size={16} /> Upload</button>
      </div>
      <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center mb-8 hover:border-blue-300 transition-colors">
        <Upload size={32} className="text-slate-300 mx-auto mb-3" />
        <p className="text-sm text-slate-500">Drag and drop files here, or click to browse</p>
        <p className="text-xs text-slate-400 mt-1">PNG, JPG, PDF, DOC up to 10MB</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {files.map(f => (
          <div key={f.id} className="bg-white rounded-xl border border-slate-100 overflow-hidden group">
            <div className="h-28 bg-slate-50 flex items-center justify-center">
              {f.type === 'image' ? <Image size={28} className="text-slate-300" /> : <FileText size={28} className="text-slate-300" />}
            </div>
            <div className="p-3">
              <p className="text-xs font-medium text-slate-900 truncate">{f.name}</p>
              <p className="text-xs text-slate-400">{f.size}</p>
              <button className="mt-2 p-1 text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
