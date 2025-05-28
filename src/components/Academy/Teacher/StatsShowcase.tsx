import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

interface Stat {
  icon: string;
  value: string;
  label: string;
}

const statsData: Stat[] = [
  { icon: "/academy/FacultyTrained.png", value: "20000+", label: "Faculty Trained" },
  { icon: "/academy/100+ Schools Onboarded.svg", value: "100+", label: "Schools Onboarded" },
  { icon: "/academy/250+ FDPs Delivered.svg", value: "250+", label: "Pilots Deployed" },
  { icon: "/academy/rocket.png", value: "92%", label: "Faculty Satisfaction Rate" },
];

const StatsShowcase = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [counts, setCounts] = useState<number[]>(statsData.map(() => 0));
  const [visibleIcons, setVisibleIcons] = useState<boolean[]>(statsData.map(() => false));

  useEffect(() => {
    if (inView) {
      statsData.forEach((stat, index) => {
        // Animate icon one-by-one with delay
        setTimeout(() => {
          setVisibleIcons((prev) => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
          });

          // Counter animation
          const target = parseInt(stat.value.replace(/[^0-9]/g, ''));
          let current = 0;
          const step = Math.ceil(target / 50);

          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }

            setCounts((prev) => {
              const updatedCounts = [...prev];
              updatedCounts[index] = current;
              return updatedCounts;
            });
          }, 30);
        }, index * 300); // Delay for each item
      });
    }
  }, [inView]);

  return (
    <div className=" bg-white">
      <div>
       <h1 className="text-xl md:text-4xl w-full font-bold text-center p-1 leading-[50px] mb-20">
         We've Trained over 20,000 Educators across 100+ Institutions

        </h1>
        </div>
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-6xl">
       

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 md:mt-6">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center transition duration-500 ease-out"
            >
              <img
                src={stat.icon}
                alt={stat.label}
                className={`w-20 h-20 mb-4 object-contain transform transition-all duration-500 ease-out
                  ${visibleIcons[index] ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
              />
              <div className="text-lg md:text-3xl font-bold text-red-500">
                {counts[index].toLocaleString()}
                {stat.value.includes('+') ? '+' : ''}
                {stat.value.includes('%') ? '%' : ''}
              </div>
              <div className="text-sm md:text-base text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsShowcase;
