
import React from "react";
import { motion } from "framer-motion";
import { TestimonialsColumn, type Testimonial } from "../../Academy/UI/testimonials-column";

const testimonials: Testimonial[] = [
  {
    text: "The course materials were comprehensive and easy to follow. I've learned so much!",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Emma Johnson",
    role: "Student",
    rating: 5
  },
  {
    text: "The instructors were always available to help when I had questions. Great learning experience.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "James Smith",
    role: "Student",
    rating: 4
  },
  {
    text: "I appreciate how the concepts were broken down into manageable pieces. Very effective teaching.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Sophia Williams",
    role: "Student",
    rating: 5
  },
  {
    text: "The practical exercises really helped me understand the theoretical concepts. Excellent program!",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Michael Brown",
    role: "Student",
    rating: 4
  },
  {
    text: "I was able to apply what I learned immediately in my projects. Very practical curriculum.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Olivia Davis",
    role: "Student",
    rating: 5
  },
  {
    text: "The collaborative projects taught me how to work effectively in teams. Valuable experience.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Ava Miller",
    role: "Student",
    rating: 4
  },
  {
    text: "Clear explanations and excellent resources. I feel much more confident in my skills now.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Ethan Wilson",
    role: "Student",
    rating: 5
  },
  {
    text: "The course exceeded my expectations. I'm grateful for the knowledge and skills gained.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Isabella Taylor",
    role: "Student",
    rating: 5
  },
  {
    text: "The mentorship aspect of this program was invaluable. Thank you for the guidance!",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Noah Anderson",
    role: "Student",
    rating: 4
  },
];

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
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg">Student Testimonials</div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
            What our students say
          </h2>
          <p className="text-center mt-5 opacity-75">
            Hear from our students about their learning experiences
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
