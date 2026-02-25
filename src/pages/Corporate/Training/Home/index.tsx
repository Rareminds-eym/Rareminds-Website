import BookCall from "@/components/Corporate/Training/BookCall";
import ContactSection from "@/components/Corporate/Training/Contact/ContactSection";
import FullScreenCarousel from "@/components/Corporate/Training/hero/FullScreenCarousel";
import InstitutionDashboardSection from "@/components/Corporate/Training/InstitutionDashboardSection";
import Numbers from "@/components/Corporate/Training/Numbers";
import Problem from "@/components/Corporate/Training/Problem";
import Solution from "@/components/Corporate/Training/Solution";
import TestimonialQuotes from "@/components/Corporate/Training/TestimonialQuotes";
import TestimonialVideos from "@/components/Corporate/Training/TestimonialVideos";
import WorkWith from "@/components/Corporate/Training/WorkWith";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

const CorporateTraining: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleCorporateClick = () => {
    navigate('/corporate/training/services');
  };

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
        <div className="py-20 px-4">
          {/* Heading Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
              Corporate Training Solutions for Your Organization
            </h1>
            <p className="text-m sm:text-m text-slate-700 leading-relaxed mt-4">
              Empower your teams with industry-relevant programs designed for real business impact.
            </p>
          </motion.div>

          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCorporateClick}
              className="group relative bg-white rounded-2xl shadow-lg border-2 border-slate-200 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-blue-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <div className="relative p-8 text-center">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
                >
                  <Building2 className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                  CORPORATE
                </h2>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Professional training solutions designed for corporate workforce development
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="corporate-btn-1"
                >
                  Explore Programs
                </motion.button>
              </div>
              <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          </div>
        </div>
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
