import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms of Service' };

export default function TermsPage() {
  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-slate-400 mb-10">Last updated: January 1, 2025</p>
        <div className="prose prose-slate max-w-none space-y-8">
          <div><h2 className="text-xl font-semibold text-slate-900 mb-3">1. Service Terms</h2><p className="text-slate-600 leading-relaxed">GenMash Software Solutions provides custom software development services. All projects are governed by individual contracts that outline scope, timeline, deliverables, and payment terms agreed upon by both parties.</p></div>
          <div><h2 className="text-xl font-semibold text-slate-900 mb-3">2. Intellectual Property</h2><p className="text-slate-600 leading-relaxed">Upon full payment, all custom code and deliverables developed for your project are transferred to you. GenMash retains the right to use general methodologies, tools, and non-proprietary techniques in future projects.</p></div>
          <div><h2 className="text-xl font-semibold text-slate-900 mb-3">3. Payment Terms</h2><p className="text-slate-600 leading-relaxed">Payment schedules are defined in project contracts. Typically, projects require an upfront deposit followed by milestone-based payments. Late payments may result in work suspension until outstanding balances are settled.</p></div>
          <div><h2 className="text-xl font-semibold text-slate-900 mb-3">4. Confidentiality</h2><p className="text-slate-600 leading-relaxed">We treat all client information as confidential. We are happy to sign NDAs before discussing project details. Our team members are bound by confidentiality agreements.</p></div>
          <div><h2 className="text-xl font-semibold text-slate-900 mb-3">5. Limitation of Liability</h2><p className="text-slate-600 leading-relaxed">GenMash&apos;s liability is limited to the total amount paid for the specific project. We are not liable for indirect, incidental, or consequential damages arising from the use of our services or deliverables.</p></div>
          <div><h2 className="text-xl font-semibold text-slate-900 mb-3">6. Termination</h2><p className="text-slate-600 leading-relaxed">Either party may terminate a project with written notice. Upon termination, client pays for all work completed. Any code and assets produced up to that point will be delivered to the client.</p></div>
          <div><h2 className="text-xl font-semibold text-slate-900 mb-3">7. Governing Law</h2><p className="text-slate-600 leading-relaxed">These terms are governed by the laws of India. Any disputes will be resolved through arbitration in Indore, Madhya Pradesh.</p></div>
        </div>
      </div>
    </section>
  );
}
