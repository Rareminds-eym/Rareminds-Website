import React from "react";

interface ComparisonRow {
  category: string;
  whatOthersOffer: string;
  whatYouGetWithUs: string;
}

const WhyChooseRareminds: React.FC = () => {
  const comparisonData: ComparisonRow[] = [
    {
      category: "Ecosystem",
      whatOthersOffer: "Disconnected programmes",
      whatYouGetWithUs: "One connected Ecosystem",
    },
    {
      category: "Personalization",
      whatOthersOffer: "One-size-fits-all solutions",
      whatYouGetWithUs: "Personalized learning pathways",
    },
    {
      category: "Discovery",
      whatOthersOffer: "Generic assessments",
      whatYouGetWithUs: "Strengths and potential uncovered",
    },
    {
      category: "Practical Skills",
      whatOthersOffer: "Certificates claim competence",
      whatYouGetWithUs: "Make Capability Visible",
    },
    {
      category: "Learning & Development",
      whatOthersOffer: "Training for KRA",
      whatYouGetWithUs: "Ensuring KPI Success",
    },
    {
      category: "Progress",
      whatOthersOffer: "Limited performance reports",
      whatYouGetWithUs: "Opportunity & Progression Ready",
    },
  ];

  return (
    <div className="w-full py-16 md:py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose Rareminds?
          </h2>
        </div>

        {/* Comparison Table - Desktop and Tablet */}
        <div className="hidden sm:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="grid grid-cols-3 gap-0">
            {/* Column Headers */}
            <div className="bg-blue-50 px-5 py-4 border-b border-r border-gray-200">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                WHAT YOU NEED
              </h3>
            </div>
            <div className="bg-blue-50 px-5 py-4 border-b border-r border-gray-200">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center">
                <span className="text-blue-600 mr-1.5"></span> WHAT OTHERS OFFER
              </h3>
            </div>
            <div className="bg-blue-50 px-5 py-4 border-b border-gray-200">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center">
                <span className="text-green-600 mr-1.5"></span> WHAT YOU GET WITH US
              </h3>
            </div>

            {/* Rows */}
            {comparisonData.map((row, index) => (
              <React.Fragment key={index}>
                <div className={`px-5 py-5 border-r border-gray-200 bg-white ${index !== comparisonData.length - 1 ? 'border-b' : ''}`}>
                  <p className="font-semibold text-gray-900 text-base">
                    {row.category}
                  </p>
                </div>
                <div className={`px-5 py-5 border-r border-gray-200 bg-white ${index !== comparisonData.length - 1 ? 'border-b' : ''}`}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3 mt-0.5">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="9" cy="9" r="9" fill="#FEE2E2"/>
                        <path d="M12 6L6 12M6 6L12 12" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {row.whatOthersOffer}
                    </p>
                  </div>
                </div>
                <div className={`px-5 py-5 bg-white ${index !== comparisonData.length - 1 ? 'border-b border-gray-200' : ''}`}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3 mt-0.5">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="9" cy="9" r="9" fill="#10B981"/>
                        <path d="M5 9L7.5 11.5L13 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="font-semibold text-gray-900 text-sm leading-relaxed">
                      {row.whatYouGetWithUs}
                    </p>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="sm:hidden space-y-4">
          {comparisonData.map((row, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="bg-gray-50 border-b border-gray-200 p-4">
                <h3 className="font-bold text-gray-900 text-base">{row.category}</h3>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <p className="text-xs font-bold text-gray-600 mb-2 uppercase">
                    What Others Offer
                  </p>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-2 mt-0.5">
                      <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="9" cy="9" r="9" fill="#FEE2E2"/>
                        <path d="M12 6L6 12M6 6L12 12" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <p className="text-gray-600 text-sm">{row.whatOthersOffer}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-600 mb-2 uppercase">
                    What You Get With Us
                  </p>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-2 mt-0.5">
                      <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="9" cy="9" r="9" fill="#10B981"/>
                        <path d="M5 9L7.5 11.5L13 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {row.whatYouGetWithUs}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseRareminds;
