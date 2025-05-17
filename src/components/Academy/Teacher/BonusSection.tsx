import React from 'react';
import { Button } from '../UI/button';
import { useToast } from '@/hooks/use-toast';

interface TemplateItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const BonusSection: React.FC = () => {
  const { toast } = useToast();
  
  const handleDownload = (item: string) => {
    toast({
      title: "Download initiated",
      description: `Your ${item} template is being prepared for download.`,
    });
  };
  
  const templates = [
    {
      title: "Lesson Plan Formats",
      description: "Ready-to-use templates for daily, weekly and monthly lesson planning aligned with NEP 2020.",
      icon: <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-education-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
    },
    {
      title: "Assessment Rubrics",
      description: "Comprehensive evaluation frameworks for project-based and competency-based assessments.",
      icon: <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-education-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
    },
    {
      title: "Student Engagement Checklist",
      description: "Tools and techniques to boost classroom participation and measure engagement metrics.",
      icon: <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-education-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
    },
    {
      title: "Digital Tool Guide for Teachers",
      description: "Comprehensive handbook for leveraging technology effectively in traditional and digital classrooms.",
      icon: <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-education-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
    }
  ];

  return (
    <div className="bg-education-light rounded-xl p-6 shadow-md animate-fade-in">
      <div className="text-center mb-8">
        <span className="bg-education-primary/10 text-education-primary px-4 py-1 rounded-full text-sm font-medium">
          BONUS MATERIALS
        </span>
        <h3 className="text-2xl font-bold mt-3 mb-2">Downloadable Templates</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Enhance your teaching toolkit with our premium resources designed for the modern educator
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {templates.map((template, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow flex items-start gap-4 hover:shadow-md transition-shadow">
            {template.icon}
            <div>
              <h4 className="font-semibold">{template.title}</h4>
              <p className="text-gray-600 text-sm mt-1">{template.description}</p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2 text-education-primary hover:text-education-primary hover:bg-education-primary/10"
                onClick={() => handleDownload(template.title)}
              >
                Download Template
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <Button className="bg-education-secondary hover:bg-education-secondary/90">
          Get All Templates Bundle
        </Button>
      </div>
    </div>
  );
};

export default BonusSection;