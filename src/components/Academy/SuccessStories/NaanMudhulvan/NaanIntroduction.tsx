

import { motion } from "framer-motion";

interface IntroductionSection {
  title: string;
  content: string;
}

interface NaanIntroductionProps {
  section: IntroductionSection;
}

// ── Animation Variants ──────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  }),
};
// ────────────────────────────────────────────────────────────────────

function NaanIntroduction({ section }: NaanIntroductionProps): JSX.Element {
  return (
    <div className="bg-white -mt-16 md:-mt-5 pb-4 px-4 md:px-8 flex flex-col items-center">

      {/* Heading — fade up */}
      <motion.h1
        className="text-2xl md:text-4xl font-bold text-gray-900 mb-10 text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        custom={0}
      >
        {section.title}
      </motion.h1>

      {/* Card — fade in */}
      <motion.div
        className="w-full max-w-4xl border border-gray-200 rounded-2xl px-4 md:px-12 py-6 md:py-10"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        custom={0.15}
      >
        {/* Dynamic Paragraphs */}
        <motion.p
          className="font-normal text-sm md:text-base text-gray-800 leading-normal md:leading-relaxed mb-6 text-justify"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={0.2}
        >
          {section.content}
        </motion.p>
      </motion.div>
    </div>
  );
}

export default NaanIntroduction;