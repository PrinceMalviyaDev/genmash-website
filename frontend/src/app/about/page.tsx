import type { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about GenMash Software Solutions — our mission, vision, team, and journey since 2020. Based in Indore, India, serving clients globally.',
};

export default function AboutPage() {
  return <AboutContent />;
}
