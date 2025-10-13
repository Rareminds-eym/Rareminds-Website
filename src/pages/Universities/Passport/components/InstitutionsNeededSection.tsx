
// import { Eye, BadgeCheck, LineChart, Route, Layers, FileCheck2, Briefcase } from "lucide-react";
// import { motion } from "framer-motion";

// const benefits = [
//   {
//     Icon: Eye,
//     title: "Skill Mastery Beyond Marks",
//     subtitle: "Measure what truly matters.",
//     description:
//       "Grades reflect knowledge, but they don’t always reveal real-world competency. The Skill Passport helps institutions track students’ practical skills and learning milestones effectively.",
//   },
//   {
//     Icon: BadgeCheck,
//     title: "Competency Alignment to Industry Standards",
//     subtitle: "Bridge the gap between curriculum and employability.",
//     description:
//       "Align every course and program to industry frameworks, ensuring students develop job-ready skills and meet employer expectations.",
//   },
//   {
//     Icon: LineChart,
//     title: "Career Readiness Visualization",
//     subtitle: "See students’ growth from learning to employability.",
//     description:
//       "Visualize student progress across academic, technical, and behavioral skills, providing insights into who is ready for internships, placements, or higher learning.",
//   },
//   {
//     Icon: Route,
//     title: "Institutional Impact Metrics",
//     subtitle: "Data-backed insights for academic decision-making.",
//     description:
//       "Measure the effectiveness of programs, enhance accreditation outcomes, and strengthen placement success with comprehensive analytics.",
//   },
//   {
//     Icon: Layers,
//     title: "Empower Students & Faculty",
//     subtitle: "A clear roadmap for skill development.",
//     description:
//       "Students gain ownership of their skill journey, while faculty can guide and monitor learning outcomes efficiently.",
//   },
//   {
//     Icon: FileCheck2,
//     title: "Seamless Integration & Reporting",
//     subtitle: "Simplify institutional workflows.",
//     description:
//       "Integrates with LMS and other academic systems to automate skill tracking, reporting, and verification, supporting accreditation and compliance requirements.",
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
//     className="group h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg cursor-pointer"
//     role="article"
//     aria-labelledby={`benefit-${title}`}
//   >
//     <div className="flex items-start gap-4">
//       {/* Icon */}
//       <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFECEC] group-hover:bg-[#FFD3D0] transition-colors duration-300">
//         <Icon className="h-6 w-6 text-[#E32A18]" strokeWidth={2} aria-hidden />
//       </div>

//       {/* Text Content */}
//       <div className="flex-1">
//         <h3
//           id={`benefit-${title}`}
//           className="text-lg md:text-xl font-semibold text-[#000000] group-hover:text-[#E32A18] transition-colors duration-300"
//         >
//           {title}
//         </h3>
//         <p className="mt-1 text-sm text-[#E32A18] font-medium group-hover:text-[#FF4C3B] transition-colors duration-300">
//           {subtitle}
//         </p>

//         {/* Description: hidden by default, visible on hover */}
//         <p className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
//           {description}
//         </p>
//       </div>
//     </div>
//   </motion.div>
// );

// const Card = ({ Icon, title, subtitle, description }: CardProps) => (
//   <motion.div
//     initial="rest"
//     whileHover="hover"
//     animate="rest"
//     variants={{
//       rest: { y: 0 },
//       hover: { y: -6 },
//     }}
//     transition={{ type: "spring", stiffness: 300, damping: 20 }}
//     className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm cursor-pointer flex flex-col"
//     role="article"
//     aria-labelledby={`benefit-${title}`}
//   >
//     {/* Top section: icon, title, subtitle */}
//     <div className="flex items-start gap-4">
//       <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFECEC] transition-colors duration-300">
//         <Icon className="h-6 w-6 text-[#E32A18]" strokeWidth={2} aria-hidden />
//       </div>

//       <div className="flex-1 flex flex-col">
//         <h3
//           id={`benefit-${title}`}
//           className="text-lg md:text-xl font-semibold text-[#000000] transition-colors duration-300"
//         >
//           {title}
//         </h3>
//         <p className="mt-1 text-sm text-[#E32A18] font-medium transition-colors duration-300">
//           {subtitle}
//         </p>
//       </div>
//     </div>

//     {/* Description section */}
//     <motion.p
//       variants={{
//         rest: { opacity: 0, height: 0 },
//         hover: { opacity: 1, height: "auto" },
//       }}
//       transition={{ duration: 0.3 }}
//       className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed overflow-hidden text-center"
//     >
//       {description}
//     </motion.p>
//   </motion.div>
// );



