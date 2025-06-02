// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { ArrowLeft, CheckCircle } from "lucide-react";
// import { coursesData } from "./Data/coursesData";
// import AcademyHeader from "@/components/Header/AcademyHeader";

// const CourseDetailedPage = () => {
//   const { id, courseId } = useParams<{ id?: string; courseId?: string }>();
//   const navigate = useNavigate();
//   const course = coursesData.find((c) => c.id === (id || courseId));

//   if (!course) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold mb-4">Course not found</h1>
//           <button
//             onClick={() => navigate(-1)}
//             className="text-blue-600 hover:text-blue-800"
//           >
//             Go back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//     <AcademyHeader />
//     <div className="pt-20 ]">
//       {/* Header Banner */}
//       <div className="relative h-[40vh] overflow-hidden">
//         <img
//           src={course.heroImage}
//           alt={course.name}
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
//         <div className="absolute inset-0 flex items-center">
//           <div className="container mx-auto px-6">
//             <motion.button
//               onClick={() => navigate(-1)}
//               whileHover={{ x: -5 }}
//               className="text-white text-sm mb-4 flex items-center gap-2"
//             >
//               <ArrowLeft className="w-4 h-4" />
//               Back to Courses
//             </motion.button>
//             <h1 className="pt-4 text-2xl md:text-4xl font-bold text-white mb-4">
//               {course.name}
//             </h1>
//             {course.shortName && (
//               <p className="pt-4 text-lg text-white/90">{course.shortName}</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Info Section */}
//       <div className="container mx-auto px-3 py-12">
//         <div className="grid md:grid-cols-5 gap-x-20 px-4 md:px-20">
//           {/* About The Course */}
//           <div className="md:col-span-3">
//             <motion.h2
//               className="text-2xl font-bold mb-6 p-4"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//             >
//               About The Course
//             </motion.h2>
//             <motion.p
//               className="text-gray-700 leading-relaxed text-justify text-medium px-4"
//               initial={{ opacity: 0, y: 10 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//             >
//               {course.description}
//             </motion.p>
//           </div>

//           {/* Program Benefits */}
//           <div className="md:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 p-10 rounded-2xl mt-10 md:mt-0">
//             <motion.h2
//               className="text-2xl font-bold mb-6"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//             >
//               Schools Across India Are Making the Shift. Here’s Why:
//             </motion.h2>
//             <motion.ul
//               className="space-y-4"
//               initial="hidden"
//               animate="visible"
//               variants={{
//                 visible: {
//                   transition: {
//                     staggerChildren: 0.15,
//                   },
//                 },
//               }}
//             >
//               {course.whyChoose?.points?.map((point: string, index: number) => (
//                 <motion.li
//                   key={index}
//                   variants={{
//                     hidden: { opacity: 0, x: -20 },
//                     visible: { opacity: 1, x: 0 },
//                   }}
//                   className="flex items-start gap-3"
//                 >
//                   <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
//                   <p className="text-gray-700">{point}</p>
//                 </motion.li>
//               ))}
//             </motion.ul>
//           </div>
//         </div>

//         {/* Optional PDF Section */}
//         {course.pdfUrl && (
//           <div className="text-center mt-12">
//             <a
//               href={course.pdfUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-block px-6 py-3 bg-red-500 text-white font-medium rounded hover:bg-red-600 transition"
//             >
//               Download PDF
//             </a>
//           </div>
//         )}
//       </div>
//     </div>
//     </>
//   );
// };

// export default CourseDetailedPage;
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { coursesData } from "./Data/coursesData"; // Ensure this path is correct
import AcademyHeader from "@/components/Header/AcademyHeader";

const CourseDetailedPage = () => {
  const { id, courseId } = useParams<{ id?: string; courseId?: string }>();
  const navigate = useNavigate();
  
  // Fetch the course dynamically based on the ID from the URL
  const course = coursesData.find((c) => c.id === (id || courseId));

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <AcademyHeader />
      <div className="pt-20">
        {/* Header Banner */}
        <div className="relative h-[40vh] overflow-hidden">
          <img
            src={course.heroImage}
            alt={course.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6">
              <motion.button
                onClick={() => navigate(-1)}
                whileHover={{ x: -5 }}
                className="text-white text-sm mb-4 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Courses
              </motion.button>
              <h1 className="pt-4 text-2xl md:text-4xl font-bold text-white mb-4">
                {course.name}
              </h1>
              <p className="pt-4 text-lg text-white/90">
                {course.shortName}
              </p>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="container mx-auto px-3 py-12">
          <div className="grid md:grid-cols-5 gap-x-20 px-4 md:px-20">
            {/* About The Course */}
            <div className="md:col-span-3">
              <motion.h2
                className="text-2xl font-bold mb-6 p-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {course.targetGrade}
                <span className="block text-base text-gray-600 mt-2 mb-2">
                  {course.subtitle2}
                  <br />
                   {course.subtexttitle}
                 
                </span>
              </motion.h2>
              <motion.p
                className="text-gray-700 leading-relaxed text-justify text-medium px-4 mb-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {course.description}
              </motion.p>
              <motion.h3
                className="text-xl font-semibold mb-4 px-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Modules on Real-World Scenarios:
              </motion.h3>
              {/* Clarity Meets Strategy block */}
             
              <div className="space-y-4 px-4">
                {course.modules.map((module, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">{module.title}:</h4>
                      <p className="text-gray-700">{module.description.join(" ")}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Program Benefits */}
            <div className="md:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 p-10 rounded-2xl mt-10 md:mt-0">
              <motion.h2
                className="text-2xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {course.whyChoose.title}
              </motion.h2>
              <motion.ul
                className="space-y-4"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.15,
                    },
                  },
                }}
              >
                {course.whyChoose.points.map((point, index) => (
                  <motion.li
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">{point}</p>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>


<div className="container mx-auto px-3 py-12">
   {course.clarityMeetsStrategy && (
                <div className="mb-6 px-4 py-4 bg-blue-50 rounded-xl shadow">
                  <h4 className="text-lg font-bold text-blue-900 mb-2">
                    {course.clarityMeetsStrategy.title}
                  </h4>
                  <p className="text-gray-700">{course.clarityMeetsStrategy.content}</p>
                </div>
              )}
</div>
          {/* Optional PDF Section */}
          {course.pdfUrl && (
            <div className="text-center mt-12">
              <a
                href={course.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-red-500 text-white font-medium rounded hover:bg-red-600 transition"
              >
                Download PDF
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CourseDetailedPage;
