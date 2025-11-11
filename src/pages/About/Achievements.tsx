// import React, { useState, useEffect, useRef } from 'react';
// import { PiGraduationCapFill } from 'react-icons/pi';
// import { HiAcademicCap } from 'react-icons/hi2';
// import { FaUsers, FaLaptopCode, FaChartLine } from 'react-icons/fa';

// const AchievementCard = ({ icon: Icon, value, label, suffix = '', isPercentage = false }) => {
//   const [count, setCount] = useState(0);
//   const [isVisible, setIsVisible] = useState(false);
//   const cardRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (cardRef.current) {
//       observer.observe(cardRef.current);
//     }

//     return () => {
//       if (cardRef.current) {
//         observer.unobserve(cardRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!isVisible) return;

//     const duration = 2000;
//     const steps = 60;
//     const increment = value / steps;
//     const stepDuration = duration / steps;

//     let current = 0;
//     const timer = setInterval(() => {
//       current += increment;
//       if (current >= value) {
//         setCount(value);
//         clearInterval(timer);
//       } else {
//         setCount(Math.floor(current));
//       }
//     }, stepDuration);

//     return () => clearInterval(timer);
//   }, [isVisible, value]);

//   const formatNumber = (num) => {
//     if (num >= 100000) {
//       return (num / 100000).toFixed(1) + ' Lakh';
//     }
//     return num.toString();
//   };

//   return (
//     <div
//       ref={cardRef}
//       className="flex flex-col items-center justify-center p-8 transform transition-all duration-500 hover:scale-105"
//     >
//       <Icon className="text-white text-6xl mb-6 animate-bounce" style={{ animationDuration: '2s' }} />
//       <div className="text-5xl font-bold text-white mb-3">
//         {formatNumber(count)}{suffix}
//       </div>
//       <div className="text-white text-lg text-center opacity-90 font-light">
//         {label}
//       </div>
//     </div>
//   );
// };

// export default function AchievementsSection() {
//   const achievements = [
//     {
//       icon: PiGraduationCapFill,
//       value: 150000,
//       suffix: '+',
//       label: 'Learners Trained'
//     },
//     {
//       icon: HiAcademicCap,
//       value: 500,
//       suffix: '+',
//       label: 'Colleges Engaged'
//     },
//     {
//       icon: FaUsers,
//       value: 80,
//       suffix: '+',
//       label: 'Trainers & Mentors Nationwide'
//     },
//     {
//       icon: FaLaptopCode,
//       value: 9,
//       suffix: '',
//       label: 'State-Level Hackathons'
//     },
//     {
//       icon: FaChartLine,
//       value: 50,
//       suffix: '%',
//       label: 'Increase in Student Employability Index',
//       isPercentage: true
//     }
//   ];

//   return (
//     <div className="min-h-screen flex items-center justify-center p-8">
//       <div className="w-full max-w-7xl">
//         <h1 className="text-center mb-16 text-2xl sm:text-3xl md:text-4xl font-bold text-black">
//           Our Achievements
//         </h1>
        
//         <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-2xl p-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 divide-y md:divide-y-0 md:divide-x divide-blue-400">
//             {achievements.map((achievement, index) => (
//               <AchievementCard
//                 key={index}
//                 icon={achievement.icon}
//                 value={achievement.value}
//                 suffix={achievement.suffix}
//                 label={achievement.label}
//                 isPercentage={achievement.isPercentage}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { PiGraduationCapFill } from "react-icons/pi";
import { HiAcademicCap } from "react-icons/hi2";
import { FaUsers, FaLaptopCode, FaChartLine } from "react-icons/fa";

const AchievementCard = ({ icon: Icon, value, label, suffix = "", isPercentage = false }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  const formatNumber = (num) => {
    if (num >= 100000) {
      return (num / 100000).toFixed(1) + " Lakh";
    }
    return num.toString();
  };

  return (
    <div
      ref={cardRef}
      className="flex flex-col items-center justify-center py-10 px-6 transition-all duration-300 hover:scale-105"
    >
      <Icon className="text-white text-5xl mb-4" />
      <div className="text-4xl font-bold text-white mb-2 leading-tight">
        {formatNumber(count)}
        {suffix}
      </div>
      <div className="text-white text-base text-center opacity-90 font-light leading-snug">
        {label}
      </div>
    </div>
  );
};

export default function AchievementsSection() {
  const achievements = [
    {
      icon: PiGraduationCapFill,
      value: 150000,
      suffix: "+",
      label: "Learners Trained",
    },
    {
      icon: HiAcademicCap,
      value: 500,
      suffix: "+",
      label: "Colleges Engaged",
    },
    {
      icon: FaUsers,
      value: 80,
      suffix: "+",
      label: "Trainers & Mentors Nationwide",
    },
    {
      icon: FaLaptopCode,
      value: 9,
      suffix: "",
      label: "State-Level Hackathons",
    },
    {
      icon: FaChartLine,
      value: 50,
      suffix: "%",
      label: "Increase in Student Employability Index",
      isPercentage: true,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 bg-white pb-20 md:pb-48 lg">
      <h1 className="text-center mb-14 text-3xl md:text-4xl font-bold text-black">
        Our Achievements
      </h1>

      <div className="bg-blue-500 rounded-xl shadow-xl w-full max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-blue-400">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={index}
              icon={achievement.icon}
              value={achievement.value}
              suffix={achievement.suffix}
              label={achievement.label}
              isPercentage={achievement.isPercentage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
