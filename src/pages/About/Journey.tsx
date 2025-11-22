
// import React from "react";

// const timelineData = [
//   { year: "2011", text: "Rareminds founded with a vision to connect education and employability.", color: "bg-[#1E88E5]", side: "right" },
//   { year: "2015", text: "Expanded into corporate and institutional training across industries.", color: "bg-[#E53935]", side: "left" },
//   { year: "2018", text: "Introduced bilingual learning modules and LMS-based delivery.", color: "bg-[#E53935]", side: "right" },
//   { year: "2020", text: "Partnered with major universities for employability programs.", color: "bg-[#1E88E5]", side: "left" },
//   { year: "2021", text: "Launched AI-driven career and skill mapping tools.", color: "bg-[#1E88E5]", side: "right" },
//   { year: "2022", text: "Expanded reach to 7 states across India.", color: "bg-[#E53935]", side: "left" },
//   { year: "2023", text: "Empowered over 1.5 lakh learners with upskilling initiatives.", color: "bg-[#1E88E5]", side: "right" },
//   { year: "2024", text: "Collaborated with corporates for large-scale workforce training.", color: "bg-[#E53935]", side: "left" },
// ];

// const JourneyTimeline = () => {
//   return (
//     <section className="w-[90%] mx-auto py-20 relative">
//       <h2 className="text-4xl font-bold text-center mb-16">Our Journey</h2>

//       {/* Center Line with Stroke Animation */}
//       <div className="absolute left-1/2 top-[150px] bottom-[130px] w-[2px] bg-gradient-to-b from-black via-gray-700 to-black animate-draw-line transform -translate-x-1/2">
//         {/* Top & Bottom Dots */}
//         <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-black rounded-full"></div>
//         <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-black rounded-full"></div>
//       </div>

//       {/* Timeline Items */}
//       <div className="flex flex-col gap-20 relative">
//         {timelineData.map((item, index) => (
//           <div
//             key={index}
//             className={`relative flex items-center ${
//               item.side === "left" ? "justify-start" : "justify-end"
//             }`}
//           >
//             {/* Content Section */}
//             <div
//               className={`w-[45%] sm:w-[40%] ${
//                 item.side === "left" ? "text-right pr-12" : "text-left pl-12"
//               }`}
//             >
//               <div
//                 className={`inline-block ${item.color} text-white px-4 py-1 rounded-md text-lg font-semibold`}
//               >
//                 {item.year}
//               </div>
//               <p className="mt-3 text-gray-800 text-base leading-relaxed">
//                 {item.text}
//               </p>
//             </div>

//             {/* Connector + Dot */}
//             <div
//               className={`absolute top-1/2 transform -translate-y-1/2 ${
//                 item.side === "left"
//                   ? "left-1/2"
//                   : "left-1/2"
//               }`}
//             >
//               {/* Connector Line — perfectly touching center */}
//               <div
//                 className={`absolute top-1/2 -translate-y-1/2 ${
//                   item.side === "left"
//                     ? "right-0 translate-x-[0px] w-[80px]"
//                     : "left-0 -translate-x-[0px] w-[80px]"
//                 } h-[2px] bg-black animate-draw-stroke`}
//               ></div>

//               {/* Dot at the end of connector */}
//               <div
//                 className={`w-5 h-5 bg-black rounded-full absolute top-1/2 -translate-y-1/2 ${
//                   item.side === "left"
//                     ? "right-[80px]"
//                     : "left-[80px]"
//                 }`}
//               ></div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Keyframes */}
//       <style>{`
//         @keyframes draw-stroke {
//           0% { width: 0; opacity: 0; }
//           100% { width: 80px; opacity: 1; }
//         }
//         .animate-draw-stroke {
//           animation: draw-stroke 1.2s ease forwards;
//         }
//         @keyframes draw-line {
//           0% { height: 0; opacity: 0; }
//           100% { height: 100%; opacity: 1; }
//         }
//         .animate-draw-line {
//           animation: draw-line 1.5s ease-out forwards;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default JourneyTimeline;







// // "use client";
// // import React from "react";
// // import { motion, useScroll, useTransform } from "framer-motion";

