import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";
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
    name: "1",
    role: "",
    image: "",
    videoSrc: "https://www.youtube.com/embed/zInPOXMjHpQ?si=5PnxTBi1Q--SFCk0",
    content: "K. Saranraj’s Career Transformation with Rareminds",
    bgColor: "from-red-500 to-red-600"
  },
  {
    id: 2,
    name: "2",
    role: "",
    image: "",
    videoSrc: "https://www.youtube.com/embed/w5HmwkOF92E?si=ybP3IQVNBrs-QCHk",
    content: "How Rareminds Shaped My Career | Student's Inspiring Testimonial",
    bgColor: "from-red-500 to-red-600"
  },
  {
    id: 3,
    name: "3",
    role: "",
    image: "",
     videoSrc: "https://www.youtube.com/embed/zInPOXMjHpQ?si=5PnxTBi1Q--SFCk0",
    content: "K. Saranraj’s Career Transformation with Rareminds",
    bgColor: "from-red-500 to-red-600"
  },
  {
    id: 4,
    name: "4",
    role: "",
    image: "",
   videoSrc: "https://www.youtube.com/embed/w5HmwkOF92E?si=ybP3IQVNBrs-QCHk",
    content: "How Rareminds Shaped My Career | Student's Inspiring Testimonial",
    bgColor: "from-red-500 to-red-600"
  },
  {
    id: 5,
    name: "5",
    role: "",
    image: "",
    videoSrc: "https://www.youtube.com/embed/zInPOXMjHpQ?si=5PnxTBi1Q--SFCk0",
    content: "K. Saranraj’s Career Transformation with Rareminds",
    bgColor: "from-red-500 to-red-600"
  },
  {
    id: 6,
    name: "6",
    role: "",
    image: "",
   videoSrc: "https://www.youtube.com/embed/w5HmwkOF92E?si=ybP3IQVNBrs-QCHk",
    content: "How Rareminds Shaped My Career | Student's Inspiring Testimonial",
    bgColor: "from-red-500 to-red-600"
  }
];

const TestimonialVideoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoTimeoutRef = useRef<NodeJS.Timeout>();
  const progressIntervalRef = useRef<NodeJS.Timeout>();

  // Auto-play video for 15 seconds when testimonial changes
  useEffect(() => {
    console.log(`Starting video preview for testimonial ${currentIndex + 1}`);
    setIsVideoPlaying(true);
    setVideoProgress(0);

    // Start progress bar
    const progressInterval = setInterval(() => {
      setVideoProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + (100/150); // 100% in 15 seconds (100/150 = 0.67% every 100ms)
      });
    }, 100);

    progressIntervalRef.current = progressInterval;

    // Stop video after 15 seconds and move to next
    const timeout = setTimeout(() => {
      console.log(`Video preview finished for testimonial ${currentIndex + 1}`);
      setIsVideoPlaying(false);
      setVideoProgress(0);
      clearInterval(progressInterval);
      
      // Move to next testimonial
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 15000);

    videoTimeoutRef.current = timeout;

    return () => {
      if (videoTimeoutRef.current) {
        clearTimeout(videoTimeoutRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [currentIndex]);

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + testimonials.length) % testimonials.length;
      visible.push({ ...testimonials[index], position: i });
    }
    return visible;
  };

  const handleVideoPlay = () => {
    setIsVideoModalOpen(true);
  };

  const handleTestimonialClick = (index: number) => {
    setCurrentIndex(index);
    setVideoProgress(0);
  };

  const currentTestimonial = testimonials[currentIndex];
  const autoplayVideoSrc = `${currentTestimonial.videoSrc}&autoplay=${isVideoPlaying ? 1 : 0}&mute=1&controls=0&modestbranding=1&rel=0`;

  return (
    <>
      <div className="relative w-full h-[600px] overflow-hidden rounded-3xl ">
        {/* 3D Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)
            `
          }} />
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center perspective-1000">
          {getVisibleTestimonials().map((testimonial, index) => {
            const { position } = testimonial;
            const isCenter = position === 0;
            const translateX = position * 120;
            const translateZ = isCenter ? 0 : -100;
            const rotateY = position * 15;
            const scale = isCenter ? 1 : 0.8;
            const opacity = Math.abs(position) <= 1 ? 1 : 0.3;
            const zIndex = 10 - Math.abs(position);
            
            return (
              <div
                key={`${testimonial.id}-${currentIndex}`}
                className="absolute transition-all duration-700 ease-in-out cursor-pointer transform-gpu"
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transformStyle: 'preserve-3d',
                }}
                onClick={() => !isCenter && handleTestimonialClick(testimonials.findIndex(t => t.id === testimonial.id))}
              >
                <div className="relative transform-gpu">
                  {/* Background Card with Enhanced 3D Effects */}
                  <div className={`w-80 h-96 rounded-2xl bg-gradient-to-br ${testimonial.bgColor} p-6 flex flex-col justify-between 
                    ${isCenter 
                      ? 'shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6),0_0_40px_rgba(239,68,68,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]' 
                      : 'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4),0_0_25px_rgba(239,68,68,0.2)]'
                    }
                    backdrop-blur-sm border border-white/10
                    hover:shadow-[0_45px_80px_-15px_rgba(0,0,0,0.7),0_0_50px_rgba(239,68,68,0.4)]
                    transition-all duration-500
                    before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100
                    before:transition-opacity before:duration-300`}>
                    
                    {/* Glossy overlay for 3D effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50" />
                    
                    {/* Name Label */}
                    <div className="text-white relative z-10">
                      <div className="text-sm font-light tracking-wide opacity-90 drop-shadow-lg">
                        {testimonial.role}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="text-white text-center relative z-10">
                      <p className="text-lg leading-relaxed font-light drop-shadow-lg">
                        "{testimonial.content}"
                      </p>
                    </div>
                  </div>

                  {/* Center Video with Auto-play and Enhanced 3D Effects */}
                  {isCenter && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                      <div className="relative w-48 h-48 rounded-full overflow-hidden 
                        shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(255,255,255,0.2),inset_0_2px_0_rgba(255,255,255,0.3)]
                        border-4 border-white/30 backdrop-blur-sm
                        hover:shadow-[0_25px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(255,255,255,0.3)]
                        transition-all duration-500 hover:scale-105">
                        
                        {/* Inner glow effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                        
                        {isVideoPlaying ? (
                          <iframe
                            ref={iframeRef}
                            src={autoplayVideoSrc}
                            className="w-full h-full object-cover scale-150 relative z-10"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            title={`${testimonial.name} video preview`}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative z-10">
                            <div className="text-white text-center drop-shadow-lg">
                              <Play className="w-8 h-8 mx-auto mb-2 drop-shadow-lg" fill="currentColor" />
                              <div className="text-sm">Click to play</div>
                            </div>
                          </div>
                        )}
                        
                        {/* Enhanced Progress Ring with 3D effect */}
                        {isVideoPlaying && (
                          <div className="absolute inset-0 z-20">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                              <circle
                                cx="50"
                                cy="50"
                                r="48"
                                fill="none"
                                stroke="rgba(255,255,255,0.2)"
                                strokeWidth="3"
                              />
                              <circle
                                cx="50"
                                cy="50"
                                r="48"
                                fill="none"
                                stroke="url(#progressGradient)"
                                strokeWidth="3"
                                strokeDasharray={`${2 * Math.PI * 48}`}
                                strokeDashoffset={`${2 * Math.PI * 48 * (1 - videoProgress / 100)}`}
                                className="transition-all duration-100 ease-linear drop-shadow-lg"
                                style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.8))' }}
                              />
                              <defs>
                                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#ffffff" />
                                  <stop offset="100%" stopColor="#f3f4f6" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>
                        )}
                        
                        {/* Enhanced Click overlay for full video */}
                        <button
                          onClick={handleVideoPlay}
                          className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center z-30 rounded-full"
                        >
                          <div className="w-12 h-12 bg-white/10 hover:bg-white/90 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm
                            shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.4)]
                            border border-white/20 hover:border-white/40">
                            <Play className="w-4 h-4 text-white hover:text-gray-800 ml-0.5 drop-shadow-sm" fill="currentColor" />
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Progress Indicators with 3D Effects */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleTestimonialClick(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 transform hover:scale-110 ${
                index === currentIndex 
                  ? "bg-white shadow-[0_4px_12px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.3)] scale-110" 
                  : "bg-white/40 hover:bg-white/60 shadow-[0_2px_8px_rgba(255,255,255,0.2)] hover:shadow-[0_4px_12px_rgba(255,255,255,0.3)]"
              } backdrop-blur-sm border border-white/20`}
            />
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="max-w-4xl w-full">
          <DialogHeader>
            <DialogTitle>{currentTestimonial.content}</DialogTitle>
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

export default TestimonialVideoCarousel;
