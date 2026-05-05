import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Users, Lightbulb, GraduationCap } from "lucide-react";

interface ContentItem {
  id: string;
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

// ── Layout Constants ────────────────────────────────────────────────

// Desktop layout positioning (in pixels)
const DESKTOP_LAYOUT = {
  // Card positions from left edge
  TOP_CARD_POSITIONS: [0, 410] as const,
  BOTTOM_CARD_POSITIONS: [200, 570] as const,
  
  // Timeline positioning
  LINE_Y: 240,
  ICON_RADIUS: 19,
  
  // Vertical line calculations
  CARD_TOP_OFFSET: 160, // Distance from top cards to timeline
} as const;

// Tablet layout positioning (in percentages)
const TABLET_LAYOUT = {
  // Icon center positions as percentages from left
  TOP_ICON_POSITIONS: [18, 64] as const,
  BOTTOM_ICON_POSITIONS: [38, 82] as const,
} as const;

// Icon dimensions for different screen sizes
const ICON_SIZES = {
  DESKTOP: { SIZE: 16, STROKE_WIDTH: 1.8 },
  TABLET: { SIZE: 15, STROKE_WIDTH: 1.8 },
  MOBILE: { SIZE: 13, STROKE_WIDTH: 1.8 },
} as const;

// ── Animation Variants ──────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay },
  }),
};

const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const, delay },
  }),
};

const iconPop = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: (delay = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const, delay },
  }),
};

const lineGrow = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: (delay = 0) => ({
    scaleX: 1, opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" as const, delay },
  }),
};

const vlineGrowDown = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: (delay = 0) => ({
    scaleY: 1, opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const, delay },
  }),
};
// ────────────────────────────────────────────────────────────────────

// ── Desktop Card ────────────────────────────────────────────────────
const Card = ({ title, description }: CardProps): JSX.Element => (
  <div className="bg-white rounded-xl flex flex-col w-card-width h-card-height border-1.5 border-teal-custom p-card-padding-lg shrink-0">
    <h3 className="font-bold text-center text-gray-900 mb-3 text-base">
      {title}
    </h3>
    <p className="text-gray-600 text-sm leading-normal">
      {description}
    </p>
  </div>
);

// ── Tablet Card ─────────────────────────────────────────────────────
const TabletCard = ({ title, description }: CardProps): JSX.Element => (
  <div className="bg-white rounded-xl flex flex-col w-full min-h-card-min-height border-1.5 border-teal-custom p-3 shrink-0">
    <h3 className="font-bold text-center text-gray-900 mb-2 text-xs leading-tight-plus whitespace-pre-line">
      {title}
    </h3>
    <p className="text-gray-600 text-xs leading-normal">
      {description}
    </p>
  </div>
);

// ── Mobile Card ─────────────────────────────────────────────────────
const MobileCard = ({ title, description }: CardProps): JSX.Element => (
  <div className="bg-white rounded-xl flex flex-col w-full border-1.5 border-teal-custom px-card-padding-sm py-card-padding-md">
    <h3 className="font-bold text-gray-900 mb-1 text-sm leading-tight-plus">
      {title}
    </h3>
    <p className="text-gray-600 text-xs leading-normal">
      {description}
    </p>
  </div>
);

const IconCircle = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <div className="flex items-center justify-center rounded-full w-icon-lg h-icon-lg bg-sky-100 text-teal-custom shrink-0 relative z-10 ring-icon-outline ring-white ring-offset-icon-offset">
    {children}
  </div>
);

const TabletIconCircle = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <div className="flex items-center justify-center rounded-full w-icon-md h-icon-md bg-sky-100 text-teal-custom shrink-0 relative z-10 ring-icon-outline ring-white ring-offset-icon-offset">
    {children}
  </div>
);

const ICONS = [
  <Briefcase size={ICON_SIZES.DESKTOP.SIZE} strokeWidth={ICON_SIZES.DESKTOP.STROKE_WIDTH} />,
  <Users size={ICON_SIZES.DESKTOP.SIZE} strokeWidth={ICON_SIZES.DESKTOP.STROKE_WIDTH} />,
  <Lightbulb size={ICON_SIZES.DESKTOP.SIZE} strokeWidth={ICON_SIZES.DESKTOP.STROKE_WIDTH} />,
  <GraduationCap size={ICON_SIZES.DESKTOP.SIZE} strokeWidth={ICON_SIZES.DESKTOP.STROKE_WIDTH} />,
];

