import React from 'react';
import { Button } from "@/components/ui/button";
import {
  BookCheck,
  Briefcase,
  GraduationCap,
  Brain,
  Rocket,
  Handshake,
  ArrowUpRight
} from "lucide-react";

interface CTAButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
  onClick?: () => void;
}


// CTAButton Component
const CTAButton = ({ children, variant, onClick }: CTAButtonProps) => {
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
    },
    {
      icon: <Briefcase size={24} />,
      title: "Career Counselling & Employability Capsules",
      description: "Guidance and resources to enhance career readiness and employability",
     
    },
    {
      icon: <GraduationCap size={24} />,
      title: "NEP-Aligned Faculty Development Program",
      description: "Training programs for educators aligned with National Education Policy",
    },
    {
      icon: <Brain size={24} />,
      title: "AI, Digital Pedagogy, & Soft Skills Training",
      description: "Modern skill development in emerging technologies and soft skills",
    },
    {
      icon: <Rocket size={24} />,
      title: "Startup Bootcamps, Hackathons, Project Showcases",
      description: "Interactive events to foster innovation and entrepreneurship",
    },
    {
      icon: <Handshake size={24} />,
      title: "Placement & Internship Management",
      description: "Complete ecosystem for connecting students with career opportunities",
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-0 mt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className=" mx-auto text-center mb-4 xl:mb-8 2xl:mb-12">
          <h2 className="text-3xl xl:text-3xl   font-bold text-slate-800 mb-5">
            Solutions for State Skill Development Missions, Education Boards & Universities
          </h2>
          <p className="text-base xl:text-xl   text-slate-600  mx-auto">
            We offer comprehensive solutions tailored for government educational institutions and skill development initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-4 mb-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group animate-fade-in bg-white"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12  rounded-xl flex items-center justify-center group-hover:text-black group-hover:border-blue-600 group-hover:bg-blue-100 bg-red-50 border-2 border-red-300 text-red-600 transition-all duration-300">
                  {service.icon}
                </div>
                <ArrowUpRight className="text-black/40 group-hover:text-black/90 w-8 h-8 rounded-full p-1.5 bg-black/5 flex items-center justify-center transition-colors" size={25} />
              </div>
              <h3 className="text-base font-semibold text-slate-800 mb-2 ">{service.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 animate-fade-in max-w-2xl mx-auto">
          <CTAButton variant="primary" onClick={() => {
            const contactElement = document.getElementById('contact');
            if (contactElement) {
              contactElement.scrollIntoView({ behavior: 'smooth' });
            }
          }}>
            Download Full Course Catalog
          </CTAButton>
          <CTAButton variant="secondary" onClick={() => {
            const contactElement = document.getElementById('contact');
            if (contactElement) {
              contactElement.scrollIntoView({ behavior: 'smooth' });
            }
          }}>
            Request Blueprint
          </CTAButton>
        </div>
      </div>
    </section>
  );
};

export default GovServiceSection;