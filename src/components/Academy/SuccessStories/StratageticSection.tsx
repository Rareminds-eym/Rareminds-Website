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
  id: string; 
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

const StrategicAlignmentSection = ({ section }: StrategicAlignmentSectionProps): JSX.Element => {

  // Convert all styles to Tailwind utility functions
  const getWrapperClasses = () => 
    "bg-white py-12 px-8 shadow-lg mb-12 mt-12 w-screen -ml-breakout";

  const getSectionTitleClasses = () => 
    "font-black text-gray-800 text-center mb-12 tracking-tight text-2xl md:text-3xl";

  const getTimelineClasses = () => 
    "relative flex flex-col gap-7 w-full max-w-3xl mx-auto";

  const getVerticalLineClasses = () => 
    "absolute left-4 top-0 bottom-0 w-3 bg-blue-200 rounded-t-md z-0 origin-top";

  const getIconClasses = () => 
    "text-blue-500 relative z-10 w-4 h-4 md:w-5 md:h-5 stroke-2";

  const getIconWrapClasses = () => 
    "relative z-10 flex-shrink-0 rounded-full bg-white border-2 border-blue-300 flex items-center justify-center shadow-lg ml-4 -mt-12 w-7 h-7 md:w-10 md:h-10";

  const getInnerCircleClasses = () => 
    "absolute rounded-full bg-blue-100 -z-10 w-5 h-5 md:w-7 md:h-7";

  const getConnectorClasses = () => 
    "flex-shrink-0 h-px bg-blue-300 -mt-12 ml-1 origin-left w-3 md:w-6";

  const getCardAccentClasses = () => 
    "h-px rounded-sm bg-blue-500 mb-3 origin-left w-5 md:w-8";

  const getCardTitleClasses = () => 
    "font-bold text-gray-800 mb-1 text-xs md:text-lg";

  const getCardTextClasses = () => 
    "text-gray-600 leading-relaxed m-0 text-xs md:text-sm";

  const getCardClasses = (index: number) => {
    const basePadding = "py-3 px-4 md:py-6 md:px-7";
    const baseClasses = `flex-1 rounded-xl ${basePadding} shadow-md relative overflow-hidden cursor-pointer min-h-24 md:min-h-32`;
    
    if (index % 2 === 0) {
      return `${baseClasses} border border-green-200 bg-green-50`;
    } else {
      return `${baseClasses} border border-green-100 bg-green-50`;
    }
  };

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
        className={getSectionTitleClasses()}
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
              key={item.id}
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
