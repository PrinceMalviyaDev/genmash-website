import type { Metadata } from 'next';
import { getServices } from '@/lib/api';
import ServicesContent from './ServicesContent';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Explore our full range of software development services — web, mobile, AI, automation, game development, and more.',
};

export default async function ServicesPage() {
  let services = [];
  try {
    services = await getServices();
  } catch {
    // fallback to empty — ServicesContent has static fallback
  }
  return <ServicesContent services={services} />;
}
