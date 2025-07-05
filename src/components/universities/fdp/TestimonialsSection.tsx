import React from 'react';
import { motion } from 'framer-motion';
import { fdptestimonials } from '@/utils/fdptestimonials'; // ✅ Correct import

// Convert fdptestimonials to match TestimonialCardProps
const mappedTestimonials = fdptestimonials.map((t, index) => ({
  id: index,
  name: t.name,
  role: `${t.course}${t.university ? `, ${t.university}` : ''}`,
  message: t.testimonial,
  avatarUrl: undefined, // Optional: Replace with a default avatar if needed
}));

const duplicate = (arr: typeof mappedTestimonials) => [...arr, ...arr];

const sideImages = [
  '/institutions/images/Testimonials/FDP1.jpg',
  '/institutions/images/Testimonials/FDP2.jpg', 
  '/institutions/images/Testimonials/FDP3.jpg',
  '/institutions/images/Testimonials/FDP4.jpg',
  '/institutions/images/Testimonials/FDP5.jpg',
  '/institutions/images/Testimonials/FDP6.jpg',
  '/institutions/images/Testimonials/FDP7.jpg',
  '/institutions/images/Testimonials/Pic9.jpg',
];

const TestimonialsSection: React.FC = () => {
  const col1 = mappedTestimonials.filter((_, i) => i % 2 === 0);
  const col2 = mappedTestimonials.filter((_, i) => i % 2 === 1);

  return (
    <section className="relative py-14 bg-[#F9FAFB]">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h1 className="text-xl font-bold mb-2 bg-black bg-clip-text text-transparent">
          FDP Moments and Testimonials
        </h1>
        <p className="text-sm text-gray-600 mb-16">Real Stories, Real Growth.</p>
      </motion.div>

      <div className="container mx-auto px-6 max-w-6xl flex flex-col lg:flex-row gap-12 ">
        {/* Side Auto-Scrolling Image Strip */}
        <div className="w-full lg:w-1/2 h-[520px] overflow-hidden relative shadow-lg rounded-xl">
          <div className="absolute inset-0 flex flex-col animate-scroll-y ">
            {sideImages.concat(sideImages).map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`testimonial-img-${idx}`}
                className="w-full h-64 object-cover"
              />
            ))}
          </div>
        </div>

        {/* Testimonials Content */}
        <div className="w-full lg:w-1/2">
          {/* Scrolling Testimonials */}
          <div className="grid grid-cols-2 gap-4 h-[500px] overflow-hidden relative">
            {/* Fading overlays */}
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent z-20" />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-20" />

            {/* Column 1 */}
            <motion.div
              className="flex flex-col space-y-8"
              animate={{ y: ['0%', '-50%'] }}
              transition={{
                duration: col1.length * 8,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {duplicate(col1).map(({ id, name, role, message, avatarUrl }) => (
                <TestimonialCard
                  key={`col1-${id}`}
                  name={name}
                  role={role}
                  message={message}
                  avatarUrl={avatarUrl}
                />
              ))}
            </motion.div>

            {/* Column 2 */}
            <motion.div
              className="flex flex-col space-y-8"
              animate={{ y: ['-50%', '0%'] }}
              transition={{
                duration: col2.length * 8,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {duplicate(col2).map(({ id, name, role, message, avatarUrl }) => (
                <TestimonialCard
                  key={`col2-${id}`}
                  name={name}
                  role={role}
                  message={message}
                  avatarUrl={avatarUrl}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Image scroll animation */}
      <style jsx>{`
        @keyframes scroll-y {
          0% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(-2560px);
          }
        }

        .animate-scroll-y {
          animation: scroll-y 90s linear infinite;
        }
      `}</style>
    </section>
  );
};

type TestimonialCardProps = {
  name: string;
  role: string;
  message: string;
  avatarUrl?: string;
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  message,
  avatarUrl,
}) => (
  <div className="testimonial p-4 rounded-xl shadow-md border border-gray-200 flex flex-col items-center text-center bg-white">
    {avatarUrl && (
      <img
        src={avatarUrl}
        alt={`${name} avatar`}
        className="w-16 h-16 rounded-full mb-3 object-cover"
      />
    )}
    <p className="text-gray-700 text-sm mb-4 italic">&quot;{message}&quot;</p>
    <p className="font-semibold">{name}</p>
    <p className="text-xs text-gray-500 mt-4">{role}</p>
  </div>
);

export default TestimonialsSection;
