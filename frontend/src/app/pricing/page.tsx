'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, X, ArrowRight, Sparkles } from 'lucide-react';
import { getPricingPlans } from '@/lib/api';

export default function PricingPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPricingPlans().then(setPlans).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-600 font-semibold text-sm tracking-wide uppercase mb-3">Pricing</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">Transparent Pricing</h1>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">Flexible plans for every business size. All prices are starting estimates.</p>
        </div>
      </section>
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? <div className="text-center py-20 text-slate-400">Loading plans...</div> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {plans.map((plan: any, i: number) => (
                <motion.div key={plan._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className={`relative p-6 rounded-2xl border ${plan.isPopular ? 'border-blue-600 shadow-lg shadow-blue-600/10' : 'border-slate-100'} bg-white`}>
                  {plan.isPopular && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full"><Sparkles size={12} /> Most Popular</span></div>}
                  <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
                  <div className="mt-3"><span className="text-3xl font-bold text-slate-900">{plan.startingPrice}</span><span className="text-slate-400 text-sm ml-1">starting</span></div>
                  <p className="text-sm text-slate-400 mt-1">{plan.timeline}</p>
                  <ul className="mt-5 space-y-2.5">
                    {plan.features?.map((f: any) => (
                      <li key={f.text} className="flex items-center gap-2 text-sm">
                        {f.included ? <Check size={16} className="text-emerald-500 shrink-0" /> : <X size={16} className="text-slate-300 shrink-0" />}
                        <span className={f.included ? 'text-slate-600' : 'text-slate-400'}>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/get-quote" className={`mt-6 block text-center px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors ${plan.isPopular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600'}`}>Get Started</Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Need a Custom Quote?</h2>
          <p className="text-slate-500 text-lg mb-8">Every project is unique. Tell us your requirements for a detailed, no-obligation quote.</p>
          <Link href="/get-quote" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25">Request Custom Quote <ArrowRight size={18} /></Link>
        </div>
      </section>
    </>
  );
}
