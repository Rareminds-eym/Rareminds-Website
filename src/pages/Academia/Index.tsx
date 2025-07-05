// import MainLayout from "./MainLayout";
// import MethodCard from "./Teacher/MethodCard";
// import MethodCardR from "./Students/MethodCard"
// import { Card } from "@/components/ui/card";
// import { Check } from "lucide-react";
// import StudentCardR from "./Students/StudentCard"
// import EducatorCard from "./Teacher/EducatorCard";
// import { Book, Calendar, Circle, Users } from "lucide-react";
// import StatsShowcase from "./Teacher/StatsShowcase";
// import ProgramCard from "./Students/ProgramCard";
// import Logos from"./Logos";
// import FacultyTransformation from "./Teacher/FacultyTransformation";
// import Fdpcalender from "./Teacher/Fdpcalender";
// import FAQ from "./Teacher/FAQ"
// import FacultyForm from "./Teacher/FacultyForm";
// import ResourcesPage from "./Teacher/ResourcesPage";
// import ResourceDownloadForm from "./Teacher/ResourceDownloadForm";
// import Testimonials from "./Teacher/TestimonialSlider";
// import TestimonialsStudent from "./Students/Testimonials"
// import VideoCarousel from "./VideoCarousel";


// const Academy = ({ userType = "teacher" }: { userType?: "teacher" | "student" }) => {

//   const stats = [
//     { icon: Book, value: "20,000+", label: "Faculty Trained" },
//     { icon: Users, value: "100+", label: "Schools Onboarded" },
//     { icon: Calendar, value: "250+", label: "Pilots Deployed" },
//     { icon: Circle, value: "92%", label: "Faculty Satisfaction Rate" },
//   ];
  
//   return (
//     <MainLayout>
//       {/* Hero Banner (90% width) */}
//       <div className="w-full h-[65vh]  ">
//         {/* <div className="h-full flex items-center justify-center">
//           <h1 className="text-4xl font-bold text-white"></h1>
//         </div> */}
//         {/* <VideoCarousel /> */}
//       </div>

//       <div className="w-full  bg-gradient-to-r  ">
//         <div className="h-[80%]  bg-white justify-center">

//           <h2 className="text-4xl font-bold text-black text-center pt-16">Why Schools Must <span className="text-yellow-400">Shift Now</span> </h2>
          
//           <h4 className="text-1xl font-bold text-black text-center pb-6">Traditional curriculum ≠ Future Careers </h4>

//           <div className="w-full  bg-white flex">
//                      <div className="w-[50%] h-[50%]  flex justify-center items-center py-4">
//                       <img src="/images/academy/board.png" alt="" className="w-[50%]" />
//                      </div>
//                      <div className="w-[50%] h-full flex justify-center items-center py-4">
//                      <img src="/images/academy/ai.png" alt="" className="w-[50%]" />
//                      </div>
//           </div>
//         </div>
        
//         {/* <div className="h-[20%] flex items-center justify-center">
         
//           <h1 className="text-3xl font-bold text-black text-center">Why Traditional Teaching <span className="text-yellow-400"> No Longer Works </span> </h1>
//         </div> */}
//         <div
//   className=" h-56 flex items-center justify-center bg-cover bg-center  "
//   style={{ backgroundImage: `url('/images/academy/Cloud.png')` }}
// >
//  <div className="w-full h-full flex items-center justify-center ">
//  <h1 className="lg:text-3xl  text-2xl font-bold text-black  p-2 rounded pt-12">
//     Why Traditional Teaching <span className="text-yellow-400">No Longer Works</span>
//   </h1>
//  </div>
// </div>

//       </div>


//       <div className="w-full h-auto flex justify-center">
//   <img src="/images/academy/books.png" alt="" className="w-[30%] mx-auto opacity-85 " />
  
// </div>


//       {/* Two Column Layout with 3% gap */}
//       <div className="grid grid-cols-[47%_4%_47%] gap-0 ">
//         {/* Left Column */}
//         <div className="space-y-4">
//         <MethodCard />
//         </div>

