import { Eye, BadgeCheck, LineChart, Route, Layers, FileCheck2, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

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

type InstitutionsNeededSectionProps = {
  onDemoClick: () => void;
  onAnalyticsClick: () => void;
};

const InstitutionsNeededSection = ({
  onDemoClick,
  onAnalyticsClick,
}: InstitutionsNeededSectionProps) => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto text-center">
        {/* Top Icon */}
        <div className="flex items-center justify-center mb-4">
          <div className="bg-[#000000] rounded-2xl w-12 h-12 flex items-center justify-center shadow-md">
            <Briefcase className="text-white w-5 h-5" aria-hidden />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#000000] leading-tight mb-4">
          Why <span className="text-[#E32A18]">Institutions</span> Need It
        </h2>

        <p className="text-gray-500 text-sm md:text-base max-w-3xl mx-auto">
          Universities today face the challenge of bridging the gap between curriculum outcomes and industry expectations.
        </p>

        <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
          The <span className="font-semibold text-[#E32A18]">Rareminds Skill Passport</span> helps institutions measure what truly matters: skill mastery, competency alignment, career readiness, and institutional impact — all backed by real-time, data-driven insights.
        </p>

        {/* Benefits Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, idx) => (
            <Card key={item.title ?? idx} {...item} />
          ))}
        </div>

        {/* Result Note */}
        <p className="mt-8 text-center text-[#000000] text-sm md:text-base italic font-medium max-w-6xl mx-auto">
          <span className="text-[#E32A18]">Result:</span> Institutions gain data-backed insights, enhance accreditation outcomes, and strengthen student placement success.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onDemoClick}
            className="inline-flex items-center justify-center rounded-full bg-[#E32A18] px-6 py-3 text-white font-semibold shadow-sm transition-colors hover:bg-[#cc2515] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E32A18]"
            aria-label="Book an institutional demo"
          >
            Book an Institutional Demo
          </button>

          <button
            onClick={onAnalyticsClick}
            className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3 text-[#000000] font-semibold shadow-sm transition-colors hover:border-[#E32A18] hover:text-[#E32A18] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E32A18]"
            aria-label="See skill analytics in action"
          >
            See Skill Analytics in Action
          </button>
        </div>
      </div>
    </section>
  );
};

export default InstitutionsNeededSection;
