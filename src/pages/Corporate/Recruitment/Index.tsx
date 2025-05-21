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
import Dashboard from "@/components/Corporate/Recruitment/Home/Dashboard";

const Corporate: React.FC = () => {
  const slides = [
    {
      heading:
        "<span class='corporate-heading-highlight'>Don’t Just Hire.</span> <br/>Build High-Performing Teams",
      subheading:
        "Smart, scalable recruitment solutions trusted by 250+ corporates",
      img: "https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/Index/Hero/BuildHigh.webp",
    },
    {
      heading:
        "From Bulk to Boardroom <br/><span class='corporate-heading-highlight'>One Partner.</span> Zero Compromise",
      subheading:
        "Technical hiring, leadership search, and everything in between — done right",
      img: "https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/Index/Hero/OnePartner.webp",
    },
    {
      heading:
        "If <span class='corporate-heading-highlight'>Time-to-Hire Matters,</span> <br/>Who Hires Makes the Difference",
      subheading:
        "Rareminds delivers role-fit talent with speed, accuracy, and accountability",
      img: "https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/Index/Hero/Time-to-Hire.webp",
    },
    {
      heading:
        "<span class='corporate-heading-highlight'>Your Toughest Role?</span> <br/>Filled Faster Than You’d Believe",
      subheading:
        "From CXOs to coders — precision hiring that drives business outcomes",
      img: "https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/Index/Hero/ToughestRole.webp",
    },
    {
      heading:
        "<span class='corporate-heading-highlight'>500+ Roles</span> Closed This Quarter. <br/>Yours Could Be Next",
      subheading:
        "Partner with the recruitment team built for performance and outcomes",
      img: "https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/Index/Hero/CriticalRoles.webp",
    },
  ];

  return (
    <>
      <section className="bg-[url('https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/Index/Hero/header-bg.webp')] sticky top-[80px] w-full overflow-hidden">
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
      <div id="dashboard" className="bg-white relative">
        <Dashboard/>
      </div>
      <div id="contact">
        <ContactSection />
      </div>
      <FAQChatbot />
    </>
  );
};

export default Corporate;