//         {/* Middle Gap Section with Paper Effect */}
//         <div className=" bg-opacity-50 ">
//           <div className="w-full h-full border-l border-r border-gray-200 opacity-50"></div>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-4">
//         <MethodCardR />
//         </div>
//       </div>








//       <div className=" w-full flex items-center justify-center bg-white p-4 pt-0 ">
//       <Card className="max-w-[600px] w-full p-8 bg-[#FFFBEB] border-l-4 border-l-yellow-400 border-t-0 border-r-0 border-b-0">
//         <h2 className="text-xl font-medium mb-6 text-left">
//           The education landscape is changing:
//         </h2>
//         <ul className="space-y-4">
//           {[
//             'Gen Z needs engaging, real-world learning experiences',
//             'NeP navigates self-based pedagogy for future-ready students',
//             'Digital-first classrooms demand tech-savvy faculty'
//           ].map((point, index) => (
//             <li key={index} className="flex items-start gap-3 text-left">
//               <Check className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
//               <span className="text-gray-700 text-base">{point}</span>
//             </li>
//           ))}
//         </ul>
//         <p className="mt-8 text-center italic text-gray-800">
//           "Students are changing. Are your teaching methods keeping up?"
//         </p>
//       </Card>
//     </div>


    



//         {/* Two Column Layout with 3% gap */}
//         <div className="grid grid-cols-[47%_4%_47%] gap-0  ">
//         {/* Left Column */}
//         <div className="space-y-4 ">        
//         <Testimonials />       
//         </div>
       
//         {/* Middle Gap Section with Paper Effect */}
//         <div className=" bg-opacity-50 ">
//           <div className="w-full h-full border-l border-r border-gray-200 opacity-50"></div>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-4">
//         <TestimonialsStudent />
//         </div>
//       </div>





//       {/* Two Column Layout with 3% gap */}
//       <div className="grid grid-cols-[47%_4%_47%] gap-0  ">
//         {/* Left Column */}
//         <div className="space-y-4">
//         < EducatorCard />
//         <div className="min-h-screen flex items-center justify-center bg-white">
//       <StatsShowcase 
//         title="We've Trained Over 20,000 Educators Across 100+ Institutions"
//         stats={stats}
//       />
//     </div>
//         </div>
       
//         {/* Middle Gap Section with Paper Effect */}
//         <div className=" bg-opacity-50 ">
//           <div className="w-full h-full border-l border-r border-gray-200 opacity-50"></div>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-4">
//         <StudentCardR />
//         <ProgramCard />   
          
//         </div>
//       </div>

//       <Logos />


    

//       {/* Two Column Layout with 3% gap */}
//       <div className="grid grid-cols-[47%_4%_47%] gap-0 ">
//         {/* Left Column */}
//         <div className="space-y-4">
//         < FacultyTransformation />
//         <Fdpcalender />
//         </div>
       
//         {/* Middle Gap Section with Paper Effect */}
//         <div className=" bg-opacity-50 ">
//           <div className="w-full h-full border-l border-r border-gray-200 opacity-50"></div>
//         </div>


//         {/* Right Column */}
//         <div className="space-y-4">
//         <StudentCardR />
//         {/* <Fdpcalender /> */}
//          </div>
//       </div>
 


//       {/* Two Column Layout with 3% gap */}
//       <div className="grid grid-cols-[47%_4%_47%] gap-0  ">
//         {/* Left Column */}
//         <div className="space-y-4 "> 
//         <FAQ /> 
//         </div>
       
//         {/* Middle Gap Section with Paper Effect */}
//         <div className=" bg-opacity-50 ">
//           <div className="w-full h-full border-l border-r border-gray-200 opacity-50"></div>
//         </div>


//         {/* Right Column */}
//         <div className="space-y-4">
//         <FAQ />
//         </div>
//       </div>

//       <FacultyForm />


//       {/* Two Column Layout with 3% gap */}
//       <div className="grid grid-cols-[47%_4%_47%] gap-0   ">
//         {/* Left Column */}
//         <div className="space-y-4 ">
         
//         <ResourcesPage />
//         <ResourceDownloadForm />
       
//         </div>
       
//         {/* Middle Gap Section with Paper Effect */}
//         <div className=" bg-opacity-50 ">
//           <div className="w-full h-full border-l border-r border-gray-200 opacity-50"></div>
//         </div>


