import React from "react";
import { BadgeCheck, Eye, FileCheck2, Lightbulb } from "lucide-react";

type Feature = {
  Icon: React.ComponentType<any>;
  title: string;
  description: string;
  circleBg: string;
};

const FEATURES: Feature[] = [
  {
    Icon: Eye,
    title: "Visible",
    description:
      "Every training, project, and assessment translates into a skill badge giving you a real-time, visual snapshot of what each learner or employee can do. No more hidden potential or guesswork you see skills evolve, team by teamk.",
    circleBg: "bg-indigo-100 text-indigo-600",
  },
  {
    Icon: BadgeCheck,
    title: "Verifiable",
    description:
      "Each skill is backed by verified evidence assessments, mentor validations, and project outcomes certified by Rareminds. This ensures every badge on the Skill Passport is authentic, credible, and aligned with industry standards.",
    circleBg: "bg-emerald-100 text-emerald-600",
  },
  {
    Icon: FileCheck2,
    title: "Valuable",
    description:
      "Verified skills become valuable data for your organization enabling smarter hiring, targeted upskilling, and transparent performance mapping. With the Skill Passport, learning outcomes convert into measurable business impact.",
    circleBg: "bg-rose-100 text-rose-600",
  },
];

const SolutionSection = () => {
  return (
    <section className="py-20 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Top Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#000000] rounded-2xl w-12 h-12 flex items-center justify-center shadow-md">
            <Lightbulb className="text-white w-5 h-5" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#000000] leading-tight mb-4">
          Skills <span className="text-[#000000]">Visible</span>,{" "}
          <span className="text-[#000000]">Verifiable</span>,{" "}
          <span className="text-[#E32A18]">Valuable</span>
        </h2>

        <p className="text-gray-500 text-sm md:text-base mb-16">
          In today’s data-driven talent landscape, skills speak louder than certificates. 
          The Skill Passport makes every learner’s capability Visible, Verifiable, and Valuable — 
          helping organizations measure what truly matters.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {FEATURES.map((f, i) => {
            const Icon = f.Icon;
            return (
              <div
                key={i}
                className={`relative bg-white rounded-2xl shadow-lg p-8 h-full flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  i % 2 === 1 ? "lg:mt-10" : ""
                }`}
              >
                {/* Icon circle */}
                <div
                  className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-md ring-4 ring-white ${f.circleBg}`}
                >
                  <Icon className="w-8 h-8" />
                </div>

                <h3 className="mt-10 text-xl font-semibold text-[#000000] mb-3">
                  {f.title}
                </h3>

                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Tagline */}
        <p className="text-sm md:text-base text-gray-500 italic mt-20 mb-6">
          Turning invisible capabilities into visible, verifiable, and valuable talent intelligence.
        </p>
      </div>
    </section>
  );
};

export default SolutionSection;
