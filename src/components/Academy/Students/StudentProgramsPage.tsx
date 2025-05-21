import React, { useState } from "react";
import { Button } from "../UI/button";
import { ArrowDown, Calendar, Download, FileText, FlipHorizontal } from "lucide-react";
import { useIsMobile } from "../../../hooks/Academy/use-mobile";


interface coursecardProps {
  coursetocontact: () => void;
}


const StudentProgramsPage = ({coursetocontact}:coursecardProps) => {
  const isMobile = useIsMobile();
  
  // Original Program data for the cards
  const originalPrograms = [
    {
      title: "Spoken English & Public Speaking Bootcamps",
      tagline: "\"Speak to Lead. Speak with Confidence.\"",
      learningPoints: [
        "Communicate fluently in English in academic and social settings",
        "Deliver confident speeches, presentations, and interviews",
        "Engage in group discussions, debates, and roleplays",
        "Build vocabulary, articulation, and everyday language skills"
      ],
      leadText: "Students learn to:",
      buttonText: "Start Speaking Smart – Join the Bootcamp",
      buttonIcon: <Calendar className="h-4 w-4" />,
      hasPdf: true,
      pdfUrl: "/spoken-english-brochure.pdf",
      readMoreUrl: "/academia/coming-soon"
    },

    {
      title: "Career Counselling with Psychometric Assessments",
      tagline: "\"Guessing Your Career is Risky. Planning It Isn't.\"",
      learningPoints: [
        "Self-discovery through psychometric testing",
        "Exploring careers in AI, EVs, AgriTech, Humanities, and more",
        "SMART goal-setting and academic planning",
        "Roadmap creation with quarterly mentoring"
      ],
      leadText: "Our Career Blueprint Program for Grades 9-12 includes:",
      buttonText: "Download the Free Career Blueprint",
      buttonIcon: <Download className="h-4 w-4" />,
      hasPdf: true,
      pdfUrl: "/career-blueprint.pdf",
      readMoreUrl: "/academia/coming-soon"
    },
    {
      title: "The 3E Program: English, Employability, Entrepreneurship",
      tagline: "\"From Job Seekers to Job Creators.\"",
      learningPoints: [
        "Basic English + writing & comprehension",
        "Resume building, interviews, and digital job portals",
        "Entrepreneurship basics: business planning, marketing, and funding",
        "Financial literacy, digital skills, customer service"
      ],
      leadText: "This NSDC-aligned program combines:",
      buttonText: "View EEE Program Curriculum",
      buttonIcon: <FileText className="h-4 w-4" />,
      hasPdf: false,
      readMoreUrl: "/academia/coming-soon"
    }
  ];

  // Dummy Program data for additional programs
  const dummyPrograms = [
    // {
    //   title: "Creative Writing Workshop",
    //   tagline: "\"Unleash Your Imagination.\"",
    //   learningPoints: [
    //     "Explore different writing styles and genres",
    //     "Develop storytelling techniques",
    //     "Receive feedback on your writing",
    //     "Publish your work in a collaborative anthology"
    //   ],
    //   leadText: "In this workshop, students will:",
    //   buttonText: "Join the Creative Writing Workshop",
    //   buttonIcon: <Calendar className="h-4 w-4" />,
    //   hasPdf: true,
    //   pdfUrl: "/creative-writing-brochure.pdf",
    //   readMoreUrl: "/programs/creative-writing"
    // },
    // {
    //   title: "Digital Marketing Essentials",
    //   tagline: "\"Master the Art of Online Promotion.\"",
    //   learningPoints: [
    //     "Understand SEO, SEM, and social media marketing",
    //     "Create effective digital marketing strategies",
    //     "Analyze marketing data and metrics",
    //     "Build a personal brand online"
    //   ],
    //   leadText: "This program covers:",
    //   buttonText: "Download the Digital Marketing Guide",
    //   buttonIcon: <Download className="h-4 w-4" />,
    //   hasPdf: true,
    //   pdfUrl: "/digital-marketing-guide.pdf",
    //   readMoreUrl: "/programs/digital-marketing"
    // },
    // {
    //   title: "Introduction to Coding",
    //   tagline: "\"Start Your Journey in Tech.\"",
    //   learningPoints: [
    //     "Learn the basics of programming languages",
    //     "Build simple applications and websites",
    //     "Understand algorithms and data structures",
    //     "Collaborate on coding projects"
    //   ],
    //   leadText: "This beginner-friendly program includes:",
    //   buttonText: "Explore the Coding Program",
    //   buttonIcon: <FileText className="h-4 w-4" />,
    //   hasPdf: false,
    //   readMoreUrl: "/programs/introduction-to-coding"
    // }
  ];

  // State to track if all programs are displayed
  const [showAllPrograms, setShowAllPrograms] = useState(false);

  // Combine original and dummy programs based on the view state
  const displayedPrograms = showAllPrograms
    ? [...originalPrograms, ...dummyPrograms]
    : originalPrograms;

  return (
    <div className="min-h-screen ">
      {/* Heading Section */}
      <header className=" pt-10 sm:pt-12 md:pt-16 pb-6 md:pb-8 px-4 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-4 md:mb-6 leading-tight">
          Welcome to India's Most Trusted Student Skill Training Platform
        </h1>
        <p className="text-sm sm:text-md md:text-lg max-w-4xl mx-auto text-gray-700 px-2">
          Our training programs empower students with the 4Cs of Education—Communication, Collaboration, Critical Thinking, and 
          Creativity—while aligning with NEP 2020, 21st-century job market needs, and career clarity.
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
              />
              <div className="mt-4 flex justify-center">
                <Button onClick={coursetocontact}  className="bg-red-500 hover:bg-red-600 text-white gap-2 text-sm md:text-base w-full md:w-auto">
                  {program.buttonText} {program.buttonIcon}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 md:mt-12 text-center">
          <Button 
            className="bg-red-500 text-white gap-2"
            onClick={() => setShowAllPrograms(!showAllPrograms)}
          >
            {showAllPrograms ? "View Less Programs" : "View All Programs"} <ArrowDown className="h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
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
}

const ProgramCard = ({ 
  title, 
  tagline, 
  learningPoints, 
  leadText,
  hasPdf = false,
  pdfUrl = "#",
  isMobile = false,
  readMoreUrl = "#"
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
              {/* <Button 
                variant="outline" 
                className="flex items-center gap-2 bg-red-500 mb-4"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(pdfUrl, '_blank');
                }}
              >
                Download PDF <Download className="h-4 w-4 " />
              </Button> */}
              <a 
                href={readMoreUrl} 
                onClick={(e) => e.stopPropagation()} 
                className="text-red-600 hover:underline cursor-pointer"
              >
                Read More
              </a>
            </>
          )}
          
          {!hasPdf && (
            <>
              <p className="text-gray-500 italic mb-4">
                Detailed PDF coming soon!
              </p>
              <a 
                href={readMoreUrl} 
                onClick={(e) => e.stopPropagation()} 
                className="text-red-600 hover:underline cursor-pointer"
              >
                Read More
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProgramsPage;