// type InstitutionsNeededSectionProps = {
//   onDemoClick: () => void;
//   onAnalyticsClick: () => void;
// };

// const InstitutionsNeededSection = ({
//   onDemoClick,
//   onAnalyticsClick,
// }: InstitutionsNeededSectionProps) => {
//   return (
//     <section className="bg-gray-100 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
//       <div className="w-full max-w-7xl text-center py-10 md:py-14">
//         {/* Top Icon */}
//         <div className="flex items-center justify-center mb-4">
//           <div className="bg-[#000000] rounded-2xl w-12 h-12 flex items-center justify-center shadow-md">
//             <Briefcase className="text-white w-5 h-5" aria-hidden />
//           </div>
//         </div>

//         {/* Title */}
//         <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#000000] leading-tight mb-4">
//           Why <span className="text-[#E32A18]">Institutions</span> Need It
//         </h2>

//         <p className="text-gray-500 text-sm md:text-base max-w-3xl mx-auto">
//           Universities today face the challenge of bridging the gap between curriculum outcomes and industry expectations.
//         </p>

//         <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
//           The <span className="font-semibold text-[#E32A18]">Rareminds Skill Passport</span> helps institutions measure what truly matters: skill mastery, competency alignment, career readiness, and institutional impact — all backed by real-time, data-driven insights.
//         </p>

//         {/* Benefits Grid */}
//         <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {benefits.map((item, idx) => (
//             <Card key={item.title ?? idx} {...item} />
//           ))}
//         </div>

//         {/* Result Note */}
//         <p className="mt-8 text-center text-[#000000] text-sm md:text-base italic font-medium max-w-6xl mx-auto">
//           <span className="text-[#E32A18]">Result:</span> Institutions gain data-backed insights, enhance accreditation outcomes, and strengthen student placement success.
//         </p>

//         {/* CTA Buttons */}
//         <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
//           <button
//             onClick={onDemoClick}
//             className="inline-flex items-center justify-center rounded-full bg-[#E32A18] px-6 py-3 text-white font-semibold shadow-sm transition-colors hover:bg-[#cc2515] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E32A18]"
//           >
//             Book an Institutional Demo
//           </button>

//           <button
//             onClick={onAnalyticsClick}
//             className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3 text-[#000000] font-semibold shadow-sm transition-colors hover:border-[#E32A18] hover:text-[#E32A18] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E32A18]"
//           >
//             See Skill Analytics in Action
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default InstitutionsNeededSection;




// import { useState } from "react";
// import { Eye, BadgeCheck, LineChart, Route, Layers, FileCheck2, Briefcase } from "lucide-react";
// import { motion } from "framer-motion";

// const benefits = [
//   {
//     Icon: Eye,
//     title: "Skill Mastery Beyond Marks",
//     subtitle: "Measure what truly matters.",
//     description:
//       "Grades reflect knowledge, but they don’t always reveal real-world competency. The Skill Passport helps institutions track students’ practical skills and learning milestones effectively.",
//   },
//   {
//     Icon: BadgeCheck,
//     title: "Competency Alignment to Industry Standards",
//     subtitle: "Bridge the gap between curriculum and employability.",
//     description:
//       "Align every course and program to industry frameworks, ensuring students develop job-ready skills and meet employer expectations.",
//   },
//   {
//     Icon: LineChart,
//     title: "Career Readiness Visualization",
//     subtitle: "See students’ growth from learning to employability.",
//     description:
//       "Visualize student progress across academic, technical, and behavioral skills, providing insights into who is ready for internships, placements, or higher learning.",
//   },
//   {
//     Icon: Route,
//     title: "Institutional Impact Metrics",
//     subtitle: "Data-backed insights for academic decision-making.",
//     description:
//       "Measure the effectiveness of programs, enhance accreditation outcomes, and strengthen placement success with comprehensive analytics.",
//   },
//   {
//     Icon: Layers,
//     title: "Empower Students & Faculty",
//     subtitle: "A clear roadmap for skill development.",
//     description:
//       "Students gain ownership of their skill journey, while faculty can guide and monitor learning outcomes efficiently.",
//   },
//   {
//     Icon: FileCheck2,
//     title: "Seamless Integration & Reporting",
//     subtitle: "Simplify institutional workflows.",
//     description:
//       "Integrates with LMS and other academic systems to automate skill tracking, reporting, and verification, supporting accreditation and compliance requirements.",
//   },
// ];

