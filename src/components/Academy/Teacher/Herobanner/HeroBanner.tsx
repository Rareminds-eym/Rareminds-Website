

import React, { useState, useEffect, useCallback } from 'react';
import { services } from '../../UI/services'; // Adjust this import path as needed
import { ArrowDown } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface HeroCarouselProps {
  HeroToContact: () => void;
  HeroToLogo: () => void;
  transitionDuration?: number;
  rotationInterval?: number;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({
  HeroToContact,
  HeroToLogo,
  transitionDuration = 500,
  rotationInterval = 5000,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  // Autoplay rotate through services
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [rotationInterval]);

  const isSchoolPage = location.pathname === '/school/teacher';

  // Scroll to contact section or navigate accordingly
  const handleClick = useCallback(() => {
    if (isSchoolPage) {
      const section = document.getElementById('contact-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/school/teacher#contact-section');
    }
  }, [isSchoolPage, navigate]);

  // User manual select service
  const handleServiceClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="w-full h-screen relative overflow-hidden bg-white">
      {/* Slides container */}
      <div
        className="flex h-full transition-transform ease-in-out"
        style={{
          width: `${services.length * 100}%`,
          transform: `translateX(-${(100 / services.length) * activeIndex}%)`,
          transitionDuration: `${transitionDuration}ms`,
        }}
      >
        {services.map((service) => (
          <div
            key={service.id}
            className="relative flex-shrink-0 w-full h-full"
          >
            {/* Background image */}
            <img
              src={service.illustration}
              alt={service.name}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30" />

            {/* Text content */}
            <div className="relative z-10 flex flex-col justify-center h-full max-w-3xl px-6 md:px-12 text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 whitespace-pre-line drop-shadow-lg">
                {service.headline}
              </h1>
              <p className="text-lg md:text-xl mb-8 drop-shadow-md max-w-xl">
                {service.subtext}
              </p>
              <button
                onClick={handleClick}
                className="w-max px-6 py-3 bg-white/90 text-black font-semibold rounded-md hover:bg-white transition"
              >
                Contact Us
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Service Navigation */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-6 bg-white/90 rounded-full px-6 py-2 shadow-lg z-20">
        {services.map((service, idx) => (
          <button
            key={service.id}
            onClick={() => handleServiceClick(idx)}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              idx === activeIndex
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            {service.name}
          </button>
        ))}
      </div>

      {/* Scroll down indicator */}
      <div
        onClick={HeroToLogo}
        className="hidden lg:block absolute left-1/2 bottom-24 -translate-x-1/2 cursor-pointer z-20"
        aria-label="Scroll down"
      >
        <div className="relative animate-bounce w-[90px] h-[90px]">
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
    </div>
  );
};

export default HeroCarousel;