// // const timelineData = [
// //   { year: "2011", text: "Rareminds founded with a vision to connect education and employability.", color: "bg-[#1E88E5]", side: "right" },
// //   { year: "2015", text: "Expanded into corporate and institutional training across industries.", color: "bg-[#E53935]", side: "left" },
// //   { year: "2018", text: "Introduced bilingual learning modules and LMS-based delivery.", color: "bg-[#E53935]", side: "right" },
// //   { year: "2020", text: "Partnered with major universities for employability programs.", color: "bg-[#1E88E5]", side: "left" },
// //   { year: "2021", text: "Launched AI-driven career and skill mapping tools.", color: "bg-[#1E88E5]", side: "right" },
// //   { year: "2022", text: "Expanded reach to 7 states across India.", color: "bg-[#E53935]", side: "left" },
// //   { year: "2023", text: "Empowered over 1.5 lakh learners with upskilling initiatives.", color: "bg-[#1E88E5]", side: "right" },
// //   { year: "2024", text: "Collaborated with corporates for large-scale workforce training.", color: "bg-[#E53935]", side: "left" },
// // ];

// // const JourneyTimeline: React.FC = () => {
// //   const ref = React.useRef<HTMLDivElement>(null);
// //   const { scrollYProgress } = useScroll({
// //     target: ref,
// //     offset: ["start center", "end center"],
// //   });

// //   const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

// //   return (
// //     <section ref={ref} className="relative w-[90%] mx-auto py-20 overflow-hidden">
// //       <h2 className="text-4xl font-bold text-center mb-16">Our Journey</h2>

// //       {/* === Center Line === */}
// //       <div className="absolute left-1/2 top-[120px] bottom-[120px] -translate-x-1/2 w-[2px] bg-gray-300 rounded-full overflow-hidden">
// //         <motion.div
// //           style={{ height: lineHeight }}
// //           className="absolute top-0 left-0 w-full bg-black origin-top"
// //         />
// //       </div>

// //       {/* === Timeline Items === */}
// //       <div className="relative flex flex-col gap-20 z-10">
// //         {timelineData.map((item, index) => (
// //           <motion.div
// //             key={index}
// //             initial={{ opacity: 0, x: item.side === "left" ? -100 : 100 }}
// //             whileInView={{ opacity: 1, x: 0 }}
// //             viewport={{ once: true, amount: 0.3 }}
// //             transition={{ duration: 0.8, ease: "easeOut" }}
// //             className={`relative flex items-center ${
// //               item.side === "left" ? "justify-start" : "justify-end"
// //             }`}
// //           >
// //             {/* === Text Content === */}
// //             <div
// //               className={`w-[45%] sm:w-[40%] ${
// //                 item.side === "left" ? "text-right pr-12" : "text-left pl-12"
// //               }`}
// //             >
// //               <div
// //                 className={`inline-block ${item.color} text-white px-4 py-1 rounded-md text-lg font-semibold shadow-sm`}
// //               >
// //                 {item.year}
// //               </div>
// //               <p className="mt-3 text-gray-800 text-base leading-relaxed">
// //                 {item.text}
// //               </p>
// //             </div>

// //             {/* === Connector Line === */}
// //             <motion.div
// //               initial={{ scaleX: 0 }}
// //               whileInView={{ scaleX: 1 }}
// //               viewport={{ once: true, amount: 0.3 }}
// //               transition={{ duration: 0.8, ease: "easeOut" }}
// //               className={`absolute top-1/2 -translate-y-1/2 h-[2px] bg-black origin-${
// //                 item.side === "left" ? "right" : "left"
// //               }`}
// //               style={{
// //                 width: "70px",
// //                 [item.side === "left" ? "right" : "left"]: "50%",
// //               }}
// //             ></motion.div>

// //             {/* === Dot === */}
// //             <div
// //               className={`w-5 h-5 bg-black rounded-full absolute top-1/2 -translate-y-1/2 ${
// //                 item.side === "left"
// //                   ? "right-[calc(50%+50px)]"
// //                   : "left-[calc(50%+50px)]"
// //               }`}
// //             ></div>
// //           </motion.div>
// //         ))}
// //       </div>
// //     </section>
// //   );
// // };

// // export default JourneyTimeline;



// "use client";
// import React from "react";
// import { motion, useScroll, useTransform } from "framer-motion";

