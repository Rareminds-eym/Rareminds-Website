// import React, { useState, useEffect } from 'react';
// import { type ServiceData } from '../../UI/services';

// interface ServiceCarouselProps {
//   services: ServiceData[];
//   activeServiceId: string;
//   onServiceChange: (serviceId: string) => void;
//   transitionDuration?: number;
//   rotationInterval?: number;
// }

// const ServiceCarousel: React.FC<ServiceCarouselProps> = ({ 
//   services, 
//   activeServiceId,
//   onServiceChange,
//   transitionDuration = 300,
//   rotationInterval = 5000
// }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
  
//   useEffect(() => {
//     const index = services.findIndex(service => service.id === activeServiceId);
//     if (index !== -1) setActiveIndex(index);
//   }, [activeServiceId, services]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const nextIndex = (activeIndex + 1) % services.length;
//       onServiceChange(services[nextIndex].id);
//     }, rotationInterval);
    
//     return () => clearInterval(interval);
//   }, [activeIndex, services, onServiceChange, rotationInterval]);

//   const activeService = services[activeIndex];

//   return (
//     <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl">
//       <div 
//         className={`absolute inset-0 opacity-20`}
//         style={{ 
//           transition: `all ${transitionDuration}ms ease-out`
//         }}
//       />
//       <div 
//         className="relative w-full h-full flex items-center justify-center"
//         style={{
//           transition: `all ${transitionDuration}ms ease-out`
//         }}
//       >
//         <img 
//           src={activeService.illustration} 
//           alt={activeService.name}
//           className="w-full h-full object-cover"
//           style={{
//             transition: `transform ${transitionDuration}ms ease-out`,
//             transform: 'translateY(0)'
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default ServiceCarousel;

import React, { useState, useEffect } from 'react';
import { type ServiceData } from '../../UI/services';

interface ServiceCarouselProps {
  services: ServiceData[];
  activeServiceId: string;
  onServiceChange: (serviceId: string) => void;
  transitionDuration?: number;
  rotationInterval?: number;
}

const ServiceCarousel: React.FC<ServiceCarouselProps> = ({ 
  services, 
  activeServiceId,
  onServiceChange,
  transitionDuration = 300,
  rotationInterval = 5000
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  useEffect(() => {
    const index = services.findIndex(service => service.id === activeServiceId);
    if (index !== -1 && index !== activeIndex) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex(index);
        setIsTransitioning(false);
      }, 50);
    }
  }, [activeServiceId, services, activeIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % services.length;
      onServiceChange(services[nextIndex].id);
    }, rotationInterval);
    
    return () => clearInterval(interval);
  }, [activeIndex, services, onServiceChange, rotationInterval]);

  const activeService = services[activeIndex];

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div 
        className={`w-full h-full transition-all duration-300 ease-out ${
          isTransitioning ? 'opacity-80 scale-105' : 'opacity-100 scale-100'
        }`}
      >
        <img 
          key={activeService.id}
          src={activeService.illustration} 
          alt={activeService.name}
          className="w-full h-full object-cover transition-transform duration-300 ease-out"
        />
      </div>
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10" />
    </div>
  );
};

export default ServiceCarousel;
