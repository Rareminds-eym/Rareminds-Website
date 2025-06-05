import { generateKeySync } from 'crypto';
import { useState, useRef, MouseEvent } from 'react';
import Modal from 'react-modal';

const contentData = [
  {
    image: '/Govt-Images/Videos/Thumbnails/Faculty_testimonail.png',
    video: '/Govt-Images/Videos/Testimonials/video1.mp4',
    title: 'Education Excellence'
  },
  {
    image: '/Govt-Images/Videos/Thumbnails/Fdp.png',
    video: '/Govt-Images/Videos/Testimonials/video2.mp4',
    title: 'University Campus'
  },
  {
    image: '/Govt-Images/Videos/Thumbnails/Faculty_testimonail.png',
    video: '/Govt-Images/Videos/Testimonials/video3.mp4',
    title: 'Learning Experience'
  },
  {
    image: '/Govt-Images/Videos/Thumbnails/student.png',
    video: '/Govt-Images/Videos/Testimonials/video4.mp4',
    title: 'Student Life'
  },
  {
    image: '/Govt-Images/Videos/Thumbnails/Faculty_testimonail.png',
    video: '/Govt-Images/Videos/Testimonials/video5.mp4',
    title: 'Modern Classroom'
  },
  {
    image: '/Govt-Images/Videos/Thumbnails/Fdp_highlights.png',
    video: '/Govt-Images/Videos/Testimonials/video6.mp4',
    title: 'Library Resources'
  },
  {
    image: '/Govt-Images/Videos/Thumbnails/Fdp_highlights.png',
    video: '/Govt-Images/Videos/Testimonials/video7.mp4',
    title: 'Library Resources'
  }
];

Modal.setAppElement('#root');

const Video = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const openModal = (videoUrl: string) => {
    if (!isDragging) {
      setSelectedVideo(videoUrl);
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedVideo('');
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="md:py-12 relative">
      <div className="relative overflow-hidden" style={{ zIndex: 1 }}>
        {/* Gradient overlays that hide when modal is open */}
        {!modalIsOpen && (
          <>
            <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent"></div>
            <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent"></div>
          </>
        )}
        
        {/* Scrolling container */}
        <div 
          ref={scrollContainerRef}
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div className={`flex gap-6 md:py-4 ${!isDragging ? 'animate-scroll hover:[animation-play-state:paused]' : ''}`}>
            {/* Double the content for seamless loop */}
            {[...contentData, ...contentData].map((item, index) => (
              <div
                key={index}
                className="flex-none h-48 w-64 sm:h-60 sm:w-80 md:w-96 cursor-pointer transform transition-transform hover:scale-105 group"
                onClick={() => openModal(item.video)}
              >
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300"></div>
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center group-hover:bg-black/80 transition-all scale-90 group-hover:scale-100">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* <h3 className="mt-2 text-lg font-medium text-gray-900 truncate">{item.title}</h3> */}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center p-4 mx-auto"
        overlayClassName="fixed inset-0 bg-black/90 backdrop-blur-sm"
        style={{
          overlay: {
            zIndex: 9999,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          },
          content: {
            position: 'relative',
            background: 'transparent',
            border: 'none',
            padding: 0,
            margin: 'auto'
          }
        }}
      >
        <div className="w-[95vw] max-w-[1200px] relative bg-white/10 backdrop-blur-md rounded-xl shadow-2xl border border-white/20">
          {/* Video Header */}
          <div className="absolute top-0 left-0 right-0 h-12 bg-black/40 backdrop-blur-sm rounded-t-xl flex items-center justify-between px-4 z-10 border-b-4 border-white/30">
            <h3 className="text-white/90 font-medium truncate">Now Playing</h3>
            <button
              onClick={closeModal}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            >
              <svg className="w-6 h-6 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Video Container */}
          <div className="aspect-video w-full rounded-xl overflow-hidden">
            <iframe
              src={selectedVideo}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Video Controls Bar - Visual Only */}
         
        </div>
      </Modal>
    </div>
  );
};

export default Video;
