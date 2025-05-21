import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { Autoplay, FreeMode } from "swiper/modules";

interface LogoCarouselProps {
  logos: string[];
}

const LogoCarousel: React.FC<LogoCarouselProps> = ({ logos }) => (
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
            spaceBetween: 15,
          },
          640: {
            slidesPerView: 4.5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: "auto",
            spaceBetween: 30,
          },
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
);

export default LogoCarousel;
