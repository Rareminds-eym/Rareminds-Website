
import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback } from "../UI/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "../UI/button";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "I never knew my child could speak English this fluently until the program.",
    author: "Sarita Patel",
    role: "Parent, Grade 7",
  },
  {
    quote: "The personalized attention has made all the difference in my daughter's confidence.",
    author: "Michael Chen",
    role: "Parent, Grade 5",
  },
  {
    quote: "An exceptional program that delivers real results. Highly recommended!",
    author: "Amanda Roberts",
    role: "Parent, Grade 6",
  },
];

const AUTOPLAY_INTERVAL = 5000; // 5 seconds

const TestimonialsStudent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const next = useCallback(() => {
    setCurrentIndex((current) => (current + 1) % testimonials.length);
  }, []);

  const previous = useCallback(() => {
    setCurrentIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  }, []);

  useEffect(() => {
    let intervalId: number;
    
    if (!isHovered) {
      intervalId = window.setInterval(() => {
        next();
      }, AUTOPLAY_INTERVAL);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [next, isHovered]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 ">
      <h2 className="text-[24px] font-semibold text-center mb-12 text-gray-800">
        Student & Parent Feedback
      </h2>
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="overflow-hidden">
          <div className="transition-transform duration-300 ease-in-out flex">
            {testimonials.map((testimonial, index) => {
              const initials = testimonial.author
                .split(" ")
                .map((n) => n[0])
                .join("");

              return (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-4"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  <Card className="p-6 relative bg-white/50 backdrop-blur-sm border border-purple-100 shadow-lg min-h-[200px] flex flex-col justify-between">
                    <p className="text-gray-700 text-sm md:text-lg leading-relaxed mb-2">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 bg-purple-100">
                        <AvatarFallback className="bg-purple-600 text-white">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-purple-900">
                          {testimonial.author}
                        </h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={previous}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 rounded-full hover:bg-purple-50"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 rounded-full hover:bg-purple-50"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TestimonialsStudent;