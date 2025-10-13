import { useState, useEffect } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Working at Rareminds has been a great learning experience. It's a good place to start your career, you will not only learn the process but have a good time working. The work culture is fun and management is always encouraging.",
      name: "Dr. Aravinth Amanaai",
      role: "Trainer",
    },
    {
      quote:
        "I've had an excellent experience with this company! The materials provided are well-organized and interactive, which really helps reinforce what is being taught. I appreciate how responsive the support team is and how they genuinely care about student success. Overall, this company has exceeded my expectations, and I feel much more confident in my skills thanks to their quality education.",
      name: "RANJITH KUMAR",
      role: "Trainer",
    },
    {
      quote:
        "Great opportunity for fresher and training teaching skills helps future.",
      name: "Meeradevi P",
      role: "Trainer",
    },
  ];

  const desktopTestimonials = [...testimonials, ...testimonials];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();

    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  // Mobile auto slide
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <section className="py-20 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Top Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-black rounded-2xl w-12 h-12 flex items-center justify-center shadow-sm">
            <FiMessageCircle className="text-white text-2xl" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-16">
          <span className="text-[#000000]">Voices</span>{" "}
          <span className="text-[#000000]">Behind the Movement.</span>
        </h2>

        {/* MOBILE SLIDER */}
        <div className="block md:hidden relative">
          <div
            key={currentIndex}
            className="bg-gray-100 p-8 rounded-2xl shadow-sm text-left transition-all duration-500 ease-in-out"
          >
            <FaQuoteLeft className="text-black text-2xl mb-4" />
            <p className="text-gray-700 leading-relaxed mb-6">
              “{testimonials[currentIndex].quote}”
            </p>
            <div>
              <p className="font-semibold text-gray-900">
                {testimonials[currentIndex].name}
              </p>
              <p className="text-sm text-gray-600">
                {testimonials[currentIndex].role}
              </p>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentIndex ? "bg-[#E32A18] scale-110" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP INFINITE SCROLL */}
        <div className="hidden md:block overflow-hidden">
          <div className="flex gap-8 animate-scroll">
            {desktopTestimonials.map((item, index) => (
              <div
                key={index}
                className="min-w-[350px] bg-gray-100 p-8 rounded-2xl shadow-sm flex flex-col justify-between text-left"
              >
                <FaQuoteLeft className="text-black text-2xl mb-4" />
                <p className="text-gray-700 leading-relaxed mb-6">
                  “{item.quote}”
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
