import React, { useEffect, useRef, useState } from "react";
import { LineChart } from "lucide-react";

interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

const Counter: React.FC<CounterProps> = ({
  target,
  suffix = "",
  duration = 1500,
}) => {
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
    <span className="text-4xl md:text-5xl font-extrabold text-[#000000]">
      {count.toLocaleString()}
      <span className="text-[#000000]">{suffix}</span>
    </span>
  );
};

export default function ImpactSection() {
  const stats = [
    { number: 145000, suffix: "+", label: "Students Skilled Across India" },
    { number: 10, suffix: "+", label: "Universities Partnered" },
    { number: 52, suffix: "+", label: "Corporates Engaged" },
  ];

  const universities = [
    {
      name: "UNIVERSITY OF MADRAS",
      logo: "https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Government/Home/Logos/logo2.webp",
    },
    {
      name: "ALAGAPPA UNIVERSITY",
      logo: "https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Government/Home/Logos/logo1.webp",
    },
    {
      name: "ANNAMALAI UNIVERSITY",
      logo: "https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Government/Home/Logos/logo2.webp",
    },
    {
      name: "THIRUVALLUR UNIVERSITY",
      logo: "https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Government/Home/Logos/logo9.webp",
    },
    {
      name: "BHARATHIAR UNIVERSITY",
      logo: "https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Government/Home/Logos/logo3.webp",
    },
    {
      name: "BHARATHIDASAN UNIVERSITY",
      logo: "https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Government/Home/Logos/logo4.webp",
    }, {
      name: "UNIVERSITY OF MADRAS",
      logo: "https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Government/Home/Logos/logo10.webp",
    },
    {
      name: "MADURAI KAMARAJ UNIVERSITY",
      logo: "https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Government/Home/Logos/logo5.webp",
    },
    {
      name: "MANONMANIAM SUNDARANAR UNIVERSITY",
      logo: "https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Government/Home/Logos/logo10.webp",
    },
    {
      name: "MOTHER TERESA UNIVERSITY",
      logo: "https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Government/Home/Logos/logo7.webp",
    },
    {
      name: "PERIYAR UNIVERSITY",
      logo: "https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Government/Home/Logos/logo8.webp",
    },
  ];

  const statsRef = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const marqueeContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const content = marqueeContentRef.current;
    if (!marquee || !content) return;

    let rafId = 0;
    let last = performance.now();
    let pos = 0;
    let paused = false;
    const speed = 60;

    const getHalfWidth = () => {
      return content.scrollWidth / 2;
    };

    let halfWidth = getHalfWidth();

    const onResize = () => {
      const prevHalf = halfWidth;
      halfWidth = getHalfWidth();
      if (prevHalf > 0 && halfWidth > 0) {
        pos = (pos / prevHalf) * halfWidth;
      }
    };

    const step = (now: number) => {
      if (!content) return;
      const dt = now - last;
      last = now;

      if (!paused) {
        pos -= (speed * dt) / 1000;
        if (pos <= -halfWidth) {
          pos += halfWidth;
        }
        content.style.transform = `translateX(${pos}px)`;
      }
      rafId = requestAnimationFrame(step);
    };

    const onMouseEnter = () => {
      paused = true;
    };
    const onMouseLeave = () => {
      paused = false;
    };

    window.addEventListener("resize", onResize);
    marquee.addEventListener("mouseenter", onMouseEnter);
    marquee.addEventListener("mouseleave", onMouseLeave);

    // ensure initial transform is set
    content.style.willChange = "transform";
    content.style.transform = `translateX(0px)`;
    last = performance.now();
    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      marquee.removeEventListener("mouseenter", onMouseEnter);
      marquee.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [universities]);

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
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Top Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#000000] w-12 h-12 rounded-2xl flex items-center justify-center">
            <LineChart className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#000000] mb-2">
          Real Impact. <span className="text-[#000000]">Real Numbers.</span>
        </h2>
        <p className="text-gray-500 text-sm md:text-base mb-16">
          Transforming employability across India and beyond.
        </p>

        {/* Stats with animation on scroll */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 mb-20"
        >
          {hasAnimated &&
            stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <Counter target={stat.number} suffix={stat.suffix} />
                <p className="mt-2 text-sm md:text-base text-gray-600">
                  {stat.label}
                </p>
              </div>
            ))}
        </div>

        {/* Universities */}
        <h3 className="text-2xl font-bold text-[#000000] mb-10">
          Trusted by Leading Institutions
        </h3>

        <div className="relative overflow-hidden py-6" ref={marqueeRef}>
          {/* content duplicated in render so that width = 2 * single set width */}
          <div
            ref={marqueeContentRef}
            className="flex gap-10 whitespace-nowrap"
            aria-hidden={false}
          >
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
