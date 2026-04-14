

import React from "react";
import { motion } from "framer-motion";

interface AboutSection {
  title: string;
  content: string;
}

interface CourseEnrollmentSection {
  title: string;
  content: string;
}

interface NaanAboutProgrammeProps {
  aboutSection: AboutSection;
  courseEnrollmentSection: CourseEnrollmentSection;
}

const BatteryIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-7 h-7 text-white opacity-90"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <rect x="1" y="7" width="16" height="10" rx="2" stroke="currentColor" strokeWidth={1.8} fill="none" />
    <path d="M19 10v4" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" />
  </svg>
);

const WheatIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 text-white opacity-80"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.6}
  >
    <path d="M12 22V11" strokeLinecap="round" />
    <path d="M12 11C12 11 8.5 9.5 7.5 6C9.5 6 11.5 7.5 12 9.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 11C12 11 15.5 9.5 16.5 6C14.5 6 12.5 7.5 12 9.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 15C12 15 8.5 13.5 7.5 10C9.5 10 11.5 11.5 12 13.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 15C12 15 15.5 13.5 16.5 10C14.5 10 12.5 11.5 12 13.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LeafIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 text-white opacity-80"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.6}
  >
    <path
      d="M17 8C17 8 16 3 9 3C9 3 4 8 6 15C8 20 12 21 12 21"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M9 21C9 21 9 15 17 11" strokeLinecap="round" />
  </svg>
);

const FlaskIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 text-white opacity-80"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.6}
  >
    <path
      d="M9 3h6M9 3v7L5 17a2 2 0 001.8 2.9h10.4A2 2 0 0019 17l-4-7V3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M7.5 15.5h9" strokeLinecap="round" />
  </svg>
);

// ── Animation Variants ──────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
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
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
  }),
};
// ────────────────────────────────────────────────────────────────────

