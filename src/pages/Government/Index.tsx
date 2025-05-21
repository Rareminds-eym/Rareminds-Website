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
        <div className="relative z-10 mt-[90vh] overflow-hidden">
          {/* Top circular decoration with sparkles */}
          <div className="relative z-10">
            <div className="relative -mt-32 h-96 w-full overflow-hidden">
              <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#8350e8,transparent_70%)] before:opacity-40 z-20" />
              <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-20 w-[200%] rounded-[100%] border-t-2 border-zinc-900/20 dark:border-white/20 bg-white
                shadow-[0_0_40px_#c7ddff,0_0_80px_rgba(13,80,232,0.6),0_0_120px_rgba(131,80,232,0.3)]" />
              {/* <div className="absolute inset-0 z-30">
                <Sparkles
                  density={400}
                  color={"#8350e8"}
                  speed={0.3}
                  opacity={1}
                  size={2}
                />
              </div> */}
            </div>
          </div>
        </div>

        <div className="relative  bg-white pt-8">
          <LogoMarquee />
          <div className="bg-white">
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
    </div>
  );
};

export default Govt;
