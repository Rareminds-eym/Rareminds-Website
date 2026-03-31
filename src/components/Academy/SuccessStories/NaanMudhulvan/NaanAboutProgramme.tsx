// import React from "react";

// interface AboutSection {
//   title: string;
//   content: string;
// }

// interface CourseEnrollmentSection {
//   title: string;
//   content: string;
// }

// interface NaanAboutProgrammeProps {
//   aboutSection: AboutSection;
//   courseEnrollmentSection: CourseEnrollmentSection;
// }

// const BatteryIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="w-7 h-7 text-white opacity-90"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//     strokeWidth={1.8}
//   >
//     <rect x="1" y="7" width="16" height="10" rx="2" stroke="currentColor" strokeWidth={1.8} fill="none" />
//     <path d="M19 10v4" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" />
//   </svg>
// );

// const WheatIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="w-6 h-6 text-white opacity-80"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//     strokeWidth={1.6}
//   >
//     <path d="M12 22V11" strokeLinecap="round" />
//     <path d="M12 11C12 11 8.5 9.5 7.5 6C9.5 6 11.5 7.5 12 9.5" strokeLinecap="round" strokeLinejoin="round" />
//     <path d="M12 11C12 11 15.5 9.5 16.5 6C14.5 6 12.5 7.5 12 9.5" strokeLinecap="round" strokeLinejoin="round" />
//     <path d="M12 15C12 15 8.5 13.5 7.5 10C9.5 10 11.5 11.5 12 13.5" strokeLinecap="round" strokeLinejoin="round" />
//     <path d="M12 15C12 15 15.5 13.5 16.5 10C14.5 10 12.5 11.5 12 13.5" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// const LeafIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="w-6 h-6 text-white opacity-80"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//     strokeWidth={1.6}
//   >
//     <path
//       d="M17 8C17 8 16 3 9 3C9 3 4 8 6 15C8 20 12 21 12 21"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path d="M9 21C9 21 9 15 17 11" strokeLinecap="round" />
//   </svg>
// );

// const FlaskIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="w-6 h-6 text-white opacity-80"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//     strokeWidth={1.6}
//   >
//     <path
//       d="M9 3h6M9 3v7L5 17a2 2 0 001.8 2.9h10.4A2 2 0 0019 17l-4-7V3"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path d="M7.5 15.5h9" strokeLinecap="round" />
//   </svg>
// );

// const NaanAboutProgramme: React.FC<NaanAboutProgrammeProps> = ({ 
//   aboutSection, 
//   courseEnrollmentSection 
// }) => {
//   // Parse course names from about section content
//   const parseCoursesFromAbout = (content: string) => {
//     // Extract course names mentioned in the about section
//     const courseMatches = content.match(/([A-Z][^,.:]+(?:Management|Systems|Preservation|Production|Coding|Analysis)[^,.:]*)/g);
//     return courseMatches || [];
//   };

//   // Parse enrollment data to extract numbers
//   const parseEnrollmentData = (content: string) => {
//     const courses: { [key: string]: number } = {};
    
//     // Extract numbers after "Total: " for each course
//     const matches = content.match(/([^.]+) - Total: ([\d,]+) students/g);
    
//     if (matches) {
//       matches.forEach(match => {
//         const [, courseName, studentCount] = match.match(/([^-]+) - Total: ([\d,]+) students/) || [];
//         if (courseName && studentCount) {
//           const cleanCourseName = courseName.trim();
//           const cleanCount = parseInt(studentCount.replace(/,/g, ''));
//           courses[cleanCourseName] = cleanCount;
//         }
//       });
//     }
    
//     return courses;
//   };

//   const coursesFromAbout = parseCoursesFromAbout(aboutSection.content);
//   const enrollmentData = parseEnrollmentData(courseEnrollmentSection.content);
  
//   // Match courses from about section with enrollment data
//   const matchedCourses = coursesFromAbout.map(courseName => {
//     // Try to find matching enrollment data
//     let matchedCount = 0;
//     let matchedKey = '';
    
//     // Look for exact match or partial match
//     Object.keys(enrollmentData).forEach(enrollmentKey => {
//       if (enrollmentKey.includes(courseName) || courseName.includes(enrollmentKey.split(' ')[0])) {
//         matchedCount = enrollmentData[enrollmentKey];
//         matchedKey = enrollmentKey;
//       }
//     });
    
