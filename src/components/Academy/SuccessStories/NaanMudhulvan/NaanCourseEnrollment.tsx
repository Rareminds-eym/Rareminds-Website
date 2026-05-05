
import React from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Sprout, 
  Zap, 
  FlaskConical, 
  Leaf, 
  Stethoscope,
  Building2
} from "lucide-react";

// ── Constants ────────────────────────────────────────────────────────────────

// Responsive breakpoint for mobile layout
const MOBILE_BREAKPOINT = 840; // pixels

interface University {
  id: string;
  name: string;
  students: number;
}

interface Course {
  id: string;
  title: string;
  totalStudents: number;
  universities: University[];
  icon: React.ReactNode;
}

interface CourseItem {
  id?: string;
  title: string;
  total: number;
  universities: University[];
}

interface CourseEnrollmentSection {
  title: string;
  courses: CourseItem[];
}

interface NaanCourseEnrollmentProps {
  courseEnrollmentSection: CourseEnrollmentSection;
}

// ── Animation Variants ──────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
  }),
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
  }),
};

const iconPop = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: (delay = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const, delay },
  }),
};

const rowSlide = {
  hidden: { opacity: 0, x: -16 },
  visible: (delay = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.38, ease: "easeOut" as const, delay },
  }),
};

const dividerGrow = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: (delay = 0) => ({
    scaleX: 1, opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const, delay },
  }),
};
// ────────────────────────────────────────────────────────────────────

const CourseCard = ({ course, cardDelay }: { course: Course; cardDelay: number }): JSX.Element => {
  return (
    <motion.div
      className="bg-white rounded-2xl border border-blue-100 shadow-xl flex flex-col h-full p-course-card"
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      custom={cardDelay}
      whileHover={{ y: -4, boxShadow: "0 24px 48px rgba(59,163,199,0.13)" }}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-2">
          {/* Icon */}
          <motion.div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-course-icon-bg"
            variants={iconPop}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={cardDelay + 0.15}
          >
            {course.icon}
          </motion.div>

          <motion.div
            className="min-w-0"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={cardDelay + 0.2}
          >
            <h2 className="font-semibold text-gray-900 leading-tight text-course-title">
              {course.title}
            </h2>
          </motion.div>
        </div>

        {/* Total count */}
        <motion.div
          className="text-right flex-shrink-0 ml-2"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={cardDelay + 0.25}
        >
          <p className="font-bold text-gray-900 text-course-count">
            {course.totalStudents.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">Total Students</p>
        </motion.div>
      </div>

      {/* Table Header */}
      <motion.div
        className="flex justify-between text-xs font-semibold uppercase tracking-widest text-gray-400 px-2 pb-2 border-b border-gray-100 mb-2 origin-left-center"
        variants={dividerGrow}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={cardDelay + 0.3}
      >
        <span>University</span>
        <span>Students</span>
      </motion.div>

      {/* University Rows */}
      <div className={`max-h-course-scroll-height course-scrollbar flex-1 ${
        course.universities.length >= 3 ? 'overflow-y-auto' : 'overflow-y-visible'
      }`}>
        <div className="space-y-2 pr-1">
          {course.universities.map((uni, index) => (
            <motion.div
              key={uni.id}
              className="flex items-center justify-between w-full bg-blue-course-row-bg min-h-course-row-height rounded-xl gap-2 p-course-row"
              variants={rowSlide}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={cardDelay + 0.35 + index * 0.08}
            >
              <div className="flex items-center gap-1.5 min-w-0 flex-1">
                <Building2 className="w-3 h-3 text-blue-500 flex-shrink-0" />
                <span className="font-normal text-gray-800 text-course-uni-name whitespace-nowrap overflow-hidden text-ellipsis">
                  {uni.name}
                </span>
              </div>
              <span className="font-medium text-gray-800 flex-shrink-0 text-course-uni-count">
                {uni.students.toLocaleString()}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Total */}
      <motion.div
        className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={cardDelay + 0.5}
      >
        <span className="text-sm text-gray-500">Total</span>
        <span className="text-sm font-bold text-gray-900">
          {course.totalStudents.toLocaleString()}
        </span>
      </motion.div>
    </motion.div>
  );
};

function NaanCourseEnrollment({
  courseEnrollmentSection,
}: NaanCourseEnrollmentProps): JSX.Element {
  // ✅ ONLY FIX: track window width to detect mobile
  const [isMobile, setIsMobile] = React.useState(
    window.innerWidth < MOBILE_BREAKPOINT
  );

  /**
   * Handle mobile breakpoint detection for responsive layout
   * Production-level implementation with proper cleanup
   */
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array is correct - we only want to set up the listener once

  const getIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('agri') || n.includes('business')) return <Sprout className="w-5 h-5 text-blue-500" />;
    if (n.includes('battery') || n.includes('ev')) return <Zap className="w-5 h-5 text-blue-500" />;
    if (n.includes('food') && n.includes('analysis')) return <FlaskConical className="w-5 h-5 text-blue-500" />;
    if (n.includes('organic') || n.includes('food production')) return <Leaf className="w-5 h-5 text-blue-500" />;
    if (n.includes('medical') || n.includes('coding')) return <Stethoscope className="w-5 h-5 text-blue-500" />;
    return <GraduationCap className="w-5 h-5 text-blue-500" />;
  };

  /**
   * Transform course data with safe ID handling
   * Production-level implementation that prevents runtime errors
   */
  const courses: Course[] = courseEnrollmentSection.courses.map((c, index) => ({
    id: c.id || `course-${index}`, // Safe fallback for missing IDs
    title: c.title,
    totalStudents: c.total,
    universities: c.universities,
    icon: getIcon(c.title),
  }));

  return (
    <div className="bg-white py-16 md:py-10 px-4 md:px-10">
      {/* Title */}
      <motion.h1
        className="font-bold text-center text-gray-900 mb-12 md:mb-16 text-2xl md:text-4xl"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        custom={0}
      >
        {courseEnrollmentSection.title}
      </motion.h1>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-course-auto-fit gap-6 items-stretch">
        {courses.map((course, index) => {
          const isLastOdd = courses.length % 2 !== 0 && index === courses.length - 1;
          return (
            <div
              key={course.id}
              className={`w-full ${
                isLastOdd ? 'col-span-full' : ''
              } ${
                isLastOdd && !isMobile ? 'max-w-course-last-odd-width mx-auto' : ''
              }`}
            >
              <CourseCard
                course={course}
                cardDelay={index * 0.12}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NaanCourseEnrollment;