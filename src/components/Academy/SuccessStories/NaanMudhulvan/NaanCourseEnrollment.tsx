

// import React from "react";
// import { motion } from "framer-motion";
// import { 
//   GraduationCap, 
//   Sprout, 
//   Zap, 
//   FlaskConical, 
//   Leaf, 
//   Stethoscope,
//   Building2
// } from "lucide-react";

// interface University {
//   name: string;
//   students: number;
// }

// interface Course {
//   title: string;
//   semester: string;
//   totalStudents: number;
//   universities: University[];
//   icon: React.ReactNode;
// }

// interface CourseEnrollmentSection {
//   title: string;
//   content: string;
// }

// interface NaanCourseEnrollmentProps {
//   courseEnrollmentSection: CourseEnrollmentSection;
// }

// // ── Animation Variants ──────────────────────────────────────────────
// const fadeUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: (delay = 0) => ({
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.55, ease: "easeOut", delay },
//   }),
// };

// const cardVariant = {
//   hidden: { opacity: 0, y: 40, scale: 0.97 },
//   visible: (delay = 0) => ({
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: { duration: 0.55, ease: "easeOut", delay },
//   }),
// };

// const iconPop = {
//   hidden: { opacity: 0, scale: 0.4 },
//   visible: (delay = 0) => ({
//     opacity: 1,
//     scale: 1,
//     transition: { duration: 0.4, ease: "backOut", delay },
//   }),
// };

// const rowSlide = {
//   hidden: { opacity: 0, x: -16 },
//   visible: (delay = 0) => ({
//     opacity: 1,
//     x: 0,
//     transition: { duration: 0.38, ease: "easeOut", delay },
//   }),
// };

// const dividerGrow = {
//   hidden: { scaleX: 0, opacity: 0 },
//   visible: (delay = 0) => ({
//     scaleX: 1,
//     opacity: 1,
//     transition: { duration: 0.5, ease: "easeOut", delay },
//   }),
// };
// // ────────────────────────────────────────────────────────────────────

// const CourseCard: React.FC<{ course: Course; cardDelay: number }> = ({ course, cardDelay }) => {
//   return (
//     <motion.div
//       className="bg-white rounded-2xl border border-blue-100 shadow-xl"
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         height: "100%",
//         padding: "clamp(14px, 4vw, 32px)",
//       }}
//       variants={cardVariant}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, amount: 0.15 }}
//       custom={cardDelay}
//       whileHover={{ y: -4, boxShadow: "0 24px 48px rgba(59,163,199,0.13)" }}
//     >
//       {/* Card Header */}
//       <div className="flex items-start justify-between mb-5">
//         <div className="flex items-center gap-2">
//           {/* Icon */}
//           <motion.div
//             className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
//             style={{ backgroundColor: "#EDF5FF" }}
//             variants={iconPop}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             custom={cardDelay + 0.15}
//           >
//             {course.icon}
//           </motion.div>

//           <motion.div
//             style={{ minWidth: 0 }}
//             variants={fadeUp}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             custom={cardDelay + 0.2}
//           >
//             <h2
//               className="font-semibold text-gray-900 leading-tight"
//               style={{ fontSize: "clamp(13px, 3.5vw, 18px)" }}
//             >
//               {course.title}
//             </h2>
//             <p className="text-xs text-gray-500 mt-0.5">{course.semester}</p>
//           </motion.div>
//         </div>

//         {/* Total count */}
//         <motion.div
//           className="text-right flex-shrink-0 ml-2"
//           variants={fadeUp}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           custom={cardDelay + 0.25}
//         >
//           <p className="font-bold text-gray-900" style={{ fontSize: "clamp(13px, 3.5vw, 18px)" }}>
//             {course.totalStudents.toLocaleString()}
//           </p>
//           <p className="text-xs text-gray-500">Total Students</p>
//         </motion.div>
//       </div>

