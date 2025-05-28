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
  
  useEffect(() => {
    const index = services.findIndex(service => service.id === activeServiceId);
    if (index !== -1) setActiveIndex(index);
  }, [activeServiceId, services]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % services.length;
      onServiceChange(services[nextIndex].id);
    }, rotationInterval);
    
    return () => clearInterval(interval);
  }, [activeIndex, services, onServiceChange, rotationInterval]);

  const activeService = services[activeIndex];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl">
      <div 
        className={`absolute inset-0 opacity-20`}
        style={{ 
          transition: `all ${transitionDuration}ms ease-out`
        }}
      />
      <div 
        className="relative w-full h-full flex items-center justify-center"
        style={{
          transition: `all ${transitionDuration}ms ease-out`
        }}
      >
        <img 
          src={activeService.illustration} 
          alt={activeService.name}
          className="w-full h-full object-cover"
          style={{
            transition: `transform ${transitionDuration}ms ease-out`,
            transform: 'translateY(0)'
          }}
        />
      </div>
    </div>
  );
};

export default ServiceCarousel;