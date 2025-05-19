import React from 'react';
import { Button } from '../UI/button';
import { useToast } from '@/hooks/use-toast';

const CTASection: React.FC = () => {
  const { toast } = useToast();
  
  const handleDownloadPDF = () => {
    toast({
      title: "PDF Download Started",
      description: "Your 5-Day TDP Calendar PDF is being downloaded.",
    });
  };
  
  const handleContactRequest = () => {
    toast({
      title: "Request Received",
      description: "Our Academic Program Head will contact you shortly.",
    });
  };
  
  return (
    <div className="bg-gradient-to-r from-education-primary to-education-secondary text-white rounded-xl p-8 shadow-xl">
      <div className="text-center mb-8 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Faculty who learn, lead. Classrooms that change, inspire.</h2>
        <p className="text-lg opacity-90">
          Transform your teaching approach and empower your educators with our comprehensive development program.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          variant="outline" 
          size="lg"
          onClick={handleDownloadPDF}
          className="bg-white/10 hover:bg-white/20 text-white border-white/30"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Full 5-Day TDP Calendar PDF
        </Button>
        
        <Button 
          variant="secondary" 
          size="lg"
          onClick={handleContactRequest}
          className="bg-white text-education-primary hover:bg-opacity-90"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          Talk to Our Academic Program Head
        </Button>
      </div>
    </div>
  );
};

export default CTASection;