//       {/* Table Header */}
//       <motion.div
//         className="flex justify-between text-xs font-semibold uppercase tracking-widest text-gray-400 px-2 pb-2 border-b border-gray-100 mb-2"
//         style={{ transformOrigin: "left center" }}
//         variants={dividerGrow}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         custom={cardDelay + 0.3}
//       >
//         <span>University</span>
//         <span>Students</span>
//       </motion.div>

//       {/* University Rows */}
//       <div
//         style={{
//           maxHeight: "144px",
//           overflowY: course.universities.length >= 3 ? "auto" : "visible",
//           scrollbarWidth: "thin",
//           scrollbarColor: "#BFDBFE transparent",
//           flex: 1,
//         }}
//       >
//         <div className="space-y-2 pr-1">
//           {course.universities.map((uni, index) => (
//             <motion.div
//               key={index}
//               className="flex items-center justify-between w-full"
//               style={{
//                 backgroundColor: "#EDF5FF",
//                 minHeight: "40px",
//                 borderRadius: "12px",
//                 padding: "6px clamp(6px, 2vw, 12px)",
//                 gap: "8px",
//               }}
//               variants={rowSlide}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               custom={cardDelay + 0.35 + index * 0.08}
//             >
//               <div className="flex items-center gap-1.5" style={{ minWidth: 0, flex: 1 }}>
//                 <Building2 className="w-3 h-3 text-blue-500 flex-shrink-0" />
//                 <span
//                   className="font-normal text-gray-800"
//                   style={{
//                     fontSize: "clamp(11px, 3vw, 14px)",
//                     whiteSpace: "nowrap",
//                     overflow: "hidden",
//                     textOverflow: "ellipsis",
//                   }}
//                 >
//                   {uni.name}
//                 </span>
//               </div>
//               <span
//                 className="font-medium text-gray-800 flex-shrink-0"
//                 style={{ fontSize: "clamp(11px, 3vw, 14px)" }}
//               >
//                 {uni.students.toLocaleString()}
//               </span>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Footer Total */}
//       <motion.div
//         className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100"
//         variants={fadeUp}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         custom={cardDelay + 0.5}
//       >
//         <span className="text-sm text-gray-500">Total</span>
//         <span className="text-sm font-bold text-gray-900">
//           {course.totalStudents.toLocaleString()}
//         </span>
//       </motion.div>
//     </motion.div>
//   );
// };

// const NaanCourseEnrollment: React.FC<NaanCourseEnrollmentProps> = ({
//   courseEnrollmentSection,
// }) => {
//   const parseEnrollmentData = (content: string): Course[] => {
//     const courses: Course[] = [];
    
//     const courseMatches = content.match(/([^.]+) - Total: ([\d,]+) students across ([^.]+)\./g);
    
//     if (courseMatches) {
//       courseMatches.forEach((match) => {
//         const [, courseName, totalStr, universitiesStr] = match.match(/([^-]+) - Total: ([\d,]+) students across ([^.]+)\./) || [];
        
//         if (courseName && totalStr && universitiesStr) {
//           const cleanCourseName = courseName.trim();
//           const totalStudents = parseInt(totalStr.replace(/,/g, ''));
          
//           const universities: University[] = [];
//           const universityPattern = /([^,(]+?)\s*\(([0-9,]+)\)/g;
          
//           let uniMatch;
//           while ((uniMatch = universityPattern.exec(universitiesStr)) !== null) {
//             const [, uniName, studentsStr] = uniMatch;
//             universities.push({
//               name: uniName.trim(),
//               students: parseInt(studentsStr.replace(/,/g, '')),
//             });
//           }
          
//           const getIcon = (name: string) => {
//             const n = name.toLowerCase();
//             if (n.includes('agri') || n.includes('business')) return <Sprout className="w-5 h-5 text-blue-500" />;
//             if (n.includes('battery') || n.includes('ev')) return <Zap className="w-5 h-5 text-blue-500" />;
//             if (n.includes('food') && n.includes('analysis')) return <FlaskConical className="w-5 h-5 text-blue-500" />;
//             if (n.includes('organic') || n.includes('food production')) return <Leaf className="w-5 h-5 text-blue-500" />;
//             if (n.includes('medical') || n.includes('coding')) return <Stethoscope className="w-5 h-5 text-blue-500" />;
//             return <GraduationCap className="w-5 h-5 text-blue-500" />;
//           };
          
