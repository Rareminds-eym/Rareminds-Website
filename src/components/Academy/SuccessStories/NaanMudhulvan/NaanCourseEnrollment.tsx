
// import React from "react";
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

// const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
//   return (
//     <div
//       className="bg-white rounded-2xl border border-blue-100 p-8 shadow-xl"
//       style={{ display: "flex", flexDirection: "column", height: "100%" }}
//     >
//       {/* Card Header */}
//       <div className="flex items-start justify-between mb-5">
//         <div className="flex items-center gap-3">
//           <div
//             className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
//             style={{ backgroundColor: "#EDF5FF" }}
//           >
//             {course.icon}
//           </div>
//           <div>
//             <h2 className="text-lg font-semibold text-gray-900 leading-tight">
//               {course.title}
//             </h2>
//             <p className="text-xs text-gray-500 mt-0.5">{course.semester}</p>
//           </div>
//         </div>
//         <div className="text-right flex-shrink-0 ml-4">
//           <p className="text-lg leading-2 font-bold text-gray-900">
//             {course.totalStudents.toLocaleString()}
//           </p>
//           <p className="text-xs text-gray-500">Total Students</p>
//         </div>
//       </div>

//       {/* Table Header */}
//       <div className="flex justify-between text-xs font-semibold uppercase tracking-widest text-gray-400 px-3 pb-2 border-b border-gray-100 mb-2">
//         <span>University</span>
//         <span>Students</span>
//       </div>

//       {/* University Rows — scrollable after 3 entries */}
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
//             <div
//               key={index}
//               className="flex items-center justify-between px-3 w-full"
//               style={{
//                 backgroundColor: "#EDF5FF",
//                 height: "48px",
//                 borderRadius: "16px",
//               }}
//             >
//               <div className="flex items-center gap-2.5">
//                 <div
//                   className="flex items-center justify-center flex-shrink-0"
//                 >
//                   <Building2 className="w-3 h-3 text-blue-500" />
//                 </div>
//                 <span className="text-sm font-normal text-gray-800">
//                   {uni.name}
//                 </span>
//               </div>
//               <span className="text-sm font-medium text-gray-800">
//                 {uni.students.toLocaleString()}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Footer Total */}
//       <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
//         <span className="text-sm text-gray-500">Total</span>
//         <span className="text-sm font-bold text-gray-900">
//           {course.totalStudents.toLocaleString()}
//         </span>
//       </div>
//     </div>
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
//     <div className="min-h-screen bg-white py-32 px-10">
//       <h1
//         className="font-bold text-center text-gray-900 mb-16 text-4xl"
//       >
//         {courseEnrollmentSection.title}
//       </h1>
//       <div
//         className="max-w-6xl mx-auto"
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
//           gap: "24px",
//           alignItems: "start",
//         }}
//       >
//         {courses.map((course, index) => (
//           <CourseCard key={index} course={course} />
//         ))}
//       </div>
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
  Building2,
} from "lucide-react";

interface University {
  name: string;
  students: number;
}

interface Course {
  title: string;
  semester: string;
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
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const rowVariant = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const staggerRows = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};
// ────────────────────────────────────────────────────────────────────

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <motion.div
      className="bg-white rounded-2xl border border-blue-100 p-8 shadow-xl"
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
      variants={cardVariant}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#EDF5FF" }}
          >
            {course.icon}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 leading-tight">
              {course.title}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">{course.semester}</p>
          </div>
        </div>
        <div className="text-right flex-shrink-0 ml-4">
          <p className="text-lg leading-2 font-bold text-gray-900">
            {course.totalStudents.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">Total Students</p>
        </div>
      </div>

      {/* Table Header */}
      <div className="flex justify-between text-xs font-semibold uppercase tracking-widest text-gray-400 px-3 pb-2 border-b border-gray-100 mb-2">
        <span>University</span>
        <span>Students</span>
      </div>

      {/* University Rows — staggered fade in */}
      <div
        style={{
          maxHeight: "144px",
          overflowY: course.universities.length >= 3 ? "auto" : "visible",
          scrollbarWidth: "thin",
          scrollbarColor: "#BFDBFE transparent",
          flex: 1,
        }}
      >
        <motion.div
          className="space-y-2 pr-1"
          variants={staggerRows}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {course.universities.map((uni, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between px-3 w-full"
              style={{
                backgroundColor: "#EDF5FF",
                height: "48px",
                borderRadius: "16px",
              }}
              variants={rowVariant}
            >
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-3 h-3 text-blue-500" />
                </div>
                <span className="text-sm font-normal text-gray-800">
                  {uni.name}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-800">
                {uni.students.toLocaleString()}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Footer Total */}
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
        <span className="text-sm text-gray-500">Total</span>
        <span className="text-sm font-bold text-gray-900">
          {course.totalStudents.toLocaleString()}
        </span>
      </div>
    </motion.div>
  );
};

const NaanCourseEnrollment: React.FC<NaanCourseEnrollmentProps> = ({
  courseEnrollmentSection,
}) => {
  const parseEnrollmentData = (content: string): Course[] => {
    const courses: Course[] = [];

    const courseMatches = content.match(
      /([^.]+) - Total: ([\d,]+) students across ([^.]+)\./g
    );

    if (courseMatches) {
      courseMatches.forEach((match) => {
        const parts = match.match(
          /([^-]+) - Total: ([\d,]+) students across ([^.]+)\./
        );
        if (parts && parts[1] && parts[2] && parts[3]) {
          const cleanCourseName = parts[1].trim();
          const totalStudents = parseInt(parts[2].replace(/,/g, ""));
          const universitiesStr = parts[3];

          const universities: University[] = [];
          const universityPattern = /([^,(]+?)\s*\(([0-9,]+)\)/g;

          let uniMatch;
          while ((uniMatch = universityPattern.exec(universitiesStr)) !== null) {
            universities.push({
              name: uniMatch[1].trim(),
              students: parseInt(uniMatch[2].replace(/,/g, "")),
            });
          }

          const getIcon = (name: string) => {
            const n = name.toLowerCase();
            if (n.includes("agri") || n.includes("business"))
              return <Sprout className="w-5 h-5 text-blue-500" />;
            if (n.includes("battery") || n.includes("ev"))
              return <Zap className="w-5 h-5 text-blue-500" />;
            if (n.includes("food") && n.includes("analysis"))
              return <FlaskConical className="w-5 h-5 text-blue-500" />;
            if (n.includes("organic") || n.includes("food production"))
              return <Leaf className="w-5 h-5 text-blue-500" />;
            if (n.includes("medical") || n.includes("coding"))
              return <Stethoscope className="w-5 h-5 text-blue-500" />;
            return <GraduationCap className="w-5 h-5 text-blue-500" />;
          };

          courses.push({
            title: cleanCourseName,
            semester: "Even Semester 2024-25",
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
    <div className="min-h-screen bg-white py-32 px-10">

      {/* Title — fade up */}
      <motion.h1
        className="font-bold text-center text-gray-900 mb-16 text-4xl"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        custom={0}
      >
        {courseEnrollmentSection.title}
      </motion.h1>

      {/* Cards Grid — staggered children */}
      <motion.div
        className="max-w-6xl mx-auto"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
          gap: "24px",
          alignItems: "start",
        }}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </motion.div>
    </div>
  );
};

export default NaanCourseEnrollment;
