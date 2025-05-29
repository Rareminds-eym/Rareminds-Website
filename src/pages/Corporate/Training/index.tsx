import FAQChatbot from "@/components/Corporate/ChatBot/FAQChatbot";
import FullScreenCarousel from "@/components/Corporate/Recruitment/Home/Carousel/FullScreenCarousel";
import BookCall from "@/components/Corporate/Training/BookCall";
import CaseStudies from "@/components/Corporate/Training/CaseStudies";
import ContactSection from "@/components/Corporate/Training/Contact/ContactSection";
import InstitutionDashboardSection from "@/components/Corporate/Training/InstitutionDashboardSection";
import Numbers from "@/components/Corporate/Training/Numbers";
import Problem from "@/components/Corporate/Training/Problem";
import Services from "@/components/Corporate/Training/Services";
import Solution from "@/components/Corporate/Training/Solution";
import TestimonialQuotes from "@/components/Corporate/Training/TestimonialQuotes";
import TestimonialVideos from "@/components/Corporate/Training/TestimonialVideos";
import WorkWith from "@/components/Corporate/Training/WorkWith";
import React from "react";

const CorporateTraining: React.FC = () => {
  const slides = [
    {
      heading: "Your Training ROI Partner",
      subheading: "We're not just trainers. We're business enablers.",
      img: "/Corporate/Images/Training/hero/training-partner.webp",
    },
    {
      heading: "Across 25 Sectors. In 13 Languages. With Zero Excuses.",
      subheading: "",
      img: "/Corporate/Images/Home/Hero/OnePartner.webp",
    },
    {
      heading: "Want Results?",
      subheading: "We brought down post-training dropouts by 74%. Ask Toyota.",
      img: "/Corporate/Images/Home/Hero/Time-to-Hire.webp",
    },
  ];
  return (
    <>
      <section className="bg-[url('/Corporate/Images/Training/hero/header-bg.webp')] bg-cover sticky top-[80px]">
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
      <div className="relative bg-white">
        <CaseStudies />
      </div>
      <div className="relative bg-white">
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