//           courses.push({
//             title: cleanCourseName,
//             semester: "Even Semester 2024-25",
//             totalStudents,
//             universities,
//             icon: getIcon(cleanCourseName),
//           });
//         }
//       });
//     }
    
//     return courses;
//   };

//   const courses = parseEnrollmentData(courseEnrollmentSection.content);

//   return (
//     <div className="min-h-screen bg-white py-16 md:py-32 px-4 md:px-10">
//       {/* Title */}
//       <motion.h1
//         className="font-bold text-center text-gray-900 mb-12 md:mb-16 text-2xl md:text-4xl"
//         variants={fadeUp}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.3 }}
//         custom={0}
//       >
//         {courseEnrollmentSection.title}
//       </motion.h1>

//       {/* Grid */}
//       {/* <div
//         className="max-w-6xl mx-auto"
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
//           gap: "24px",
//           alignItems: "start",
//         }}
//       >
//         {courses.map((course, index) => (
//           <CourseCard
//             key={index}
//             course={course}
//             cardDelay={index * 0.12}
//           />
//         ))}
//       </div> */}
//       <div
//   className="max-w-6xl mx-auto"
//   style={{
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
//     gap: "24px",
//     alignItems: "stretch",   // ← only change "start" to "stretch"
//   }}
// >
//   {courses.map((course, index) => {
//     const isLastOdd = courses.length % 2 !== 0 && index === courses.length - 1;
//     return (
//       <div
//         key={index}
//         style={{
//           gridColumn: isLastOdd ? "1 / -1" : undefined,
//           maxWidth: isLastOdd ? "calc(50% - 12px)" : undefined,
//           margin: isLastOdd ? "0 auto" : undefined,
//           width: "100%",
//         }}
//       >
//         <CourseCard
//           course={course}
//           cardDelay={index * 0.12}
//         />
//       </div>
//     );
//   })}
// </div>
//     </div>
//   );
// };

// export default NaanCourseEnrollment;


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

interface University {
  name: string;
  students: number;
}

interface Course {
  title: string;
  totalStudents: number;
  universities: University[];
  icon: React.ReactNode;
}

interface CourseEnrollmentSection {
  title: string;
  content: string;
}

interface NaanCourseEnrollmentProps {
  courseEnrollmentSection: CourseEnrollmentSection;
}

// ── Animation Variants ──────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay },
  }),
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut", delay },
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

const rowSlide = {
  hidden: { opacity: 0, x: -16 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.38, ease: "easeOut", delay },
  }),
};

const dividerGrow = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: (delay = 0) => ({
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut", delay },
  }),
};
// ────────────────────────────────────────────────────────────────────

