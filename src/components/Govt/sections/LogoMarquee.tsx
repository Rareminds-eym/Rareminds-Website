import React, { useEffect, useRef, useState } from "react";


const logos = [
  {
    label: "UNIVERSITY OF MADRAS",
    imgSrc: "/Govt-Images/Logos/logo1.png",
  },
  {
    label: "ALAGAPPA UNIVERSITY",
    imgSrc: "/Govt-Images/Logos/logo2.png",
  },
  {
    label: "ANNAMALAI UNIVERSITY",
    imgSrc: "/Govt-Images/Logos/logo3.png",
  },
  {
    label: "BHARATHIAR UNIVERSITY",
    imgSrc: "/Govt-Images/Logos/logo4.png",
  },
  {
    label: "BHARATHIDASAN UNIVERSITY",
    imgSrc: "/Govt-Images/Logos/logo5.png",
  }, {
    label: "UNIVERSITY OF MADRAS",
    imgSrc: "/Govt-Images/Logos/logo6.png",
  },
  {
    label: "MADURAI KAMARAJ UNIVERSITY",
    imgSrc: "/Govt-Images/Logos/logo7.png",
  },
  {
    label: "MANONMANIAM SUNDARANAR UNIVERSITY",
    imgSrc: "/Govt-Images/Logos/logo8.png",
  },
  {
    label: "MOTHER TERESA UNIVERSITY",
    imgSrc: "/Govt-Images/Logos/logo9.png",
  },
  {
    label: "PERIYAR UNIVERSITY",
    imgSrc: "/Govt-Images/Logos/logo10.png",
  },
];

const repeatedLogos = [...logos, ...logos, ...logos];

const TrustedInstitutions: React.FC<{ className?: string }> = ({ className }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationFrameIdRef = useRef<number | null>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollStep = 1.2; // pixels per tick
    const interval = 20;  // ms between frames

    const scrollWidth = scrollContainer.scrollWidth / 3; // one full loop of the logos

    function scrollLoop() {
      if (!scrollContainer || isPaused) return;

      if (scrollContainer.scrollLeft >= scrollWidth * 2) {
        // Jump to the "first" set for seamless looping
        scrollContainer.scrollLeft = scrollWidth;
      } else {
        scrollContainer.scrollLeft += scrollStep;
      }
      animationFrameIdRef.current = window.setTimeout(scrollLoop, interval);
    }

    // Only set the initial position ONCE
    if (!isInitializedRef.current) {
      scrollContainer.scrollLeft = scrollWidth;
      isInitializedRef.current = true;
    }

    // Start or continue scrolling as needed
    if (!isPaused) {
      animationFrameIdRef.current = window.setTimeout(scrollLoop, interval);
    }

    return () => {
      if (animationFrameIdRef.current !== null) {
        clearTimeout(animationFrameIdRef.current);
      }
    };
  }, [isPaused]);

  return (
    
    <section id="scrolltobottom" className={`pt-3 px-4  relative ${className || ''}`}>
      <div className="container mx-auto">
        <h2 className="text-center text-[18px] md:text-4xl font-semibold mb-10 text-gray-800">
          Trusted by Leading Institutions
        </h2>
        
        {/* Carousel wrapper */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="overflow-x-auto hide-scrollbar"
          style={{
            WebkitOverflowScrolling: "touch",
            whiteSpace: "nowrap",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          <div
            className="flex items-center gap-10 md:gap-16 md:py-6"
            style={{ minWidth: "180%" }}
          >
            {repeatedLogos.map((logo, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center flex-shrink-0 w-[100px] md:w-[160px] pr-4 md:pr-10 mx-1 md:mx-2"
              >
                <div
                  className="w-20 h-20 md:w-32 md:h-32 mb-2 md:mb-3 rounded-full bg-white/80 backdrop-blur flex items-center justify-center p-2 md:p-4 shadow-lg institution-logo hover-scale transition-transform duration-200 overflow-hidden"
                >
                  <img
                    src={logo.imgSrc}
                    alt={logo.label}
                    className="w-full h-full object-contain"
                  />
                </div>

                <span
                  className="text-center text-[10px] md:text-xs font-medium text-gray-700 select-none break-words leading-tight"
                >
                  {logo.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        /* Hide scrollbar cross-browser */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

const Logos = () => {
  return (
    <div className="bg-white">
      
      <main className="w-full ">
        <TrustedInstitutions />
      </main>
    </div>
  );
};

export default Logos;