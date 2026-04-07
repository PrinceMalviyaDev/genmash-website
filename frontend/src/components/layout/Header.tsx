'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Technologies', href: '/technologies' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

// Pages with dark hero backgrounds where white text is needed initially
const DARK_HERO_PAGES = ['/', '/careers', '/get-quote'];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Check if current page has a dark hero section
  const hasDarkHero = DARK_HERO_PAGES.includes(pathname) ||
    pathname.startsWith('/services/') ||
    pathname.startsWith('/portfolio/');

  // Determine if we should use dark text (light bg) or light text (dark bg)
  const useDarkText = isScrolled || !hasDarkHero;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : hasDarkHero
          ? 'bg-transparent'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 relative z-50">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span
              className={`text-xl font-bold transition-colors duration-300 ${
                useDarkText || isMobileOpen ? 'text-slate-900' : 'text-white'
              }`}
            >
              Gen<span className="text-blue-600">Mash</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : useDarkText
                      ? 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/get-quote"
              className="hidden lg:inline-flex items-center px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/25"
            >
              Get a Quote
            </Link>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`lg:hidden relative z-50 p-2 rounded-lg transition-colors duration-300 ${
                isMobileOpen
                  ? 'text-slate-900'
                  : useDarkText
                  ? 'text-slate-700'
                  : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </header>

    {/* Mobile Menu — rendered outside <header> to escape its backdrop-filter containing block */}
    <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-white shadow-2xl"
            >
              <div className="pt-20 px-6 pb-6 h-full overflow-y-auto">
                <nav className="space-y-1">
                  {NAV_LINKS.map((link, i) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                            isActive
                              ? 'text-blue-600 bg-blue-50'
                              : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <Link
                    href="/get-quote"
                    className="block w-full text-center px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Get a Free Quote
                  </Link>
                </div>

                <div className="mt-8 space-y-3 text-sm text-slate-500">
                  <p>
                    <a
                      href="mailto:contact@genmash.com"
                      className="hover:text-blue-600 transition-colors"
                    >
                      contact@genmash.com
                    </a>
                  </p>
                  <p>Indore, Madhya Pradesh, India</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
