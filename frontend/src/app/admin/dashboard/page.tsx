'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FolderOpen, FileText, Mail, ClipboardList, Users, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { getDashboard, DashboardData } from '@/lib/adminApi';

const statusColors: Record<string, string> = {
  new: 'bg-blue-50 text-blue-600',
  in_review: 'bg-amber-50 text-amber-600',
  quoted: 'bg-purple-50 text-purple-600',
  won: 'bg-emerald-50 text-emerald-600',
  lost: 'bg-red-50 text-red-600',
};

function timeAgo(date: string): string {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(date).toLocaleDateString();
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getDashboard()
      .then(d => { setData(d); setLoading(false); })
      .catch(err => { setError(err?.message || 'Failed to load'); setLoading(false); });
  }, []);

  const stats = data ? [
    { label: 'Total Projects', value: data.stats.projects, icon: FolderOpen, color: 'bg-blue-50 text-blue-600' },
    { label: 'Blog Posts', value: data.stats.blogPosts, icon: FileText, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Inquiries', value: data.stats.messages, icon: Mail, color: 'bg-amber-50 text-amber-600', badge: data.stats.unreadMessages },
    { label: 'Quote Requests', value: data.stats.quotes, icon: ClipboardList, color: 'bg-purple-50 text-purple-600', badge: data.stats.newQuotes },
    { label: 'Applications', value: data.stats.applications, icon: Users, color: 'bg-pink-50 text-pink-600' },
    { label: 'Subscribers', value: data.stats.subscribers, icon: TrendingUp, color: 'bg-indigo-50 text-indigo-600' },
  ] : [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard</h1>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
        </div>
      )}

      {error && !loading && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
          <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {data && !loading && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
            {stats.map(stat => (
              <div key={stat.label} className="bg-white rounded-xl border border-slate-100 p-4 relative">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color} mb-3`}>
                  <stat.icon size={20} />
                </div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
                {'badge' in stat && stat.badge ? (
                  <span className="absolute top-3 right-3 px-1.5 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded-full">
                    {stat.badge} new
                  </span>
                ) : null}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-slate-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900">Recent Messages</h2>
                <Link href="/admin/inquiries" className="text-xs text-blue-600 font-medium hover:underline">View All</Link>
              </div>
              {data.recentMessages.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-8">No messages yet</p>
              ) : (
                <div className="space-y-3">
                  {data.recentMessages.slice(0, 5).map((msg: any) => (
                    <div key={msg._id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 text-sm font-bold shrink-0">
                        {msg.name?.[0]?.toUpperCase() || '?'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-slate-900 truncate">{msg.name}</p>
                          {!msg.isRead && <span className="w-2 h-2 bg-blue-600 rounded-full shrink-0" />}
                        </div>
                        <p className="text-xs text-slate-500 truncate">{msg.subject}</p>
                      </div>
                      <span className="text-xs text-slate-400 shrink-0 flex items-center gap-1">
                        <Clock size={10} />{timeAgo(msg.createdAt)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-slate-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900">Recent Quotes</h2>
                <Link href="/admin/quotes" className="text-xs text-blue-600 font-medium hover:underline">View All</Link>
              </div>
              {data.recentQuotes.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-8">No quotes yet</p>
              ) : (
                <div className="space-y-3">
                  {data.recentQuotes.slice(0, 5).map((q: any) => (
                    <div key={q._id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">{q.name}</p>
                        <p className="text-xs text-slate-500 truncate">{q.projectType} &bull; {q.budgetRange}</p>
                      </div>
                      <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${statusColors[q.status] || 'bg-slate-100 text-slate-600'}`}>
                        {q.status?.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
