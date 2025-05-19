import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';


const testimonials = [
  {
    name: 'Dr. Rajesh Kumar',
    role: 'Principal, Engineering College',
    quote: 'The transformation in our students\' confidence is remarkable.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=120&h=120',
    videoThumbnail: "/institutions/vectors/Thumbnail1.jpg",
    videoSrc: "institutions/videos/video1.mp4",
  },
  {
    name: 'Prof. Meera Patel',
    role: 'TPO, Technology Institute',
    quote: 'Placement rates increased by 45% within one semester.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=120&h=120',
    videoThumbnail: "/institutions/vectors/Thumbnail2.jpg",
    videoSrc: "institutions/videos/video2.mp4",
  },
  {
    name: 'Priya Singh',
    role: 'Final Year Student',
    quote: 'The industry exposure helped me secure my dream job.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?fit=crop&w=120&h=120',
    videoThumbnail: "/institutions/vectors/Thumbnail3.jpg",
    videoSrc: "institutions/videos/video3.mp4",
  },
  {
    name: 'Dr. Rajesh Kumar',
    role: 'Principal, Engineering College',
    quote: 'The transformation in our students\' confidence is remarkable.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=120&h=120',
    videoThumbnail: "/institutions/vectors/Thumbnail1.jpg",
    videoSrc: "institutions/videos/video1.mp4",
  },
];

export default function Testimonials() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const videoTestimonials = testimonials.filter(t => t.videoSrc);

  // Auto-scroll quote carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const visibleQuotes = testimonials.slice(scrollIndex * 3, scrollIndex * 3 + 3);
  if (visibleQuotes.length < 3) {
    visibleQuotes.push(...testimonials.slice(0, 3 - visibleQuotes.length));
  }

  return (
    <section className="py-20 bg-white relative">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-xl font-bold mb-4 bg-black bg-clip-text text-transparent">
            Unfiltered Experiences
          </h1>
          <p className="text-sm text-gray-600 w-[406.1] mx-auto">
            Students Share their Success Stories and Achievements.
          </p>
        </motion.div>

        {/* Scrolling Video Carousel */}
        <div className="overflow-hidden mb-16">
          <motion.div
            className="flex gap-20"
            animate={{ x: ['0%', '-100%'] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            {[...videoTestimonials, ...videoTestimonials].map((testimonial, index) => (
              <div
                key={index}
                className="w-[400px] flex-shrink-0 cursor-pointer group relative"
                onClick={() => setSelectedVideo(testimonial.videoSrc!)}
              >
                <img
                  src={testimonial.videoThumbnail}
                  alt={`${testimonial.name}'s testimonial`}
                  className="w-full h-48 object-cover rounded-xl shadow-md"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all rounded-xl flex items-center justify-center">
                  <div className="bg-white rounded-full p-4 group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-[80%] max-w-2xl">
            <button
              className="absolute top-2 right-2 text-white text-2xl font-bold z-10 bg-black bg-opacity-50 rounded-full px-3 py-1 hover:bg-opacity-80 transition text-center"
              onClick={() => setSelectedVideo(null)}
            >
              &times;
            </button>
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
