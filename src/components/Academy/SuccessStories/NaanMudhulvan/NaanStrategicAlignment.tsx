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

// ── Animation Variants ──────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay },
  }),
};

const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut", delay },
  }),
};

const iconPop = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "backOut", delay },
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

const vlineGrowDown = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: (delay = 0) => ({
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut", delay },
  }),
};
// ────────────────────────────────────────────────────────────────────

// ── Desktop Card ────────────────────────────────────────────────────
const Card: React.FC<CardProps> = ({ title, description }) => (
  <div
    className="bg-white rounded-xl flex flex-col"
    style={{
      width: 270,
      height: 180,
      border: `1.5px solid ${TEAL}`,
      padding: "18px 18px",
      flexShrink: 0,
    }}
  >
    <h3
      className="font-bold text-center text-gray-900 mb-3 text-base"
    >
      {title}
    </h3>
    <p className="text-gray-600 text-sm leading normal">
      {description}
    </p>
  </div>
);

// ── Tablet Card ─────────────────────────────────────────────────────
const TabletCard: React.FC<CardProps> = ({ title, description }) => (
  <div
    className="bg-white rounded-xl flex flex-col"
    style={{
      width: "100%",
      minHeight: 140,
      border: `1.5px solid ${TEAL}`,
      padding: "12px 12px",
      flexShrink: 0,
    }}
  >
    <h3
      className="font-bold text-center text-gray-900 mb-2"
      style={{ fontSize: 12, lineHeight: 1.35, whiteSpace: "pre-line" }}
    >
      {title}
    </h3>
    <p className="text-gray-600" style={{ fontSize: 11, lineHeight: 1.5 }}>
      {description}
    </p>
  </div>
);

// ── Mobile Card ─────────────────────────────────────────────────────
const MobileCard: React.FC<CardProps> = ({ title, description }) => (
  <div
    className="bg-white rounded-xl flex flex-col"
    style={{
      width: "100%",
      border: `1.5px solid ${TEAL}`,
      padding: "12px 14px",
    }}
  >
    <h3
      className="font-bold text-gray-900 mb-1"
      style={{ fontSize: 13, lineHeight: 1.35 }}
    >
      {title}
    </h3>
    <p className="text-gray-600" style={{ fontSize: 11.5, lineHeight: 1.5 }}>
      {description}
    </p>
  </div>
);

const IconCircle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className="flex items-center justify-center rounded-full"
    style={{
      width: 38,
      height: 38,
      background: "#E0F2FE",
      color: TEAL,
      flexShrink: 0,
      position: "relative",
      zIndex: 10,
      outline: "3px solid white",
      outlineOffset: "2px",
    }}
  >
    {children}
  </div>
);

const TabletIconCircle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className="flex items-center justify-center rounded-full"
    style={{
      width: 34,
      height: 34,
      background: "#E0F2FE",
      color: TEAL,
      flexShrink: 0,
      position: "relative",
      zIndex: 10,
      outline: "3px solid white",
      outlineOffset: "2px",
    }}
  >
    {children}
  </div>
);

const ICONS = [
  <Briefcase size={16} strokeWidth={1.8} />,
  <Users size={16} strokeWidth={1.8} />,
  <Lightbulb size={16} strokeWidth={1.8} />,
  <GraduationCap size={16} strokeWidth={1.8} />,
];

const ICONS_TABLET = [
  <Briefcase size={15} strokeWidth={1.8} />,
  <Users size={15} strokeWidth={1.8} />,
  <Lightbulb size={15} strokeWidth={1.8} />,
  <GraduationCap size={15} strokeWidth={1.8} />,
];

const ICONS_MOBILE = [
  <Briefcase size={13} strokeWidth={1.8} />,
  <Users size={13} strokeWidth={1.8} />,
  <Lightbulb size={13} strokeWidth={1.8} />,
  <GraduationCap size={13} strokeWidth={1.8} />,
];

// Desktop layout constants
const CARD_WIDTH = 220;
const CARD_HEIGHT = 160;
const LINE_Y = 240;
const ICON_R = 19;

