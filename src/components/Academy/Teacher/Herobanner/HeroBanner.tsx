// import React, { useState } from 'react';
// import { Button } from '../../UI/button';
// import { services } from '../../UI/services'; 
// import ServiceCarousel from './ServiceCarousel';
// import Schedule from './Schedule';
// import { ArrowDown,ArrowRight, Download, Mail } from 'lucide-react';
// import { Dialog, DialogContent } from '../../UI/dialog';
// import EnquiryForm from './EnquiryForm';
// import DownloadForm from './DownloadForm';
// import FloatingActionButton from '../FAB/FloatingActionButton';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useCallback } from 'react';
// import { PopupButton } from 'react-calendly';



// interface HeaderProps {
//    HeroToContact: () => void;
//     HeroToLogo: () => void;
// }

// const HeroBanner = ({  HeroToContact,HeroToLogo }: HeaderProps) =>{

//   const [activeServiceId, setActiveServiceId] = useState(services[0].id);
//   const [showSchedule, setShowSchedule] = useState(false);
//   const [showEnquiry, setShowEnquiry] = useState(false);
//   const [showDownload, setShowDownload] = useState(false);

//     const location = useLocation();
//   const navigate = useNavigate();
  
//   const activeService = services.find(service => service.id === activeServiceId) || services[0];
  
//   const handleServiceClick = (serviceId: string) => {
//     setActiveServiceId(serviceId);
//   };
  

//   const scrollToSection = () => {
//     const section = document.getElementById('contact-section');
//     if (section) {
//       section.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//     const isSchoolPage = location.pathname === '/academia/school';

//     const handleClick = useCallback(() => {
//       if (isSchoolPage) {
//         scrollToSection();
//       } else {
//         navigate('/academia/school#contact-section');
//       }
//     }, [isSchoolPage, navigate]);

//   const toggleSchedule = () => {
//     setShowSchedule(!showSchedule);
//   };

//   return (
//     <div className="w-full bg-white fixed ">
//       <div className="container mx-auto px-4 py-8">
        
//         {/* Main Hero Section */}
//         {/* <div className="flex flex-col md:flex-row gap-8 mb-8">
//           {/* Left Column - Carousel */}
//           {/* <div className="w-full md:w-1/2 h-80 md:h-[500px] bg-white overflow-hidden">
//             <ServiceCarousel 
//               services={services}
//               activeServiceId={activeServiceId}
//               onServiceChange={setActiveServiceId}
//             />
//           </div> */} 
          
//           {/* Right Column - Content */}
//           {/* <div className="w-full md:w-1/2 flex flex-col justify-center">
//             <div className="hero-fade-in">
//               <h1 className="text-xl md:text-3xl lg:text-3xl font-bold mb-4 whitespace-pre-line">
//                 {activeService.headline}
//               </h1>
//               <p className="text-lg text-gray-600 mb-6">
//                 {activeService.subtext} */}
//               {/* </p>
//               <Button 
//                 onClick={toggleSchedule}
//                 className="mb-8 px-6 py-6 text-lg rounded-xl shadow-md bg-gradient-to-r from-red-400 to-red-500 hover:from-red-600"
//               >
//                 Schedule <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//             </div>
//              */}
//             {/* Schedule Component - Conditionally shown */}
//             {/* {showSchedule && (
//               <div className="mb-6">
//                 <Schedule />
//               </div>
//             )}
//              */}
//             {/* Action Buttons */}
//             {/* <div className="flex gap-4">
//               <Button 
//                 variant="outline" 
//                 className="flex-1 py-6 border-2"
//                 onClick={() => setShowEnquiry(true)}
//               >
//                 <Mail className="mr-2 h-5 w-5" /> Enquiry
//               </Button>
//               <Button 
//                 variant="outline" 
//                 className="flex-1 py-6 border-2"
//                 onClick={() => setShowDownload(true)}
//               > */}
//                 {/* <Download className="mr-2 h-5 w-5" /> Download
//               </Button>
//             </div> */}
         
//           {/* </div>
//         </div> */}





// <div className="relative w-full mb-8 ">
  
//   {/* Left Column - Full Banner Carousel */}
//   <div className="w-full h-[250px] md:h-[70vh] overflow-hidden">    <ServiceCarousel 
//       services={services}
//       activeServiceId={activeServiceId}
//       onServiceChange={setActiveServiceId}
//       transitionDuration={300}
//       rotationInterval={5000}
//     />
//   </div>
//   {/* Right Column - Content (overlay on md+, stacked below on mobile) */}  <div className="w-full md:w-1/2 p-6 md:pl-12  md:pr-12
//                   md:absolute md:top-0 md:right-0 md:h-full 
//                   flex items-center bg-white/90 md:bg-transparent"
//                   style={{ transition: 'none' }}
//                   style={{ transition: 'none' }}>
//     <div style={{ transition: 'none' }}>
//       <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-4 whitespace-pre-line"
//           style={{ transition: 'none' }}>
//         {activeService.headline}
//       </h1>
//       <p className="text-lg text-gray-700 mb-6">
//         {activeService.subtext}
//       </p>     
// {/* <PopupButton 
//   url="https://calendly.com/karthikeyan-rareminds/30min"
//   rootElement={document.getElementById('root')!}
//   text="Schedule"
//   className="mb-6 px-4 py-2 text-lg rounded-xl shadow-md bg-red-500 hover:bg-red-600"
// /> */}

