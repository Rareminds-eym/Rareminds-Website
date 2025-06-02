import { useState, useEffect, useRef } from "react";
import { Play, Pause } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../UI/dialog";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  videoSrc: string;
  content: string;
  bgColor: string;
}

const testimonials: Testimonial[] = [
  
  {
    id: 1,
    name: "",
    role: "",
    image: "",
    videoSrc: "",
    content: "",
    bgColor: "from-slate-600 to-gray-700"
  },
  {
    id: 2,
    name: "",
    role: "",
    image: "",
    videoSrc: "",
    content: "",
    bgColor: "from-slate-600 to-gray-700"
  },
  {
    id: 3,
    name: "",
    role: "",
    image: "",
    videoSrc: "",
    content: "",
    bgColor: "from-slate-600 to-gray-700"
  },
  {
    id: 4,
    name: "",
    role: "",
    image: "",
    videoSrc: "",
    content: "",
    bgColor: "from-slate-600 to-gray-700"
  },
  {
    id: 5,
    name: "",
    role: "",
    image: "",
    videoSrc: "",
    content: "",
    bgColor: "from-slate-600 to-gray-700"
  },
  {
    id: 6,
    name: "",
    role: "",
    image: "",
    videoSrc: "",
    content: "",
    bgColor: "from-slate-600 to-gray-700"
  }


];

const TestimonialViedoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + testimonials.length) % testimonials.length;
      visible.push({ ...testimonials[index], position: i });
    }
    return visible;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVideoPlay = () => {
    setIsVideoModalOpen(true);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <>
      <div className="relative w-full h-[600px] overflow-hidden  rounded-3xl">
        <div className="absolute inset-0 flex items-center justify-center">
          {getVisibleTestimonials().map((testimonial, index) => {
            const { position } = testimonial;
            const isCenter = position === 0;
            const translateX = position * 120;
            const scale = isCenter ? 1 : 0.8;
            const opacity = Math.abs(position) <= 1 ? 1 : 0.3;
            const zIndex = 10 - Math.abs(position);
            
            return (
              <div
                key={`${testimonial.id}-${currentIndex}`}
                className="absolute transition-all duration-700 ease-in-out"
                style={{
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  opacity,
                  zIndex,
                }}
              >
                <div className="relative">
                  {/* Background Card */}
                  <div className={`w-80 h-96 rounded-2xl bg-gradient-to-br ${testimonial.bgColor} p-6 flex flex-col justify-between shadow-2xl`}>
                    {/* Name Label */}
                    <div className="text-white">
                      <div className="text-2xl font-bold tracking-wider mb-1">
                        {testimonial.name}
                      </div>
                      <div className="text-sm font-light tracking-wide opacity-90">
                        {testimonial.role}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="text-white text-center">
                      <p className="text-lg leading-relaxed font-light">
                        "{testimonial.content}"
                      </p>
                    </div>
                  </div>

                  {/* Center Image with Play Button */}
                  {isCenter && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                        <button
                          onClick={handleVideoPlay}
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-100 transition-all duration-300 hover:scale-110"
                        >
                          <Play className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "bg-white shadow-lg" 
                  : "bg-white bg-opacity-40 hover:bg-opacity-60"
              }`}
            />
          ))}
        </div>

        {/* Play/Pause Status */}
        <div className="absolute top-6 right-6">
          {/* <div className={`px-4 py-2 rounded-full text-sm font-medium ${
            isPlaying 
              ? "bg-green-500 text-white" 
              : "bg-red-500 text-white"
          }`}>
            {isPlaying ? "Playing" : "Paused"}
          </div> */}
        </div>

        {/* Carousel Play/Pause Button */}
        <div className="absolute top-6 left-6">
          <button
            onClick={handlePlayPause}
            className="px-4 py-2 bg-white bg-opacity-20 text-white rounded-full hover:bg-opacity-30 transition-all duration-300"
          >
            {isPlaying ? "Pause Carousel" : "Play Carousel"}
          </button>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="max-w-4xl w-full">
          <DialogHeader>
            <DialogTitle>{currentTestimonial.name} - {currentTestimonial.role}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            <iframe
              src={`${currentTestimonial.videoSrc}?autoplay=1`}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`${currentTestimonial.name} video`}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TestimonialViedoCarousel;
