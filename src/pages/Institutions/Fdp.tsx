import HeroSection from '@/components/institutions/fdp/HeroSection';
import ProgramsSection from '@/components/institutions/fdp/ProgramsSection';
import FAQChatbot from '@/components/institutions/sdp/FAQChatbot';
import LogoCarousel from '@/components/institutions/fdp/LogoCarousel';
import BenefitsSection from '@/components/institutions/fdp/BenefitsSection';
import TestimonialsSection from '@/components/institutions/fdp/TestimonialsSection';
import CalendarSection from '@/components/institutions/fdp/CalendarSection';
import FDPSolutions from '@/components/institutions/fdp/FDPSolutions';
import StickyButtons from '@/components/institutions/fdp/StickyButtons';
import ContactSection from '@/components/institutions/Contact/ContactSection';


export default function FDP() {
  return (
    <div className="pt-20">
      <HeroSection />
      <FAQChatbot />
      <ProgramsSection />
      <LogoCarousel />
      <BenefitsSection />
      <FDPSolutions />
      <TestimonialsSection />
      <CalendarSection />
      <ContactSection />
      <StickyButtons />
    </div>
  );
}