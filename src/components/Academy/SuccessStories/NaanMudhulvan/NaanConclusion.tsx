
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from "lucide-react";

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

function ConclusionSection({ section }: ConclusionSectionProps): JSX.Element {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

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
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setIsTablet(w >= 768 && w < 1280);
      setIsDesktop(w >= 1280);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);


  if (isMobile) {
  return (
    <section className={`bg-white w-screen breakout pt-2.5 pb-16 -mt-14 mb-16`}>
      <div className="max-w-conclusion-container mx-auto px-6">

        <motion.h2
          className={`text-center font-bold text-gray-900 mb-10 mt-5 ${
            isMobile ? 'text-3xl' : 'text-4xl'
          }`}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {section.title}
        </motion.h2>

        <motion.div
          className="bg-white rounded-xl shadow-conclusion-card border border-gray-200 p-0 overflow-visible"
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="relative w-full h-48 flex items-end justify-center overflow-hidden rounded-t-xl">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-40 rounded-blue-shape bg-blue-conclusion-bg z-0" />

            {imageUrl && (
              <motion.img
                src={imageUrl}
                alt="Conclusion illustration"
                className="w-full max-w-44 h-36 object-contain relative z-10 mt-3"
                variants={scaleIn}
                onError={(e) => {
                  // Hide image if it fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            )}
          </div>

          <div className="p-4 px-5 relative pt-6">
            <div className="absolute -top-2 left-4 w-6 h-6 rounded-lg bg-blue-600 z-30 drop-shadow-[0_4px_6px_rgba(59,130,246,0.35)]" />

            <p className={`text-gray-900 mb-2.5 text-justify ${
              isMobile ? 'text-sm leading-relaxed' : 'text-sm leading-normal'
            }`}>
              {section.content}
            </p>

            <div className="flex justify-center mt-4 pb-1">
              <button className="bg-blue-conclusion-btn hover:bg-blue-conclusion-btn-hover text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-1 text-xs">
                Download case study <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
  // ── Desktop / Tablet layout ──
  return (
    <section className={`bg-white w-screen breakout mb-16 ${
      isDesktop ? 'pt-30 pb-35 -mt-25' : 'pt-2.5 pb-35'
    }`}>
      <div className="max-w-conclusion-container mx-auto px-6">

        <motion.h2
          className={`text-center font-bold text-gray-900 mb-20 mt-10 ${
            isMobile ? 'text-3xl' : 'text-4xl'
          }`}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {section.title}
        </motion.h2>

        <div className="flex gap-10 items-center flex-wrap">

          <motion.div
            className={`relative h-80 flex items-end justify-center pb-5 ${
              isTablet 
                ? 'flex-[0_0_100%]' 
                : 'flex-[0_0_480px]'
            }`}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* ✅ Blue decorative box - bottom left of image */}
            <div className={`absolute w-11 h-11 rounded-xl bg-blue-600 z-20 drop-shadow-[0_8px_10px_rgba(79,62,236,0.25)] ${
              isTablet 
                ? 'bottom-[-38px] left-[calc(50%-195px)]'
                : 'bottom-[-55px] left-[22px]'
            }`} />

            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 rounded-blue-shape bg-blue-conclusion-bg z-0 ${
              isTablet 
                ? 'w-conclusion-shape-sm h-conclusion-shape-h-sm'
                : 'w-conclusion-shape-lg h-conclusion-shape-h-lg'
            }`} />
            
            <div className="relative z-10 flex justify-center items-center w-full h-full">
              {imageUrl && (
                <motion.img
                  src={imageUrl}
                  alt="Conclusion illustration"
                  className={`w-full object-contain relative z-10 mt-10 drop-shadow-[0_10px_6px_rgba(0,0,0,0.1)] ${
                    isTablet 
                      ? 'max-w-conclusion-img-sm h-conclusion-img-h-sm'
                      : 'max-w-conclusion-img-lg h-conclusion-img-h-lg'
                  }`}
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  onError={(e) => {
                    // Hide image if it fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              )}
            </div>
          </motion.div>

          <motion.div
            className="flex-1 min-w-[300px]"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Card with button inside */}
            <div className="bg-white rounded-xl shadow-conclusion-card border border-gray-200 p-8 px-9 min-h-[280px]">
             <p className={`text-gray-700 mb-4 text-justify font-normal ${
               isMobile ? 'text-sm leading-relaxed' : 'text-sm leading-normal'
             }`}>
               {section.content}
             </p>

              {/* ── Download button inside card (desktop/tablet) ── */}
              <div className="flex justify-start mt-6">
                <button className="bg-blue-conclusion-btn hover:bg-blue-conclusion-btn-hover text-white text-xs font-medium px-3 py-3 rounded-lg transition-colors duration-200 flex items-center gap-1">
                  Download case study <ArrowRight size={16} />
                </button>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default ConclusionSection;