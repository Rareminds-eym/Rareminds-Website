import { CheckCircle2, Lightbulb, MessageSquare, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

 const StudentCard=() => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-md overflow-hidden mt-12  mb-12">
    <div className="p-6">
      {/* Header with icon */}
      <div className="flex items-center mb-4">
        <GraduationCap className="mr-2 h-5 w-5" />
        <h2 className="text-lg md:text-4xl font-semibold">Students</h2>
      </div>
      
      {/* Yellow box with statement and bullet points */}
      <div className="bg-amber-50 rounded-xl p-4 mb-4 border-l-4 border-[#FEF08A]">
        <p className="font-medium mb-3">Gen Alpha learns by doing, not just by listening.</p>
        
        <div className="space-y-2">
          <div className="flex">
            <CheckCircle2 className="h-5 w-5 text-gray-600 mr-2 flex-shrink-0" />
            <span className="text-sm">Career counselling built on psychometrics</span>
          </div>
          <div className="flex">
            <CheckCircle2 className="h-5 w-5 text-gray-600 mr-2 flex-shrink-0" />
            <span className="text-sm">Entrepreneurship mindset sessions</span>
          </div>
          <div className="flex">
            <CheckCircle2 className="h-5 w-5 text-gray-600 mr-2 flex-shrink-0" />
            <span className="text-sm">Spoken English + Employability Capsules</span>
          </div>
          <div className="flex">
            <CheckCircle2 className="h-5 w-5 text-gray-600 mr-2 flex-shrink-0" />
            <span className="text-sm">Confidence-building & public speaking bootcamps</span>
          </div>
        </div>
      </div>
      
      {/* Skill cards */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Entrepreneurship Card */}
        <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-amber-200">
          <div className="flex flex-col h-full">
            <div className="mb-2">
              <div className="bg-amber-50 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
                <Lightbulb className="h-4 w-4 text-amber-500" />
              </div>
            </div>
            <h3 className="text-sm md:text-xl font-medium">Entrepreneurship Skills</h3>
            <p className="text-xs text-gray-500 mt-1">Developing business acumen and innovative thinking</p>
          </div>
        </div>
        
        {/* Communication Card */}
        <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-amber-200">
          <div className="flex flex-col h-full">
            <div className="mb-2">
              <div className="bg-amber-50 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
                <MessageSquare className="h-4 w-4 text-amber-500" />
              </div>
            </div>
            <h3 className="text-sm md:text-xl font-medium">Communication</h3>
            <p className="text-xs text-gray-500 mt-1">Enhancing English fluency and presentation skills</p>
          </div>
        </div>
      </div>
      
      {/* Student Success Program */}
      <div className="bg-gradient-to-r from-[#FEF9C3] to-[#FEF08A] rounded-xl p-4">
        <h3 className="text-sm font-medium md:text-xl mb-1">Student Success Program</h3>
        <p className="text-xs text-gray-700 mb-3">
          Prepare your students for future careers with our hands-on learning programs
        </p>
        <a 
          href="#" 
          className="text-xs inline-flex md:text-xl items-center font-medium"
        >
          Explore Student Programs →
        </a>
      </div>
    </div>
  </div>
  );
}

export default StudentCard;