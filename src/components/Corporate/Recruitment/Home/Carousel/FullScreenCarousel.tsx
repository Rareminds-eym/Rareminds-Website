import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import arrowDown from "@/assets/corporate/Home/Carousal/arrowDown.svg";

// Custom styles for pagination
import "@/assets/corporate/Home/Carousal/carousel.css";
import LogoCarousel from "./LogoCarousel";

interface CarouselSlide {
  heading: string;
  subheading: string;
  img: string;
}

interface FullScreenCarouselProps {
  slides: CarouselSlide[];
  className?: string;
}

const FullScreenCarousel: React.FC<FullScreenCarouselProps> = ({
  slides,
  className = "",
}) => {
  const location = useLocation();
  const isOnCorporatePage = location.pathname === "/corporate";
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto-advance slides every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          // Swipe left, next slide
          setActiveIndex((prev) => (prev + 1) % slides.length);
        } else {
          // Swipe right, previous slide
          setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
        }
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const logos = [
    "/Corporate/Images/Home/ClientLogos/ace.png",
    "/Corporate/Images/Home/ClientLogos/ardent.png",
    "/Corporate/Images/Home/ClientLogos/BNM.png",
    "/Corporate/Images/Home/ClientLogos/bsvlogo.png",
    "/Corporate/Images/Home/ClientLogos/csm.png",
    "/Corporate/Images/Home/ClientLogos/DF.png",
    "/Corporate/Images/Home/ClientLogos/e4m.png",
    "/Corporate/Images/Home/ClientLogos/e4softwares.png",
    "/Corporate/Images/Home/ClientLogos/ESSGEE.png",
    "/Corporate/Images/Home/ClientLogos/fifthgen.png",
    "/Corporate/Images/Home/ClientLogos/goldensource.png",
    "/Corporate/Images/Home/ClientLogos/Infolob.png",
    "/Corporate/Images/Home/ClientLogos/ITC.png",
    "/Corporate/Images/Home/ClientLogos/motherson.png",
    "/Corporate/Images/Home/ClientLogos/Msafe.png",
    "/Corporate/Images/Home/ClientLogos/necb.png",
    "/Corporate/Images/Home/ClientLogos/NES.png",
    "/Corporate/Images/Home/ClientLogos/Nexgen.png",
    "/Corporate/Images/Home/ClientLogos/PCC.png",
    "/Corporate/Images/Home/ClientLogos/PFC.png",
    "/Corporate/Images/Home/ClientLogos/Quadgen.png",
    "/Corporate/Images/Home/ClientLogos/qwqer.png",
    "/Corporate/Images/Home/ClientLogos/sssi.png",
    "/Corporate/Images/Home/ClientLogos/Sugam.png",
    "/Corporate/Images/Home/ClientLogos/Verastar.png",
    "/Corporate/Images/Home/ClientLogos/Wipro-consumer-care.png",
  ];

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className={`corporate-full-screen-h w-full ${className} relative`}>
      <div className="h-full w-full">
        <div className="relative w-full h-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait" initial={false}>
            {slides.map((slide, index) =>
              index === activeIndex ? (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex items-center"
                >
                  <div className="container flex flex-col lg:flex-row items-center justify-between w-full px-4 md:px-8 lg:px-14">
                    {/* Left side - Text content */}
                    <div className="w-full lg:w-[60%] py-6 lg:py-0 lg:pr-8 mb-4 lg:mb-0 text-center lg:text-left">
                      <motion.h1
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold mb-3 lg:mb-4 !leading-[1.5] md:!leading-[1.4]"
                        dangerouslySetInnerHTML={{ __html: slide.heading }}
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      />
                      <motion.p
                        className="text-base sm:text-lg lg:text-xl max-w-2xl lg:max-w-none mx-auto lg:mx-0"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {slide.subheading}
                      </motion.p>
                      {/* Buttons - no animation wrapper */}
                      <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center lg:justify-start">
                        <button className="corporate-btn-1">
                          Request Talent Now
                          <Icon
                            icon="cil:arrow-right"
                            height={20}
                            width={20}
                            className="ml-2"
                          />
                        </button>
                        <button className="corporate-btn-2">
                          Explore Our Solutions
                          <Icon
                            icon="line-md:compass-loop"
                            height={20}
                            width={20}
                            className="ml-[6px]"
                          />
                        </button>
                      </div>
                    </div>
                    {/* Right side - Image */}
                    <motion.div
                      className="w-full lg:w-[40%] mt-4 lg:mt-0"
                      initial={{ opacity: 0, scale: 0.8, x: 60 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8, x: 60 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <img
                        src={slide.img}
                        alt={slide.heading}
                        height={400}
                        width={400}
                        className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] max-w-xl mx-auto lg:max-w-none object-cover rounded-lg"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
          {/* Dots - right center vertically for all screens */}
          <div className="flex flex-col gap-3 absolute right-6 top-1/2 -translate-y-1/2 z-20">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? "bg-corporate-black h-6"
                    : "bg-[#DDDDDD]"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Logos - Only shown on corporate page */}
      {isOnCorporatePage && <LogoCarousel logos={logos} />}
      {/* Arrow down button */}
      <div className="hidden lg:block container">
        <div
          onClick={handleScrollDown}
          className="w-max absolute bottom-[80px] cursor-pointer transition-opacity z-10 ml-4 md:ml-8 lg:ml-14"
          aria-label="Scroll down"
        >
          <img
            src="/Corporate/Images/Home/Hero/scroll.png"
            width="100"
            height="100"
            alt="Scroll down"
            className="scroll-rotate"
          />
          <img
            src={arrowDown}
            width="62"
            height="62"
            alt="Scroll down"
            className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default FullScreenCarousel;
