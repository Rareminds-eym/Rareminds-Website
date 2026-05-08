import { useState } from 'react';
import { motion } from 'framer-motion';
interface ImageItem {
  id: string;
  url: string;
}

interface SectionData {
  title: string;
  content: string;
  image?: ImageItem;
}

interface ConclusionSectionProps {
  section: SectionData;
}

const ConclusionSection = ({ section }: ConclusionSectionProps): JSX.Element => {
  const [imageError, setImageError] = useState(false);

  // Only use dynamic image from database - no fallback
  const imageUrl = section.image?.url;
  // ── Animation Variants ──────────────────────────────────────────────────────

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.7, ease: 'easeOut' as const },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.88 },
    visible: {
      opacity: 1, scale: 1,
      transition: { duration: 0.65, ease: 'easeOut' as const },
    },
  };

  const rowContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.1 },
    },
  };

  const paragraphContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.14, delayChildren: 0.2 },
    },
  };

  const paragraphItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  };


  return (
    <section
      className="bg-white w-screen breakout py-6 md:py-16 -mt-12 -mb-12"
    >
      <div className="max-w-5xl mx-auto px-6">

        {/* ── Title fade-up ─────────────────────────────────────── */}
        <motion.h2
          className="text-center font-bold text-gray-900 text-3xl -mb-8 md:text-5xl md:mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {section.title}
        </motion.h2>

        {/* ── Row stagger container ─────────────────────────────── */}
        <motion.div
          className="flex items-center flex-wrap gap-10 lg:gap-2"
          variants={rowContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >

          {/* ── Left column ───────────────────────────────────────── */}
          <motion.div className="relative flex items-end justify-center flex-none w-full h-56 pb-2.5 md:h-80 md:pb-5 lg:flex-image-column" variants={fadeIn}>

            {/* Decorative blue box - bottom left of image */}
            <div className="hidden md:block absolute -bottom-4 md:left-44 lg:left-12 w-11 h-11 rounded-xl bg-blue-500 z-20 drop-shadow-lg" />

            {/* Blob */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-blue-shape bg-blue-50 z-0 w-48 h-40 md:w-96 md:h-80"
            />
            <div
              className="block md:hidden absolute -bottom-5 left-2/5 -translate-x-24 w-7 h-7 rounded-lg bg-blue-500 z-20 drop-shadow-lg"
            />

            {/* Illustration */}
            <div className="relative z-10 flex justify-center items-center w-full h-full left-1 md:left-4">
              {imageUrl && !imageError && (
                <motion.img
                  src={imageUrl}
                  alt="Conclusion illustration"
                  className="w-full object-contain relative z-10 drop-shadow-lg max-w-40 h-36 mt-24 md:max-w-80 md:h-72 md:mt-8 lg:max-w-xs lg:h-80 lg:mt-12"
                  variants={scaleIn}
                  onError={() => setImageError(true)}
                />
              )}
            </div>
          </motion.div>

          {/* ── Right column / card ───────────────────────────────── */}
          <motion.div className="w-full px-2 md:flex-1 md:min-w-80" variants={fadeUp}>
            <motion.div
              className="bg-white rounded-xl shadow-lg border border-gray-200 relative p-5 md:p-8 md:min-h-72"
              variants={scaleIn}
            >

              {/* Paragraphs with stagger */}
              <motion.div
                variants={paragraphContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <motion.p className="text-gray-700 text-justify text-xs leading-snug mb-2 md:text-base md:leading-relaxed md:mb-4" variants={paragraphItem}>
                  {section.content}
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default ConclusionSection;