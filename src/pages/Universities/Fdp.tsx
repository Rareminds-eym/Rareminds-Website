import HeroSection from '@/components/universities/fdp/HeroSection';
import ProgramsSection from '@/components/universities/fdp/ProgramsSection';
import FAQChatbot from '@/components/universities/sdp/FAQChatbot';
import LogoCarousel from '@/components/universities/fdp/LogoCarousel';
import BenefitsSection from '@/components/universities/fdp/BenefitsSection';
import TestimonialsSection from '@/components/universities/fdp/TestimonialsSection';
import TestimonialVideos from '@/components/universities/fdp/TestimonialVideos';
import FDPSolutions from '@/components/universities/fdp/FDPSolutions';
import ContactSection from '@/components/universities/Contact/ContactSection';
import UpcomingEvents from '@/components/universities/fdp/UpcomingEvents';
import FloatingActionButtonfdp from '@/components/universities/fdp/FloatingActionfdp';


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