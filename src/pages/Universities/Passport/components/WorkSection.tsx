import { FiAward, FiBookOpen, FiShare2, FiZap } from "react-icons/fi";
import Arc1 from "../../../../../public/passport/Arc 1.svg";
import Arc2 from "../../../../../public/passport/Arc 2.svg";

export default function WorkSection() {
  const steps = [
    {
      Icon: FiAward,
      title: "Train & Verify",
      desc: "Complete accredited courses & projects",
    },
    {
      Icon: FiBookOpen,
      title: "Get Your Passport",
      desc: "Skills certified & added to your profile",
    },
    {
      Icon: FiShare2,
      title: "Share & Shine",
      desc: "Employers scan → instant trust",
    },
  ];

  const arc1Src = (Arc1 as any)?.src ?? (Arc1 as unknown as string);
  const arc2Src = (Arc2 as any)?.src ?? (Arc2 as unknown as string);

  return (
    <section className="relative py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center relative">

        {/* Top Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-black w-12 h-12 rounded-2xl flex items-center justify-center">
            <FiZap className="text-white w-5 h-5" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0B2A5A] mb-3">
          ⚡ How Skill Passport <span className="text-[#FF6B6B]">Works</span>
        </h2>
        <p className="text-sm text-gray-500 mb-16">
          3 Simple Steps to Get Verified and Future-Ready
        </p>

        {/* Steps with Arcs */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 items-start">

          {steps.map((s, idx) => {
            const Icon = s.Icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-xl border border-gray-200 bg-white">
                  <Icon className="w-7 h-7 text-[#0B2A5A]" />
                </div>

                {/* Title */}
                <h3 className="text-[#FF6B6B] font-semibold text-base md:text-lg mt-6">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 mt-2 max-w-[240px]">
                  {s.desc}
                </p>
              </div>
            );
          })}

          {/* Arc 1 */}
          <img
            src={arc1Src}
            alt="arc-1"
            className="hidden lg:block absolute top-10 left-[33%] -translate-x-1/2 w-64 lg:w-60"
          />

          {/* Arc 2 */}
          <img
            src={arc2Src}
            alt="arc-2"
            className="hidden lg:block absolute top-6 left-[66%] lg:left-[68%] -translate-x-1/2 w-64 lg:w-60"
          />
        </div>
      </div>
    </section>
  );
}
