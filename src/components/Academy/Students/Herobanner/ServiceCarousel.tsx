import React, { useState, useEffect } from 'react';
import { type ServiceData } from '../../UI/services';

interface ServiceCarouselProps {
  services: ServiceData[];
  activeServiceId: string;
  onServiceChange: (serviceId: string) => void;
}

const ServiceCarousel: React.FC<ServiceCarouselProps> = ({ 
  services, 
  activeServiceId,
  onServiceChange 
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Find the index of the active service
  useEffect(() => {
    const index = services.findIndex(service => service.id === activeServiceId);
    if (index !== -1) setActiveIndex(index);
  }, [activeServiceId, services]);

  // Auto-rotate carousel every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % services.length;
      onServiceChange(services[nextIndex].id);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeIndex, services, onServiceChange]);

  const activeService = services[activeIndex];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl">
      {/* Background color overlay */}
      <div 
        className={`absolute inset-0 opacity-20 transition-colors duration-500 ${activeService.color}`} 
      />
      
      {/* Illustration */}
      <div className="relative w-4/5 h-4/5 hero-fade-in">
        <img 
          src={activeService.illustration} 
          alt={activeService.name}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default ServiceCarousel;