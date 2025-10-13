// import { Eye, BadgeCheck, LineChart, Route, Layers, FileCheck2, Briefcase } from "lucide-react";
// import { motion } from "framer-motion";

// const benefits = [
//   {
//     Icon: Eye,
//     title: "Student Skill Profiles",
//     subtitle: "Personalized, shareable skill passports",
//     description:
//       "Each student receives a personalized, shareable digital passport of verified skills.",
//   },
//   {
//     Icon: BadgeCheck,
//     title: "Outcome Mapping",
//     subtitle: "Align courses with competency frameworks",
//     description:
//       "Aligns every course and program to specific skill and competency frameworks.",
//   },
//   {
//     Icon: LineChart,
//     title: "Institution Dashboard",
//     subtitle: "Visualize progress in real time",
//     description:
//       "Visualize progress across departments, batches, and programs in real time.",
//   },
//   {
//     Icon: Route,
//     title: "Placement Readiness Score",
//     subtitle: "AI-driven employability evaluation",
//     description:
//       "AI-driven evaluation of employability readiness for every student",
//   },
//   {
//     Icon: Layers,
//     title: "Certificate Integration",
//     subtitle: "Auto-sync with certifications",
//     description:
//       "Auto-sync with Rareminds, Naan Mudhalvan, or any LMS-based certification programs.",
//   },
//   {
//     Icon: FileCheck2,
//     title: "Reporting Tools",
//     subtitle: "Export analytics for compliance",
//     description:
//       "Export analytics for NAAC, NIRF, AICTE, and TNSDC reports.",
//   },
// ];

// type CardProps = {
//   Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
//   title: string;
//   subtitle: string;
//   description: string;
// };

// const Card = ({ Icon, title, subtitle, description }: CardProps) => (
//   <motion.div
//     whileHover={{ y: -6 }}
//     transition={{ type: "spring", stiffness: 300, damping: 20 }}
//     className="group h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg"
//     role="article"
//     aria-labelledby={`benefit-${title}`}
//   >
//     <div className="flex items-start gap-4">
//       <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFECEC]">
//         <Icon className="h-6 w-6 text-[#E32A18]" strokeWidth={2} aria-hidden />
//       </div>
//       <div className="flex-1">
//         <h3
//           id={`benefit-${title}`}
//           className="text-lg md:text-xl font-semibold text-[#000000]"
//         >
//           {title}
//         </h3>
//         <p className="mt-1 text-sm text-[#E32A18] font-medium">{subtitle}</p>
//         <p className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed">
//           {description}
//         </p>
//       </div>
//     </div>
//   </motion.div>
// );

// const KeyFeaturesSection = () => {
//   return (
//     <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
//       <div className="max-w-7xl mx-auto text-center">
//         {/* Top Icon */}
//         <div className="flex items-center justify-center mb-4">
//           <div className="bg-[#000000] rounded-2xl w-12 h-12 flex items-center justify-center shadow-md">
//             <Briefcase className="text-white w-5 h-5" aria-hidden />
//           </div>
//         </div>

//         {/* Title */}
//         <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#000000] leading-tight mb-4">
//           Key<span className="text-[#E32A18]">Key Features</span>
//         </h2>

//         <p className="text-gray-500 text-sm md:text-base max-w-3xl mx-auto">
//           Explore the essential capabilities of the Skill Passport platform that empower institutions and students alike.
// </p>
//         {/* Benefits Grid */}
//         <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {benefits.map((item, idx) => (
//             <Card key={item.title ?? idx} {...item} />
//           ))}
//         </div>

//         {/* Result Note */}
//         <p className="mt-8 text-center text-[#000000] text-sm md:text-base italic font-medium max-w-6xl mx-auto">
//           <span className="text-[#E32A18]">Result:</span> Institutions gain data-backed insights, enhance accreditation outcomes, and strengthen student placement success.
//         </p>
//       </div>
//     </section>
//   );
// };

