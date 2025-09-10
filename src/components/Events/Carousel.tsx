import React, { useEffect, useRef, useState } from "react";
import './gallery.css';

interface CarouselProps {
  images: string[];
  onImageClick: (img: string) => void;
}

const Carousel: React.FC<CarouselProps> = ({ images, onImageClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // If you want to keep auto-scroll, you can use the original images array
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || images.length === 0) return;

    let scrollAmount = 0;
    const scrollStep = 0.5;
    const singleSetWidth = (images.length * 144);

    const interval = setInterval(() => {
      if (isPaused) return;
      scrollAmount += scrollStep;
      if (scrollAmount >= singleSetWidth) {
        scrollAmount = 0;
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft = scrollAmount;
      }
    }, 16);

    return () => clearInterval(interval);
  }, [images.length, isPaused, images]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div className="w-full py-8 relative">
      {/* Gradient fade overlays */}
      <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-hidden px-8 gallery-scroll"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          scrollBehavior: 'auto',
          maskImage: 'linear-gradient(to right, transparent, black 32px, black calc(100% - 32px), transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 32px, black calc(100% - 32px), transparent)'
        }}
      >
        {images.map((img, idx) => (
          <div
            key={`${idx}-${img}`}
            className="group relative flex-shrink-0 w-32 h-24 rounded-xl overflow-hidden bg-white shadow-lg cursor-pointer transform transition-all duration-500 ease-out hover:scale-125 hover:rotate-2 hover:shadow-2xl hover:z-20 gallery-item"
            onClick={() => onImageClick(img)}
          >
            <img
              src={img}
              alt={`Gallery ${idx}`}
              className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110 group-hover:contrast-110"
              loading="lazy"
            />
            {/* Hover overlay with glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {/* Shine effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
