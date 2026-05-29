
import { motion } from "framer-motion";
import { BookOpen, Code, BarChart3, Globe, Settings, type LucideIcon } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

interface University {
  id?: string;
  name: string;
  students: number;
}

interface CourseItem {
  id?: string;
  title: string;
  total: number;
  universities: University[];
}

interface AboutSection {
  title: string;
  content: string;
}

interface CourseEnrollmentSection {
  title: string;
  courses: CourseItem[];
}

interface NaanAboutProgrammeProps {
  aboutSection: AboutSection;
  courseEnrollmentSection: CourseEnrollmentSection;
}

// Production-level icon selection with predictable behavior
function getCourseIcon(index: number): JSX.Element {
  const clampedIndex = Math.min(Math.max(0, index), COURSE_ICONS.length - 1);
  const IconComponent = COURSE_ICONS[clampedIndex];
  return <IconComponent className="w-6 h-6 text-white opacity-80" />;
}

// ── Constants ────────────────────────────────────────────────────────────────

// Production-level icon array with type safety and immutability
const COURSE_ICONS = [BookOpen, Code, BarChart3, Globe, Settings] as const satisfies readonly LucideIcon[];

// Course card background colors mapped to Tailwind classes
const COURSE_BG_CLASSES = [
  "bg-blue-course-1", // #4a90d9
  "bg-blue-course-2", // #6aaee8  
  "bg-blue-course-3", // #8ec0f0
  "bg-blue-course-4", // #7ab8ec
] as const;

// ── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (delay = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
  }),
};

// ── Component ────────────────────────────────────────────────────────────────