const NaanAboutProgramme: React.FC<NaanAboutProgrammeProps> = ({
  aboutSection,
  courseEnrollmentSection,
}) => {
  // Check if this is Naan Mudhalvan 2025 that needs the specific 3 blue cards
  const isNaanMudhalvan2025 = (
    courseEnrollmentSection.content.includes('3,886 students') &&
    courseEnrollmentSection.content.includes('5,049 students') &&
    courseEnrollmentSection.content.includes('5,560 students')
  );

  console.log('🔍 [NaanAboutProgramme] Detection check:', {
    isNaanMudhalvan2025,
    courseEnrollmentContent: courseEnrollmentSection.content.substring(0, 200) + '...'
  });

  // Naan Mudhalvan 2025 specific data
  const naanMudhalvan2025Programs = [
    {
      title: 'Medical Coding',
      description: 'Professional medical coding certification program for healthcare industry.',
      students: '3,886',
      icon: <BatteryIcon />
    },
    {
      title: 'Good Manufacturing Practices (GMP)',
      description: 'Essential GMP training for pharmaceutical and food industries.',
      students: '5,049',
      icon: <WheatIcon />
    },
    {
      title: 'Food Safety and Quality Management',
      description: 'Comprehensive training program in food safety and quality management.',
      students: '5,560',
      icon: <FlaskIcon />
    }
  ];

  // If this is Naan Mudhalvan 2025, render the specific 3 blue cards layout
  if (isNaanMudhalvan2025) {
    console.log('🎯 [NaanAboutProgramme] Rendering Naan Mudhalvan 2025 specific layout');
    return (
      <section className="bg-white mt-2 sm:-mt-12 md:mt-5 lg:-mt-32 pb-3 px-4 md:px-8 max-w-5xl mx-auto">
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
          <p className="text-gray-700 font-normal leading-relaxed md:leading-relaxed text-sm md:text-base text-justify md:text-left">
            {aboutSection.content}
          </p>
        </motion.div>

        {/* Three Blue Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {naanMudhalvan2025Programs.map((program, index) => (
            <motion.div
              key={index}
              className="text-white p-6 rounded-2xl shadow-md"
              style={{ backgroundColor: index === 0 ? '#4a90d9' : index === 1 ? '#6aaee8' : '#8ec0f0' }}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0.2 + index * 0.1}
            >
              <div className="mb-4">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-4">
                  {program.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{program.title}</h3>
                <p className="text-blue-100 text-sm mb-4">
                  {program.description}
                </p>
              </div>
              <div className="text-3xl font-bold mb-1">{program.students}</div>
              <div className="text-blue-100 text-sm">Students</div>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }
  const parseEnrollmentData = (content: string) => {
    const courses: { name: string; count: number }[] = [];
    // Match pattern: "Course Name - Total: X,XXX students" or "Course Name (Nth Semester) - Total: X,XXX students"
    const matchRegex = /([^.\n]+?)\s*(?:\([^)]*\))?\s*-\s*Total:\s*([\d,]+)\s*students/gi;
    let match;
    while ((match = matchRegex.exec(content)) !== null) {
      const name = match[1].trim().replace(/^\d+\.\s*/, ''); // remove leading "1. " numbering
      const count = parseInt(match[2].replace(/,/g, ''));
      if (name && count > 0) {
        courses.push({ name, count });
      }
    }
    return courses;
  };

  const finalCourses = parseEnrollmentData(courseEnrollmentSection.content);

  const mainCourse = finalCourses.reduce(
    (max, course) => (course.count > max.count ? course : max),
    finalCourses[0] || { name: "", count: 0 }
  );

  const otherCourses = finalCourses.filter(
    (course) => course.name !== mainCourse.name
  );

  const getIcon = (courseName: string) => {
    const name = courseName.toLowerCase();
    if (name.includes("battery") || name.includes("ev")) return <BatteryIcon />;
    if (name.includes("agri") || name.includes("business")) return <WheatIcon />;
    if (name.includes("organic") || name.includes("food production")) return <LeafIcon />;
    if (name.includes("food") || name.includes("analysis")) return <FlaskIcon />;
    return <BatteryIcon />;
  };

  const getBackgroundColor = (index: number) => {
    const colors = ["#4a90d9", "#6aaee8", "#8ec0f0", "#7ab8ec"];
    return colors[index % colors.length];
  };
  const isMobile = window.innerWidth < 768;

  return (
    <section className="bg-white mt-2 sm:-mt-12 md:mt-5 lg:-mt-32 pb-5 px-4 md:px-8 max-w-5xl mx-auto">

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

      {/* Description — gray bordered box like Introduction section */}
      <motion.div
        className="max-w-3xl mx-auto mb-12 border border-gray-200 rounded-2xl px-6 py-6 md:px-8 md:py-8"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        custom={0.15}
      >
        <p className="text-gray-700 font-normal leading-relaxed md:leading-relaxed text-sm md:text-base text-justify md:text-left"
        style={{
    wordSpacing: isMobile ? '-1.9px' : 'normal',
          }}
        >
          {aboutSection.content}
        </p>
      </motion.div>

      {/* Cards Layout - Mobile: 2 cols, Desktop: Original layout */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-4" style={{ minHeight: "auto"}}>

        {/* LEFT: Main Course Card - Hidden on mobile, visible on desktop */}
        {mainCourse.name && (
          <motion.div
            className="hidden md:flex rounded-2xl p-8 flex-col shadow-md"
            style={{ width: "46%", backgroundColor: getBackgroundColor(0) }}
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0.2}
          >
            <div className="mb-4">{getIcon(mainCourse.name)}</div>
            <h3 className="text-white font-bold text-xl mb-2">{mainCourse.name}</h3>
            <p className="text-blue-100 text-sm leading-relaxed mb-3">
              Comprehensive training program in {mainCourse.name.toLowerCase()}.
            </p>
            <div className="mt-3">
              <p className="text-white font-bold text-5xl tracking-tight">
                {mainCourse.count.toLocaleString()}
              </p>
              <p className="text-blue-200 text-sm mt-1">Students Enrolled</p>
            </div>
          </motion.div>
        )}

        {/* RIGHT: Other courses - Mobile: 2x2 grid, Desktop: Original layout */}
        <div className="w-full md:flex-1 flex flex-col gap-4">

          {/* Mobile: 2x2 Grid Layout */}
          <div className="md:hidden grid grid-cols-2 gap-4">
            {finalCourses.map((course, index) => (
              <motion.div
                key={course.name}
                className="rounded-2xl p-4 flex flex-col shadow-md"
                style={{ backgroundColor: getBackgroundColor(index) }}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.2 + index * 0.1}
              >
                <div className="mb-2">{getIcon(course.name)}</div>
                <h3 className="text-white font-bold text-sm mb-2 line-clamp-2">{course.name}</h3>
                <p className="text-white font-bold text-2xl tracking-tight">
                  {course.count.toLocaleString()}
                </p>
                <p className="text-blue-100 text-xs mt-0.5">Students</p>
              </motion.div>
            ))}
          </div>

          {/* Desktop: Original layout */}
          <div className="hidden md:flex flex-col gap-4" style={{ flex: "1 1 0" }}>
            {otherCourses.length === 0 ? null : otherCourses.length === 1 ? (
              /* Only 1 other course — show as single full-width card */
              <motion.div
                key={otherCourses[0].name}
                className="rounded-2xl p-5 flex flex-col flex-1 shadow-md"
                style={{ backgroundColor: getBackgroundColor(1) }}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.3}
              >
                <div className="mb-3">{getIcon(otherCourses[0].name)}</div>
                <h3 className="text-white font-bold text-base mb-3">{otherCourses[0].name}</h3>
                <p className="text-white font-bold text-3xl tracking-tight">
                  {otherCourses[0].count.toLocaleString()}
                </p>
                <p className="text-blue-100 text-xs mt-0.5">Students</p>
              </motion.div>
            ) : (
              <>
                {/* Top row - first 2 */}
                <div className="flex gap-4" style={{ flex: "1 1 0" }}>
                  {otherCourses.slice(0, 2).map((course, index) => (
                    <motion.div
                      key={course.name}
                      className="rounded-2xl p-5 flex flex-col flex-1 shadow-md"
                      style={{ backgroundColor: getBackgroundColor(index + 1) }}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      custom={0.3 + index * 0.15}
                    >
                      <div className="mb-3">{getIcon(course.name)}</div>
                      <h3 className="text-white font-bold text-base mb-3">{course.name}</h3>
                      <p className="text-white font-bold text-3xl tracking-tight">
                        {course.count.toLocaleString()}
                      </p>
                      <p className="text-blue-100 text-xs mt-0.5">Students</p>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom row - 3rd course if exists */}
                {otherCourses.length >= 3 && (
                  <motion.div
                    className="rounded-2xl p-10 flex flex-row items-center justify-between shadow-md"
                    style={{ height: "42%", flexShrink: 0, backgroundColor: getBackgroundColor(3) }}
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    custom={0.55}
                  >
                    <div>
                      <div className="mb-2">{getIcon(otherCourses[2].name)}</div>
                      <h3 className="text-white font-bold text-base">{otherCourses[2].name}</h3>
                      <p className="text-blue-100 text-xs leading-relaxed mt-1">
                        Specialized training in {otherCourses[2].name.toLowerCase()}.
                      </p>
                    </div>
                    <div className="text-right ml-6 flex-shrink-0">
                      <p className="text-white font-bold text-3xl tracking-tight">
                        {otherCourses[2].count.toLocaleString()}
                      </p>
                      <p className="text-blue-100 text-xs mt-0.5">Students Enrolled</p>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NaanAboutProgramme;