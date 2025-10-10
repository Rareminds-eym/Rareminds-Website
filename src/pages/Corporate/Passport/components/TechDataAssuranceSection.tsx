import {
  Lock,
  FileCheck,
  ShieldCheck,
  Cloud,
  BarChart3,
  Plug,
  LucideIcon,
  ShieldAlert,
} from "lucide-react";

interface Feature {
  Icon: LucideIcon;
  title: string;
  description: string;
}

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

const TechDataAssuranceSection = ({ onDemoClick, onAnalyticsClick }: { onDemoClick: () => void, onAnalyticsClick: () => void }) => {
  return (
    <section
      id="tech-assurance"
      className="py-16 md:py-20 bg-[#F9FAFB]"
      aria-labelledby="tech-assurance-heading"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Top Icon */}
        <div className="flex items-center justify-center mb-4">
          <div className="bg-[#000000] rounded-2xl w-12 h-12 flex items-center justify-center shadow-md">
            <ShieldAlert className="text-white w-5 h-5" aria-hidden="true" />
          </div>
        </div>

        {/* Heading */}
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

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {FEATURES.map(({ Icon, title, description }, i) => (
            <div
              key={i}
              className="h-full rounded-2xl border border-neutral-200 bg-white p-8 text-left shadow-[0_1px_2px_rgba(0,0,0,0.05),0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_10px_28px_rgba(0,0,0,0.08)] transition-shadow"
            >


              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E32A18]/10 text-[#E32A18]">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>

              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                {title}
              </h3>

              <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* Short Summary */}
        <div className="max-w-6xl mx-auto mt-16 px-6 text-center">
          <p className="text-base text-gray-800 italic">
            <span className="font-semibold text-[#E32A18]">In Short:{" "}</span>
            <strong>Secure. Scalable. Compliant. Trusted.{" "}</strong>
            Skill Passport ensures every skill you validate is authentic, traceable, and enterprise-ready — empowering you to build workforce intelligence with absolute confidence.
          </p>


          {/* CTAs */}
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
