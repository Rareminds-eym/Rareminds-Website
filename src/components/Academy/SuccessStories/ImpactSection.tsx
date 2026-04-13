import { motion } from "framer-motion";
import {
  UsersIcon,
  CodeBracketIcon,
  StarIcon,
  ArrowTrendingUpIcon,
  LightBulbIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  ChartBarIcon,
  CheckCircleIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const statIcons = [UsersIcon, CodeBracketIcon, StarIcon, ArrowTrendingUpIcon, ChartBarIcon, RocketLaunchIcon, AcademicCapIcon, CheckCircleIcon];
const pillIcons = [LightBulbIcon, ChatBubbleLeftRightIcon, AcademicCapIcon, CheckCircleIcon];
const radiusPattern = ["50px 15px 50px 15px", "15px 50px 15px 50px"];

function parseImpactContent(content: string): {
  stats: { value: string; label: string; desc: string }[];
  pills: { text: string }[];
} {
  const sentences = content
    .split(/\.(?:\s+|\s*$)/)
    .map((s) => s.trim())
    .filter((s) => s.length > 5);

  const stats: { value: string; label: string; desc: string }[] = [];
  const pills: { text: string }[] = [];

  const statRegex = /\b(\d+(?:,\d{3})*(?:\.\d+)?[%+]?)\b/;

  const stopWords = new Set([
    "of","in","the","a","an","and","or","to","for","with","that","this",
    "their","they","them","were","was","are","is","by","on","at","from",
    "through","across","via","into","as","its","it","who","which","where",
    "when","how","all","both","each","every","any","over","under","per",
    "have","has","had","been","being","be","more","than","least","up",
    "participants","students","reported","demonstrated","achieved",
    "completed","expressed","showed","observed","noted","said",
    "highlighted","stated","indicated","trained","improved","built",
  ]);

  for (const sentence of sentences) {
    if (stats.length < 4) {
      const match = sentence.match(statRegex);
      if (match) {
        let value = match[1];
        if (!value.includes('%') && !value.includes('+')) {
          const numberWithSymbol = sentence.match(new RegExp(`\\b${value}[%+]`));
          if (numberWithSymbol) value = numberWithSymbol[0];
        }
        const words = sentence
          .replace(/[^a-zA-Z0-9\s]/g, " ")
          .split(/\s+/)
          .filter((w) => {
            const lower = w.toLowerCase();
            return w.length > 2 && !stopWords.has(lower) && !/\d/.test(w);
          });
        const label = words
          .slice(0, 3)
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(" ");
        stats.push({ value, label: label || "Key Metric", desc: sentence.replace(/\.$/, "") });
        continue;
      }
    }
    if (sentence.length > 15) pills.push({ text: sentence });
  }

  return { stats, pills };
}

interface Section {
  title: string;
  content: string;
}

interface KeyOutcomesSectionProps {
  section: Section;
}

// Animation variants
const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  }),
};

const scaleInVariant = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const, delay },
  }),
};

const slideLeftVariant = {
  hidden: { opacity: 0, x: -30 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
  }),
};

const slideRightVariant = {
  hidden: { opacity: 0, x: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
  }),
};

