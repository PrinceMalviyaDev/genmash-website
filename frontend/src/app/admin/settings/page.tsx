'use client';
import { Save } from 'lucide-react';
export default function AdminSettingsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Site Settings</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700"><Save size={16} /> Save Changes</button>
      </div>
      <div className="space-y-6 max-w-2xl">
        <div className="bg-white rounded-xl border border-slate-100 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Company Information</h2>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label><input type="text" defaultValue="GenMash Software Solutions" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" /></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Tagline</label><input type="text" defaultValue="Transforming Ideas into Digital Reality" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Email</label><input type="email" defaultValue="contact@genmash.com" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Phone</label><input type="tel" defaultValue="+91 98765 43210" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" /></div>
            </div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Address</label><input type="text" defaultValue="Indore, Madhya Pradesh, India" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" /></div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Social Links</h2>
          <div className="space-y-3">
            {['LinkedIn', 'GitHub', 'Twitter', 'Instagram'].map(s => (
              <div key={s}><label className="block text-sm font-medium text-slate-700 mb-1">{s}</label><input type="url" placeholder={`https://${s.toLowerCase()}.com/genmash`} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" /></div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">SEO Defaults</h2>
          <div className="space-y-3">
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Default Page Title</label><input type="text" defaultValue="GenMash Software Solutions" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" /></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Default Description</label><textarea defaultValue="Custom software development company..." rows={3} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 resize-none" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
