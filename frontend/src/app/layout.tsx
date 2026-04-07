import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'GenMash Software Solutions | Custom Software Development',
    template: '%s | GenMash Software Solutions',
  },
  description:
    'GenMash Software Solutions builds custom websites, mobile apps, AI solutions, and enterprise software. Based in Indore, India — serving clients worldwide.',
  keywords: [
    'software development',
    'web development',
    'mobile app development',
    'AI development',
    'GenMash',
    'Indore',
  ],
  authors: [{ name: 'GenMash Software Solutions' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'GenMash Software Solutions',
    title: 'GenMash Software Solutions | Custom Software Development',
    description:
      'Transforming ideas into powerful digital solutions. Websites, mobile apps, AI systems, and more.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GenMash Software Solutions',
    description:
      'Custom software development company specializing in web, mobile, AI, and enterprise solutions.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-slate-900 bg-white">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
