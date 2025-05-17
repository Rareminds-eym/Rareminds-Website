
import React from "react";
import { HeroSection } from "@/components/Govt/sections/HeroSection";
import { FeaturesSection } from "@/components/Govt/sections/FeaturesSection";
import { PartnershipsSection } from "@/components/Govt/sections/PartnershipsSection";
import { DeploymentSection } from "@/components/Govt/DeploymentSection";
import { GovernmentOutcomesSection } from "@/components/Govt/sections/GovernmentOutcomesSection";
import SectorExpertise from "@/components/Govt/sections/SectorExpertise";
import { CTAButton } from "@/components/Govt/CTAButton";
import GovtServiceSection from "@/components/Govt/sections/GovtServiceSection";
import PartnershipHero from "@/components/Govt/sections/PartnershipHero";
import LogoMarquee from "@/components/Govt/sections/LogoMarquee";
import Video from "@/components/Govt/sections/Video";
import DashboardSection from "@/components/Govt/sections/DashboardSection";
import  CaseStudies from "@/components/Govt/sections/CaseStudies";
import FAQChatbot from "@/components/ui/FAQChatbot";
import FDPButton from "@/components/Govt/sections/FDPButton";
import { Cta } from "@/components/Govt/sections/Cta";
import ContactSection from "@/components/Govt/Contact/ContactSection";

const Govt = () => {
  return (
    <div className="min-h-screen w-full bg-white relative">

      <HeroSection />
      
      {/* <CTAButton /> */}
      <LogoMarquee/>
      <FeaturesSection />
      <DashboardSection />
      
      <PartnershipsSection />
      <Video/>
      <GovtServiceSection />
       <SectorExpertise />
       <CaseStudies />
       <Video/>
       {/* <DashboardSection /> */}
       
      <DeploymentSection/>
      <GovernmentOutcomesSection />

      {/* <PartnershipHero /> */}
      <FAQChatbot />
      <Video/>
      {/* <FDPButton /> */}
      <ContactSection />
      {/* <CTAButton /> */}
      <Cta />
    </div>
  );
};

export default Govt;
