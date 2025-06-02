import React, { useState } from 'react';
import { Button } from '../../UI/button';
import { servicesStudent } from '../../UI/servicesStudent'; 
import ServiceCarousel from './ServiceCarousel';
import Schedule from './Schedule';
import {  ArrowDown,ArrowRight, Download, Mail } from 'lucide-react';
import { Dialog, DialogContent } from '../../UI/dialog';
import EnquiryForm from './EnquiryForm';
import DownloadForm from './DownloadForm';
import FloatingActionButton from '../FAB/FloatingActionButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { PopupButton } from 'react-calendly';


interface HeaderProps {
   HeroToContact: () => void;
   HeroToLogo: () => void;
}


const HeroBanner = ({  HeroToContact,HeroToLogo }: HeaderProps) =>{

  const [activeServiceId, setActiveServiceId] = useState(servicesStudent[0].id);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  
    const location = useLocation();
  const navigate = useNavigate();

  const activeService = servicesStudent.find(service => service.id === activeServiceId) || servicesStudent[0];
  
  const handleServiceClick = (serviceId: string) => {
    setActiveServiceId(serviceId);
  };
  

  const toggleSchedule = () => {
    setShowSchedule(!showSchedule);
  };



    const scrollToSection = () => {
      const section = document.getElementById('contact-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    };
  
      const isSchoolPage = location.pathname === '/academia/school';
  
      const handleClick = useCallback(() => {
        if (isSchoolPage) {
          scrollToSection();
        } else {
          navigate('/academia/school#contact-section');
        }
      }, [isSchoolPage, navigate]);
  

  return (
    <div className="w-full bg-white fixed">
      <div className="w-full mx-auto px-4 py-8">
        {/* Main Hero Section */}
        {/* <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Left Column - Carousel */}
          {/* <div className="w-full md:w-1/2 h-80 md:h-[500px] rounded-2xl shadow-sm overflow-hidden">
            <ServiceCarousel 
              services={servicesStudent}
              activeServiceId={activeServiceId}
              onServiceChange={setActiveServiceId}
            />
          </div>
           */}
          {/* Right Column - Content */}
          {/* <div className="w-full md:w-1/2 flex flex-col justify-center">
            <div className="hero-fade-in">
              <h1 className="text-xl md:text-3xl lg:text-3xl font-bold mb-4 whitespace-pre-line">
                {activeService.headline}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                {activeService.subtext}
              </p>
              <Button 
                onClick={toggleSchedule}
                className="mb-8 px-6 py-6 text-lg rounded-xl shadow-md bg-gradient-to-r from-red-400 to-red-500 hover:from-red-600"
              >
                Schedule <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
             */}
            {/* Schedule Component - Conditionally shown */}
            {/* {showSchedule && (
              <div className="mb-6">
                <Schedule />
              </div>
            )} */}
            
            {/* Action Buttons */}
            {/* <div className="flex gap-4">
              <Button 
                variant="outline" 
                className="flex-1 py-6 border-2"
                onClick={() => setShowEnquiry(true)}
              > */}
                {/* <Mail className="mr-2 h-5 w-5" /> Enquiry
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 py-6 border-2"
                onClick={() => setShowDownload(true)}
              >
                <Download className="mr-2 h-5 w-5" /> Download
              </Button>
            </div>
          </div>
        </div> */} 


<div className="relative w-full mb-8">
  <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden bg-white/90">
    {/* Left: Carousel (1/3) */}
    <div className="w-full md:w-2/5 h-[220px] md:h-full flex-shrink-0 flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        <ServiceCarousel 
          services={servicesStudent}
          activeServiceId={activeServiceId}
          onServiceChange={setActiveServiceId}
          transitionDuration={300}
          rotationInterval={5000}
        />
      </div>
    </div>
    {/* Right: Text (2/3) */}
    <div className="w-full md:w-3/5 flex flex-col justify-center p-6 md:pl-12 md:pr-12 h-[220px] md:h-full">
      <div className="flex flex-col justify-center h-full">
        <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-4 whitespace-pre-line">
          {activeService.headline}
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          {activeService.subtext}
        </p>
        {/* <PopupButton 
          url="https://calendly.com/karthikeyan-rareminds/30min"
          rootElement={document.getElementById('root')!}
          text="Schedule"
          className="mb-6 px-4 py-2 text-lg rounded-xl shadow-md bg-red-500 hover:bg-red-600"
        />
        {showSchedule && (
          <div className="mb-4">
            <Schedule />
          </div>
        )} */}
        {/* <div className="flex gap-4">
          <Button 
            variant="outline" 
            className="flex-1 py-4 border-2"
            onClick={handleClick}
          >
            <Mail className="mr-2 h-5 w-5" /> Enquiry
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 py-4 border-2"
            onClick={() => setShowDownload(true)}
          >
            <Download className="mr-2 h-5 w-5" /> Download
          </Button>
        </div> */}
      </div>
    </div>
  </div>
</div>


       {/* Service Navigation */}
              {/* <div className="flex justify-center py-4 border-t">
                <div className="flex flex-wrap justify-center md:gap-8 px-4">
                  {servicesStudent.map((service) => (
                    <div
                      key={service.id}
                      className={`py-2 px-1 md:text-lg text-[14px] font-bold  transition-all duration-300 ${
                        service.id === activeServiceId ? 'service-item-active' : 'service-item text-gray-500'
                      }`}
                      onClick={() => handleServiceClick(service.id)}
                    >
                      {service.name}
                    </div>
                  ))}
                </div>
              </div> */}
            </div>

<div className="hidden lg:block container">
   <div
  onClick={HeroToLogo}
  className="w-max absolute left-[50%] bottom-[20%] cursor-pointer transition-opacity z-10 "
  aria-label="Scroll down"
>
  <div className="relative  w-[90px] h-[90px] right-[10%]">
    <img
      src="https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/Index/Hero/scroll.png"
      alt="Scroll down"
      className="w-full h-full object-contain scroll-rotate animate-spin-slow"
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <ArrowDown className="text-black w-5 h-5 animate-ping" />
    </div>
  </div>
</div>

      </div>
      {/* Enquiry Form Dialog
      <Dialog open={showEnquiry} onOpenChange={setShowEnquiry}>
        <DialogContent className="sm:max-w-[500px]">
          <EnquiryForm onClose={() => setShowEnquiry(false)} />
        </DialogContent>
      </Dialog> */}

      {/* Download Form Dialog */}
      <Dialog open={showDownload} onOpenChange={setShowDownload}>
        <DialogContent className="sm:max-w-[500px]">
          <DownloadForm 
            onClose ={() => setShowDownload(false)} 
            activeService={activeService}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeroBanner;