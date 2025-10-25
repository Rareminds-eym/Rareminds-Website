
// import React from "react";
// import { Briefcase, University, GraduationCap, Settings, Box } from "lucide-react";

// const ICON_COLORS = [
//   { bg: "#00C2A8", ring: "rgba(0,194,168,0.12)" }, // teal
//   { bg: "#FF4DA6", ring: "rgba(255,77,166,0.12)" }, // pink
//   { bg: "#7C3AED", ring: "rgba(124,58,237,0.12)" }, // purple
//   { bg: "#F9C74F", ring: "rgba(249,199,79,0.12)" }, // yellow
//   { bg: "#E32A18", ring: "rgba(227,42,24,0.12)" }, // red
// ];

// const DATA = [
//   {
//     Icon: University,
//     title: "State & Private Universities",
//     desc: "Embed industry-relevant skilling across semester programs.",
//   },
//   {
//     Icon: GraduationCap,
//     title: "Arts & Science Colleges",
//     desc: "Short-term certification pathways and career-ready programs.",
//   },
//   {
//     Icon: Settings,
//     title: "Engineering Colleges",
//     desc: "Hands-on technical modules aligned with industry projects.",
//   },
//   {
//     Icon: Box,
//     title: "Polytechnic Institutes",
//     desc: "Applied training for diploma students with placement support.",
//   },
//   {
//     Icon: Briefcase,
//     title: "Skill Development Centres",
//     desc: "Bootcamps, assessments and employer pipelines for learners.",
//   },
// ];

// const CurvedCard = ({ item, idx, color }) => {
//   const Icon = item.Icon;
//   const id = `cardShape-${idx}`;

//   return (
//     <article
//       tabIndex={0}
//       role="article"
//       aria-label={item.title}
//       className="relative w-full max-w-[360px] focus:outline-none"
//     >
//       {/* SVG with consistent bottom-right curved shape */}
//       <svg
//         viewBox="0 0 360 220"
//         className="w-full h-auto block"
//         preserveAspectRatio="xMidYMid meet"
//         aria-hidden
//       >
//         <defs>
//           <filter id={`shadow-${idx}`} x="-50%" y="-50%" width="200%" height="200%">
//             <feDropShadow
//               dx="0"
//               dy="10"
//               stdDeviation="20"
//               floodColor="#0b1220"
//               floodOpacity="0.06"
//             />
//           </filter>
//         </defs>

//         <g filter={`url(#shadow-${idx})`}>
//           {/* Unified card shape with bottom-right curve */}
//           <path
//             d={`M24 20
//                 H316
//                 a20 20 0 0 1 20 20
//                 V160
//                 a60 60 0 0 1 -60 40
//                 H24
//                 a20 20 0 0 1 -20 -20
//                 V40
//                 a20 20 0 0 1 20 -20
//                 Z`}
//             fill="#ffffff"
//             stroke="rgba(10,20,30,0.06)"
//             strokeWidth="1"
//             rx="20"
//           />
//         </g>

//         {/* Decorative base line */}
//         <path
//           d="M32 180 H328"
//           stroke="rgba(0,0,0,0.04)"
//           strokeWidth="1"
//           strokeLinecap="round"
//           opacity="0.9"
//         />
//       </svg>

//       {/* Circular Icon */}
//       <div
//         className="absolute -translate-y-1/2 top-[18px] right-[22px] flex items-center justify-center w-[64px] h-[64px] rounded-full shadow-md"
//         style={{
//           background: color.bg,
//           boxShadow: "0 8px 20px rgba(2,6,23,0.08)",
//           border: `3px solid ${color.ring}`,
//         }}
//       >
//         <Icon className="w-6 h-6 text-white" />
//       </div>

//       {/* Text content */}
//       <div className="absolute inset-0 flex items-start justify-center">
//         <div className="pt-[78px] px-6 pb-6 text-center">
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
//           <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
//         </div>
//       </div>

