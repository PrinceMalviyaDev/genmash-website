'use client';

import { FolderOpen, FileText, Mail, ClipboardList, Users, TrendingUp, Eye, Clock } from 'lucide-react';

const stats = [
  { label: 'Total Projects', value: '24', icon: FolderOpen, color: 'bg-blue-50 text-blue-600' },
  { label: 'Blog Posts', value: '12', icon: FileText, color: 'bg-emerald-50 text-emerald-600' },
  { label: 'Inquiries', value: '38', icon: Mail, color: 'bg-amber-50 text-amber-600' },
  { label: 'Quote Requests', value: '15', icon: ClipboardList, color: 'bg-purple-50 text-purple-600' },
  { label: 'Applications', value: '22', icon: Users, color: 'bg-pink-50 text-pink-600' },
  { label: 'Subscribers', value: '156', icon: TrendingUp, color: 'bg-indigo-50 text-indigo-600' },
];

const recentMessages = [
  { name: 'John Smith', email: 'john@example.com', subject: 'Project Inquiry', time: '2 hours ago', unread: true },
  { name: 'Priya Sharma', email: 'priya@startup.io', subject: 'Partnership', time: '5 hours ago', unread: true },
  { name: 'Alex Chen', email: 'alex@tech.co', subject: 'Support', time: '1 day ago', unread: false },
];

const recentQuotes = [
  { name: 'Sarah Mitchell', project: 'E-commerce App', budget: '$5K-$15K', status: 'new' },
  { name: 'Raj Patel', project: 'AI Chatbot', budget: '$15K-$50K', status: 'in_review' },
  { name: 'Emily Davis', project: 'Website Redesign', budget: '$1K-$5K', status: 'quoted' },
];

const statusColors: Record<string, string> = {
  new: 'bg-blue-50 text-blue-600',
  in_review: 'bg-amber-50 text-amber-600',
  quoted: 'bg-emerald-50 text-emerald-600',
};

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border border-slate-100 p-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color} mb-3`}>
              <stat.icon size={20} />
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <div className="bg-white rounded-xl border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Recent Messages</h2>
            <span className="text-xs text-blue-600 font-medium">View All</span>
          </div>
          <div className="space-y-3">
            {recentMessages.map(msg => (
              <div key={msg.email} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 text-sm font-bold shrink-0">{msg.name[0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-slate-900 truncate">{msg.name}</p>
                    {msg.unread && <span className="w-2 h-2 bg-blue-600 rounded-full shrink-0" />}
                  </div>
                  <p className="text-xs text-slate-500 truncate">{msg.subject}</p>
                </div>
                <span className="text-xs text-slate-400 shrink-0 flex items-center gap-1"><Clock size={10} />{msg.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Quotes */}
        <div className="bg-white rounded-xl border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Recent Quotes</h2>
            <span className="text-xs text-blue-600 font-medium">View All</span>
          </div>
          <div className="space-y-3">
            {recentQuotes.map(q => (
              <div key={q.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-slate-900">{q.name}</p>
                  <p className="text-xs text-slate-500">{q.project} &bull; {q.budget}</p>
                </div>
                <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${statusColors[q.status]}`}>
                  {q.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