const ICONS_TABLET = [
  <Briefcase size={ICON_SIZES.TABLET.SIZE} strokeWidth={ICON_SIZES.TABLET.STROKE_WIDTH} />,
  <Users size={ICON_SIZES.TABLET.SIZE} strokeWidth={ICON_SIZES.TABLET.STROKE_WIDTH} />,
  <Lightbulb size={ICON_SIZES.TABLET.SIZE} strokeWidth={ICON_SIZES.TABLET.STROKE_WIDTH} />,
  <GraduationCap size={ICON_SIZES.TABLET.SIZE} strokeWidth={ICON_SIZES.TABLET.STROKE_WIDTH} />,
];

const ICONS_MOBILE = [
  <Briefcase size={ICON_SIZES.MOBILE.SIZE} strokeWidth={ICON_SIZES.MOBILE.STROKE_WIDTH} />,
  <Users size={ICON_SIZES.MOBILE.SIZE} strokeWidth={ICON_SIZES.MOBILE.STROKE_WIDTH} />,
  <Lightbulb size={ICON_SIZES.MOBILE.SIZE} strokeWidth={ICON_SIZES.MOBILE.STROKE_WIDTH} />,
  <GraduationCap size={ICON_SIZES.MOBILE.SIZE} strokeWidth={ICON_SIZES.MOBILE.STROKE_WIDTH} />,
];

