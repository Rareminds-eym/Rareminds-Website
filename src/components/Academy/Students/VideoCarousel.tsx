import React, { useState, useEffect } from 'react';

interface CarouselItem {
  id: number;
  type: 'video';
  url: string;
  title: string;
  subtitle: String;
  Calltoaction: String;
}

const carouselItems: CarouselItem[] = [
  { 
    id: 1, 
    type: 'video',
    url: '/images/academy/Video/2.From Campus to Career We Bridge the Gap_video_1080.mp4',
    title: "“Turn Your Degree Into a Career.”",
    subtitle: "1000+ students trained. Real companies. Real results.",
    Calltoaction: "Talk to a Career Mentor",
  },
  { 
    id: 2, 
    type: 'video',
    url: '/images/academy/Video/3.College is Temporary. Your Career Isn’t_video_1080.mp4' ,
    title: "“English Isn’t Just a Subject. It’s Your Superpower.”",
    subtitle: "Spoken English, Public Speaking, and Confidence Bootcamps",
    Calltoaction: "Start Speaking Smart",
  },
  { 
    id: 3, 
    type: 'video',
    url: '/images/academy/Video/Graduate With Skills That Pay.mp4' ,
    title: "“Jobs Don’t Come With Instructions. We Train You For Them.”",
    subtitle: "120-hour Employability Skills Program",
    Calltoaction: "Download Program Sheet",
  },
  { 
    id: 4, 
    type: 'video',
    url: '/images/academy/Video/Graduate With Skills That Pay.mp4' ,
    title: "“Entrepreneurship Isn’t Just for Adults Anymore.”",
    subtitle: "Learn how to build your own brand — even in school",
    Calltoaction: "Explore EEE Training",
  },
  { 
    id: 5, 
    type: 'video',
    url: '/images/academy/Video/Graduate With Skills That Pay.mp4' ,
    title: "“Guessing Your Career Is Risky. Planning It Isn’t.”",
    subtitle: "Career Counseling Blueprint with psychometrics & roadmaps",
    Calltoaction: "Get My Blueprint",
  },
];

const VideoCarousel = () => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]); // New: refs for videos


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

  useEffect(() => {
    const currentVideo = videoRefs.current[currentItemIndex];
    if (currentVideo) {
      currentVideo.playbackRate = 0.1; // Slow down video
    }
  }, [currentItemIndex]);

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
            className="w-full h-full object-fill"
            src={item.url}
            autoPlay
            muted
            loop
            playsInline
            alt={`Carousel item ${item.id}`}
          />

<div className="absolute inset-0 flex flex-col items-center justify-center  text-center px-4 bg-black/10">
        <div className='w-auto absolute left-8 h-auto p-6 '>
        <h1 className="text-red-600 text-xl md:text-5xl font-bold">{item.title}</h1>
        <p className="text-black text-base text-[18px] md:text-2xl mt-2">{item.subtitle}</p> 
        </div>

        <button className='w-auto h-auto  bg-gradient-to-r from-red-400 to-red-500 absolute bottom-6 md:bottom-20 p-4 font-bold rounded-md '> {item.Calltoaction}</button>
      </div>

         
        </div>
      ))}
    </div>
  );
};

export default VideoCarousel;