// export default KeyFeaturesSection;



// import {
//   Lock,
//   FileCheck,
//   ShieldCheck,
//   Cloud,
//   BarChart3,
//   Plug,
//   LucideIcon,
//   ShieldAlert,
// } from "lucide-react";

// interface Feature {
//   Icon: LucideIcon;
//   title: string;
//   subtitle: string;
//   description: string;
// }

// const FEATURES: Feature[] = [
//   {
//     Icon: Lock,
//     title: "Student Skill Profiles",
//     subtitle: "Personalized, shareable skill passports",
//     description:
//       "Each student receives a personalized, shareable digital passport of verified skills.",
//   },
//   {
//     Icon: FileCheck,
//     title: "Outcome Mapping",
//     subtitle: "Align courses with competency frameworks",
//     description:
//       "Aligns every course and program to specific skill and competency frameworks.",
//   },
//   {
//     Icon: ShieldCheck,
//     title: "Institution Dashboard",
//     subtitle: "Visualize progress in real time",
//     description:
//       "Visualize progress across departments, batches, and programs in real time.",
//   },
//   {
//     Icon: Cloud,
//     title: "Placement Readiness Score",
//     subtitle: "AI-driven employability evaluation",
//     description:
//       "AI-driven evaluation of employability readiness for every student",
//   },
//   {
//     Icon: BarChart3,
//     title: "Certificate Integration",
//     subtitle: "Auto-sync with certifications",
//     description:
//       "Auto-sync with Rareminds, Naan Mudhalvan, or any LMS-based certification programs.",
//   },
//   {
//     Icon: Plug,
//    title: "Reporting Tools",
//     subtitle: "Export analytics for compliance",
//     description:
//       "Export analytics for NAAC, NIRF, AICTE, and TNSDC reports.",
//   },
// ];
// const TechDataAssuranceSection = () => {
//   return (
//     <section
//       id="tech-assurance"
//       className="py-16 md:py-20 bg-[#F9FAFB]"
//       aria-labelledby="tech-assurance-heading"
//     >
//       <div className="max-w-7xl mx-auto px-6 text-center">
//         {/* Top Icon */}
//         <div className="flex items-center justify-center mb-4">
//           <div className="bg-[#000000] rounded-2xl w-12 h-12 flex items-center justify-center shadow-md">
//             <ShieldAlert className="text-white w-5 h-5" aria-hidden="true" />
//           </div>
//         </div>

//         {/* Heading */}
//         <h2
//           id="tech-assurance-heading"
//           className="text-3xl md:text-4xl font-extrabold text-[#000000] leading-tight mb-2"
//         >
//           Key Features&nbsp;
//           <span className="text-[#E32A18]"></span>
//         </h2>

//         <p
//           className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-16"
//           aria-describedby="tech-assurance-heading"
//         >
//           Explore the essential capabilities of the Skill Passport platform that empower institutions and students alike.
//         </p>

//         {/* Features */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
//           {FEATURES.map(({ Icon, title, subtitle, description }, i) => (
//             <div
//               key={i}
//               className="group h-full rounded-2xl border border-neutral-200 bg-white p-8 text-left shadow-[0_1px_2px_rgba(0,0,0,0.05),0_8px_24px_rgba(0,0,0,0.06)] 
//                          hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_10px_28px_rgba(0,0,0,0.08)] transition-shadow cursor-pointer"
//             >
//               {/* Icon */}
//               <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E32A18]/10 text-[#E32A18] group-hover:bg-[#E32A18]/20 transition-colors duration-300">
//                 <Icon className="h-6 w-6" aria-hidden="true" />
//               </div>

//               {/* Title */}
//               <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-[#E32A18] transition-colors duration-300">
//                 {title}
//               </h3>

//               {/* Subtitle */}
//               <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line group-hover:text-neutral-900 transition-colors duration-300">
//                 {subtitle}
//               </p>

