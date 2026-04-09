


import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from "lucide-react";

interface SectionData {
  title: string;
  content: string;
}

interface ConclusionSectionProps {
  section: SectionData;
}

const styles: Record<string, React.CSSProperties> = {
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

const IMAGE_URL =
  'https://img.freepik.com/premium-vector/people-working-office-vector-illustration_1253044-12102.jpg?semt=ais_hybrid&w=740&q=80';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: 'easeOut' },
  },
};

const ConclusionSection: React.FC<ConclusionSectionProps> = ({ section }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
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

  // ✅ wrapperStyle inside component so isMobile/isTablet state works correctly
  const wrapperStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    padding: '120px 0 140px 0',
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
    marginBottom: '-20px',
    ...(isDesktop && {
  marginTop: '-100px',
}),
    ...(isMobile && {
      paddingTop: '10px',
      paddingBottom: '45px',
      marginTop: '-55px',
    }),
    ...(isTablet && {
      paddingTop: '10px',
    }),

  };

  const paragraphs: string[] = section.content
    .split(/(?<=\.)\s+(?=[A-Z])/)
    .reduce((acc: string[], sentence: string, i: number, arr: string[]) => {
      if (i % 2 === 0) {
        const combined = arr[i + 1] ? sentence + ' ' + arr[i + 1] : sentence;
        acc.push(combined);
      }
      return acc;
    }, []);

  const leftColStyle: React.CSSProperties = isTablet
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
    width: isTablet ? '420px' : '450px',
    height: isTablet ? '320px' : '350px',
    borderRadius: '215px',
    backgroundColor: '#e0eeff',
    zIndex: 0,
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: isTablet ? '360px' : '400px',
    height: isTablet ? '300px' : '330px',
    objectFit: 'contain',
    position: 'relative',
    zIndex: 1,
    marginTop: '40px',
    filter: 'drop-shadow(0 10px 6px rgba(0, 0, 0, 0.1))',
  };

  const titleStyle: React.CSSProperties = {
    textAlign: 'center',
    fontSize: isMobile ? '1.875rem' : '2.5rem',
    fontWeight: 700,
    color: '#111',
    marginBottom: isMobile ? '40px' : '80px',
    marginTop: isMobile ? '20px' : '40px',
  };

  const paragraphStyle: React.CSSProperties = {
    fontSize: isMobile ? '0.72rem' : '0.9rem',
    lineHeight: isMobile ? '1.6' : '1.5',
    color: '#333',
    marginBottom: isMobile ? '10px' : '16px',
    textAlign: 'justify' as const,
    wordSpacing: isMobile ? '-1.8px' : 'normal',
  };


  if (isMobile) {
  return (
    <section style={wrapperStyle}>
      <div style={styles.inner}>

        <motion.h2
          style={titleStyle}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {section.title}
        </motion.h2>

        <motion.div
          style={{ ...styles.textCard, padding: '0px', overflow: 'visible' }}
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '220px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              overflow: 'hidden',
              borderRadius: '12px 12px 0 0',
            }}
          >
            <div
              style={{
                position: 'absolute',
                bottom: '0px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '260px',
                height: '210px',
                borderRadius: '215px',
                backgroundColor: '#e0eeff',
                zIndex: 0,
              }}
            />

            <motion.img
              src={IMAGE_URL}
              alt="Conclusion illustration"
              style={{
                width: '100%',
                maxWidth: '240px',
                height: '200px',
                objectFit: 'contain',
                position: 'relative',
                zIndex: 1,
                marginTop: '20px',
              }}
              variants={scaleIn}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>

          <div style={{ padding: '18px 20px', position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                top: '-16px',
                left: '16px',
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                backgroundColor: '#3B82F6',
                zIndex: 3,
                filter: 'drop-shadow(0 4px 6px rgba(59, 130, 246, 0.35))',
              }}
            />

            {paragraphs.length > 1 ? (
              paragraphs.map((para, idx) => (
                <p key={idx} style={paragraphStyle}>
                  {para.trim()}
                </p>
              ))
            ) : (
              <p style={paragraphStyle}>{section.content}</p>
            )}

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px', paddingBottom: '4px' }}>
              <button className="bg-[#5BA4CF] hover:bg-[#4A93BE] text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-1 text-xs">
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
    <section style={wrapperStyle}>
      <div style={styles.inner}>

        <motion.h2
          style={titleStyle}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {section.title}
        </motion.h2>

        <div style={styles.contentRow}>

          <motion.div
            style={leftColStyle}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* ✅ Blue decorative box - bottom left of image */}
            <div style={{
              position: 'absolute',
              bottom: '-55px',
              left: '22px',
              width: '45px',
              height: '45px',
              borderRadius: '12px',
              backgroundColor: '#3B82F6',
              zIndex: 2,
              filter: 'drop-shadow(0 8px 10px rgba(79, 62, 236, 0.25))',
              ...(isTablet && {
      bottom: '-38px',
              left: 'calc(50% - 195px)',
    }),
            }} />

            <div style={blueShapeStyle} />
            <div style={styles.illustrationWrapper}>
              <motion.img
                src={IMAGE_URL}
                alt="Conclusion illustration"
                style={imageStyle}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          </motion.div>

          <motion.div
            style={styles.rightCol}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Card with button inside */}
            <div style={{ ...styles.textCard, padding: '32px 36px', minHeight: '280px' }}>
              {paragraphs.length > 1 ? (
                paragraphs.map((para, idx) => (
                  <p key={idx} style={paragraphStyle}>
                    {para.trim()}
                  </p>
                ))
              ) : (
                <p style={paragraphStyle}>{section.content}</p>
              )}

              {/* ── Download button inside card (desktop/tablet) ── */}
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '24px' }}>
                <button className="bg-[#5BA4CF] hover:bg-[#4A93BE] text-white text-xs font-medium px-3 py-3 rounded-lg transition-colors duration-200 flex items-center gap-1">
                  Download case study <ArrowRight size={16} />
                </button>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ConclusionSection;