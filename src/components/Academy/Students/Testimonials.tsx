
import React from "react";
import { motion } from "framer-motion";
import { TestimonialsColumn, type Testimonial } from "../../Academy/UI/testimonials-column";

const testimonials: Testimonial[] = [
  {
    text: "“Our teachers now use videos and smartboards. It makes it easier for us to understand things.” ",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "Student",
    role: "Kangeyam School, Tamil Nadu",
    rating: 5
  },
  {
    text: "“Earlier, we had only lectures. Now, we have quizzes and group activities on the screen. It’s more fun to learn.”",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "Student",
    role: "Kangeyam School, Tamil Nadu",
    rating: 4
  },
  {
    text: "“Classes are more interesting now. We play games and do activities to understand topics.” ",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "Student",
    role: "Sunrise Academy, Bangalore",
    rating: 5
  },
  {
    text: "“I used to feel sleepy in class. Now I enjoy coming to school because the teaching is more exciting.”",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "Student",
    role: "Sunrise Academy, Bangalore",
    rating: 4
  },
  {
    text: "“ Our teachers are trying new ideas. Sometimes we even learn through stories or real-life examples.”",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "Student",
    role: "Greenfield Public School, Delhi",
    rating: 5
  },
  {
    text: "“Earlier classes felt boring, but now they ask us questions and make us do creative work. It’s fun.”",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "Student",
    role: "Greenfield Public School, Delhi",
    rating: 4
  },
  {
    text: "“Now we use tablets and online tools in class. It helps me learn better and faster.” ",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "Student",
    role: "Westside High, Mumbai",
    rating: 5
  },
  {
    text: "“I love the new way of learning with videos and apps. It’s like studying and playing together.”",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "Student",
    role: "Westside High, Mumbai",
    rating: 5
  },
  {
    text: "“Teachers seem happier now. They give us more attention and are less stressed.”",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "Student",
    role: "Valley View Institute, Himachal Pradesh",
    rating: 4
  },
  {
    text: "“Class is more relaxed. We also do small mindfulness activities sometimes, which I like.”",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "Student",
    role: "Valley View Institute, Himachal Pradesh",
    rating: 4
  },
  {
    text: "“Now we know how teachers will mark our tests. It feels fair and clear.”",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "Student",
    role: "Coastal Academy, Kerala",
    rating: 4
  },{
    text: "“Before, every teacher gave marks differently. Now it’s the same system, and we understand it better.”",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "Student",
    role: "Coastal Academy, Kerala",
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
