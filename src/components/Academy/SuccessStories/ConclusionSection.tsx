import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Tailwind breakpoint constants
const TAILWIND_BREAKPOINTS = {
  MD: 768,  // Tailwind md breakpoint
  LG: 1024, // Tailwind lg breakpoint
} as const;

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
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Only use dynamic image from database - no fallback
  const imageUrl = section.image?.url;

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setIsMobile(w < TAILWIND_BREAKPOINTS.MD);
      setIsTablet(w >= TAILWIND_BREAKPOINTS.MD && w <= TAILWIND_BREAKPOINTS.LG);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  

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

  // Convert all styles to Tailwind classes
  const getLeftColClasses = () => {
    if (isMobile) {
      return "flex-none w-full relative h-56 flex items-end justify-center pb-2.5";
    } else if (isTablet) {
      return "flex-none w-full relative h-80 flex items-end justify-center pb-5";
    } else {
      return "flex-image-column relative h-80 flex items-end justify-center pb-5";
    }
  };

  const getBlueShapeClasses = () => {
    const baseClasses = "absolute bottom-0 left-1/2 -translate-x-1/2 rounded-blue-shape bg-blue-50 z-0";
    if (isMobile) {
      return `${baseClasses} w-64 h-52`;
    } else if (isTablet) {
      return `${baseClasses} w-96 h-80`;
    } else {
      return `${baseClasses} w-96 h-80`;
    }
  };

  const getImageClasses = () => {
    const baseClasses = "w-full object-contain relative z-10 drop-shadow-lg";
    if (isMobile) {
      return `${baseClasses} max-w-60 h-48 mt-6`;
    } else if (isTablet) {
      return `${baseClasses} max-w-80 h-72 mt-8`;
    } else {
      return `${baseClasses} max-w-80 h-72 mt-1`;
    }
  };

  const getTitleClasses = () => {
    const baseClasses = "text-center font-bold text-gray-900";
    if (isMobile) {
      return `${baseClasses} text-3xl mb-4`;
    } else {
      return `${baseClasses} text-5xl mb-16`;
    }
  };

  const getParagraphClasses = () => {
    const baseClasses = "text-gray-700 text-justify";
    if (isMobile) {
      return `${baseClasses} text-xs leading-snug mb-2`;
    } else {
      return `${baseClasses} text-base leading-relaxed mb-4`;
    }
  };

  // Convert textCard styles to Tailwind classes
  const getTextCardClasses = () => {
    const baseClasses = "bg-white rounded-xl shadow-lg border border-gray-200 relative";
    const paddingClasses = isMobile ? "p-5" : "p-8";
    const heightClasses = isMobile ? "" : "min-h-72";
    return `${baseClasses} ${paddingClasses} ${heightClasses}`.trim();
  };

  return (
    <section 
      className="bg-white py-16 w-screen -mt-12 -mb-12 breakout"
    >
      <div className="max-w-5xl mx-auto px-6">

        {/* ── Title fade-up ─────────────────────────────────────── */}
        <motion.h2
          className={getTitleClasses()}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {section.title}
        </motion.h2>

        {/* ── Row stagger container ─────────────────────────────── */}
        <motion.div
          className="flex gap-10 items-center flex-wrap"
          variants={rowContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >

          {/* ── Left column ───────────────────────────────────────── */}
          <motion.div className={getLeftColClasses()} variants={fadeIn}>

            {/* Decorative blue box - bottom left of image */}
            {!isMobile && (
              <div className={`absolute -bottom-8 ${isTablet ? 'center-offset' : 'left-7'} w-11 h-11 rounded-xl bg-blue-500 z-20 drop-shadow-lg`} />
            )}

            {/* Blob */}
            <div className={getBlueShapeClasses()} />

            {/* Illustration */}
            <div className="relative z-10 flex justify-center items-center w-full h-full">
              {imageUrl && !imageError && (
                <motion.img
                  src={imageUrl}
                  alt="Conclusion illustration"
                  className={getImageClasses()}
                  variants={scaleIn}
                  onError={() => setImageError(true)}
                />
              )}
            </div>
          </motion.div>

          {/* ── Right column / card ───────────────────────────────── */}
          <motion.div className="flex-1 min-w-80" variants={fadeUp}>
            <motion.div
              className={getTextCardClasses()}
              variants={scaleIn}
            >
              {/* Decorative blue box - mobile top-left of card */}
              {isMobile && (
                <div className="absolute -top-4 left-4 w-7 h-7 rounded-lg bg-blue-500 z-30 drop-shadow-lg" />
              )}

              {/* Paragraphs with stagger */}
              <motion.div
                variants={paragraphContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                  <motion.p className={getParagraphClasses()} variants={paragraphItem}>
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