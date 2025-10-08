import HeroSection from './components/HeroSection'
import phoneImage from "../../../../public/passport/banner-img.png"
import { ProblemSection } from './components/problemSection'
import SolutionSection from './components/SolutionSection'
import WorkSection from './components/WorkSection'
import ImpactSection from './components/ImpactSection'
import { CTASection } from './components/CTASection'
import TestimonialsSection from './components/TestimonialsSection';

const Passport = () => {
    return (
        <div className="relative w-full mt-24">
            <HeroSection
                phoneImage={phoneImage}
            />
            <ProblemSection />
            <SolutionSection />
            <ImpactSection />
            <WorkSection />
            <TestimonialsSection />
            <section className="bg-[#F9FAFB] py-20 px-6 text-center">
                <CTASection />
            </section>
        </div>
    )
}

export default Passport