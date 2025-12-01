

// import React from "react";
// import { MapPin, Users, Briefcase } from "lucide-react";
// import aboutImage from "../../assets/Who We Are” part of the About page 2 copy.jpg";
// import checkIcon from "../../assets/Checkmark.png";

// const AboutEcosystem = () => {
//   return (
//     <section
//       className="w-[90%] mx-auto mt-20 mb-12 lg:pt-40 xl:pt-16 lg:mb-20 flex flex-col lg:flex-row items-center gap-10 lg:gap-16"
//     >
//       {/* Left Side */}
//       <div className="lg:w-1/2">
//         <h2 className="text-3xl font-bold text-black mb-10 leading-snug lg:text-4xl text-center lg:text-left">
//           Building India’s Skill Ecosystem
//         </h2>

//         <div className="space-y-8">
//           {[
//             "At Rareminds, we go beyond classrooms and certifications — we create a 360° Skill Ecosystem that connects students, educators, institutions, corporates, and governments into one seamless journey from learning to earning.",
//             "We are a nationally recognized Training Partner of TNSDC under Naan Mudhalvan, and our mission is to empower the next generation with skills that sustain careers and create impact.",
//             "With every learner, college, and project, we’re rewriting India’s employability story — powered by purpose, people, and performance.",
//           ].map((text, i) => (
//             <div key={i} className="flex items-start gap-3">
//               <img src={checkIcon} alt="check" className="w-5 h-5 mt-1" />
//               <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
//                 {text}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Right Side */}
//       <div className="lg:w-1/2 relative pl-10 sm:pl-16">
//         <img
//           src={aboutImage}
//           alt="About Ecosystem"
//           className="w-full max-w-[680px] h-auto rounded-[24px] object-cover"
//         />
// <div
//   className="
//     mt-6 flex flex-col sm:flex-row flex-wrap gap-3
//   "
// >


//           {[
//             { icon: MapPin, text: "Presence across 7 states" },
//             { icon: Users, text: "1.5 lakh+ learners empowered" },
//             { icon: Briefcase, text: "40+ skill programs across domains" },
//           ].map(({ icon: Icon, text }, i) => (
//             <div
//               key={i}
//               className="
//                 flex items-center justify-center gap-2 bg-black/80 text-white
//                 px-3 py-2 rounded-lg backdrop-blur-sm
//                 sm:px-4 sm:py-2 w-[85%] sm:w-auto sm:text-center
//               "
//             >
//               <Icon size={16} className="text-white" />
//               <span className="text-[12px] sm:text-sm font-medium">
//                 {text}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutEcosystem;

import React from "react";
import { MapPin, Users, Briefcase } from "lucide-react";
import aboutImage from "../../assets/Who We Are” part of the About page 2 copy.jpg";
import checkIcon from "../../assets/Checkmark.png";

const AboutEcosystem = () => {
  return (
    <section className="w-[90%] mx-auto mt-20 mb-12 lg:pt-40 xl:pt-16 lg:mb-20 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

      {/* Left Side */}
      <div className="lg:w-1/2">
        <h2 className="text-3xl font-bold text-black mb-10 leading-snug lg:text-4xl text-center lg:text-left">
          Building India’s Skill Ecosystem
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

        {/* ⭐ CARDS MOVED HERE — EXACT SAME STYLE ⭐ */}
        {/* <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
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
        </div> */}
{/* ⭐ PERFECT TRIANGLE WITH REDUCED SIDE GAP ⭐ */}
<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-0 place-items-center w-full">

  {/* Card 1 */}
  <div className="flex items-center justify-center gap-2 bg-black/80 text-white px-4 py-2 rounded-lg backdrop-blur-sm w-full sm:w-auto">
    <MapPin size={16} />
    <span className="text-sm font-medium">Presence across 7 states</span>
  </div>

  {/* Card 2 */}
  <div className="flex items-center justify-center gap-2 bg-black/80 text-white px-4 py-2 rounded-lg backdrop-blur-sm w-full sm:w-auto">
    <Users size={16} />
    <span className="text-sm font-medium">1.5 lakh+ learners empowered</span>
  </div>

  {/* Card 3 — centered below */}
  <div className="flex items-center justify-center gap-2 bg-black/80 text-white px-4 py-2 rounded-lg backdrop-blur-sm w-full sm:w-auto sm:col-span-2">
    <Briefcase size={16} />
    <span className="text-sm font-medium">40+ skill programs across domains</span>
  </div>

</div>

      </div>

      {/* Right Side Image */}
      <div className="lg:w-[60%] relative pl-10 sm:pl-16 mb-6">
        <img
          src={aboutImage}
          alt="About Ecosystem"
          className="w-full max-w-none h-auto rounded-[24px] object-cover"
        />
      </div>

    </section>
  );
};

export default AboutEcosystem;
