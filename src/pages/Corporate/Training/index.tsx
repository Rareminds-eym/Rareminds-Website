import BookCall from "@/components/Corporate/Training/BookCall";
import ContactSection from "@/components/Corporate/Training/Contact/ContactSection";
import FullScreenCarousel from "@/components/Corporate/Training/hero/FullScreenCarousel";
import InstitutionDashboardSection from "@/components/Corporate/Training/InstitutionDashboardSection";
import Numbers from "@/components/Corporate/Training/Numbers";
import Problem from "@/components/Corporate/Training/Problem";
import Services from "@/components/Corporate/Training/Services";
import Solution from "@/components/Corporate/Training/Solution";
import TestimonialQuotes from "@/components/Corporate/Training/TestimonialQuotes";
import TestimonialVideos from "@/components/Corporate/Training/TestimonialVideos";
import WorkWith from "@/components/Corporate/Training/WorkWith";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const CorporateTraining: React.FC = () => {
  const location = useLocation();
  const slides = [
    {
      heading: "Your Training ROI Partner",
      subheading: "We're not just trainers. We're business enablers.",
      img: "/Corporate/Images/Training/hero/roi.webp",
    },
    {
      heading: "Across 25 Sectors. 30 Countries. In 13 Languages.",
      subheading: "We are driving impact at every scale and every corner of the world.",
      img: "/Corporate/Images/Training/hero/across.webp",
    },
    {
      heading: "Seeking measurable results?",
      subheading: "We reduced post-training dropouts by 74% because results matter.",
      img: "/Corporate/Images/Training/hero/seeking-measurable.webp",
    },
    {
      heading: "Train. Transform. Elevate. Dominate.",
      subheading: "Rareminds builds bold leaders and unstoppable teams. Ready to own tomorrow?",
      img: "/Corporate/Images/Training/hero/Train-Transform.webp",
    },
    {
      heading: "Your Team’s Potential Is Waiting. Are You?",
      subheading: "Rareminds sharpens your team’s skills to fuel growth and help your business outpace the competition.",
      img: "/Corporate/Images/Training/hero/your-team.webp",
    },
  ];

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.state]);

  return (
    <>
      <section className="bg-[url('/Corporate/Images/Training/hero/header-bg.png')] bg-cover sticky top-[80px]">
        <FullScreenCarousel slides={slides} />
      </section>
      <div className="">
        <Problem />
      </div>
      <div className="relative bg-white">
        <TestimonialQuotes />
      </div>
      <div className="relative bg-white">
        <Solution />
      </div>
      {/* <div className="relative bg-white">
        <CaseStudies />
      </div> */}
      <div className="relative bg-white" id="services">
        <Services />
      </div>
      <div className="relative bg-white">
        <Numbers />
      </div>
      <div className="relative bg-white">
        <InstitutionDashboardSection />
      </div>
      <div className="relative bg-white">
        <WorkWith />
      </div>
      <div className="relative bg-white">
        <TestimonialVideos />
      </div>
      <div className="relative bg-white">
        <BookCall />
      </div>
      <div className="relative bg-white">
        <ContactSection />
      </div>
    </>
  );
};

export default CorporateTraining;
