import React, { useState, useEffect } from 'react';

interface CarouselItem {
  id: number;
  type: 'video';
  url: string;
}

const carouselItems: CarouselItem[] = [
  { 
    id: 1, 
    type: 'video',
    url: '/images/academy/Video/classroom transitioning from blackboard to smartboards_video 2_1080.mp4' 
  },
  { 
    id: 2, 
    type: 'video',
    url: '/images/academy/Video/classroom transitioning from blackboard to smartboards_video 2_1080.mp4' 
  },
  { 
    id: 3, 
    type: 'video',
    url: '/images/academy/Video/classroom transitioning from blackboard to smartboards_video 2_1080.mp4' 
  },
];

const VideoCarousel = () => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const advanceCarousel = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentItemIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
      setIsTransitioning(false);
    }, 1000); // Duration of fade transition
  };

  useEffect(() => {
    const interval = setInterval(advanceCarousel, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[40vh] md:h-[75vh] overflow-hidden mt-5">
      {carouselItems.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000
            ${index === currentItemIndex ? 'opacity-100' : 'opacity-0'} 
            ${isTransitioning ? 'transition-opacity duration-1000' : ''}`}
        >
          <video
            className="w-full h-full object-cover"
            src={item.url}
            autoPlay
            muted
            loop
            playsInline
            alt={`Carousel item ${item.id}`}
          />
        </div>
      ))}
    </div>
  );
};

export default VideoCarousel;