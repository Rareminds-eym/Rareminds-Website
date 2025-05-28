import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

// Sample services data
type ServiceData = {
    id: string;
    name: string;
    headline: string;
    subtext: string;
    illustration: string;
};

interface HeroCarouselProps {
  HeroToContact: () => void;
  HeroToLogo: () => void;
  transitionDuration?: number;
  rotationInterval?: number;
}

const services: ServiceData[] = [
    {
        id: "design",
        name: "Schedule Your TDP",
        headline: "Teach the Future, Not the Past",
        subtext: "Train in NEP, Digital Pedagogy & Emotional Intelligence",
        illustration: "/academy/herobanner/1.png",
    },
    {
        id: "development",
        name: "Download TDP Calendar",
        headline: "From Chalkboards to GPT:\nAre You Ready?",
        subtext: "Upgrade to AI-integrated teaching",
        illustration: "/academy/herobanner/2.png",
    },
    {
        id: "marketing",
        name: "Explore Leadership Series",
        headline: "A Principal’s Vision\nShapes a School’s Future.",
        subtext: "Strategic leadership programs for HoDs & Principals",
        illustration: "/academy/herobanner/3.png",
    },
    {
        id: "data",
        name: "Get Certified",
        headline: "Tech Won’t Replace Teachers,\n Teachers Who Use Tech Will",
        subtext: "Learn to integrate LMS, digital tools & hybrid teaching",
        illustration: "/academy/herobanner/4.png",
    },
    {
        id: "business",
        name: "Join Emotional Intelligence Training",
        headline: "Empathy is a Superpower\nin Every Classroom.",
        subtext: "Build emotional intelligence and inclusive practices",
        illustration: "/academy/herobanner/5.png",
    }
];

export { services, type ServiceData };

const Hero = ({HeroToLogo}:HeroCarouselProps) => {  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % services.length);
        setIsTransitioning(false);
      }, 300); // Increased transition duration
    }, 7000); // Increased interval time
    
    return () => clearInterval(interval);
  }, []);

  const activeService = services[activeIndex];

  // Removed duplicate handleServiceClick declaration to avoid redeclaration error


  const location = useLocation();
  const navigate = useNavigate();

    const isSchoolPage = location.pathname === '/academia/school';

 const handleClick = useCallback(() => {
    if (isSchoolPage) {
      const section = document.getElementById('contact-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/academia/school#contact-section');
    }
  }, [isSchoolPage, navigate]);

  // User manual select service
  const handleServiceClick = (index: number) => {
    setActiveIndex(index);
  };


  return (
    <section className="w-full h-screen relative overflow-hidden">
      <div 
        className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out ${
          isTransitioning ? 'opacity-70 scale-105' : 'opacity-100 scale-100'
        }`}
        style={{
          backgroundImage: `url('${activeService. illustration}')`
        }}
      >
        {/* <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div> */}
      </div>

      <div className="relative z-10 flex items-center h-full px-16">
        <div className="w-1/3 space-y-4">
          {/* {services.map((service, index) => (
            <button
              key={service.id}
              onClick={() => handleServiceClick(index)}
              className={`block w-full text-left px-6 py-4 rounded-lg transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-white/20 backdrop-blur-sm text-white border-l-4 border-blue-400' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="text-lg font-semibold">{service.name}</span>
            </button>
          ))} */}
        </div>

        <div className={`w-2/3 pl-24 space-y-8 transition-all duration-700 ease-in-out ${
          isTransitioning ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'
        }`}>
          <div className="space-y-6 pl-32  flex flex-col   ">
         
            
            <h1 className="text-4xl font-bold text-black leading-tight whitespace-pre-line">
              {activeService.headline}
            </h1>
            
            <p className="text-2xl text-black leading-relaxed">
              {activeService.subtext}
            </p>
            
            
          </div>

          <div>
           
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => handleServiceClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
       <div
              onClick={HeroToLogo}
              className="hidden lg:block absolute left-1/2 bottom-24 -translate-x-1/2 cursor-pointer z-20"
              aria-label="Scroll down"
            >
              <div className="relative  w-[90px] h-[90px]">
                <img
                  src="https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/Index/Hero/scroll.png"
                  alt="Scroll down"
                  className="w-full h-full object-contain scroll-rotate"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <ArrowDown className="text-black w-5 h-5 animate-ping" />
                </div>
              </div>
            </div>
    </section>
  );
};

export default Hero;
