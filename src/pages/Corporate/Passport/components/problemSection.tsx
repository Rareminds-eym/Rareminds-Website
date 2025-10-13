import { Card } from "@/components/ui/card";
import { ArrowRight, BadgeCheck, FileBarChart2, EyeOff } from "lucide-react";

export const ProblemSection = ({ onDemoClick }: { onDemoClick: () => void }) => {
  const problems = [
    {
      icon: BadgeCheck,
      title: "Skills Without Proof",
      description:
        "70% of graduates lack visible, validated job-ready skills. Training happens everywhere — but without standardized records, employers can’t verify capability beyond a resume.",
      circleBg: "bg-indigo-500",
      iconColor: "text-white",
    },
    {
      icon: FileBarChart2,
      title: "Data Without Context",
      description:
        "Traditional systems track attendance, not ability. Time and completion data don’t tell who can do what. Organizations waste hours screening for skills they already trained for.",
      circleBg: "bg-rose-500",
      iconColor: "text-white",
    },
    {
      icon: EyeOff,
      title: "Talent Without Visibility",
      description:
        "Skilled learners remain unseen. Without a single, live source of truth, employees lose opportunities — and  organizations lose great talent. Managing Resources better - With Skill Passport.",
      circleBg: "bg-sky-400",
      iconColor: "text-white",
    },
  ];

  return (
    <section className="py-20 bg-[#F9FAFB]">
      <div className="container mx-auto px-6 text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#000000] mb-4">
          It’s Not the Employability Gap — It’s the Visibility Gap.
        </h2>
        <p className="text-sm md:text-base text-gray-500 mb-16">
         The right talent isn’t found through resumes — it’s revealed through skills.
        </p>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <Card
                key={index}
                className="relative p-8 pt-12 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 mt-6 md:mt-6 lg:mt-0"
              >
                {/* Circular icon that overlaps the card */}
                <div
                  className={`absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white ${problem.circleBg} ${problem.iconColor}`}
                >
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-[#000000] text-center mb-3">
                  {problem.title}
                </h3>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed text-center">
                  {problem.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Small italic line + CTA */}
        <p className="text-sm text-gray-500 italic mt-12 mb-6">
          It's time to change how skills are recognized & resources are managed.
        </p>

        <div className="flex justify-center">
          <button
            onClick={onDemoClick}
            type="button"
            className="inline-flex items-center gap-3 bg-[#E32A18] hover:bg-[#cc2515] text-white px-6 py-3 rounded-full font-semibold shadow-md transition-all duration-200"
          >
            See How It Works <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
