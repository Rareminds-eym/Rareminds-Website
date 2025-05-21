import HeroSection from '@/components/institutions/fdp/HeroSection';
import ProgramsSection from '@/components/institutions/fdp/ProgramsSection';
import BenefitsSection from '@/components/institutions/fdp/BenefitsSection';
import TestimonialsSection from '@/components/institutions/fdp/TestimonialsSection';
import ContactSection from '@/components/institutions/fdp/ContactSection';
import CalendarSection from '@/components/institutions/fdp/CalendarSection';
import FDPSolutions from '@/components/institutions/fdp/FDPSolutions';

export default function FDP() {
  return (
    <div className="pt-20">
      <HeroSection />
      <ProgramsSection />
      <BenefitsSection />
      <FDPSolutions />
      <TestimonialsSection />
      <CalendarSection />
      <ContactSection />
    </div>
  );
}