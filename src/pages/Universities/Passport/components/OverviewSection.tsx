import { Database, Layers, Award, Briefcase, LucideIcon } from "lucide-react";

type PointData = {
  id: string;
  Icon: LucideIcon;
  title?: string;
  body: string;
  highlights?: string[];
  bullets?: string[];
};

const OverviewSection = () => {
  const points: PointData[] = [
    {
      id: 'skill-passport-overview',
      Icon: Database,
      body: "is a that tracks, verifies, and showcases every student's academic, technical, and behavioral learning milestones. It provides institutions with a comprehensive, real-time view of how students evolve from learning to employability. Think of it as a and achievements that travels with every student — from campus to career.",
      highlights: [
        "The Rareminds Skill Passport",
        "digital skill transcript",
        "digital passport of verified skills"
      ],
    },
    {
      id: 'curriculum-gap-challenge',
      Icon: Layers,
      body: "Universities face the challenge of bridging the gap between curriculum outcomes and industry expectations. While grades reflect knowledge, they don't always reveal real-world competency. The Rareminds Skill Passport helps institutions measure what truly matters.",
    },
    {
      id: 'key-benefits',
      Icon: Award,
      title: "Key Benefits:",
      bullets: [
        "Skill Mastery Beyond Marks",
        "Competency Alignment to Industry Standards",
        "Career Readiness Visualization",
        "Institutional Impact Metrics",
      ],
    },
    {
      id: 'data-backed-insights',
      Icon: Briefcase,
      body: "With academic leaders can make informed decisions, enhance accreditation outcomes, and strengthen their institution's placement success. The Skill Passport empowers institutions to bridge the gap between learning and employability, providing students and faculty a clear roadmap of skills, milestones, and career readiness opportunities.",
      highlights: ["data-backed insights"],
    },
  ];

  const renderContent = (item: PointData) => {
    if (item.bullets) {
      return (
        <>
          {item.title && <strong>{item.title}</strong>}
          <ul className="list-disc ml-5 mt-2">
            {item.bullets.map((bullet, index) => (
              <li key={index}>{bullet}</li>
            ))}
          </ul>
        </>
      );
    }

    if (item.highlights && item.highlights.length > 0) {
      const parts = item.body.split(/(The Rareminds Skill Passport|digital skill transcript|digital passport of verified skills|data-backed insights)/g);
      return (
        <>
          {parts.map((part, index) => {
            if (item.highlights?.includes(part)) {
              return <strong key={index}>{part}</strong>;
            }
            return part;
          })}
        </>
      );
    }

    return item.body;
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black">
          What is <span>Rareminds Skill Passport</span>?
        </h2>
        <div className="w-24 h-1 bg-[#E32A18] mx-auto mt-4 mb-16 rounded-full opacity-80" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 text-left">
          {points.map((item) => (
            <div key={item.id} className="flex items-start gap-5">
              <div className="flex-shrink-0 mt-1">
                <item.Icon className="w-8 h-8 text-gray-700" aria-hidden="true" />
              </div>
              <div className="text-base md:text-lg leading-relaxed text-gray-700">
                {renderContent(item)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;