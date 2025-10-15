
// import React from "react";
// import { GraduationCap, Target, Star, CheckCircle, Users } from "lucide-react";

// export default function StudentBenefits() {
//   const benefits = [
//     {
//       id: 1,
//       icon: GraduationCap,
//       title: "Personalized Digital Passport",
//       text: "Own a dynamic digital passport that grows each semester with verified skills.",
//       position: "top-left",
//     },
//     {
//       id: 2,
//       icon: Target,
//       title: "Visibility into Strengths & Gaps",
//       text: "Gain visibility into strengths, skill gaps, and personalized learning paths.",
//       position: "bottom-left",
//     },
//     {
//       id: 3,
//       icon: Star,
//       title: "Digital Proof of Skills",
//       text: "Use verified digital proof of competencies for placements and internships globally.",
//       position: "top-right",
//     },
//     {
//       id: 4,
//       icon: CheckCircle,
//       title: "AI Career Insights & Motivation",
//       text: "Get AI-powered career insights, guided recommendations, and motivation to keep learning.",
//       position: "bottom-right",
//     },
//     {
//       id: 5,
//       icon: Users,
//       title: "Continuous Learning & Global Recognition",
//       text: "Stay motivated to learn continuously and showcase your verified achievements globally.",
//       position: "bottom-center",
//     },
//   ];

//   return (
//     <section className="relative py-28 bg-gradient-to-b from-white to-[#F6F8FA] overflow-hidden">
//       <div className="max-w-6xl mx-auto px-6">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
//             Benefits for <span className="text-[#E32A18]">Students</span>
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Empower students with clear insights, verified skills, and a global-ready digital identity.
//           </p>
//         </div>

//         {/* Central Image + Benefits */}
//         <div className="relative flex justify-center items-center min-h-[620px]">
//           {/* Central Image */}
//           <div className="absolute z-10 w-64 h-64 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden hidden md:flex">
//             <img
//               src="https://clipart-library.com/img/1764426.gif"
//               alt="Student Illustration"
//               className="object-contain w-full h-full p-6"
//             />
//           </div>

//           {/* Connector Line for Bottom Center */}
//           <div className="absolute left-1/2 top-[420px] -translate-x-1/2 w-[2px] h-[120px] bg-gray-400 border-dashed border-gray-500" style={{ borderLeft: "2px dashed #9CA3AF" }}></div>

//           {/* Benefit Points (excluding 5th) */}
//           {benefits.slice(0, 4).map(({ id, icon: Icon, title, text, position }) => (
//             <div
//               key={id}
//               className={`absolute bg-white shadow-md border border-gray-200 rounded-xl p-5 w-72 flex gap-4 items-start transition-all hover:shadow-xl ${position}`}
//             >
//               <div className="flex-shrink-0">
//                 <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-red-50 text-[#E32A18]">
//                   <Icon className="h-6 w-6" />
//                 </div>
//               </div>
//               <div>
//                 <h4 className="font-semibold text-gray-900 mb-1 text-[15px]">{title}</h4>
//                 <p className="text-gray-600 text-[14px] leading-relaxed">{text}</p>
//               </div>

//               {/* Connector Lines */}
//               <span
//                 className={`absolute w-20 h-[2px] bg-gray-400 hidden md:block ${
//                   position.includes("left")
//                     ? "right-[-80px] top-1/2 -translate-y-1/2"
//                     : "left-[-80px] top-1/2 -translate-y-1/2"
//                 }`}
//               ></span>
//               <span
//                 className={`absolute w-[2px] h-10 bg-gray-400 hidden md:block ${
//                   position.includes("top")
//                     ? position.includes("left")
//                       ? "right-[-80px] top-1/2"
//                       : "left-[-80px] top-1/2"
//                     : position.includes("left")
//                     ? "right-[-80px] bottom-1/2"
//                     : "left-[-80px] bottom-1/2"
//                 }`}
//               ></span>
//             </div>
//           ))}

