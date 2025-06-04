import { motion } from 'framer-motion';
import { Download, FileSpreadsheet, PhoneCall, Rocket, BadgeCheck, Users } from 'lucide-react';
import { useState, useEffect } from 'react';

const banners = [
  {
    title: "Graduate With Skills That Pay!",
    subtitle: "Don't just pass exams.Get job-ready with our industry-aligned programs.",
    video: "https://player.vimeo.com/external/370467553.hd.mp4?...",
    poster: "/institutions/images/Banners/sdp/Banner1.jpg",
    cta: [
      {
        text: "Download Course List",
        icon: <Download className="inline-block mr-2 h-5 w-5" />,
        style: "button-primary",
        href: "/institutions/pdfs/Course_List.pdf",
      },
      {
        text: "Get a Free Campus Audit",
        icon: <FileSpreadsheet className="inline-block mr-2 h-5 w-5" />,
        style: "button-secondary",
        href: "/institutions/pdfs/Campus Audit.pdf",
      }
    ]
  },
  {
    title: "From Campus to Career: We Bridge the Gap.",
    subtitle: "Real world training, placement assistance & certifications that matter.",
    video: "https://player.vimeo.com/external/370467553.hd.mp4?...",
    poster: "/institutions/images/Banners/sdp/Banner2.jpg",
    cta: [
      {
        text: "Get Trained. Get Hired →",
        icon: <Rocket className="inline-block mr-2 h-5 w-5" />,
        style: "button-secondary"
      }
    ]
  },
  {
    title: "College is Temporary. Your Career Isn’t.",
    subtitle: "Build your future, with expert-led modules in trending domains.",
    video: "https://player.vimeo.com/external/370467553.hd.mp4?...",
    poster: "/institutions/images/Banners/sdp/Banner3.jpeg",
    cta: [
      {
        text: "Book a Free Counseling Call →",
        icon: <PhoneCall className="inline-block mr-2 h-5 w-5" />,
        style: "button-primary",
        href: "tel:+919902326951",
        target: "_blank",
        rel: "noopener noreferrer"
      }
    ]
  },
  {
    title: "Why Settle for Degrees Alone?",
    subtitle: "Upskill in 45 hours. Land internships, projects, and job offers.",
    video: "https://player.vimeo.com/external/370467553.hd.mp4?...",
    poster: "/institutions/images/Banners/sdp/Banner4.jpg",
    cta: [
      {
        text: "See What You Can Become →",
        icon: <BadgeCheck className="inline-block mr-2 h-5 w-5" />,
        style: "button-primary"
      }
    ]
  },
  {
    title: "You're Not Just a Student.You're a Brand.",
    subtitle: "Personal branding, communication skills & placement prep – we’ve got you.",
    video: "https://player.vimeo.com/external/370467553.hd.mp4?...",
    poster: "/institutions/images/Banners/sdp/Banner5.jpg",
    cta: [
      {
        text: "Join the Future-Ready Tribe →",
        icon: <Users className="inline-block mr-2 h-5 w-5" />,
        style: "button-secondary"
      }
    ]
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
    }, 12000);
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
                className="absolute inset-0 w-full h-full object-cover z-0"
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
                className={`max-w-2xl ${
                  index === 2 || index === 5
                    ? 'text-center ml-auto'
                    : index === 1 || index === 3
                    ? 'text-center mr-auto'
                    : 'text-center ml-auto'
                } ${index === 0 ? 'pt-44' : ''}`}
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
                  {banner.subtitle === "Build your future, with expert-led modules in trending domains." ? (
                <>
                  <span className="block">Build your future, with expert-led modules</span>
                  <span className="block">in trending domains.</span>
                </>
                 )   : banner.subtitle.match(/[^:.&]+[:.&]?/g)?.map((part, i) => (
                        <span key={i} className="block">
                          {part.trim()}
                        </span>
                      ))}
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-8 pt-10 justify-center"

                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: currentBanner === index ? 0 : 20, opacity: currentBanner === index ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  {banner.cta.map((btn, i) =>
                    btn.href ? (
                      <motion.a
                        key={i}
                        href={btn.href}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={btn.style}
                      >
                        {btn.icon}
                        {btn.text}
                      </motion.a>
                    ) : (
                      <motion.button
                        key={i}
                        onClick={() => {
                          console.log("CTA button clicked – opening modal");
                          setIsComingSoonOpen(true);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={btn.style}
                      >
                        {btn.icon}
                        {btn.text}
                      </motion.button>
                    )
                  )}
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
                currentBanner === index ? 'bg-[#222B33] w-6' : 'bg-white/50 hover:bg-white/70'
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

        <div className="hidden lg:block container ">
          <div
            onClick={handleScrollDown}
            className="w-max absolute bottom-[70px] left-12 cursor-pointer transition-opacity z-10"
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

      {/* <ComingSoonModal isOpen={isComingSoonOpen} onClose={() => setIsComingSoonOpen(false)} /> */}
    </>
  );
}
