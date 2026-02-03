import personImage from "../../assets/v.jpg"; // example image import
import ps1 from "../../assets/sr.jpg";
import ps2 from "../../assets/s.jpg"
import ps3 from "../../assets/la.jpg"
import ps4 from "../../assets/l.jpg"
import ps5 from "../../assets/LB.jpg"

export default function LeadershipTeam() {
  const leaders = [
    {
      name: "Dr. SUBHASHINI RAMASWAMY",
      title: "Founder & CEO",
      description:
        "Visionary leader, redefining India's Skill and Employability landscape.",
      image: ps1,
    },
    {
      name: "VISAKH MADHU",
      title: "Director HR",
      description: "Aligning people, performance, and purpose.",
      image: personImage,
    },
    {
      name: "LABHITHA BORA",
      title: "Chief Growth & Innovation Officer",
      description:
        "Driving large-scale growth and implementation excellence",
      image: ps5,
    },
    {
      name: "SANDHYARANI",
      title: "Lead - L&D",
      description:
        "Driving learning and excellence, from grass root to the top",
      image: ps2,
    },
    {
      name: "KRISHNALATHA",
      title: "Lead - Growth & Partnerships",
      description: "Bridging talent and opportunity through strategic partnerships.",
      image: ps3,
    },
    {
      name: "LALITHA",
      title: "Project Manager",
      description:
        "Building future ready work-force by bringing the change at School level.",
      image: ps4,
    },
  ];

  return (
    <>
      {/* Inline Media Query for responsive spacing */}
      <style>{`
        @media (min-width: 640px) and (max-width: 767px) {
          div.leadership-grid {
            row-gap: 20px !important;
            column-gap: 1px !important;
          }
          .leadership-section {
            margin-top: -3rem !important;
          }
        }
      `}</style>

      <div className="leadership-section min-h-screen bg-gradient-to-b from-white to-gray-50 mb-28 md:mb-52 px-6 -mt-2 md:-mt-16">
        <div className="max-w-7xl mx-auto px-0 md:px-2">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Led by Purpose. <span className="text-[#E32A18]">Driven by People.</span>
            </h1>
            <div className="w-24 h-1 bg-[#E32A18] mx-auto mt-4 mb-6 rounded-full" />
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our leadership team represents education, operations, and human
              capital at their best — united by a shared belief: skill
              transforms lives.
            </p>
          </div>

          {/* Grid */}
          <div
            className="
              leadership-grid
              grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
              gap-8 md:gap-10 lg:gap-12
              justify-items-center
            "
          >
            {leaders.map((leader, index) => (
              <div
                key={index}
                className="
                  relative group
                  w-full max-w-[320px] sm:w-72 md:w-80
                  bg-white rounded-2xl
                  border-2 border-gray-200
                  hover:border-[#E32A18]
                  shadow-md hover:shadow-2xl
                  transition-all duration-300 ease-in-out
                  hover:-translate-y-2
                  overflow-hidden
                "
              >
                {/* Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E32A18] to-[#ff6b6b] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-10" />

                {/* Image Section */}
                <div className="relative bg-gradient-to-b from-gray-50 to-white pt-8 pb-4 px-6">
                  <div className="flex justify-center">
                    <div
                      className="
                        relative w-40 h-48 rounded-2xl overflow-hidden
                        border-4 border-white shadow-lg
                        transform transition-all duration-300
                        group-hover:scale-105 group-hover:shadow-xl
                      "
                    >
                      {leader.image ? (
                        <img
                          src={leader.image}
                          alt={leader.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <svg
                            className="w-16 h-16 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#E32A18]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="bg-white px-6 py-6 text-center">
                  <h3 className="font-bold text-base md:text-lg text-gray-900 mb-2 leading-tight uppercase tracking-wide">
                    {leader.name}
                  </h3>
                  <div className="inline-block px-4 py-1 bg-[#E32A18]/10 rounded-full mb-3">
                    <p className="text-[#E32A18] text-xs md:text-sm font-semibold">
                      {leader.title}
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {leader.description}
                  </p>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E32A18]/30 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
