import { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet-async";

import ResourcesPage from "../../../components/Academy/Students/ResourcesPage";
import Testimonialss from "../../../components/Academy/Students/Testimonials";
import Logos from "../../../components/Academy/Students/Logos";
import Problem from "../../../components/Academy/Students/Problem";
import { Toaster } from "../../../components/Academy/UI/toaster";
import DashboardSection from "../../../components/Academy/Students/DashboardSection";
import ContactSection from "../../../components/Academy/Contact/ContactSection";
import CorporateHeader from "../../../components/Header/AcademyHeader";
import FloatingActionMenu from "../../../components/Academy/StickyButton/StickyButton/FloatingAction";
import Courses from "../../../components/Academy/Students/Courses";
import TestimonialVideoCarousel from "../../../components/Academy/Students/StudentCarouselVideo";
import Hero from "../../../components/Academy/Students/Herobanner/Hero";
import YouTubeFeed from "../../../components/Academy/Students/youtubelive";
import CurrentBlogs from "../../../components/Academy/Students/Current_blogs";
import ServicesSection from "../../../components/Academy/Students/ServicesSection";

const Academy = ({ userType = "teacher" }: { userType?: "teacher" | "student" }) => {
  void userType;

  const [blurPercent, setBlurPercent] = useState(0);
  const contactRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToLogo = () => {
    logoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    AOS.init({});
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const hash = location.hash;
    if (hash === "#contact-section") {
      const section = document.getElementById("contact-section");
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  useEffect(() => {
    const hash = location.hash;
    if (hash === "#logo-section-student") {
      const section = document.getElementById("logo-section-student");
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#services") {
      const section = document.getElementById("services");
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 500);
      }
    }
  }, []);

  useEffect(() => {
    const hash = location.hash;
    if (hash === "#course-cards-section") {
      const section = document.getElementById("course-cards-section");
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const logoSection = document.getElementById("logo-section");
      let blurProgress = 0;

      if (logoSection) {
        const rect = logoSection.getBoundingClientRect();
        const start = heroHeight;
        const end = heroHeight * 0.25;
        const progress = (start - rect.top) / (start - end);
        blurProgress = Math.min(Math.max(progress, 0), 1);
      }

      setBlurPercent(blurProgress * 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
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
        <CorporateHeader />

        <div className="w-full h-auto">
          <div className="w-full relative">
            <div className="relative">
              <Hero
                HeroToLogo={scrollToLogo}
                HeroToContact={scrollToContact}
                blurAmount={(12 * blurPercent) / 100}
              />
            </div>
          </div>

          <Toaster />
        </div>

        <FloatingActionMenu />

        <div className="min-h-auto flex items-center justify-center relative z-10 mt-[100vh]">
          <div ref={logoRef} className="relative z-0 w-full" id="logo-section">
            <div className="w-full h-[200px]">
              <img
                src="/academy/studentlineart.svg"
                alt="Wave"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div id="course-cards-section" className="min-h-auto flex items-center justify-center relative z-10 bg-white">
          <Logos />
        </div>

        <Problem />

        <div className="min-h-auto relative z-10">
          <ServicesSection />
        </div>

        <div id="course-cards-section" className="min-h-screen flex items-center justify-center relative z-10 bg-white">
          <Courses />
        </div>

        <div className="min-h-screen flex items-center justify-center relative z-10 bg-white">
          <DashboardSection />
        </div>

        <div className="min-h-screen flex items-center justify-center relative z-10 bg-white">
          <Testimonialss />
        </div>

        <div className="min-h-auto flex items-center justify-center relative z-10 bg-white">
          <TestimonialVideoCarousel />
        </div>

        <div className="min-h-auto flex items-center justify-center relative z-10 bg-white">
          <YouTubeFeed />
        </div>

        <div className="min-h-screen flex items-center justify-center relative z-10 bg-white">
          <ResourcesPage />
        </div>

        <div className="h-auto flex items-center justify-center relative z-10 bg-white">
          <CurrentBlogs />
        </div>

        <div ref={contactRef} id="contact-section">
          <ContactSection />
        </div>
      </div>
    </>
  );
};

export default Academy;