// type CardProps = {
//   Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
//   title: string;
//   subtitle: string;
//   description: string;
// };

// const Card = ({ Icon, title, subtitle, description }: CardProps) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <motion.div
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       animate={{ y: isHovered ? -6 : 0 }}
//       transition={{ type: "spring", stiffness: 300, damping: 20 }}
//       className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm cursor-pointer flex flex-col"
//       role="article"
//       aria-labelledby={`benefit-${title}`}
//     >
//       {/* Top section: icon, title, subtitle */}
//       <div className="flex items-start gap-4">
//         <div
//           className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
//             isHovered ? "bg-[#FFD3D0]" : "bg-[#FFECEC]"
//           }`}
//         >
//           <Icon
//             className="h-6 w-6 text-[#E32A18] transition-colors duration-300"
//             strokeWidth={2}
//             aria-hidden
//           />
//         </div>

//         <div className="flex-1 flex flex-col">
//           <h3
//             id={`benefit-${title}`}
//             className={`text-lg md:text-xl font-semibold transition-colors duration-300 ${
//               isHovered ? "text-[#E32A18]" : "text-[#000000]"
//             }`}
//           >
//             {title}
//           </h3>
//           <p
//             className={`mt-1 text-sm font-medium transition-colors duration-300 ${
//               isHovered ? "text-[#FF4C3B]" : "text-[#E32A18]"
//             }`}
//           >
//             {subtitle}
//           </p>
//         </div>
//       </div>

//       {/* Description section */}
//       <motion.p
//         animate={{
//           opacity: isHovered ? 1 : 0,
//           height: isHovered ? "auto" : 0,
//         }}
//         transition={{ duration: 0.3 }}
//         className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed overflow-hidden text-center"
//       >
//         {description}
//       </motion.p>
//     </motion.div>
//   );
// };

// type InstitutionsNeededSectionProps = {
//   onDemoClick: () => void;
//   onAnalyticsClick: () => void;
// };

// const InstitutionsNeededSection = ({
//   onDemoClick,
//   onAnalyticsClick,
// }: InstitutionsNeededSectionProps) => {
//   return (
//     <section className="bg-gray-100 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
//       <div className="w-full max-w-7xl text-center py-10 md:py-14">
//         {/* Top Icon */}
//         <div className="flex items-center justify-center mb-4">
//           <div className="bg-[#000000] rounded-2xl w-12 h-12 flex items-center justify-center shadow-md">
//             <Briefcase className="text-white w-5 h-5" aria-hidden />
//           </div>
//         </div>

//         {/* Title */}
        // <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#000000] leading-tight mb-4">
        //   Why <span className="text-[#E32A18]">Institutions</span> Need It
        // </h2>

        // <p className="text-gray-500 text-sm md:text-base max-w-3xl mx-auto">
        //   Universities today face the challenge of bridging the gap between curriculum outcomes and industry expectations.
        // </p>

        // <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
        //   The <span className="font-semibold text-[#E32A18]">Rareminds Skill Passport</span> helps institutions measure what truly matters: skill mastery, competency alignment, career readiness, and institutional impact — all backed by real-time, data-driven insights.
        // </p>

//         {/* Benefits Grid */}
//         <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {benefits.map((item, idx) => (
//             <Card key={item.title ?? idx} {...item} />
//           ))}
//         </div>

//         {/* Result Note */}
        // <p className="mt-8 text-center text-[#000000] text-sm md:text-base italic font-medium max-w-6xl mx-auto">
        //   <span className="text-[#E32A18]">Result:</span> Institutions gain data-backed insights, enhance accreditation outcomes, and strengthen student placement success.
        // </p>

//         {/* CTA Buttons */}
//         <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          // <button
          //   onClick={onDemoClick}
          //   className="inline-flex items-center justify-center rounded-full bg-[#E32A18] px-6 py-3 text-white font-semibold shadow-sm transition-colors hover:bg-[#cc2515] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E32A18]"
          // >
          //   Book an Institutional Demo
          // </button>

          // <button
          //   onClick={onAnalyticsClick}
          //   className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3 text-[#000000] font-semibold shadow-sm transition-colors hover:border-[#E32A18] hover:text-[#E32A18] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E32A18]"
          // >
          //   See Skill Analytics in Action
          // </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default InstitutionsNeededSection;



