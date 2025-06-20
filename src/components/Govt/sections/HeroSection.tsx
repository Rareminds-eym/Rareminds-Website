import { useState, useEffect } from "react";
import { Calendar, CircleChevronDown, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GooeyText } from "../../ui/GooeyText";
import { ParticleButton } from "../../../components/ui/particle-button";
import { PopupButton } from "react-calendly";

const heroSlides = [
  {
    bg: "url('https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Government/Home/Hero_Section/Hero.webp')",
    title: "Over ₹10 Crore in Skill Projects Delivered.\nOne Trusted Partner.Seamless Execution.\nGuaranteed Impact.",
    description: "Pan-India deployment. Tier 2 & 3 coverage.\nLMS, dashboards, assessments, and 13+ language trainers — all under one roof.",
    alt: "Rareminds government skill development projects impact"
  },
  {
    bg: "url('https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Government/Home/Hero_Section/banner1.webp')",
    title: (
      <div className="w-full text-center flex items-center justify-center min-h-[20px]">
        <GooeyText
          texts={[
            "Collaborate • Innovate • Transform",
            "सहयोग करें नवाचार करें परिवर्तन करें।",
            "ஒன்றிணை உருவாக்கு மேம்படு.",
            "కలిసి పనిచేయండి ఆవిష్కరించండి మార్పు తేడి రండి."
          ]}
          morphTime={1}
          cooldownTime={3}
          className="font-bold text-4xl md:text-5xl lg:text-6xl text-center text-black relative z-10 whitespace-wrap inline-block mx-auto w-full"
        />
      </div>
    ),
    description: "Rareminds invites State Skill Development Missions (SSDMs), education departments,universities, \n& public sector initiatives to explore high-impact collaborations tailored for local needs.",
    alt: "Collaboration call to action in multiple languages"
  },
  {
    bg: "url('https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Government/Home/Hero_Section/banner2.webp')",
    title: (
      <div className="w-full flex items-center justify-center min-h-[20px]">
        <GooeyText
          texts={[
            "ಸಹಕಾರ ನೀಡಿ. ಹೊಸದಾಗಿ ಯೋಚಿಸಿ. ಪರಿವರ್ತನೆ ತಂದುಕೊಳ್ಳಿ",
            "सहकार्य गरौं। नवप्रवर्तन गरौं। रूपान्तरण गरौं।",
            "সহযোগ কৰক। নতুনত্ব আনক। পৰিবৰ্তন আনক।",
            "सहकार्य करा. नवे निर्माण करा. परिवर्तन घडवा."
          ]}
          morphTime={1}
          cooldownTime={3}
          className="font-bold text-4xl md:text-5xl lg:text-6xl text-center text-black relative z-10 whitespace-wrap inline-block mx-auto w-full"
        />
      </div>
    ),
    description: "Rareminds invites State Skill Development Missions (SSDMs), education departments,universities, \n& public sector initiatives to explore high-impact collaborations tailored for local needs.",
    alt: "Innovation call to action in regional Indian languages"
  },
  {
    bg: "url('https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Government/Home/Hero_Section/banner3.webp')",
    title: (
      <div className="w-full flex items-center justify-center min-h-[20px]">
        <GooeyText
          texts={[
            "সহযোগ করুন. নতুন চিন্তা করুন. রূপান্তর করুন.",
            "સહયોગ કરો. નવીનતા લાવો. રૂપાંતર લાવો.",
            "ਸਹਿਯੋਗ ਕਰੋ. ਨਵੀਨਤਾ ਲਿਆਓ. ਬਦਲਾਅ ਲਿਆਓ.",
            "Collaborate. Innovate. Transform."
          ]}
          morphTime={1}
          cooldownTime={3}
          className="font-bold text-4xl md:text-5xl lg:text-6xl text-center text-black relative z-10 whitespace-wrap inline-block mx-auto w-full"
        />
      </div>
    ),
    description: "Rareminds invites State Skill Development Missions (SSDMs), education departments,universities, \n& public sector initiatives to explore high-impact collaborations tailored for local needs.",
    alt: "Transformation message in multiple Indian languages"
  }
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? window.innerWidth : -window.innerWidth,
    opacity: 0,
    zIndex: 0,
    scale: 0.95,
    transition: {
      x: { type: "spring", stiffness: 200, damping: 25 },
      opacity: { duration: 0.3 },
      scale: { duration: 0.3 },
    },
  }),
  center: {
    x: 0,
    opacity: 1,
    zIndex: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.4 },
      scale: { duration: 0.4 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    zIndex: 0,
    scale: 0.9,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.4 },
      scale: { duration: 0.4 },
    },
  }),
};

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay] = useState(true);
  const [direction, setDirection] = useState(0);
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const slideIndex = wrap(0, heroSlides.length, currentSlide);

  useEffect(() => {
    setRoot(document.getElementById('root'));
  }, []);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentSlide(currentSlide + newDirection);
  };

  function wrap(min: number, max: number, v: number) {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
  }

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const interval = autoPlay ? setInterval(() => {
      paginate(1);
    }, isMobile ? 8000 : 12000) : null;

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoPlay, currentSlide]);

  const scrollToGovOutcome = () => {
    const el = document.getElementById("scrolltobottom");
    if (el) {
      const yOffset = -290;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="fixed top-0 w-full h-[980px] flex items-center overflow-hidden flex-col sm:flex-row"
      aria-label="Government skills development achievements"
      role="region"
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        {heroSlides.map((slide, index) => (
          slideIndex === index && (
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 will-change-transform translate-z-0"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'translateZ(0)'
              }}
              aria-hidden={slideIndex !== index}
              aria-live="polite"
              aria-atomic="true"
              aria-labelledby={`slide-${index}-title`}
            >
              <motion.div
                className="min-h-screen w-full bg-cover bg-center flex items-center justify-center sm:justify-start"
                style={{
                  backgroundImage: slide.bg,
                }}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                exit={{ scale: 1.1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                aria-label={slide.alt}
                role="img"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"
                  aria-hidden="true"
                />

                <div className="relative w-full flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 text-black max-w-7xl mx-auto z-10">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug mb-4 text-center w-full"
                    id={`slide-${index}-title`}
                  >
                    {typeof slide.title === 'string' ? slide.title : slide.title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className="text-sm sm:text-base md:text-lg text-gray-800 mb-6 sm:mb-8 text-center whitespace-pre-line max-w-4xl"
                    id={`slide-${index}-desc`}
                  >
                    {slide.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="flex text-xs md:text-base flex-wrap gap-2 sm:gap-4 justify-center"
                  >
                    <ParticleButton
                      className="flex items-center p-2 md:px-4 md:py-2 bg-red-500/80 backdrop-blur rounded-full text-white shadow-sm shadow-red-400 border-2 border-red-300 hover:bg-red-600 transition-colors"
                      successDuration={1200}
                      size={"lg"}
                      particleColor="#ffffff"
                      particleSize={7}
                      onClick={() => {
                        const contactElement = document.getElementById('government-outcomes');
                        if (contactElement) {
                          contactElement.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      aria-label="View government training portfolio"
                    >
                      <Eye className="h-5 sm:h-6 w-5 sm:w-6 mr-2" aria-hidden="true" />
                      View Our Government Training Portfolio
                    </ParticleButton>
                    <div 
                      className="flex items-center bg-white/80 hover:bg-white transition-colors px-4 sm:px-6 py-2 sm:py-3 backdrop-blur rounded-full shadow-sm shadow-white border-2 border-black/70 text-black"
                      aria-label="Schedule a strategy call"
                    >
                      <Calendar className="h-4 sm:h-5 w-4 sm:w-5 mr-2" aria-hidden="true" />
                      {root && (
                        <PopupButton
                          url="https://calendly.com/gowdanavi279/new-meeting"
                          text="Schedule a Strategy Call"
                          rootElement={root}
                          aria-label="Open calendar to schedule a call"
                        />
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed md:right-4 sm:right-8 md:top-1/2 bottom-10 md:bottom-auto md:-translate-y-1/2 flex flex-row md:flex-col items-center justify-center w-full md:w-auto gap-2 sm:gap-4 z-50 md:bg-black/30 md:px-2 py-3 sm:py-4 md:rounded-full"
        aria-label="Carousel navigation controls"
      >
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > slideIndex ? 1 : -1);
              setCurrentSlide(index);
            }}
            className={`w-2 sm:w-3 transition-all duration-300 rounded-full ${
              slideIndex === index
                ? "bg-white h-4 sm:h-6 shadow-lg shadow-white/30"
                : "bg-white/50 hover:bg-white/70 h-2 sm:h-3"
            }`}
            aria-label={`Go to slide ${index + 1} of ${heroSlides.length}`}
            aria-current={slideIndex === index}
          />
        ))}
      </motion.div>

      <div 
        className="absolute bottom-2 md:bottom-6 left-10 sm:left-20 md:left-32 flex flex-col items-center z-50 animate-pulse bg-white/90 p-1 sm:p-2 backdrop-blur-sm shadow-md shadow-red-600 ring-2 sm:ring-4 ring-white/50 rounded-full cursor-pointer"
        onClick={scrollToGovOutcome}
        role="button"
        tabIndex={0}
        aria-label="Scroll down to view government outcomes"
        onKeyDown={(e) => e.key === 'Enter' && scrollToGovOutcome()}
      >
        <img
          src="https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/Index/Hero/scroll.png"
          width="60"
          alt="Decorative scroll animation"
          className="animate-spin-slow"
          aria-hidden="true"
        />
        <CircleChevronDown
          size={35}
          className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
          aria-hidden="true"
        />
      </div>
    </section>
  );
};