import { useState, useEffect } from "react";
import React, { useRef } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from "react-helmet-async";
import MainLayout from "../../../components/Academy/MainLayout";
import MethodCard from "../../../components/Academy/Teacher/MethodCard";
import MethodCardR from "../../../components/Academy/Students/MethodCard";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import StudentCardR from "../../../components/Academy/Students/StudentCard";
import EducatorCard from "../../../components/Academy/Teacher/EducatorCard";
import { Book, Calendar, Circle, Users } from "lucide-react";
import StatsShowcase from "../../../components/Academy/Teacher/StatsShowcase";
import ProgramCard from "../../../components/Academy/Students/ProgramCard";
import FacultyTransformation from "../../../components/Academy/Teacher/FacultyTransformation";
import Fdpcalender from "../../../components/Academy/Teacher/Fdpcalender";
import FaqAndContact from "../../../components/Academy/Students/FaqAndContact";
import FacultyForm from "../../../components/Academy/Teacher/FacultyForm";
import ResourcesPage from "../../../components/Academy/Students/ResourcesPage";
import ResourceDownloadForm from "../../../components/Academy/Teacher/ResourceDownloadForm";
import Testimonialss from "../../../components/Academy/Students/Testimonials";
import VideoCarousel from "../../../components/Academy/Students/VideoCarousel";
import Testimonials from "../../../components/Academy/Students/testimonials/testimonials"
import Programs from "../../../components/Academy/Students/Programs";
import Logos from "../../../components/Academy/Students/Logos";
import Problem from "../../../components/Academy/Students/Problem";
import HeroBanner from '../../../components/Academy/Students/Herobanner/HeroBanner';
import { Toaster } from '../../../components/Academy/UI/toaster';
import CaseStudy from "../../../components/Academy/Students/educators/caseStudy";
import StudentProgramsPage from "../../../components/Academy/Students/StudentProgramsPage";
import  TestimonialsCarousel from '../../../components/Academy/Students/TestimonialsCarousel';
// import FAQChatbot from '../../../components/Academy/FAQChatbot'
import FDPButton from '../../../components/Academy/Students/FDPButton'
import DashboardSection from "../../../components/Academy/Students/DashboardSection"
import ContactSection from "../../../components/Academy/Contact/ContactSection"
import CorporateHeader from "../../../components/Header/AcademyHeader"
import { caseStudies } from '../../../components/Academy/Students/CaseStudy/caseStudies';
import { CaseStudy as CaseStudyType } from '../../../components/Academy/Students/CaseStudy/caseStudy';
import { Button } from '../../../components/Academy/UI/button';
// import CaseStudyDetail from '../../../components/Academy/Students/CaseStudy/CaseStudyDetail';
// import FloatingActionMenu from '../../../components/Academy/Floatingbutton'
import FloatingActionMenu from '../../../components/Academy/StickyButton/StickyButton/FloatingAction'
import  Courses from '../../../components/Academy/Students/Courses'
import TestimonialVideoCarousel from "../../../components/Academy/Students/StudentCarouselVideo"
import Hero from "../../../components/Academy/Students/Herobanner/Hero"

