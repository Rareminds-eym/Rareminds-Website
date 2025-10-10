import { useState } from "react";
import HeroSection from "./components/HeroSection";
import { ProblemSection } from "./components/problemSection";
import SolutionSection from "./components/SolutionSection";
import WorkSection from "./components/WorkSection";
import ImpactSection from "./components/ImpactSection";
import { CTASection } from "./components/CTASection";
import TestimonialsSection from "./components/TestimonialsSection";
import { BookDemo } from "@/components/universities/BookDemo";
import { HelmetProvider } from "react-helmet-async";
import Seo from "@/components/Govt/Seo/Seo";

const Passport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const seoData = {
    title: "Skill Passport for Universities | Empower Students for Future Careers | Rareminds",
    description:
      "Skill Passport by Rareminds helps universities assess, benchmark, and upskill students. Prepare students for global-ready careers and track employability scores.",
    keywords:
      "Skill Passport, Universities, Rareminds, student employability, assessments, career readiness, skill mapping, higher education, student upskilling, university programs",
    canonicalUrl: "https://rareminds.in/skill-passport/universities"
  };

  return (
    
      
      <HelmetProvider>
      <Seo {...seoData} />
      <BookDemo isVisible={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="relative w-full mt-24">
        <HeroSection onDemoClick={() => setIsModalOpen(true)} />
        <ProblemSection onDemoClick={() => setIsModalOpen(true)} />
        <SolutionSection onDemoClick={() => setIsModalOpen(true)}/>
        <ImpactSection />
        <WorkSection />
        <TestimonialsSection />
        <section className="bg-[#F9FAFB] py-20 px-6 text-center">
          <CTASection onDemoClick={() => setIsModalOpen(true)}/>
        </section>
      </div>
     </HelmetProvider>
  );
};

export default Passport;
