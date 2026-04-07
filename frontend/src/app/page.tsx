import Hero from '@/components/sections/Hero';
import ServicesOverview from '@/components/sections/ServicesOverview';
import PortfolioPreview from '@/components/sections/PortfolioPreview';
import TechStack from '@/components/sections/TechStack';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import Stats from '@/components/sections/Stats';
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel';
import ClientLogos from '@/components/sections/ClientLogos';
import CTABanner from '@/components/sections/CTABanner';
import QuickContact from '@/components/sections/QuickContact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <PortfolioPreview />
      <Stats />
      <TechStack />
      <WhyChooseUs />
      <TestimonialsCarousel />
      <ClientLogos />
      <CTABanner />
      <QuickContact />
    </>
  );
}
