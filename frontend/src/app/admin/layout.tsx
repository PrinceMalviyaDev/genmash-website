'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, FolderOpen, FileText, Users, Star,
  Building2, DollarSign, Briefcase, Mail, ClipboardList, Settings,
  Image, Menu, X, LogOut, Home,
} from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { logout } from '@/lib/adminApi';

const sidebarLinks = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Portfolio', href: '/admin/portfolio', icon: FolderOpen },
  { label: 'Blog', href: '/admin/blog', icon: FileText },
  { label: 'Services', href: '/admin/services', icon: Building2 },
  { label: 'Testimonials', href: '/admin/testimonials', icon: Star },
  { label: 'Clients', href: '/admin/clients', icon: Users },
  { label: 'Pricing', href: '/admin/pricing', icon: DollarSign },
  { label: 'Team', href: '/admin/team', icon: Users },
  { label: 'Careers', href: '/admin/careers', icon: Briefcase },
  { label: 'Inquiries', href: '/admin/inquiries', icon: Mail },
  { label: 'Quotes', href: '/admin/quotes', icon: ClipboardList },
  { label: 'Media', href: '/admin/media', icon: Image },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, ready } = useAdminAuth();

  // login page has its own layout
  if (pathname === '/admin/login') return <>{children}</>;

  // Wait for auth check so we don't flash-render protected content
  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-6 h-6 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.replace('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-slate-900 transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">G</span>
            </div>
            <span className="text-white font-bold">GenMash <span className="text-xs text-slate-400 font-normal">Admin</span></span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400"><X size={20} /></button>
        </div>

        <nav className="mt-4 px-3 space-y-0.5 overflow-y-auto max-h-[calc(100vh-180px)]">
          {sidebarLinks.map(link => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link key={link.href} href={link.href} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                <link.icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800 space-y-2">
          <Link href="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
            <Home size={16} /> Back to Website
          </Link>
          <button onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        <header className="sticky top-0 z-30 bg-white border-b border-slate-100 px-4 lg:px-8 h-16 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-500 hover:text-slate-900">
            <Menu size={20} />
          </button>
          <div className="text-sm text-slate-500">
            {sidebarLinks.find(l => pathname.startsWith(l.href))?.label || 'Admin'}
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <div className="text-xs font-medium text-slate-900">{admin?.name || 'Admin'}</div>
              <div className="text-[10px] text-slate-400">{admin?.role || ''}</div>
            </div>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {(admin?.name || 'A')[0].toUpperCase()}
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
