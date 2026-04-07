'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getClients } from '@/lib/api';

export default function ClientLogos() {
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    getClients().then(setClients).catch(() => {});
  }, []);

  if (clients.length === 0) return null;

  return (
    <section className="py-14 lg:py-20 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-slate-400 font-medium uppercase tracking-wider mb-10">Trusted by companies worldwide</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
          {clients.map((client: any, i: number) => (
            <motion.div key={client._id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="flex items-center justify-center h-16 px-4 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all cursor-default">
              <div className="w-full h-full bg-white rounded-xl border border-slate-100 flex items-center justify-center">
                <span className="text-xs font-bold text-slate-400 tracking-wider">{client.name.toUpperCase()}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
