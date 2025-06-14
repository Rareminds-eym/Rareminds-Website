import { useState, useEffect } from "react";
  import React, { useRef } from "react";
  import AOS from 'aos';
  import 'aos/dist/aos.css';
  import { Link, useLocation } from 'react-router-dom';
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
  import Logos from "../../../components/Academy/Teacher/Logos";
  import FacultyTransformation from "../../../components/Academy/Teacher/FacultyTransformation";
  import Fdpcalender from "../../../components/Academy/Teacher/Fdpcalender";
  import FAQ from "../../../components/Academy/Teacher/FAQ";
  import FacultyForm from "../../../components/Academy/Teacher/FacultyForm";
  import ResourcesPage from "../../../components/Academy/Teacher/ResourcesPage";
  import ResourceDownloadForm from "../../../components/Academy/Teacher/ResourceDownloadForm";
  // import Testimonials from "../../../components/Academy/Teacher/TestimonialSlider";
  // import TestimonialsStudent from "./Students/Testimonials";
  // import VideoCarousel from "./VideoCarousel";
  import VideoCarousel from "../../../components/Academy/Teacher/VideoCarousel";
  import FaqAndContact from "../../../components/Academy/Teacher/FaqAndContact";
  import DownloadForm from "../../../components/Academy/Teacher/DownloadForm"
  import Oldandnewmethod from "../../../components/Academy/Teacher/oldandnewmethod"
  import Text from "../../../components/Academy/Teacher/text";
  import Problem from "../../../components/Academy/Teacher/Problem"
  import HeroBanner from '../../../components/Academy/Teacher/Herobanner/HeroBanner';
  import { Toaster } from '../../../components/Academy/UI/toaster';
  import EducationSection from '../../../components/Academy/Teacher/EducationSection';
  import CourseCards from '../../../components/Academy/Teacher/CourseCards';
  // import Testimonial from '../../../components/Academy/Teacher/TestimonialsCarousel'
  import FAQChatbot from '../../../components/Academy/FAQChatbot'
  import FDPButton from '../../../components/Academy/Teacher/FDPButton'
  import DashboardSection from "../../../components/Academy/Teacher/DashboardSection";
  import ContactSection from "../../../components/Academy/Contact/ContactSection"
  import CorporateHeader from "../../../components/Header/AcademyHeader"
  import FloatingActionMenu from '../../../components/Academy/StickyButton/StickyButton/FloatingAction'
  import TestimonialViedoCarousel from '../../../components/Academy/Teacher/TestimonialCarouselVideo';
  import Hero from '../../../components/Academy/Teacher/Herobanner/Hero'
  import Services from './Cources'
  import Testimonials from "../../../components/Academy/Teacher/Testimonials"
