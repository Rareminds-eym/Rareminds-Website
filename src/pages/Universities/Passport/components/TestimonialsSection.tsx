import { useState, useEffect } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "With my Skill Passport, recruiters noticed my projects instantly. It gave me confidence to apply anywhere.",
      name: "Priya",
      role: "B.Sc. Student",
    },
    {
      quote:
        "Filtering job-ready candidates has never been faster. Skill Passport saves us weeks of screening.",
      name: "HR Head",
      role: "TechCorp",
    },
    {
      quote:
        "It bridges education and employability in one shot.",
      name: "Registrar",
      role: "Partner University",
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

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(nextTestimonial, 4000);
    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Top Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-black rounded-2xl w-12 h-12 flex items-center justify-center shadow-sm">
            <FiMessageCircle className="text-white text-2xl" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-16">
          💬 <span className="text-[#FF6B6B]">Voices</span> Behind the Movement
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

          {/* Dots for mobile */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentIndex ? "bg-[#FF6B6B] scale-110" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP SCROLL */}
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