import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Eye,
  BadgeCheck,
  LineChart,
  Route,
  Layers,
  FileCheck2,
  Briefcase,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type Benefit = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  subtitle: string;
  description: string;
};
const benefits = [
  {
    Icon: Eye,
    title: "Skill Mastery Beyond Marks",
    subtitle: "Measure what truly matters.",
    description:
      "Grades reflect knowledge, but they don’t always reveal real-world competency. The Skill Passport helps institutions track students’ practical skills and learning milestones effectively.",
  },
  {
    Icon: BadgeCheck,
    title: "Competency Alignment to Industry Standards",
    subtitle: "Bridge the gap between curriculum and employability.",
    description:
      "Align every course and program to industry frameworks, ensuring students develop job-ready skills and meet employer expectations.",
  },
  {
    Icon: LineChart,
    title: "Career Readiness Visualization",
    subtitle: "See students’ growth from learning to employability.",
    description:
      "Visualize student progress across academic, technical, and behavioral skills, providing insights into who is ready for internships, placements, or higher learning.",
  },
  {
    Icon: Route,
    title: "Institutional Impact Metrics",
    subtitle: "Data-backed insights for academic decision-making.",
    description:
      "Measure the effectiveness of programs, enhance accreditation outcomes, and strengthen placement success with comprehensive analytics.",
  },
  {
    Icon: Layers,
    title: "Empower Students & Faculty",
    subtitle: "A clear roadmap for skill development.",
    description:
      "Students gain ownership of their skill journey, while faculty can guide and monitor learning outcomes efficiently.",
  },
  {
    Icon: FileCheck2,
    title: "Seamless Integration & Reporting",
    subtitle: "Simplify institutional workflows.",
    description:
      "Integrates with LMS and other academic systems to automate skill tracking, reporting, and verification, supporting accreditation and compliance requirements.",
  },
];

const BenefitCard: React.FC<Benefit> = ({ Icon, title, subtitle, description }) => {
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
        onClick={() => {
          if (isTouch) setOpen((s) => !s);
        }}
        className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E32A18]"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFECEC]">
            <Icon className="h-6 w-6 md:w-7 md:h-7 text-[#E32A18]" strokeWidth={2} aria-hidden />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-[#000000]">{title}</h3>
            <p className="mt-1 text-sm text-[#E32A18] font-medium">{subtitle}</p>
          </div>

          {/* Arrow only on touch devices */}
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
          className="overflow-hidden mt-3 text-gray-600"
          aria-hidden={!open}
        >
          <div className="pt-3 border-t border-gray-100">
            <p className="text-base leading-relaxed">{description}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

type CorporatesNeededSectionProps = {
  onDemoClick: () => void;
  onAnalyticsClick: () => void;
};

const CorporatesNeededSection = ({ onDemoClick,onAnalyticsClick }: CorporatesNeededSectionProps) => {
  return (
    <section className="py-16 md:py-20 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-[#000000] rounded-2xl w-12 h-12 flex items-center justify-center shadow-md">
              <Briefcase className="text-white w-5 h-5 md:w-6 md:h-6" aria-hidden />
            </div>
          </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#000000] leading-tight mb-4">
          Why <span className="text-[#000000]">Institutions</span> Need It
        </h2>

        <p className="text-gray-500 text-sm md:text-base max-w-3xl mx-auto">
          Universities today face the challenge of bridging the gap between curriculum outcomes and industry expectations.
        </p>

        <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
          The <span className="font-semibold text-[#E32A18]">Rareminds Skill Passport</span> helps institutions measure what truly matters: skill mastery, competency alignment, career readiness, and institutional impact — all backed by real-time, data-driven insights.
        </p>
        </div>

        {/* Benefits Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, idx) => (
            <BenefitCard key={item.title ?? idx} {...item} />
          ))}
        </div>

        {/* Result Note */}
        <p className="mt-8 text-center text-[#000000] text-sm md:text-base italic font-medium max-w-6xl mx-auto">
          <span className="text-[#E32A18]">Result:</span> Institutions gain data-backed insights, enhance accreditation outcomes, and strengthen student placement success.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
         <button
            onClick={onDemoClick}
            className="inline-flex items-center justify-center rounded-full bg-[#E32A18] px-6 py-3 text-white font-semibold shadow-sm transition-colors hover:bg-[#cc2515] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E32A18]"
          >
            Book an Institutional Demo
          </button>

          <button
            onClick={onAnalyticsClick}
            className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3 text-[#000000] font-semibold shadow-sm transition-colors hover:border-[#E32A18] hover:text-[#E32A18] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E32A18]"
          >
            See Skill Analytics in Action
          </button>

          
        </div>
      </div>
    </section>
  );
};

export default CorporatesNeededSection;
