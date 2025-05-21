
import { useState } from "react";
import { Button } from "../UI/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  institution: string;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    role: "Principal",
    institution: "Delhi Public School, Bangalore",
    quote: "The NEP leadership training transformed our approach to curriculum implementation. We've seen a 40% increase in student engagement across all subjects.",
    image: ""
  },
  {
    id: 2,
    name: "Prof. Rajiv Kumar",
    role: "Department Head",
    institution: "Guru Nanak College, Punjab",
    quote: "The Train-the-Trainer program gave me practical tools to help my faculty adopt NEP methodologies. The interactive sessions were particularly valuable.",
    image: ""
  },
  {
    id: 3,
    name: "Ms. Anita Desai",
    role: "Science Teacher",
    institution: "Kendriya Vidyalaya, Chennai",
    quote: "After completing the Digital Pedagogy course, I completely redesigned my teaching approach. My students now actively participate in experiential learning activities.",
    image: ""
  },
  {
    id: 4,
    name: "Dr. Mohan Rao",
    role: "Dean of Studies",
    institution: "University of Hyderabad",
    quote: "RareMinds training programs stand out for their deep understanding of the Indian education context and practical NEP implementation strategies.",
    image: ""
  }
];

const TestimonialsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1));
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    // <div className="py-20 bg-gradient-to-br from-blue-800 to-blue-900 text-white" id="testimonials">
    <div className="py-20 bg-gradient-to-br from-red-400 to-red-500 text-black mt-12" id="testimonials">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-lg text-black">
            Hear from educators across India who have transformed their teaching practices with our NEP-aligned training
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 flex items-center justify-center">
                          <Quote className="h-10 w-10 text-black" />
                        </div>
                      </div>
                      <div>
                        <blockquote className="text-lg md:text-xl mb-6 italic">
                          "{testimonial.quote}"
                        </blockquote>
                        <div className="border-t border-white/20 pt-4">
                          <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                          <p className="text-black">{testimonial.role}, {testimonial.institution}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon" 
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all",
                  activeIndex === index
                    ? "bg-black w-8"
                    : "bg-black/30 hover:bg-white/50"
                )}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