//               {/* Description: hidden by default, visible on hover */}
//               <p className="mt-3 text-sm text-neutral-700 leading-relaxed whitespace-pre-line opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 {description}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Short Summary */}
//         <div className="max-w-6xl mx-auto mt-16 px-6 text-center">
//           <p className="mt-8 text-center text-[#000000] text-sm md:text-base italic font-medium max-w-6xl mx-auto">
//             <span className="text-[#E32A18]">Result:</span> Institutions gain data-backed insights, enhance accreditation outcomes, and strengthen student placement success.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TechDataAssuranceSection;


// import { useState } from "react";
// import {
//   Lock,
//   FileCheck,
//   ShieldCheck,
//   Cloud,
//   BarChart3,
//   Plug,
//   ShieldAlert,
//   LucideIcon,
// } from "lucide-react";
// import { motion } from "framer-motion";

// interface Feature {
//   Icon: LucideIcon;
//   title: string;
//   subtitle: string;
//   description: string;
// }

// const FEATURES: Feature[] = [
//   {
//     Icon: Lock,
//     title: "Student Skill Profiles",
//     subtitle: "Personalized, shareable skill passports",
//     description:
//       "Each student receives a personalized, shareable digital passport of verified skills.",
//   },
//   {
//     Icon: FileCheck,
//     title: "Outcome Mapping",
//     subtitle: "Align courses with competency frameworks",
//     description:
//       "Aligns every course and program to specific skill and competency frameworks.",
//   },
//   {
//     Icon: ShieldCheck,
//     title: "Institution Dashboard",
//     subtitle: "Visualize progress in real time",
//     description:
//       "Visualize progress across departments, batches, and programs in real time.",
//   },
//   {
//     Icon: Cloud,
//     title: "Placement Readiness Score",
//     subtitle: "AI-driven employability evaluation",
//     description: "AI-driven evaluation of employability readiness for every student.",
//   },
//   {
//     Icon: BarChart3,
//     title: "Certificate Integration",
//     subtitle: "Auto-sync with certifications",
//     description:
//       "Auto-sync with Rareminds, Naan Mudhalvan, or any LMS-based certification programs.",
//   },
//   {
//     Icon: Plug,
//     title: "Reporting Tools",
//     subtitle: "Export analytics for compliance",
//     description:
//       "Export analytics for NAAC, NIRF, AICTE, and TNSDC reports.",
//   },
// ];

// const HoverCard = ({ Icon, title, subtitle, description }: Feature) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <motion.div
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       animate={{ y: isHovered ? -6 : 0 }}
//       transition={{ type: "spring", stiffness: 300, damping: 20 }}
//       className="group h-full rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm flex flex-col cursor-pointer transition-all duration-300"
//     >
//       {/* Icon */}
//       <div
//         className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 ${
//           isHovered ? "bg-[#E32A18]/20" : "bg-[#E32A18]/10"
//         } text-[#E32A18]`}
//       >
//         <Icon className="h-6 w-6" aria-hidden="true" />
//       </div>

//       {/* Title */}
//       <h3
//         className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
//           isHovered ? "text-[#E32A18]" : "text-neutral-900"
//         }`}
//       >
//         {title}
//       </h3>

//       {/* Subtitle */}
//       <p
//         className={`text-sm leading-relaxed whitespace-pre-line transition-colors duration-300 ${
//           isHovered ? "text-neutral-900" : "text-neutral-700"
//         }`}
//       >
//         {subtitle}
//       </p>

//       {/* Description */}
//       <motion.p
//         animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? "auto" : 0 }}
//         transition={{ duration: 0.3 }}
//         className="mt-3 text-sm leading-relaxed text-neutral-700 overflow-hidden"
//       >
//         {description}
//       </motion.p>
//     </motion.div>
//   );
// };