const NaanStrategicAlignment: React.FC<NaanStrategicAlignmentProps> = ({
  strategicAlignmentSection,
}) => {
  const { title, description, content } = strategicAlignmentSection;

  const topCards = content.slice(0, 2);
  const bottomCards = content.slice(2, 4);
  const allCards = content.slice(0, 4);

  const topPositions = [0, 410];
  const bottomPositions = [200, 570];
  const topVLineHeight = LINE_Y - CARD_HEIGHT - ICON_R;

  // ── Tablet % positions (mirroring desktop layout proportionally) ──
  // Top icons sit under center of top cards: left card ~28%, right card ~72%
  const tabTopIconPct = [18, 64];
  // Bottom icons sit above center of bottom cards: ~43% and ~72%  
  const tabBottomIconPct = [38, 82];

  return (
    <div className="bg-white flex items-center justify-center pt-2 pb-24 px-4 mt-16 md:mt-16 lg:-mt-10">
      <div className="flex flex-col items-center w-full" style={{ maxWidth: 860 }}>

        {/* Title */}
        <motion.h1
          className="font-bold text-gray-900 mb-8 text-center text-2xl md:text-4xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-gray-600 text-center mb-16 text-base"
          style={{maxWidth: 520 }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0.15}
        >
          {description}
        </motion.p>

        {/* ── DESKTOP LAYOUT (lg and up) ───────────────────────────────── */}
        <div
          className="relative hidden lg:block"
          style={{ width: 810, height: 460 }}
        >
          {/* Horizontal line */}
          <motion.div
            className="absolute"
            style={{
              top: LINE_Y,
              left: 0,
              right: 0,
              height: 3,
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

          {/* Left dot */}
          <motion.div
            className="absolute rounded-full"
            style={{ width: 12, height: 12, background: TEAL, top: LINE_Y - 5, left: -6, zIndex: 5 }}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.9}
          />
          {/* Right dot */}
          <motion.div
            className="absolute rounded-full"
            style={{ width: 12, height: 12, background: TEAL, top: LINE_Y - 5, right: -6, zIndex: 5 }}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.9}
          />

          {/* Top cards */}
          {topCards.map((card, i) => (
            <div
              key={i}
              className="absolute flex flex-col items-center"
              style={{ left: topPositions[i], top: -20 }}
            >
              <motion.div
                variants={fadeDown}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.2 + i * 0.15}
              >
                <Card title={card.title} description={card.description} />
              </motion.div>
              <motion.div
                style={{
                  width: 2,
                  height: topVLineHeight,
                  background: TEAL,
                  flexShrink: 0,
                  transformOrigin: "top center",
                }}
                variants={vlineGrowDown}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.4 + i * 0.15}
              />
              <motion.div
                style={{ marginTop: "-22px" }}
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

          {/* Bottom cards */}
          {bottomCards.map((card, i) => (
            <div
              key={i + 2}
              className="absolute flex flex-col items-center"
              style={{ left: bottomPositions[i], top: LINE_Y - ICON_R }}
            >
              <motion.div
                style={{ marginTop: "23px" }}
                variants={iconPop}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.5 + i * 0.15}
              >
                <IconCircle>{ICONS[i + 2]}</IconCircle>
              </motion.div>
              <motion.div
                style={{
                  width: 2,
                  height: 44,
                  background: TEAL,
                  flexShrink: 0,
                  transformOrigin: "top center",
                }}
                variants={vlineGrowDown}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.6 + i * 0.15}
              />
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

        {/* ── TABLET LAYOUT (md only: 768px–1023px) ───────────────────────────
            Mirrors desktop exactly:
            - Top cards: left ~28% and right ~72% (icon centers)
            - Line: full width 0%→100% with dots at both ends
            - Bottom cards: ~40% and ~72% (icon centers)
        ──────────────────────────────────────────────────────────────────── */}
        <div className="hidden md:block lg:hidden w-full overflow-hidden">
          <div
            className="relative w-full"
            style={{ height: 480 }}
          >
{/* ── Horizontal line: equal padding both sides ── */}
<motion.div
  style={{
    position: "absolute",
    top: 220,
    left: 16,
    right: 16,
    height: 3,
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

{/* Left endpoint dot */}
<motion.div
  style={{
    position: "absolute",
    top: 214,
    left: 10,
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: TEAL,
    zIndex: 5,
  }}
  variants={fadeIn}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  custom={0.9}
/>

{/* Right endpoint dot */}
<motion.div
  style={{
    position: "absolute",
    top: 214,
    right: 10,
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: TEAL,
    zIndex: 5,
  }}
  variants={fadeIn}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  custom={0.9}
/>

            {/* ── TOP CARDS with vertical lines + icons dropping to line ── */}
            {topCards.map((card, i) => {
              const leftPct = tabTopIconPct[i];
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: 30,
                    left: `${leftPct}%`,
                    transform: "translateX(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: 200,
                  }}
                >
                  {/* Card */}
                  <motion.div
                    style={{ width: "100%" }}
                    variants={fadeDown}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    custom={0.2 + i * 0.15}
                  >
                    <TabletCard title={card.title} description={card.description} />
                  </motion.div>

                  {/* Vertical line down */}
                  <motion.div
                    style={{
                      width: 2,
                      height: 36,
                      background: TEAL,
                      flexShrink: 0,
                      transformOrigin: "top center",
                    }}
                    variants={vlineGrowDown}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.4 + i * 0.15}
                  />

                  {/* Icon */}
                  <motion.div
                    style={{ marginTop: "-17px", zIndex: 10 }}
                    variants={iconPop}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.6 + i * 0.15}
                  >
                    <TabletIconCircle>{ICONS_TABLET[i]}</TabletIconCircle>
                  </motion.div>
                </div>
              );
            })}

            {/* ── BOTTOM CARDS with icons rising from line + vertical lines ── */}
            {bottomCards.map((card, i) => {
              const leftPct = tabBottomIconPct[i];
              return (
                <div
                  key={i + 2}
                  style={{
                    position: "absolute",
                    top: 203,
                    left: `${leftPct}%`,
                    transform: "translateX(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: 200,
                  }}
                >
                  {/* Icon */}
                  <motion.div
                    style={{ marginTop: "20px", zIndex: 10 }}
                    variants={iconPop}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.5 + i * 0.15}
                  >
                    <TabletIconCircle>{ICONS_TABLET[i + 2]}</TabletIconCircle>
                  </motion.div>

                  {/* Vertical line down */}
                  <motion.div
                    style={{
                      width: 2,
                      height: 36,
                      background: TEAL,
                      flexShrink: 0,
                      transformOrigin: "top center",
                    }}
                    variants={vlineGrowDown}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.6 + i * 0.15}
                  />

                  {/* Card */}
                  <motion.div
                    style={{ width: "100%" }}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    custom={0.7 + i * 0.15}
                  >
                    <TabletCard title={card.title} description={card.description} />
                  </motion.div>
                </div>
              );
            })}

          </div>
        </div>

        {/* ── MOBILE LAYOUT (below md) ─────────────────────────────────── */}
        <div
          className="flex md:hidden w-full"
          style={{ maxWidth: 340, position: "relative", paddingLeft: 8 }}
        >
          {/* Long vertical spine */}
          <motion.div
            style={{
              position: "absolute",
              left: 8,
              top: 15,
              bottom: 15,
              width: 2,
              background: TEAL,
              transformOrigin: "top center",
              zIndex: 1,
            }}
            variants={vlineGrowDown}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.2}
          />

          {/* Top dot */}
          <motion.div
            style={{
              position: "absolute",
              left: 4,
              top: 10,
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: TEAL,
              zIndex: 2,
            }}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.15}
          />

          {/* Bottom dot */}
          <motion.div
            style={{
              position: "absolute",
              left: 4,
              bottom: 10,
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: TEAL,
              zIndex: 2,
            }}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.9}
          />

          {/* Cards column */}
          <div className="flex flex-col w-full" style={{ gap: 20 }}>
            {allCards.map((card, i) => (
              <motion.div
                key={i}
                className="flex flex-row items-center"
                style={{ position: "relative" }}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.15 + i * 0.15}
              >
                {/* Short branch */}
                <motion.div
                  style={{
                    width: 12,
                    height: 2,
                    background: TEAL,
                    flexShrink: 0,
                    transformOrigin: "left center",
                  }}
                  variants={{
                    hidden: { scaleX: 0, opacity: 0 },
                    visible: (d) => ({
                      scaleX: 1,
                      opacity: 1,
                      transition: { duration: 0.25, ease: "easeOut", delay: d },
                    }),
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.3 + i * 0.15}
                />

                {/* Icon box */}
                <motion.div
                  variants={iconPop}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.4 + i * 0.15}
                  style={{ flexShrink: 0, zIndex: 2 }}
                >
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 7,
                      background: "#E0F2FE",
                      color: TEAL,
                      outline: "2px solid white",
                      outlineOffset: "1px",
                    }}
                  >
                    {ICONS_MOBILE[i]}
                  </div>
                </motion.div>

                {/* Card */}
                <motion.div
                  style={{ flex: 1, marginLeft: 8 }}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={0.5 + i * 0.15}
                >
                  <MobileCard title={card.title} description={card.description} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default NaanStrategicAlignment;