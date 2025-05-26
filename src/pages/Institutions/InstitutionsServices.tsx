// src/pages/InstitutionsServices.tsx

import React from 'react';
import Hero from "@/components/institutions/inst/Hero";

//import FinalCTA from '@/components/institutions/FinalCTA';
import FDPButton from "@/components/institutions/sdp/FDPButton";
import FAQChatbot from '@/components/institutions/sdp/FAQChatbot';
import StickyButtons from '@/components/institutions/sdp/StickyButtons';
import CourseCards from '@/components/institutions/sdp/CourseCards';
import LogoCarousel from '@/components/institutions/sdp/LogoCarousel';


const InstitutionsServices: React.FC = () => {
  return (
    <div className="pt-20">
      <Hero />
      <FDPButton />
      <FAQChatbot />
      <LogoCarousel />
      <CourseCards />
      <StickyButtons />
    </div>
  );
};

export default InstitutionsServices;