// const TechDataAssuranceSection = () => {
//   return (
//     <section
//       id="tech-assurance"
//       className="py-16 md:py-20 bg-[#F9FAFB]"
//       aria-labelledby="tech-assurance-heading"
//     >
      // <div className="max-w-7xl mx-auto px-6 text-center">
      //   {/* Top Icon */}
      //   <div className="flex items-center justify-center mb-4">
      //     <div className="bg-[#000000] rounded-2xl w-12 h-12 flex items-center justify-center shadow-md">
      //       <ShieldAlert className="text-white w-5 h-5" aria-hidden="true" />
      //     </div>
      //   </div>

      //   {/* Heading */}
      //   <h2
      //     id="tech-assurance-heading"
      //     className="text-3xl md:text-4xl font-extrabold text-[#000000] leading-tight mb-2"
      //   >
      //     Key Features
      //   </h2>

      //   <p
      //     className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-16"
      //     aria-describedby="tech-assurance-heading"
      //   >
      //     Explore the essential capabilities of the Skill Passport platform that empower institutions and students alike.
      //   </p>

//         {/* Features Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
//           {FEATURES.map((feature, i) => (
//             <HoverCard key={i} {...feature} />
//           ))}
//         </div>

//         {/* Short Summary */}
//         <div className="max-w-6xl mx-auto mt-16 px-6 text-center">
//           <p className="mt-8 text-center text-[#000000] text-sm md:text-base italic font-medium max-w-6xl mx-auto">
//             <span className="text-[#E32A18]">Result:</span> Institutions gain data-backed insights, enhance accreditation outcomes, and strengthen student placement success.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TechDataAssuranceSection;


// import { useState } from "react";
// import {
//   Lock,
//   FileCheck,
//   ShieldCheck,
//   Cloud,
//   BarChart3,
//   Plug,
//   ShieldAlert,
//   LucideIcon,
// } from "lucide-react";
// import { motion } from "framer-motion";

// interface Feature {
//   Icon: LucideIcon;
//   title: string;
//   subtitle: string;
//   description: string;
// }

// const FEATURES: Feature[] = [
  // {
  //   Icon: Lock,
  //   title: "Student Skill Profiles",
  //   subtitle: "Personalized, shareable skill passports",
  //   description:
  //     "Each student receives a personalized, shareable digital passport of verified skills.",
  // },
  // {
  //   Icon: FileCheck,
  //   title: "Outcome Mapping",
  //   subtitle: "Align courses with competency frameworks",
  //   description:
  //     "Aligns every course and program to specific skill and competency frameworks.",
  // },
  // {
  //   Icon: ShieldCheck,
  //   title: "Institution Dashboard",
  //   subtitle: "Visualize progress in real time",
  //   description:
  //     "Visualize progress across departments, batches, and programs in real time.",
  // },
  // {
  //   Icon: Cloud,
  //   title: "Placement Readiness Score",
  //   subtitle: "AI-driven employability evaluation",
  //   description:
  //     "AI-driven evaluation of employability readiness for every student.",
  // },
  // {
  //   Icon: BarChart3,
  //   title: "Certificate Integration",
  //   subtitle: "Auto-sync with certifications",
  //   description:
  //     "Auto-sync with Rareminds, Naan Mudhalvan, or any LMS-based certification programs.",
  // },
  // {
  //   Icon: Plug,
  //   title: "Reporting Tools",
  //   subtitle: "Export analytics for compliance",
  //   description:
  //     "Export analytics for NAAC, NIRF, AICTE, and TNSDC reports.",
  // },
// ];

// type HoverCardProps = {
//   feature: Feature;
//   idx: number;
// };

