import FAQChatbot from "@/components/Corporate/ChatBot/FAQChatbot";
import FullScreenCarousel from "@/components/Corporate/Recruitment/Home/Carousel/FullScreenCarousel";
import CaseStudies from "@/components/Corporate/Training/CaseStudies";
import ContactSection from "@/components/Corporate/Training/Contact/ContactSection";
import Problem from "@/components/Corporate/Training/Problem";
import Services from "@/components/Corporate/Training/Services";
import Solution from "@/components/Corporate/Training/Solution";
import TestimonialQuotes from "@/components/Corporate/Training/TestimonialQuotes";
import React from "react";

const CorporateTraining: React.FC = () => {
  const slides = [
    {
      heading:
        "<span class='corporate-heading-highlight'>Don’t Just Hire.</span> <br/>Build High-Performing Teams",
      subheading:
        "Smart, scalable recruitment solutions trusted by 250+ corporates",
      img: "/Corporate/Images/Home/Hero/BuildHigh.webp",
    },
    {
      heading:
        "From Bulk to Boardroom <br/><span class='corporate-heading-highlight'>One Partner.</span> Zero Compromise",
      subheading:
        "Technical hiring, leadership search, and everything in between — done right",
      img: "/Corporate/Images/Home/Hero/OnePartner.webp",
    },
    {
      heading:
        "When <span class='corporate-heading-highlight'>Time-to-Hire Matters,</span> <br/>So Does Who You Hire With",
      subheading:
        "Rareminds delivers role-fit talent with speed, accuracy, and accountability",
      img: "/Corporate/Images/Home/Hero/Time-to-Hire.webp",
    },
    {
      heading:
        "<span class='corporate-heading-highlight'>Your Toughest Role?</span> <br/>Filled Faster Than You’d Believe",
      subheading:
        "From CXOs to coders — precision hiring that drives business outcomes",
      img: "/Corporate/Images/Home/Hero/ToughestRole.webp",
    },
    {
      heading:
        "<span class='corporate-heading-highlight'>500+ Critical Roles</span> <br class='hidden sm:block'/>Closed This Quarter. <br/>Yours Could Be Next",
      subheading:
        "Partner with the recruitment team built for performance and outcomes",
      img: "/Corporate/Images/Home/Hero/CriticalRoles.webp",
    },
  ];
  return (
    <>
      <section className="bg-[url('/Corporate/Images/Home/Hero/header-bg.webp')] sticky top-[80px]">
        <FullScreenCarousel slides={slides} />
      </section>
      <div className="rounded-t-[50px] md:rounded-t-[200px] shadow-[0_-20px_30px_-22px_rgba(0,0,0,0.25)] overflow-hidden">
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
        <ContactSection />
      </div>
      <FAQChatbot />
    </>
  );
};

export default CorporateTraining;
