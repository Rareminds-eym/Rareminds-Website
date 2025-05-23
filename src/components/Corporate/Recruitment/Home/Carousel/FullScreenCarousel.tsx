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
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto-advance slides every 12 seconds, reset on manual change
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 12000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeIndex, slides.length]);

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
    "ace.png",
    "ardent.png",
    "BNM.png",
    "bsvlogo.png",
    "csm.png",
    "DF.png",
    "e4m.png",
    "e4softwares.png",
    "ESSGEE.png",
    "fifthgen.png",
    "goldensource.png",
    "Infolob.png",
    "ITC.png",
    "motherson.png",
    "Msafe.png",
    "necb.png",
    "NES.png",
    "Nexgen.png",
    "PCC.png",
    "PFC.png",
    "Quadgen.png",
    "qwqer.png",
    "sssi.png",
    "Sugam.png",
    "Verastar.png",
    "Wipro-consumer-care.png",
  ];

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  // Scroll to Contact Form
  const handleScrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
  // Scroll to Services Section
  const handleScrollToServices = () => {
    const el = document.getElementById("services");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Update setActiveIndex to reset timer on manual dot or swipe
  const handleDotClick = (idx: number) => {
    setActiveIndex(idx);
  };

  return (
    <div
      className={`corporate-full-screen-h w-full ${className} relative overflow-auto`}
    >
      <div className="h-full w-full overflow-auto">
        <div
          className="relative w-full h-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center"
            >
              <div className="container flex flex-col lg:flex-row items-center justify-between w-full px-4 md:px-8 lg:px-14">
                {/* Left side - Text content */}
                <div className="w-full lg:w-[60%] py-6 lg:py-0 lg:pr-8 mb-4 lg:mb-0 text-center lg:text-left lg:-mt-14">
                  <div className="relative min-h-[90px]">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.h1
                        key={slides[activeIndex].heading}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold !leading-[1.5] md:!leading-[1.4] w-full"
                        dangerouslySetInnerHTML={{ __html: slides[activeIndex].heading }}
                        initial={{ opacity: 0, y: 40, scale: 0.95, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -40, scale: 0.95, filter: 'blur(4px)' }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                      />
                    </AnimatePresence>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.p
                        key={slides[activeIndex].subheading}
                        className="text-base sm:text-lg lg:text-xl max-w-2xl lg:max-w-none mx-auto lg:mx-0 w-full mt-4"
                        initial={{ opacity: 0, x: 40, scale: 0.95, filter: 'blur(2px)' }}
                        animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, x: -40, scale: 0.95, filter: 'blur(2px)' }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                      >
                        {slides[activeIndex].subheading}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  {/* Buttons - no animation wrapper */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center lg:justify-start">
                    <button className="corporate-btn-1" onClick={handleScrollToContact}>
                      Request Talent Now
                      <Icon
                        icon="cil:arrow-right"
                        height={20}
                        width={20}
                        className="ml-2"
                      />
                    </button>
                    <button className="corporate-btn-2" onClick={handleScrollToServices}>
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
                <div className="w-full lg:w-[40%] mt-4 lg:mt-0 flex items-center justify-center relative min-h-[300px]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.img
                      key={slides[activeIndex].img}
                      src={slides[activeIndex].img}
                      alt={slides[activeIndex].heading}
                      height={400}
                      width={400}
                      className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] max-w-xl mx-auto lg:max-w-none object-cover rounded-lg absolute"
                      initial={{ opacity: 0, scale: 0.85, rotate: 8, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: 0.85, rotate: -8, filter: 'blur(6px)' }}
                      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                    />
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          {/* Dots - right center vertically for all screens */}
          <div className="flex flex-col gap-3 absolute right-6 top-1/2 -translate-y-1/2 z-20">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
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
            src="https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/Index/Hero/scroll.png"
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
