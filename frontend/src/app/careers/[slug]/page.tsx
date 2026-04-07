'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Briefcase, Clock, Send } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { getCareer, submitApplication } from '@/lib/api';

export default function JobDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getCareer(slug).then(setJob).catch(() => {}).finally(() => setLoading(false));
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const file = fd.get('resume') as File;
    fd.delete('resume');
    const data = Object.fromEntries(fd);
    data.jobPosting = job._id;
    data.role = job.title;
    try {
      await submitApplication(data, file?.size > 0 ? file : undefined);
      setSubmitted(true);
    } catch {}
    setSubmitting(false);
  };

  if (loading) return <div className="pt-40 pb-20 text-center text-slate-400">Loading...</div>;
  if (!job) return <div className="pt-40 pb-20 text-center"><h1 className="text-2xl font-bold text-slate-900">Job not found</h1><Link href="/careers" className="mt-4 inline-block text-blue-600">Back to Careers</Link></div>;

  const locationLabels: Record<string, string> = { remote: 'Remote', indore: 'Indore, India', hybrid: 'Hybrid' };

  return (
    <>
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/careers" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-blue-600 mb-6 transition-colors"><ArrowLeft size={14} /> Back to Careers</Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{job.title}</h1>
          <div className="mt-4 flex flex-wrap gap-3">
            <Badge>{job.jobType}</Badge>
            <Badge variant="success">{locationLabels[job.location] || job.location}</Badge>
            <span className="flex items-center gap-1 text-sm text-slate-500"><Briefcase size={14} /> {job.department}</span>
            <span className="flex items-center gap-1 text-sm text-slate-500"><Clock size={14} /> {job.experienceLevel}</span>
          </div>
        </div>
      </section>
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div><h2 className="text-xl font-bold text-slate-900 mb-3">About the Role</h2><p className="text-slate-600 leading-relaxed">{job.description}</p></div>
              {job.requirements?.length > 0 && <div><h2 className="text-xl font-bold text-slate-900 mb-3">Requirements</h2><ul className="space-y-2 text-slate-600">{job.requirements.map((r: string) => <li key={r} className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 shrink-0" />{r}</li>)}</ul></div>}
              {job.responsibilities?.length > 0 && <div><h2 className="text-xl font-bold text-slate-900 mb-3">Responsibilities</h2><ul className="space-y-2 text-slate-600">{job.responsibilities.map((r: string) => <li key={r} className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 shrink-0" />{r}</li>)}</ul></div>}
              {job.perks?.length > 0 && <div><h2 className="text-xl font-bold text-slate-900 mb-3">Perks</h2><div className="flex flex-wrap gap-2">{job.perks.map((p: string) => <span key={p} className="px-3 py-1.5 bg-blue-50 text-blue-600 text-sm rounded-full">{p}</span>)}</div></div>}
            </div>
            <div>
              {submitted ? (
                <div className="bg-emerald-50 rounded-2xl p-6 text-center"><h3 className="text-lg font-semibold text-emerald-700">Application Sent!</h3><p className="mt-2 text-sm text-emerald-600">We&apos;ll review and get back to you.</p></div>
              ) : (
                <div className="bg-slate-50 rounded-2xl p-6 sticky top-24">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Apply Now</h3>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input name="name" type="text" required placeholder="Full Name" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" />
                    <input name="email" type="email" required placeholder="Email" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" />
                    <input name="phone" type="tel" placeholder="Phone" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" />
                    <input name="experience" type="text" placeholder="Years of Experience" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" />
                    <input name="portfolioUrl" type="url" placeholder="Portfolio / LinkedIn URL" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" />
                    <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center"><p className="text-sm text-slate-400">Upload Resume (PDF)</p><input name="resume" type="file" accept=".pdf" className="mt-2 text-xs" /></div>
                    <textarea name="coverLetter" placeholder="Cover Letter (optional)" rows={3} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 resize-none" />
                    <button type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60">
                      {submitting ? 'Submitting...' : <><Send size={16} /> Submit Application</>}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
