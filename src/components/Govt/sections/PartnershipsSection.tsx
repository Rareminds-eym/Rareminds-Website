
import React from "react";
import { SectionHeader } from "../partnerships/SectionHeader"; 
import Testimonials from "./Testimonials";

export const PartnershipsSection: React.FC = () => {
 

  return (
    <section className="md:py-5 " id="partnerships">
      <div className="max-w-5xl mx-auto  md:px-4 flex flex-col items-center">
        <SectionHeader />

        {/* <div className="w-full rounded-[20px] mt-5 sm:rounded-[28px] md:rounded-[36px] p-4 md:p-10 lg:p-9 flex flex-col md:flex-row gap-6 sm:gap-8 md:bg-gray-100 md:shadow-lg">
          <TestimonialImages testimonials={testimonials} currentIndex={idx} />

          <AnimatePresence mode="wait">
            <TestimonialContent
              trainer={testimonial.trainer}
              student={testimonial.student}
            />
          </AnimatePresence>

        </div>
        <CarouselNavigation
          currentIndex={idx}
          totalItems={testimonials.length}
          onPrevious={() => setIdx((prev) => Math.max(0, prev - 1))}
          onNext={() => setIdx((prev) => Math.min(testimonials.length - 1, prev + 1))}
        /> */}

       <Testimonials />
      </div>
    </section>
  );
};