function NaanAboutProgramme({
  aboutSection,
  courseEnrollmentSection,
}: NaanAboutProgrammeProps): JSX.Element {

  /**
   * Safe course processing with proper empty array handling
   * Production-level implementation that prevents runtime errors
   */
  const courses = courseEnrollmentSection.courses || [];
  const mainCourse = courses.length > 0 
    ? courses.reduce((max, c) => (c.total > max.total ? c : max))
    : { title: "", total: 0, universities: [] };
  const otherCourses = courses.filter((c) => c.title !== mainCourse.title);

  return (
    <section className="bg-white mt-8 sm:mt-10 md:mt-28 pb-5 md:pb-24 px-4 md:px-8 max-w-5xl mx-auto">

      {/* Title */}
      <motion.h2
        className="text-center font-extrabold text-gray-900 mb-8 tracking-tight text-2xl md:text-4xl"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        custom={0}
      >
        {aboutSection.title}
      </motion.h2>

      {/* Description */}
      <motion.div
        className="max-w-3xl mx-auto mb-12 border border-gray-200 rounded-2xl px-6 py-6 md:px-8 md:py-8"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        custom={0.15}
      >
        <p
          className="text-gray-700 font-normal leading-relaxed text-sm md:text-base text-justify md:text-left"
        >
          {aboutSection.content}
        </p>
      </motion.div>

      {/* Cards layout */}
      <div className={`flex flex-col md:flex-row gap-4 min-h-auto ${courses.length === 1 ? 'md:justify-center' : ''}`}>

        {/* Single course card — centered when only one course */}
        {courses.length === 1 ? (
          <motion.div
            className={`rounded-2xl p-8 flex-col shadow-md max-w-md mx-auto flex ${COURSE_BG_CLASSES[0]}`}
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0.2}
          >
            <div className="mb-4">{getCourseIcon(0)}</div>
            <h3 className="text-white font-bold text-xl mb-2">{mainCourse.title}</h3>
            <div className="mt-3">
              <p className="text-white font-bold text-5xl tracking-tight">
                {mainCourse.total.toLocaleString()}
              </p>
              <p className="text-blue-200 text-sm mt-1">Students Enrolled</p>
            </div>
          </motion.div>
        ) : (
          <>
            {/* LEFT: Main course card — desktop only (when multiple courses) */}
            {mainCourse.title && (
              <motion.div
                className={`hidden md:flex rounded-2xl p-8 flex-col shadow-md w-main-card-width ${COURSE_BG_CLASSES[0]}`}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.2}
              >
                <div className="mb-4">{getCourseIcon(0)}</div>
                <h3 className="text-white font-bold text-xl mb-2">{mainCourse.title}</h3>
                <div className="mt-3">
                  <p className="text-white font-bold text-5xl tracking-tight">
                    {mainCourse.total.toLocaleString()}
                  </p>
                  <p className="text-blue-200 text-sm mt-1">Students Enrolled</p>
                </div>
              </motion.div>
            )}

            {/* RIGHT: Other courses (only when multiple courses) */}
            <div className="w-full md:flex-1 flex flex-col gap-4">

          {/* Mobile: 2-col grid showing all courses */}
          <div className="md:hidden grid grid-cols-2 gap-4">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                className={`rounded-2xl p-4 flex flex-col shadow-md ${COURSE_BG_CLASSES[index % COURSE_BG_CLASSES.length]}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.2 + index * 0.1}
              >
                <div className="mb-2">{getCourseIcon(index)}</div>
                <h3 className="text-white font-bold text-sm mb-2 line-clamp-2">{course.title}</h3>
                <p className="text-white font-bold text-2xl tracking-tight">
                  {course.total.toLocaleString()}
                </p>
                <p className="text-blue-100 text-xs mt-0.5">Students</p>
              </motion.div>
            ))}
          </div>

          {/* Desktop: remaining courses */}
          <div className="hidden md:flex flex-col gap-4 flex-1">
            {otherCourses.length === 0 ? null : otherCourses.length === 1 ? (
              <motion.div
                key={otherCourses[0].id}
                className={`rounded-2xl p-5 flex flex-col flex-1 shadow-md ${COURSE_BG_CLASSES[1]}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.3}
              >
                <div className="mb-3">{getCourseIcon(1)}</div>
                <h3 className="text-white font-bold text-base mb-3">{otherCourses[0].title}</h3>
                <p className="text-white font-bold text-3xl tracking-tight">
                  {otherCourses[0].total.toLocaleString()}
                </p>
                <p className="text-blue-100 text-xs mt-0.5">Students</p>
              </motion.div>
            ) : (
              <>
                {/* Top row — first 2 */}
                <div className="flex gap-4 flex-1">
                  {otherCourses.slice(0, 2).map((course, index) => (
                    <motion.div
                      key={course.id}
                      className={`rounded-2xl p-5 flex flex-col flex-1 shadow-md ${COURSE_BG_CLASSES[(index + 1) % COURSE_BG_CLASSES.length]}`}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      custom={0.3 + index * 0.15}
                    >
                      <div className="mb-3">{getCourseIcon(index + 1)}</div>
                      <h3 className="text-white font-bold text-base mb-3">{course.title}</h3>
                      <p className="text-white font-bold text-3xl tracking-tight">
                        {course.total.toLocaleString()}
                      </p>
                      <p className="text-blue-100 text-xs mt-0.5">Students</p>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom row — 3rd course */}
                {otherCourses.length >= 3 && (
                  <motion.div
                    className={`rounded-2xl p-10 flex flex-row items-center justify-between shadow-md h-bottom-card-height shrink-0 ${COURSE_BG_CLASSES[3 % COURSE_BG_CLASSES.length]}`}
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    custom={0.55}
                  >
                    <div>
                      <div className="mb-2">{getCourseIcon(3)}</div>
                      <h3 className="text-white font-bold text-base">{otherCourses[2].title}</h3>
                    </div>
                    <div className="text-right ml-6 flex-shrink-0">
                      <p className="text-white font-bold text-3xl tracking-tight">
                        {otherCourses[2].total.toLocaleString()}
                      </p>
                      <p className="text-blue-100 text-xs mt-0.5">Students Enrolled</p>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default NaanAboutProgramme;
