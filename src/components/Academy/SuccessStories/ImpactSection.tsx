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
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const statIcons = [
  UsersIcon, CodeBracketIcon, StarIcon, ArrowTrendingUpIcon,
  ChartBarIcon, RocketLaunchIcon, AcademicCapIcon, CheckCircleIcon,
];
const pillIcons = [LightBulbIcon, ChatBubbleLeftRightIcon, AcademicCapIcon, CheckCircleIcon];
const radiusPattern = ["50px 15px 50px 15px", "15px 50px 15px 50px"];
interface StatItem {
  id: string;
  value: string;
  label: string;
}

interface Section {
  title: string;
  items: StatItem[];
}

interface KeyOutcomesSectionProps {
  section: Section;
}

// Animation variants
const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  }),
};

const scaleInVariant = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (delay: number) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const, delay },
  }),
};

const slideLeftVariant = {
  hidden: { opacity: 0, x: -30 },
  visible: (delay: number) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
  }),
};

const slideRightVariant = {
  hidden: { opacity: 0, x: 30 },
  visible: (delay: number) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
  }),
};

// An item is a "stat card" if its value contains a parseable number
function isStatItem(value: string): boolean {
  const numeric = value.replace(/[^0-9.]/g, "");
  return numeric.length > 0 && !isNaN(parseFloat(numeric));
}

export default function KeyOutcomesSection({ section }: KeyOutcomesSectionProps): JSX.Element {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  const stats = section.items.filter(item => isStatItem(item.value));
  const pills = section.items.filter(item => !isStatItem(item.value));
  const hasStats = stats.length > 0;

  return (
    <div className="mb-12 pb-16" ref={ref}>
      <motion.h2
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        custom={0}
        viewport={{ once: true, amount: 0.3 }}
        className="text-3xl md:text-5xl font-bold text-gray-900 mb-12 mt-8 text-center"
      >
        {section.title}
      </motion.h2>

      {/* Stat Cards */}
      {hasStats && (
        <div className={`grid gap-8 mb-8 px-4 ${
          stats.length === 1 ? "grid-cols-1 justify-items-center" : "grid-cols-1 sm:grid-cols-2"
        }`}>
          {stats.map((item, i) => {
            const Icon = statIcons[i % statIcons.length];
            const radius = radiusPattern[i % 2];
            const variant = i % 2 === 0 ? slideLeftVariant : slideRightVariant;
            const delay = 0.15 + i * 0.12;

            const numericStr = item.value.replace(/[^0-9.]/g, "");
            const numericVal = parseFloat(numericStr);
            const suffix = item.value.includes("%") ? "%" : item.value.includes("+") ? "+" : "";

            // Generate border radius class based on pattern
            const borderRadiusClass = radius === "50px 15px 50px 15px" 
              ? "rounded-stat-1" 
              : "rounded-stat-2";

            return (
              <motion.div
                key={item.id}
                variants={variant}
                initial="hidden"
                whileInView="visible"
                custom={delay}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className={`relative border border-blue-100 shadow-sm p-8 bg-green-50 ${borderRadiusClass} ${
                  stats.length === 1 ? "max-w-md w-full" : ""
                }`}
              >
                {/* Icon badge */}
                <motion.div
                  variants={scaleInVariant}
                  initial="hidden"
                  whileInView="visible"
                  custom={delay + 0.2}
                  viewport={{ once: true, amount: 0.3 }}
                  className="absolute flex items-center justify-center rounded-full -top-5 right-7 w-10 h-10 bg-blue-100 border border-blue-200 z-10"
                >
                  <Icon className="text-blue-500 w-5 h-5" style={{ strokeWidth: 1.8 }} />
                </motion.div>

                {/* Value */}
                <motion.p
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  custom={delay + 0.1}
                  viewport={{ once: true, amount: 0.3 }}
                  className="font-extrabold mb-2 tracking-tight text-black text-4xl"
                >
                  {inView ? (
                    <CountUp
                      start={0}
                      end={numericVal}
                      duration={2}
                      separator=","
                      decimals={item.value.includes(".") ? 2 : 0}
                      suffix={suffix}
                    />
                  ) : "0"}
                </motion.p>

                {/* Label */}
                <motion.p
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  custom={delay + 0.15}
                  viewport={{ once: true, amount: 0.3 }}
                  className="font-bold text-base mb-1 text-gray-900"
                >
                  {item.label}
                </motion.p>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Pill Cards — for non-numeric items (↑, ✓, etc.) */}
      {pills.length > 0 && (
        <div className={`grid gap-5 ${hasStats ? "mt-16" : "mt-0"} grid-cols-1 sm:grid-cols-2 px-4`}>
          {pills.map((pill, i) => {
            const Icon = pillIcons[i % pillIcons.length];
            const isLastOdd = pills.length % 2 === 1 && i === pills.length - 1 && pills.length > 1;
            const delay = 0.2 + (hasStats ? stats.length * 0.12 : 0) + i * 0.1;

            return (
              <motion.div
                key={pill.id}
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                custom={delay}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className={`flex items-start gap-4 border border-blue-100 px-7 py-5 bg-green-50 rounded-full ${
                  isLastOdd ? "sm:col-span-2 sm:max-w-md sm:mx-auto" : ""
                }`}
              >
                <motion.div
                  variants={scaleInVariant}
                  initial="hidden"
                  whileInView="visible"
                  custom={delay + 0.15}
                  viewport={{ once: true, amount: 0.3 }}
                  className="flex-shrink-0 flex items-center justify-center rounded-full mt-0.5 w-9 h-9 bg-white/70 shadow-sm"
                >
                  <Icon className="text-blue-500 w-4 h-4" style={{ strokeWidth: 1.8 }} />
                </motion.div>

                <motion.p
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  custom={delay + 0.1}
                  viewport={{ once: true, amount: 0.3 }}
                  className="text-xs md:text-sm leading-relaxed text-gray-700"
                >
                  {pill.label}
                </motion.p>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
