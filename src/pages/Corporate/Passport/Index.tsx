import { useState } from "react";
import HeroSection from "./components/HeroSection";
import { ProblemSection } from "./components/problemSection";
import SolutionSection from "./components/SolutionSection";
import WorkSection from "./components/WorkSection";
import ImpactSection from "./components/ImpactSection";
import { CTASection } from "./components/CTASection";
import TestimonialsSection from "./components/TestimonialsSection";
import OverviewSection from "./components/OverviewSection";
import CorporatesNeededSection from "./components/CorporatesNeededSection";
import TechDataAssuranceSection from "./components/TechDataAssuranceSection";
import { BookDemo } from "@/components/Corporate/BookDemo";
// import { CookieConsent } from "@/components/Corporate/CookieConsent";
import { Helmet } from "react-helmet-async";
import Seo from "@/components/Govt/Seo/Seo";


const Passport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const seoData = {
    title: "Skill Passport for Corporates | Build Agile, Global-Ready Teams | Rareminds Pvt. Ltd.",
    description:
      "Use Skill Passport by Rareminds Pvt. Ltd. to assess, benchmark, and upskill your workforce. Build leadership and compliance-ready teams for global expansion.",
    keywords:
      "Skill Passport, Rareminds Pvt. Ltd., corporate training, leadership development, workforce readiness, HR analytics, employee upskilling, talent mapping, global teams, talent development",
    canonicalUrl: "https://rareminds.in/corporate/skill-passport"
  };

  return (
    <>
      <Seo {...seoData} />
      <Helmet>
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href="/passport/Home-page-banner_mobile_1.webp"
          media="(max-width: 767px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href="/passport/Home-page-banner_1.webp"
          media="(min-width: 768px)"
          fetchPriority="high"
        />
      </Helmet>
      {/* <CookieConsent pageName="Skill Passport" /> */}
      <BookDemo isVisible={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="relative w-full">
        <HeroSection onDemoClick={() => setIsModalOpen(true)} />
        <OverviewSection />
        <ProblemSection onDemoClick={() => setIsModalOpen(true)} />
        <CorporatesNeededSection
          onDemoClick={() => setIsModalOpen(true)}
          onAnalyticsClick={() => setIsModalOpen(true)}
        />
        <SolutionSection />
        <WorkSection />
        <TestimonialsSection />
        <ImpactSection />
        <TechDataAssuranceSection
          onDemoClick={() => setIsModalOpen(true)}
          onAnalyticsClick={() => setIsModalOpen(true)}
        />
        <CTASection
          onDemoClick={() => setIsModalOpen(true)}
        />
      </div>
    </>
  );
};

export default Passport;
