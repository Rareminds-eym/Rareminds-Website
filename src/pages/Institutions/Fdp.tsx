import HeroSection from '@/components/institutions/fdp/HeroSection';
import ProgramsSection from '@/components/institutions/fdp/ProgramsSection';
import FAQChatbot from '@/components/institutions/sdp/FAQChatbot';
import LogoCarousel from '@/components/institutions/fdp/LogoCarousel';
import BenefitsSection from '@/components/institutions/fdp/BenefitsSection';
import TestimonialsSection from '@/components/institutions/fdp/TestimonialsSection';
import TestimonialVideos from '@/components/institutions/fdp/TestimonialVideos';
import FDPSolutions from '@/components/institutions/fdp/FDPSolutions';
import ContactSection from '@/components/institutions/Contact/ContactSection';
import UpcomingEvents from '@/components/institutions/fdp/UpcomingEvents';
import FloatingActionButtonfdp from '@/components/institutions/fdp/FloatingActionfdp';


export default function FDP() {
  return (
    <div className="pt-20">
      <HeroSection />
      <FloatingActionButtonfdp />
      <ProgramsSection />
      <LogoCarousel />
      <BenefitsSection />
      <FDPSolutions />
      <TestimonialsSection />
      <UpcomingEvents />
      <TestimonialVideos />
      <ContactSection />
      
    </div>
  );
}