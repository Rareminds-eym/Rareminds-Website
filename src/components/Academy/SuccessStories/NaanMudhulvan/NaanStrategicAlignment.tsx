

// import React from "react";
// import { Briefcase, Users, Lightbulb, GraduationCap } from "lucide-react";

// const TEAL = "#3BA3C7";

// interface ContentItem {
//   title: string;
//   description: string;
// }

// interface StrategicAlignmentSection {
//   title: string;
//   description: string;
//   content: ContentItem[];
// }

// interface NaanStrategicAlignmentProps {
//   strategicAlignmentSection: StrategicAlignmentSection;
// }

// interface CardProps {
//   title: string;
//   description: string;
// }

// const CARD_WIDTH = 260;   // ← reduced
// const CARD_HEIGHT = 180;  // ← reduced

// const Card: React.FC<CardProps> = ({ title, description }) => (
//   <div
//     className="bg-white rounded-xl flex flex-col"
//     style={{
//       width: CARD_WIDTH,
//       height: CARD_HEIGHT,
//       border: `1.5px solid ${TEAL}`,
//       padding: "18px 18px",
//       flexShrink: 0,
//     }}
//   >
//     <h3
//       className="font-bold text-center text-gray-900 mb-3"
//       style={{ fontSize: 16, lineHeight: 1.4, whiteSpace: "pre-line" }}
//     >
//       {title}
//     </h3>
//     <p className="text-gray-700" style={{ fontSize: 14, lineHeight: 1.6 }}>
//       {description}
//     </p>
//   </div>
// );

// const IconCircle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
//   <div
//     className="flex items-center justify-center rounded-full"
//     style={{
//       width: 44,
//       height: 44,
//       background: "#E0F2FE",
//       boxShadow: "0 0 0 4px white",
//       color: TEAL,
//       flexShrink: 0,
//       position: "relative",
//       zIndex: 10,
//     }}
//   >
//     {children}
//   </div>
// );

// const VLine: React.FC<{ height?: number }> = ({ height = 60 }) => (
//   <div style={{ width: 3, height, background: TEAL, flexShrink: 0 }} />
// );

// const ICONS = [
//   <Briefcase size={18} strokeWidth={1.8} />,
//   <Users size={18} strokeWidth={1.8} />,
//   <Lightbulb size={18} strokeWidth={1.8} />,
//   <GraduationCap size={18} strokeWidth={1.8} />,
// ];

// const LINE_Y = 280;   // ← slightly reduced too since cards are shorter
// const ICON_R = 22;    // half of 44px icon circle

// const NaanStrategicAlignment: React.FC<NaanStrategicAlignmentProps> = ({
//   strategicAlignmentSection,
// }) => {
//   const { title, description, content } = strategicAlignmentSection;

//   const topCards = content.slice(0, 2);
//   const bottomCards = content.slice(2, 4);

//   const topPositions = [0, 470];
//   const bottomPositions = [230, 650];

//   // VLine for top cards: from bottom of card to top of icon circle (which sits ON the line)
//   const topVLineHeight = LINE_Y - CARD_HEIGHT - ICON_R;

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center py-10 px-4">
//       <div className="flex flex-col items-center w-full" style={{ maxWidth: 1000 }}>
//         <h1
//           className="font-bold text-gray-900 mb-3 text-center"
//           style={{ fontSize: 36 }}
//         >
//           {title}
//         </h1>

//         <p className="text-gray-700 text-center mb-14 text-base">
//           {description}
//         </p>

//         <div className="relative" style={{ width: 930, height: 520 }}>

//           {/* HORIZONTAL LINE */}
//           <div
//             className="absolute"
//             style={{
//               top: LINE_Y,
//               left: 0,
//               right: 0,
//               height: 4,
//               background: TEAL,
//               zIndex: 1,
//             }}
//           />

//           {/* Left dot */}
//           <div className="absolute rounded-full" style={{ width: 16, height: 16, background: TEAL, top: LINE_Y - 7, left: -8, zIndex: 5 }} />

//           {/* Right dot */}
//           <div className="absolute rounded-full" style={{ width: 16, height: 16, background: TEAL, top: LINE_Y - 7, right: -8, zIndex: 5 }} />

//           {/* TOP CARDS */}
//           {topCards.map((card, i) => (
//             <div
//               key={i}
//               className="absolute flex flex-col items-center"
//               style={{ left: topPositions[i], top: 0 }}
//             >
//               <Card title={card.title} description={card.description} />
//               <VLine height={topVLineHeight} />
//               <div style={{ marginTop: "-27px" }}>
//                 <IconCircle>{ICONS[i]}</IconCircle>
//               </div>
//             </div>
//           ))}

//           {/* BOTTOM CARDS */}
//           {bottomCards.map((card, i) => (
//             <div
//               key={i + 2}
//               className="absolute flex flex-col items-center"
//               style={{ left: bottomPositions[i], top: LINE_Y - ICON_R }}
//             >
//               <div style={{ marginTop: "29px" }}>
//                 <IconCircle>{ICONS[i + 2]}</IconCircle>
//               </div>
//               <VLine height={50} />
//               <Card title={card.title} description={card.description} />
//             </div>
//           ))}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default NaanStrategicAlignment;


import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Users, Lightbulb, GraduationCap } from "lucide-react";

const TEAL = "#3BA3C7";

interface ContentItem {
  title: string;
  description: string;
}

interface StrategicAlignmentSection {
  title: string;
  description: string;
  content: ContentItem[];
}

