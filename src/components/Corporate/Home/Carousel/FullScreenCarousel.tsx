import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import arrowDown from "@/assets/corporate/Home/Carousal/arrowDown.svg";

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
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className={`corporate-full-screen-h w-full ${className} relative`}>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          type: "bullets",
          verticalClass: "swiper-pagination-vertical",
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
              <div className="w-full lg:w-[60%] py-10 lg:py-0 lg:pr-8 mb-6 lg:mb-0 text-center lg:text-left">
                <h1
                  className="text-3xl md:text-4xl lg:text-[40px] font-bold mb-4 !leading-[45px] md:!leading-[60px]"
                  dangerouslySetInnerHTML={{ __html: slide.heading }}
                />
                <p className="text-lg lg:text-xl">{slide.subheading}</p>
                <div className="flex flex-col sm:flex-row gap-5 mt-6 justify-center lg:justify-start">
                  <button className="corporate-btn-1">
                    Request Talent Now
                  </button>
                  <button className="corporate-btn-2">
                    Explore Our Solutions
                  </button>
                </div>
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
      {/* Arrow down button */}
      <div className="hidden lg:block container">
        <div
          onClick={handleScrollDown}
          className="w-max absolute bottom-8 cursor-pointer transition-opacity z-10 scale-125"
          aria-label="Scroll down"
        >
          <img
            src="/Corporate/Images/Home/Hero/scroll.png"
            width="78"
            height="78"
            alt="Scroll down"
            className="scroll-rotate"
          />
          <img
            src={arrowDown}
            width="47"
            height="47"
            alt="Scroll down"
            className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default FullScreenCarousel;