//       {/* Focus ring */}
//       <div
//         className="absolute inset-0 rounded-[20px] focus-visible:ring-4 focus-visible:ring-[#E32A18]/14 transition"
//         style={{ outline: "none" }}
//       />
//     </article>
//   );
// };

// export default function CurvedInstitutionsSection({ items = DATA }) {
//   return (
//     <section
//       aria-labelledby="curved-institutions-heading"
//       className="py-16 md:py-24 bg-gray-50"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center justify-center bg-gray-900 rounded-2xl w-12 h-12 shadow">
//             <Briefcase className="w-6 h-6 text-white" />
//           </div>
//           <h2
//             id="curved-institutions-heading"
//             className="mt-6 text-3xl sm:text-4xl font-extrabold text-gray-900"
//           >
//             Built for Every Type of <span className="text-[#E32A18]">Institution</span>
//           </h2>
//           <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
//             Seamless integration for semester programs, short-term certifications,
//             and skilling initiatives.
//           </p>
//         </div>

//         {/* Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start justify-items-center">
//           {items.map((it, i) => (
//             <div
//               key={i}
//               className="w-full flex justify-center transform transition hover:-translate-y-2 focus-within:-translate-y-2"
//             >
//               <CurvedCard item={it} idx={i} color={ICON_COLORS[i % ICON_COLORS.length]} />
//             </div>
//           ))}
//         </div>

//         {/* Footer */}
//         <div className="mt-12 text-center max-w-3xl mx-auto">
//           <p className="text-gray-700 text-base md:text-lg">
//             The Rareminds Skill Passport integrates with semester-based courses and
//             certifications such as{" "}
//             <span className="font-semibold text-[#E32A18]">Naan Mudhalvan</span> and{" "}
//             <span className="font-semibold text-[#E32A18]">TNSDC</span>.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }


// import React from "react";
// import { Briefcase, University, GraduationCap, Settings, Box } from "lucide-react";

// const ICON_COLORS = [
//   { bg: "#E32A18-50", ring: "rgba(0,194,168,0.12)" }, // teal
//   { bg: "#E32A18-50", ring: "rgba(255,77,166,0.12)" }, // pink
//   { bg: "#E32A18-50", ring: "rgba(124,58,237,0.12)" }, // purple
//   { bg: "#E32A18-50", ring: "rgba(249,199,79,0.12)" }, // yellow
//   { bg: "#E32A18-50", ring: "rgba(227,42,24,0.12)" }, // red
// ];

// const DATA = [
//   {
//     Icon: University,
//     title: "State & Private Universities",
//     desc: "Embed industry-relevant skilling across semester programs.",
//   },
//   {
//     Icon: GraduationCap,
//     title: "Arts & Science Colleges",
//     desc: "Short-term certification pathways and career-ready programs.",
//   },
//   {
//     Icon: Settings,
//     title: "Engineering Colleges",
//     desc: "Hands-on technical modules aligned with industry projects.",
//   },
//   {
//     Icon: Box,
//     title: "Polytechnic Institutes",
//     desc: "Applied training for diploma students with placement support.",
//   },
//   {
//     Icon: Briefcase,
//     title: "Skill Development Centres",
//     desc: "Bootcamps, assessments and employer pipelines for learners.",
//   },
// ];

// const CurvedCard = ({ item, idx, color }) => {
//   const Icon = item.Icon;
//   const id = `cardShape-${idx}`;

//   return (
//     <article
//       tabIndex={0}
//       role="article"
//       aria-label={item.title}
//       className="relative w-full max-w-[360px] focus:outline-none"
//     >
//       {/* SVG: identical curved shape for all cards */}
//       <svg
//         viewBox="0 0 360 220"
//         className="w-full h-auto block"
//         preserveAspectRatio="xMidYMid meet"
//         aria-hidden
//       >
//         <defs>
//           <filter id={`shadow-${idx}`} x="-50%" y="-50%" width="200%" height="200%">
//             <feDropShadow
//               dx="0"
//               dy="10"
//               stdDeviation="20"
//               floodColor="#0b1220"
//               floodOpacity="0.06"
//             />
//           </filter>
//         </defs>

