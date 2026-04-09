// Admin API client — authenticated CRUD wrappers for every resource.
// Token is stored in localStorage after login and sent as Bearer header.

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

const TOKEN_KEY = 'genmash_admin_token';
const ADMIN_KEY = 'genmash_admin_user';

export type AdminUser = { id: string; name: string; email: string; role: string };

// ─── Token storage ──────────────────────────────────────────────────────────
export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string) => {
  if (typeof window !== 'undefined') localStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
  }
};

export const getStoredAdmin = (): AdminUser | null => {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(ADMIN_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const setStoredAdmin = (admin: AdminUser) => {
  if (typeof window !== 'undefined') localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
};

// ─── Core fetch ─────────────────────────────────────────────────────────────
async function adminFetch<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const isFormData = options.body instanceof FormData;

  const headers: Record<string, string> = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string> | undefined),
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers, credentials: 'include' });

  // 401 — token missing/expired. Clear and bounce to login.
  if (res.status === 401 && typeof window !== 'undefined') {
    clearToken();
    if (!window.location.pathname.endsWith('/admin/login')) {
      window.location.href = '/admin/login';
    }
  }

  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.error?.message || `Request failed (${res.status})`);
  return json.data as T;
}

// ─── Auth ───────────────────────────────────────────────────────────────────
export const login = async (email: string, password: string) => {
  const data = await adminFetch<{ token: string; admin: AdminUser }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  setToken(data.token);
  setStoredAdmin(data.admin);
  return data;
};

export const logout = async () => {
  try { await adminFetch('/auth/logout', { method: 'POST' }); } catch { /* ignore */ }
  clearToken();
};

export const getMe = () => adminFetch<AdminUser>('/auth/me');

// ─── Dashboard ──────────────────────────────────────────────────────────────
export type DashboardData = {
  stats: {
    projects: number; blogPosts: number; messages: number; unreadMessages: number;
    quotes: number; newQuotes: number; applications: number; subscribers: number;
  };
  recentMessages: any[];
  recentQuotes: any[];
};
export const getDashboard = () => adminFetch<DashboardData>('/admin/dashboard');

// ─── Generic CRUD factory ───────────────────────────────────────────────────
function crud<T = any>(resource: string, adminListPath = `/${resource}/admin/all`) {
  return {
    list: () => adminFetch<T[]>(adminListPath),
    create: (body: Partial<T>) => adminFetch<T>(`/${resource}`, { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: Partial<T>) =>
      adminFetch<T>(`/${resource}/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
    remove: (id: string) => adminFetch<{ message: string }>(`/${resource}/${id}`, { method: 'DELETE' }),
  };
}

// ─── Resources ──────────────────────────────────────────────────────────────
export const blogApi = crud('blog');                    // /blog/admin/all
export const projectsApi = crud('projects');            // /projects/admin/all
export const servicesApi = crud('services');            // /services/admin/all
export const testimonialsApi = crud('testimonials');    // /testimonials/admin/all
export const clientsApi = crud('clients');              // /clients/admin/all
export const pricingApi = crud('pricing');              // /pricing/admin/all
export const teamApi = crud('team');                    // /team/admin/all
export const careersApi = crud('careers');              // /careers/admin/all

// ─── Contact messages (inquiries) ───────────────────────────────────────────
export const inquiriesApi = {
  list: () => adminFetch<any[]>('/contact'),
  update: (id: string, body: any) =>
    adminFetch(`/contact/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  remove: (id: string) => adminFetch(`/contact/${id}`, { method: 'DELETE' }),
};

// ─── Quote requests ─────────────────────────────────────────────────────────
export const quotesApi = {
  list: () => adminFetch<any[]>('/quotes'),
  update: (id: string, body: any) =>
    adminFetch(`/quotes/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  remove: (id: string) => adminFetch(`/quotes/${id}`, { method: 'DELETE' }),
};

// ─── Media (file upload) ────────────────────────────────────────────────────
export const mediaApi = {
  list: () => adminFetch<any[]>('/media'),
  upload: (file: File, folder = 'general') => {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('folder', folder);
    return adminFetch<any>('/media', { method: 'POST', body: fd });
  },
  remove: (id: string) => adminFetch(`/media/${id}`, { method: 'DELETE' }),
};

// ─── Site settings ──────────────────────────────────────────────────────────
export const settingsApi = {
  get: () => adminFetch<any>('/settings'),
  update: (body: any) => adminFetch('/settings', { method: 'PUT', body: JSON.stringify(body) }),
};
