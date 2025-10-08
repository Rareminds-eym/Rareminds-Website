import { Card } from "@/components/ui/card";
import { ArrowRight, TrendingDown, Clock, EyeOff } from "lucide-react";

export const ProblemSection = () => {
  const problems = [
    {
      icon: TrendingDown,
      title: "70% of Graduates Lack Job–Ready Skills",
      description:
        "Students often graduate without the practical skills required by employers.",
      circleBg: "bg-indigo-500",
      iconColor: "text-white",
    },
    {
      icon: Clock,
      title: "Employers Spend Months Screening Candidates",
      description:
        "Without verified credentials, employers struggle to identify job-ready talent quickly.",
      circleBg: "bg-rose-500",
      iconColor: "text-white",
    },
    {
      icon: EyeOff,
      title: "Students Remain Invisible Despite Talent",
      description:
        "Many talented students don’t get opportunities because their skills are not showcased or verified",
      circleBg: "bg-sky-400",
      iconColor: "text-white",
    },
  ];

  return (
    <section className="py-20 bg-[#F9FAFB]">
      <div className="container mx-auto px-6 text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2">
          The <span className="text-[#FF6B6B]">Employability Gap</span> Nobody Talks About
        </h2>
        <p className="text-sm md:text-base text-gray-500 mt-5 mb-20">
          Degrees alone no longer guarantee jobs.  
70% of graduates lack job-ready skills.  
Employers spend months filtering candidates.  
Students remain invisible despite talent.
        </p>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <Card
                key={index}
                className="relative p-8 pt-12 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 mt-6 sm:mt-0"
              >
                {/* Circular icon that overlaps the card */}
                <div
                  className={`absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white ${problem.circleBg} ${problem.iconColor}`}
                >
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-[#0B2A5A] text-center mb-3">
                  {problem.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed text-center">
                  {problem.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Small italic line + CTA */}
        <p className="text-sm text-gray-500 italic mt-12 mb-6">
          It's time to change how skills are recognized.
        </p>

        <div className="flex justify-center">
          <button
            type="button"
            className="inline-flex items-center gap-3 bg-[#FF6B6B] hover:bg-[#ff8787] text-white px-6 py-3 rounded-full font-semibold shadow-md transition-all duration-200"
          >
            Try Skill Passport Free <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
