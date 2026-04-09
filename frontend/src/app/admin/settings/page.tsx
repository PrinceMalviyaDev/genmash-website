'use client';

import { useEffect, useState } from 'react';
import { Save, Loader2, Check } from 'lucide-react';
import { Field, TextInput, TextArea } from '@/components/admin/FormField';
import { settingsApi } from '@/lib/adminApi';

type Settings = {
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  googleMapsEmbed: string;
  socialLinks: { linkedin: string; github: string; twitter: string; instagram: string };
  seo: { defaultTitle: string; defaultDescription: string; ogImage: string };
  officeHours: string;
};

const empty: Settings = {
  companyName: '', tagline: '', email: '', phone: '', whatsapp: '',
  address: '', googleMapsEmbed: '',
  socialLinks: { linkedin: '', github: '', twitter: '', instagram: '' },
  seo: { defaultTitle: '', defaultDescription: '', ogImage: '' },
  officeHours: '',
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState<Settings>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    settingsApi.get()
      .then(data => { setForm({ ...empty, ...data }); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setError(''); setSaved(false);
    try {
      await settingsApi.update(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e: any) { setError(e.message); }
    setSaving(false);
  };

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" size={24} /></div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Site Settings</h1>
        <button type="submit" disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-60">
          {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <Check size={16} /> : <Save size={16} />}
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      {error && <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-xs max-w-2xl">{error}</div>}

      <div className="space-y-6 max-w-2xl">
        <div className="bg-white rounded-xl border border-slate-100 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Company Information</h2>
          <div className="space-y-4">
            <Field label="Company Name">
              <TextInput value={form.companyName} onChange={e => setForm({ ...form, companyName: e.target.value })} />
            </Field>
            <Field label="Tagline">
              <TextInput value={form.tagline} onChange={e => setForm({ ...form, tagline: e.target.value })} />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Email">
                <TextInput type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </Field>
              <Field label="Phone">
                <TextInput type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </Field>
            </div>
            <Field label="WhatsApp">
              <TextInput type="tel" value={form.whatsapp} onChange={e => setForm({ ...form, whatsapp: e.target.value })} />
            </Field>
            <Field label="Address">
              <TextInput value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
            </Field>
            <Field label="Office Hours">
              <TextInput value={form.officeHours} onChange={e => setForm({ ...form, officeHours: e.target.value })} />
            </Field>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Social Links</h2>
          <div className="space-y-3">
            <Field label="LinkedIn">
              <TextInput type="url" placeholder="https://linkedin.com/company/..."
                value={form.socialLinks.linkedin}
                onChange={e => setForm({ ...form, socialLinks: { ...form.socialLinks, linkedin: e.target.value } })} />
            </Field>
            <Field label="GitHub">
              <TextInput type="url" placeholder="https://github.com/..."
                value={form.socialLinks.github}
                onChange={e => setForm({ ...form, socialLinks: { ...form.socialLinks, github: e.target.value } })} />
            </Field>
            <Field label="Twitter">
              <TextInput type="url" placeholder="https://twitter.com/..."
                value={form.socialLinks.twitter}
                onChange={e => setForm({ ...form, socialLinks: { ...form.socialLinks, twitter: e.target.value } })} />
            </Field>
            <Field label="Instagram">
              <TextInput type="url" placeholder="https://instagram.com/..."
                value={form.socialLinks.instagram}
                onChange={e => setForm({ ...form, socialLinks: { ...form.socialLinks, instagram: e.target.value } })} />
            </Field>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">SEO Defaults</h2>
          <div className="space-y-3">
            <Field label="Default Page Title">
              <TextInput value={form.seo.defaultTitle}
                onChange={e => setForm({ ...form, seo: { ...form.seo, defaultTitle: e.target.value } })} />
            </Field>
            <Field label="Default Description">
              <TextArea rows={3} value={form.seo.defaultDescription}
                onChange={e => setForm({ ...form, seo: { ...form.seo, defaultDescription: e.target.value } })} />
            </Field>
            <Field label="Default OG Image URL">
              <TextInput type="url" value={form.seo.ogImage}
                onChange={e => setForm({ ...form, seo: { ...form.seo, ogImage: e.target.value } })} />
            </Field>
          </div>
        </div>
      </div>
    </form>
  );
}