//           {/* 5th Point (Below Image - Centered) */}
//           <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 bg-white shadow-md border border-gray-200 rounded-xl p-5 w-80 flex gap-4 items-start transition-all hover:shadow-xl">
//             <div className="flex-shrink-0">
//               <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-red-50 text-[#E32A18]">
//                 <Users className="h-6 w-6" />
//               </div>
//             </div>
//             <div>
//               <h4 className="font-semibold text-gray-900 mb-1 text-[15px]">
//                 {benefits[4].title}
//               </h4>
//               <p className="text-gray-600 text-[14px] leading-relaxed">
//                 {benefits[4].text}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* TailwindCSS Position Helpers */}
//       <style>
//         {`
//           .top-left { top: 10%; left: 4%; }
//           .bottom-left { bottom: 12%; left: 4%; }
//           .top-right { top: 10%; right: 4%; }
//           .bottom-right { bottom: 12%; right: 4%; }
//           .bottom-center { bottom: -60px; left: 50%; transform: translateX(-50%); }

//           @media (max-width: 1024px) {
//             .top-left { top: 5%; left: 2%; }
//             .bottom-left { bottom: 8%; left: 2%; }
//             .top-right { top: 5%; right: 2%; }
//             .bottom-right { bottom: 8%; right: 2%; }
//           }

//           @media (max-width: 768px) {
//             .top-left, .bottom-left, .top-right, .bottom-right, .bottom-center {
//               position: relative !important;
//               left: 0 !important;
//               right: 0 !important;
//               top: auto !important;
//               bottom: auto !important;
//               transform: none !important;
//               margin: 16px auto;
//             }
//           }
//         `}
//       </style>
//     </section>
//   );
// }


// import React from "react";
// import { GraduationCap, Target, Star, CheckCircle, Users } from "lucide-react";

// export default function StudentBenefits() {
//   const benefits = [
//     {
//       id: 1,
//       icon: GraduationCap,
//       title: "Personalized Digital Passport",
//       text: "Own a dynamic digital passport that grows each semester with verified skills.",
//       position: "top-left",
//     },
//     {
//       id: 2,
//       icon: Target,
//       title: "Visibility into Strengths & Gaps",
//       text: "Gain visibility into strengths, skill gaps, and personalized learning paths.",
//       position: "bottom-left",
//     },
//     {
//       id: 3,
//       icon: Star,
//       title: "Digital Proof of Skills",
//       text: "Use verified digital proof of competencies for placements and internships globally.",
//       position: "top-right",
//     },
//     {
//       id: 4,
//       icon: CheckCircle,
//       title: "AI Career Insights & Motivation",
//       text: "Get AI-powered career insights, guided recommendations, and motivation to keep learning.",
//       position: "bottom-right",
//     },
//     {
//       id: 5,
//       icon: Users,
//       title: "Continuous Learning & Global Recognition",
//       text: "Stay motivated to learn continuously and showcase your verified achievements globally.",
//       position: "bottom-center",
//     },
//   ];

//   return (
//     <section className="relative py-28 bg-gradient-to-b from-white to-[#F6F8FA] overflow-hidden">
//       <div className="max-w-6xl mx-auto px-6">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
//             Benefits for <span className="text-[#E32A18]">Students</span>
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Empower students with clear insights, verified skills, and a global-ready digital identity.
//           </p>
//         </div>

//         {/* Central Image + Benefits */}
//         <div className="relative flex justify-center items-center min-h-[620px]">
//           {/* Central Image */}
//           <div className="absolute z-10 w-64 h-64 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden hidden md:flex">
//             <img
//               src="https://clipart-library.com/img/1764426.gif"
//               alt="Student Illustration"
//               className="object-contain w-full h-full p-6"
//             />
//           </div>

//           {/* Connector Line for Bottom Center */}
//           <div className="absolute left-1/2 top-[420px] -translate-x-1/2 w-[2px] h-[120px] bg-gray-400 border-dashed border-gray-500 hidden md:block" style={{ borderLeft: "2px dashed #9CA3AF" }}></div>

//           {/* Benefit Points (excluding 5th) */}
//           {benefits.slice(0, 4).map(({ id, icon: Icon, title, text, position }) => (
//             <div
//               key={id}
//               className={`absolute bg-white shadow-md border border-gray-200 rounded-xl p-5 w-72 flex gap-4 items-start transition-all hover:shadow-xl ${position}`}
//             >
//               <div className="flex-shrink-0">
//                 <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-red-50 text-[#E32A18]">
//                   <Icon className="h-6 w-6" />
//                 </div>
//               </div>
//               <div>
//                 <h4 className="font-semibold text-gray-900 mb-1 text-[15px]">{title}</h4>
//                 <p className="text-gray-600 text-[14px] leading-relaxed">{text}</p>
//               </div>