// const timelineData = [
//   { year: "2011", text: "Rareminds founded with a vision to connect education and employability.", color: "bg-[#1E88E5]", side: "right" },
//   { year: "2015", text: "Expanded into corporate and institutional training across industries.", color: "bg-[#E53935]", side: "left" },
//   { year: "2018", text: "Introduced bilingual learning modules and LMS-based delivery.", color: "bg-[#E53935]", side: "right" },
//   { year: "2020", text: "Digital transformation through online skill enablement and hybrid delivery.", color: "bg-[#1E88E5]", side: "left" },
//   { year: "2021", text: "Partnered with universities pan-India for large-scale student skilling.", color: "bg-[#1E88E5]", side: "right" },
//   { year: "2022", text: "Empanelled as TNSDC Training Partner under the Naan Mudhalvan initiative.", color: "bg-[#E53935]", side: "left" },
//   { year: "2023", text: "Trained 45,000+ students (30,000 + 15,000) across Tamil Nadu and Tripura.", color: "bg-[#1E88E5]", side: "right" },
//   { year: "2024", text: "Conducted state-level hackathons and institutional employability drives.", color: "bg-[#E53935]", side: "left" },
//   { year: "2025", text: "Evolving as India’s first integrated Skill Ecosystem, connecting training, recruitment, innovation, and consulting.", color: "bg-[#1E88E5]", side: "right" },
// ];

// const JourneyTimeline: React.FC = () => {
//   const ref = React.useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start center", "end center"],
//   });

//   const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

//   return (
// <section ref={ref} className="relative w-[90%] mx-auto pt-8 pb-12 sm:pt-10 sm:pb-12 md:pt-12 md:pb-12 overflow-hidden">
//   <h2 className="text-4xl font-bold text-center mb-10">Our Journey</h2> {/* keep normal gap here */}

//   {/* === Timeline Wrapper with Extra Top Padding === */}
//   <div className="relative pt-16"> {/* ⬅️ added padding-top to push down timeline only */}
//     {/* === Center Line === */}
//     <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] bg-gray-300 rounded-full overflow-hidden">
//       <motion.div
//         style={{ height: lineHeight }}
//         className="absolute top-0 left-0 w-full bg-black origin-top"
//         transition={{ duration: 0.5,       // ⏩ faster growth
//     ease: "easeOut",
//     delay: 0, }}
//       />
//     </div>

//     {/* === Timeline Items === */}
//     <div className="relative flex flex-col gap-20 z-10">
//       {timelineData.map((item, index) => (
//         <motion.div
//           key={index}
//           initial={{ opacity: 0, x: item.side === "left" ? -100 : 100 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: false, amount: 0.4 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className={`relative flex items-center ${
//             item.side === "left" ? "justify-start" : "justify-end"
//           }`}
//         >
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: false, amount: 0.4 }}
//             transition={{ duration: 0.7, delay: 0.1 }}
//             className={`w-[45%] sm:w-[40%] ${
//               item.side === "left" ? "text-right pr-12" : "text-left pl-12"
//             }`}
//           >
//             <div
//               className={`inline-block ${item.color} text-white px-4 py-1 rounded-md text-lg font-semibold shadow-sm`}
//             >
//               {item.year}
//             </div>
//             <p className="mt-3 text-gray-800 text-base leading-relaxed">
//               {item.text}
//             </p>
//           </motion.div>
//           <motion.div
//   initial={{ scaleX: 0 }}
//   whileInView={{ scaleX: 1 }}
//   viewport={{ once: false, amount: 0.4 }}
//   transition={{ duration: 0.5, ease: "easeOut" }}
//   className={`absolute top-1/2 -translate-y-1/2 h-[2px] bg-black 
//     origin-${item.side === "left" ? "right" : "left"} 
//     w-[30px] sm:w-[40px] md:w-[50px] lg:w-[70px]`}  // 👈 responsive widths
//   style={{
//     [item.side === "left" ? "right" : "left"]: "50%",
//     transform: "translateY(-40%)",
//   }}
// ></motion.div>
// <motion.div
//   initial={{ scale: 0 }}
//   whileInView={{ scale: 1 }}
//   viewport={{ once: false, amount: 0.4 }}
//   transition={{ duration: 0.5 }}
//   className={`absolute bg-black rounded-full 
//     w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 
//     ${item.side === "left"
//       ? "right-[calc(50%+30px)] sm:right-[calc(50%+42px)] md:right-[calc(50%+68px)]"
//       : "left-[calc(50%+30px)] sm:left-[calc(50%+42px)] md:left-[calc(50%+68px)]"} 
//       top-1/2`}
//   style={{
//     transform: "translateY(-60%)", 
//      marginTop: "-6px",// perfectly centers vertically
//   }}
// ></motion.div>



