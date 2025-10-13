import React from "react";
import { Users, Calendar } from "lucide-react";

const GradientBars = () => {
  const numBars = 15;

  const calculateHeight = (index: number, total: number) => {
    const position = index / (total - 1);
    const maxHeight = 100;
    const minHeight = 30;

    const center = 0.5;
    const distanceFromCenter = Math.abs(position - center);
    const heightPercentage = Math.pow(distanceFromCenter * 2, 1.2);

    return minHeight + (maxHeight - minHeight) * heightPercentage;
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <style>{`
        @keyframes pulseBar {
          0%, 100% { transform: scaleY(var(--scale)) translateZ(0); }
          50% { transform: scaleY(calc(var(--scale) * 1.1)) translateZ(0); }
        }
      `}</style>
      <div
        className="flex h-full"
        style={{
          width: "100%",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        {Array.from({ length: numBars }).map((_, index) => {
          const height = calculateHeight(index, numBars);
          return (
            <div
              key={index}
              style={{
                flex: "1 0 calc(100% / 15)",
                maxWidth: "calc(100% / 15)",
                height: "100%",
                background: "linear-gradient(to top, #E32A18, transparent)",
                "--scale": height / 100,
                transformOrigin: "bottom",
                animation: "pulseBar 2s ease-in-out infinite alternate",
                animationDelay: `${index * 0.1}s`,
                outline: "1px solid rgba(0, 0, 0, 0)",
                boxSizing: "border-box",
              } as React.CSSProperties}
            />
          );
        })}
      </div>
    </div>
  );
};

export const CTASection = ({
  onDemoClick,
  onWaitlistClick,
}: {
  onDemoClick: () => void;
  onWaitlistClick: () => void;
}) => {
  return (
    <section
      className="relative grid place-content-center overflow-hidden px-6 py-20"
      style={{
        background: "rgb(17, 24, 39)", // same dark background
      }}
    >
      {/* Background Bars */}
      <GradientBars />

      <div className="relative z-10 flex flex-col items-center">
        {/* Heading */}
        <h2 className="max-w-7xl text-center text-2xl font-bold leading-snug text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight lg:leading-tight">
          Talent isn't missing — it's just not mapped. The Rareminds Skill Passport changes that.
        </h2>

        {/* Subheading */}
        <p className="my-6 max-w-3xl text-center text-base leading-relaxed text-gray-200 sm:text-lg md:text-xl">
          Launching @ GITEX on 13 Oct
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onWaitlistClick}
            className="bg-white border-2 border-[#000000] text-[#000000] hover:bg-gray-100 px-6 py-3 rounded-full font-semibold flex items-center justify-center transition-all sm:px-8 sm:py-4 sm:text-lg"
          >
            <Users className="mr-2 h-5 w-5" />
            Join the Waitlist
          </button>

          <button
            onClick={onDemoClick}
            className="bg-[#E32A18] hover:bg-[#C41F0D] text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center transition-all sm:px-8 sm:py-4 sm:text-lg"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Book a Demo
          </button>
        </div>
      </div>
    </section>
  );
};
