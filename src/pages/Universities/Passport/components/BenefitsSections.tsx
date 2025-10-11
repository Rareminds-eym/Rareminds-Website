
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
