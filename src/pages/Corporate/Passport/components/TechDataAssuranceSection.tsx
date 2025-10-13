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
    title: "Data Security by Design",
    description:
      "Every skill record is stored in encrypted environments, ensuring end-to-end data protection. We follow ISO-certified data practices and role-based access controls, giving institutions and corporates complete control over who can view, issue, or validate credentials.",
  },
  {
    Icon: FileCheck,
    title: "Verified & Immutable Records",
    description:
      "Each credential is digitally signed and time-stamped to ensure authenticity. Once verified, data cannot be altered or duplicated — maintaining a single source of truth for learners, employers, and ecosystem partners.",
  },
  {
    Icon: ShieldCheck,
    title: "Compliance with Global Standards",
    description:
      "The Skill Passport framework aligns with global data protection and credentialing norms:\n• GDPR & Indian Data Protection Guidelines\n• ISO 27001 Data Security Frameworks\n• Open Badge & Digital Credential Standards (OBv2)\nThis ensures interoperability, trust, and recognition across institutions and borders.",
  },
  {
    Icon: Cloud,
    title: "Scalable, Cloud-Native Infrastructure",
    description:
      "Powered by a cloud-first architecture, Skill Passport scales effortlessly from small cohorts to large state-level implementations. Built for reliability, uptime, and speed — it supports thousands of concurrent users without compromising performance.",
  },
  {
    Icon: BarChart3,
    title: "Transparent Analytics & Audit Trails",
    description:
      "Every action — from assessment upload to credential issue — is logged, auditable, and accessible via dashboards. This transparency helps organizations stay compliance-ready for internal audits, CSR reporting, or government reviews.",
  },
  {
    Icon: Plug,
    title: "Integration & API Readiness",
    description:
      "Skill Passport is designed to fit within your digital ecosystem. Our open APIs enable seamless integration with existing LMS, HRMS, ERP, and BI systems, ensuring smooth data flow and zero duplication.",
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
          transition={{ duration: reduce ? 0 : 0.3, ease: "easeInOut" }}
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


const TechDataAssuranceSection: React.FC<{ onDemoClick: () => void; onAnalyticsClick: () => void }> = ({ onDemoClick, onAnalyticsClick }) => {
  return (
    <section id="tech-assurance" className="py-16 md:py-20 bg-[#F9FAFB]" aria-labelledby="tech-assurance-heading">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-black rounded-2xl w-14 h-14 flex items-center justify-center shadow-md">
              <ShieldAlert className="text-white w-6 h-6" aria-hidden />
            </div>
          </div>

          <h2
            id="tech-assurance-heading"
            className="text-3xl md:text-4xl font-extrabold text-[#000000] leading-tight mb-2"
          >
            Tech & Data&nbsp;
            <span className="text-[#E32A18]">Assurance</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-bas mx-auto">
            Trust is at the core of every verified skill.
          </p>

          <p
            className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-16"
            aria-describedby="tech-assurance-heading"
          >
            The Rareminds Skill Passport is built on a robust, enterprise-grade technology framework that ensures every skill record is <span className="font-semibold text-[#E32A18]">secure, traceable, and tamper-proof</span> — from creation to verification.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} f={f} idx={i} />
          ))}
        </div>

        <div className="max-w-7xl mx-auto mt-14 px-6 text-center">
          <p className="text-base text-gray-800 italic">
            <span className="font-semibold text-[#E32A18]">In Short:{" "}</span>
            <strong>Secure. Scalable. Compliant. Trusted.{" "}</strong>
            Skill Passport ensures every skill you validate is authentic, traceable, and enterprise-ready — empowering you to build workforce intelligence with absolute confidence.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onDemoClick}
              className="inline-flex items-center justify-center rounded-full bg-[#E32A18] px-6 py-3 text-white font-semibold shadow-sm transition-colors hover:bg-[#cc2515] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E32A18]"
              aria-label="Explore Platform Security"
            >
              Explore Platform Security
            </button>
            <button
              onClick={onAnalyticsClick}
              aria-label="Download Data Assurance Brief"
              className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3 text-[#000000] font-semibold shadow-sm transition-colors hover:border-[#E32A18] hover:text-[#E32A18] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E32A18]"
            >
              Download Data Assurance Brief
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechDataAssuranceSection;