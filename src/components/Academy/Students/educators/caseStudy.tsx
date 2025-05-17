import React, { useState } from "react";
import { Button } from "../../UI/button";
import CaseStudyCard from "./CaseStudyCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CaseStudy = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Dummy case study data for carousel
  const caseStudies = [
   
    {
      number: 1,
      companyName: "Students",
      tagline: "Gen Alpha learns by doing, not just by listening.",
      keyOutcomes: [
        "Career counselling built on psychometrics",
        "Entrepreneurship mindset sessions",
        "Spoken English + Employability Capsules",
        "Confidence-building & public speaking bootcamps"
      ],
      clientDetails: {
        title: "Entrepreneurship Skills",
        description: "Developing business acumen and innovative thinking."
      },
      challengeDetails: {
        title: "Communication",
        description: "Enhancing English fluency and presentation skills."
      },
      solutionDetails: {
        title: "Student Success Program",
        steps: [
          "Prepare your students for future careers with our hands-on learning programs"
        ]
      }
    },
    {
      number: 2,
      companyName: "Young Professionals",
      tagline: "Building tomorrow's leaders through practical experiences.",
      keyOutcomes: [
        "Career path mapping and goal setting",
        "Leadership development workshops",
        "Industry-specific skill training",
        "Networking and mentorship opportunities"
      ],
      clientDetails: {
        title: "Leadership Development",
        description: "Cultivating management skills and strategic thinking."
      },
      challengeDetails: {
        title: "Professional Growth",
        description: "Bridging the gap between education and industry demands."
      },
      solutionDetails: {
        title: "Professional Growth Program",
        steps: [
          "Comprehensive training modules designed to accelerate career advancement"
        ]
      }
    }
  ];
  
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? caseStudies.length - 1 : prevIndex - 1
    );
  };
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === caseStudies.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="w-full max-w-[1024px]  mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Proven Impact, Delivered
          </h1>
          <p className="text-base text-gray-600 max-w-2xl">
            Real stories. Real results. See how our recruitment solutions transform businesses.
          </p>
        </div>

        {/* Case Studies */}
        <div className="mb-8">
          <CaseStudyCard
            key={currentIndex}
            number={caseStudies[currentIndex].number}
            companyName={caseStudies[currentIndex].companyName}
            tagline={caseStudies[currentIndex].tagline}
            keyOutcomes={caseStudies[currentIndex].keyOutcomes}
            clientDetails={caseStudies[currentIndex].clientDetails}
            challengeDetails={caseStudies[currentIndex].challengeDetails}
            solutionDetails={caseStudies[currentIndex].solutionDetails}
            testimonial={caseStudies[currentIndex].testimonial}
          />
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center mt-8">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full w-10 h-10 border border-red-600 bg-amber-50 p-0 mr-4"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-5 w-5 text-amber-900" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full w-10 h-10 border border-amber-200 bg-amber-50 p-0"
            onClick={handleNext}
          >
            <ChevronRight className="h-5 w-5 text-amber-900" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;
