import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import clsx from "clsx";
import { Testimonial } from "@/types/testimonial";
import CustomModal from "@/components/ui/custom-modal";

interface TestimonialImagesProps {
  testimonials: Testimonial[];
  currentIndex: number;
}

export const TestimonialImages: React.FC<TestimonialImagesProps> = ({
  testimonials,
  currentIndex,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center justify-center shrink-0 relative h-[200px] w-[200px] sm:h-[230px] sm:w-[230px] md:h-[260px] md:w-[260px] mx-auto">
      {testimonials.map((t, index) => {
        const position =
          (index - currentIndex + testimonials.length) % testimonials.length;

        return (
          <motion.div
            key={index}
            initial={index === currentIndex ? { y: -20, opacity: 0 } : {}}
            animate={
              position === 0
                ? { y: 0, opacity: 1, rotate: 0, scale: 1, zIndex: 30 }
                : position === 1
                  ? { y: 16, opacity: 0.6, rotate: 3, scale: 1, zIndex: 20 }
                  : { y: 32, opacity: 0.3, rotate: -3, scale: 1, zIndex: 10 }
            }
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={clsx(
              "absolute w-[160px] h-[160px] sm:w-[190px] sm:h-[190px] md:w-[215px] md:h-[215px] lg:w-[260px] lg:h-[260px] rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-lg"
            )}
          >
            <img
              src={t.img}
              alt={`testimonial ${index + 1}`}
              className="absolute top-0 left-0 w-full h-full object-cover object-center rounded-2xl sm:rounded-3xl"
            />

            {position === 0 && (
              <button
                onClick={() => {
                  setSelectedIndex(index);
                  setIsModalOpen(true);
                }}
                className="absolute left-16 top-16 md:left-24 md:top-24 p-3 sm:p-4 md:p-[18px] rounded-full bg-gradient-to-b from-gray-200 to-gray-400 hover:bg-white transition shadow-xl shadow-black/20 border-4 border-gray-200 hover:border-gray-300"
                aria-label="Play video"
              >
                <Play className="h-6 w-6 sm:h-7 sm:w-7 md:h-9 md:w-9 text-gray-700" />
              </button>
            )}
          </motion.div>
        );
      })}

      <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedIndex !== null && (
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 ">
            {testimonials[selectedIndex].modalImages?.map((src, i) => (
              <>
              <img
                key={i}
                src={src}
                alt={`Modal image ${i + 1}`}
                className="w-full h-52 md:w-[49%] md:h-96 object-cover rounded-2xl md:rounded-3xl"
              />
              </>
            ))}
            
          </div>
        )}
      </CustomModal>
    </div>
  );
};
