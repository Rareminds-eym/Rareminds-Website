

import React, { useState, useEffect } from 'react';
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

const ConclusionSection: React.FC<ConclusionSectionProps> = ({ section }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Only use dynamic image from database - no fallback
  const imageUrl = section.image?.url;

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setIsTablet(w >= 768 && w <= 1024);
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
      return "flex-[0_0_100%] relative h-[220px] flex items-end justify-center pb-[10px]";
    } else if (isTablet) {
      return "flex-[0_0_100%] relative h-[320px] flex items-end justify-center pb-[20px]";
    } else {
      return "flex-[0_0_480px] relative h-[320px] flex items-end justify-center pb-[20px]";
    }
  };

  const getBlueShapeClasses = () => {
    const baseClasses = "absolute bottom-0 left-1/2 -translate-x-1/2 rounded-[215px] bg-[#e0eeff] z-0";
    if (isMobile) {
      return `${baseClasses} w-[260px] h-[210px]`;
    } else if (isTablet) {
      return `${baseClasses} w-[420px] h-[320px]`;
    } else {
      return `${baseClasses} w-[450px] h-[350px]`;
    }
  };

  const getImageClasses = () => {
    const baseClasses = "w-full object-contain relative z-[1] drop-shadow-[0_10px_6px_rgba(0,0,0,0.3)]";
    if (isMobile) {
      return `${baseClasses} max-w-[240px] h-[200px] mt-[25px]`;
    } else if (isTablet) {
      return `${baseClasses} max-w-[360px] h-[300px] mt-[30px]`;
    } else {
      return `${baseClasses} max-w-[400px] h-[320px] mt-[5px]`;
    }
  };

  const getTitleClasses = () => {
    const baseClasses = "text-center font-bold text-[#111]";
    if (isMobile) {
      return `${baseClasses} text-[1.875rem] mb-[16px]`;
    } else {
      return `${baseClasses} text-[3rem] mb-[60px]`;
    }
  };

  const getParagraphClasses = () => {
    const baseClasses = "text-[#333] text-justify";
    if (isMobile) {
      return `${baseClasses} text-[0.72rem] leading-[1.4] mb-[8px]`;
    } else {
      return `${baseClasses} text-[1rem] leading-[1.5] mb-[16px]`;
    }
  };

  // Convert textCard styles to Tailwind classes
  const getTextCardClasses = () => {
    const baseClasses = "bg-white rounded-[12px] shadow-[8px_8px_20px_rgba(0,0,0,0.12)] border border-[#e8ecf3] relative";
    const paddingClasses = isMobile ? "p-[18px_20px]" : "p-[32px_36px]";
    const heightClasses = isMobile ? "" : "min-h-[280px]";
    return `${baseClasses} ${paddingClasses} ${heightClasses}`.trim();
  };

  return (
    <section className="bg-white py-[60px] w-screen -ml-[calc(50vw-50%)] -mt-[50px] -mb-[50px]">
      <div className="max-w-[1100px] mx-auto px-[24px]">

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
          className="flex gap-[40px] items-center flex-wrap"
          variants={rowContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >

          {/* ── Left column ───────────────────────────────────────── */}
          <motion.div className={getLeftColClasses()} variants={fadeIn}>

            {/* Decorative blue box - bottom left of image */}
            {!isMobile && (
              <div className={`absolute -bottom-[30px] ${isTablet ? 'left-[calc(50%-195px)]' : 'left-[28px]'} w-[45px] h-[45px] rounded-[12px] bg-[#3B82F6] z-[2] drop-shadow-[0_8px_10px_rgba(79,62,236,0.25)]`} />
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
          <motion.div className="flex-1 min-w-[300px]" variants={fadeUp}>
            <motion.div
              className={getTextCardClasses()}
              variants={scaleIn}
            >
              {/* Decorative blue box - mobile top-left of card */}
              {isMobile && (
                <div className="absolute -top-[16px] left-[16px] w-[28px] h-[28px] rounded-[8px] bg-[#3B82F6] z-[3] drop-shadow-[0_4px_6px_rgba(59,130,246,0.35)]" />
              )}

              {/* Paragraphs with stagger */}
              <motion.div
                variants={paragraphContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {paragraphs.length > 1 ? (
                  paragraphs.map((para, idx) => (
                    <motion.p
                      key={idx}
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