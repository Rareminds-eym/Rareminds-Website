import { HeroSection } from "@/components/Govt/sections/HeroSection";
import { FeaturesSection } from "@/components/Govt/sections/FeaturesSection";
import { PartnershipsSection } from "@/components/Govt/sections/PartnershipsSection";
import { DeploymentSection } from "@/components/Govt/DeploymentSection";
import { GovernmentOutcomesSection } from "@/components/Govt/sections/GovernmentOutcomesSection";
import SectorExpertise from "@/components/Govt/sections/SectorExpertise";
import GovtServiceSection from "@/components/Govt/sections/GovtServiceSection";
import LogoMarquee from "@/components/Govt/sections/LogoMarquee";
import Video from "@/components/Govt/sections/Video";
import DashboardSection from "@/components/Govt/sections/DashboardSection";
import CaseStudies from "@/components/Govt/sections/CaseStudies";
import FAQChatbot from "@/components/ui/FAQChatbot";
import FDPButton from "@/components/Govt/sections/FDPButton";
import { Cta } from "@/components/Govt/sections/Cta";
import ContactSection from "@/components/Govt/Contact/ContactSection";
import { Sparkles } from "@/components/ui/sparkles";




const Govt = () => {
  return (
    <div className="relative w-full">
      <HeroSection />
      <div className="relative">
        {/* Scrollable content that appears on top of hero */}


        <div className="relative z-50 mt-[90vh] overflow-hidden">
         
          <div className="relative z-0">
            <div className="relative -mt-0 h-[5em] md:h-[22em] w-full overflow-hidden">
           
              <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,transparent_0%,transparent_100%)] before:opacity-60 z-50">
                <div className="hidden sm:block">{/* Spacer for mobile */}</div>
              </div>

              {/* Glowing arc with visible border glow */}
              <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-0 w-[200%] rounded-[45%]  md:rounded-[100%] border-t-4 border-[#96d3ff] dark:border-white/20 bg-white
        md:shadow-[inset_0_0_20px_#96d3ff,0_0_60px_#96d3ff,0_0_100px_rgba(13,80,232,0.8),0_0_160px_rgba(131,80,232,0.5)] shadow-[inset_0_0_20px_#96d3ff,0_0_60px_#96d3ff,0_0_50px_rgba(13,80,232,0.8),0_0_60px_rgba(131,80,232,0.5)]
        blur-sm backdrop-blur-xl" />
            </div>
          </div>
        </div>

        <div className="relative  bg-white p-0">
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
            <FAQChatbot />
            <Video />
            <ContactSection />
            <Cta />
          </div>
        </div>
      </div>
  
  );
};

export default Govt;