//               {/* Connector Lines */}
//               <span
//                 className={`absolute w-20 h-[2px] bg-gray-400 hidden md:block ${
//                   position.includes("left")
//                     ? "right-[-80px] top-1/2 -translate-y-1/2"
//                     : "left-[-80px] top-1/2 -translate-y-1/2"
//                 }`}
//               ></span>
//               <span
//                 className={`absolute w-[2px] h-10 bg-gray-400 hidden md:block ${
//                   position.includes("top")
//                     ? position.includes("left")
//                       ? "right-[-80px] top-1/2"
//                       : "left-[-80px] top-1/2"
//                     : position.includes("left")
//                     ? "right-[-80px] bottom-1/2"
//                     : "left-[-80px] bottom-1/2"
//                 }`}
//               ></span>
//             </div>
//           ))}

//           {/* 5th Point (Below Image - Centered) */}
//           <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 bg-white shadow-md border border-gray-200 rounded-xl p-5 w-80 flex gap-4 items-start transition-all hover:shadow-xl">
//             <div className="flex-shrink-0">
//               <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-red-50 text-[#E32A18]">
//                 <Users className="h-6 w-6" />
//               </div>
//             </div>
//             <div>
//               <h4 className="font-semibold text-gray-900 mb-1 text-[15px]">
//                 {benefits[4].title}
//               </h4>
//               <p className="text-gray-600 text-[14px] leading-relaxed">
//                 {benefits[4].text}
//               </p>
//             </div>
//             {/* Connector lines removed for the 5th card */}
//           </div>
//         </div>
//       </div>

//       {/* TailwindCSS Position Helpers */}
//       <style>
//         {`
//           .top-left { top: 10%; left: 4%; }
//           .bottom-left { bottom: 12%; left: 4%; }
//           .top-right { top: 10%; right: 4%; }
//           .bottom-right { bottom: 12%; right: 4%; }
//           .bottom-center { bottom: -60px; left: 50%; transform: translateX(-50%); }

//           @media (max-width: 1024px) {
//             .top-left { top: 5%; left: 2%; }
//             .bottom-left { bottom: 8%; left: 2%; }
//             .top-right { top: 5%; right: 2%; }
//             .bottom-right { bottom: 8%; right: 2%; }
//           }

//           @media (max-width: 768px) {
//             .top-left, .bottom-left, .top-right, .bottom-right, .bottom-center {
//               position: relative !important;
//               left: 0 !important;
//               right: 0 !important;
//               top: auto !important;
//               bottom: auto !important;
//               transform: none !important;
//               margin: 16px auto;
//             }
//           }
//         `}
//       </style>
//     </section>
//   );
// }


