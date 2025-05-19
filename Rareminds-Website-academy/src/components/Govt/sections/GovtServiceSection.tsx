import React from 'react';
import { Button } from "@/components/ui/button";
import {
  BookCheck,
  Briefcase,
  GraduationCap,
  Brain,
  Rocket,
  Handshake,
  ChevronRight
} from "lucide-react";

interface CTAButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
  onClick?: () => void;
}


// CTAButton Component
const CTAButton = ({ children, variant,onClick }: CTAButtonProps) => {
  const base = 'px-6 py-3 font-semibold rounded-2xl  transition duration-300';
  const styles = variant === 'primary'
     ? 'border border-gray-300 border-b-4 border-gray-300  hover:bg-gray-100 '
    : 'bg-red-500 text-white border-b-4 border-red-300 hover:bg-red-600';

  return (
    <button className={`${base} ${styles}`} onClick={onClick}>
      {children}
    </button>
  );
};


const GovServiceSection: React.FC = () => {
  const services = [
    {
      icon: <BookCheck size={24} />,
      title: "45-Hour Industry-Relevant Skilling Courses",
      description: "Comprehensive courses designed to meet  industry standards and requirements",
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      icon: <Briefcase size={24} />,
      title: "Career Counselling & Employability Capsules",
      description: "Guidance and resources to enhance career readiness and employability",
      color: "bg-green-500/10 text-green-600",
    },
    {
      icon: <GraduationCap size={24} />,
      title: "NEP-Aligned Faculty Development Program",
      description: "Training programs for educators aligned with National Education Policy",
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      icon: <Brain size={24} />,
      title: "AI, Digital Pedagogy, & Soft Skills Training",
      description: "Modern skill development in emerging technologies and soft skills",
      color: "bg-red-500/10 text-red-600",
    },
    {
      icon: <Rocket size={24} />,
      title: "Startup Bootcamps, Hackathons, Project Showcases",
      description: "Interactive events to foster innovation and entrepreneurship",
      color: "bg-amber-500/10 text-amber-600",
    },
    {
      icon: <Handshake size={24} />,
      title: "Placement & Internship Management",
      description: "Complete ecosystem for connecting students with career opportunities",
      color: "bg-indigo-500/10 text-indigo-600",
    },
  ];

  return (
    <section className="mt-10 py-6">
      <div className="container mx-auto px-4">
        <div className=" mx-auto text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-5">
            Solutions for State Skill Development Missions, Education Boards & Universities
          </h2>
          <p className="text-lg text-slate-600">
            We offer comprehensive solutions tailored for government educational institutions and skill development initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-slate-200 shadow-sm transition-all duration-300  group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={"w-12 h-12 text-white rounded-full shadow-lg bg-gradient-to-b from-red-400 via-red-500 to-red-400  border-2 border-red-300 flex items-center justify-center mb-5"}>
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">{service.title}</h3>
              <p className="text-slate-600 mb-5">{service.description}</p>
              {/* <a href="#" className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                Learn more <ChevronRight size={18} className="ml-1 transition-transform group-hover:translate-x-1" />
              </a> */}
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-6 animate-fade-in">
          <CTAButton variant="primary">
            Download Full Course Catalog
          </CTAButton>
          <CTAButton variant="secondary" >
            Request Blueprint
          </CTAButton>
        </div>

        {/* <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-5xl mx-auto border border-slate-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:max-w-md">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Ready to transform your institution?</h3>
              <p className="text-slate-600 mb-6">
                Get access to our complete catalog of government-focused solutions and implementation blueprints.
              </p>

              <div className="flex flex-col sm:flex-row sm:justify-start items-stretch gap-4 w-full max-w-full px-4">
                <Button
                  size="lg"
                  className="bg-gov-blue hover:bg-gov-navy w-full sm:w-auto px-6 py-5 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                  Full Course Catalog
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-gov-blue text-gov-blue hover:bg-gov-lightblue w-full sm:w-auto px-6 py-5 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" x2="8" y1="13" y2="13" />
                    <line x1="16" x2="8" y1="17" y2="17" />
                    <line x1="10" x2="8" y1="9" y2="9" />
                  </svg>
                  Request Blueprint
                </Button>
              </div>


            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex -space-x-4">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center border-2 border-white z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0052A5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>
                </div>
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center border-2 border-white z-20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building"><rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" /></svg>
                </div>
                <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center border-2 border-white z-30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open-check"><path d="M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4Z" /><path d="m16 12 2 2 4-4" /><path d="M22 18h-7c-1.7 0-3 1.3-3 3V7c0-2.2 1.8-4 4-4h7v15Z" /></svg>
                </div>
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center border-2 border-white z-40">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-2 text-center w-full">
                Trusted by 10+ government institutions across India
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default GovServiceSection;