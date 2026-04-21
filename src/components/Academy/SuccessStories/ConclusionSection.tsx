import React, { useState, useEffect } from 'react';
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

const ConclusionSection: React.FC<ConclusionSectionProps> = ({ section }) => {
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

  // Simple paragraph processing - just split by double newlines or use content as-is
  const paragraphs: string[] = section.content.includes('\n\n') 
    ? section.content.split('\n\n').map(p => p.trim()).filter(p => p.length > 0)
    : [section.content];

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
      return "flex-[0_0_100%] relative h-56 flex items-end justify-center pb-2.5";
    } else if (isTablet) {
      return "flex-[0_0_100%] relative h-80 flex items-end justify-center pb-5";
    } else {
      return "flex-[0_0_480px] relative h-80 flex items-end justify-center pb-5";
    }
  };

  const getBlueShapeClasses = () => {
    const baseClasses = "absolute bottom-0 left-1/2 -translate-x-1/2 rounded-[215px] bg-blue-50 z-0";
    if (isMobile) {
      return `${baseClasses} w-64 h-52`;
    } else if (isTablet) {
      return `${baseClasses} w-[420px] h-80`;
    } else {
      return `${baseClasses} w-[450px] h-[350px]`;
    }
  };

  const getImageClasses = () => {
    const baseClasses = "w-full object-contain relative z-[1] drop-shadow-[0_10px_6px_rgba(0,0,0,0.3)]";
    if (isMobile) {
      return `${baseClasses} max-w-60 h-48 mt-6`;
    } else if (isTablet) {
      return `${baseClasses} max-w-[360px] h-72 mt-8`;
    } else {
      return `${baseClasses} max-w-96 h-80 mt-1`;
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
    const baseClasses = "bg-white rounded-xl shadow-[8px_8px_20px_rgba(0,0,0,0.12)] border border-gray-200 relative";
    const paddingClasses = isMobile ? "p-[18px_20px]" : "p-[32px_36px]";
    const heightClasses = isMobile ? "" : "min-h-72";
    return `${baseClasses} ${paddingClasses} ${heightClasses}`.trim();
  };

  return (
    <section className="bg-white py-16 w-screen -ml-[calc(50vw-50%)] -mt-12 -mb-12">
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
              <div className={`absolute -bottom-8 ${isTablet ? 'left-[calc(50%-195px)]' : 'left-7'} w-11 h-11 rounded-xl bg-blue-500 z-[2] drop-shadow-[0_8px_10px_rgba(79,62,236,0.25)]`} />
            )}

            {/* Blob */}
            <div className={getBlueShapeClasses()} />

            {/* Illustration */}
            <div className="relative z-[1] flex justify-center items-center w-full h-full">
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
          <motion.div className="flex-1 min-w-72" variants={fadeUp}>
            <motion.div
              className={getTextCardClasses()}
              variants={scaleIn}
            >
              {/* Decorative blue box - mobile top-left of card */}
              {isMobile && (
                <div className="absolute -top-4 left-4 w-7 h-7 rounded-lg bg-blue-500 z-[3] drop-shadow-[0_4px_6px_rgba(59,130,246,0.35)]" />
              )}

              {/* Paragraphs with stagger */}
              <motion.div
                variants={paragraphContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {paragraphs.length > 1 ? (
                  paragraphs.map((para) => (
                    <motion.p
                      key={para.trim().slice(0, 40)}
                      className={getParagraphClasses()}
                      variants={paragraphItem}
                    >
                      {para.trim()}
                    </motion.p>
                  ))
                ) : (
                  <motion.p className={getParagraphClasses()} variants={paragraphItem}>
                    {section.content}
                  </motion.p>
                )}
              </motion.div>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default ConclusionSection;