
import { FaCalendarAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import desktopBanner from "../../../../../public/passport/banner 1.1.jpg";
import mobileBanner from "../../../../../public/passport/BANNER 1 MOB.jpg";

const slides = [
  {
    desktopImage: desktopBanner,
    mobileImage: mobileBanner,
    heading: "More Than Certificates — Credibility Matters",
  },
];

const HeroSection = ({ onDemoClick }: { onDemoClick: () => void }) => {
  const [current, setCurrent] = useState(0);
  const multipleSlides = slides.length > 1;
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile or desktop
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Auto fade only if multiple banners
  useEffect(() => {
    if (!multipleSlides) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [multipleSlides]);

  const currentImage = isMobile
    ? slides[current].mobileImage
    : slides[current].desktopImage;

  return (
    <section className="relative w-auto h-[600px] md:h-[600px] overflow-hidden m-4 md:m-6 rounded-2xl shadow-sm bg-[#EDF2F9]">
      {/* Banner Image */}
      <div className="absolute inset-0 z-0">
        {multipleSlides ? (
          <AnimatePresence>
            <motion.img
              key={currentImage}
              src={currentImage}
              alt="Hero Banner"
              className="w-full h-full object-cover absolute"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </AnimatePresence>
        ) : (
          <img
            src={currentImage}
            alt="Hero Banner"
            className="w-full h-full object-cover absolute"
          />
        )}
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
            {/* Heading */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={slides[current].heading}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-black"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {slides[current].heading}
              </motion.h1>
            </AnimatePresence>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onDemoClick}
                className="bg-[#E32A18] hover:bg-[#cc2515] px-7 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg text-white"
              >
                Enquiry <FaCalendarAlt />
              </button>
              <button
                onClick={() =>
                  (window.location.href = "https://wa.me/1234567890")
                }
                className="bg-[#E32A18] hover:bg-[#cc2515] px-7 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg text-white"
              >
                Connect with us <FaCalendarAlt />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
