import React from "react";
import { motion } from "framer-motion";
import { testimonialsData } from "@/data/testimonialsData";

const Testimonials: React.FC = () => {
  const col1 = testimonialsData.filter((_, i) => i % 3 === 0);
  const col2 = testimonialsData.filter((_, i) => i % 3 === 1);
  const col3 = testimonialsData.filter((_, i) => i % 3 === 2);

  const duplicate = (arr: typeof testimonialsData, suffix: string) =>
    [...arr, ...arr.map((item) => ({ ...item, id: `${item.id}-${suffix}` }))];

  return (
    <section className="testimonials max-w-4xl mx-auto py-8 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      {/* Animated Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 sm:mb-12"
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-black bg-clip-text text-transparent">
          Voices of Impact
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mx-auto max-w-xl">
          Real Stories, Real Growth.
        </p>
      </motion.div>

      <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden relative">
        {/* Fade overlays */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-b from-white to-transparent z-20" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-white to-transparent z-20" />

        {/* Column 1 */}
        <motion.div
          className="flex flex-col space-y-4 sm:space-y-6 lg:space-y-8"
          animate={{ y: ["0%", "-50%"] }}
          transition={{
            duration: col1.length * 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicate(col1, "dup1").map(
            ({ id, name, role, message, avatarUrl }) => (
              <TestimonialCard
                key={id}
                name={name}
                role={role ?? ""}
                message={message}
                avatarUrl={avatarUrl}
              />
            )
          )}
        </motion.div>

        {/* Hide middle column on mobile, show on tablet */}
        <motion.div
          className="hidden sm:flex flex-col space-y-4 sm:space-y-6 lg:space-y-8"
          animate={{ y: ["-50%", "0%"] }}
          transition={{
            duration: col2.length * 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicate(col2, "dup2").map(
            ({ id, name, role, message, avatarUrl }) => (
              <TestimonialCard
                key={id}
                name={name}
                role={role ?? ""}
                message={message}
                avatarUrl={avatarUrl}
              />
            )
          )}
        </motion.div>

        {/* Hide last column on mobile and tablet, show on desktop */}
        <motion.div
          className="hidden lg:flex flex-col space-y-4 sm:space-y-6 lg:space-y-8"
          animate={{ y: ["0%", "-50%"] }}
          transition={{
            duration: col3.length * 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicate(col3, "dup3").map(
            ({ id, name, role, message, avatarUrl }) => (
              <TestimonialCard
                key={id}
                name={name}
                role={role ?? ""}
                message={message}
                avatarUrl={avatarUrl}
              />
            )
          )}
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
  <div className="testimonial p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-lg border border-gray-200 flex flex-col items-center text-center bg-white">
    {avatarUrl && (
      <img
        src={avatarUrl}
        alt={`${name} avatar`}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-3 sm:mb-4 object-cover"
      />
    )}
    <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
      &quot;{message}&quot;
    </p>
    <p className="font-semibold text-sm sm:text-base">{name}</p>
    <p className="text-xs sm:text-sm text-gray-500">{role}</p>
  </div>
);

export default Testimonials;