//         {/* Right Column */}
//         <div className="space-y-4">
       
        
//         </div>
//       </div>


// {/* 
//       <div className="relative w-full overflow-hidden">
//   <img
//     src="/images/academy/Cloud.png"
//     alt="Cloud Background"
//     className="w-full object-cover"
//   />
//   {/* <div className="absolute inset-0 flex items-center justify-center">
//     <h1 className="text-3xl font-bold text-black text-center p-4 bg-white/80 rounded">
//       Why Traditional Teaching <span className="text-yellow-400">No Longer Works</span>
//     </h1>
//   </div> */}
// {/* </div> */} 


//     </MainLayout>


    
//   );
// };

// export default Academy;
import { useState, useEffect, useRef } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import MainLayout from "../../components/Academy/MainLayout";
import MethodCard from "../../components/Academy/Teacher/MethodCard";
import MethodCardR from "../../components/Academy/Students/MethodCard";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import StudentCardR from "../../components/Academy/Students/StudentCard";
import EducatorCard from "../../components/Academy/Teacher/EducatorCard";
import { Book, Calendar, Circle, Users } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import StatsShowcase from "../../components/Academy/Teacher/StatsShowcase";
import ProgramCard from "../../components/Academy/Students/ProgramCard";
import Logos from "../../components/Academy/Teacher/Logos";
import FacultyTransformation from "../../components/Academy/Teacher/FacultyTransformation";
import Fdpcalender from "../../components/Academy/Teacher/Fdpcalender";
import FAQ from "../../components/Academy/Teacher/FAQ";
import FacultyForm from "../../components/Academy/Teacher/FacultyForm";
import ResourcesPage from "../../components/Academy/Teacher/ResourcesPage";
import ResourceDownloadForm from "../../components/Academy/Teacher/ResourceDownloadForm";
import Testimonials from "../../components/Academy/Teacher/TestimonialSlider";
import TestimonialsStudent from "../../components/Academy/Students/Testimonials";
import VideoCarousel from "../../components/Academy/VideoCarousel";

const Academia = ({ userType = "teacher" }: { userType?: "teacher" | "student" }) => {
  const [activeTab, setActiveTab] = useState<"teacher" | "student">("teacher");

  const navigate = useNavigate();

      const contactRef = useRef<HTMLDivElement>(null);
        
      const location = useLocation();
  
  
       const scrollToContact = () => {
      contactRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  

    
  const stats = [
    { icon: Book, value: "20,000+", label: "Teachers Trained" },
    { icon: Users, value: "100+", label: "Schools Onboarded" },
    { icon: Calendar, value: "250+", label: "Pilots Deployed" },
    { icon: Circle, value: "92%", label: "Teachers Satisfaction Rate" },
  ];

   useEffect (() =>{
    AOS.init({
    
    });
    

   },[])

  return (
    <MainLayout>
      {/* Hero Banner */}
       {/* Hero Banner (90% width) */}
     <div className="w-full h-[30vh] md:h-[60vh]  ">
    {/* <div className="h-full flex items-center justify-center"> */}
     <h1 className="text-4xl font-bold text-white"></h1>
      {/* </div> */}
      <VideoCarousel />
    </div>

  
<div className="w-full hidden md:flex h-[330px] bg-white flex-row mt-12 relative ">
      <div
        onClick={() => navigate("/school/teacher")}
        className={`w-full flex justify-end items-center h-full cursor-pointer transition-all duration-300`}
      >
 <h1 className="text-xl md:text-4xl font-playfair ">Teachers</h1>
              <img
          src="/images/academy/board.png"
          alt="Teacher"
          className="h-full object-contain"
        />
      </div>

      <div
        onClick={() => navigate("/school/student")}
        className={`w-full flex justify-start items-center h-full cursor-pointer transition-all duration-300`}
      >
       
        <img
          src="/images/academy/ai.png"
          alt="Student"
          className="h-full object-contain"
        />
         <h1 className="text-xl md:text-4xl font-playfair ">Students</h1>
      </div>
    </div>




    </MainLayout>
  );
};

export default Academia;