interface NaanStrategicAlignmentProps {
  strategicAlignmentSection: StrategicAlignmentSection;
}

interface CardProps {
  title: string;
  description: string;
}

const CARD_WIDTH = 260;
const CARD_HEIGHT = 180;

// ── Animation Variants ──────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

const fadeDown = {
  hidden: { opacity: 0, y: -30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut", delay },
  }),
};

const iconPop = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: "backOut", delay },
  }),
};

const lineGrow = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: (delay = 0) => ({
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut", delay },
  }),
};

const vlineGrow = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: (delay = 0) => ({
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut", delay },
  }),
};
// ────────────────────────────────────────────────────────────────────

const Card: React.FC<CardProps> = ({ title, description }) => (
  <div
    className="bg-white rounded-xl flex flex-col"
    style={{
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      border: `1.5px solid ${TEAL}`,
      padding: "18px 18px",
      flexShrink: 0,
    }}
  >
    <h3
      className="font-bold text-center text-gray-900 mb-3"
      style={{ fontSize: 16, lineHeight: 1.4, whiteSpace: "pre-line" }}
    >
      {title}
    </h3>
    <p className="text-gray-700" style={{ fontSize: 14, lineHeight: 1.6 }}>
      {description}
    </p>
  </div>
);

const IconCircle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className="flex items-center justify-center rounded-full"
    style={{
      width: 44,
      height: 44,
      background: "#E0F2FE",
      color: TEAL,
      flexShrink: 0,
      position: "relative",
      zIndex: 10,
      outline: "4px solid white",
      outlineOffset: "3px",
    }}
  >
    {children}
  </div>
);

const ICONS = [
  <Briefcase size={18} strokeWidth={1.8} />,
  <Users size={18} strokeWidth={1.8} />,
  <Lightbulb size={18} strokeWidth={1.8} />,
  <GraduationCap size={18} strokeWidth={1.8} />,
];

const LINE_Y = 280;
const ICON_R = 22;

const NaanStrategicAlignment: React.FC<NaanStrategicAlignmentProps> = ({
  strategicAlignmentSection,
}) => {
  const { title, description, content } = strategicAlignmentSection;

  const topCards = content.slice(0, 2);
  const bottomCards = content.slice(2, 4);

  const topPositions = [0, 470];
  const bottomPositions = [230, 650];

  const topVLineHeight = LINE_Y - CARD_HEIGHT - ICON_R;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-10 px-4">
      <div
        className="flex flex-col items-center w-full"
        style={{ maxWidth: 1000 }}
      >
        {/* Title — fade up */}
        <motion.h1
          className="font-bold text-gray-900 mb-3 text-center"
          style={{ fontSize: 36 }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
        >
          {title}
        </motion.h1>

        {/* Description — fade up */}
        <motion.p
          className="text-gray-700 text-center mb-14 text-base"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0.15}
        >
          {description}
        </motion.p>

        {/* Layout Container */}
        <div className="relative" style={{ width: 930, height: 520 }}>

          {/* HORIZONTAL LINE — grows from center */}
          <motion.div
            className="absolute"
            style={{
              top: LINE_Y,
              left: 0,
              right: 0,
              height: 4,
              background: TEAL,
              zIndex: 1,
              transformOrigin: "left center",
            }}
            variants={lineGrow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0.3}
          />

          {/* Left dot — fade in */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 16,
              height: 16,
              background: TEAL,
              top: LINE_Y - 7,
              left: -8,
              zIndex: 5,
            }}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.9}
          />

          {/* Right dot — fade in */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 16,
              height: 16,
              background: TEAL,
              top: LINE_Y - 7,
              right: -8,
              zIndex: 5,
            }}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.9}
          />

          {/* TOP CARDS — fade down from above */}
          {topCards.map((card, i) => (
            <div
              key={i}
              className="absolute flex flex-col items-center"
              style={{ left: topPositions[i], top: 0 }}
            >
              {/* Card fades down */}
              <motion.div
                variants={fadeDown}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.2 + i * 0.15}
              >
                <Card title={card.title} description={card.description} />
              </motion.div>

              {/* VLine grows downward */}
              <motion.div
                style={{
                  width: 3,
                  height: topVLineHeight,
                  background: TEAL,
                  flexShrink: 0,
                  transformOrigin: "top center",
                }}
                variants={vlineGrow}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.4 + i * 0.15}
              />

              {/* Icon pops in */}
              <motion.div
                style={{ marginTop: "-27px" }}
                variants={iconPop}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.6 + i * 0.15}
              >
                <IconCircle>{ICONS[i]}</IconCircle>
              </motion.div>
            </div>
          ))}

          {/* BOTTOM CARDS — fade up from below */}
          {bottomCards.map((card, i) => (
            <div
              key={i + 2}
              className="absolute flex flex-col items-center"
              style={{ left: bottomPositions[i], top: LINE_Y - ICON_R }}
            >
              {/* Icon pops in */}
              <motion.div
                style={{ marginTop: "29px" }}
                variants={iconPop}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.5 + i * 0.15}
              >
                <IconCircle>{ICONS[i + 2]}</IconCircle>
              </motion.div>

              {/* VLine grows downward */}
              <motion.div
                style={{
                  width: 3,
                  height: 50,
                  background: TEAL,
                  flexShrink: 0,
                  transformOrigin: "top center",
                }}
                variants={vlineGrow}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.6 + i * 0.15}
              />

              {/* Card fades up */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.7 + i * 0.15}
              >
                <Card title={card.title} description={card.description} />
              </motion.div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default NaanStrategicAlignment;