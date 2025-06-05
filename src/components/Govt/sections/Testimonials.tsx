import React from 'react';
import { testimonialsdata } from '../../../constants/testimonials';
import { motion } from 'framer-motion';

const Testimonials: React.FC = () => {
  const col1 = testimonialsdata.filter((_, i) => i % 3 === 0);
  const col2 = testimonialsdata.filter((_, i) => i % 3 === 1);
  const col3 = testimonialsdata.filter((_, i) => i % 3 === 2);

  const duplicate = (arr: typeof testimonialsdata) => [...arr, ...arr];

  return (
    <section className="testimonials max-w-4xl mx-auto py-12 md:py-24">
      {/* Animated Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h1 className="text-base md:text-xl font-bold mb-4 bg-black bg-clip-text text-transparent">
          Voices of Impact
        </h1>
        <p className="text-sm text-gray-600 mx-auto">
          Real Stories, Real Growth.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-3 h-[600px] overflow-hidden relative">
        {/* Fade overlays */}
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

        {/* Column 3 */}
        <motion.div
          className="flex flex-col space-y-8"
          animate={{ y: ['0%', '-50%'] }}
          transition={{
            duration: col3.length * 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {duplicate(col3).map(({ id, name, role, message, avatarUrl }) => (
            <TestimonialCard
              key={`col3-${id}`}
              name={name}
              role={role}
              message={message}
              avatarUrl={avatarUrl}
            />
          ))}
        </motion.div>
      </div>
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
  <div className="testimonial p-4 rounded-xl shadow-lg border border-gray-200 flex flex-col items-center text-center bg-white">
    {avatarUrl && (
      <img
        src={avatarUrl}
        alt={`${name} avatar`}
        className="w-20 h-20 rounded-full mb-4 object-cover"
      />
    )}
    <p className="text-gray-700 mb-2 md:mb-4 text-sm md:text-base">&quot;{message}&quot;</p>
    <p className="font-semibold text-sm md:text-base ">{name}</p>
    <p className=" text-gray-500 text-sm md:text-base">{role}</p>
  </div>
);

export default Testimonials;
