'use client';

import { Mail, MailOpen, Trash2, Clock } from 'lucide-react';

const messages = [
  { id: '1', name: 'John Smith', email: 'john@example.com', subject: 'Project Inquiry', message: 'Hi, I need a website for my business...', isRead: false, date: 'Apr 5, 2026' },
  { id: '2', name: 'Priya Sharma', email: 'priya@startup.io', subject: 'Partnership', message: 'We would like to discuss a partnership...', isRead: false, date: 'Apr 4, 2026' },
  { id: '3', name: 'Alex Chen', email: 'alex@tech.co', subject: 'Support Request', message: 'I need help with the app you built...', isRead: true, date: 'Apr 3, 2026' },
  { id: '4', name: 'Lisa Park', email: 'lisa@design.co', subject: 'General Inquiry', message: 'Do you offer UI/UX design services?', isRead: true, date: 'Apr 2, 2026' },
];

export default function AdminInquiriesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Contact Messages</h1>
      <div className="space-y-3">
        {messages.map(msg => (
          <div key={msg.id} className={`bg-white rounded-xl border p-5 hover:shadow-sm transition-shadow ${msg.isRead ? 'border-slate-100' : 'border-blue-200 bg-blue-50/30'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.isRead ? 'bg-slate-100 text-slate-400' : 'bg-blue-100 text-blue-600'}`}>
                  {msg.isRead ? <MailOpen size={18} /> : <Mail size={18} />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className={`text-sm ${msg.isRead ? 'text-slate-700' : 'font-semibold text-slate-900'}`}>{msg.name}</p>
                    <span className="text-xs text-slate-400">{msg.email}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-900 mt-0.5">{msg.subject}</p>
                  <p className="text-sm text-slate-500 mt-1 line-clamp-1">{msg.message}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-slate-400 flex items-center gap-1"><Clock size={10} />{msg.date}</span>
                <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