function NaanStrategicAlignment({
  strategicAlignmentSection,
}: NaanStrategicAlignmentProps): JSX.Element {
  const { title, description, content } = strategicAlignmentSection;

  const topCards = content.slice(0, 2);
  const bottomCards = content.slice(2, 4);
  const allCards = content.slice(0, 4);

  const topVLineHeight = DESKTOP_LAYOUT.LINE_Y - DESKTOP_LAYOUT.CARD_TOP_OFFSET - DESKTOP_LAYOUT.ICON_RADIUS;

  return (
    <div className="bg-white flex items-center justify-center pt-2 pb-24 px-4 mt-16 md:mt-16 lg:mt-16 xl:mt-0">
      <div className="flex flex-col items-center w-full max-w-section-max">

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
          className="text-gray-600 text-center mb-16 text-base max-w-content-max"
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
          className="relative hidden lg:block w-desktop-width h-desktop-height"
        >
          {/* Horizontal line */}
          <motion.div
            className="absolute top-timeline-center left-0 right-0 h-hline-height bg-teal-custom z-timeline-line origin-left-center"
            variants={lineGrow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0.3}
          />

          {/* Left dot */}
          <motion.div
            className="absolute rounded-full w-3 h-3 bg-teal-custom z-timeline-endpoint top-desktop-dot-top -left-neg-offset"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.9}
          />
          {/* Right dot */}
          <motion.div
            className="absolute rounded-full w-3 h-3 bg-teal-custom z-timeline-endpoint top-desktop-dot-top -right-neg-offset"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.9}
          />

          {/* Top cards */}
          {topCards.map((card, i) => (
            <div
              key={card.id}
              className="absolute flex flex-col items-center top-card-top-offset"
              style={{ left: DESKTOP_LAYOUT.TOP_CARD_POSITIONS[i] }}
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
                className="w-0.5 bg-teal-custom shrink-0 origin-top-center"
                style={{
                  height: topVLineHeight,
                }}
                variants={vlineGrowDown}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.4 + i * 0.15}
              />
              <motion.div
                className="-mt-icon-offset-lg"
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
              key={card.id}
              className="absolute flex flex-col items-center top-desktop-card-top"
              style={{ left: DESKTOP_LAYOUT.BOTTOM_CARD_POSITIONS[i] }}
            >
              <motion.div
                className="mt-icon-margin"
                variants={iconPop}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.5 + i * 0.15}
              >
                <IconCircle>{ICONS[i + 2]}</IconCircle>
              </motion.div>
              <motion.div
                className="w-0.5 h-11 bg-teal-custom shrink-0 origin-top-center"
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
            className="relative w-full h-tablet-height"
          >
{/* ── Horizontal line: equal padding both sides ── */}
<motion.div
  className="absolute top-tablet-line-top left-4 right-4 h-hline-height bg-teal-custom z-timeline-line origin-left-center"
  variants={lineGrow}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  custom={0.3}
/>

{/* Left endpoint dot */}
<motion.div
  className="absolute top-tablet-dot-top left-2.5 w-3 h-3 rounded-full bg-teal-custom z-timeline-endpoint"
  variants={fadeIn}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  custom={0.9}
/>

{/* Right endpoint dot */}
<motion.div
  className="absolute top-tablet-dot-top right-2.5 w-3 h-3 rounded-full bg-teal-custom z-timeline-endpoint"
  variants={fadeIn}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  custom={0.9}
/>

            {/* ── TOP CARDS with vertical lines + icons dropping to line ── */}
            {topCards.map((card, i) => {
              const leftPct = TABLET_LAYOUT.TOP_ICON_POSITIONS[i];
              return (
                <div
                  key={card.id}
                  className="absolute top-tablet-card-top flex flex-col items-center w-tablet-card-width -translate-x-1/2"
                  style={{
                    left: `${leftPct}%`,
                  }}
                >
                  {/* Card */}
                  <motion.div
                    className="w-full"
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
                    className="w-0.5 h-9 bg-teal-custom shrink-0 origin-top-center"
                    variants={vlineGrowDown}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.4 + i * 0.15}
                  />

                  {/* Icon */}
                  <motion.div
                    className="-mt-icon-offset-sm z-10"
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
              const leftPct = TABLET_LAYOUT.BOTTOM_ICON_POSITIONS[i];
              return (
                <div
                  key={card.id}
                  className="absolute top-tablet-icon-top flex flex-col items-center w-tablet-card-width -translate-x-1/2"
                  style={{
                    left: `${leftPct}%`,
                  }}
                >
                  {/* Icon */}
                  <motion.div
                    className="mt-5 z-10"
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
                    className="w-0.5 h-9 bg-teal-custom shrink-0 origin-top-center"
                    variants={vlineGrowDown}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.6 + i * 0.15}
                  />

                  {/* Card */}
                  <motion.div
                    className="w-full"
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
          className="flex md:hidden w-full max-w-mobile-container relative pl-1"
        >
          {/* Long vertical spine */}
          <motion.div
            className="absolute left-1 top-spine-offset bottom-spine-offset w-0.5 bg-teal-custom z-timeline-line origin-top-center"
            variants={vlineGrowDown}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.2}
          />

          {/* Top dot */}
          <motion.div
            className="absolute rounded-full w-2.5 h-2.5 bg-teal-custom z-timeline-dot left-1 top-2.5"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.15}
          />

          {/* Bottom dot */}
          <motion.div
            className="absolute rounded-full w-2.5 h-2.5 bg-teal-custom z-timeline-dot left-1 bottom-2.5"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.9}
          />

          {/* Cards column */}
          <div className="flex flex-col w-full gap-5">
            {allCards.map((card, i) => (
              <motion.div
                key={card.id}
                className="flex flex-row items-center relative"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.15 + i * 0.15}
              >
                {/* Short branch */}
                <motion.div
                  className="w-3 h-0.5 bg-teal-custom shrink-0 origin-left-center"
                  variants={{
                    hidden: { scaleX: 0, opacity: 0 },
                    visible: (d) => ({
                      scaleX: 1, opacity: 1,
                      transition: { duration: 0.25, ease: "easeOut" as const, delay: d },
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
                  className="shrink-0 z-timeline-dot"
                >
                  <div className="flex items-center justify-center w-icon-sm h-icon-sm rounded-lg bg-sky-100 text-teal-custom ring-2 ring-white ring-offset-icon-offset-sm">
                    {ICONS_MOBILE[i]}
                  </div>
                </motion.div>

                {/* Card */}
                <motion.div
                  className="flex-1 ml-1"
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
}

export default NaanStrategicAlignment;