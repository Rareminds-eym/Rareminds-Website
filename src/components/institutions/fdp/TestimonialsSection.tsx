import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const testimonials = [
  {
    name: 'Dr. Priya Sharma',
    role: 'HOD, Computer Science',
    college: 'VIT University',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=120&h=120',
    quote: 'The FDP transformed our teaching methodology completely.',
    background: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800'
  },
  {
    name: 'Prof. Rajesh Kumar',
    role: 'Associate Professor',
    college: 'IIT Madras',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=120&h=120',
    quote: 'Excellent blend of theory and practical applications.',
    background: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800'
  },
  {
    name: 'Dr. Meera Patel',
    role: 'Dean',
    college: 'BITS Pilani',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?fit=crop&w=120&h=120',
    quote: 'The industry alignment in curriculum design was invaluable.',
    background: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800'
  }
];

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">FDP Moments & Testimonials</h2>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="relative h-[400px]">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  opacity: currentTestimonial === index ? 1 : 0,
                  scale: currentTestimonial === index ? 1 : 0.9,
                  x: `${(index - currentTestimonial) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
                className="absolute top-0 left-0 w-full h-full"
              >
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 h-full shadow-xl">
                  <div className="flex h-full gap-8">
                    <div className="w-1/2 relative rounded-2xl overflow-hidden">
                      <img
                        src={testimonial.background}
                        alt="FDP Session"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    
                    <div className="w-1/2 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-6">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                        />
                        <div>
                          <h4 className="text-xl font-semibold">{testimonial.name}</h4>
                          <p className="text-gray-600">{testimonial.role}</p>
                          <p className="text-blue-600">{testimonial.college}</p>
                        </div>
                      </div>
                      <blockquote className="text-2xl font-light italic text-gray-700 mb-6">
                        "{testimonial.quote}"
                      </blockquote>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentTestimonial === index ? 'bg-blue-600 w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}