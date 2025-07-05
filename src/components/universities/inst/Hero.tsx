import { motion } from 'framer-motion';
//import { Download, FileSpreadsheet, PhoneCall, Rocket, BadgeCheck, Users } from 'lucide-react';
import { useState, useEffect } from 'react';


const banners = [
  {
    title: "  Power in Every Word. Purpose in Every Step.",
    subtitle: "Speak to be heard. Lead to be followed.",
    video: "https://player.vimeo.com/external/370467553.hd.mp4?...",
    poster: "/institutions/images/Banners/inst/Banner1.jpg",
  },
  {
    title: "Think Deep. Work Smart.",
    subtitle: "Equip every student and mentor to lead with resilience, empathy, and purpose.",
    video: "https://player.vimeo.com/external/370467553.hd.mp4?...",
    poster: "/institutions/images/Banners/inst/Banner2.jpg",
  },
  {
    title: " Lead the Change. Own the Future.",
    subtitle: "Transform students into future-ready leaders, not just employees.",
    video: "https://player.vimeo.com/external/370467553.hd.mp4?...",
    poster: "/institutions/images/Banners/inst/Banner3.jpeg",
  }
];

// --- Mobile version ---
function HeroMobile() {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };


  return (
    <section className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#A7D8DE] to-[#FCD5CE] text-black overflow-hidden lg:hidden">
      {/* Banner image/video  */}
      <div className="relative w-full flex-1 flex items-center justify-center">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover z-0"
          poster={banners[currentBanner].poster}
        >
          <source src={banners[currentBanner].video} type="video/mp4" />
        </video>
      </div>

      {/* Text section  */}
      <div className="w-full px-4 pt-6 pb-24 z-10 relative">
        <motion.h1
          className="text-2xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {banners[currentBanner].title.match(/[^:.]+[:.]?/g)?.map((part, idx) => (
            <span key={idx} className="block">
              {part.trim()}
            </span>
          ))}
        </motion.h1>
        <motion.p
          className="text-base mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {banners[currentBanner].subtitle === "Speak to be heard. Lead to be followed." ? (
            <>
              <span className="block">Speak to be heard.</span>
              <span className="block">Lead to be followed.</span>
            </>
          ) : banners[currentBanner].subtitle === "Equip every student and mentor to lead with resilience, empathy, and purpose." ? (
            <>
              <span className="block">Equip every student and mentor to lead</span>
              <span className="block">with resilience, empathy, and purpose. </span>
            </>
          ) : banners[currentBanner].subtitle === "Transform students into future-ready leaders, not just employees." ? (
            <>
              <span className="block">Transform students into future-ready leaders,</span>
              <span className="block">not just employees.</span>
            </>
          ) : (
            banners[currentBanner].subtitle.match(/[^:.&]+[:.&]?/g)?.map((part, i) => (
              <span key={i} className="block">
                {part.trim()}
              </span>
            ))
          )}
        </motion.p>
        <motion.div
          className="flex flex-col gap-4 pt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
        </motion.div>
        {/* Move pagination and scroller inside the text section */}
        <div className="absolute left-0 right-0 bottom-20 z-20 flex justify-center gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentBanner === index ? 'bg-[#222B33] w-6' : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="absolute left-0 right-0 bottom-1 flex justify-center z-30">
          <button
            onClick={handleScrollDown}
            aria-label="Scroll down"
            className="flex flex-col items-center"
          >
            <img
              src="/institutions/vectors/scroll.png"
              width="60"
              height="60"
              alt="Scroll down"
              className="scroll-rotate"
            />
            <img
              src="/institutions/vectors/arrowDown.svg"
              width="36"
              height="36"
              alt="Scroll down"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </button>
        </div>
      </div>
    </section>
  );
}

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
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Mobile */}
      <HeroMobile />

      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#A7D8DE] to-[#FCD5CE] text-white overflow-hidden hidden lg:flex">
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
                className="text-center max-w-2xl ml-auto"
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
                  {banner.subtitle === "Speak to be heard. Lead to be followed." ? (
                    <>
                      <span className="block">Speak to be heard.</span>
                      <span className="block">Lead to be followed.</span>

                    </>
                  ) : banner.subtitle === "Equip every student and mentor to lead with resilience, empathy, and purpose." ? (
                    <>
                      <span className="block">Equip every student and mentor to lead</span>
                      <span className="block">with resilience, empathy, and purpose. </span>
                    </>
                  ) : banner.subtitle === "Transform students into future-ready leaders, not just employees." ? (
                    <>
                      <span className="block">Transform students into future-ready leaders,</span>
                      <span className="block">not just employees.</span>
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
            className="w-max absolute bottom-[60px] left-36 cursor-pointer transition-opacity z-10"
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