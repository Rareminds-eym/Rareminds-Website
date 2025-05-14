import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Custom styles for pagination
import "@/assets/corporate/Home/Carousal/carousel.css";

interface CarouselSlide {
  heading: string;
  subheading: string;
  img: string;
}

interface FullScreenCarouselProps {
  slides: CarouselSlide[];
  autoplayDelay?: number;
  className?: string;
}

const FullScreenCarousel: React.FC<FullScreenCarouselProps> = ({
  slides,
  autoplayDelay = 5000,
  className = "",
}) => {
  return (
    <div className={`corporate-full-screen-h w-full ${className} relative`}>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          type: 'bullets',
          verticalClass: 'swiper-pagination-vertical'
        }}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
        }}
        className="h-full w-full mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="container flex flex-col lg:flex-row items-center justify-between h-full w-full p-0">
              {/* Left side - Text content */}
              <div className="w-full lg:w-[60%] lg:pr-8 mb-6 lg:mb-0 text-center lg:text-left">
                <h1 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                  dangerouslySetInnerHTML={{ __html: slide.heading }}
                />
                <p className="text-lg lg:text-xl">{slide.subheading}</p>
              </div>
              {/* Right side - Image */}
              <div className="w-full lg:w-[40%]">
                <img
                  src={slide.img}
                  alt={slide.heading}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FullScreenCarousel;
