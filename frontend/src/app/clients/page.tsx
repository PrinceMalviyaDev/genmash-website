'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getClients } from '@/lib/api';

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClients().then(setClients).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-600 font-semibold text-sm tracking-wide uppercase mb-3">Our Clients</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">Companies We&apos;ve Worked With</h1>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">Trusted by startups and enterprises across industries worldwide.</p>
        </div>
      </section>
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? <div className="text-center py-20 text-slate-400">Loading...</div> : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {clients.map((client: any, i: number) => (
                <motion.div key={client._id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                  className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-white rounded-xl border border-slate-100 flex items-center justify-center mx-auto mb-3"><span className="text-2xl font-bold text-blue-600">{client.name[0]}</span></div>
                  <h3 className="font-semibold text-slate-900 text-sm">{client.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{client.industry}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="py-16 lg:py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Want to Join Our Client List?</h2>
          <p className="text-blue-100 text-lg mb-8">Let&apos;s discuss how we can help your business grow.</p>
          <Link href="/get-quote" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors">Start Your Project <ArrowRight size={18} /></Link>
        </div>
      </section>
    </>
  );
}
