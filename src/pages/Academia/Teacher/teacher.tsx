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
import YouTubeFeed from '../../../components/Academy/Teacher/youtubelive'
import CurrentBlogs from '../../../components/Academy/Teacher/Current_blogs'

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
      { icon: Book, value: "20,000+", label: "Teachers Trained" },
      { icon: Users, value: "100+", label: "Schools Onboarded" },
      { icon: Calendar, value: "250+", label: "Pilots Deployed" },
      { icon: Circle, value: "92%", label: "Teachers Satisfaction Rate" },
    ];

    useEffect(() => {
      AOS.init({

      });


    }, [])

 useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



    
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

    return (      <>  <Helmet>
    <title>Bilingual NEP 2020-Aligned School Programs | Rareminds School Services</title>
    <meta
      name="description"
      content="Bilingual, NEP 2020-aligned school programs that strengthen communication, digital skills, and career paths designed for practical, classroom-ready impact."
    />
    <meta property="og:title" content="Bilingual NEP 2020-Aligned School Programs | Rareminds School Services" />
    <meta property="og:description" content="Bilingual, NEP 2020-aligned school programs that strengthen communication, digital skills, and career paths designed for practical, classroom-ready impact." />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://rareminds.com/RareMinds.webp" />
    <meta property="og:url" content="https://rareminds.com/academia/teacher" />
    <script type="application/ld+json">
      {`
        {
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "Rareminds",
          "url": "https://rareminds.com",
          "logo": "https://rareminds.com/RMLogo.webp",
          "description": "Bilingual, NEP 2020-aligned school programs that strengthen communication, digital skills, and career paths designed for practical, classroom-ready impact."
        }
      `}
    </script>
  </Helmet>


      <div className="overflow-hidden">

        <CorporateHeader />
        <div className="w-full fixed">

          

   

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

          <FloatingActionMenu />
       <div className="relative z-0 mt-[100vh]" >
  <div ref={logoRef}  className="w-full h-[200px]"> 
    <img src="/academy/school.svg" alt="Wave" className="w-full h-full object-cover" id="logo-section" />
  </div> 
  

</div>



   
        <div  className="relative z-0  rounded-tl-3xl rounded-tr-3xl shadow-2xl shadow-black 0" >
          <Logos  />
        </div>
      
        <Problem />


















 <div className="min-h-screen flex items-center justify-center relative z-10 bg-white">
        <Oldandnewmethod />
        </div>








   <div id="course-cards-section" className="min-h-screen flex items-center justify-center relative z-10 bg-white">
    <Services />

</div>
     
      
               <div className="min-h-screen flex items-center justify-center relative z-10 bg-white">
      <DashboardSection />

</div>

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


<div  className="min-h-auto flex items-center justify-center relative z-10 bg-white">
 <YouTubeFeed />     
       </div>

 <div className="min-h-screen flex items-center justify-center relative z-10 bg-white">
       <EducationSection scrollToContact={scrollToContact} />

</div>
      
       

        <div className="min-h-screen flex items-center justify-center relative z-10 bg-white">
          <StatsShowcase
            title="We've Trained Over 20,000 Educators Across 100+ Institutions"
            stats={stats}
          />
        </div>








     
          <div ref={facultyTransformationRef} className="min-h-screen flex items-center justify-center relative z-10 bg-white" id="scrollToFacultyTransformation">
         <FacultyTransformation />
         </div>
          <div className="min-h-screen flex items-center justify-center relative z-10 bg-white">
        <Fdpcalender Facultytocontact={scrollToContact} />

</div>








 <div className="min-h-screen flex items-center justify-center relative z-10 bg-white">
        <ResourcesPage />

</div>
      
          <div  className="h-auto flex items-center justify-center relative z-10 bg-white">
  <CurrentBlogs />  
       </div>
       

   <div ref={contactRef} id="contact-section">
        <ContactSection />
      </div>
      </div>
 
</>

    );
  };

  export default School;
