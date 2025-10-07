import React from "react";
import { FiShield, FiCheckCircle } from "react-icons/fi";
import { AiOutlineQrcode } from "react-icons/ai";
import { Lightbulb } from "lucide-react";

type Feature = {
  Icon: React.ComponentType<any>;
  title: string;
  description: string;
  circleBg: string; 
};

const FEATURES: Feature[] = [
  {
    Icon: FiShield,
    title: "Verified Training",
    description:
      "All certifications and training programs are verified by trusted institutions.",
    circleBg: "bg-rose-100 text-rose-600",
  },
  {
    Icon: AiOutlineQrcode,
    title: "QR-Enabled",
    description: "Instantly shareable with a simple scan — no paperwork, no delays.",
    circleBg: "bg-violet-100 text-violet-600",
  },
  {
    Icon: FiCheckCircle,
    title: "Trusted by All",
    description:
      "Universities and recruiters rely on Skill Passport for authentic credentials.",
    circleBg: "bg-sky-100 text-sky-600",
  },
];

export default function SolutionSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Top black rounded icon */}
        <div className="flex justify-center">
          <div className="bg-black rounded-2xl w-12 h-12 flex items-center justify-center mb-6 shadow-sm">
            <Lightbulb className="text-white w-5 h-5" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0B2A5A] leading-tight">
          Your Skills. <span className="text-[#0B2A5A]">Verified.</span>{" "}
          <span className="text-[#FF6B6B]">Portable.</span>
        </h2>

        <p className="text-sm md:text-base text-gray-500 mt-5 mb-20">
          The Skill Passport is your digital identity for employability.
        </p>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {FEATURES.map((f, i) => {
            const Icon = f.Icon;
            return (
              <div
                key={i}
                className="relative max-w-md w-full mx-auto bg-white rounded-2xl shadow-xl p-8 pt-14 flex flex-col items-center text-center transition-transform duration-200 hover:-translate-y-1 mt-6 sm:mt-0"
              >
                {/* Circular icon overlapping the top */}
                <div
                  className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-md ring-4 ring-white ${f.circleBg}`}
                >
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="mt-3 text-lg sm:text-xl font-semibold text-[#0B2A5A] mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-500">{f.description}</p>
              </div>
            );
          })}
        </div>

        {/* Small italic line */}
        <p className="text-sm text-gray-500 italic mt-8 mb-6">
          Carry your career credentials anywhere, anytime.
        </p>

        {/* CTA pill */}
        <div className="flex justify-center">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full border border-rose-200 text-rose-600 hover:bg-rose-50 transition"
          >
            See more features
          </button>
        </div>
      </div>
    </section>
  );
}
