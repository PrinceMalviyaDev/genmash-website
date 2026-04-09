'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getToken, getStoredAdmin, AdminUser } from '@/lib/adminApi';

/**
 * Client-side admin auth guard.
 * Redirects to /admin/login if no token is present.
 * Returns { admin, ready } — `ready` flips to true once the check completes.
 */
export function useAdminAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // login page does not need the guard
    if (pathname === '/admin/login') {
      setReady(true);
      return;
    }
    const token = getToken();
    if (!token) {
      router.replace('/admin/login');
      return;
    }
    setAdmin(getStoredAdmin());
    setReady(true);
  }, [pathname, router]);

  return { admin, ready };
}
