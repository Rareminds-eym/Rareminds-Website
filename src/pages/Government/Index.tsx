import { HeroSection } from "../../components/Govt/sections/HeroSection";
import { FeaturesSection } from "../../components/Govt/sections/FeaturesSection";
import { PartnershipsSection } from "../../components/Govt/sections/PartnershipsSection";
import { DeploymentSection } from "../../components/Govt/DeploymentSection";
import { GovernmentOutcomesSection } from "../../components/Govt/sections/GovernmentOutcomesSection";
import SectorExpertise from "../../components/Govt/sections/SectorExpertise";
import GovtServiceSection from "../../components/Govt/sections/GovtServiceSection";
import LogoMarquee from "../../components/Govt/sections/LogoMarquee";
import Video from "../../components/Govt/sections/Video";
import DashboardSection from "../../components/Govt/sections/DashboardSection";
// import CaseStudies from "@/components/Govt/sections/CaseStudies";
import FloatingActionMenu from "../../components/Govt/StickyButton/FloatingAction";
import ContactSection from "../../components/Govt/Contact/ContactSection";

import CaseStudies from "../../components/Govt/CaseStudies/CaseStudies";
import Seo from "@/components/Govt/Seo/Seo";
import { HelmetProvider } from 'react-helmet-async';

const Govt = () => {
  const seoData = {
    title: "Government",
    description: "Innovative digital solutions for government agencies to improve public services and operational efficiency. Explore our case studies and partnerships.",
    keywords: "government technology, public sector solutions, digital government, e-governance",
    canonicalUrl: "https://rareminds.in/government"
  };
  return (
    <HelmetProvider>
    <div className="relative w-full">
      <Seo {...seoData} />
      <HeroSection />
      {/* <div className="relative"> */}
        {/* Scrollable content that appears on top of hero */}
        <div className="relative z-50 mt-[90vh] overflow-hidden">
          <div className="relative z-0">
            <div className="relative -mt-0 h-[5em] md:h-[22em] w-full overflow-hidden">
              <img
                src="/Govt-Images/wave.svg"
                alt="Wave separator"
                className="absolute bottom-0 w-full h-auto "
              />
            </div>
          </div>
        </div>

        <div className="relative bg-white p-0  overflow-hidden">
          <LogoMarquee />
            <FeaturesSection />
            <DashboardSection />
            <PartnershipsSection />
            <Video />
            <GovtServiceSection />
            <SectorExpertise />
            <CaseStudies />
            <Video />
            <DeploymentSection />
            <GovernmentOutcomesSection />
            
            <Video />
            <ContactSection />
            <FloatingActionMenu/>
          </div>
        </div>
     </HelmetProvider>
  
  );
};

export default Govt;
