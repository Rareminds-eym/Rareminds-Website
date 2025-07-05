// src/pages/Universities.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import React from 'react';
import Hero from "@/components/universities/sdp/Hero";
import LogoCarousel from "@/components/universities/sdp/LogoCarousel";
import Problem from "@/components/universities/sdp/Problem";
import TestimonialQuotes from '@/components/universities/sdp/TestimonialQuotes';
import Solution from "@/components/universities/sdp/Solution";
import CaseStudies from "@/components/universities/sdp/CaseStudies";
import Services from "@/components/universities/sdp/Services";
import InstitutionDashboardSection from '@/components/universities/sdp/InstitutionDashboardSection';
import TestimonialVideos from "@/components/universities/sdp/TestimonialVideos";
//import FinalCTA from '@/components/universities/FinalCTA';
import FDPButton from "@/components/universities/sdp/FDPButton";
import FloatingActionMenu from '@/components/universities/sdp/FloatingAction';
import ContactSection from '@/components/universities/Contact/ContactSection';



const Universities: React.FC = () => {
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
      <FloatingActionMenu />
      
      {/* Uncomment if you have a FinalCTA component */}
      {/* <FinalCTA /> */}
      
      
      
      
    </div>
  );
};

export default Universities;
