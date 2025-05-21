
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

// interface Testimonial {
//   id: number;
//   name: string;
//   role: string;
//   institution: string;
//   quote: string;
//   image: string;
// }

// const testimonials: Testimonial[] = [
//   {
//     id: 1,
//     name: "Dr. Priya Sharma",
//     role: "Principal",
//     institution: "Delhi Public School, Bangalore",
//     quote: "The NEP leadership training transformed our approach to curriculum implementation. We've seen a 40% increase in student engagement across all subjects.",
//     image: ""
//   },
//   {
//     id: 2,
//     name: "Prof. Rajiv Kumar",
//     role: "Department Head",
//     institution: "Guru Nanak College, Punjab",
//     quote: "The Train-the-Trainer program gave me practical tools to help my faculty adopt NEP methodologies. The interactive sessions were particularly valuable.",
//     image: ""
//   },
//   {
//     id: 3,
//     name: "Ms. Anita Desai",
//     role: "Science Teacher",
//     institution: "Kendriya Vidyalaya, Chennai",
//     quote: "After completing the Digital Pedagogy course, I completely redesigned my teaching approach. My students now actively participate in experiential learning activities.",
//     image: ""
//   },
//   {
//     id: 4,
//     name: "Dr. Mohan Rao",
//     role: "Dean of Studies",
//     institution: "University of Hyderabad",
//     quote: "RareMinds training programs stand out for their deep understanding of the Indian education context and practical NEP implementation strategies.",
//     image: ""
//   }
// ];

// const TestimonialsCarousel = () => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const nextSlide = () => {
//     setActiveIndex((current) => (current + 1) % testimonials.length);
//   };

//   const prevSlide = () => {
//     setActiveIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1));
//   };

//   const goToSlide = (index: number) => {
//     setActiveIndex(index);
//   };

//   return (
//     <div className="py-20 bg-gradient-to-br from-blue-800 to-blue-900 text-white" id="testimonials">
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="text-center max-w-3xl mx-auto mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
//           <p className="text-lg text-blue-100">
//             Hear from educators across India who have transformed their teaching practices with our NEP-aligned training
//           </p>
//         </div>

//         <div className="max-w-4xl mx-auto relative">
//           <div className="overflow-hidden">
//             <div 
//               className="flex transition-transform duration-500 ease-in-out"
//               style={{ transform: `translateX(-${activeIndex * 100}%)` }}
//             >
//               {testimonials.map((testimonial) => (
//                 <div key={testimonial.id} className="w-full flex-shrink-0 px-6">
//                   <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
//                     <div className="flex flex-col md:flex-row md:items-center gap-6">
//                       <div className="flex-shrink-0">
//                         <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 flex items-center justify-center">
//                           <Quote className="h-10 w-10 text-blue-300" />
//                         </div>
//                       </div>
//                       <div>
//                         <blockquote className="text-lg md:text-xl mb-6 italic">
//                           "{testimonial.quote}"
//                         </blockquote>
//                         <div className="border-t border-white/20 pt-4">
//                           <h4 className="font-semibold text-lg">{testimonial.name}</h4>
//                           <p className="text-blue-200">{testimonial.role}, {testimonial.institution}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <Button
//             variant="ghost"
//             size="icon"
//             className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
//             onClick={prevSlide}
//           >
//             <ChevronLeft className="h-6 w-6" />
//           </Button>

//           <Button
//             variant="ghost"
//             size="icon" 
//             className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
//             onClick={nextSlide}
//           >
//             <ChevronRight className="h-6 w-6" />
//           </Button>

//           <div className="flex justify-center mt-8 space-x-2">
//             {testimonials.map((_, index) => (
//               <button
//                 key={index}
//                 className={cn(
//                   "w-2.5 h-2.5 rounded-full transition-all",
//                   activeIndex === index
//                     ? "bg-white w-8"
//                     : "bg-white/30 hover:bg-white/50"
//                 )}
//                 onClick={() => goToSlide(index)}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestimonialsCarousel;
import React from "react";
import { motion } from "framer-motion";
import { TestimonialType } from "..//UI/testimonial";
import { Star, StarHalf } from "lucide-react";

const testimonials: TestimonialType[] = [
  {
    text: "Good",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Briana Patton",
    role: "Operations Manager",
    rating: 5,
    content: ""
  },
  {
    text: "Good",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Bilal Ahmed",
    role: "IT Manager",
    rating: 4.5,
  },
  {
    text: "Good",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Saman Malik",
    role: "Customer Support Lead",
    rating: 5,
    content: ""
  },
  {
    text: "Good",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Omar Raza",
    role: "CEO",
    rating: 4,
  },
  {
    text: "Good",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Zainab Hussain",
    role: "Project Manager",
    rating: 4.5,
    content: ""
  },
  {
    text: "Good",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Aliza Khan",
    role: "Business Analyst",
    rating: 5,
  },
  {
    text: "Good",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Farhan Siddiqui",
    role: "Marketing Director",
    rating: 3.5,
    content: ""
  },
 
];

const Testimonial = () => {
  // Function to render star ratings
  const renderStars = (rating?: number) => {
    if (!rating) return null;
    
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    // Add empty stars to complete 5 stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="h-4 w-4 text-gray-300" />);
    }
    
    return <div className="flex mt-2">{stars}</div>;
  };

  return (
    <section className="bg-background py-20 relative bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-FULL mx-auto"
        >
          <div className="flex justify-center">
            <div className="border border-primary/20 py-1 px-4 rounded-full text-sm text-primary  mb-6 font-medium">
              Testimonials
            </div>
          </div>

                   <h2 className="text-2xl md:text-4xl font-semibold text-center mb-2 text-gray-800 leading-[50px]">From Skepticism to Success - What Educators Say</h2>
          <p className="text-center mt-4 text-gray-600">
          Real Voices. Real Results.
          </p>
        </motion.div>

        <div className="flex justify-center mt-12 max-w-[1200px] mx-auto overflow-hidden">
          <div className="w-full relative">
            <motion.div
              animate={{
                translateX: "-33.33%", // Adjusted to show 3 testimonials at once
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
              className="flex flex-row gap-6 pr-6 bg-background"
            >
              {[
                ...testimonials,
                ...testimonials.slice(0, 3) // Add first 3 testimonials again for smooth looping
              ].map(({ text, image, name, role, rating, content }, i) => (
                <div 
                  className="p-6 md:p-8 rounded-2xl border shadow-lg shadow-primary/10 max-w-xs w-full flex-shrink-0 bg-white" 
                  key={i}
                >
                 
                  
                


                  {/* detail */}
                  <div className="flex items-center gap-3 mt-4">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5 text-sm">{name}</div>
                      <div className="leading-5 text-gray-500 tracking-tight text-xs">{role}</div>
                    </div>
                  </div>

                  {/* Star rating */}
                  {renderStars(rating)}
                  


                 {/* Render content if it exists */}
                 {content && (
                    <div className="mt-4 text-sm text-gray-600">
                      {content}
                    </div>
                  )}

               <p className="text-sm md:text-base text-gray-700">{text}</p>
                  

                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;