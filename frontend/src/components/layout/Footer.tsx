'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Mail,
  Phone,
  MapPin,
  Link2,
  GitBranch,
  MessageCircle,
  Camera,
  ArrowRight,
} from 'lucide-react';

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Technologies', href: '/technologies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
];

const services = [
  { label: 'Website Development', href: '/services/website-development' },
  { label: 'Mobile App Development', href: '/services/mobile-app-development' },
  { label: 'AI/ML Development', href: '/services/ai-ml-development' },
  { label: 'AI Agents & Automation', href: '/services/ai-agents-automation' },
  { label: 'Cloud & DevOps', href: '/services/cloud-devops' },
  { label: 'Enterprise Software', href: '/services/enterprise-software' },
];

const socialLinks = [
  { icon: Link2, href: 'https://linkedin.com/company/genmash', label: 'LinkedIn' },
  { icon: GitBranch, href: 'https://github.com/genmash', label: 'GitHub' },
  { icon: MessageCircle, href: 'https://twitter.com/genmash', label: 'Twitter' },
  { icon: Camera, href: 'https://instagram.com/genmash', label: 'Instagram' },
];

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on admin pages
  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <span className="text-xl font-bold text-white">
                Gen<span className="text-blue-400">Mash</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Transforming ideas into powerful digital solutions. We build websites, apps,
              and AI-powered systems that drive business growth.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    <ArrowRight
                      size={12}
                      className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-2.5">
              {services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    <ArrowRight
                      size={12}
                      className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3.5">
              <li>
                <a
                  href="mailto:contact@genmash.com"
                  className="flex items-start gap-3 text-sm text-slate-400 hover:text-blue-400 transition-colors"
                >
                  <Mail size={16} className="mt-0.5 shrink-0" />
                  contact@genmash.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919876543210"
                  className="flex items-start gap-3 text-sm text-slate-400 hover:text-blue-400 transition-colors"
                >
                  <Phone size={16} className="mt-0.5 shrink-0" />
                  +91 98765 43210
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-slate-400">
                  <MapPin size={16} className="mt-0.5 shrink-0" />
                  <span>Indore, Madhya Pradesh, India</span>
                </div>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-white text-sm font-medium mb-3">Newsletter</h4>
              <form className="flex gap-2" action="#">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} GenMash Software Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
