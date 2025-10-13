import { Database, Layers, Award, Briefcase } from "lucide-react";

const OverviewSection = () => {
  const points = [
    {
      Icon: Database,
      text: (
        <>
          <strong>The Rareminds Skill Passport</strong> is a dynamic{" "}
          <strong>talent intelligence ecosystem</strong> that captures, maps, and
          showcases every learner’s evolving skill journey.
        </>
      ),
    },
    {
      Icon: Layers,
      text: (
        <>
          It transforms every training session, project, and performance milestone
          into a <strong>living, data-driven record</strong> of capability helping
          organizations see their workforce not as static resumes, but as evolving
          portfolios of potential.
        </>
      ),
    },
    {
      Icon: Award,
      text: (
        <>
          For learners, it becomes a <strong>career growth passport&nbsp;</strong>
          highlighting certified skills, behavioral strengths, and real-world
          accomplishments that open doors to new opportunities.
        </>
      ),
    },
    {
      Icon: Briefcase,
      text: (
        <>
          For organizations, it’s a{" "}
          <strong>strategic workforce enablement tool</strong>, providing insights
          to deploy the right talent, plan learning paths, and future-proof
          capability pipelines.
        </>
      ),
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-6 text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#000000]">
          What is SkillPassport?
        </h2>
        <div className="w-24 h-1 bg-[#000000] mx-auto mt-4 mb-16 rounded-full opacity-80" />

        {/* Content */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 text-left">
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