const CourseCard: React.FC<{ course: Course; cardDelay: number }> = ({ course, cardDelay }) => {
  return (
    <motion.div
      className="bg-white rounded-2xl border border-blue-100 shadow-xl"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "clamp(14px, 4vw, 32px)",
      }}
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
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#EDF5FF" }}
            variants={iconPop}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={cardDelay + 0.15}
          >
            {course.icon}
          </motion.div>

          <motion.div
            style={{ minWidth: 0 }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={cardDelay + 0.2}
          >
            <h2
              className="font-semibold text-gray-900 leading-tight"
              style={{ fontSize: "clamp(13px, 3.5vw, 18px)" }}
            >
              {course.title}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">{course.semester}</p>
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
          <p className="font-bold text-gray-900" style={{ fontSize: "clamp(13px, 3.5vw, 18px)" }}>
            {course.totalStudents.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">Total Students</p>
        </motion.div>
      </div>

      {/* Table Header */}
      <motion.div
        className="flex justify-between text-xs font-semibold uppercase tracking-widest text-gray-400 px-2 pb-2 border-b border-gray-100 mb-2"
        style={{ transformOrigin: "left center" }}
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
      <div
        style={{
          maxHeight: "144px",
          overflowY: course.universities.length >= 3 ? "auto" : "visible",
          scrollbarWidth: "thin",
          scrollbarColor: "#BFDBFE transparent",
          flex: 1,
        }}
      >
        <div className="space-y-2 pr-1">
          {course.universities.map((uni, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between w-full"
              style={{
                backgroundColor: "#EDF5FF",
                minHeight: "40px",
                borderRadius: "12px",
                padding: "6px clamp(6px, 2vw, 12px)",
                gap: "8px",
              }}
              variants={rowSlide}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={cardDelay + 0.35 + index * 0.08}
            >
              <div className="flex items-center gap-1.5" style={{ minWidth: 0, flex: 1 }}>
                <Building2 className="w-3 h-3 text-blue-500 flex-shrink-0" />
                <span
                  className="font-normal text-gray-800"
                  style={{
                    fontSize: "clamp(11px, 3vw, 14px)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {uni.name}
                </span>
              </div>
              <span
                className="font-medium text-gray-800 flex-shrink-0"
                style={{ fontSize: "clamp(11px, 3vw, 14px)" }}
              >
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

const NaanCourseEnrollment: React.FC<NaanCourseEnrollmentProps> = ({
  courseEnrollmentSection,
}) => {
  // ✅ ONLY FIX: track window width to detect mobile
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" ? window.innerWidth < 840 : false
  );

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 840);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const parseEnrollmentData = (content: string): Course[] => {
    const courses: Course[] = [];
    
    const courseMatches = content.match(/([^.]+) - Total: ([\d,]+) students across ([^.]+)\./g);
    
    if (courseMatches) {
      courseMatches.forEach((match) => {
        const [, courseName, totalStr, universitiesStr] = match.match(/([^-]+) - Total: ([\d,]+) students across ([^.]+)\./) || [];
        
        if (courseName && totalStr && universitiesStr) {
          const cleanCourseName = courseName.trim();
          const totalStudents = parseInt(totalStr.replace(/,/g, ''));
          
          const universities: University[] = [];
          const universityPattern = /([^,(]+?)\s*\(([0-9,]+)\)/g;
          
          let uniMatch;
          while ((uniMatch = universityPattern.exec(universitiesStr)) !== null) {
            const [, uniName, studentsStr] = uniMatch;
            universities.push({
              name: uniName.trim(),
              students: parseInt(studentsStr.replace(/,/g, '')),
            });
          }
          
          const getIcon = (name: string) => {
            const n = name.toLowerCase();
            if (n.includes('agri') || n.includes('business')) return <Sprout className="w-5 h-5 text-blue-500" />;
            if (n.includes('battery') || n.includes('ev')) return <Zap className="w-5 h-5 text-blue-500" />;
            if (n.includes('food') && n.includes('analysis')) return <FlaskConical className="w-5 h-5 text-blue-500" />;
            if (n.includes('organic') || n.includes('food production')) return <Leaf className="w-5 h-5 text-blue-500" />;
            if (n.includes('medical') || n.includes('coding')) return <Stethoscope className="w-5 h-5 text-blue-500" />;
            return <GraduationCap className="w-5 h-5 text-blue-500" />;
          };
          
          courses.push({
            title: cleanCourseName,
            totalStudents,
            universities,
            icon: getIcon(cleanCourseName),
          });
        }
      });
    }
    
    return courses;
  };

  const courses = parseEnrollmentData(courseEnrollmentSection.content);

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
      <div
        className="max-w-6xl mx-auto"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
          gap: "24px",
          alignItems: "stretch",
        }}
      >
        {courses.map((course, index) => {
          const isLastOdd = courses.length % 2 !== 0 && index === courses.length - 1;
          return (
            <div
              key={index}
              style={{
                gridColumn: isLastOdd ? "1 / -1" : undefined,
                maxWidth: isLastOdd && !isMobile ? "calc(50% - 12px)" : undefined, // ✅ skip on mobile
                margin: isLastOdd && !isMobile ? "0 auto" : undefined,             // ✅ skip on mobile
                width: "100%",
              }}
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
};

export default NaanCourseEnrollment;