import { motion, useScroll, useTransform } from 'framer-motion';
import { Download, Calendar, Users, School, Target, Award } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import CountUp from 'react-countup';

const banners = [
  {
    title: "Empowered Faculty = Empowered Students",
    subtitle: "Train your teachers with cutting-edge tools and pedagogy.",
    cta: "Request FDP Brochure →",
    video: "https://player.vimeo.com/external/370467553.hd.mp4?s=ce49c8c6d8e28a89548951f15c13b611ddc5689a&profile_id=174&oauth2_token_id=57447761",
    poster: "https://images.unsplash.com/photo-1523240795612-9a054b0db644"
  },
  {
    title: "Turn Lecturers into Mentors, Classrooms into Labs.",
    subtitle: "Discover experiential, AI-integrated, NEP-aligned FDP programs.",
    cta: "Schedule an FDP Demo →",
    video: "https://player.vimeo.com/external/370467553.hd.mp4?s=ce49c8c6d8e28a89548951f15c13b611ddc5689a&profile_id=174&oauth2_token_id=57447761",
    poster: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655"
  },
  {
    title: "Redefine Teaching. Reskill Your Faculty.",
    subtitle: "Education is changing. Is your faculty future-ready?",
    cta: "Enquire About Our FDP Tracks →",
    video: "https://player.vimeo.com/external/370467553.hd.mp4?s=ce49c8c6d8e28a89548951f15c13b611ddc5689a&profile_id=174&oauth2_token_id=57447761",
    poster: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"
  },
  {
    title: "Not Just FDP. A Faculty Renaissance.",
    subtitle: "Transform content delivery, engagement & assessment.",
    cta: "Launch the Upgrade →",
    video: "https://player.vimeo.com/external/370467553.hd.mp4?s=ce49c8c6d8e28a89548951f15c13b611ddc5689a&profile_id=174&oauth2_token_id=57447761",
    poster: "https://images.unsplash.com/photo-1523580494863-6f3031224c94"
  },
  {
    title: "Build Institutions That Build Legacies.",
    subtitle: "World-class teacher training starts here.",
    cta: "Book Institutional FDP Consultation →",
    video: "https://player.vimeo.com/external/370467553.hd.mp4?s=ce49c8c6d8e28a89548951f15c13b611ddc5689a&profile_id=174&oauth2_token_id=57447761",
    poster: "https://images.unsplash.com/photo-1517048676732-d65bc937f952"
  }
];

const stats = [
  { value: 8000, label: 'Faculty Trained', icon: Users, suffix: '+' },
  { value: 25, label: 'Universities', icon: School, suffix: '+' },
  { value: 95, label: 'Effectiveness', icon: Target, suffix: '%' },
  { value: 70, label: 'Renewal Rate', icon: Award, suffix: '%' }
];

export default function HeroSection() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#A7D8DE] to-[#FCD5CE] text-white overflow-hidden">
      {banners.map((banner, index) => (
        <motion.div
          key={index}
          initial={false}
          animate={{
            opacity: currentBanner === index ? 1 : 0,
            scale: currentBanner === index ? 1 : 1.1,
          }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 ${currentBanner === index ? 'z-10' : 'z-0'}`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.1, 0.2],
              transition: { duration: 2, repeat: Infinity, repeatType: "reverse" }
            }}
            className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-purple-100/30 to-pink-100/30"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover mix-blend-overlay"
              poster={banner.poster}
            >
              <source src={banner.video} type="video/mp4" />
            </video>
          </motion.div>
          
          <div className="container mx-auto px-6 relative z-10 h-screen flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: currentBanner === index ? 1 : 0, y: currentBanner === index ? 0 : 50 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.h1 
                className="text-6xl md:text-7xl font-bold mb-8 text-white"
                initial={{ scale: 0.95 }}
                animate={{ scale: currentBanner === index ? 1 : 0.95 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {banner.title}
              </motion.h1>
              
              <motion.p
                className="text-2xl md:text-3xl mb-12 text-blue-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: currentBanner === index ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                {banner.subtitle}
              </motion.p>
              
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: currentBanner === index ? 0 : 20, opacity: currentBanner === index ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-900 px-8 py-4 rounded-full font-semibold inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Calendar className="w-5 h-5" />
                {banner.cta}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      ))}
      
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentBanner === index 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-900/80 via-blue-900/50 to-transparent z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      />

      <div className="absolute bottom-0 left-0 right-0" ref={statsRef}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex justify-center gap-20 py-8 bg-white/5 backdrop-blur-sm border-t border-white/10"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
              className="text-center"
            >
              <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white mb-1">
                {isVisible && (
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    separator=","
                    suffix={stat.suffix}
                  />
                )}
              </div>
              <div className="text-blue-200 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Tagline Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 backdrop-blur-sm py-4 border-t border-white/10"
        >
          <div className="overflow-hidden">
            <motion.div
              animate={{
                x: [0, -1000],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  duration: 20,
                  ease: "linear"
                }
              }}
              className="whitespace-nowrap"
            >
              <span className="text-xl md:text-2xl font-semibold text-white inline-block px-4">
                From Chalk & Talk to Click & Connect – The Future of Teaching Starts Today
              </span>
              <span className="text-xl md:text-2xl font-semibold text-white inline-block px-4">
                From Chalk & Talk to Click & Connect – The Future of Teaching Starts Today
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}