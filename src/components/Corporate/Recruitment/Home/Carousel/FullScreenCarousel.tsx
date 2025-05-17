import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, FreeMode } from "swiper/modules";
import { Icon } from "@iconify/react";
import { useLocation } from "react-router-dom";

import arrowDown from "@/assets/corporate/Home/Carousal/arrowDown.svg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Custom styles for pagination
import "@/assets/corporate/Home/Carousal/carousel.css";
import { motion } from "framer-motion";

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
  const location = useLocation();
  const isOnCorporatePage = location.pathname === '/corporate';
  
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  const logos = [
    "/Corporate/Images/Home/ClientLogos/ace.png",
    "/Corporate/Images/Home/ClientLogos/ardent.png",
    "/Corporate/Images/Home/ClientLogos/BNM.png",
    "/Corporate/Images/Home/ClientLogos/bsvlogo.png",
    "/Corporate/Images/Home/ClientLogos/csm.png",
    "/Corporate/Images/Home/ClientLogos/DF.png",
    "/Corporate/Images/Home/ClientLogos/e4m.png",
    "/Corporate/Images/Home/ClientLogos/e4softwares.png",
    "/Corporate/Images/Home/ClientLogos/ESSGEE.png",
    "/Corporate/Images/Home/ClientLogos/fifthgen.png",
    "/Corporate/Images/Home/ClientLogos/goldensource.png",
    "/Corporate/Images/Home/ClientLogos/Infolob.png",
    "/Corporate/Images/Home/ClientLogos/ITC.png",
    "/Corporate/Images/Home/ClientLogos/motherson.png",
    "/Corporate/Images/Home/ClientLogos/Msafe.png",
    "/Corporate/Images/Home/ClientLogos/necb.png",
    "/Corporate/Images/Home/ClientLogos/NES.png",
    "/Corporate/Images/Home/ClientLogos/Nexgen.png",
    "/Corporate/Images/Home/ClientLogos/PCC.png",
    "/Corporate/Images/Home/ClientLogos/PFC.png",
    "/Corporate/Images/Home/ClientLogos/Quadgen.png",
    "/Corporate/Images/Home/ClientLogos/qwqer.png",
    "/Corporate/Images/Home/ClientLogos/sssi.png",
    "/Corporate/Images/Home/ClientLogos/Sugam.png",
    "/Corporate/Images/Home/ClientLogos/Verastar.png",
    "/Corporate/Images/Home/ClientLogos/Wipro-consumer-care.png",
  ];

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
            <div className="container flex flex-col lg:flex-row items-center justify-between w-full px-4 md:px-8 lg:px-14">
              {/* Left side - Text content */}
              <div className="w-full lg:w-[60%] py-6 lg:py-0 lg:pr-8 mb-4 lg:mb-0 text-center lg:text-left">
                <h1
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold mb-3 lg:mb-4 !leading-[1.5] md:!leading-[1.4]"
                  dangerouslySetInnerHTML={{ __html: slide.heading }}
                />
                <p className="text-base sm:text-lg lg:text-xl max-w-2xl lg:max-w-none mx-auto lg:mx-0">{slide.subheading}</p>
                <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center lg:justify-start">
                  <button className="corporate-btn-1">
                    Request Talent Now
                    <Icon
                      icon="cil:arrow-right"
                      height={20}
                      width={20}
                      className="ml-2"
                    />
                  </button>
                  <button className="corporate-btn-2">
                    Explore Our Solutions
                    <Icon
                      icon="line-md:compass-loop"
                      height={20}
                      width={20}
                      className="ml-[6px]"
                    />
                  </button>
                </div>
              </div>
              {/* Right side - Image */}
              <div className="w-full lg:w-[40%] mt-4 lg:mt-0">
                <img
                  src={slide.img}
                  alt={slide.heading}
                  height={400}
                  width={400}
                  className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] max-w-xl mx-auto lg:max-w-none object-cover rounded-lg"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Logos - Only shown on corporate page */}
      {isOnCorporatePage && (
        <div className="absolute bottom-0 left-0 right-0 bg-[#f9f9f9] py-3 sm:py-5 z-10 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Swiper
              modules={[Autoplay, FreeMode]}
              spaceBetween={20}
              slidesPerView="auto"
              breakpoints={{
                320: {
                  slidesPerView: 2.5,
                  spaceBetween: 15
                },
                640: {
                  slidesPerView: 4.5,
                  spaceBetween: 20
                },
                1024: {
                  slidesPerView: "auto",
                  spaceBetween: 30
                }
              }}
              freeMode={true}
              loop={true}
              speed={2000}
              autoplay={{
                delay: 1,
                disableOnInteraction: false,
              }}
              className="logos-swiper px-4 md:px-8"
            >
              {logos.map((logo, index) => (
                <SwiperSlide key={index} className="!w-auto">
                  <div className="flex justify-center">
                    <img
                      src={logo}
                      alt={`logo-${index}`}
                      height={40}
                      width={85}
                      className="h-[30px] sm:h-[40px] min-w-[70px] sm:min-w-[85px] object-contain transition-all"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      )}

      {/* Arrow down button */}
      <div className="hidden lg:block container">
        <div
          onClick={handleScrollDown}
          className="w-max absolute bottom-[80px] cursor-pointer transition-opacity z-10 ml-4 md:ml-8 lg:ml-14"
          aria-label="Scroll down"
        >
          <img
            src="/Corporate/Images/Home/Hero/scroll.png"
            width="100"
            height="100"
            alt="Scroll down"
            className="scroll-rotate"
          />
          <img
            src={arrowDown}
            width="62"
            height="62"
            alt="Scroll down"
            className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default FullScreenCarousel;
