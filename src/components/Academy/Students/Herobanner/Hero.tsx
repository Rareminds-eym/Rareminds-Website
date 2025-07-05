import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { servicesStudent, type ServiceData } from '../../UI/servicesStudent';

interface HeroCarouselProps {
  HeroToContact: () => void;
  HeroToLogo: () => void;
  transitionDuration?: number;
  rotationInterval?: number;
  blurAmount?: number;
}

export { servicesStudent, type ServiceData };

const Hero = ({ HeroToLogo, HeroToContact, blurAmount = 0 }: HeroCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % servicesStudent.length);
        setIsTransitioning(false);
      }, 300);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const activeService = servicesStudent[activeIndex];
  const location = useLocation();
  const navigate = useNavigate();
  const isSchoolPage = location.pathname === '/school/student';
  const handleClick = useCallback(() => {
    if (isSchoolPage) {
      const section = document.getElementById('contact-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/school/student#contact-section');
    }
  }, [isSchoolPage, navigate]);
  const handleServiceClick = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsTransitioning(false);
    }, 150);
  };
  return (
    <section
      className={`w-full h-screen fixed top-0 left-0  overflow-hidden mt-10 md:mt-[80px] `}
      style={{ filter: blurAmount ? `blur(${blurAmount}px)` : undefined }}
    >
      <div className="flex flex-col justify-center md:justify-normal md:flex-row w-full h-full">
        {/* Left: Image/Illustration (2/5) */}
        <div className="w-full md:w-2/5 h-[400px] md:h-full flex items-center justify-center bg-gray-100">
          <div className={`w-full h-full transition-all duration-700 ease-in-out ${isTransitioning ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}> 
            <img
              src={activeService.illustration}
              alt={activeService.alt || activeService.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
        {/* Right: Text (3/5) */}
        <div className="w-full md:w-3/5 flex flex-col justify-center h-[220px] md:h-full px-6 md:px-16">
          <div className={`space-y-8 transition-all duration-700 ease-in-out ${isTransitioning ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'}`}>
            <div className="space-y-6 flex flex-col">
              <h1 className="text-xl md:text-4xl font-bold md:text-left text-black leading-tight whitespace-pre-line">
                {activeService.headline}
              </h1>
              <p className="text-[14px] md:text-2xl md:text-left text-black leading-relaxed">
                {activeService.subtext}
              </p>
            </div>
            {/* <div className="flex gap-4">
              <Button 
                onClick={handleClick}
                className="px-6 py-3 text-lg rounded-xl shadow-md bg-gradient-to-r from-red-400 to-red-500 hover:from-red-600 text-white"
              >
                {activeService.name} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div> */}
          </div>
        </div>
      </div>
      {/* Dots for navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {servicesStudent.map((_, index) => (
          <button
            key={index}
            onClick={() => handleServiceClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-white' : 'bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>
      {/* Scroll down indicator */}
      <div
        onClick={HeroToLogo}
        className="hidden lg:block absolute left-1/2 bottom-24 -translate-x-1/2 cursor-pointer z-20"
        aria-label="Scroll down"
      >
        <div className="relative w-[90px] h-[90px]">
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
