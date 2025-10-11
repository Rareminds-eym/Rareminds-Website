
// import { Card } from "@/components/ui/card";
// import { Briefcase, GraduationCap, CheckCircle } from "lucide-react";

// const InstitutionsNeededSection = () => {
//   const institutionBenefits = [
//     "Track and measure learning outcomes institution-wide",
//     "Quantify employability skills with accuracy",
//     "Access real-time placement readiness data",
//     "Simplify accreditation and compliance reporting",
//     "Build a stronger industry-academia bridge with verified skill data",
//   ];

//   const studentBenefits = [
//     "A personalized digital passport that grows every semester",
//     "Clear visibility into strengths, skill gaps, and next learning steps",
//     "Digital proof of competencies for placement and internship interviews",
//     "AI-based career insights and guided recommendations",
//     "Motivation to learn continuously and showcase achievements globally",
//   ];

//   const renderCards = (items) => (
//     <>
//       {/* First row - 3 cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 justify-items-center">
//         {items.slice(0, 3).map((benefit, idx) => (
//           <Card
//             key={idx}
//             className="relative w-[300px] h-[220px] bg-white rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex items-center justify-center text-center p-6"
//           >
//             <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-[#E32A18] text-white flex items-center justify-center shadow-md ring-4 ring-white">
//               <CheckCircle className="w-5 h-5" />
//             </div>
//             <h4 className="text-base md:text-lg font-medium text-gray-900 leading-snug mt-4">
//               {benefit}
//             </h4>
//           </Card>
//         ))}
//       </div>

//       {/* Second row - centered 2 cards */}
//       <div className="mt-8 flex justify-center">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
//           {items.slice(3).map((benefit, idx) => (
//             <Card
//               key={idx}
//               className="relative w-[300px] h-[220px] bg-white rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex items-center justify-center text-center p-6"
//             >
//               <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-[#E32A18] text-white flex items-center justify-center shadow-md ring-4 ring-white">
//                 <CheckCircle className="w-5 h-5" />
//               </div>
//               <h4 className="text-base md:text-lg font-medium text-gray-900 leading-snug mt-4">
//                 {benefit}
//               </h4>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </>
//   );

//   return (
//     <section className="py-20 bg-[#F9FAFB]">
//       <div className="max-w-7xl mx-auto px-6 text-center">
//         {/* Section Header */}
//         <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
//           Benefits of the <span className="text-[#E32A18]">Skill Passport</span>
//         </h2>
//         <p className="text-gray-500 text-base mb-12">
//           Empower institutions and students with verified, traceable skills.
//         </p>

//         {/* Institutions Section */}
//         <div className="mb-20">
//           <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 flex items-center justify-center gap-2 mb-10">
//             <Briefcase className="w-6 h-6 text-[#E32A18]" /> Benefits for Institutions
//           </h3>
//           {renderCards(institutionBenefits)}
//         </div>

//         {/* Students Section */}
//         <div>
//           <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 flex items-center justify-center gap-2 mb-10">
//             <GraduationCap className="w-6 h-6 text-[#E32A18]" /> Benefits for Students
//           </h3>
//           {renderCards(studentBenefits)}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default InstitutionsNeededSection;


// import { Card } from "@/components/ui/card";
// import { Briefcase, GraduationCap, CheckCircle } from "lucide-react";

// const InstitutionsNeededSection = () => {
//   const institutionBenefits = [
//     "Track and measure learning outcomes institution-wide",
//     "Quantify employability skills with accuracy",
//     "Access real-time placement readiness data",
//     "Simplify accreditation and compliance reporting",
//     "Build a stronger industry-academia bridge with verified skill data",
//   ];

//   const studentBenefits = [
//     "A personalized digital passport that grows every semester",
//     "Clear visibility into strengths, skill gaps, and next learning steps",
//     "Digital proof of competencies for placement and internship interviews",
//     "AI-based career insights and guided recommendations",
//     "Motivation to learn continuously and showcase achievements globally",
//   ];

//   const renderCards = (items: string[]) => (
//     <>
//       {/* First row - 3 cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
//         {items.slice(0, 3).map((benefit, idx) => (
//           <Card
//             key={idx}
//             className="relative w-[90%] sm:w-[280px] md:w-[300px] min-h-[220px] bg-white rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex items-center justify-center text-center p-6 mt-8 sm:mt-10"
//           >
//             <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-[#E32A18] text-white flex items-center justify-center shadow-md ring-4 ring-white">
//               <CheckCircle className="w-5 h-5" />
//             </div>
//             <h4 className="text-sm sm:text-base md:text-lg font-medium text-gray-900 leading-snug mt-6">
//               {benefit}
//             </h4>
//           </Card>
//         ))}
//       </div>