//         <g filter={`url(#shadow-${idx})`}>
//           {/* Consistent curved shape (matches the “Arts & Science Colleges” card) */}
//           <path
//             d={`M24 20
//                 H300
//                 a20 20 0 0 1 20 20
//                 V80
//                 a40 40 0 0 1 40 40
//                 V176
//                 a20 20 0 0 1 -20 20
//                 H24
//                 a20 20 0 0 1 -20 -20
//                 V40
//                 a20 20 0 0 1 20 -20
//                 Z`}
//             fill="#ffffff"
//             stroke="rgba(10,20,30,0.06)"
//             strokeWidth="1"
//             rx="20"
//           />
//         </g>

//         {/* Subtle decorative base line */}
//         <path
//           d="M32 180 H328"
//           stroke="rgba(0,0,0,0.04)"
//           strokeWidth="1"
//           strokeLinecap="round"
//           opacity="0.9"
//         />
//       </svg>

//       {/* Floating icon positioned in the same top-right curve area */}
//       <div
//         className="absolute -translate-y-1/2 top-[18px] right-[22px] flex items-center justify-center w-[64px] h-[64px] rounded-full shadow-md"
//         style={{
//           background: color.bg,
//           boxShadow: "0 8px 20px rgba(2,6,23,0.08)",
//           border: `3px solid ${color.ring}`,
//         }}
//       >
//         <Icon className="w-6 h-6 text-white" />
//       </div>

//       {/* Text content inside card */}
//       <div className="absolute inset-0 flex items-start justify-center">
//         <div className="pt-[78px] px-6 pb-6 text-center">
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
//           <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
//         </div>
//       </div>

//       {/* Focus ring for accessibility */}
//       <div
//         className="absolute inset-0 rounded-[20px] focus-visible:ring-4 focus-visible:ring-[#E32A18]/14 transition"
//         style={{ outline: "none" }}
//       />
//     </article>
//   );
// };

// export default function CurvedInstitutionsSection({ items = DATA }) {
//   return (
//     <section
//       aria-labelledby="curved-institutions-heading"
//       className="py-16 md:py-24 bg-gray-50"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center justify-center bg-gray-900 rounded-2xl w-12 h-12 shadow">
//             <Briefcase className="w-6 h-6 text-white" />
//           </div>
//           <h2
//             id="curved-institutions-heading"
//             className="mt-6 text-3xl sm:text-4xl font-extrabold text-gray-900"
//           >
//             Built for Every Type of <span className="text-[#E32A18]">Institution</span>
//           </h2>
//           <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
//             Seamless integration for semester programs, short-term certifications,
//             and skilling initiatives.
//           </p>
//         </div>

//         {/* Cards grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start justify-items-center">
//           {items.map((it, i) => (
//             <div
//               key={i}
//               className="w-full flex justify-center transform transition hover:-translate-y-2 focus-within:-translate-y-2"
//             >
//               <CurvedCard item={it} idx={i} color={ICON_COLORS[i % ICON_COLORS.length]} />
//             </div>
//           ))}
//         </div>

//         {/* Footer */}
//         <div className="mt-12 text-center max-w-3xl mx-auto">
//           <p className="text-gray-700 text-base md:text-lg">
//             The Rareminds Skill Passport integrates with semester-based courses and
//             certifications such as{" "}
//             <span className="font-semibold text-[#E32A18]">Naan Mudhalvan</span> and{" "}
//             <span className="font-semibold text-[#E32A18]">TNSDC</span>.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }


import React from "react";
import { Briefcase, University, GraduationCap, Settings, Box } from "lucide-react";

const ICON_COLORS = [
  { bg: "#E32A18", ring: "rgba(0,194,168,0.06)" },
  { bg: "#E32A18", ring: "rgba(255,77,166,0.06)" },
  { bg: "#E32A18", ring: "rgba(124,58,237,0.06)" },
  { bg: "#E32A18", ring: "rgba(249,199,79,0.06)" },
  { bg: "#E32A18", ring: "rgba(227,42,24,0.06)" },
];

