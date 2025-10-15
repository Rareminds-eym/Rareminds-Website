
// import React from "react";
// import {
//   BarChart3,
//   Target,
//   LineChart,
//   FileText,
//   Briefcase,
// } from "lucide-react";

// export default function InstitutionsBenefits() {
//   const benefits = [
//     {
//       id: 1,
//       icon: BarChart3,
//       title: "Track and measure learning outcomes institution-wide",
//       position: "top-8 left-1/2 -translate-x-1/2",
//     },
//     {
//       id: 2,
//       icon: Target,
//       title: "Quantify employability skills with accuracy",
//       position: "top-36 right-8",
//     },
//     {
//       id: 3,
//       icon: LineChart,
//       title: "Access real-time placement readiness data",
//       position: "bottom-32 right-12",
//     },
//     {
//       id: 4,
//       icon: FileText,
//       title: "Simplify accreditation and compliance reporting",
//       position: "bottom-32 left-12",
//     },
//     {
//       id: 5,
//       icon: Briefcase,
//       title:
//         "Build stronger industry-academia bridge with verified skill data",
//       position: "top-36 left-8",
//     },
//   ];

//   return (
//     // <section className="flex flex-col items-center justify-center min-h-screen bg-[#ffffff] px-6 py-20">
//     //   {/* Header */}
//     //   <div className="text-center mb-32">
//     //     <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
//     //       Benefits for <span className="text-[#E32A18]">Institutions</span>
//     //     </h2>
//     //     <p className="text-gray-600 max-w-2xl mx-auto">
//     //       Empowering Academic Excellence Through Data-Driven Insights
//     //     </p>
//     //   </div>

//     //   {/* Center Image */}
//     //   <div className="relative w-[650px] h-[650px] max-w-full">
//     //     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
//     //       <img
//     //         src="https://static.vecteezy.com/system/resources/previews/054/801/358/non_2x/logo-design-for-educational-institutions-vector.jpg"
//     //         alt="Institution"
//     //         className="w-[240px] h-[240px] object-cover rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
//     //       />
//     //     </div>

//     //     {/* Benefits */}
//     //     {benefits.map(({ id, icon: Icon, title, position }) => (
//     //       <div
//     //         key={id}
//     //         className={`absolute ${position} w-[180px] text-center z-20`}
//     //       >
//     //         <div className="flex justify-center mb-4">
//     //           <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-50 mb-4">
//     //             <Icon className="w-6 h-6 text-[#E32A18]" strokeWidth={2.2} />
//     //           </div>
//     //         </div>
//     //         <p className="text-[#2c3e50] font-semibold text-[15px] leading-snug mr-5">
//     //           {title}
//     //         </p>
//     //       </div>
//     //     ))}
//     //   </div>
//     // </section>

//     <section className="flex flex-col items-center justify-center min-h-screen bg-[#ffffff] px-6 py-16">
//   {/* Header */}
//   <div className="text-center mb-16"> {/* reduced from mb-32 */}
//     <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
//       Benefits for <span className="text-[#E32A18]">Institutions</span>
//     </h2>
//     <p className="text-gray-600 max-w-2xl mx-auto">
//       Empowering Academic Excellence Through Data-Driven Insights
//     </p>
//   </div>

//   {/* Center Image */}
//   <div className="relative w-[650px] h-[650px] max-w-full">
//     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
//       <img
//         src="https://static.vecteezy.com/system/resources/previews/054/801/358/non_2x/logo-design-for-educational-institutions-vector.jpg"
//         alt="Institution"
//         className="w-[240px] h-[240px] object-cover rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
//       />
//     </div>

//     {/* Benefits */}
//     {benefits.map(({ id, icon: Icon, title, position }) => (
//       <div
//         key={id}
//         className={`absolute ${position} w-[180px] text-center z-20`}
//       >
//         <div className="flex justify-center mb-4">
//           <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-50 mb-4">
//             <Icon className="w-6 h-6 text-[#E32A18]" strokeWidth={2.2} />
//           </div>
//         </div>
//         <p className="text-[#2c3e50] font-semibold text-[15px] leading-snug mr-5">
//           {title}
//         </p>
//       </div>
//     ))}
//   </div>
// </section>

//   );
// }


import React from "react";
import {
  BarChart3,
  Target,
  LineChart,
  FileText,
  Briefcase,
} from "lucide-react";

import institutions from "../../../../../public/passport/StepProcess/Benefits-Institutions.webp";
export default function InstitutionsBenefits() {
  const benefits = [
    {
      id: 1,
      icon: BarChart3,
      title: "Track and measure learning outcomes institution-wide",
      position: "top-8 left-1/2 -translate-x-1/2",
    },
    {
      id: 2,
      icon: Target,
      title: "Quantify employability skills with accuracy",
      position: "top-36 right-8",
    },
    {
      id: 3,
      icon: LineChart,
      title: "Access real-time placement readiness data",
      position: "bottom-32 right-12",
    },
    {
      id: 4,
      icon: FileText,
      title: "Simplify accreditation and compliance reporting",
      position: "bottom-32 left-12",
    },
    {
      id: 5,
      icon: Briefcase,
      title:
        "Build stronger industry-academia bridge with verified skill data",
      position: "top-36 left-8",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-[#ffffff] px-6 py-16">
      {/* Header */}
      <div className="text-center mb-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
          Benefits for Institutions
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Empowering Academic Excellence Through Data-Driven Insights
        </p>
      </div>

      {/* Center Image - Hidden on Mobile */}
      <div className="relative w-[800px] h-[760px] max-w-full hidden md:block mb-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 p-8">
          <img
            src={institutions}
            alt="Institution"
            className="object-cover shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
          />
        </div>

        {/* Benefits - Absolute positioning on desktop */}
        {benefits.map(({ id, icon: Icon, title, position }) => (
          <div
            key={id}
            className={`absolute ${position} w-[180px] text-center z-20`}
          >
            <div className="flex justify-center mb-4 mr-7 ml-5">
              <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-50 mb-4">
                <Icon className="w-6 h-6 text-[#E32A18]" strokeWidth={2.2} />
              </div>
            </div>
            <p className="text-[#2c3e50] font-semibold text-[15px] leading-snug mr-5">
              {title}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile View: Stacked Cards */}
      <div className="flex flex-col w-full gap-20 md:hidden mt-8">
        {benefits.map(({ id, icon: Icon, title }) => (
<div
  key={id}
  className="bg-gray-100 shadow-md border border-gray-200 rounded-xl p-5 w-full sm:w-80 flex gap-4 items-center mx-auto"
>

            <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-red-50 text-[#E32A18]">
              <Icon className="h-6 w-6" />
            </div>
            <p className="text-[#2c3e50] font-semibold text-[15px]  leading-snug">
              {title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
