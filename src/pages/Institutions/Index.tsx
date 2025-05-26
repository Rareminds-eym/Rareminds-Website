// src/pages/Institutions.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import React from 'react';
import Hero from "@/components/institutions/sdp/Hero";
import LogoCarousel from "@/components/institutions/sdp/LogoCarousel";
import Problem from "@/components/institutions/sdp/Problem";
import TestimonialQuotes from '@/components/institutions/sdp/TestimonialQuotes';
import Solution from "@/components/institutions/sdp/Solution";
import CaseStudies from "@/components/institutions/sdp/CaseStudies";
import Services from "@/components/institutions/sdp/Services";
import InstitutionDashboardSection from '@/components/institutions/sdp/InstitutionDashboardSection';
import TestimonialVideos from "@/components/institutions/sdp/TestimonialVideos";
//import FinalCTA from '@/components/institutions/FinalCTA';
import FDPButton from "@/components/institutions/sdp/FDPButton";
import FAQChatbot from '@/components/institutions/sdp/FAQChatbot';
import StickyButtons from '@/components/institutions/sdp/StickyButtons';
import ContactSection from '@/components/institutions/Contact/ContactSection';




const Institutions: React.FC = () => {
   const location = useLocation();

  useEffect(() => {
    if (location.hash === '#services') {
      const target = document.getElementById('services-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  return (
    
      <div className="pt-20">
      <FDPButton />
      <FAQChatbot />
      <Hero />
      <LogoCarousel />
      <section className="relative overflow-hidden rounded-t-[50px] md:rounded-t-[200px] shadow-[0_-20px_30px_-22px_rgba(0,0,0,0.25)] bg-white z-10">
      <Problem />
      <TestimonialQuotes />
      <Solution />
      <CaseStudies />
      <div id="services-section">
        <Services />
      </div>
      <InstitutionDashboardSection />
      <TestimonialVideos />
      <ContactSection />
      </section>
      <StickyButtons />
      
      
    </div>
  );
};

export default Institutions;
