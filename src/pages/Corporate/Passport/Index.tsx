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

const Passport = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
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
                <TechDataAssuranceSection onDemoClick={() => setIsModalOpen(true)} onAnalyticsClick={() => setIsModalOpen(true)} />
                <CTASection onDemoClick={() => setIsModalOpen(true)} onWaitlistClick={() => setIsModalOpen(true)} />
            </div>
        </>
    );
};

export default Passport;
