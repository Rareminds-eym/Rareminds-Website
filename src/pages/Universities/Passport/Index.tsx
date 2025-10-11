import { useState } from "react";
import HeroSection from "./components/HeroSection";
// import { ProblemSection } from "./components/problemSection";
import SolutionSection from "./components/SolutionSection";
import WorkSection from "./components/WorkSection";
import ImpactSection from "./components/ImpactSection";
import { CTASection } from "./components/CTASection";
import TestimonialsSection from "./components/TestimonialsSection";
import { BookDemo } from "@/components/universities/BookDemo";
import { HelmetProvider } from "react-helmet-async";
import Seo from "@/components/Govt/Seo/Seo";
import OverviewSection from "./components/OverviewSection";
import InstitutionsNeededSection from "./components/InstitutionsNeededSection";
import KeyFeaturesSection from "./components/KeyFeaturesSection";
import BenefitsSection from "./components/BenefitsSections";
import BuiltSection from "./components/BuiltSection";
import OutcomeSection from "./components/OutcomeSection";
const Passport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const seoData = {
    title: "Skill Passport for Institutions | Empower Student Employability | Rareminds",
    description:
      "Partner with Rareminds to bring the Skill Passport to your campus. Assess and enhance students’ employability through real-world skill benchmarks and career mapping.",
    keywords:
      "Skill Passport, Universities, Rareminds, student employability, assessments, career readiness, skill mapping, higher education, student upskilling, university programs,Skill Passport | Student Employability | Learning Outcomes | Academic Analytics | Institutional Dashboard | Naan Mudhalvan | TNSDC | Skill Tracking | University Skill Passport",

    canonicalUrl: "https://rareminds.in/skill-passport/universities"
  };
  return (
    
      
      <HelmetProvider>
      <Seo {...seoData} />
      <BookDemo isVisible={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="relative w-full mt-24">
        <HeroSection onDemoClick={() => setIsModalOpen(true)} />
        <OverviewSection />
        <InstitutionsNeededSection
          onDemoClick={() => setIsModalOpen(true)}
          onAnalyticsClick={() => setIsModalOpen(true)}
        />
        
        {/* <ProblemSection onDemoClick={() => setIsModalOpen(true)} /> */}
        {/* <SolutionSection onDemoClick={() => setIsModalOpen(true)}/>
        <ImpactSection /> */}
        <WorkSection />
        <KeyFeaturesSection />
        <BenefitsSection />
        <BuiltSection />
        <OutcomeSection />
        {/* <TestimonialsSection /> */}
        <section className="bg-[#F9FAFB] py-20 px-6 text-center">
          <CTASection onDemoClick={() => setIsModalOpen(true)}/>
        </section>
      </div>
     </HelmetProvider>
  );
};

export default Passport;