import Viedo_cube from "../../../components/Academy/Teacher/Showcase_videos/viedo_Cube"


  const School = ({ userType = "teacher" }: { userType?: "teacher" | "student" }) => {
  const [activeTab, setActiveTab] = useState<"teacher" | "student">("teacher");
  const [isHeroBlurred, setIsHeroBlurred] = useState(false);
  const [blurPercent, setBlurPercent] = useState(0);

      const contactRef = useRef<HTMLDivElement>(null);
      const logoRef = useRef<HTMLDivElement>(null);
      const facultyTransformationRef = useRef<HTMLDivElement>(null);
      
      

    const scrollToContact = () => {
      contactRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    
    const scrollToLogo = () => {
      logoRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const scrollToFacultyTransformation = () => {
      facultyTransformationRef.current?.scrollIntoView({ behavior: "smooth" });
    };


    const stats = [
      { icon: Book, value: "20,000+", label: "Faculty Trained" },
      { icon: Users, value: "100+", label: "Schools Onboarded" },
      { icon: Calendar, value: "250+", label: "Pilots Deployed" },
      { icon: Circle, value: "92%", label: "Faculty Satisfaction Rate" },
    ];

    useEffect(() => {
      AOS.init({

      });


    }, [])

 useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  // useEffect(() => {
  //   if (location.state?.scrollToCourse) {
  //     const section = document.getElementById('course-cards-section');
  //     if (section) {
  //       setTimeout(() => {
  //         section.scrollIntoView({ behavior: 'smooth' });
  //       }, 100); // timeout to ensure DOM is ready
  //     }
  //   }
  // }, [location.state]);

    
     const location = useLocation();

  useEffect(() => {
    if (location.hash === '#course-cards-section') {
      const el = document.getElementById('course-cards-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
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
}, [location]);


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
  if (hash === '#scrollToFacultyTransformation') {
    const section = document.getElementById('scrollToFacultyTransformation');
    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }
}, [location]);

    useEffect(() => {
      const handleScroll = () => {
        if (logoRef.current) {
          const rect = logoRef.current.getBoundingClientRect();
          setIsHeroBlurred(rect.top <= window.innerHeight && rect.top >= 0);
          // Calculate blur percent based on how much of logoRef is covered by the Hero
          const heroBottom = window.innerHeight;
          const logoTop = rect.top;
          const logoHeight = rect.height;
          // If logo is below hero, no blur
          if (logoTop > heroBottom) {
            setBlurPercent(0);
          } else if (logoTop + logoHeight < heroBottom) {
            setBlurPercent(100);
          } else {
            // Calculate how much of logo is covered by hero
            const covered = Math.max(0, heroBottom - logoTop);
            const percent = Math.min(100, Math.max(0, (covered / logoHeight) * 100));
            setBlurPercent(percent);
          }
        }
      };
      window.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (

      <>
  <Helmet>
    <meta
      name="description"
      content="Bilingual, NEP 2020-aligned school programs that strengthen communication, digital skills, and career paths designed for practical, classroom-ready impact."
    />
  </Helmet>


      <div className="overflow-hidden">
        {/* Hero Banner */}
        {/* Hero Banner (90% width) */}
        <CorporateHeader />
        <div className="w-full fixed">
          {/* <div className="h-full flex items-center justify-center"> */}
          {/* <h1 className="text-4xl font-bold text-white"></h1>
        {/* </div> */}
          {/* <VideoCarousel /> */}
   
          {/* <HeroBanner HeroToContact={scrollToContact} HeroToLogo={scrollToLogo} />
        
          <Toaster /> */}
          <div className="w-full fixed z-50">
  <div className="relative">
    <Hero HeroToLogo={scrollToLogo} HeroToContact={scrollToContact} isBlurred={isHeroBlurred} />
    {isHeroBlurred && (
      <div
        className="absolute bottom-0 left-0 w-full h-full pointer-events-none"
        style={{
          background: `linear-gradient(to top, rgba(255,255,255,${0.85 * (blurPercent / 100)}) 40%, rgba(255,255,255,${0.2 * (blurPercent / 100)}) 100%)`,
          backdropFilter: `blur(${(18 * blurPercent) / 100}px)` ,
          WebkitBackdropFilter: `blur(${(18 * blurPercent) / 100}px)` ,
          zIndex: 20,
          transition: 'background 0.2s, backdrop-filter 0.2s',
        }}
      />
    )}
  </div>
</div>        </div>
        {/* <FAQChatbot /> */}
        {/* <FDPButton />        Logos */}
          <FloatingActionMenu />
       <div className="relative z-0 mt-[100vh]" >
  <div ref={logoRef}  className="w-full h-[200px]"> 
    <img src="/academy/school.svg" alt="Wave" className="w-full h-full object-cover" id="logo-section" />
  </div> 
  
  {/* Add white space below image */}
  {/* <div className="w-full bg-white h-[20px]"></div> You can tweak height */}
</div>



   
        <div  className="relative z-0  rounded-tl-3xl rounded-tr-3xl shadow-2xl shadow-black 0" >
          <Logos  />
        </div>
      
        <Problem />

        {/* <div className="w-full h-[65vh]"></div> */}

        {/* <div className="w-full bg-gradient-to-r ">
          <div className="h-[80%] bg-white justify-center">
            <h2 className=" text-2xl md:text-4xl font-bold text-black text-center pt-8">
              Why Schools Must <span className="text-red-600">Shift Now</span>
            </h2>
            <h4 className="text-1xl font-bold text-black text-center pb-6">
              Traditional curriculum ≠ Future Careers
            </h4>

            <div className="w-full h-[600px] bg-white relative flex justify-center"> */}
              {/* <div className="w-full md:w-1/2 flex justify-center items-center py-4">
                <img src="/images/academy/board1.png" alt="" className="w-[50%]" />
              </div>
              <div className="w-full md:w-1/2 flex justify-center items-center py-4">
                <img src="/images/academy/ai1.png" alt="" className="w-[50%]" />
              </div> */}

              {/* <div className="w-[100%] h-auto bg-white">
                <div className="w-full h-full  ">
                  <Text /> */}
                  {/* <div className=" bg-blue-300 w-[15%] h-[30%] absolute left-[1%] top-[8%]">  </div>
            <img src="/images/academy/pth1.svg" alt="Logo" className="w-[20%] h-auto absolute  left-[15%] top-[3%]  " />
              
            <img src="/images/academy/pth2.svg" alt="Logo" className="w-[15%] h-auto absolute  left-[35%] top-[15%] " />
              
            <img src="/images/academy/pth3.svg" alt="Logo" className="w-[25%] h-auto absolute  left-[190px] top-[250px] bottom-[100px]" />
              
            <img src="/images/academy/pth4.svg" alt="Logo" className="w-[15%] h-auto absolute  left-[130px] top-[340px] bottom-[100px]" />

            <img src="/images/academy/pth5.svg" alt="Logo" className="w-[25%] h-auto absolute  left-[300px]  bottom-[50px]" />
              
            <div className="absolute bg-blue-300 w-[10%] h-32 mt-10 ml-8 bottom-20 right-[590px]">  </div> */}
                {/* </div>
              </div>
            </div>
          </div> */}



          {/* <div
            className="h-56 flex items-center justify-center bg-cover bg-center"
            // style={{ backgroundImage: `url('/images/academy/Cloud.png')` }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <h1 className="lg:text-3xl text-2xl text-center font-bold text-black p-2 rounded pt-12">
                Why Traditional Teaching <span className="text-red-600">No Longer Works</span>
              </h1>
            </div>
          </div> */}
        {/* </div> */}





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

 <div className="min-h-screen flex items-center justify-center relative z-10 bg-white">
        <Oldandnewmethod />
        </div>
        {/* Desktop (2 Columns) + Mobile (Conditional Rendering) */}
        {/* <div className="hidden md:grid grid-cols-[47%_4%_47%] gap-0"> */}
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
          <Card className="max-w-[600px] w-full p-8 bg-[#FFFBEB] border-l-4 border-l-Red-400">
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
       
   <div id="course-cards-section" className="min-h-screen flex items-center justify-center relative z-10 bg-white">
    <Services />

</div>
     
 {/* <div id="course-cards-section" className="min-h-screen flex items-center justify-center relative z-10 bg-white">
    <CourseCards coursetocontact={scrollToContact}  />

</div> */}


      
               <div className="min-h-screen flex items-center justify-center relative z-10 bg-white">
      <DashboardSection />

</div>
        {/* <Testimonials /> */}
         {/* <div className="min-h-screen flex items-center justify-center relative z-10 bg-white">
        <Testimonial />

</div> */}

  <div className="min-h-screen flex items-center justify-center relative z-10 bg-white">
        <Testimonials />

</div>
     
        <div className="hidden md:grid grid-cols-[47%_0%_47%] gap-0">
          <div className="space-y-4" data-aos="fade-down-right">

          </div>

        </div>

 <div className="h-auto flex items-center justify-center relative z-10 bg-white">
        <TestimonialViedoCarousel />

</div>



 <div className="min-h-screen flex items-center justify-center relative z-10 bg-white">
       <EducationSection scrollToContact={scrollToContact} />

</div>
      
       
        {/* <EducatorCard /> */}
        <div className="min-h-screen flex items-center justify-center relative z-10 bg-white">
          <StatsShowcase
            title="We've Trained Over 20,000 Educators Across 100+ Institutions"
            stats={stats}
          />
        </div>
        {/* <ProgramCard /> */}




     {/* <div  className="min-h-auto w-full flex items-center justify-center relative z-10 bg-white">
     <Viedo_cube />     
       </div> */}


        {/* Faculty Transformation & Calendar */}     
          <div ref={facultyTransformationRef} className="min-h-screen flex items-center justify-center relative z-10 bg-white" id="scrollToFacultyTransformation">
         <FacultyTransformation />
         </div>
          <div className="min-h-screen flex items-center justify-center relative z-10 bg-white">
        <Fdpcalender Facultytocontact={scrollToContact} />

</div>

        {/* FAQ
        <FAQ /> */}




        {/* Faculty Form */}

        {/* <div className="min-h-screen flex flex-col bg-white">
  
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-16 mt-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">Still Have Questions?</h2>
          <p className="text-gray-600">Find answers to commonly asked questions about our faculty development programs</p>
        </div>
          <FaqAndContact />

        </main>
        
      
      </div> */}
        {/* Resources Page */}
 <div className="min-h-screen flex items-center justify-center relative z-10 bg-white">
        <ResourcesPage />

</div>
      

        {/* <div className="w-full h-450px flex justify-center  p-8 mt-8 mb-6">
        <DownloadForm />

        </div> */}

   <div ref={contactRef} id="contact-section">
        <ContactSection />
      </div>
      </div>
 
</>

    );
  };

  export default School;
