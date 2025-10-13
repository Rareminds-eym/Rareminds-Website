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

const benefits: Benefit[] = [
  {
    Icon: Eye,
    title: "Talent Visibility at Every Level",
    subtitle: "See your workforce capabilities in real time.",
    description:
      "The Skill Passport converts every employee’s training, performance, and project data into a live skill map — giving leaders instant visibility into who’s ready, who’s learning, and where the gaps lie.",
  },
  {
    Icon: BadgeCheck,
    title: "Verified Competence, Not Just Certificates",
    subtitle: "Replace manual tracking with verified skill evidence.",
    description:
      "Each skill badge is backed by validated assessments, mentor approvals, and performance data, ensuring your organization makes decisions based on proof of competence — not self-declared ability.",
  },
  {
    Icon: LineChart,
    title: "Measurable ROI on Learning & Development",
    subtitle: "Know what your training investments are delivering.",
    description:
      "Skill Passport links learning outcomes directly to productivity metrics and performance indicators, helping HR and L&D teams quantify training ROI and justify budget decisions with data.",
  },
  {
    Icon: Route,
    title: "Smarter Workforce Planning & Internal Mobility",
    subtitle: "Match the right people to the right opportunities.",
    description:
      "With detailed skill analytics and progression data, leaders can identify upskilling needs, plan career pathways, and enable internal promotions based on verified readiness — reducing dependency on external hiring.",
  },
  {
    Icon: Layers,
    title: "Seamless Integration with Enterprise Systems",
    subtitle: "Designed to fit your ecosystem.",
    description:
      "The platform integrates smoothly with your existing LMS, HRMS, and performance tools, creating a connected skill infrastructure without disrupting operations.",
  },
  {
    Icon: FileCheck2,
    title: "Data-Driven Compliance & Reporting",
    subtitle: "Stay audit-ready, always.",
    description:
      "Whether for ISO, ESG, or CSR-linked skill programs, Skill Passport ensures traceable, auditable records of every training hour, assessment, and outcome — simplifying compliance and reporting.",
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
            <p className="mt-1 text-sm text-[#6f6e6e] font-medium">{subtitle}</p>
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
          transition={{ duration: reduce ? 0 : 0.3, ease: "easeInOut" }}
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

const CorporatesNeededSection = ({ onDemoClick }: CorporatesNeededSectionProps) => {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-[#000000] rounded-2xl w-12 h-12 flex items-center justify-center shadow-md">
              <Briefcase className="text-white w-5 h-5 md:w-6 md:h-6" aria-hidden />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-[#000000] leading-tight mb-4">
            Why Corporates Need It
          </h2>

          <p className="text-gray-500 text-sm md:text-base max-w-4xl mx-auto">
            In today’s evolving workplace, skills define competitiveness — but most organizations still rely on outdated indicators like attendance, certifications, or tenure.
          </p>

          <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            The Rareminds Skill Passport helps corporates move from assumptions to evidence by bringing skill intelligence, visibility, and accountability into every stage of workforce development.
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
          <span className="text-[#000000] font-bold">Result:</span> From Training to Transformation. The Skill Passport transforms training data into business intelligence — helping organizations make better people decisions, faster.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onDemoClick}
            className="inline-flex items-center justify-center rounded-full bg-[#E32A18] px-6 py-3 text-white font-semibold shadow-sm transition-colors hover:bg-[#cc2515] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E32A18]"
            aria-label="Book a corporate demo"
          >
            Book a Corporate Demo
          </button>

          {/* <button
            onClick={onAnalyticsClick}
            className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3 text-[#000000] font-semibold shadow-sm transition-colors hover:border-[#E32A18] hover:text-[#E32A18] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E32A18]"
            aria-label="See skill analytics in action"
          >
            See Skill Analytics in Action
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default CorporatesNeededSection;
