import React, { useState, useEffect } from 'react';

interface CarouselItem {
  id: number;
  type: 'video';
  url: string;
  title: string;
  subtitle: string;
  Calltoaction: string;

}

const carouselItems: CarouselItem[] = [
  { 
    id: 1, 
    type: 'video',
    url: '/images/academy/Video/classroom transitioning from blackboard to smartboards_video 2_1080.mp4' ,
    title: "“You Can’t Teach Tomorrow’s Students With Yesterday’s Methods.”",
    subtitle: "Train in NEP, Digital Pedagogy & Emotional Intelligence",
    Calltoaction: "Schedule Your FDP",
  },
  { 
    id: 2, 
    type: 'video',
    url: '/images/academy/Video/classroom transitioning from blackboard to smartboards_video 2_1080.mp4' ,
    title: "“From Chalkboards to ChatGPT: Are You Ready?",
    subtitle: "Upgrade to AI-integrated teaching",
    Calltoaction: "Download TDP Calendar",
  },
  { 
    id: 3, 
    type: 'video',
    url: '/images/academy/Video/classroom transitioning from blackboard to smartboards_video 2_1080.mp4' ,
    title: "“A Principal’s Vision Shapes a School’s Future.”",
    subtitle: "Strategic leadership programs for HoDs & Principals",
    Calltoaction: "Explore Leadership Series",
  },
  ,
  { 
    id: 4, 
    type: 'video',
    url: '/images/academy/Video/classroom transitioning from blackboard to smartboards_video 2_1080.mp4' ,
    title: "“Tech Won’t Replace Teachers, But Teachers Who Use Tech Will Replace Those Who Don’t.”",
    subtitle: "Learn to integrate LMS, digital tools & hybrid teaching",
    Calltoaction: "Get Certified",
  },
  ,
  { 
    id: 5, 
    type: 'video',
    url: '/images/academy/Video/classroom transitioning from blackboard to smartboards_video 2_1080.mp4' ,
    title: "“Empathy is a Superpower in Every Classroom.”",
    subtitle: "Build emotional intelligence and inclusive practices",
    Calltoaction: "Join EI Training",
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
    const interval = setInterval(advanceCarousel, 4000);
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

<div className="absolute inset-0 flex flex-col justify-between px-8 py-8 text-center bg-black/5 backdrop-blur-sm">
  {/* Title & Subtitle */}
  <div className="text-left max-w-xl">
    <h1 className="text-4xl md:text-5xl font-extrabold text-black drop-shadow-sm">
      {item.title}
    </h1>
    <p className="mt-4 text-lg md:text-2xl text-black opacity-90 leading-relaxed">
      {item.subtitle}
    </p>
  </div>

  {/* CTA Button */}
  <div className="w-full flex justify-center mt-8">
  <button className="px-6 py-3 bg-gradient-to-r from-red-400 to-red-500 text-white font-semibold text-lg rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
     {item.Calltoaction}
    </button>
  </div>
</div>


        </div>
      ))}
    </div>
  );
};

export default VideoCarousel;