import { motion } from 'framer-motion';
//import { Download, FileSpreadsheet, PhoneCall, Rocket, BadgeCheck, Users } from 'lucide-react';
import { useState, useEffect } from 'react';


const banners = [
  {
    title: " Speak Bold. Lead Smart.",
    subtitle: "Turn potential into presence. Our expert-led communication and personality development programs build confidence, clarity, and campus-to-career readiness.",
    video: "https://player.vimeo.com/external/370467553.hd.mp4?...",
    poster: "/institutions/images/Banners/inst/Banner1.jpg",
  },
  {
    title: "Learn Deep. Work Smart.",
    subtitle: "Bridge the skill gap with hands-on, industry-certified training in high-demand domains — from food tech to medical coding. Your students, job-ready from day one.",
    video: "https://player.vimeo.com/external/370467553.hd.mp4?...",
    poster: "/institutions/images/Banners/inst/Banner2.jpg",
  },
  {
    title: " Lead the Change. Own the Future.",
    subtitle: "Empower students to rise as decision-makers, not just job seekers. Our leadership and career pathways fuel ambition, innovation, and professional mastery.",
    video: "https://player.vimeo.com/external/370467553.hd.mp4?...",
    poster: "/institutions/images/Banners/inst/Banner3.jpeg",
  }
];

export default function Hero() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#A7D8DE] to-[#FCD5CE] text-white overflow-hidden">
      {banners.map((banner, index) => (
        <motion.div
          key={index}
          initial={false}
          animate={{
            opacity: currentBanner === index ? 1 : 0,
            scale: currentBanner === index ? 1 : 1.05,
          }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 w-full h-screen overflow-hidden ${currentBanner === index ? 'z-10' : 'z-0'}`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.5, 0.7, 0.85],
              transition: { duration: 2, repeat: Infinity, repeatType: "reverse" }
            }}
            className="absolute inset-0 w-full h-full"
          >
            <video
              autoPlay
              loop
              muted
              className="absolute inset-0 w-full h-full object-cover z-0 "
              poster={banner.poster}
            >
              <source src={banner.video} type="video/mp4" />
            </video>
          </motion.div>
          
          <div className="container mx-auto px-4 relative z-10 h-screen flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: currentBanner === index ? 1 : 0, y: currentBanner === index ? 0 : 50 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-right max-w-2xl ml-auto"
            >
              <motion.h1 
              className="text-3xl md:text-3xl font-bold mb-20 text-black leading-tight"
              initial={{ scale: 0.95 }}
              animate={{ scale: currentBanner === index ? 1 : 0.95 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {banner.title.match(/[^:.]+[:.]?/g)?.map((part, idx) => (
                <span key={idx} className="block">
                  {part.trim()}
                </span>
              ))}
             </motion.h1>

              
              <motion.p
                className="text-xl md:text-xl mb-12 text-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: currentBanner === index ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                {banner.subtitle === "Turn potential into presence. Our expert-led communication and personality development programs build confidence, clarity, and campus-to-career readiness." ? (
                <>
                  <span className="block">Turn potential into presence.</span>
                  <span className="block">Our expert-led communication</span>
                  <span className="block">and personality development programs</span>
                  <span className="block">build confidence, clarity,</span>
                  <span className="block">and campus-to-career readiness.</span>

                </>
              ) : banner.subtitle === "Bridge the skill gap with hands-on, industry-certified training in high-demand domains — from food tech to medical coding. Your students, job-ready from day one." ? (
                <>
                  <span className="block">Equip your campus with</span>
                  <span className="block">emotional intelligence and resilience. </span>
                  <span className="block">RareMinds trains mentors and students</span>
                  <span className="block"> in mental wellness, peer counseling and</span>
                  <span className="block"> compassionate support systems.</span>
                </>
              ) : banner.subtitle === "Empower students to rise as decision-makers, not just job seekers. Our leadership and career pathways fuel ambition, innovation, and professional mastery." ? (
                <>
                  <span className="block">Empower students to rise as decision-makers,</span>
                  <span className="block">not just job seekers.</span>
                  <span className="block">Our leadership and career pathways</span>
                  <span className="block">fuel ambition, innovation,</span>
                  <span className="block">and professional mastery.</span>
                </>
              ) : (
                banner.subtitle.match(/[^:.&]+[:.&]?/g)?.map((part, i) => (
                  <span key={i} className="block">
                    {part.trim()}
                  </span>
                ))
              )}
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-8 justify-center pt-10"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: currentBanner === index ? 0 : 20, opacity: currentBanner === index ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
              
              
              </motion.div>

            </motion.div>
            </div>
            </motion.div>
            ))}
      
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentBanner === index 
                ? 'bg-[#222B33] w-6' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-900/80 via-primary-900/50 to-transparent z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      />

            {/* Arrow down button */}
              <div className="hidden lg:block container ">
                <div
                  onClick={handleScrollDown}
                  className="w-max absolute bottom-[60px] left-1/2 -translate-x-1/2 cursor-pointer transition-opacity z-10"
                  aria-label="Scroll down"
                >
                  <img
                    src="/institutions/vectors/scroll.png"
                    width="100"
                    height="100"
                    alt="Scroll down"
                    className="scroll-rotate"
                  />
                  <img
                    src="/institutions/vectors/arrowDown.svg"
                    width="62"
                    height="62"
                    alt="Scroll down"
                    className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                  />
                </div>
              </div>

    </section>
     {/*<ComingSoonModal isOpen={isComingSoonOpen} onClose={() => setIsComingSoonOpen(false)} />*/}
     </>
  );
}