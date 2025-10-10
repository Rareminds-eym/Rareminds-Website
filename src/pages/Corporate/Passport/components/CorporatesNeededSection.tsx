import { Eye, BadgeCheck, LineChart, Route, Layers, FileCheck2, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    Icon: Eye,
    title: "Talent Visibility at Every Level",
    subtitle: "See workforce skills in real time.",
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

type CardProps = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  subtitle: string;
  description: string;
};

const Card = ({ Icon, title, subtitle, description }: CardProps) => (
  <motion.div
    whileHover={{ y: -6 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="group h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg"
    role="article"
    aria-labelledby={`benefit-${title}`}
  >
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFECEC]">
        <Icon className="h-6 w-6 text-[#E32A18]" strokeWidth={2} aria-hidden />
      </div>
      <div className="flex-1">
        <h3
          id={`benefit-${title}`}
          className="text-lg md:text-xl font-semibold text-[#000000]"
        >
          {title}
        </h3>
        <p className="mt-1 text-sm text-[#E32A18] font-medium">{subtitle}</p>
        <p className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </motion.div>
);

type CorporatesNeededSectionProps = {
  onDemoClick: () => void;
  onAnalyticsClick: () => void;
};

const CorporatesNeededSection = ({
  onDemoClick,
  onAnalyticsClick,
}: CorporatesNeededSectionProps) => {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          {/* Top Icon */}
          <div className="flex items-center justify-center mb-4">
            <div className="bg-[#000000] rounded-2xl w-12 h-12 flex items-center justify-center shadow-md">
              <Briefcase className="text-white w-5 h-5" aria-hidden />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#000000] leading-tight mb-2">
            Why <span className="text-[#E32A18]">Corporates</span> Need It
          </h2>

          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
            In today’s workplace, skills — not tenure or certificates — define competitiveness.
          </p>

          <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            The{" "}
            <span className="font-semibold text-[#E32A18]">
              Rareminds Skill Passport
            </span>{" "}
            replaces assumptions with verified skill intelligence, giving
            visibility and accountability across workforce development.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, idx) => (
            <Card key={item.title ?? idx} {...item} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onDemoClick}
            className="inline-flex items-center justify-center rounded-full bg-[#E32A18] px-6 py-3 text-white font-semibold shadow-sm transition-colors hover:bg-[#cc2515] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E32A18]"
            aria-label="Book a corporate demo"
          >
            Book a Corporate Demo
          </button>

          <button
            onClick={onAnalyticsClick}
            className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3 text-[#000000] font-semibold shadow-sm transition-colors hover:border-[#E32A18] hover:text-[#E32A18] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E32A18]"
            aria-label="See skill analytics in action"
          >
            See Skill Analytics in Action
          </button>
        </div>

        {/* Result Note */}
        <p className="mt-8 text-center text-[#000000] text-sm md:text-base italic font-medium max-w-6xl mx-auto">
          <span className="text-[#E32A18]">Result:</span> The Skill Passport transforms training data into business intelligence — helping organizations make better people decisions, faster.
        </p>
      </div>
    </section>
  );
};

export default CorporatesNeededSection;
