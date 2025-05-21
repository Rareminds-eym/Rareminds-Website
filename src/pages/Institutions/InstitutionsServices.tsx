// src/pages/InstitutionsServices.tsx

import React from 'react';
import Hero from "@/components/institutions/sdp/Hero";

//import FinalCTA from '@/components/institutions/FinalCTA';
import FDPButton from "@/components/institutions/sdp/FDPButton";
import FAQChatbot from '@/components/institutions/sdp/FAQChatbot';
import StickyButtons from '@/components/institutions/sdp/StickyButtons';
import CourseCards from '@/components/institutions/sdp/CourseCards';

//import '@/assets/institutions/pageStyles.css'


const InstitutionsServices: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-white relative">
      
      <FDPButton />
      <FAQChatbot />
      <Hero />
      <CourseCards />
      <StickyButtons />
    </div>
  );
};

export default InstitutionsServices;