// const HoverCard = ({ feature }: HoverCardProps) => {
//   const { Icon, title, subtitle, description } = feature;
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className="relative flex flex-col rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-sm transition-shadow duration-200 hover:shadow-lg"
//       // reduced card height while preserving width
//       // Tailwind arbitrary value used for consistent small height
//       style={{ minHeight: 50 }}
//     >
//       {/* Top: icon + title + subtitle */}
//       <div className="flex items-start gap-3">
//         <div
//           className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ${
//             isHovered ? "bg-[#E32A18]/20" : "bg-[#E32A18]/10"
//           } text-[#E32A18]`}
//         >
//           <Icon className="h-5 w-5" aria-hidden />
//         </div>

//         <div className="flex-1">
//           <h3
//             className={`text-base md:text-lg font-semibold transition-colors duration-200 ${
//               isHovered ? "text-[#E32A18]" : "text-[#000000]"
//             }`}
//           >
//             {title}
//           </h3>

//           <p
//             className={`mt-1 text-sm font-medium transition-colors duration-200 ${
//               isHovered ? "text-[#FF4C3B]" : "text-[#E32A18]"
//             }`}
//           >
//             {subtitle}
//           </p>
//         </div>
//       </div>

//       {/* flexible spacer keeps description at bottom without changing layout */}
//       <div className="flex-1" />

//       {/* Description: animate only opacity/translate (no height change) */}
//       <motion.div
//         initial={{ opacity: 0, translateY: 6 }}
//         animate={isHovered ? { opacity: 1, translateY: 0 } : { opacity: 0, translateY: 6 }}
//         transition={{ duration: 0.26 }}
//         className="mt-3"
//         aria-hidden={!isHovered}
//       >
//         <p className="text-sm text-gray-600 leading-relaxed mt-15 text-center">{description}</p>
//       </motion.div>
//     </div>
//   );
// };

// const TechDataAssuranceSection = () => {
//   return (
//     <section
//       id="tech-assurance"
//       className="py-16 md:py-20 bg-[#F9FAFB]"
//       aria-labelledby="tech-assurance-heading"
//     >
//       <div className="max-w-7xl mx-auto px-6 text-center">
//         {/* Top Icon */}
//         <div className="flex items-center justify-center mb-4">
//           <div className="bg-[#000000] rounded-2xl w-12 h-12 flex items-center justify-center shadow-md">
//             <ShieldAlert className="text-white w-5 h-5" aria-hidden="true" />
//           </div>
//         </div>

//         {/* Heading */}
        // <h2
        //   id="tech-assurance-heading"
        //   className="text-3xl md:text-4xl font-extrabold text-[#000000] leading-tight mb-2"
        // >
        //   Key Features
        // </h2>

        // <p
        //   className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-16"
        //   aria-describedby="tech-assurance-heading"
        // >
        //   Explore the essential capabilities of the Skill Passport platform that empower institutions and students alike.
        // </p>

//         {/* Grid (width maintained; smaller card height prevents big vertical space) */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto auto-rows-fr">
//           {FEATURES.map((feature, i) => (
//             <HoverCard key={i} feature={feature} idx={i} />
//           ))}
//         </div>

//         {/* Summary (left-aligned to match above) */}
//         <div className="max-w-6xl mx-auto mt-16 px-6">
          // <p className="mt-8 text-[#000000] text-sm md:text-base italic font-medium">
          //   <span className="text-[#E32A18]">Result:</span> Institutions gain data-backed insights, enhance accreditation outcomes, and strengthen student placement success.
          // </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TechDataAssuranceSection;



import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Lock,
  FileCheck,
  ShieldCheck,
  Cloud,
  BarChart3,
  Plug,
  ShieldAlert,
} from "lucide-react";
import { ChevronDown, ChevronUp } from "lucide-react";

type Feature = {
  Icon: LucideIcon;
  title: string;
  description: string;
};


