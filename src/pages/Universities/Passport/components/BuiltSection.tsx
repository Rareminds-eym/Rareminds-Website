//  import { Briefcase, University, GraduationCap, Settings, Box } from "lucide-react";

// const InstitutionsNeededSection = () => {


// const institutions = [
//   { Icon: University, text: "State & Private Universities" },
//   { Icon: GraduationCap, text: "Arts & Science Colleges" },
//   { Icon: Settings, text: "Engineering Colleges" },
//   { Icon: Box, text: "Polytechnic Institutes" }, // replaced Toolbox with Box
//   { Icon: Briefcase, text: "Skill Development Centres" },
// ];


//   return (
//     <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
//       <div className="max-w-6xl mx-auto">
//         {/* Top Icon */}
//         <div className="flex items-center justify-center mb-6">
//           <div className="bg-[#000000] rounded-2xl w-12 h-12 flex items-center justify-center shadow-md">
//             <Briefcase className="text-white w-6 h-6" aria-hidden />
//           </div>
//         </div>

//         {/* Title */}
//         <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-[#000000] leading-tight mb-12">
//           Built for Every Type of <span className="text-[#E32A18]">Institution</span>
//         </h2>

//         {/* Cards */}
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {institutions.map(({ Icon, text }, idx) => (
//             <div
//               key={idx}
//               className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition h-full flex flex-col items-center justify-center text-center"
//             >
//               <Icon className="w-10 h-10 text-[#E32A18] mb-4" />
//               <p className="text-gray-800 text-lg md:text-xl font-medium">{text}</p>
//             </div>
//           ))}
//         </div>

//         {/* Extra Info */}
//         <div className="mt-10 text-center max-w-3xl mx-auto">
//           <p className="text-gray-700 text-base md:text-lg">
//             The Rareminds Skill Passport integrates seamlessly with both semester-based courses
//             and short-term certifications under initiatives like{" "}
//             <span className="font-semibold text-[#E32A18]">Naan Mudhalvan</span> and{" "}
//             <span className="font-semibold text-[#E32A18]">TNSDC</span>.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default InstitutionsNeededSection;

import { Briefcase, University, GraduationCap, Settings, Box } from "lucide-react";

const InstitutionsNeededSection = () => {
  const institutions = [
    { Icon: University, title: "State & Private Universities" },
    { Icon: GraduationCap, title: "Arts & Science Colleges" },
    { Icon: Settings, title: "Engineering Colleges" },
    { Icon: Box, title: "Polytechnic Institutes" },
    { Icon: Briefcase, title: "Skill Development Centres" },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-gray-900 rounded-2xl w-12 h-12 shadow">
            <Briefcase className="w-6 h-6 text-white" aria-hidden="true" />
          </div>

          <h2 className="mt-6 text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Built for Every Type of <span className="text-[#E32A18]">Institution</span>
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Seamless integration for semester programs, short-term certifications, and skilling initiatives.
          </p>
        </div>

        {/* -- Top row (3) -- */}
        <div
          role="list"
          aria-label="Institution types"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
        >
          {institutions.slice(0, 3).map(({ Icon, title }, idx) => (
            <article
              key={idx}
              role="listitem"
              tabIndex={0}
              className="w-full max-w-[320px] h-[220px] bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-lg transition-transform duration-300 hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-[#E32A18]/20"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#E32A18]/10 text-[#E32A18] mb-4">
                <Icon className="w-7 h-7" aria-hidden="true" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 leading-snug">
                {title}
              </h3>
            </article>
          ))}
        </div>

        {/* -- Bottom row (centered two cards) -- */}
        <div className="mt-6 flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {institutions.slice(3).map(({ Icon, title }, idx) => (
              <article
                key={idx + 3}
                role="listitem"
                tabIndex={0}
                className="w-full max-w-[320px] h-[220px] bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-lg transition-transform duration-300 hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-[#E32A18]/20"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#E32A18]/10 text-[#E32A18] mb-4">
                  <Icon className="w-7 h-7" aria-hidden="true" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 leading-snug">
                  {title}
                </h3>
              </article>
            ))}
          </div>
        </div>

        {/* Extra info */}
        <div className="mt-10 text-center max-w-3xl mx-auto">
          <p className="text-gray-700 text-base md:text-lg">
            The Rareminds Skill Passport integrates seamlessly with semester-based courses and short-term
            certifications such as <span className="font-semibold text-[#E32A18]">Naan Mudhalvan</span> and{" "}
            <span className="font-semibold text-[#E32A18]">TNSDC</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InstitutionsNeededSection;
