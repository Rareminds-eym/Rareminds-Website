// src/pages/Institutions.tsx

import React from 'react';
import Hero from "@/components/institutions/Hero";
import LogoCarousel from "@/components/institutions/LogoCarousel";
import Problem from "@/components/institutions/Problem";
import TestimonialQuotes from '@/components/institutions/TestimonialQuotes';
import Solution from "@/components/institutions/Solution";
import CaseStudies from "@/components/institutions/CaseStudies";
import Services from "@/components/institutions/Services";
import InstitutionDashboardSection from '@/components/institutions/InstitutionDashboardSection';
import TestimonialVideos from "@/components/institutions/TestimonialVideos";
//import FinalCTA from '@/components/institutions/FinalCTA';
import FDPButton from "@/components/institutions/FDPButton";
import FAQChatbot from '@/components/institutions/FAQChatbot';
import StickyButtons from '@/components/institutions/StickyButtons';
import '@/assets/institutions/index.css'
import ContactSection from '@/components/institutions/Contact/ContactSection';
import '@/assets/institutions/pageStyles.css'


const Institutions: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-white relative">
      
      <FDPButton />
      <FAQChatbot />
      <Hero />
      <LogoCarousel />
      <Problem />
      <TestimonialQuotes />
      <Solution />
      <CaseStudies />
      <Services />
      <InstitutionDashboardSection />
      <TestimonialVideos />
      <ContactSection />
      <StickyButtons />
    </div>
  );
};

export default Institutions;