export default function KeyOutcomesSection({ section }: KeyOutcomesSectionProps) {
  const { stats, pills } = parseImpactContent(section.content);
  const hasStats = stats.length > 0;

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div className="mb-12" ref={ref}>

      {/* Section Title */}
      <motion.h2
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        custom={0}
        viewport={{ once: true }}
        className="ko-sora text-3xl md:text-5xl font-bold text-gray-900 mb-12 mt-8 text-center"
      >
        {section.title}
      </motion.h2>

      {/* Stat Cards */}
      {hasStats && (
        <div className={`grid gap-8 mb-8 ${
          stats.length === 1
            ? 'grid-cols-1 justify-items-center'
            : 'grid-cols-1 sm:grid-cols-2'
        }`}>
          {stats.map((item, i) => {
            const Icon = statIcons[i % statIcons.length];
            const radius = radiusPattern[i % 2];
            // Left column slides from left, right column from right
            const variant = i % 2 === 0 ? slideLeftVariant : slideRightVariant;
            const delay = 0.15 + i * 0.12;

            return (
              <motion.div
                key={`stat-${item.value}-${item.label}`}
                variants={variant}
                initial="hidden"
                whileInView="visible"
                custom={delay}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className={`ko-card relative border border-blue-100 shadow-sm p-8 ${
                  stats.length === 1 ? 'max-w-md w-full' : ''
                }`}
                style={{
                  borderRadius: radius,
                  backgroundColor: "#F5F9FF",
                }}
              >
                {/* Icon badge */}
                <motion.div
                  variants={scaleInVariant}
                  initial="hidden"
                  whileInView="visible"
                  custom={delay + 0.2}
                  viewport={{ once: true }}
                  className="absolute flex items-center justify-center rounded-full"
                  style={{
                    top: "-18px",
                    right: "28px",
                    width: "42px",
                    height: "42px",
                    backgroundColor: "#dbeafe",
                    border: "1.5px solid #bfdbfe",
                    zIndex: 10,
                  }}
                >
                  <Icon style={{ width: "20px", height: "20px", color: "#3b82f6", strokeWidth: 1.8 }} />
                </motion.div>

                {/* Stat value */}
                <motion.p
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  custom={delay + 0.1}
                  viewport={{ once: true }}
                  className="ko-sora font-extrabold mb-2 tracking-tight"
                  style={{ fontSize: "2.5rem", color: "#000000" }}
                >
                  {inView ? (
                    <CountUp
                      start={0}
                      end={Math.max(0, parseFloat(item.value.replace(/[^0-9.]/g, '')) || 0)}
                      duration={2}
                      separator=","
                      decimals={item.value.includes('.') ? 2 : 0}
                      suffix={item.value.includes('%') ? '%' : item.value.includes('+') ? '+' : ''}
                    />
                  ) : (
                    <span>{item.value}</span>
                  )}
                </motion.p>

                {/* Label */}
                <motion.p
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  custom={delay + 0.15}
                  viewport={{ once: true }}
                  className="font-bold text-base mb-1 text-gray-900"
                >
                  {item.label}
                </motion.p>

                {/* Description */}
                <motion.p
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  custom={delay + 0.2}
                  viewport={{ once: true }}
                  className="text-xs md:text-sm leading-relaxed"
                  style={{ color: "#374151" }}
                >
                  {item.desc}
                </motion.p>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Pill Cards */}
      {pills.length > 0 && (
        <div className={`grid gap-5 ${
          stats.length === 1 ? 'mt-8' : 'mt-16'
        } grid-cols-1 sm:grid-cols-2`}>
          {pills.map((pill, i) => {
            const Icon = pillIcons[i % pillIcons.length];
            const isLastOdd = pills.length % 2 === 1 && i === pills.length - 1 && pills.length > 1;
            const delay = 0.2 + (hasStats ? stats.length * 0.12 : 0) + i * 0.1;

            return (
              <motion.div
                key={`pill-${i}-${pill.text.slice(0, 20)}`}
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                custom={delay}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className={`flex items-start gap-4 border border-blue-100 px-7 py-5 ${
                  isLastOdd ? 'sm:col-span-2 sm:max-w-md sm:mx-auto' : ''
                }`}
                style={{
                  backgroundColor: "#F5F9FF",
                  borderRadius: "999px",
                }}
              >
                <motion.div
                  variants={scaleInVariant}
                  initial="hidden"
                  whileInView="visible"
                  custom={delay + 0.15}
                  viewport={{ once: true }}
                  className="flex-shrink-0 flex items-center justify-center rounded-full mt-0.5"
                  style={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: "rgba(255,255,255,0.7)",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                  }}
                >
                  <Icon style={{ width: "16px", height: "16px", color: "#3b82f6", strokeWidth: 1.8 }} />
                </motion.div>

                <motion.p
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  custom={delay + 0.1}
                  viewport={{ once: true }}
                  className="text-xs md:text-sm leading-relaxed text-gray-700"
                >
                  {pill.text}
                </motion.p>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}