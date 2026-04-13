

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';


interface SectionData {
  title: string;
  content: string;
}

interface ConclusionSectionProps {
  section: SectionData;
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    backgroundColor: '#ffffff',
    padding: '60px 0',
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
    marginTop: '-50px',
    marginBottom: '-50px',
  },
  inner: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 24px',
  },
  contentRow: {
    display: 'flex',
    gap: '40px',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
  },
  illustrationWrapper: {
    position: 'relative' as const,
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  rightCol: {
    flex: 1,
    minWidth: '300px',
  },
  textCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '8px 8px 20px rgba(0,0,0,0.12)',
    border: '1px solid #e8ecf3',
  },
};

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
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [imgError, setImgError] = useState(false);

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

  const paragraphs: string[] = section.content
    .replace(/\.\s+(?=[A-Z])/g, '.|||').split('|||').filter(Boolean)
    .reduce((acc: string[], sentence: string, i: number, arr: string[]) => {
      if (i % 2 === 0) {
        const combined = arr[i + 1] ? sentence + ' ' + arr[i + 1] : sentence;
        acc.push(combined);
      }
      return acc;
    }, []);

  // ── Responsive Styles ──────────────────────────────────────────────────────

  const leftColStyle: React.CSSProperties = isMobile
    ? {
        flex: '0 0 100%',
        position: 'relative',
        height: '220px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: '10px',
      }
    : isTablet
    ? {
        flex: '0 0 100%',
        position: 'relative',
        height: '320px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: '20px',
      }
    : {
        flex: '0 0 480px',
        position: 'relative',
        height: '320px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: '20px',
      };

  const blueShapeStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '0px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: isMobile ? '260px' : isTablet ? '420px' : '450px',
    height: isMobile ? '210px' : isTablet ? '320px' : '350px',
    borderRadius: '215px',
    backgroundColor: '#e0eeff',
    zIndex: 0,
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: isMobile ? '240px' : isTablet ? '360px' : '400px',
    height: isMobile ? '200px' : isTablet ? '300px' : '320px',
    objectFit: 'contain',
    position: 'relative',
    zIndex: 1,
    marginTop:  isMobile ? '25px' : isTablet ? '30px' : '5px',
    filter: 'drop-shadow(0 10px 6px rgba(0, 0, 0, 0.3))',
  };

  const titleStyle: React.CSSProperties = {
    textAlign: 'center',
    fontSize: isMobile ? '1.875rem' : '3rem',
    fontWeight: 700,
    color: '#111',
    marginBottom: isMobile ? '16px' : '60px',
  };

  const textCardStyle: React.CSSProperties = {
    ...styles.textCard,
    padding: isMobile ? '18px 20px' : '32px 36px',
    minHeight: isMobile ? 'unset' : '280px',
    position: 'relative',
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: isMobile ? '0.85rem' : '1.2rem',
    fontWeight: 700,
    color: '#111',
    marginBottom: isMobile ? '8px' : '14px',
  };

  const paragraphStyle: React.CSSProperties = {
    fontSize: isMobile ? '0.72rem' : '1rem',
    lineHeight: isMobile ? '1.4' : '1.5',
    color: '#333',
    marginBottom: isMobile ? '8px' : '16px',
    textAlign: 'justify' as const,
  };

  return (
    <section style={styles.wrapper}>
      <div style={styles.inner}>

        {/* ── Title fade-up ─────────────────────────────────────── */}
        <motion.h2
          style={titleStyle}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {section.title}
        </motion.h2>

        {/* ── Row stagger container ─────────────────────────────── */}
        <motion.div
          style={styles.contentRow}
          variants={rowContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >

          {/* ── Left column ───────────────────────────────────────── */}
          <motion.div style={leftColStyle} variants={fadeIn}>

            {/* Decorative blue box - bottom left of image */}
            {!isMobile && (
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                left: isTablet ? 'calc(50% - 195px)' : '28px',
                width: '45px',
                height: '45px',
                borderRadius: '12px',
                backgroundColor: '#3B82F6',
                zIndex: 2,
                filter: 'drop-shadow(0 8px 10px rgba(79, 62, 236, 0.25))',
              }} />
            )}

            {/* Blob */}
            <div style={blueShapeStyle} />

            {/* Illustration */}
            <div style={styles.illustrationWrapper}>
              {!imgError ? (
                <motion.img
                  src="/conclusion-illustration.png"
                  alt="Conclusion illustration"
                  style={imageStyle}
                  variants={scaleIn}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div style={{
                  ...imageStyle,
                  backgroundColor: '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6b7280',
                  fontSize: '14px',
                  textAlign: 'center' as const,
                  padding: '20px',
                  borderRadius: '12px',
                }}>
                  Conclusion Illustration
                </div>
              )}
            </div>
          </motion.div>

          {/* ── Right column / card ───────────────────────────────── */}
          <motion.div style={styles.rightCol} variants={fadeUp}>
            <motion.div
              style={textCardStyle}
              variants={scaleIn}
            >
              {/* Decorative blue box - mobile top-left of card */}
              {isMobile && (
                <div style={{
                  position: 'absolute',
                  top: '-16px',
                  left: '16px',
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  backgroundColor: '#3B82F6',
                  zIndex: 3,
                  filter: 'drop-shadow(0 4px 6px rgba(59, 130, 246, 0.35))',
                }} />
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
                      style={paragraphStyle}
                      variants={paragraphItem}
                    >
                      {para.trim()}
                    </motion.p>
                  ))
                ) : (
                  <motion.p style={paragraphStyle} variants={paragraphItem}>
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