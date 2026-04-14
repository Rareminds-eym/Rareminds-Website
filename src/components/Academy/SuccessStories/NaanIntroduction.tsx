import React from "react";
import { motion } from "framer-motion";

interface FeatureItem {
  title: string;
  subtitle: string;
}

interface IntroductionSection {
  title: string;
  content: string;
}

interface NaanIntroductionProps {
  section: IntroductionSection;
}

const features: FeatureItem[] = [
  { title: "Physical Classroom", subtitle: "Interventions" },
  { title: "LMS-Based Content", subtitle: "Supplementary" },
  { title: "Hands-on Projects", subtitle: "Real-world" },
  { title: "Blended Learning", subtitle: "Experience" },
];

// ── Animation Variants ──────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const featureItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};
// ────────────────────────────────────────────────────────────────────

const NaanIntroduction: React.FC<NaanIntroductionProps> = ({ section }) => {
  const paragraphs = section.content
    .split(". ")
    .reduce((acc: string[], sentence: string, index: number, array: string[]) => {
      const trimmedSentence = sentence.trim();
      if (!trimmedSentence) return acc;

      if (index === 0) {
        acc.push(trimmedSentence + (trimmedSentence.endsWith(".") ? "" : "."));
      } else if (index < Math.ceil(array.length / 2)) {
        if (acc[0]) {
          acc[0] +=
            " " + trimmedSentence + (trimmedSentence.endsWith(".") ? "" : ".");
        }
      } else {
        if (!acc[1]) acc[1] = "";
        acc[1] +=
          (acc[1] ? " " : "") +
          trimmedSentence +
          (trimmedSentence.endsWith(".") ? "" : ".");
      }

      return acc;
    }, []);

  return (
    <div className="min-h-screen bg-white -mt-16 md:-mt-5 pb-4 px-4 md:px-8 flex flex-col items-center">

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
        style={{ borderRadius: "16px" }}
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        custom={0.15}
      >
        {/* Dynamic Paragraphs */}
        {paragraphs.map((paragraph, index) => (
          <motion.p
            key={index}
            className="font-normal text-sm md:text-base text-gray-800 leading-normal md:leading-relaxed mb-6 text-justify"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0.2 + index * 0.15}
          >
            {paragraph}
          </motion.p>
        ))}

        {/* Divider */}
        <motion.div
          className="border-t border-gray-100 mb-6 md:mb-8"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={0.35}
        />

        {/* Feature Icons Row */}
        <motion.div
          className="grid grid-cols-4 gap-1 md:gap-4 text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-1 md:gap-2"
              variants={featureItem}
            >
              {/* Smaller icon on mobile */}
              <svg
                className="w-4 h-4 md:w-6 md:h-6 text-gray-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12.5l2.5 2.5 4.5-5" />
              </svg>

              {/* Title — tiny on mobile, normal on desktop */}
              <p
                className="font-medium text-gray-800 leading-tight text-center"
                style={{ fontSize: "clamp(7px, 2vw, 12px)" }}
              >
                {feature.title}
              </p>

              {/* Subtitle — tiny on mobile, normal on desktop */}
              <p
                className="font-normal text-gray-500 leading-tight text-center"
                style={{ fontSize: "clamp(6px, 1.8vw, 11px)" }}
              >
                {feature.subtitle}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NaanIntroduction;