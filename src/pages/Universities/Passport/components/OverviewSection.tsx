import { Database, Layers, Award, Briefcase } from "lucide-react";

const OverviewSection = () => {
  const points = [
    {
      Icon: Database,
      text: (
        <>
          <strong>The Rareminds Skill Passport</strong> is a{" "}
          <strong>digital skill transcript</strong> that tracks, verifies, and
          showcases every student’s academic, technical, and behavioral
          learning milestones. It provides institutions with a comprehensive,
          real-time view of how students evolve from learning to employability.
          Think of it as a <strong>digital passport of verified skills</strong>{" "}
          and achievements that travels with every student — from campus to
          career.
        </>
      ),
    },
    {
      Icon: Layers,
      text: (
        <>
          Universities face the challenge of bridging the gap between curriculum
          outcomes and industry expectations. While grades reflect knowledge,
          they don’t always reveal real-world competency. The Rareminds Skill
          Passport helps institutions measure what truly matters:
          <ul className="list-disc ml-5 mt-2">
            <li>Skill Mastery Beyond Marks</li>
            <li>Competency Alignment to Industry Standards</li>
            <li>Career Readiness Visualization</li>
            <li>Institutional Impact Metrics</li>
          </ul>
        </>
      ),
    },
    {
      Icon: Award,
      text: (
        <>
          With <strong>data-backed insights</strong>, academic leaders can make
          informed decisions, enhance accreditation outcomes, and strengthen
          their institution’s placement success.
        </>
      ),
    },
    {
      Icon: Briefcase,
      text: (
        <>
          The Skill Passport empowers institutions to bridge the gap between
          learning and employability, providing students and faculty a clear
          roadmap of skills, milestones, and career readiness opportunities.
        </>
      ),
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#000000]">
          What is <span className="text-[#000000]">Rareminds Skill Passport</span>?
        </h2>
        <div className="w-24 h-1 bg-[#E32A18] mx-auto mt-4 mb-16 rounded-full opacity-80" />

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 text-left">
          {points.map((item, idx) => (
            <div key={idx} className="flex items-start gap-5">
              <div className="flex-shrink-0 mt-1">
                <item.Icon className="w-8 h-8 text-[#000000]" aria-hidden />
              </div>
              <p className="text-base md:text-lg leading-relaxed text-gray-700">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
