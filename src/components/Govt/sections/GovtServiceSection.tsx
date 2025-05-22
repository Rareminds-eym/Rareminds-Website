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