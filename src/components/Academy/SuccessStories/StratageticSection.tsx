import React from "react";
import { motion } from "framer-motion";
import {
  BriefcaseIcon,
  LightBulbIcon,
  UsersIcon,
  CheckCircleIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const icons = [BriefcaseIcon, LightBulbIcon, UsersIcon, CheckCircleIcon, StarIcon];

interface StrategicItem {
  title: string;
  description: string;
}

interface StrategicAlignmentSectionProps {
  section: {
    title: string;
    content: StrategicItem[];
  };
}

// ── Animation Variants ────────────────────────────────────────────────────

const wrapperVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const titleVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const, delay: 0.2 } },
};

const verticalLineVariant = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 1.2, ease: "easeOut" as const, delay: 0.4 } },
};

const slideLeftVariant = {
  hidden: { opacity: 0, x: -100 },
  visible: (delay: number) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.8, ease: "easeOut" as const, delay },
  }),
};

const slideRightVariant = {
  hidden: { opacity: 0, x: 100 },
  visible: (delay: number) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.8, ease: "easeOut" as const, delay },
  }),
};

const scaleInVariant = {
  hidden: { scale: 0 },
  visible: (delay: number) => ({
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const, delay },
  }),
};

const scaleXVariant = {
  hidden: { scaleX: 0 },
  visible: (delay: number) => ({
    scaleX: 1,
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  }),
};

const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const, delay },
  }),
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const, delay },
  }),
};

// ─────────────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    background: "#ffffff",
    padding: "48px 32px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    marginBottom: "48px",
    marginTop: "48px",
    width: "100vw",
    marginLeft: "calc(-50vw + 50%)",
  },
  sectionTitle: {
    fontWeight: 900,
    color: "#0f1c2e",
    textAlign: "center",
    marginBottom: "52px",
    letterSpacing: "-0.3px",
  },
  timeline: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "28px",
    width: "100%",
    maxWidth: "780px",
    margin: "0 auto",
  },
  verticalLine: {
    position: "absolute",
    left: "15px",
    top: 0,
    bottom: 0,
    width: "12px",
    background: "#D2E8FE",
    borderTopLeftRadius: "6px",
    borderTopRightRadius: "6px",
    zIndex: 0,
    transformOrigin: "top",
  },
  iconWrap: {
    position: "relative",
    zIndex: 1,
    flexShrink: 0,
    borderRadius: "50%",
    background: "#ffffff",
    border: "2px solid #DBEAFE",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px rgba(90,160,220,0.15)",
    marginLeft: "16px",
    marginTop: "-50px",
  },
  innerCircle: {
    position: "absolute",
    borderRadius: "50%",
    background: "#F0F8FF",
    zIndex: -1,
  },
  connector: {
    flexShrink: 0,
    height: "2px",
    background: "#DBEAFE",
    marginTop: "-50px",
    marginLeft: "2px",
    transformOrigin: "left",
  },
  cardAccent: {
    height: "3px",
    borderRadius: "2px",
    background: "#3b82f6",
    marginBottom: "10px",
    transformOrigin: "left",
  },
};

const StrategicAlignmentSection: React.FC<StrategicAlignmentSectionProps> = ({ section }) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const iconStyle: React.CSSProperties = {
    width: isMobile ? "14px" : "20px",
    height: isMobile ? "14px" : "20px",
    color: "#5BA8D8",
    strokeWidth: 1.6,
    position: "relative",
    zIndex: 2,
  };

  const iconWrapStyle: React.CSSProperties = {
    ...styles.iconWrap,
    width: isMobile ? "28px" : "40px",
    height: isMobile ? "28px" : "40px",
  };

  const innerCircleStyle: React.CSSProperties = {
    ...styles.innerCircle,
    width: isMobile ? "20px" : "28px",
    height: isMobile ? "20px" : "28px",
  };

  const connectorStyle: React.CSSProperties = {
    ...styles.connector,
    width: isMobile ? "10px" : "24px",
  };

  const cardAccentStyle: React.CSSProperties = {
    ...styles.cardAccent,
    width: isMobile ? "20px" : "32px",
  };

  const cardTitleStyle: React.CSSProperties = {
    fontSize: isMobile ? "0.82rem" : "1.05rem",
    fontWeight: 700,
    color: "#0f1c2e",
    marginBottom: "4px",
  };

  const cardTextStyle: React.CSSProperties = {
    fontSize: isMobile ? "0.75rem" : "0.92rem",
    color: "#5a6a7e",
    lineHeight: 1.55,
    margin: 0,
  };

  const getCardStyle = (index: number): React.CSSProperties => ({
    flex: 1,
    borderRadius: "14px",
    padding: isMobile ? "10px 14px" : "22px 28px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    border: `1px solid ${index % 2 === 0 ? "rgba(72,187,120,0.25)" : "rgba(72,187,120,0.1)"}`,
    background: index % 2 === 0 ? "#F5F9FF" : "#F2FFF9",
    position: "relative" as const,
    overflow: "hidden",
    cursor: "pointer",
  });

  return (
    <motion.div
      variants={wrapperVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={styles.wrapper}
    >
      <motion.h2
        variants={titleVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ ...styles.sectionTitle, fontSize: isMobile ? "1.875rem" : "2.9rem" }}
      >
        {section.title}
      </motion.h2>

      <div style={styles.timeline}>
        <motion.div
          variants={verticalLineVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={styles.verticalLine}
        />

        {section.content.map((item, index) => {
          const IconComponent = icons[index % icons.length];
          const baseDelay = index * 0.15;
          const rowVariant = index % 2 === 0 ? slideLeftVariant : slideRightVariant;

          return (
            <motion.div
              key={index}
              variants={rowVariant}
              initial="hidden"
              whileInView="visible"
              custom={baseDelay}
              viewport={{ once: true }}
              style={{ display: "flex", alignItems: "center", gap: 0, position: "relative" }}
            >
              <motion.div
                variants={scaleInVariant}
                initial="hidden"
                whileInView="visible"
                custom={baseDelay + 0.3}
                viewport={{ once: true }}
                style={iconWrapStyle}
              >
                <div style={innerCircleStyle} />
                <IconComponent style={iconStyle} />
              </motion.div>

              <motion.div
                variants={scaleXVariant}
                initial="hidden"
                whileInView="visible"
                custom={baseDelay + 0.5}
                viewport={{ once: true }}
                style={connectorStyle}
              />

              <motion.div
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                custom={baseDelay + 0.2}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(0,0,0,0.12)", transition: { duration: 0.2 } }}
                style={getCardStyle(index)}
              >
                <motion.div
                  variants={scaleXVariant}
                  initial="hidden"
                  whileInView="visible"
                  custom={baseDelay + 0.4}
                  viewport={{ once: true }}
                  style={cardAccentStyle}
                />
                <motion.h3
                  variants={fadeInVariant}
                  initial="hidden"
                  whileInView="visible"
                  custom={baseDelay + 0.6}
                  viewport={{ once: true }}
                  style={cardTitleStyle}
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  variants={fadeInVariant}
                  initial="hidden"
                  whileInView="visible"
                  custom={baseDelay + 0.7}
                  viewport={{ once: true }}
                  style={cardTextStyle}
                >
                  {item.description}
                </motion.p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default StrategicAlignmentSection;
