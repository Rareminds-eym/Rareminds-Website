import React from "react";
import FullScreenCarousel from "../../../components/Corporate/Recruitment/Home/Carousel/FullScreenCarousel";
import WhyRareminds from "@/components/Corporate/Recruitment/Home/whyRM/WhyRareminds";
import ServicesSection from "@/components/Corporate/Recruitment/Home/services/ServicesSection";
import IndustriesSection from "@/components/Corporate/Recruitment/Home/Industries/IndustriesSection";
import TestimonialsSection from "@/components/Corporate/Recruitment/Home/Testimonials/TestimonialsSection";
import CaseStudiesSection from "@/components/Corporate/Recruitment/Home/CaseStudies/CaseStudiesSection";
import ProcessSection from "@/components/Corporate/Recruitment/Home/Process/ProcessSection";
import TeamSection from "@/components/Corporate/Recruitment/Home/Team/TeamSection";
import ContactSection from "@/components/Corporate/Recruitment/Home/Contact/ContactSection";
import FAQChatbot from "@/components/Corporate/ChatBot/FAQChatbot";

const Corporate: React.FC = () => {
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

      <div id="why-rareminds">
        <WhyRareminds />
      </div>
      <div id="services">
        <ServicesSection />
      </div>
      <div id="industries">
        <IndustriesSection />
      </div>
      <div id="testimonials">
        <TestimonialsSection />
      </div>
      <div id="case-studies">
        <CaseStudiesSection />
      </div>
      <div id="process">
        <ProcessSection />
      </div>
      <div id="team">
        <TeamSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
      <FAQChatbot />
    </>
  );
};

export default Corporate;