//       {/* Schedule Component */}
//       {/* {showSchedule && (
//         <div className="mb-4">
//           <Schedule />
//         </div>
//       )} */}

//       {/* Action Buttons */}
//       {/* <div className="flex gap-4">
//         <Button 
//           variant="outline" 
//           className="flex-1 py-4 border-2"
//           onClick={handleClick}
//         >
//           <Mail className="mr-2 h-5 w-5" /> Enquiry
//         </Button>
//         <Button 
//           variant="outline" 
//           className="flex-1 py-4 border-2"
//           onClick={() => setShowDownload(true)}
//         >
//           <Download className="mr-2 h-5 w-5" /> Download
//         </Button>
//       </div>
//        */}
//     </div>
//   </div>
// </div>
        
//         {/* Service Navigation */}
//         <div className="flex justify-center py-4 border-t">
//           <div className="flex flex-wrap justify-center md:gap-8 px-4">
//             {services.map((service) => (
//               <div
//                 key={service.id}
//                 className={`py-2 px-1 md:text-lg text-[14px] font-bold  transition-all duration-300 ${
//                   service.id === activeServiceId ? 'service-item-active' : 'service-item text-gray-500'
//                 }`}
//                 onClick={() => handleServiceClick(service.id)}
//               >
//                 {service.name}
//               </div>
//               ))}
//           </div>
//         </div>
//       </div>


//   <div className="hidden lg:block container">
//    <div
//   onClick={HeroToLogo}
//   className="w-max absolute left-[50%] bottom-[20%] cursor-pointer transition-opacity z-10 "
//   aria-label="Scroll down"
// >
//   <div className="relative animate-bounce w-[90px] h-[90px] ">
//     <img
//       src="https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/Index/Hero/scroll.png"
//       alt="Scroll down"
//       className="w-full h-full object-contain scroll-rotate animate-spin-slow"
//     />
//     <div className="absolute inset-0 flex items-center justify-center">
//       <ArrowDown className="text-black w-5 h-5 animate-ping" />
//     </div>
//   </div>
// </div>

//       </div>
//       {/* Enquiry Form Dialog
//       <Dialog open={showEnquiry} onOpenChange={setShowEnquiry}>
//         <DialogContent className="sm:max-w-[500px]">
//           <EnquiryForm onClose={() => setShowEnquiry(false)} />
//         </DialogContent>
//       </Dialog> */}

//       {/* Download Form Dialog */}
//       <Dialog open={showDownload} onOpenChange={setShowDownload}>
//         <DialogContent className="sm:max-w-[500px]">
//           <DownloadForm 
//             onClose ={() => setShowDownload(false)} 
//             activeService={activeService}
//           />
//         </DialogContent>
//       </Dialog>

       
//     </div>
//   );
// };

// export default HeroBanner;

import React, { useState, useEffect, useCallback } from 'react';
import { services } from '../../UI/services'; // Adjust this import path as needed
import { ArrowDown } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface HeroCarouselProps {
  HeroToContact: () => void;
  HeroToLogo: () => void;
  transitionDuration?: number;
  rotationInterval?: number;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({
  HeroToContact,
  HeroToLogo,
  transitionDuration = 500,
  rotationInterval = 5000,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  // Autoplay rotate through services
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [rotationInterval]);

  const isSchoolPage = location.pathname === '/academia/school';

  // Scroll to contact section or navigate accordingly
  const handleClick = useCallback(() => {
    if (isSchoolPage) {
      const section = document.getElementById('contact-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/academia/school#contact-section');
    }
  }, [isSchoolPage, navigate]);

  // User manual select service
  const handleServiceClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="w-full h-screen relative overflow-hidden bg-white">
      {/* Slides container */}
      <div
        className="flex h-full transition-transform ease-in-out"
        style={{
          width: `${services.length * 100}%`,
          transform: `translateX(-${(100 / services.length) * activeIndex}%)`,
          transitionDuration: `${transitionDuration}ms`,
        }}
      >
        {services.map((service) => (
          <div
            key={service.id}
            className="relative flex-shrink-0 w-full h-full"
          >
            {/* Background image */}
            <img
              src={service.illustration}
              alt={service.name}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30" />

            {/* Text content */}
            <div className="relative z-10 flex flex-col justify-center h-full max-w-3xl px-6 md:px-12 text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 whitespace-pre-line drop-shadow-lg">
                {service.headline}
              </h1>
              <p className="text-lg md:text-xl mb-8 drop-shadow-md max-w-xl">
                {service.subtext}
              </p>
              <button
                onClick={handleClick}
                className="w-max px-6 py-3 bg-white/90 text-black font-semibold rounded-md hover:bg-white transition"
              >
                Contact Us
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Service Navigation */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-6 bg-white/90 rounded-full px-6 py-2 shadow-lg z-20">
        {services.map((service, idx) => (
          <button
            key={service.id}
            onClick={() => handleServiceClick(idx)}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              idx === activeIndex
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            {service.name}
          </button>
        ))}
      </div>

      {/* Scroll down indicator */}
      <div
        onClick={HeroToLogo}
        className="hidden lg:block absolute left-1/2 bottom-24 -translate-x-1/2 cursor-pointer z-20"
        aria-label="Scroll down"
      >
        <div className="relative animate-bounce w-[90px] h-[90px]">
          <img
            src="https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/Index/Hero/scroll.png"
            alt="Scroll down"
            className="w-full h-full object-contain scroll-rotate"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <ArrowDown className="text-black w-5 h-5 animate-ping" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
