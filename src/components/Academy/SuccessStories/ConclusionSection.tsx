import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { splitIntoParagraphs } from '../../../utils/textParsing';


interface SectionData {
  title: string;
  content: string;
}

interface ConclusionSectionProps {
  section: SectionData;
}

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};


// Stagger container for the whole row
const rowContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

// Stagger container for paragraphs inside the card
const paragraphContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
};

const paragraphItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─────────────────────────────────────────────────────────────────────────────

const ConclusionSection: React.FC<ConclusionSectionProps> = ({ section }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1024px)');
  const [imgError, setImgError] = useState(false);

  // Use utility function to split content into paragraphs
  const paragraphs: string[] = splitIntoParagraphs(section.content);

  return (
    <section className="w-screen bg-white py-[60px] -mt-[50px] -mb-[50px] -ml-[calc(50vw-50%)]">
      <div className="max-w-[1100px] mx-auto px-6">

        {/* ── Title fade-up ─────────────────────────────────────── */}
        <motion.h2
          className={`text-center font-bold text-gray-900 ${
            isMobile ? 'text-3xl mb-4' : 'text-5xl mb-[60px]'
          }`}
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
          <motion.div 
            className={`relative flex items-end justify-center ${
              isMobile 
                ? 'flex-[0_0_100%] h-[220px] pb-[10px]' 
                : isTablet 
                ? 'flex-[0_0_100%] h-[320px] pb-5' 
                : 'flex-[0_0_480px] h-[320px] pb-5'
            }`}
            variants={fadeIn}
          >

            {/* Decorative blue box - bottom left of image */}
            {!isMobile && (
              <div 
                className="absolute bottom-[-30px] w-[45px] h-[45px] rounded-xl bg-blue-500 z-[2]"
                style={{
                  left: isTablet ? 'calc(50% - 195px)' : '28px',
                  filter: 'drop-shadow(0 8px 10px rgba(79, 62, 236, 0.25))',
                }}
              />
            )}

            {/* Blob */}
            <div 
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 rounded-[215px] bg-[#e0eeff] z-0 ${
                isMobile 
                  ? 'w-[260px] h-[210px]' 
                  : isTablet 
                  ? 'w-[420px] h-[320px]' 
                  : 'w-[450px] h-[350px]'
              }`}
            />

            {/* Illustration */}
            <div className="relative z-[1] flex justify-center items-center w-full h-full">
              {!imgError ? (
                <motion.img
                  src="/conclusion-illustration.png"
                  alt="Conclusion illustration"
                  className={`w-full relative z-[1] object-contain ${
                    isMobile 
                      ? 'max-w-[240px] h-[200px] mt-[25px]' 
                      : isTablet 
                      ? 'max-w-[360px] h-[300px] mt-[30px]' 
                      : 'max-w-[400px] h-[320px] mt-[5px]'
                  }`}
                  style={{ filter: 'drop-shadow(0 10px 6px rgba(0, 0, 0, 0.3))' }}
                  variants={scaleIn}
                  onError={() => {
                    // Image load failed - fallback to placeholder
                    setImgError(true);
                  }}
                />
              ) : (
                <div 
                  className={`w-full relative z-[1] bg-gray-100 flex items-center justify-center text-gray-500 text-sm text-center p-5 rounded-xl ${
                    isMobile 
                      ? 'max-w-[240px] h-[200px] mt-[25px]' 
                      : isTablet 
                      ? 'max-w-[360px] h-[300px] mt-[30px]' 
                      : 'max-w-[400px] h-[320px] mt-[5px]'
                  }`}
                >
                  Conclusion Illustration
                </div>
              )}
            </div>
          </motion.div>

          {/* ── Right column / card ───────────────────────────────── */}
          <motion.div className="flex-1 min-w-[300px]" variants={fadeUp}>
            <motion.div
              className={`bg-white rounded-xl shadow-[8px_8px_20px_rgba(0,0,0,0.12)] border border-[#e8ecf3] relative ${
                isMobile ? 'px-5 py-[18px]' : 'px-9 py-8 min-h-[280px]'
              }`}
              variants={scaleIn}
            >
              {/* Decorative blue box - mobile top-left of card */}
              {isMobile && (
                <div className="absolute top-[-16px] left-4 w-7 h-7 rounded-lg bg-blue-500 z-[3]"
                  style={{ filter: 'drop-shadow(0 4px 6px rgba(59, 130, 246, 0.35))' }}
                />
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
                      key={`para-${idx}-${para.slice(0, 20)}`}
                      className={`text-gray-800 text-justify ${
                        isMobile ? 'text-[0.72rem] leading-[1.4] mb-2' : 'text-base leading-normal mb-4'
                      }`}
                      variants={paragraphItem}
                    >
                      {para.trim()}
                    </motion.p>
                  ))
                ) : (
                  <motion.p 
                    className={`text-gray-800 text-justify ${
                      isMobile ? 'text-[0.72rem] leading-[1.4] mb-2' : 'text-base leading-normal mb-4'
                    }`}
                    variants={paragraphItem}
                  >
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
