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
import FinalCTA from '@/components/institutions/FinalCTA';
import FDPButton from "@/components/institutions/FDPButton";
import FAQChatbot from '@/components/institutions/FAQChatbot';
import StickyButtons from '@/components/institutions/StickyButtons';
import '@/assets/institutions/index.css'
import '@/assets/institutions/PageStyles.css'


const Institutions: React.FC = () => {
  return (
    <>
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
      <FinalCTA />
      <StickyButtons />
    </>
  );
};

export default Institutions;
