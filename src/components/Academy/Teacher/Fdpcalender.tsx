
import { Calendar, BookOpen } from "lucide-react";
import { Button } from "../UI/button";

interface FdpcalenderProps {
  Facultytocontact: () => void;
}

const Fdpcalender = ({ Facultytocontact }: FdpcalenderProps) => {
  return (
    
    <div className="min-h-screen bg-white flex flex-col items-center py-10 px-4 md:px-6" data-aos="fade-left">
      <div className="w-full max-w-6xl mt-10">
        <div className="text-center mb-12">
          <h1 className="text-lg md:text-4xl  font-bold mb-2">Pick from Ready-to-Run TDP Calendars</h1>
          <p className="text-gray-600 text-8px">Choose the perfect faculty development program format for your institution</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* 3-Day Intensive TDP Card */}
          <div className="border rounded-lg p-6 flex flex-col h-full animate-fade-in hover:scale-105 transition-transform duration-200">
            <div className="flex justify-center mb-6">
              <div className="w-auto h-auto  rounded-full flex items-center justify-center">
             
                <div className="w-auto h-auto ">
                 <img src="/academy/3-Day Intensive TDP.svg" alt="" className="w-[100px] h-[100px]" />
                </div>
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-center mb-2">3-Day Intensive TDP</h2>
            <p className="text-gray-600 text-5px text-center mb-6">
              Quick-impact, high-energy program focused on essential teaching techniques for the digital classroom
            </p>
            
            <div className="mb-6">
              <p className="font-medium mb-3">Program Includes:</p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center mr-3">
                    <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                  </div>
                  <span>Digital Tools Workshop</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center mr-3">
                    <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                  </div>
                  <span>Student Engagement Tactics</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full border-2 border-black  flex items-center justify-center mr-3">
                    <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                  </div>
                  <span>Assessment Redesign</span>
                </div>
              </div>
            </div>
            
            <div className="mt-auto">
            <a
  href="/academy/pdfs/3_Day.pdf" // path to your PDF
  target="_blank"
  rel="noopener noreferrer"
  className="w-full"
>
  <Button 
    variant="outline" 
    className="w-full flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-105"
  >
    <Calendar className="w-4 h-4" />
    Download Calendar
  </Button>
</a>



              
            </div>
          </div>
          
          {/* 5-Day NEP Mastery TDP Card */}
          <div className="border rounded-lg p-4 flex flex-col h-full animate-fade-in hover:scale-105 transition-transform duration-200">
              <div className="flex justify-center mb-6">
              <div className="w-auto h-auto  rounded-full flex items-center justify-center">
             
                <div className="w-auto h-auto ">
                 <img src="/academy/5-Day TDP Calendar (Customizable).svg" alt="" className="w-[100px] h-[100px]" />
                </div>
              </div>
            </div>
            <h2 className="text-xl font-bold text-center mb-2">5-Day NEP Mastery TDP</h2>
            <p className="text-gray-600 text-center text-5px mb-6">
              Comprehensive program covering NEP principles, implementation strategies and pedagogical transformation
            </p>
            
            <div className="mb-6">
              <p className="font-medium mb-3">Program Includes:</p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center mr-3">
                    <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                  </div>
                  <span className=" ">NEP Framework Deep-Dive</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center mr-3">
                    <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                  </div>
                  <span>Skill-Based Teaching</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center mr-3">
                    <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                  </div>
                  <span>Project-Based Learning</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center mr-3">
                    <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                  </div>
                  <span>Outcome Mapping</span>
                </div>
              </div>
            </div>
            
            <div className="mt-auto">
            <a
  href="/academy/pdfs/5_Day.pdf" // path to your PDF
  target="_blank"
  rel="noopener noreferrer"
  className="w-full"
>
  <Button 
    variant="outline" 
    className="w-full flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-105"
  >
    <Calendar className="w-4 h-4" />
    Download Calendar
  </Button>
</a>

            </div>
          </div>





           {/* 5-Day NEP Mastery TDP Card */}
           <div className="border rounded-lg p-4 flex flex-col h-full animate-fade-in hover:scale-105 transition-transform duration-200">
             <div className="flex justify-center mb-6">
              <div className="w-auto h-auto  rounded-full flex items-center justify-center">
             
                <div className="w-auto h-auto ">
                 <img src="/academy/Weekend Program -Reimagining Education with Transformational Leadership.svg" alt="" className="w-[100px] h-[100px]" />
                </div>
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-center mb-2">Weekend Program for School Leaders</h2>
            <p className="text-gray-600 text-center text-5px mb-6">
           Reimagining Education with Transformational Leadership


            </p>
            
            <div className="mb-6">
              <p className="font-medium mb-3">Program Includes:</p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center mr-3">
                    <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                  </div>
                  <span className=" ">NEP Framework and Objectives</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center mr-3">
                    <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                  </div>
                  <span>Technology Integration to accelerate future-forward learning.</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center mr-3">
                    <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                  </div>
                  <span>Building empowered educator communities.</span>
                </div>
              
              </div>
            </div>
            
            <div className="mt-auto">
            <a
  href="/academy/pdfs/Weekend_Program.pdf" // path to your PDF
  target="_blank"
  rel="noopener noreferrer"
  className="w-full"
>
  <Button 
    variant="outline" 
    className="w-full flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-105"
  >
    <Calendar className="w-4 h-4" />
    Download Calendar
  </Button>
</a>

            </div>
          </div>
        </div>
        
        <div className="mt-10 flex justify-center">
          <Button onClick={Facultytocontact}
            className="bg-red-500 hover:bg-red-600 text-white px-6 shadow-lg animate-fade-in scale-in transition-transform duration-200 hover:scale-105"
          >
            Get My TDP Calendar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Fdpcalender;
