// src/pages/UniversitiesServices.tsx

import React from 'react';
import Hero from "@/components/universities/inst/Hero";

//import FinalCTA from '@/components/universities/FinalCTA';
import FDPButton from "@/components/universities/sdp/FDPButton";
import CourseCards from '@/components/universities/inst/CourseCards';
import LogoCarousel from '@/components/universities/sdp/LogoCarousel';
import FloatingAction from '@/components/universities/sdp/FloatingAction';


const UniversitiesServices: React.FC = () => {
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

export default UniversitiesServices;