const Academy = ({ userType = "teacher" }: { userType?: "teacher" | "student" }) => {
  const [activeTab, setActiveTab] = useState<"teacher" | "student">("teacher");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudyType>(caseStudies[0]);
  const [blurPercent, setBlurPercent] = useState(0);

      const contactRef = useRef<HTMLDivElement>(null);
       const logoRef = useRef<HTMLDivElement>(null);

      const scrollToContact = () => {
      contactRef.current?.scrollIntoView({ behavior: "smooth" });
    };
     const scrollToLogo = () => {
    logoRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  

  const stats = [
    { icon: Book, value: "20,000+", label: "Faculty Trained" },
    { icon: Users, value: "100+", label: "Schools Onboarded" },
    { icon: Calendar, value: "250+", label: "Pilots Deployed" },
    { icon: Circle, value: "92%", label: "Faculty Satisfaction Rate" },
  ];

   useEffect (() =>{
    AOS.init({
    
    });
    

   },[])

    useEffect(() => {
       window.scrollTo(0, 0);
     }, []);
   

     const handleCaseStudySelect = (caseStudy: CaseStudyType) => {
    setSelectedCaseStudy(caseStudy);
    
    // Scroll to detail section on mobile
    if (window.innerWidth < 768) {
      const detailSection = document.getElementById('case-study-detail');
      if (detailSection) {
        detailSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };


   useEffect(() => {
     const hash = location.hash;
     if (hash === '#contact-section') {
       const section = document.getElementById('contact-section');
       if (section) {
         setTimeout(() => {
           section.scrollIntoView({ behavior: 'smooth' });
         }, 100);
       }
     }
   }, [location]);

   
   useEffect(() => {
     const hash = location.hash;
     if (hash === '#logo-section-student') {
       const section = document.getElementById('logo-section-student');
       if (section) {
         setTimeout(() => {
           section.scrollIntoView({ behavior: 'smooth' });
         }, 100);
       }
     }
   }, [location]);
   
   useEffect(() => {
     const hash = location.hash;
     if (hash === '#course-cards-section') {
       const section = document.getElementById('course-cards-section');
       if (section) {
         setTimeout(() => {
           section.scrollIntoView({ behavior: 'smooth' });
         }, 100);
       }
     }
   }, [location]);   useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const logoSection = document.getElementById('logo-section');
      let blurProgress = 0;
      if (logoSection) {
        const rect = logoSection.getBoundingClientRect();
        // Start blur when logo-section top hits bottom of viewport, finish at 25% viewport height
        const start = heroHeight;
        const end = heroHeight * 0.25;
        const progress = (start - rect.top) / (start - end);
        blurProgress = Math.min(Math.max(progress, 0), 1);
      }
      setBlurPercent(blurProgress * 100);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <> 
    <Helmet>
    <meta
      name="description"
      content="Build real-world skills from school. Rareminds offers NEP-aligned student programs in communication, digital fluency, and career readiness for kindergarten to Grade 12."
    />
  </Helmet>
   
        <div className="overflow-hidden">
      {/* Hero Banner */}
       {/* Hero Banner (90% width) */}
       <CorporateHeader />     <div className="w-full h-auto">
      {/* Hero section with smooth scroll blur effect */}
      <div className="w-full relative">
        <div className="relative">
          <Hero HeroToLogo={scrollToLogo} HeroToContact={scrollToContact} blurAmount={(12 * blurPercent) / 100} />
        </div>
      </div>
     
      <Toaster />
    </div>
    {/* <FAQChatbot />   */}
    {/* <FDPButton />  */}    <FloatingActionMenu />
    

<div className="min-h-auto flex items-center justify-center relative z-10 mt-[100vh]">
     <div ref={logoRef} className="relative z-0 w-full" id="logo-section">
        <div className="w-full h-[200px]">
          <img src="/academy/studentlineart.svg" alt="Wave" className="w-full h-full object-cover" />
        </div> 
     </div>
</div>

   {/* <div className="relative z-0  rounded-tl-3xl rounded-tr-3xl shadow-2xl shadow-black" id="logo-section-student">
        
        </div> */}
      
  <div id="course-cards-section" className="min-h-auto flex items-center justify-center relative z-10 bg-white">
      <Logos /> 
       </div>

      
     <Problem />   
      
     

  <div id="course-cards-section" className="min-h-screen flex items-center justify-center relative z-10 bg-white">
     <Courses />      
       </div>
 
     {/* <Programs />
          <div id="course-cards-section" className="min-h-screen flex items-center justify-center relative z-10 bg-white">
     <StudentProgramsPage coursetocontact={scrollToContact} />      
       </div> */}
    
      {/* <div className="w-full h-[65vh]"></div> */}
  <div  className="min-h-screen flex items-center justify-center relative z-10 bg-white">
  <DashboardSection />     
       </div>
    
     {/* old one */}
      {/* <div className="w-full bg-gradient-to-r mt-6">
        <div className="h-[80%] bg-white justify-center">
          <h2 className=" text-2xl md:text-4xl font-bold text-black text-center pt-16">
            Why Schools Must <span className="text-yellow-400">Shift Now</span>
          </h2>
          <h4 className="text-1xl font-bold text-black text-center pb-6">
            Traditional curriculum ≠ Future Careers
          </h4>

          <div className="w-full bg-white flex ">
            <div className="w-full md:w-1/2 flex justify-center items-center py-4">
              <img src="/images/academy/board1.png" alt="" className="w-[50%]" />
            </div>
            <div className="w-full md:w-1/2 flex justify-center items-center py-4">
              <img src="/images/academy/ai1.png" alt="" className="w-[50%]" />
            </div>
          </div>
        </div>

        <div
          className="h-56 flex items-center justify-center bg-cover bg-center"
          // style={{ backgroundImage: `url('/images/academy/Cloud.png')` }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <h1 className="lg:text-3xl text-2xl text-center font-bold text-black p-2 rounded pt-12">
              Why Traditional Teaching <span className="text-yellow-400">No Longer Works</span>
            </h1>
          </div>
        </div>
      </div> */}
       
      

  {/* Mobile Toggle Buttons */}
      {/* <div className="w-full md:hidden h-[130px] bg-white flex flex-row md:flex-row">
  <div  onClick={() => setActiveTab("teacher")}
          className={`w-full md:w-1/2 flex justify-end items-center  h-full ${activeTab === "teacher" ? "bg-white text-black" : "bg-white text-gray-700"}`}>
    <img
      src="/images/academy/board.png"
      alt=""
      className="h-full object-contain"
    />
  </div>
  <div  onClick={() => setActiveTab("student")}
          className={`w-full md:w-1/2 flex justify-start items-center  h-full ${activeTab === "student" ? "bg-white text-black" : "bg-white text-gray-700"}`}>
    <img
      src="/images/academy/ai.png"
      alt=""
      className="h-full object-contain"
    />
  </div>
</div> */}

     
    
      {/* <div className="flex md:hidden justify-center mb-6 gap-4">

        
        <button
          onClick={() => setActiveTab("teacher")}
          className={`px-4 py-2 font-semibold rounded ${activeTab === "teacher" ? "bg-yellow-400 text-black" : "bg-gray-200 text-gray-700"}`}
        >
          Teacher
        </button>
        <button
          onClick={() => setActiveTab("student")}
          className={`px-4 py-2 font-semibold rounded ${activeTab === "student" ? "bg-yellow-400 text-black" : "bg-gray-200 text-gray-700"}`}
        >
          Student
        </button>
      </div> */}



      {/* Desktop (2 Columns) + Mobile (Conditional Rendering)
      <div className="hidden md:grid grid-cols-[47%_4%_47%] gap-0"> */}
        {/* Left Column */}
        {/* <div className="space-y-4" data-aos="fade-down-right">
          <MethodCard  />
        </div> */}

        {/* Middle Gap */}
        {/* <div className="bg-opacity-50">
          <div className="w-full h-full  opacity-50"></div>
        </div> */}

        {/* Right Column */}
        {/* <div className="space-y-4" data-aos="fade-left">
          <MethodCardR />
        </div>
      </div> */}





      {/* Mobile View */}
      {/* <div className="md:hidden space-y-4">
        {activeTab === "teacher" ? <MethodCard /> : <MethodCardR />}
      </div> */}

      {/* Yellow Card */}
      {/* <div className="w-full flex items-center justify-center bg-white p-4 pt-0" data-aos="fade-up"
     data-aos-duration="1000">
        <Card className="max-w-[600px] w-full p-8 bg-[#FFFBEB] border-l-4 border-l-yellow-400">
          <h2 className="text-lg md:text-xl font-medium mb-6 text-left">The education landscape is changing:</h2>
          <ul className="space-y-4">
            {[
              "Gen Z needs engaging, real-world learning experiences",
              "NeP navigates self-based pedagogy for future-ready students",
              "Digital-first classrooms demand tech-savvy faculty",
            ].map((point, index) => (
              <li key={index} className="flex items-start gap-3 text-left text-sm md:text-lg">
                <Check className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-base">{point}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center italic text-gray-800">
            "Students are changing. Are your teaching methods keeping up?"
          </p>
        </Card>
      </div> */}

      {/* Testimonials Section */}
       {/* <Testimonials /> */}
        <div  className="min-h-screen flex items-center justify-center relative z-10 bg-white">
 <Testimonialss />     
       </div>

        <div  className="min-h-auto flex items-center justify-center relative z-10 bg-white">
 <TestimonialVideoCarousel />     
       </div>



       {/* <div  className="min-h-screen flex items-center justify-center relative z-10 bg-white">
  <CaseStudy />   
       </div> */}
     
      
      {/* <TestimonialsStudent /> */}
       {/* <div  className="min-h-screen flex items-center justify-center relative z-10 bg-white">
<CaseStudy />   
       </div> */}

 {/* <div  className="min-h-screen flex items-center justify-center relative z-10 bg-white">
<div className="container mx-auto px-8 mb-24" id="case-studies">
           <div className="flex flex-col items-center justify-center text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Proven Impact, Delivered
          </h1>
          <p className="text-base text-gray-600 max-w-2xl">
            Real stories. Real results.
          </p>
        </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Case Study Cards - Sidebar */}
            {/* <div className="md:col-span-4 lg:col-span-2">
              <div className="sticky top-4 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 ">
                  {caseStudies.map((caseStudy) => (
                    <Button
                      key={caseStudy.id}
                      variant={selectedCaseStudy.id === caseStudy.id ? "default" : "outline"}
                      className="justify-start h-auto p-4 text-left "
                      onClick={() => handleCaseStudySelect(caseStudy)}
                    >
                      {caseStudy.header.split('–')[0].trim()}
                    </Button>
                  ))}
                </div>
                
                <div className="hidden md:block p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold mb-3 text-brand-blue">Need More Information?</h3>
                  <p className="text-gray-600 mb-4">Contact our team for detailed information about our educational programs and how we can help your institution.</p>
                  <Button className="w-full bg-brand-blue hover:bg-brand-blue/90">
                    Request Information
                  </Button>
                </div>
              </div>
            </div>
             */}
            {/* Case Study Detail */}
            {/* <div className="md:col-span-8 lg:col-span-10 "  id="case-study-detail">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8">
                <CaseStudyDetail caseStudy={selectedCaseStudy} />
              </div>
              
              <div className="mt-8 flex justify-start gap-28 items-center">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    const currentIndex = caseStudies.findIndex(cs => cs.id === selectedCaseStudy.id);
                    const prevIndex = (currentIndex - 1 + caseStudies.length) % caseStudies.length;
                    setSelectedCaseStudy(caseStudies[prevIndex]);
                  }}
                  disabled={caseStudies.length <= 1}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Previous Case Study
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => {
                    const currentIndex = caseStudies.findIndex(cs => cs.id === selectedCaseStudy.id);
                    const nextIndex = (currentIndex + 1) % caseStudies.length;
                    setSelectedCaseStudy(caseStudies[nextIndex]);
                  }}
                  disabled={caseStudies.length <= 1}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Next Case Study
                </Button>
              </div>
            </div>
          </div>
        </div>
       </div> */} 
      {/* Educator & Student Cards */}
      {/* <StudentCardR /> */}
      {/* <ProgramCard /> */}



{/*       
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-16 mt-8">
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">Still Have Questions?</h2>
                <p className="text-gray-600">Find answers to commonly asked questions about our faculty development programs</p>
              </div>
                <FaqAndContact />
        
              </main> */}

      {/* Faculty Form */}
      {/* <FacultyForm /> */}

      {/* Resources Page */}
    
       <div  className="min-h-screen flex items-center justify-center relative z-10 bg-white">
  <ResourcesPage />  
       </div>
      {/* <ResourceDownloadForm /> */}
       

       <div ref={contactRef} id="contact-section">
     <ContactSection />
       </div>
  
      </div>
  </>
  );
};

export default Academy;
