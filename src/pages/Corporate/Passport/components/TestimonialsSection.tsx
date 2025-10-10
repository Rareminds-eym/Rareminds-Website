import { useState, useEffect } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "The session was informative and well-structured. I appreciated the use of real-life examples and how doubts were addressed clearly. A little more time for interactive discussions or Q&A would make it even better. Thank you!",
      name: "K. Yuvaraj",
      role: "Madurai Kamaraj University",
    },
    {
      quote:
        "session was clear and engaging. I appreciated the practical examples and how doubts were addressed patiently. Keep up the great work!",
      name: "Priya Rajnarayanan",
      role: "Bharathiar University",
    },
    {
      quote:
        "I truly appreciate the effort you put into making us understand each topic. I sincerely thank you for your guidance and support during the Naan Mudhalvan program.",
      name: "Abdul Azeez",
      role: "Manonmaniam Sundaranar University",
    },
    {
      quote:
        "The trainer explained the topic in a clear and simple way, which made it easy to understand.",
      name: "Jeevanandha Aadhina R.",
      role: "Periyar University",
    },
    {
      quote:
        "The trainer conducted the session in a clear and well-structured manner, making the concepts easy to understand with practical examples. The explanations were interactive and engaging, which helped in maintaining interest throughout the class. Doubts were addressed patiently, and the trainer ensured that everyone was able to follow the topics. Overall, the session was very informative and useful for gaining a better understanding of Good Manufacturing Practices",
      name: "Poovarasan",
      role: "Bharathiar University",
    },
    {
      quote:
        "The trainer explained the topics clearly and was very patient in addressing questions. It would be helpful if more practical examples or case studies could be included to enhance understanding.",
      name: "Muthu Keerthi",
      role: "Madurai Kamaraj University",
    },
    {
      quote:
        "Amazing teacher. Patience and explanations make complex topics so much easier to understand.",
      name: "Reshma Devi",
      role: "Madurai Kamaraj University",
    },
    {
      quote:
        "The trainer conducted the session in a clear and well-structured manner, making the concepts easy to understand with practical examples. The explanations were interactive and engaging, which helped in maintaining interest throughout the class. Doubts were addressed patiently, and the trainer ensured that everyone was able to follow the topics. Overall, the session was very informative and useful for gaining a better understanding of Good Manufacturing Practices.",
      name: "Mothishwaran S",
      role: "Periyar University",
    },
    {
      quote:
        "The trainer's explanations were clear and concise making complex topics easier to understand.",
      name: "Vishalini Alagusokkan",
      role: "Manonmaniam Sundaranar University",
    },
    {
      quote:
        "Great session on product recalls and food safety regulations! The examples and case studies really helped illustrate the key points.",
      name: "Delina",
      role: "Bharathidasan University",
    },
    {
      quote:
        "The trainer explained the concepts clearly with practical examples, which made learning easy and useful.",
      name: "Kousalya",
      role: "Thiruvalluvar University",
    },
    {
      quote:
        "1. The trainer explained every concept clearly and made learning easy. 2. Sessions were engaging, interactive, and well-structured. 3. They encouraged questions and patiently cleared all doubts. 4. Real-life examples helped us understand the topics better. 5. Overall, a very knowledgeable and supportive trainer.",
      name: "Ramesh Kanna",
      role: "Thiruvalluvar University",
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
          <span className="text-[#E32A18]">Voices</span>{" "}
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

          {/* Dots only for mobile */}
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
