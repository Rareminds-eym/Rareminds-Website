import React, { useState, useEffect } from 'react';
import { type ServiceData } from '../../UI/services';

interface ServiceCarouselProps {
  services: ServiceData[];
  activeServiceId: string;
  onServiceChange: (serviceId: string) => void;
  transitionDuration?: number; // Transition duration in milliseconds
  rotationInterval?: number; // Rotation interval in milliseconds
}

const ServiceCarousel: React.FC<ServiceCarouselProps> = ({ 
  services, 
  activeServiceId,
  onServiceChange,
  transitionDuration = 500, // Default 500ms transition
  rotationInterval = 5000 // Default 5s rotation
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
    }, rotationInterval);
    
    return () => clearInterval(interval);
  }, [activeIndex, services, onServiceChange, rotationInterval]);

  const activeService = services[activeIndex];

  return (
    <div className="relative w-full h-[400px] md:h-full flex items-center justify-center overflow-hidden rounded-2xl">
      {/* Background color overlay */}
      <div 
        className={`absolute inset-0 opacity-20 transition-colors duration-500 ${activeService.color}`} 
      />
        {/* Illustration */}
      <div 
        className="relative w-4/5 h-4/5"
        style={{
          transition: `opacity ${transitionDuration}ms ease-out`,
          opacity: 1
        }}
      >
        <img 
          src={activeService.illustration} 
          alt={activeService.name}
          className="w-full h-full object-contain"
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