//       {/* Second row - centered 2 cards */}
//       <div className="mt-10 flex justify-center">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 justify-items-center">
//           {items.slice(3).map((benefit, idx) => (
//             <Card
//               key={idx}
//               className="relative w-[90%] sm:w-[280px] md:w-[300px] min-h-[220px] bg-white rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex items-center justify-center text-center p-6 mt-8 sm:mt-10"
//             >
//               <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-[#E32A18] text-white flex items-center justify-center shadow-md ring-4 ring-white">
//                 <CheckCircle className="w-5 h-5" />
//               </div>
//               <h4 className="text-sm sm:text-base md:text-lg font-medium text-gray-900 leading-snug mt-6">
//                 {benefit}
//               </h4>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </>
//   );

//   return (
//     <section className="py-16 sm:py-20 bg-[#F9FAFB]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
//         {/* Section Header */}
//         <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
//           Benefits of the <span className="text-[#E32A18]">Skill Passport</span>
//         </h2>
//         <p className="text-gray-500 text-sm sm:text-base mb-10 sm:mb-12">
//           Empower institutions and students with verified, traceable skills.
//         </p>

//         {/* Institutions Section */}
//         <div className="mb-16 sm:mb-20">
//           <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 flex items-center justify-center gap-2 mb-8 sm:mb-10">
//             <Briefcase className="w-6 h-6 text-[#E32A18]" /> Benefits for Institutions
//           </h3>
//           {renderCards(institutionBenefits)}
//         </div>

//         {/* Students Section */}
//         <div>
//           <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 flex items-center justify-center gap-2 mb-8 sm:mb-10">
//             <GraduationCap className="w-6 h-6 text-[#E32A18]" /> Benefits for Students
//           </h3>
//           {renderCards(studentBenefits)}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default InstitutionsNeededSection;

import { Card } from "@/components/ui/card";
import { Briefcase, GraduationCap, CheckCircle } from "lucide-react";

const InstitutionsNeededSection = () => {
  const institutionBenefits = [
    "Track and measure learning outcomes institution-wide.",
    "Quantify employability skills with precision and accuracy.",
    "Access real-time placement readiness and performance insights.",
    "Simplify accreditation and compliance reporting effortlessly.",
    "Build a stronger industry-academia bridge with verified skill data.",
  ];

  const studentBenefits = [
    "A personalized digital skill passport that evolves every semester.",
    "Gain clear insights into strengths, gaps, and next learning goals.",
    "Showcase verified competencies during placement interviews.",
    "Get AI-powered career guidance and tailored recommendations.",
    "Stay motivated through progress tracking and global visibility.",
  ];

  const renderCards = (items: string[]) => (
    <>
      {/* First Row - 3 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {items.slice(0, 3).map((benefit, idx) => (
          <Card
            key={idx}
            className="relative w-[95%] sm:w-[320px] md:w-[340px] lg:w-[360px] min-h-[250px] bg-white rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center text-center p-8 mt-10"
          >
            <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-[#E32A18] text-white flex items-center justify-center shadow-md ring-4 ring-white">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="text-base sm:text-lg md:text-l font-regular text-gray-900 leading-relaxed mt-8 px-2">
              {benefit}
            </h4>
          </Card>
        ))}
      </div>

      {/* Second Row - Centered 2 Cards */}
      <div className="mt-12 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center">
          {items.slice(3).map((benefit, idx) => (
            <Card
              key={idx}
              className="relative w-[95%] sm:w-[320px] md:w-[340px] lg:w-[360px] min-h-[250px] bg-white rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center text-center p-8 mt-10"
            >
              <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-[#E32A18] text-white flex items-center justify-center shadow-md ring-4 ring-white">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="text-base sm:text-lg md:text-l font-regular text-gray-900 leading-relaxed mt-8 px-2">
                {benefit}
              </h4>
            </Card>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <section className="py-24 md:py-32 bg-[#F9FAFB] min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Benefits of the{" "}
          <span className="text-[#E32A18]">Skill Passport</span>
        </h2>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-16 leading-relaxed">
          Empower institutions and students through verified, data-driven, and
          transparent skill tracking that drives real-world success.
        </p>

        {/* Institutions Section */}
        <div className="mb-24">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 flex items-center justify-center gap-3 mb-12">
            <Briefcase className="w-7 h-7 text-[#E32A18]" /> Benefits for Institutions
          </h3>
          {renderCards(institutionBenefits)}
        </div>

        {/* Students Section */}
        <div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 flex items-center justify-center gap-3 mb-12">
            <GraduationCap className="w-7 h-7 text-[#E32A18]" /> Benefits for Students
          </h3>
          {renderCards(studentBenefits)}
        </div>
      </div>
    </section>
  );
};

export default InstitutionsNeededSection;
