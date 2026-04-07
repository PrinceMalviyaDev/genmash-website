const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message || 'Request failed');
  return json.data;
}

export const getProjects = (params?: string) => apiFetch<any[]>(`/projects${params ? `?${params}` : ''}`);
export const getFeaturedProjects = () => apiFetch<any[]>('/projects/featured');
export const getProject = (slug: string) => apiFetch<any>(`/projects/${slug}`);
export const getServices = () => apiFetch<any[]>('/services');
export const getService = (slug: string) => apiFetch<any>(`/services/${slug}`);
export const getBlogPosts = (params?: string) => apiFetch<any[]>(`/blog${params ? `?${params}` : ''}`);
export const getBlogPost = (slug: string) => apiFetch<any>(`/blog/${slug}`);
export const getTestimonials = () => apiFetch<any[]>('/testimonials');
export const getClients = () => apiFetch<any[]>('/clients');
export const getPricingPlans = () => apiFetch<any[]>('/pricing');
export const getTeamMembers = () => apiFetch<any[]>('/team');
export const getCareers = () => apiFetch<any[]>('/careers');
export const getCareer = (slug: string) => apiFetch<any>(`/careers/${slug}`);
export const getSettings = () => apiFetch<any>('/settings');

export const submitContact = (data: any) =>
  apiFetch('/contact', { method: 'POST', body: JSON.stringify(data) });

export const submitQuote = (data: any) =>
  apiFetch('/quotes', { method: 'POST', body: JSON.stringify(data) });

export const submitApplication = async (data: any, file?: File) => {
  const formData = new FormData();
  Object.entries(data).forEach(([k, v]) => formData.append(k, v as string));
  if (file) formData.append('resume', file);
  const res = await fetch(`${BASE_URL}/careers/apply`, { method: 'POST', body: formData });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message || 'Submission failed');
  return json.data;
};

export const subscribe = (email: string) =>
  apiFetch('/subscribers', { method: 'POST', body: JSON.stringify({ email }) });
