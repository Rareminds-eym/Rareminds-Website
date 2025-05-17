import React, { useState } from 'react';
import { Button } from '../../UI/button';
import { servicesStudent } from '../../UI/servicesStudent'; 
import ServiceCarousel from './ServiceCarousel';
import Schedule from './Schedule';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { Dialog, DialogContent } from '../../UI/dialog';
import EnquiryForm from './EnquiryForm';
import DownloadForm from './DownloadForm';
import FloatingActionButton from '../FAB/FloatingActionButton';

const HeroBanner = () => {
  const [activeServiceId, setActiveServiceId] = useState(servicesStudent[0].id);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  
  const activeService = servicesStudent.find(service => service.id === activeServiceId) || servicesStudent[0];
  
  const handleServiceClick = (serviceId: string) => {
    setActiveServiceId(serviceId);
  };
  

  const toggleSchedule = () => {
    setShowSchedule(!showSchedule);
  };

  return (
    <div className="w-full bg-white">
      <div className="container mx-auto px-4 py-8">
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
  {/* Left Column - Full Banner Carousel */}
  <div className="w-full h-[300px] md:h-[400px] overflow-hidden">
    <ServiceCarousel 
      services={servicesStudent}
      activeServiceId={activeServiceId}
      onServiceChange={setActiveServiceId}
    />
  </div>

  {/* Right Column - Content (overlay on md+, stacked below on mobile) */}
  <div className="w-full md:w-1/2 p-6  md:pl-12  md:pr-12
                  md:absolute md:top-0 md:right-0 md:h-full 
                  flex items-center bg-white/90 md:bg-transparent">
    <div className="hero-fade-in">
      <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-4 whitespace-pre-line">
        {activeService.headline}
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        {activeService.subtext}
      </p>
      <Button 
        onClick={toggleSchedule}
        className="mb-6 px-6 py-4 text-lg rounded-xl shadow-md bg-gradient-to-r from-red-400 to-red-500 hover:from-red-600"
      >
        Schedule <ArrowRight className="ml-2 h-5 w-5" />
      </Button>

      {/* Schedule Component */}
      {showSchedule && (
        <div className="mb-4">
          <Schedule />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button 
          variant="outline" 
          className="flex-1 py-4 border-2"
          onClick={() => setShowEnquiry(true)}
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
      </div>
    </div>
  </div>
</div>

        
        {/* Service Navigation */}
        <div className="flex justify-center py-4 border-t">
          <div className="flex flex-wrap justify-center gap-4 px-2">
            {servicesStudent.map((service) => (
              <div
                key={service.id}
                className={`py-2 px-1 text-[14px] md:text-lg font-bold  transition-all duration-300 ${
                  service.id === activeServiceId ? 'service-item-active' : 'service-item text-gray-500'
                }`}
                onClick={() => handleServiceClick(service.id)}
              >
                {service.name}
              </div>
            ))}
          </div>
          {/* <FloatingActionButton  /> */}
        </div>
      </div>

      {/* Enquiry Form Dialog */}
      <Dialog open={showEnquiry} onOpenChange={setShowEnquiry}>
        <DialogContent className="sm:max-w-[500px]">
          <EnquiryForm onClose={() => setShowEnquiry(false)} />
        </DialogContent>
      </Dialog>

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