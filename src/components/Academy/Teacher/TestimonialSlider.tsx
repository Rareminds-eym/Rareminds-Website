import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../UI/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "The NEP wellness program transformed how our entire faculty approaches teaching.",
    author: "suja",
    role: "Principal, Chennai",
    avatar: "/images/academy/traditionalmethod/RareMinds ISO Logo-01.png"
  },
  {
    id: 2,
    quote: "Implementing these strategies has revolutionized our classroom dynamics.",
    author: "Priya",
    role: "Head Teacher, Bangalore",
    avatar: "/images/academy/traditionalmethod/RareMinds ISO Logo-01.png"
  },
  {
    id: 3,
    quote: "The impact on student engagement has been remarkable and measurable.",
    author: "Anusha",
    role: "Department Head, Mumbai",
    avatar: "/images/academy/traditionalmethod/RareMinds ISO Logo-01.png"
  }
];

const TestimonialSlider = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 mb-5">
      <h2 className="text-2xl md:text-4xl font-semibold text-center  mb-2 text-gray-800 leading-[50px]">
          From Skepticism to Success - What Educators Say
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto text-md">
          {/* Discover how our innovative approach has transformed . */}
          Real Voices. Real Results.
        </p>
    
     <div className="max-w-3xl mx-auto px-4 py-6 mb-5">
    
     <div>

     </div>
      <div className="relative ">
        
        
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[plugin.current]}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id}>
                <div className="w-full bg-white rounded-3xl border border-gray-100 shadow-md   p-4  ">
                    <div className='w-full h-4 bg-white flex justify-center items-center'>
                       <img src="" alt="" />
                    </div>
                  <div className="flex gap-8 items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-20 h-auto rounded-full  "
                    />
                    <div className="flex flex-col">
                    <blockquote className="mb-4 border-b border-gray-300 pb-2">
                     <p className="text-sm md:text-lg text-gray-600">
                       "{testimonial.quote}"
                     </p>
                   </blockquote>
                      <div className="flex flex-col">
                        <div className="font-bold text-gray-900">
                          {testimonial.author}
                        </div>
                        <div className="text-sm text-gray-500">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-2   " />
          <CarouselNext className="-right-2" />
    
        </Carousel>
      </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;