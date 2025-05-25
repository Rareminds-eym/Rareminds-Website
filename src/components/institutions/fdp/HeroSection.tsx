import { motion } from 'framer-motion';
import { Download, CalendarCheck , MessageSquareMore, Users, School, Target, Award, Rocket, Landmark } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import CountUp from 'react-countup';


const banners = [
  {
    title: "Empowered Faculty = Empowered Students",
    subtitle: "Train your teachers with cutting-edge tools and pedagogy.",
    video: "https://player.vimeo.com/external/370467553.hd.mp4?s=ce49c8c6d8e28a89548951f15c13b611ddc5689a&profile_id=174&oauth2_token_id=57447761",
    poster: "/institutions/images/Banners/fdp/Banner1.jpg",
    cta: 
    [
      {
        text: "FDP Brochure",
        icon: <Download className="inline-block mr-2 h-5 w-5" />,
        style: "button-primary", 
        href: "/institutions/pdfs/Brochure.pdf",
      }
    ]
  },
  {
    title: "Turn Lecturers into Mentors, Classrooms into Labs.",
    subtitle: "Discover experiential, AI-integrated, NEP-aligned FDP programs.",
    video: "https://player.vimeo.com/external/370467553.hd.mp4?s=ce49c8c6d8e28a89548951f15c13b611ddc5689a&profile_id=174&oauth2_token_id=57447761",
    poster: "/institutions/images/Banners/fdp/Banner2.jpeg",
    cta: 
    [
      {
        text: "Schedule an FDP Demo",
        icon: <CalendarCheck className="inline-block mr-2 h-5 w-5" />,
        style: "button-secondary", 
        //href: "/",
      }
    ]
  },
  {
    title: "Redefine Teaching. Reskill Your Faculty.",
    subtitle: "Education is changing. Is your faculty future-ready?",
    video: "https://player.vimeo.com/external/370467553.hd.mp4?s=ce49c8c6d8e28a89548951f15c13b611ddc5689a&profile_id=174&oauth2_token_id=57447761",
    poster: "/institutions/images/Banners/fdp/Banner3.jpeg",
    cta: 
    [
      {
        text: "Enquire About Our FDP Tracks ",
        icon: <MessageSquareMore className="inline-block mr-2 h-5 w-5" />,
        style: "button-primary", 
        //href: "/",
      }
    ]
  },
  {
    title: "Not Just FDP. A Faculty Renaissance.",
    subtitle: "Transform content delivery, engagement & assessment.",
    video: "https://player.vimeo.com/external/370467553.hd.mp4?s=ce49c8c6d8e28a89548951f15c13b611ddc5689a&profile_id=174&oauth2_token_id=57447761",
    poster: "/institutions/images/Banners/fdp/Banner4.jpg",
    cta: 
    [
      {
        text: "Launch the Upgrade",
        icon: <Rocket className="inline-block mr-2 h-5 w-5" />,
        style: "button-secondary", 
        //href: "/",
      }
    ]
  },
  {
    title: "Build Institutions That Build Legacies.",
    subtitle: "World-class teacher training starts here.",
    video: "https://player.vimeo.com/external/370467553.hd.mp4?s=ce49c8c6d8e28a89548951f15c13b611ddc5689a&profile_id=174&oauth2_token_id=57447761",
    poster: "/institutions/images/Banners/fdp/Banner5.jpeg",
    cta: 
    [
      {
        text: "Book Institutional FDP Consultation ",
        icon: <Landmark className="inline-block mr-2 h-5 w-5" />,
        style: "button-primary", 
        //href: "/",
      }
    ]
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
              playsInline
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
                {banner.title === "Build Institutions That Build Legacies." ? (
                      <>
                        <span className="block">Build Institutions</span>
                        <span className="block">That Build Legacies.</span>
                      </>
                    ) : banner.title.match(/[^:.=,]+[:.=,]?/g)?.map((part, idx) => (
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
                
               {banner.subtitle === "Discover experiential, AI-integrated, NEP-aligned FDP programs." ? (
                <>
                  <span className="block">Discover experiential, AI-integrated,</span>
                  <span className="block">NEP-aligned FDP programs.</span>
                </>
              ) : banner.subtitle === "Train your teachers with cutting-edge tools and pedagogy." ? (
                <>
                  <span className="block">Train your teachers with</span>
                  <span className="block">cutting-edge tools and pedagogy.</span>
                </>
              ) : banner.subtitle === "Transform content delivery, engagement & assessment." ? (
                <>
                  <span className="block">Transform content delivery,</span>
                  <span className="block">engagement & assessment.</span>
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
              {banner.cta.map((btn, i) => (
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
              ))}
              
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
                ?'bg-[#222B33] w-6' 
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
                      
      {/*Stats Section*/}
      <section className=" bg-gray-700 backdrop-blur-md" >
        <div
          ref={statsRef}
          className="flex justify-center gap-40 py-6 border-y border-white/80 "
          
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
              className="text-center z-10"
            >
              <stat.icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-white mb-1">
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
        </div>
        </section>


        {/* Animated Tagline Strip */}
        <div className='py-1 '/>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="w-full bg-[#001F3F] text-white text-sm md:text-base py-3 border-t border-white/10"
            >
              <div className="overflow-hidden">
                <motion.div
                  animate={{ x: [0, -1000] }}
                  transition={{ x: { repeat: Infinity, duration: 25, ease: "linear" } }}
                  className="whitespace-nowrap"
                >
                  <span className="inline-block mx-8 font-normal">
                    📌 From Chalk & Talk to Click & Connect – The Future of Teaching Starts Today.
                  </span>
                  <span className="inline-block mx-8 font-normal">
                    💡 Connect Institutions & Industry – Create Career Pathways.
                  </span>
                  <span className="inline-block mx-8 font-normal">
                    🎯 Beyond the Basics | Master Modern Pedagogy.
                  </span>
                </motion.div>
              </div>
            </motion.div>

    </>
  );
}