const FEATURES: Feature[] = [
   {
    Icon: Lock,
    title: "Student Skill Profiles",
    description:
      "Each student receives a personalized, shareable digital passport of verified skills.",
  },
  {
    Icon: FileCheck,
    title: "Outcome Mapping",
    description:
      "Aligns every course and program to specific skill and competency frameworks.",
  },
  {
    Icon: ShieldCheck,
    title: "Institution Dashboard",
    description:
      "Visualize progress across departments, batches, and programs in real time.",
  },
  {
    Icon: Cloud,
    title: "Placement Readiness Score",
    description:
      "AI-driven evaluation of employability readiness for every student.",
  },
  {
    Icon: BarChart3,
    title: "Certificate Integration",
    description:
      "Auto-sync with Rareminds, Naan Mudhalvan, or any LMS-based certification programs.",
  },
  {
    Icon: Plug,
    title: "Reporting Tools",
    description:
      "Export analytics for NAAC, NIRF, AICTE, and TNSDC reports.",
  },
];

const FeatureCard: React.FC<{ f: Feature; idx: number }> = ({ f }) => {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const isTouch = typeof window !== "undefined" && "ontouchstart" in window;
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen((s) => !s);
      }
      if (e.key === "Escape") setOpen(false);
    };
    el.addEventListener("keydown", onKey as any);
    return () => el.removeEventListener("keydown", onKey as any);
  }, []);

  // Hover for non-touch (desktop/laptop)
  const hoverProps = !isTouch
    ? {
      onMouseEnter: () => setOpen(true),
      onMouseLeave: () => setOpen(false),
      onFocus: () => setOpen(true),
      onBlur: () => setOpen(false),
    }
    : {};

  return (
    <div className="relative">
      <div
        ref={buttonRef}
        tabIndex={0}
        role="button"
        aria-expanded={open}
        {...hoverProps}
        // On mobile + tablet (touch devices): toggle on click
        onClick={() => {
          if (isTouch) setOpen((s) => !s);
        }}
        className="w-full rounded-2xl border border-neutral-200 bg-white px-6 py-5 shadow-sm transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E32A18]"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#E32A18]/10 text-[#E32A18]">
            <f.Icon className="w-6 h-6 md:w-7 md:h-7" aria-hidden />
          </div>

          <span className="text-sm md:text-lg font-semibold text-neutral-900 flex-1">
            {f.title}
          </span>

          {/* Show arrow only on touch devices (mobile + tablet) */}
          {isTouch && (
            <div className="text-neutral-500">
              {open ? (
                <ChevronUp className="w-5 h-5" aria-hidden />
              ) : (
                <ChevronDown className="w-5 h-5" aria-hidden />
              )}
            </div>
          )}
        </div>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.18 }}
          className="overflow-hidden mt-4 text-neutral-700"
          aria-hidden={!open}
        >
          <div className="pt-3 border-t border-neutral-100">
            <div className="text-sm md:text-base leading-relaxed whitespace-pre-line py-3">
              {f.description}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};


const TechDataAssuranceSection: React.FC = () => {
  return (
    <section id="tech-assurance" className="py-16 md:py-20 bg-[#F9FAFB]" aria-labelledby="tech-assurance-heading">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-black rounded-2xl w-12 h-12 flex items-center justify-center shadow-md">
              <ShieldAlert className="text-white w-6 h-6" aria-hidden />
            </div>
          </div>

          <h2
            id="tech-assurance-heading"
            className="text-3xl md:text-4xl font-extrabold text-[#000000] leading-tight mb-2"
          >
            Key&nbsp;
            <span className="text-[#000000]">Features</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-bas mx-auto">
            Explore the essential capabilities of the Skill Passport platform that empower institutions and students alike.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} f={f} idx={i} />
          ))}
        </div>

        <div className="max-w-7xl mx-auto mt-14 px-6 text-center">
          <p className="mt-8 text-[#000000] text-sm md:text-base italic font-medium">
            <span className="text-[#E32A18]">Result:</span> Institutions gain data-backed insights, enhance accreditation outcomes, and strengthen student placement success.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TechDataAssuranceSection;