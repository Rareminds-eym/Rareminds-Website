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
import { Helmet } from "react-helmet-async";

const CorporateTraining: React.FC = () => {
  const location = useLocation();
  const slides = [
    {
      heading: "Your Training ROI Partner",
      subheading: "We're not just trainers. We're business enablers.",
      img: "https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Training/Index/hero/roi.webp",
      alt: "Multitasking business professional balancing on a ball while managing data analysis, target goals, translation, and digital marketing tools",
    },
    {
      heading: "Across 25 Sectors. 30 Countries. In 13 Languages.",
      subheading: "We are driving impact at every scale and every corner of the world.",
      img: "https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Training/Index/hero/across.webp",
      alt: "Modern transportation hub with airplane, metro train, control tower, and colorful urban buildings representing smart city infrastructure",
    },
    {
      heading: "Seeking measurable results?",
      subheading: "We reduced post-training dropouts by 74% because results matter.",
      img: "https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Training/Index/hero/seeking-measurable.webp",
      alt: "A man pointing one finger towards a graph showcasing a downward arrow.",
    },
    {
      heading: "Train. Transform. Elevate. Dominate.",
      subheading: "Rareminds builds bold leaders and unstoppable teams. Ready to own tomorrow?",
      img: "https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Training/Index/hero/Train-Transform.webp",
      alt: "Vibrant image of men and women in different positions on a staircase with icons of growth and modern tools, holding a laptop and a man holding a file in his hands, and a woman running.",
    },
    {
      heading: "Your Team’s Potential Is Waiting. Are You?",
      subheading: "Rareminds sharpens your team’s skills to fuel growth and help your business outpace the competition.",
      img: "https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Training/Index/hero/your-team.webp",
      alt: "Vibrant image of urban buildings, women and men smiling and climbing the stairs of success with an upward arrow, holding laptops in their hands and a brain at the end.",
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
      <Helmet>
        <title>Experience-Driven Corporate Training | Rareminds Learning Solutions</title>
        <meta name="description" content="Boost employee engagement with Rareminds' immersive, gamified, and role-based corporate training solutions that drive performance, retention, and growth." />
      </Helmet>
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
