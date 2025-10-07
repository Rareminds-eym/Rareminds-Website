import React, { useEffect, useRef, useState } from "react";
import { LineChart } from "lucide-react";

import Icon1 from "../../../../../public/passport/Group.png";
import Icon2 from "../../../../../public/passport/Group-1.png";
import Icon3 from "../../../../../public/passport/Group-2.png";
import Icon4 from "../../../../../public/passport/Group-3.png";
import Icon5 from "../../../../../public/passport/Group-4.png";
import Icon6 from "../../../../../public/passport/Group-5.png";

interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

const Counter: React.FC<CounterProps> = ({ target, suffix = "", duration = 1500 }) => {
  const [count, setCount] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    startRef.current = null;

    const step = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * target);
      setCount(value);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return (
    <span className="text-4xl md:text-5xl font-extrabold text-[#0B2A5A]">
      {count.toLocaleString()}
      <span className="text-[#FF6B6B]">{suffix}</span>
    </span>
  );
};

export default function ImpactSection() {
  const stats = [
    { number: 14000, suffix: "+", label: "Students Skilled Across India" },
    { number: 10, suffix: "+", label: "Universities Partnered" },
    { number: 25, suffix: "+", label: "Corporates Engaged" },
  ];

  const universities = [
    { logo: Icon1, name: "Chennai University" },
    { logo: Icon2, name: "IIT Madras" },
    { logo: Icon3, name: "Anna University" },
    { logo: Icon4, name: "Amrita School" },
    { logo: Icon5, name: "Bharathiar University" },
    { logo: Icon6, name: "PSG College" },
  ];

  const statsRef = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <div className="flex justify-center mb-6">
          <div className="bg-black w-12 h-12 rounded-2xl flex items-center justify-center">
            <LineChart className="w-6 h-6 text-white" />
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0B2A5A] mb-2">
          Real Impact. <span className="text-[#FF6B6B]">Real Numbers.</span>
        </h2>
        <p className="text-gray-500 text-sm md:text-base mb-16">
          Transforming employability across India and beyond.
        </p>

        {/* ✅ Stats with animation on scroll */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 mb-20"
        >
          {hasAnimated &&
            stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <Counter target={stat.number} suffix={stat.suffix} />
                <p className="mt-2 text-sm md:text-base text-gray-600">{stat.label}</p>
              </div>
            ))}
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-10">
          Trusted by Leading Institutions
        </h3>

        {/* ✅ Auto-Slider for ALL devices */}
        <div className="relative overflow-hidden py-6">
          <div className="flex gap-10 animate-marquee whitespace-nowrap">
            {[...universities, ...universities].map((uni, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center flex-shrink-0 mx-6"
              >
                <img
                  src={uni.logo}
                  alt={uni.name}
                  className="w-28 md:w-36 h-28 md:h-36 object-contain"
                />
                <p className="text-sm text-gray-700 mt-3">{uni.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
