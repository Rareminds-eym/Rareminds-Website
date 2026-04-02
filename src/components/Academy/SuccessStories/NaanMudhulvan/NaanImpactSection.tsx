
import React from "react";
import { 
  Users, 
  CheckCircle, 
  Lightbulb, 
  Building2, 
  MessageSquare 
} from "lucide-react";

interface ImpactSection {
  title: string;
  content: string;
}

interface NaanImpactSectionProps {
  impactSection: ImpactSection;
}

interface ImpactCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Arc curves UPWARD (∩ shape) — NO white fill, just the border stroke
const ArcNotch: React.FC = () => (
  <svg
    className="absolute left-1/2 -translate-x-1/2 overflow-visible pointer-events-none"
    style={{ top: "-35px" }}
    width="60"
    height="35"
    viewBox="0 0 70 35"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Only the ∩ arc stroke — no fill at all */}
    <path
      d="M0,35 A35,35 0 0,1 70,35"
      fill="none"
      stroke="#d1d5db"
      strokeWidth="1"
    />
  </svg>
);

const NaanImpactSection: React.FC<NaanImpactSectionProps> = ({ impactSection }) => {
  const parseImpactData = (content: string): ImpactCard[] => {
    const cards: ImpactCard[] = [];
    
    const studentsMatch = content.match(/(\d+,?\d*)\s+students.*trained/i);
    if (studentsMatch) {
      cards.push({
        title: `${studentsMatch[1]} students trained`,
        description: "Through structured, mentor-led sessions across various universities in Tamil Nadu.",
        icon: <Users className="w-5 h-5 text-blue-500" />
      });
    }
    
    if (content.includes("completed comprehensive final projects")) {
      cards.push({
        title: "100% project completion",
        description: "All participants completed comprehensive final projects, demonstrating practical application of their learning.",
        icon: <CheckCircle className="w-5 h-5 text-blue-500" />
      });
    }
    
    if (content.includes("hackathons") && content.includes("innovation")) {
      cards.push({
        title: "High hackathon engagement",
        description: "Mandatory hackathons foster innovation, critical thinking, and collaborative problem-solving.",
        icon: <Lightbulb className="w-5 h-5 text-blue-500" />
      });
    }
    
    if (content.includes("employability") || content.includes("placement")) {
      cards.push({
        title: "Strengthened employability",
        description: "Integrated placement, internship, hackathon support initiatives.",
        icon: <Building2 className="w-5 h-5 text-blue-500" />
      });
    }
    
    if (content.includes("institutional feedback") || content.includes("TNSDC")) {
      cards.push({
        title: "Positive institutional feedback",
        description: "TNSDC and partner universities highlighted increased student engagement, curiosity, and application-based learning.",
        icon: <MessageSquare className="w-5 h-5 text-blue-500" />
      });
    }
    
    return cards;
  };

  const impactCards = parseImpactData(impactSection.content);

  return (
    <div className="min-h-screen bg-white py-3 px-6">
      {/* Title */}
      <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-900 mb-16">
        {impactSection.title}
      </h1>
      
      {/* Impact Cards Grid */}
      <div className="max-w-6xl mx-auto">

        {/* ===================== DESKTOP (xl = 1280px+): Top 3 + Bottom 2 ===================== */}
        {/* Top Row - 3 cards */}
        <div className="hidden xl:grid xl:grid-cols-3 gap-6 mb-16">
          {impactCards.slice(0, 3).map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border-2 border-gray-300 p-5 shadow-sm relative"  // p-8 → p-5
            >
              <ArcNotch />
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shadow-sm">
                  {card.icon}
                </div>
              </div>
              <div className="pt-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{card.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{card.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Row - 2 cards centered */}
        <div className="hidden xl:grid xl:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {impactCards.slice(3, 5).map((card, index) => (
            <div
              key={index + 3}
              className="bg-white rounded-2xl border-2 border-gray-300 p-5 shadow-sm relative"  // p-8 → p-5
            >
              <ArcNotch />
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shadow-sm">
                  {card.icon}
                </div>
              </div>
              <div className="pt-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{card.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{card.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ===================== MOBILE + TABLET + LG (up to 1279px): 1 col → 2 cols ===================== */}
        <div className="xl:hidden">
          {/* First 4 cards in 2-col grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-6 md:gap-y-16 mb-16">
            {impactCards.slice(0, 4).map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border-2 border-gray-300 p-4 md:p-8 shadow-sm relative"
              >
                <ArcNotch />
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shadow-sm">
                    {card.icon}
                  </div>
                </div>
                <div className="pt-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{card.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{card.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 5th card centered */}
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl border-2 border-gray-300 p-4 md:p-8 shadow-sm relative w-full md:w-1/2">
              <ArcNotch />
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shadow-sm">
                  {impactCards[4]?.icon}
                </div>
              </div>
              <div className="pt-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{impactCards[4]?.title}</h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{impactCards[4]?.description}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NaanImpactSection;