import React from "react";
import { GraduationCap, Target, Star, CheckCircle, Users } from "lucide-react";
import student from "../../../../../public/passport/StepProcess/Benefits-Students.webp";
export default function StudentBenefits() {
  const benefits = [
    {
      id: 1,
      icon: GraduationCap,
      title: "Personalized Digital Passport",
      text: "Own a dynamic digital passport that grows each semester with verified skills.",
      position: "top-left",
    },
    {
      id: 2,
      icon: Target,
      title: "Visibility into Strengths & Gaps",
      text: "Gain visibility into strengths, skill gaps, and personalized learning paths.",
      position: "bottom-left",
    },
    {
      id: 3,
      icon: Star,
      title: "Digital Proof of Skills",
      text: "Use verified digital proof of competencies for placements and internships globally.",
      position: "top-right",
    },
    {
      id: 4,
      icon: CheckCircle,
      title: "AI Career Insights & Motivation",
      text: "Get AI-powered career insights, guided recommendations, and motivation to keep learning.",
      position: "bottom-right",
    },
    {
      id: 5,
      icon: Users,
      title: "Continuous Learning & Global Recognition",
      text: "Stay motivated to learn continuously and showcase your verified achievements globally.",
      position: "bottom-center",
    },
  ];

  return (
    <section className="relative py-28 bg-gradient-to-b from-white to-[#F6F8FA] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Benefits for Students
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Empower students with clear insights, verified skills, and a global-ready digital identity.
          </p>
        </div>

        {/* DESKTOP VIEW (unchanged) */}
        <div className="relative justify-center items-center min-h-[620px] hidden md:flex">
          {/* Central Image */}
          <div className="absolute z-10 w-64 h-64 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden">
            <img
              src={student}
              alt="Student Illustration"
              className="object-contain w-full h-full p-6"
            />
          </div>

          {/* Connector Line for Bottom Center */}
          <div
            className="absolute left-1/2 top-[420px] -translate-x-1/2 w-[2px] h-[120px] bg-gray-400 border-dashed border-gray-500 hidden md:block"
            style={{ borderLeft: "2px dashed #9CA3AF" }}
          ></div>

          {/* Benefit Points (excluding 5th) */}
          {benefits.slice(0, 4).map(({ id, icon: Icon, title, text, position }) => (
            <div
              key={id}
              className={`absolute bg-white shadow-md border border-gray-200 rounded-xl p-5 w-72 flex gap-4 items-start transition-all hover:shadow-xl ${position}`}
            >
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-red-50 text-[#E32A18]">
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1 text-[15px]">{title}</h4>
                <p className="text-gray-600 text-[14px] leading-relaxed">{text}</p>
              </div>

              {/* Connector Lines */}
              <span
                className={`absolute w-20 h-[2px] bg-gray-400 hidden md:block ${
                  position.includes("left")
                    ? "right-[-80px] top-1/2 -translate-y-1/2"
                    : "left-[-80px] top-1/2 -translate-y-1/2"
                }`}
              ></span>
              <span
                className={`absolute w-[2px] h-10 bg-gray-400 hidden md:block ${
                  position.includes("top")
                    ? position.includes("left")
                      ? "right-[-80px] top-1/2"
                      : "left-[-80px] top-1/2"
                    : position.includes("left")
                    ? "right-[-80px] bottom-1/2"
                    : "left-[-80px] bottom-1/2"
                }`}
              ></span>
            </div>
          ))}

          {/* 5th Point (Below Image - Centered) */}
          <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 bg-white shadow-md border border-gray-200 rounded-xl p-5 w-80 flex gap-4 items-start transition-all hover:shadow-xl">
            <div className="flex-shrink-0">
              <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-red-50 text-[#E32A18]">
                <Users className="h-6 w-6" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1 text-[15px]">
                {benefits[4].title}
              </h4>
              <p className="text-gray-600 text-[14px] leading-relaxed">
                {benefits[4].text}
              </p>
            </div>
          </div>
        </div>

        {/* MOBILE VIEW — clean vertical cards */}
        <div className="flex flex-col gap-6 md:hidden mt-6">
          {benefits.map(({ id, icon: Icon, title, text }) => (
            <div
              key={id}
              className="bg-white shadow-md border border-gray-200 rounded-xl p-6 flex gap-4 items-start hover:shadow-lg transition-all"
            >
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-red-50 text-[#E32A18]">
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1 text-[16px] leading-snug">{title}</h4>
                <p className="text-gray-600 text-[14px] leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TailwindCSS Position Helpers */}
      <style>
        {`
          .top-left { top: 10%; left: 4%; }
          .bottom-left { bottom: 12%; left: 4%; }
          .top-right { top: 10%; right: 4%; }
          .bottom-right { bottom: 12%; right: 4%; }
          .bottom-center { bottom: -60px; left: 50%; transform: translateX(-50%); }

          @media (max-width: 1024px) {
            .top-left { top: 5%; left: 2%; }
            .bottom-left { bottom: 8%; left: 2%; }
            .top-right { top: 5%; right: 2%; }
            .bottom-right { bottom: 8%; right: 2%; }
          }

          /* Mobile stacked cards view */
          @media (max-width: 768px) {
            .top-left, .bottom-left, .top-right, .bottom-right, .bottom-center {
              position: relative !important;
              left: 0 !important;
              right: 0 !important;
              top: auto !important;
              bottom: auto !important;
              transform: none !important;
              margin: 0 auto !important;
            }
          }
        `}
      </style>
    </section>
  );
}
