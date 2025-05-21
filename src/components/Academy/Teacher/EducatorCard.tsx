import { Book, Laptop, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const EducatorCard=()=> {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-md overflow-hidden mt-12 ">
      <div className="p-6">
        {/* Header with icon */}
        <div className="flex items-center mb-4">
          <Book className="mr-2 h-5 w-5" />
          <h2 className="text-lg md:text-4xl font-semibold">Educators</h2>
        </div>
        
        {/* Yellow box with statement and bullet points */}
        <div className="bg-amber-50 rounded-xl p-4 mb-4 border-l-4 border-[#FEF08A]">
          <p className="font-medium mb-3">AI is already teaching faster. Are we thinking deeper?</p>
          
          <div className="space-y-2">
            <div className="flex">
              <CheckCircle2 className="h-5 w-5 text-gray-600 mr-2 flex-shrink-0" />
              <span className="text-sm">Outcome-based learning methods</span>
            </div>
            <div className="flex">
              <CheckCircle2 className="h-5 w-5 text-gray-600 mr-2 flex-shrink-0" />
              <span className="text-sm">NEP-aligned pedagogy</span>
            </div>
            <div className="flex">
              <CheckCircle2 className="h-5 w-5 text-gray-600 mr-2 flex-shrink-0" />
              <span className="text-sm">Emotional intelligence in classrooms</span>
            </div>
            <div className="flex">
              <CheckCircle2 className="h-5 w-5 text-gray-600 mr-2 flex-shrink-0" />
              <span className="text-sm">Digital fluency for faculty</span>
            </div>
          </div>
        </div>
        
        {/* Skill cards */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Modern Pedagogy Card */}
          <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-amber-200">
            <div className="flex flex-col h-full">
              <div className="mb-2">
                <div className="bg-amber-50 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
                  <Book className="h-4 w-4 text-amber-500" />
                </div>
              </div>
              <h3 className="text-sm md:text-xl font-medium">Modern Pedagogy</h3>
              <p className="text-xs text-gray-500 mt-1">Interactive teaching methods that engage Gen Z learners</p>
            </div>
          </div>
          
          {/* Digital Fluency Card */}
          <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-amber-200">
            <div className="flex flex-col h-full">
              <div className="mb-2">
                <div className="bg-amber-50 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
                  <Laptop className="h-4 w-4 text-amber-500" />
                </div>
              </div>
              <h3 className="text-sm md:text-xl font-medium">Digital Fluency</h3>
              <p className="text-xs text-gray-500 mt-1">Essential tech skills for modern education management</p>
            </div>
          </div>
        </div>
        
        {/* Faculty Development Program */}
        <div className="bg-gradient-to-r from-[#FEF9C3] to-[#FEF08A] rounded-xl p-4">
          <h3 className="text-sm md:text-xl font-medium mb-1">Faculty Development Program</h3>
          <p className="text-xs text-gray-700 mb-3">
            Transform your teaching methods with our comprehensive 5-day FDP designed for the digital age
          </p>
          <a 
            href="#" 
            className="text-xs inline-flex items-center md:text-xl font-bold"
          >
            View 5-Day FDP Calendar →
          </a>
         
        </div>
      </div>
    </div>
  );
}

export  default EducatorCard;