//         </motion.div>
//       ))}
//     </div>
//   </div>
// </section>

//   );
// };

// export default JourneyTimeline;

"use client";
import React from "react";
import { motion } from "framer-motion";

const timelineData = [
  { year: "2011", text: "Rareminds founded with a vision to connect education and employability.", color: "bg-[#1E88E5]", side: "right" },
  { year: "2015", text: "Expanded into corporate and institutional training across industries.", color: "bg-[#E53935]", side: "left" },
  { year: "2018", text: "Introduced bilingual learning modules and LMS-based delivery.", color: "bg-[#E53935]", side: "right" },
  { year: "2020", text: "Digital transformation through online skill enablement and hybrid delivery.", color: "bg-[#1E88E5]", side: "left" },
  { year: "2021", text: "Partnered with universities pan-India for large-scale student skilling.", color: "bg-[#1E88E5]", side: "right" },
  { year: "2022", text: "Empanelled as TNSDC Training Partner under the Naan Mudhalvan initiative.", color: "bg-[#E53935]", side: "left" },
  { year: "2023", text: "Trained 45,000+ students (30,000 + 15,000) across Tamil Nadu and Tripura.", color: "bg-[#1E88E5]", side: "right" },
  { year: "2024", text: "Conducted state-level hackathons and institutional employability drives.", color: "bg-[#E53935]", side: "left" },
  { year: "2025", text: "Evolving as India's first integrated Skill Ecosystem, connecting training, recruitment, innovation, and consulting.", color: "bg-[#1E88E5]", side: "right" },
];

const JourneyTimeline: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  return (
<section ref={ref} className="relative w-[90%] mx-auto pt-8 pb-12 sm:pt-10 sm:pb-12 md:pt-12 md:pb-16 overflow-hidden">
  <h2 className="text-4xl font-bold text-center mb-10">Our Journey</h2>

  {/* === Timeline Wrapper with Extra Top Padding === */}
  <div className="relative pt-16">
    {/* === Center Line === */}
    <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] bg-black rounded-full"></div>

    {/* === Timeline Items === */}
    <div className="relative flex flex-col gap-20 z-10">
      {timelineData.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: item.side === "left" ? -100 : 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`relative flex items-center ${
            item.side === "left" ? "justify-start" : "justify-end"
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`w-[45%] sm:w-[40%] ${
              item.side === "left" ? "text-right pr-12" : "text-left pl-12"
            }`}
          >
            <div
              className={`inline-block ${item.color} text-white px-4 py-1 rounded-md text-lg font-semibold shadow-sm`}
            >
              {item.year}
            </div>
            <p className="mt-3 text-gray-800 text-base leading-relaxed">
              {item.text}
            </p>
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`absolute top-1/2 -translate-y-1/2 h-[2px] bg-black 
              origin-${item.side === "left" ? "right" : "left"} 
              w-[30px] sm:w-[40px] md:w-[50px] lg:w-[70px]`}
            style={{
              [item.side === "left" ? "right" : "left"]: "50%",
              transform: "translateY(-40%)",
            }}
          ></motion.div>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className={`absolute bg-black rounded-full 
              w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 
              ${item.side === "left"
                ? "right-[calc(50%+30px)] sm:right-[calc(50%+42px)] md:right-[calc(50%+32px) lg:right-[calc(50%+68px)]"
                : "left-[calc(50%+30px)] sm:left-[calc(50%+42px)] md:left-[calc(50%+32px) lg:left-[calc(50%+68px)]"} 
                top-1/2`}
            style={{
              transform: "translateY(-60%)", 
              marginTop: "-6px",
            }}
          ></motion.div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

  );
};

export default JourneyTimeline;