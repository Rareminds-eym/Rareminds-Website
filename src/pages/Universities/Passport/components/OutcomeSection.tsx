import { FiBarChart2, FiUserCheck, FiCheckCircle, FiTarget } from "react-icons/fi";

export default function OutcomeSection() {
  const steps = [
    {
      Icon: FiBarChart2,
      title: "For Institutions",
      desc: "Data-backed insights that power accreditation and performance excellence.",
    },
    {
      Icon: FiUserCheck,
      title: "For Students",
      desc: "Ownership and visibility into their lifelong learning journey.",
    },
    {
      Icon: FiCheckCircle,
      title: "For Employers",
      desc: "Transparent, verified skills — not just degrees.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Top Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#000000] w-12 h-12 rounded-2xl flex items-center justify-center shadow-md">
            <FiTarget className="text-white w-6 h-6" />
          </div>
        </div>

        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#000000]">
          The <span className="text-[#000000]">Outcome</span>
        </h2>
        <div className="w-24 h-1 bg-[#E32A18] mx-auto mt-4 mb-16 rounded-full" />

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {steps.map((s, idx) => {
            const Icon = s.Icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-between border border-gray-200 rounded-2xl shadow-sm p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 bg-white h-full"
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-50 mb-4">
                  <Icon className="w-6 h-6 text-[#E32A18]" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-[#000000] mb-3">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="text-black-600 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
