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
  // Modal state and form fields
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!name || !email || !phone) {
      setErrorMsg("All fields are required.");
      return;
    }
    setLoading(true);
    try {
      // Simulate API call or validation here if needed
      // Download PDF
      if (selectedProgram && selectedProgram.pdfUrl && selectedProgram.pdfUrl !== "#") {
        const link = document.createElement("a");
        link.href = selectedProgram.pdfUrl;
        link.download = `${selectedProgram.title}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      setModalOpen(false);
      setName("");
      setEmail("");
      setPhone("");
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AcademyHeader />
      <div className="min-h-screen bg-gray-50 pt-20 isolate"> {/* Added isolate */}
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
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white gap-2 text-sm md:text-base w-full md:w-auto px-4 py-2 rounded flex items-center justify-center"
                    onClick={() => {
                      setSelectedProgram(program);
                      setModalOpen(true);
                    }}
                  >
                    {program.buttonText} {program.buttonIcon}
                  </button>
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
        {/* Modal */}
        {modalOpen && (
          <div className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative z-[100000]">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                aria-label="Close modal"
              >
                ✕
              </button>
              <h3 className="text-xl font-semibold mb-4">Please enter your details</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-1 font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block mb-1 font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit phone number"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                {errorMsg && <p className="text-red-600">{errorMsg}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded transition-colors ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {loading ? "Submitting..." : "Submit & Download"}
                </button>
              </form>
            </div>
          </div>
        )}
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
