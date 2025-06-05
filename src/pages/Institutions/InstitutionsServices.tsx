// src/pages/InstitutionsServices.tsx

import React from 'react';
import Hero from "@/components/institutions/inst/Hero";

//import FinalCTA from '@/components/institutions/FinalCTA';
import FDPButton from "@/components/institutions/sdp/FDPButton";
import CourseCards from '@/components/institutions/inst/CourseCards';
import LogoCarousel from '@/components/institutions/sdp/LogoCarousel';
import FloatingAction from '@/components/institutions/sdp/FloatingAction';


const InstitutionsServices: React.FC = () => {
  return (
    <div className="pt-20">
      <Hero />
      <FDPButton />
      <LogoCarousel />
      <CourseCards />
      <FloatingAction/>
    </div>
  );
};

export default InstitutionsServices;
