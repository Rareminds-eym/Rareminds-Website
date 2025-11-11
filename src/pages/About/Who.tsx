// import React from "react";
// import { MapPin, Users, Briefcase } from "lucide-react"; // ✅ React icons
// import aboutImage from "../../assets/who.png";
// import checkIcon from "../../assets/Checkmark.png";

// const AboutEcosystem = () => {
//   return (
//     <section className="w-[90%] mx-auto mt-20 md:mt-34 mb-16 lg:pt-40 xl:pt-16 lg:mb-16 flex flex-col md:flex-row items-center gap-10 md:gap-16">
//       {/* Left Side */}
//       <div className="md:w-1/2">
//         <h2 className="text-3xl md:text-4xl font-bold text-black mb-10 leading-snug">
//           Building India’s Skill Ecosystem — <br className="hidden md:block" />
//           One Mind at a Time.
//         </h2>

//         <div className="space-y-8">
//           <div className="flex items-start gap-3">
//             <img src={checkIcon} alt="check" className="w-5 h-5 mt-1" />
//             <p className="text-gray-700 text-lg leading-relaxed">
//               At Rareminds, we go beyond classrooms and certifications — we
//               create a 360° Skill Ecosystem that connects students, educators,
//               institutions, corporates, and governments into one seamless
//               journey from learning to earning.
//             </p>
//           </div>

//           <div className="flex items-start gap-3">
//             <img src={checkIcon} alt="check" className="w-5 h-5 mt-1" />
//             <p className="text-gray-700 text-lg leading-relaxed">
//               We are a nationally recognized Training Partner of TNSDC under
//               Naan Mudhalvan, and our mission is to empower the next generation
//               with skills that sustain careers and create impact.
//             </p>
//           </div>

//           <div className="flex items-start gap-3">
//             <img src={checkIcon} alt="check" className="w-5 h-5 mt-1" />
//             <p className="text-gray-700 text-lg leading-relaxed">
//               With every learner, college, and project, we’re rewriting India’s
//               employability story — powered by purpose, people, and performance.
//             </p>
//           </div>
//         </div>
//       </div>
//       {/* Right Side */}
//       <div className="md:w-1/2 relative pl-16">
//         <img
//           src={aboutImage}
//           alt="About Ecosystem"
//           className="
//             w-[600px] h-auto rounded-[24px] shadow-md
//             md:w-[560px] md:h-[420px] md:object-cover
//           "
//         />

//         {/* Overlay Cards */}
//         <div
//           className="
//             absolute bottom-5 left-24 flex flex-col sm:flex-row flex-wrap gap-3
//             max-sm:left-auto max-sm:right-3 max-sm:items-end max-sm:justify-end
//             md:gap-2 md:bottom-4 md:left-20
//           "
//         >
//           <div
//             className="
//               flex items-center justify-center gap-2 bg-white/20 text-white
//               px-3 py-2 rounded-lg backdrop-blur-sm
//               sm:px-4 sm:py-2
//               max-sm:px-2 max-sm:py-1.5
//               max-sm:w-[85%] max-sm:text-center
//               md:px-2 md:py-1.5 md:w-[200px]
//             "
//           >
//             <MapPin
//               size={16}
//               className="text-white max-sm:w-4 max-sm:h-4 md:w-4 md:h-4"
//             />
//             <span className="text-[12px] sm:text-sm md:text-[11px] font-medium">
//               Presence across 7 states
//             </span>
//           </div>

//           <div
//             className="
//               flex items-center justify-center gap-2 bg-white/20 text-white
//               px-3 py-2 rounded-lg backdrop-blur-sm
//               sm:px-4 sm:py-2
//               max-sm:px-2 max-sm:py-1.5
//               max-sm:w-[85%] max-sm:text-center
//               md:px-2 md:py-1.5 md:w-[200px]
//             "
//           >
//             <Users
//               size={16}
//               className="text-white max-sm:w-4 max-sm:h-4 md:w-4 md:h-4"
//             />
//             <span className="text-[12px] sm:text-sm md:text-[11px] font-medium">
//               1.5 lakh+ learners empowered
//             </span>
//           </div>

//           <div
//             className="
//               flex items-center justify-center gap-2 bg-white/20 text-white
//               px-3 py-2 rounded-lg backdrop-blur-sm
//               sm:px-4 sm:py-2
//               max-sm:px-2 max-sm:py-1.5
//               max-sm:w-[85%] max-sm:text-center
//               md:px-2 md:py-1.5 md:w-[200px]
//             "
//           >
//             <Briefcase
//               size={16}
//               className="text-white max-sm:w-4 max-sm:h-4 md:w-4 md:h-4"
//             />
//             <span className="text-[12px] sm:text-sm md:text-[11px] font-medium">
//               40+ skill programs across domains
//             </span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutEcosystem;

import React from "react";
import { MapPin, Users, Briefcase } from "lucide-react";
import aboutImage from "../../assets/Who We Are” part of the About page 2.png";
import checkIcon from "../../assets/Checkmark.png";

const AboutEcosystem = () => {
  return (
    <section
      className="w-[90%] mx-auto mt-20 mb-16 lg:pt-40 xl:pt-16 lg:mb-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-16"
    >
      {/* Left Side */}
      <div className="lg:w-1/2">
        <h2 className="text-3xl font-bold text-black mb-10 leading-snug lg:text-4xl">
          Building India’s Skill Ecosystem — <br className="hidden lg:block" />
          One Mind at a Time.
        </h2>

        <div className="space-y-8">
          {[
            "At Rareminds, we go beyond classrooms and certifications — we create a 360° Skill Ecosystem that connects students, educators, institutions, corporates, and governments into one seamless journey from learning to earning.",
            "We are a nationally recognized Training Partner of TNSDC under Naan Mudhalvan, and our mission is to empower the next generation with skills that sustain careers and create impact.",
            "With every learner, college, and project, we’re rewriting India’s employability story — powered by purpose, people, and performance.",
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-3">
              <img src={checkIcon} alt="check" className="w-5 h-5 mt-1" />
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side */}
      <div className="lg:w-1/2 relative pl-10 sm:pl-16">
        <img
          src={aboutImage}
          alt="About Ecosystem"
          className="w-full max-w-[600px] h-auto rounded-[24px] object-cover"
        />

        {/* Overlay Cards */}
        <div
  className="
    absolute top-8 left-24 flex flex-col sm:flex-row flex-wrap gap-3
    sm:gap-2 sm:top-4 sm:left-28
  "
>

          {[
            { icon: MapPin, text: "Presence across 7 states" },
            { icon: Users, text: "1.5 lakh+ learners empowered" },
            { icon: Briefcase, text: "40+ skill programs across domains" },
          ].map(({ icon: Icon, text }, i) => (
            <div
              key={i}
              className="
                flex items-center justify-center gap-2 bg-black/80 text-white
                px-3 py-2 rounded-lg backdrop-blur-sm
                sm:px-4 sm:py-2 w-[85%] sm:w-auto sm:text-center
              "
            >
              <Icon size={16} className="text-white" />
              <span className="text-[12px] sm:text-sm font-medium">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutEcosystem;
