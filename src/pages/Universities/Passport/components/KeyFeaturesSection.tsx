import { Eye, BadgeCheck, LineChart, Route, Layers, FileCheck2, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const keyFeatures = [
  {
    Icon: Eye,
    title: "Student Skill Profiles",
    subtitle: "Personalized, shareable skill passports",
    description:
      "Each student receives a personalized, shareable digital passport of verified skills.",
  },
  {
    Icon: BadgeCheck,
    title: "Outcome Mapping",
    subtitle: "Align courses with competency frameworks",
    description:
      "Aligns every course and program to specific skill and competency frameworks.",
  },
  {
    Icon: LineChart,
    title: "Institution Dashboard",
    subtitle: "Visualize progress in real time",
    description:
      "Visualize progress across departments, batches, and programs in real time.",
  },
  {
    Icon: Route,
    title: "Placement Readiness Score",
    subtitle: "AI-driven employability evaluation",
    description:
      "AI-driven evaluation of employability readiness for every student.",
  },
  {
    Icon: Layers,
    title: "Certificate Integration",
    subtitle: "Auto-sync with certifications",
    description:
      "Auto-sync with Rareminds, Naan Mudhalvan, or any LMS-based certification programs.",
  },
  {
    Icon: FileCheck2,
    title: "Reporting Tools",
    subtitle: "Export analytics for compliance",
    description:
      "Export analytics for NAAC, NIRF, AICTE, and TNSDC reports.",
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
    aria-labelledby={`feature-${title}`}
  >
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFECEC]">
        <Icon className="h-6 w-6 text-[#E32A18]" strokeWidth={2} aria-hidden />
      </div>
      <div className="flex-1">
        <h3
          id={`feature-${title}`}
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

export default function KeyFeaturesSection() {
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
          Key <span className="text-[#E32A18]">Features</span>
        </h2>

        <p className="text-gray-500 text-sm md:text-base max-w-3xl mx-auto mb-8">
          Explore the essential capabilities of the Skill Passport platform that empower institutions and students alike.
        </p>

        {/* Features Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {keyFeatures.map((item, idx) => (
            <Card key={item.title ?? idx} {...item} />
          ))}
        </div>

        {/* Result Note */}
      </div>
    </section>
  );
}
