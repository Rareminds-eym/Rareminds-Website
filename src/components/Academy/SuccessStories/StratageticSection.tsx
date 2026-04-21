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

const StrategicAlignmentSection: React.FC<StrategicAlignmentSectionProps> = ({ section }) => {

  // Convert all styles to Tailwind utility functions
  const getWrapperClasses = () => 
    "bg-white py-[48px] px-[32px] shadow-[0_2px_12px_rgba(0,0,0,0.05)] mb-[48px] mt-[48px] w-screen -ml-[calc(50vw-50%)]";

  const getSectionTitleClasses = () => 
    "font-black text-[#0f1c2e] text-center mb-[52px] tracking-[-0.3px]";

  const getTimelineClasses = () => 
    "relative flex flex-col gap-[28px] w-full max-w-[780px] mx-auto";

  const getVerticalLineClasses = () => 
    "absolute left-[15px] top-0 bottom-0 w-[12px] bg-[#D2E8FE] rounded-t-[6px] z-0 origin-top";

  const getIconClasses = () => 
    "text-[#5BA8D8] relative z-[2] w-[14px] h-[14px] md:w-[20px] md:h-[20px] stroke-[1.6]";

  const getIconWrapClasses = () => 
    "relative z-[1] flex-shrink-0 rounded-full bg-white border-2 border-[#DBEAFE] flex items-center justify-center shadow-[0_2px_8px_rgba(90,160,220,0.15)] ml-[16px] -mt-[50px] w-[28px] h-[28px] md:w-[40px] md:h-[40px]";

  const getInnerCircleClasses = () => 
    "absolute rounded-full bg-[#F0F8FF] -z-[1] w-[20px] h-[20px] md:w-[28px] md:h-[28px]";

  const getConnectorClasses = () => 
    "flex-shrink-0 h-[2px] bg-[#DBEAFE] -mt-[50px] ml-[2px] origin-left w-[10px] md:w-[24px]";

  const getCardAccentClasses = () => 
    "h-[3px] rounded-[2px] bg-[#3b82f6] mb-[10px] origin-left w-[20px] md:w-[32px]";

  const getCardTitleClasses = () => 
    "font-bold text-[#0f1c2e] mb-[4px] text-[0.82rem] md:text-[1.05rem]";

  const getCardTextClasses = () => 
    "text-[#5a6a7e] leading-[1.55] m-0 text-[0.75rem] md:text-[0.92rem]";

  const getCardClasses = (index: number) => {
    const basePadding = "p-[10px_14px] md:p-[22px_28px]";
    const baseClasses = `flex-1 rounded-[14px] ${basePadding} shadow-[0_2px_10px_rgba(0,0,0,0.05)] relative overflow-hidden cursor-pointer`;
    
    if (index % 2 === 0) {
      return `${baseClasses} border border-[rgba(72,187,120,0.25)] bg-[#F5F9FF]`;
    } else {
      return `${baseClasses} border border-[rgba(72,187,120,0.1)] bg-[#F2FFF9]`;
    }
  };

  const getTitleFontSize = () => "text-[1.875rem] md:text-[2.9rem]";

  return (
    <motion.div
      variants={wrapperVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={getWrapperClasses()}
    >
      <motion.h2
        variants={titleVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={`${getSectionTitleClasses()} ${getTitleFontSize()}`}
      >
        {section.title}
      </motion.h2>

      <div className={getTimelineClasses()}>
        <motion.div
          variants={verticalLineVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={getVerticalLineClasses()}
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
              className="flex items-center gap-0 relative"
            >
              <motion.div
                variants={scaleInVariant}
                initial="hidden"
                whileInView="visible"
                custom={baseDelay + 0.3}
                viewport={{ once: true }}
                className={getIconWrapClasses()}
              >
                <div className={getInnerCircleClasses()} />
                <IconComponent className={getIconClasses()} />
              </motion.div>

              <motion.div
                variants={scaleXVariant}
                initial="hidden"
                whileInView="visible"
                custom={baseDelay + 0.5}
                viewport={{ once: true }}
                className={getConnectorClasses()}
              />

              <motion.div
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                custom={baseDelay + 0.2}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(0,0,0,0.12)", transition: { duration: 0.2 } }}
                className={getCardClasses(index)}
              >
                <motion.div
                  variants={scaleXVariant}
                  initial="hidden"
                  whileInView="visible"
                  custom={baseDelay + 0.4}
                  viewport={{ once: true }}
                  className={getCardAccentClasses()}
                />
                <motion.h3
                  variants={fadeInVariant}
                  initial="hidden"
                  whileInView="visible"
                  custom={baseDelay + 0.6}
                  viewport={{ once: true }}
                  className={getCardTitleClasses()}
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  variants={fadeInVariant}
                  initial="hidden"
                  whileInView="visible"
                  custom={baseDelay + 0.7}
                  viewport={{ once: true }}
                  className={getCardTextClasses()}
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
