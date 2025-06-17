import React, { useState } from "react";
import AcademyHeader from "@/components/Header/AcademyHeader";
import { Button } from "@/components/ui/button";
import { ArrowDown, Calendar, Download, FileText, FlipHorizontal } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { coursesData } from "./Data/coursesData";
import { Link } from "react-router-dom";

const Courses = () => {
  const isMobile = useIsMobile();
  const [showAllPrograms, setShowAllPrograms] = useState(false);
  // Transform coursesData to match your design structure
  const transformedPrograms = coursesData.map((course) => ({
    title: course.name,
    tagline: `"Transform your future with ${course.shortName}"`,
    learningPoints: [
      `Master ${course.shortName} fundamentals and core concepts`,
      "Build practical skills for real-world application",
      "Develop confidence and professional expertise",
      "Create portfolio-worthy projects and achievements"
    ],
    leadText: "This comprehensive program includes:",
    buttonText: `Explore ${course.shortName} Program`,
    buttonIcon: <FileText className="h-4 w-4" />,
    hasPdf: true,
    pdfUrl: "#",
    readMoreUrl: `/school/student/course/${course.id}`,
    courseId: course.id,
    showLoginLink: course.showLoginLink || false,
  }));

  const displayedPrograms = showAllPrograms
    ? transformedPrograms
    : transformedPrograms.slice(0, 3);

 

  return (
    <>
      <AcademyHeader />
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Heading Section */}
        <header className="pt-10 sm:pt-12 md:pt-16 pb-6 md:pb-8 px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-4 md:mb-6 leading-tight">
            Welcome to India's Most Trusted Student Skill Training Platform
          </h1>
          <p className="text-sm sm:text-md md:text-lg max-w-4xl mx-auto text-gray-700 px-2">
            Empowering students with the 4Cs of Education: Communication, Collaboration, Critical Thinking, and Creativity,
            while aligning with NEP 2020, 21st-century job market needs, and career clarity.
          </p>
        </header>
        
        <main className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {displayedPrograms.map((program, index) => (
              <div key={index} className="flex flex-col">
                <ProgramCard 
                  title={program.title}
                  tagline={program.tagline}
                  learningPoints={program.learningPoints}
                  leadText={program.leadText}
                  hasPdf={program.hasPdf}
                  pdfUrl={program.pdfUrl}
                  isMobile={isMobile}
                  readMoreUrl={program.readMoreUrl}
                  showLoginLink={program.showLoginLink}
                  courseId={program.courseId}
                />
                <div className="mt-4 flex justify-center">
                       <Link 
                    to={program.readMoreUrl}
                    className="bg-red-500 hover:bg-red-600 text-white gap-2 text-sm md:text-base w-full md:w-auto px-4 py-2 rounded flex items-center justify-center"
                  >
                    {program.buttonText} {program.buttonIcon}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {transformedPrograms.length > 3 && (
            <div className="mt-8 md:mt-12 text-center">
              <Button 
                className="bg-red-500 hover:bg-red-600 text-white gap-2"
                onClick={() => setShowAllPrograms(!showAllPrograms)}
              >
                {showAllPrograms ? "View Less Programs" : "View All Programs"} <ArrowDown className="h-4 w-4" />
              </Button>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

// ProgramCard component integrated within the same file
interface ProgramCardProps {
  title: string;
  tagline: string;
  learningPoints: string[];
  leadText: string;
  hasPdf?: boolean;
  pdfUrl?: string;
  isMobile?: boolean;
  readMoreUrl?: string;
  showLoginLink?: boolean;
  courseId?: string;
}

const ProgramCard = ({ 
  title, 
  tagline, 
  learningPoints, 
  leadText,
  hasPdf = false,
  pdfUrl = "#",
  isMobile = false,
  readMoreUrl = "#",
  showLoginLink = false,
  courseId = ""
}: ProgramCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMobileFlip = () => {
    if (isMobile) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div 
      className="relative h-[400px] sm:h-[380px] md:h-[500px] perspective"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => !isMobile && setIsFlipped(true)}
      onMouseLeave={() => !isMobile && setIsFlipped(false)}
      onClick={handleMobileFlip}
    >
      <div
        className={`w-full h-full transition-transform duration-500 ease-in-out transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front of card */}
        <div 
          className="absolute w-full h-full backface-hidden bg-white rounded-lg border border-gray-300 p-4 shadow-sm overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Arrow icon stylized to match design */}
          <div className="absolute -left-3 md:-left-5 top-10 w-10 h-10 md:w-16 md:h-16 hidden md:block">
            {/* <div className="w-full h-full bg-black transform rotate-45"></div> */}
          </div>

          <div className="ml-0 md:ml-6 h-auto">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-700 italic mb-4 md:mb-6 text-sm md:text-base">{tagline}</p>
            
            <p className="font-medium text-base md:text-lg mb-3 md:mb-4">{leadText}</p>
            
            <ul className="space-y-1 md:space-y-2 pb-10">
              {learningPoints.map((point, index) => (
                <li key={index} className="flex items-start text-sm md:text-base">
                  <span className="mr-2 text-base md:text-xl">★</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Flip hint */}
            <div className="absolute bottom-4 right-4 text-gray-400 flex items-center gap-2">
              <span className="text-xs">{isMobile ? "Tap" : "Hover"} to flip</span>
              <FlipHorizontal className="h-4 w-4" />
            </div>
          </div>
        </div>
        
        {/* Back of card */}
        <div 
          className="absolute w-full h-full backface-hidden bg-white rounded-lg border border-gray-300 p-4 shadow-sm rotate-y-180 flex flex-col justify-center items-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h3 className="text-xl font-bold mb-6">Program Details</h3>
          <p className="text-center mb-6 px-2 sm:px-4 text-sm md:text-base">
            Learn more about our {title.toLowerCase()} program and how it can help you achieve your goals.
          </p>
          {hasPdf && (
            <>
              <Link 
                to={readMoreUrl} 
                onClick={(e) => e.stopPropagation()} 
                className="text-red-600 hover:underline cursor-pointer"
              >
                Read More
              </Link>
              {/* Login link for career-counselling-psychometric */}
              {showLoginLink && courseId === "career-counselling-psychometric" && (
                <a
                  href="https://career.rareminds.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 text-blue-600 hover:underline text-sm text-center"
                >
                 Login here
                </a>
              )}
            </>
          )}
          {!hasPdf && (
            <>
              <p className="text-gray-500 italic mb-4">
                Detailed PDF coming soon!
              </p>
              <Link 
                to={readMoreUrl} 
                onClick={(e) => e.stopPropagation()} 
                className="text-red-600 hover:underline cursor-pointer"
              >
                Read More
              </Link>
              {/* Login link for career-counselling-psychometric */}
              {showLoginLink && courseId === "career-counselling-psychometric" && (
                <a
                  href="https://learning.rareminds.in/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 text-blue-600 hover:underline text-sm text-center"
                >
                  Already enrolled? Login here
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
