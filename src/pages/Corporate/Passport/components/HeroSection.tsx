import { FaCalendarAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import banner1 from "../../../../../public/passport/Home-page-banner_1.png";
import banner2 from "../../../../../public/passport/Home-page-banner_2.png";
// import Banner3 from "../../../../../public/passport/Home-page-banner_3.png";
import Banner4 from "../../../../../public/passport/Home-page-banner_4.png";
import Banner5 from "../../../../../public/passport/Home-page-banner_5.png";

import mobileBanner1 from "../../../../../public/passport/Home-page-banner_mobile_1.png";
import mobileBanner2 from "../../../../../public/passport/Home-page-banner_mobile_2.png";

const desktopSlides = [
  {
    image: banner1,
    heading: "Still Reading Resumes? You’re Already Behind",
  },
  {
    image: banner2,
    heading: "Stop Guessing. Start Hiring Verified.",
  },
  // {
  //   image: Banner3,
  //   heading: "AI Verifies. Not Guesses. Your Hiring Should Too.",
  // },
  {
    image: Banner4,
    heading: "Smart Companies Don’t Hunt Talent — They Scan SkillPassports.",
  },
  {
    image: Banner5,
    heading: "Cut Hiring Time by 70%. Keep Every Bit of Quality.",
  }
];

const mobileSlides = [
  {
    image: mobileBanner1,
    heading: "Still Reading Resumes? You’re Already Behind",
  },
  {
    image: mobileBanner2,
    heading: "Stop Guessing. Start Hiring Verified.",
  },
  // {
  //   image: Banner3,
  //   heading: "AI Verifies. Not Guesses. Your Hiring Should Too.",
  // },
  {
    image: Banner4,
    heading: "Smart Companies Don’t Hunt Talent. They Scan SkillPassports.",
  },
  {
    image: Banner5,
    heading: "Cut Hiring Time by 70%. Keep Every Bit of Quality.",
  }
];

const HeroSection = ({ onDemoClick }: { onDemoClick: () => void }) => {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const slides = isMobile ? mobileSlides : desktopSlides;

  // Auto fade every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  return (
    <section className="relative w-auto h-[600px] md:h-[640px] overflow-hidden m-4 md:m-6 rounded-2xl shadow-sm bg-[#EDF2F9]">
      {/* Fade Images */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.img
            key={slides[current].image}
            src={slides[current].image}
            alt="Hero Banner"
            className="w-full h-full object-cover absolute"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="text-white"
          >
            {/* Fade Headings */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={slides[current].heading}
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-[50px] xl:text-6xl font-extrabold leading-tight mb-6 text-black`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {slides[current].heading}
              </motion.h1>
            </AnimatePresence>

            <p className="text-base sm:text-lg md:text-xl mb-8 max-w-xl text-gray-700">
              From classrooms to careers → verified, portable, and future-ready skills at your fingertips.
            </p>

            <button
              onClick={onDemoClick}
              className="bg-[#E32A18] hover:bg-[#cc2515] px-7 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg text-white"
            >
              <FaCalendarAlt /> Enquiry
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