const DATA = [
  {
    Icon: University,
    title: "State & Private Universities",
    desc: "Embed industry-relevant skilling across semester programs.",
  },
  {
    Icon: GraduationCap,
    title: "Arts & Science Colleges",
    desc: "Short-term certification pathways and career-ready programs.",
  },
  {
    Icon: Settings,
    title: "Engineering Colleges",
    desc: "Hands-on technical modules aligned with industry projects.",
  },
  {
    Icon: Box,
    title: "Polytechnic Institutes",
    desc: "Applied training for diploma students with placement support.",
  },
  {
    Icon: Briefcase,
    title: "Skill Development Centres",
    desc: "Bootcamps, assessments and employer pipelines for learners.",
  },
];

const CurvedCard = ({ item, idx, color }) => {
  const Icon = item.Icon;

  return (
    <article
      tabIndex={0}
      role="article"
      aria-label={item.title}
      className="relative w-full max-w-[360px] focus:outline-none"
    >
      {/* Curved SVG shape */}
      <svg
        viewBox="0 0 360 220"
        className="w-full h-auto block"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <filter id={`shadow-${idx}`} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="10"
              stdDeviation="20"
              floodColor="#0b1220"
              floodOpacity="0.06"
            />
          </filter>
        </defs>

        <g filter={`url(#shadow-${idx})`}>
          <path
            d={`M24 20
                H300
                a20 20 0 0 1 20 20
                V80
                a40 40 0 0 1 40 40
                V176
                a20 20 0 0 1 -20 20
                H24
                a20 20 0 0 1 -20 -20
                V40
                a20 20 0 0 1 20 -20
                Z`}
            fill="#ffffff"
            stroke="rgba(10,20,30,0.06)"
            strokeWidth="1"
            rx="20"
          />
        </g>

        <path
          d="M32 180 H328"
          stroke="rgba(0,0,0,0.04)"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>

      {/* Floating icon */}
      <div
        className="absolute -translate-y-1/2 top-[18px] right-[22px] flex items-center justify-center w-[54px] h-[54px] rounded-full"
        style={{
          background: "linear-gradient(180deg, #fff5f5 0%, #ffecec 100%)",
          border: "0px solid #fcd6d6",
        }}
      >
        <Icon className="w-6 h-6 text-[#E32A18]"  />
      </div>

      {/* Text content */}
      <div className="absolute inset-0 flex items-start justify-center">
        <div className="pt-[78px] px-6 pb-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
        </div>
      </div>
    </article>
  );
};

export default function CurvedInstitutionsSection({ items = DATA }) {
  return (
    <section
      aria-labelledby="curved-institutions-heading"
      className="py-16 md:py-24 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-gray-900 rounded-2xl w-12 h-12 shadow">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <h2
            id="curved-institutions-heading"
            className="mt-6 text-3xl sm:text-4xl font-extrabold text-gray-900"
          >
            Built for Every Type of <span className="text-[#E32A18]">Institution</span>
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Seamless integration for semester programs, short-term certifications,
            and skilling initiatives.
          </p>
        </div>

        {/* Cards grid - first row 3, second row centered 2 */}
        <div className="flex flex-col items-center gap-10">
          {/* First row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {items.slice(0, 3).map((it, i) => (
              <CurvedCard
                key={i}
                item={it}
                idx={i}
                color={ICON_COLORS[i % ICON_COLORS.length]}
              />
            ))}
          </div>

          {/* Second row - centered two cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center">
            {items.slice(3).map((it, i) => (
              <CurvedCard
                key={i + 3}
                item={it}
                idx={i + 3}
                color={ICON_COLORS[(i + 3) % ICON_COLORS.length]}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center max-w-3xl mx-auto">
          <p className="text-gray-700 text-base md:text-lg">
            The Rareminds Skill Passport integrates with semester-based courses and
            certifications such as{" "}
            <span className="font-semibold text-[#E32A18]">Naan Mudhalvan</span> and{" "}
            <span className="font-semibold text-[#E32A18]">TNSDC</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
