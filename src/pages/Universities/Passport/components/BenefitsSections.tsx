import { Card } from "@/components/ui/card";
import {
  Briefcase,
  GraduationCap,
  BarChart3,
  FileText,
  Target,
  Users,
  LineChart,
  Brain,
  Award,
  Lightbulb,
  Rocket,
} from "lucide-react";

const InstitutionsNeededSection = () => {
  // Benefits for Institutions
  const institutionBenefits = [
    {
      text: "Track and measure learning outcomes institution-wide.",
      icon: BarChart3,
    },
    {
      text: "Quantify employability skills with precision and accuracy.",
      icon: Target,
    },
    {
      text: "Access real-time placement readiness and performance insights.",
      icon: LineChart,
    },
    {
      text: "Simplify accreditation and compliance reporting effortlessly.",
      icon: FileText,
    },
    {
      text: "Build a stronger industry-academia bridge with verified skill data.",
      icon: Users,
    },
  ];

  // Benefits for Students
  const studentBenefits = [
    {
      text: "A personalized digital skill passport that evolves every semester.",
      icon: Award,
    },
    {
      text: "Gain clear insights into strengths, gaps, and next learning goals.",
      icon: Lightbulb,
    },
    {
      text: "Showcase verified competencies during placement interviews.",
      icon: Briefcase,
    },
    {
      text: "Get AI-powered career guidance and tailored recommendations.",
      icon: Brain,
    },
    {
      text: "Stay motivated through progress tracking and global visibility.",
      icon: Rocket,
    },
  ];

  // Card Renderer
  const renderCards = (items: { text: string; icon: any }[]) => (
    <>
      {/* First Row - 3 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {items.slice(0, 3).map(({ text, icon: Icon }, idx) => (
          <Card
            key={idx}
            className="relative w-[95%] sm:w-[300px] md:w-[320px] lg:w-[340px] min-h-[200px] bg-white rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center p-6 mt-10"
          >
            <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-[#E32A18] text-white flex items-center justify-center shadow-md ring-4 ring-white">
              <Icon className="w-6 h-6" />
            </div>
            <h4 className="text-base sm:text-lg font-medium text-gray-800 leading-relaxed mt-8 px-2">
              {text}
            </h4>
          </Card>
        ))}
      </div>

      {/* Second Row - Centered 2 Cards */}
      <div className="mt-10 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center">
          {items.slice(3).map(({ text, icon: Icon }, idx) => (
            <Card
              key={idx}
              className="relative w-[95%] sm:w-[300px] md:w-[320px] lg:w-[340px] min-h-[200px] min-w-[150px] bg-white rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center p-6 mt-10"
            >
              <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-[#E32A18] text-white flex items-center justify-center shadow-md ring-4 ring-white">
                <Icon className="w-6 h-6" />
              </div>
              <h4 className="text-base sm:text-lg font-medium text-gray-800 leading-relaxed mt-8 px-2">
                {text}
              </h4>
            </Card>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <section className="py-20 md:py-28 bg-[#F9FAFB] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Benefits of the{" "}
          <span className="text-[#000000]">Skill Passport</span>
        </h2>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-16 leading-relaxed">
          Empower institutions and students through verified, data-driven, and
          transparent skill tracking that drives real-world success.
        </p>

        {/* Institutions */}
        <div className="mb-20">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 flex items-center justify-center gap-3 mb-10">
            <Briefcase className="w-7 h-7 text-[#E32A18]" /> Benefits for Institutions
          </h3>
          {renderCards(institutionBenefits)}
        </div>

        {/* Students */}
        <div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 flex items-center justify-center gap-3 mb-10">
            <GraduationCap className="w-7 h-7 text-[#E32A18]" /> Benefits for Students
          </h3>
          {renderCards(studentBenefits)}
        </div>
      </div>
    </section>
  );
};

export default InstitutionsNeededSection;
