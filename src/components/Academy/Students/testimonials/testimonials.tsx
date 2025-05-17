import React, { useState, useEffect } from 'react';
import TestimonialCard from './TestimonialCard';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "../../UI/carousel";

const testimonials = [
  {
    id: 1,
    quote: "I finally understood how to teach online better than my students could learn!",
    author: {
      name: "Prof. Ramya",
      role: "TDP Participant",
      company: "Kangeyam School",
      image: "/images/academy/student.jpeg"
    },
    rating: 5
  },
  {
    id: 2,
    quote: "Our 10th graders now ask about 'startups' and not just exams.",
    author: {
      name: "Principal Shyamala",
      role: "School Leader",
      company: "Chennai",
      image: "/images/academy/student.jpeg"
    },
    rating: 5
  },
  {
    id: 3,
    quote: "I never knew my child could speak English this fluently until the program.",
    author: {
      name: "Parent",
      role: "Grade 11",
      company: "Kangeyam School",
      image: "/images/academy/parent.jpeg"
    },
    rating: 5
  },
  {
    id: 4,
    quote: "My son now speaks in English at the dinner table — that never happened before.",
    author: {
      name: "Parent",
      role: "",
      company: "Chennai",
      image: "/images/academy/parent.jpeg"
    },
    rating: 5
  },
  {
    id: 5,
    quote: "This was better than any boring lecture. We did things — not just listened.",
    author: {
      name: "Harsha",
      role: "Student",
      company: "Grade 12",
      image: "/images/academy/student.jpeg"
    },
    rating: 5
  }
];

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [api, setApi] = useState<any>();
  const [secondaryApi, setSecondaryApi] = useState<any>();
  const [activeSecondaryTestimonial, setActiveSecondaryTestimonial] = useState(0);

  // Auto-scroll functionality for main carousel
  useEffect(() => {
    if (!api) return;

    // Set up an interval to automatically advance the carousel
    const autoScrollInterval = setInterval(() => {
      if (activeTestimonial < testimonials.length - 1) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(autoScrollInterval);
  }, [api, activeTestimonial]);

  // Auto-scroll functionality for secondary carousel
  useEffect(() => {
    if (!secondaryApi) return;
    
    // Set up an interval to automatically advance the secondary carousel
    const autoScrollInterval = setInterval(() => {
      if (activeSecondaryTestimonial < testimonials.length - 3) {
        secondaryApi.scrollNext();
      } else {
        secondaryApi.scrollTo(0);
      }
    }, 7000); // Change slide every 7 seconds (different timing for variety)

    return () => clearInterval(autoScrollInterval);
  }, [secondaryApi, activeSecondaryTestimonial]);

  // Update the active testimonial when main carousel changes
  useEffect(() => {
    if (!api) return;
    
    api.on("select", () => {
      setActiveTestimonial(api.selectedScrollSnap());
    });
    
    return () => {
      api.off("select", () => {});
    };
  }, [api]);

  // Update the active secondary testimonial when secondary carousel changes
  useEffect(() => {
    if (!secondaryApi) return;
    
    secondaryApi.on("select", () => {
      setActiveSecondaryTestimonial(secondaryApi.selectedScrollSnap());
    });
    
    return () => {
      secondaryApi.off("select", () => {});
    };
  }, [secondaryApi]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow">
        <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 mb-6">
                <span className="w-2 h-2 rounded-full bg-gray-900 mr-2"></span> 
                <span className="text-sm font-medium">Programs for Schools – Choose Your Path</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Real Voices. Real Impact.</h2>
              
              <p className="text-gray-600 text-lg mb-8">
                Hear what students, teachers, and parents are saying about our programs at Kangeyam School.
              </p>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      api?.scrollTo(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === activeTestimonial ? "bg-gray-900" : "bg-gray-300"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="relative">
              <Carousel 
                opts={{ 
                  loop: true,
                  align: "start",
                  skipSnaps: false,
                }} 
                className="w-full"
                setApi={setApi}
              >
                <CarouselContent>
                  {testimonials.map((testimonial) => (
                    <CarouselItem key={testimonial.id} className="md:basis-full">
                      <div className="relative">
                        <div className="relative z-10">
                          <TestimonialCard
                            quote={testimonial.quote}
                            author={testimonial.author}
                            rating={testimonial.rating}
                          />
                        </div>
                        <div className="absolute top-4 left-4 w-full h-full bg-gray-200 rounded-lg -z-10"></div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {/* <div className="hidden md:block">
                  <CarouselPrevious className="left-0 ml-2" />
                  <CarouselNext className="right-0 mr-2" />
                </div> */}
              </Carousel>
            </div>
          </div>

          <div className="mt-20">
            <h3 className="text-3xl font-bold mb-8 text-center">🗣 What Our Teachers and Parents Are Saying</h3>
            <div className="relativex">
              <Carousel 
                opts={{ 
                  loop: true,
                  align: "start",
                  skipSnaps: false,
                }}
                className="w-full"
                setApi={setSecondaryApi}
              >
                <CarouselContent>
                  {testimonials.slice(3).map((testimonial) => (
                    <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2 pl-4">
                      <div className="relative">
                        <div className="relative z-10">
                          <TestimonialCard
                            quote={testimonial.quote}
                            author={testimonial.author}
                            rating={testimonial.rating}
                          />
                        </div>
                        <div className="absolute top-4 left-4 w-full h-full bg-gray-200 rounded-lg -z-10"></div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="mt-4 flex justify-center gap-2">
                  {testimonials.slice(3).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        secondaryApi?.scrollTo(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === activeSecondaryTestimonial ? "bg-gray-900" : "bg-gray-300"
                      }`}
                      aria-label={`Go to secondary testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </Carousel>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Testimonials;