//     return {
//       name: courseName,
//       count: matchedCount,
//       enrollmentKey: matchedKey
//     };
//   });

//   // If no matches from about section, use enrollment data directly
//   const finalCourses = matchedCourses.length > 0 ? matchedCourses : 
//     Object.keys(enrollmentData).map(key => ({
//       name: key,
//       count: enrollmentData[key],
//       enrollmentKey: key
//     }));

//   // Get the course with highest enrollment for the main card
//   const mainCourse = finalCourses.reduce((max, course) => 
//     course.count > max.count ? course : max, 
//     finalCourses[0] || {name: '', count: 0, enrollmentKey: ''}
//   );
  
//   // Get other courses for smaller cards
//   const otherCourses = finalCourses.filter(course => course.name !== mainCourse.name);

//   // Function to get appropriate icon based on course name
//   const getIcon = (courseName: string) => {
//     const name = courseName.toLowerCase();
//     if (name.includes('battery') || name.includes('ev')) return <BatteryIcon />;
//     if (name.includes('agri') || name.includes('business')) return <WheatIcon />;
//     if (name.includes('organic') || name.includes('food production')) return <LeafIcon />;
//     if (name.includes('food') || name.includes('analysis')) return <FlaskIcon />;
//     return <BatteryIcon />; // default
//   };

//   // Function to get background color based on index
//   const getBackgroundColor = (index: number) => {
//     const colors = ["#4a90d9", "#6aaee8", "#8ec0f0", "#7ab8ec"];
//     return colors[index % colors.length];
//   };

//   return (
//     <section className="bg-white -mt-24 pb-3 px-8 max-w-5xl mx-auto">
//       {/* Title */}
//       <h2 className="text-center font-extrabold text-gray-900 mb-8 tracking-tight text-4xl">
//         {aboutSection.title}
//       </h2>

//       {/* Description */}
//       <p className="text-gray-700 font-normal leading-relaxed max-w-3xl mx-auto mb-12 text-base">
//         {aboutSection.content}
//       </p>

//       {/* Cards Layout */}
//       <div className="flex gap-4" style={{ height: 360 }}>
//         {/* LEFT: Main Course — tall rectangle spanning full height */}
//         {mainCourse.name && (
//           <div
//             className="rounded-2xl p-8 flex flex-col shadow-md"
//             style={{ width: "46%", backgroundColor: getBackgroundColor(0) }}
//           >
//             <div className="mb-4">
//               {getIcon(mainCourse.name)}
//             </div>
//             <h3 className="text-white font-bold text-xl mb-2">{mainCourse.name}</h3>
//             <p className="text-blue-100 text-sm leading-relaxed mb-3">
//               Comprehensive training program in {mainCourse.name.toLowerCase()}.
//             </p>
//             <div className="mt-3">
//               <p className="text-white font-bold text-5xl tracking-tight">
//                 {mainCourse.count.toLocaleString()}
//               </p>
//               <p className="text-blue-200 text-sm mt-1">Students Enrolled</p>
//             </div>
//           </div>
//         )}

//         {/* RIGHT: Other courses */}
//         <div className="flex flex-col gap-4 flex-1">
//           {/* Top row: First two other courses */}
//           {otherCourses.length >= 2 && (
//             <div className="flex gap-4" style={{ flex: "1 1 0" }}>
//               {otherCourses.slice(0, 2).map((course, index) => (
//                 <div
//                   key={course.name}
//                   className="rounded-2xl p-5 flex flex-col flex-1 shadow-md"
//                   style={{ backgroundColor: getBackgroundColor(index + 1) }}
//                 >
//                   <div className="mb-3">
//                     {getIcon(course.name)}
//                   </div>
//                   <h3 className="text-white font-bold text-base mb-3">{course.name}</h3>
//                   <p className="text-white font-bold text-3xl tracking-tight">
//                     {course.count.toLocaleString()}
//                   </p>
//                   <p className="text-blue-100 text-xs mt-0.5">Students</p>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Bottom row: Third course if exists */}
//           {otherCourses.length >= 3 && (
//             <div
//               className="rounded-2xl p-5 flex flex-row items-center justify-between shadow-md"
//               style={{ height: "42%", flexShrink: 0, backgroundColor: getBackgroundColor(3) }}
//             >
//               <div>
//                 <div className="mb-2">
//                   {getIcon(otherCourses[2].name)}
//                 </div>
//                 <h3 className="text-white font-bold text-base">{otherCourses[2].name}</h3>
//                 <p className="text-blue-100 text-xs leading-relaxed mt-1">
//                   Specialized training in {otherCourses[2].name.toLowerCase()}.
//                 </p>
//               </div>
//               <div className="text-right ml-6 flex-shrink-0">
//                 <p className="text-white font-bold text-3xl tracking-tight">
//                   {otherCourses[2].count.toLocaleString()}
//                 </p>
//                 <p className="text-blue-100 text-xs mt-0.5">Students Enrolled</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default NaanAboutProgramme;


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
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut", delay },
  }),
};
// ────────────────────────────────────────────────────────────────────

const NaanAboutProgramme: React.FC<NaanAboutProgrammeProps> = ({
  aboutSection,
  courseEnrollmentSection,
}) => {
  const parseCoursesFromAbout = (content: string) => {
    const regex = /([A-Z][^,.:]+(?:Management|Systems|Preservation|Production|Coding|Analysis)[^,.:]*)/ ;
    const courseMatches = content.match(new RegExp(regex.source, "g"));
    return courseMatches || [];
  };

  const parseEnrollmentData = (content: string) => {
    const courses: { [key: string]: number } = {};
    const matchRegex = /([^.]+) - Total: ([\d,]+) students/g;
    const matches = content.match(matchRegex);
    if (matches) {
      matches.forEach((match) => {
        const parts = match.match(/([^-]+) - Total: ([\d,]+) students/);
        if (parts && parts[1] && parts[2]) {
          const courseName = parts[1].trim();
          const studentCount = parseInt(parts[2].replace(/,/g, ""));
          courses[courseName] = studentCount;
        }
      });
    }
    return courses;
  };

  const coursesFromAbout = parseCoursesFromAbout(aboutSection.content);
  const enrollmentData = parseEnrollmentData(courseEnrollmentSection.content);

  const matchedCourses = coursesFromAbout.map((courseName) => {
    let matchedCount = 0;
    let matchedKey = "";
    Object.keys(enrollmentData).forEach((enrollmentKey) => {
      if (
        enrollmentKey.includes(courseName) ||
        courseName.includes(enrollmentKey.split(" ")[0])
      ) {
        matchedCount = enrollmentData[enrollmentKey];
        matchedKey = enrollmentKey;
      }
    });
    return { name: courseName, count: matchedCount, enrollmentKey: matchedKey };
  });

  const finalCourses =
    matchedCourses.length > 0
      ? matchedCourses
      : Object.keys(enrollmentData).map((key) => ({
          name: key,
          count: enrollmentData[key],
          enrollmentKey: key,
        }));

  const mainCourse = finalCourses.reduce(
    (max, course) => (course.count > max.count ? course : max),
    finalCourses[0] || { name: "", count: 0, enrollmentKey: "" }
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

  return (
    <section className="bg-white -mt-24 pb-3 px-8 max-w-5xl mx-auto">

      {/* Title */}
      <motion.h2
        className="text-center font-extrabold text-gray-900 mb-8 tracking-tight text-4xl"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        custom={0}
      >
        {aboutSection.title}
      </motion.h2>

      {/* Description */}
      <motion.p
        className="text-gray-700 font-normal leading-relaxed max-w-3xl mx-auto mb-12 text-base"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        custom={0.15}
      >
        {aboutSection.content}
      </motion.p>

      {/* Cards Layout */}
      <div className="flex gap-4" style={{ height: 360 }}>

        {/* LEFT: Main Course Card */}
        {mainCourse.name && (
          <motion.div
            className="rounded-2xl p-8 flex flex-col shadow-md"
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

        {/* RIGHT: Other courses */}
        <div className="flex flex-col gap-4 flex-1">

          {/* Top row */}
          {otherCourses.length >= 2 && (
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
          )}

          {/* Bottom row */}
          {otherCourses.length >= 3 && (
            <motion.div
              className="rounded-2xl p-5 flex flex-row items-center justify-between shadow-md"
              style={{
                height: "42%",
                flexShrink: 0,
                backgroundColor: getBackgroundColor(3),
              }}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0.55}
            >
              <div>
                <div className="mb-2">{getIcon(otherCourses[2].name)}</div>
                <h3 className="text-white font-bold text-base">
                  {otherCourses[2].name}
                </h3>
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
        </div>
      </div>
    </section>
  );
};

export default NaanAboutProgramme;