
import React from "react";
import { motion } from "framer-motion";
import { TestimonialsColumn, type Testimonial } from "../UI/testimonials-column";

const testimonials: Testimonial[] = [
  {
    text: "“The digital pedagogy sessions were super practical. Our teachers now confidently use Tech in daily lessons.” ",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "",
    role: "HOD – Kangeyam School, Tamil Nadu",
    rating: 5
  },
  {
    text: "“We moved from basic chalk-and-talk to using screens, apps, and smart methods. It’s made teaching smoother and more effective.” ",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "",
    role: "Faculty – Kangeyam School, Tamil Nadu",
    rating: 4.5
  },
  {
    text: "“The interactive methods we learned have completely changed how we teach. Students are way more responsive now.” ",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "",
    role: "HOD – Sunrise Academy, Bangalore",
    rating: 5
  },
  {
    text: "“The interactive methods we learned have completely changed how we teach. Students are way more responsive now.”",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "",
    role: "HOD – Sunrise Academy, Bangalore",
    rating: 4
  },
  {
    text: "“Earlier, my classes were quiet and dull. Now, students ask questions, join discussions, and even smile more.”",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "",
    role: "Faculty – Sunrise Academy, Bangalore",
    rating: 4.5
  },
  {
    text: "“This workshop was a wake-up call. We needed to move ahead, and this gave us exactly the tools to do that.” ",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "",
    role: "HOD – Greenfield Public School, Delhi",
    rating: 5
  },
  {
    text: "“I started using new methods right after the training. The results were almost instant – more focus, more results.” ",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "",
    role: "Faculty – Greenfield Public School, Delhi",
    rating: 3.5
  },
  {
    text: "“Tech is finally part of our lesson plans, not just a side idea. This training made the integration feel natural.” ",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "",
    role: "HOD – Westside High, Mumbai",
    rating: 3.5
  },
  {
    text: "“The wellness program helped our teachers get their energy and passion back. It was much needed.”",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "",
    role: "HOD – Valley View Institute, Himachal Pradesh",
    rating: 3.5
  },
  {
    text: "“We’ve gone from hesitant to confident with EdTech. Even simple tools have brought big results in student interest.”",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "",
    role: "Faculty – Westside High, Mumbai",
    rating: 3.5
  },
  {
    text: "“I was feeling exhausted before. This program helped me feel motivated again and brought balance into my work.”",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "",
    role: "Faculty – Valley View Institute, Himachal Pradesh",
    rating: 3.5
  },
  {
    text: "“Our assessments used to vary from class to class. Now we follow one clear method that everyone understands.” ",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "",
    role: "HOD – Coastal Academy, Kerala",
    rating: 3.5
  },
  {
    text: "“The workshop helped us align our grading and feedback system. It’s made evaluation much easier for teachers and students.”",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "",
    role: "Faculty – Coastal Academy, Kerala",
    rating: 3.5
  }
]
;

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section className="bg-background my-20 relative">
      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-full mx-auto"
        >
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg">Testimonials</div>
          </div>

          <h2 className=" text-center  md:text-3xl lg:text-4xl xl:text-4xl font-bold tracking-tighter mt-5">From Skepticism to Success - What Educators Say</h2>

          <p className="text-center mt-5 opacity-75">
            Real Voices. Real Results.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={30} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={35} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={32} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
