


// import React from "react";

// import proven from "../../assets/Proven skill.webp";
// import government from "../../assets/govt trusted.webp";
// import integrated from "../../assets/Integrated Ecosystem.webp";
// import dataDriven from "../../assets/Data driven impact.webp";
// import collaborative from "../../assets/collaborative DNA.webp";

// const cards = [
//   {
//     title: "Proven Skills",
//     desc: "Over 1.5 lakh learners trained across India in 13+ languages.",
//     img: proven,
// topSvg: (
//   <svg
//     className="
//       w-[240px] h-[40px]        /* 📱 mobile - slightly smaller */
//       sm:w-[260px] sm:h-[45px]  /* 💻 tablet - moderate size */
//       md:w-[280px] md:h-[50px]  /* 🖥️ desktop - original size */
//       lg:w-[280px] lg:h-[50px]  /* 🖥️ larger screens - slightly bigger */
//     "
//     viewBox="0 0 205 30"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M0.562491 28.9986C0.562491 28.9986 92.4467 -33.9992 203.562 29"
//       stroke="#4A90E2"
//       strokeWidth="2"
//     />
//   </svg>
// ),
//     sideLineLeft: true,
//   },
//   {
//     title: "Government Trusted",
//     desc: "Official TNSDC Training Partner and collaborator with multiple state missions.",
//     img: government,
//    bottomSvg: (
//   <svg
//     className="
//       w-[240px] h-[40px]        /* 📱 mobile - smaller */
//       sm:w-[260px] sm:h-[45px]  /* 💻 tablet - medium */
//       md:w-[280px] md:h-[50px]  /* 🖥️ desktop - default/original */
//       lg:w-[280px] lg:h-[50px]  /* 🖥️ large screens - slightly bigger */
//     "
//     viewBox="0 0 205 29"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M203.477 0.880221C203.477 0.880221 111.592 61.6281 0.476562 0.878905"
//       stroke="#4A90E2"
//       strokeWidth="2"
//     />
//   </svg>
// )

//   },
//   {
//     title: "Integrated Ecosystem",
//     desc: "From classroom to career powered by the Skill Passport & 360° model.",
//     img: integrated,
//    topSvg: (
//   <svg
//     className="
//       w-[240px] h-[40px]        /* 📱 mobile - slightly smaller */
//       sm:w-[260px] sm:h-[45px]  /* 💻 tablet - moderate size */
//       md:w-[280px] md:h-[50px]  /* 🖥️ desktop - original size */
//       lg:w-[280px] lg:h-[50px]  /* 🖥️ larger screens - slightly bigger */
//     "
//     viewBox="0 0 205 30"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M0.562491 28.9986C0.562491 28.9986 92.4467 -33.9992 203.562 29"
//       stroke="#4A90E2"
//       strokeWidth="2"
//     />
//   </svg>
// ),
//   },
//   {
//     title: "Data-Driven Impact",
//     desc: "40% rise in employability scores and measurable placement outcomes.",
//     img: dataDriven,
//    bottomSvg: (
//   <svg
//     className="
//       w-[240px] h-[40px]        /* 📱 mobile - smaller */
//       sm:w-[230px] sm:h-[38px]  /* 💻 tablet - medium */
//       md:w-[280px] md:h-[50px]  /* 🖥️ desktop - default/original */
//       lg:w-[280px] lg:h-[50px]  /* 🖥️ large screens - slightly bigger */
//     "
//     viewBox="0 0 205 29"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M203.477 0.880221C203.477 0.880221 111.592 61.6281 0.476562 0.878905"
//       stroke="#4A90E2"
//       strokeWidth="2"
//     />
//   </svg>
// )
//   },
//   {
//     title: "Collaborative DNA",
//     desc: "Long-term partnerships with universities, corporates, and policymakers.",
//     img: collaborative,
//     topSvg: (
//   <svg
//     className="
//       w-[240px] h-[40px]        /* 📱 mobile - slightly smaller */
//       sm:w-[260px] sm:h-[45px]  /* 💻 tablet - moderate size */
//       md:w-[280px] md:h-[50px]  /* 🖥️ desktop - original size */
//       lg:w-[280px] lg:h-[50px]  /* 🖥️ larger screens - slightly bigger */
//     "
//     viewBox="0 0 205 30"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M0.562491 28.9986C0.562491 28.9986 92.4467 -33.9992 203.562 29"
//       stroke="#4A90E2"
//       strokeWidth="2"
//     />
//   </svg>
// ),
//     sideLineRight: true,
//   },
// ];

// const connectorSvg = (
//   <svg width="2" height="430" viewBox="0 0 2 430" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <line x1="1" x2="1" y2="430" stroke="#4A90E2" strokeWidth="2" />
//   </svg>
// );

// const WhyChooseRareminds = () => {
//   return (
//     <section
//       className="
//         bg-white relative overflow-visible
//         pt-4 pb-1
//         sm:pt-6 sm:pb-28
//         md:pt-12 md:pb-35
//         mb-1 sm:mb-16 md:mb-24
//       "
//     >
//       <style>{`
//   .flip-container {
//     perspective: 1000px;
//   }

//   .flip-inner {
//     position: relative;
//     width: 100%;
//     height: 100%;
//     transition: transform 0.8s ease-in-out;
//     transform-style: preserve-3d;
//   }

//   /* Flip + scale on hover */
//   .flip-container:hover .flip-inner {
//     transform: rotateY(180deg) scale(1.1);
//   }

//   .flip-front,
//   .flip-back {
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     border-radius: 50%;
//     backface-visibility: hidden;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     border: 2px dashed #1E88E5;
//     background: white;
//     transition: transform 0.8s ease-in-out;
//   }

//   /* Back is flipped */
//   .flip-back {
//     transform: rotateY(180deg);
//   }

//   /* Image styles */
//   .flip-front img,
//   .flip-back img {
//     width: 40px;
//     height: 40px;
//     object-fit: contain;
//     transition: transform 0.8s ease-in-out;
//   }

//   /* Optional — add a subtle pulse when flipping */
//   .flip-container:hover .flip-front img,
//   .flip-container:hover .flip-back img {
//     transform: scale(1.1);
//   }
// `}</style>


//       <div className="container mx-auto px-4 max-w-7xl">
//         <h2
//           className="
//             text-3xl sm:text-4xl font-bold text-center text-gray-900
//             mb-10 sm:mb-14 md:mb-32
//             mt-[-10px] sm:mt-[-5px] md:mt-[-30px]
//           "
//         >
//           Why Choose Rareminds
//         </h2>

//         <div className="relative flex justify-center items-start gap-6 sm:gap-10 md:gap-12 mt-4 mb-24 overflow-visible flex-wrap md:flex-nowrap">
//           {cards.map((card, idx) => (
//             <div key={idx} className="relative flex flex-col items-center">
//               {/* Top and Bottom SVGs */}
//               {card.topSvg && (
//                 <div className="hidden md:block absolute -top-[86px] left-1/2 -translate-x-1/2 z-20">
//                   {card.topSvg}
//                 </div>
//               )}
//               {card.bottomSvg && (
//                 <div className="hidden md:block absolute -bottom-[85px] left-1/2 -translate-x-1/2 z-20">
//                   {card.bottomSvg}
//                 </div>
//               )}

//               {/* Side Lines */}
//               {card.sideLineLeft && (
//                 <div className="hidden md:flex absolute -left-8 -top-11 h-full flex-col items-center">
//                   <svg width="2" height="209" viewBox="0 0 2 209" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <line x1="1" x2="1" y2="209" stroke="#1E88E5" strokeWidth="2" />
//                   </svg>
//                   <div className="w-3 h-3 rounded-full border-2 border-[#1E88E5] bg-white"></div>
//                 </div>
//               )}
//               {card.sideLineRight && (
//                 <div className="hidden md:flex absolute -right-7 -top-11 h-full flex-col items-center">
//                   <svg width="2" height="222" viewBox="0 0 2 222" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <line x1="1" x2="1" y2="209" stroke="#1E88E5" strokeWidth="2" />
//                   </svg>
//                   <div className="w-3 h-3 rounded-full border-2 border-[#1E88E5] bg-white -bottom-5 -mt-4"></div>
//                 </div>
//               )}

//               {/* Card */}
//               <div className="relative bg-[#F5FAFF] border-2 border-[#1E88E5] rounded-[32px] text-center flex flex-col items-center justify-start p-8 w-[230px] h-[340px] shadow-md z-10">
//                 {/* Circle Flip Animation */}
//                 <div className="flex justify-center items-center mb-6 mt-2 flip-container w-20 h-20">
//                   <div className="flip-inner">
//                     {/* Front Side */}
//     <div className="flip-front">
//       <img src={card.img} alt={card.title} />
//     </div>

//     {/* Back Side (same as front) */}
//     <div className="flip-back">
//       <img src={card.img} alt={card.title} />
//     </div>
//                   </div>
//                 </div>

//                 {/* Text Section */}
//                 <div className="flex flex-col justify-start flex-grow">
//                   <h3 className="text-[#1E88E5] font-semibold text-base mb-3">{card.title}</h3>
//                   <p className="text-gray-700 text-sm leading-snug px-2">{card.desc}</p>
//                 </div>
//               </div>

//               {/* Connector Line */}
//               {idx < cards.length - 1 && (
//                 <div className="hidden md:block absolute top-[50%] right-[-23px] translate-y-[-50%] z-0">
//                   {connectorSvg}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyChooseRareminds;

// import React from "react";

// import proven from "../../assets/Proven skill.webp";
// import government from "../../assets/govt trusted.webp";
// import integrated from "../../assets/Integrated Ecosystem.webp";
// import dataDriven from "../../assets/Data driven impact.webp";
// import collaborative from "../../assets/collaborative DNA.webp";

// const cards = [
//   {
//     title: "Proven Skills",
//     desc: "Over 1.5 lakh learners trained across India in 13+ languages.",
//     img: proven,
//     topSvg: (
//       <svg
//         className="hidden md:block md:scale-[0.8] lg:scale-100"
//         width="280"
//         height="50"
//         viewBox="0 0 205 30"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M0.562491 28.9986C0.562491 28.9986 92.4467 -33.9992 203.562 29"
//           stroke="#4A90E2"
//           strokeWidth="2"
//         />
//       </svg>
//     ),
//     sideLineLeft: true,
//   },
//   {
//     title: "Government Trusted",
//     desc: "Official TNSDC Training Partner and collaborator with multiple state missions.",
//     img: government,
//     bottomSvg: (
//       <svg
//         className="hidden md:block md:scale-[0.8] lg:scale-100"
//         width="280"
//         height="50"
//         viewBox="0 0 205 29"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M203.477 0.880221C203.477 0.880221 111.592 61.6281 0.476562 0.878905"
//           stroke="#4A90E2"
//           strokeWidth="2"
//         />
//       </svg>
//     ),
//   },
//   {
//     title: "Integrated Ecosystem",
//     desc: "From classroom to career powered by the Skill Passport & 360° model.",
//     img: integrated,
//     topSvg: (
//       <svg
//         className="hidden md:block md:scale-[0.8] lg:scale-100"
//         width="280"
//         height="50"
//         viewBox="0 0 205 30"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M0.562491 28.9986C0.562491 28.9986 92.4467 -33.9992 203.562 29"
//           stroke="#4A90E2"
//           strokeWidth="2"
//         />
//       </svg>
//     ),
//   },
//   {
//     title: "Data-Driven Impact",
//     desc: "40% rise in employability scores and measurable placement outcomes.",
//     img: dataDriven,
//     bottomSvg: (
//       <svg
//         className="hidden md:block md:scale-[0.8] lg:scale-100"
//         width="280"
//         height="50"
//         viewBox="0 0 205 29"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M203.477 0.880221C203.477 0.880221 111.592 61.6281 0.476562 0.878905"
//           stroke="#4A90E2"
//           strokeWidth="2"
//         />
//       </svg>
//     ),
//   },
//   {
//     title: "Collaborative DNA",
//     desc: "Long-term partnerships with universities, corporates, and policymakers.",
//     img: collaborative,
//     topSvg: (
//       <svg
//         className="hidden md:block md:scale-[0.8] lg:scale-100"
//         width="280"
//         height="50"
//         viewBox="0 0 205 30"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M0.562491 28.9986C0.562491 28.9986 92.4467 -33.9992 203.562 29"
//           stroke="#4A90E2"
//           strokeWidth="2"
//         />
//       </svg>
//     ),
//     sideLineRight: true,
//   },
// ];

// const connectorSvg = (
//   <svg
//     className="hidden md:block md:scale-[0.8] lg:scale-100"
//     width="2"
//     height="430"
//     viewBox="0 0 2 430"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <line x1="1" x2="1" y2="430" stroke="#4A90E2" strokeWidth="2" />
//   </svg>
// );

// const WhyChooseRareminds = () => {
//   return (
//     <section
//       className="
//         bg-white relative overflow-visible
//         pt-4 pb-1
//         sm:pt-6 sm:pb-28
//         md:pt-12 md:pb-35
//         mb-1 sm:mb-16 md:mb-24
//       "
//     >
//       <style>{`
//         .flip-container { perspective: 1000px; }
//         .flip-inner {
//           position: relative; width: 100%; height: 100%;
//           transition: transform 0.8s ease-in-out;
//           transform-style: preserve-3d;
//         }
//         .flip-container:hover .flip-inner {
//           transform: rotateY(180deg) scale(1.1);
//         }
//         .flip-front, .flip-back {
//           position: absolute; width: 100%; height: 100%;
//           border-radius: 50%; backface-visibility: hidden;
//           display: flex; align-items: center; justify-content: center;
//           border: 2px dashed #1E88E5; background: white;
//           transition: transform 0.8s ease-in-out;
//         }
//         .flip-back { transform: rotateY(180deg); }
//         .flip-front img, .flip-back img {
//           width: 40px; height: 40px; object-fit: contain;
//           transition: transform 0.8s ease-in-out;
//         }
//         .flip-container:hover .flip-front img,
//         .flip-container:hover .flip-back img { transform: scale(1.1); }
//       `}</style>

//       <div className="container mx-auto px-4 max-w-7xl">
//         <h2
//           className="
//             text-3xl sm:text-4xl font-bold text-center text-gray-900
//             mb-10 sm:mb-14 md:mb-32
//             mt-[-10px] sm:mt-[-5px] md:mt-[-150px]
//           "
//         >
//           Why Choose Rareminds
//         </h2>

//         <div className="relative flex justify-center items-start gap-6 sm:gap-10 md:gap-12 mt-4 mb-24 overflow-visible flex-wrap md:flex-nowrap">
//           {cards.map((card, idx) => (
//             <div key={idx} className="relative flex flex-col items-center">
//               {/* Top and Bottom SVGs */}
//               {card.topSvg && (
//                 <div className="absolute -top-[70px] md:-top-[60px] lg:-top-[86px] left-1/2 -translate-x-1/2 z-20">
//                   {card.topSvg}
//                 </div>
//               )}
//               {card.bottomSvg && (
//                 <div className="absolute -bottom-[65px] md:-bottom-[60px] lg:-bottom-[85px] left-1/2 -translate-x-1/2 z-20">
//                   {card.bottomSvg}
//                 </div>
//               )}

//               {/* LEFT SIDE LINE */}
//               {card.sideLineLeft && (
//                 <div className="hidden md:flex absolute -left-6 md:-left-7 lg:-left-8 -top-10 md:-top-11 h-full flex-col items-center">
//                   <svg
//                     className="md:scale-[0.8] lg:scale-100"
//                     width="2"
//                     height="209"
//                     viewBox="0 0 2 209"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <line
//                       x1="1"
//                       x2="1"
//                       y2="209"
//                       stroke="#1E88E5"
//                       strokeWidth="2"
//                     />
//                   </svg>
//                   <div className="w-3 h-3 rounded-full border-2 border-[#1E88E5] bg-white"></div>
//                 </div>
//               )}

//               {/* RIGHT SIDE LINE */}
//               {card.sideLineRight && (
//                 <div className="hidden md:flex absolute -right-6 md:-right-7 lg:-right-8 -top-10 md:-top-11 h-full flex-col items-center">
//                   <svg
//                     className="md:scale-[0.8] lg:scale-100"
//                     width="2"
//                     height="222"
//                     viewBox="0 0 2 222"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <line
//                       x1="1"
//                       x2="1"
//                       y2="209"
//                       stroke="#1E88E5"
//                       strokeWidth="2"
//                     />
//                   </svg>
//                   <div className="w-3 h-3 rounded-full border-2 border-[#1E88E5] bg-white -mt-4"></div>
//                 </div>
//               )}

//               {/* CARD */}
//               <div
//                 className="
//                   relative bg-[#F5FAFF] border-2 border-[#1E88E5] rounded-[32px]
//                   text-center flex flex-col items-center justify-start
//                   p-6 sm:p-8
//                   w-[180px] sm:w-[200px] md:w-[210px] lg:w-[230px]
//                   h-[280px] sm:h-[300px] md:h-[320px] lg:h-[340px]
//                   shadow-md z-10
//                 "
//               >
//                 <div className="flex justify-center items-center mb-6 mt-2 flip-container w-16 sm:w-18 md:w-20 h-16 sm:h-18 md:h-20">
//                   <div className="flip-inner">
//                     <div className="flip-front">
//                       <img src={card.img} alt={card.title} />
//                     </div>
//                     <div className="flip-back">
//                       <img src={card.img} alt={card.title} />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex flex-col justify-start flex-grow">
//                   <h3 className="text-[#1E88E5] font-semibold text-sm sm:text-base mb-3">
//                     {card.title}
//                   </h3>
//                   <p className="text-gray-700 text-xs sm:text-sm leading-snug px-2">
//                     {card.desc}
//                   </p>
//                 </div>
//               </div>

//               {/* Connector Line */}
//               {idx < cards.length - 1 && (
//                 <div className="hidden md:block absolute top-[50%] right-[-18px] lg:right-[-23px] translate-y-[-50%] z-0">
//                   {connectorSvg}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyChooseRareminds;

// import React from "react";

// import proven from "../../assets/Proven skill.webp";
// import government from "../../assets/govt trusted.webp";
// import integrated from "../../assets/Integrated Ecosystem.webp";
// import dataDriven from "../../assets/Data driven impact.webp";
// import collaborative from "../../assets/collaborative DNA.webp";

// const cards = [
//   {
//     title: "Proven Skills",
//     desc: "Over 1.5 lakh learners trained across India in 13+ languages.",
//     img: proven,
//     topSvg: (
//       <svg
//         className="
//           w-[240px] h-[40px]
//           sm:w-[190px] sm:h-[30px]
//           md:w-[200px] md:h-[40px]
//           lg:w-[200px] lg:h-[40px]
//         "
//         viewBox="0 0 205 30"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M0.562491 28.9986C0.562491 28.9986 92.4467 -33.9992 203.562 29"
//           stroke="#4A90E2"
//           strokeWidth="1.6"
//         />
//       </svg>

//     ),
//     sideLineLeft: true,
//   },
//   {
//     title: "Government Trusted",
//     desc: "Official TNSDC Training Partner and collaborator with multiple state missions.",
//     img: government,
//     bottomSvg: (
//       <svg
//         className="
//           w-[240px] h-[40px]
//           sm:w-[190px] sm:h-[30px]
//           md:w-[200px] md:h-[32px]
//           lg:w-[200px] lg:h-[32px]
//         "
//         viewBox="0 0 205 29"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M203.477 0.880221C203.477 0.880221 111.592 61.6281 0.476562 0.878905"
//           stroke="#4A90E2"
//           strokeWidth="1.6"
//         />
//       </svg>
//     ),
//   },
//   {
//     title: "Integrated Ecosystem",
//     desc: "From classroom to career powered by the Skill Passport & 360° model.",
//     img: integrated,
//     topSvg: (
//       <svg
//         className="
//           w-[240px] h-[40px]
//           sm:w-[150px] sm:h-[20px]
//           md:w-[200px] md:h-[40px]
//           lg:w-[200px] lg:h-[40px]
//         "
//         viewBox="0 0 205 30"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M0.562491 28.9986C0.562491 28.9986 92.4467 -33.9992 203.562 29"
//           stroke="#4A90E2"
//           strokeWidth="1.6"
//         />
//       </svg>
//     ),
//   },
//   {
//     title: "Data-Driven Impact",
//     desc: "40% rise in employability scores and measurable placement outcomes.",
//     img: dataDriven,
//     bottomSvg: (
//       <svg
//         className="
//           w-[240px] h-[40px]
//           sm:w-[190px] sm:h-[30px]
//           md:w-[200px] md:h-[32px]
//           lg:w-[200px] lg:h-[32px]
//         "
//         viewBox="0 0 205 29"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M203.477 0.880221C203.477 0.880221 111.592 61.6281 0.476562 0.878905"
//           stroke="#4A90E2"
//           strokeWidth="1.6"
//         />
//       </svg>
//     ),
//   },
//   {
//     title: "Collaborative DNA",
//     desc: "Long-term partnerships with universities, corporates, and policymakers.",
//     img: collaborative,
//     topSvg: (
//       <svg
//         className="
//           w-[240px] h-[40px]
//           sm:w-[190px] sm:h-[30px]
//           md:w-[200px] md:h-[40px]
//           lg:w-[200px] lg:h-[40px]
//         "
//         viewBox="0 0 205 30"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M0.562491 28.9986C0.562491 28.9986 92.4467 -33.9992 203.562 29"
//           stroke="#4A90E2"
//           strokeWidth="1.6"
//         />
//       </svg>
//     ),
//     sideLineRight: true,
//   },
// ];

// const connectorSvg = (
//   <svg
//     className="sm:h-[280px] md:h-[350px] lg:h-[350px]"
//     width="2"
//     viewBox="0 0 2 430"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <line x1="1" x2="1" y2="430" stroke="#4A90E2" strokeWidth="1.6" />
//   </svg>
// );

// const WhyChooseRareminds = () => {
//   return (
//     <section
//       className="
//         bg-white relative overflow-visible
//         pt-4 pb-1
//         sm:pt-6 sm:pb-16
//         md:pt-10 md:pb-28
//         mb-1 sm:mb-10 md:mb-20
//       "
//     >
//       <style>{`
//   .flip-container {
//     perspective: 1000px;
//   }

//   .flip-inner {
//     position: relative;
//     width: 100%;
//     height: 100%;
//     transition: transform 0.8s ease-in-out;
//     transform-style: preserve-3d;
//   }

//   .flip-container:hover .flip-inner {
//     transform: rotateY(180deg) scale(1.1);
//   }

//   .flip-front,
//   .flip-back {
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     border-radius: 50%;
//     backface-visibility: hidden;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     border: 2px dashed #1E88E5;
//     background: white;
//   }

//   .flip-back {
//     transform: rotateY(180deg);
//   }

//   .flip-front img,
//   .flip-back img {
//     width: 38px;
//     height: 38px;
//     object-fit: contain;
//     transition: transform 0.8s ease-in-out;
//   }

//   .flip-container:hover .flip-front img,
//   .flip-container:hover .flip-back img {
//     transform: scale(1.1);
//   }
// `}</style>

//       <div className="container mx-auto px-4 max-w-7xl">
//         <h2
//           className="
//             text-3xl sm:text-3xl md:text-3xl font-bold text-center text-gray-900
//             mb-10 sm:mb-10 md:mb-24
//             mt-[-10px] sm:mt-[-5px] md:mt-[-20px]
//           "
//         >
//           Why Choose Rareminds
//         </h2>

//         <div className="relative flex justify-center items-start gap-6 sm:gap-3 md:gap-5 mt-4 mb-20 overflow-visible flex-wrap lg:flex-nowrap">
//           {cards.map((card, idx) => (
//             <div key={idx} className="relative flex flex-col items-center">
//               {/* Top and Bottom SVGs */}
//               {/* Top and Bottom SVGs */}
//               {card.topSvg && (
//                 <div className="hidden lg:block absolute -top-[60px] md:-top-[75px] left-1/2 -translate-x-1/2 z-20">
//                   {card.topSvg}
//                 </div>
//               )}
//               {card.bottomSvg && (
//                 <div className="hidden lg:block absolute -bottom-[60px] md:-bottom-[70px] left-1/2 -translate-x-1/2 z-20">
//                   {card.bottomSvg}
//                 </div>
//               )}

//               {/* Side Lines */}
//               {card.sideLineLeft && (
//                 <div className="hidden sm:flex absolute -left-1 md:-left-3 -top-7 md:-top-10 h-full flex-col items-center">
//                   <svg
//                     className="sm:h-[140px] md:h-[160px]"
//                     width="2"
//                     viewBox="0 0 2 209"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <line x1="1" x2="1" y2="209" stroke="#1E88E5" strokeWidth="1.6" />
//                   </svg>
//                   <div className="w-2 h-2 rounded-full border-2 border-[#1E88E5] bg-white"></div>
//                 </div>
//               )}
//               {card.sideLineRight && (
//                 <div className="hidden sm:flex absolute -right-5 md:-right-3 -top-7 md:-top-10 h-full flex-col items-center">
//                   <svg
//                     className="sm:h-[150px] md:h-[165px]"
//                     width="2"
//                     viewBox="0 0 2 222"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <line x1="1" x2="1" y2="209" stroke="#1E88E5" strokeWidth="1.6" />
//                   </svg>
//                   <div className="w-2 h-2 rounded-full border-2 border-[#1E88E5] bg-white -bottom-3 -mt-2"></div>
//                 </div>
//               )}

//               {/* Card */}
//               <div
//                 className="
//                   relative bg-[#F5FAFF] border-2 border-[#1E88E5]
//                   rounded-[24px] text-center flex flex-col items-center justify-start
//                   p-5 sm:p-3 md:p-4
//                   w-[230px] sm:w-[165px] md:w-[180px]
//                   h-[340px] sm:h-[250px] md:h-[270px]
//                   shadow-md z-10
//                 "
//               >
//                 <div className="flex justify-center items-center mb-5 sm:mb-3 mt-2 flip-container w-20 h-20 sm:w-14 sm:h-14">
//                   <div className="flip-inner">
//                     <div className="flip-front">
//                       <img src={card.img} alt={card.title} />
//                     </div>
//                     <div className="flip-back">
//                       <img src={card.img} alt={card.title} />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Text Section */}
//                 <div className="flex flex-col justify-start flex-grow">
//                   <h3 className="text-[#1E88E5] font-semibold text-base sm:text-xs md:text-xs mb-2 sm:mb-1">
//                     {card.title}
//                   </h3>
//                   <p className="text-gray-700 text-sm sm:text-[11px] md:text-[11px] leading-snug px-1">
//                     {card.desc}
//                   </p>
//                 </div>
//               </div>

//               {/* Connector Line */}
//               {idx < cards.length - 1 && (
//                 <div className="hidden sm:block absolute top-[50%] right-[-12px] translate-y-[-50%] z-0">
//                   {connectorSvg}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };
// <style>{`
//   /* 🌟 Tablet-only fixes (768px–1024px) */
//   @media (min-width: 768px) and (max-width: 1024px) {
//     .why-card {
//       width: 160px !important;
//       height: 250px !important;
//       padding: 0.7rem !important;
//     }

//     .why-card h3 {
//       font-size: 0.7rem !important;
//       margin-bottom: 0.3rem !important;
//     }

//     .why-card p {
//       font-size: 0.7rem !important;
//       line-height: 1rem !important;
//       padding: 0 0.25rem !important;
//     }

//     .flip-container {
//       width: 60px !important;
//       height: 60px !important;
//     }

//     svg {
//       transform: scale(0.85);
//       transform-origin: center;
//     }

//     .md\\:gap-5 {
//       gap: 0.8rem !important;
//     }

//     .flip-inner img {
//       width: 34px !important;
//       height: 34px !important;
//     }
//   }
// `}</style>


// export default WhyChooseRareminds;


import React from "react";

import proven from "../../assets/Proven skill.webp";
import government from "../../assets/govt trusted.webp";
import integrated from "../../assets/Integrated Ecosystem.webp";
import dataDriven from "../../assets/Data driven impact.webp";
import collaborative from "../../assets/collaborative DNA.webp";

const cards = [
  {
    title: "Proven Skills",
    desc: "Over 1.5 lakh learners trained across India in 13+ languages.",
    img: proven,
    topSvg: (
      <svg
        className="
          w-[240px] h-[40px]
          sm:w-[190px] sm:h-[30px]
          md:w-[200px] md:h-[40px]
          lg:w-[200px] lg:h-[40px]
        "
        viewBox="0 0 205 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.562491 28.9986C0.562491 28.9986 92.4467 -33.9992 203.562 29"
          stroke="#4A90E2"
          strokeWidth="1.6"
        />
      </svg>

    ),
    sideLineLeft: true,
  },
  {
    title: "Government Trusted",
    desc: "Official TNSDC Training Partner and collaborator with multiple state missions.",
    img: government,
    bottomSvg: (
      <svg
        className="
          w-[240px] h-[40px]
          sm:w-[190px] sm:h-[30px]
          md:w-[200px] md:h-[32px]
          lg:w-[200px] lg:h-[32px]
        "
        viewBox="0 0 205 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M203.477 0.880221C203.477 0.880221 111.592 61.6281 0.476562 0.878905"
          stroke="#4A90E2"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
  {
    title: "Integrated Ecosystem",
    desc: "From classroom to career powered by the Skill Passport & 360° model.",
    img: integrated,
    topSvg: (
      <svg
        className="
          w-[240px] h-[40px]
          sm:w-[150px] sm:h-[20px]
          md:w-[200px] md:h-[40px]
          lg:w-[200px] lg:h-[40px]
        "
        viewBox="0 0 205 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.562491 28.9986C0.562491 28.9986 92.4467 -33.9992 203.562 29"
          stroke="#4A90E2"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
  {
    title: "Data-Driven Impact",
    desc: "40% rise in employability scores and measurable placement outcomes.",
    img: dataDriven,
    bottomSvg: (
      <svg
        className="
          w-[240px] h-[40px]
          sm:w-[190px] sm:h-[30px]
          md:w-[200px] md:h-[32px]
          lg:w-[200px] lg:h-[32px]
        "
        viewBox="0 0 205 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M203.477 0.880221C203.477 0.880221 111.592 61.6281 0.476562 0.878905"
          stroke="#4A90E2"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
  {
    title: "Collaborative DNA",
    desc: "Long-term partnerships with universities, corporates, and policymakers.",
    img: collaborative,
    topSvg: (
      <svg
        className="
          w-[240px] h-[40px]
          sm:w-[190px] sm:h-[30px]
          md:w-[200px] md:h-[40px]
          lg:w-[200px] lg:h-[40px]
        "
        viewBox="0 0 205 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.562491 28.9986C0.562491 28.9986 92.4467 -33.9992 203.562 29"
          stroke="#4A90E2"
          strokeWidth="1.6"
        />
      </svg>
    ),
    sideLineRight: true,
  },
];

const connectorSvg = (
  <svg
    className="sm:h-[280px] md:h-[350px] lg:h-[350px]"
    width="2"
    viewBox="0 0 2 430"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="1" x2="1" y2="430" stroke="#4A90E2" strokeWidth="1.6" />
  </svg>
);

const WhyChooseRareminds = () => {
  return (
    <section
      className="
        bg-white relative overflow-visible
        pt-4 pb-1
        sm:pt-6 sm:pb-16
        md:pt-10 md:pb-28
        mb-1 sm:mb-10 md:mb-20
      "
    >
      <style>{`
  .flip-container {
    perspective: 1000px;
  }

  .flip-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.8s ease-in-out;
    transform-style: preserve-3d;
  }

  .flip-container:hover .flip-inner {
    transform: rotateY(180deg) scale(1.1);
  }

  .flip-front,
  .flip-back {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed #1E88E5;
    background: white;
  }

  .flip-back {
    transform: rotateY(180deg);
  }

  .flip-front img,
  .flip-back img {
    width: 38px;
    height: 38px;
    object-fit: contain;
    transition: transform 0.8s ease-in-out;
  }

  .flip-container:hover .flip-front img,
  .flip-container:hover .flip-back img {
    transform: scale(1.1);
  }

  /* 🌟 Tablet-only fixes (768px–1024px) */
  @media (min-width: 768px) and (max-width: 1024px) {
    .why-card {
      width: 160px !important;
      height: 250px !important;
      padding: 0.7rem !important;
    }

    .why-card h3 {
      font-size: 0.7rem !important;
      margin-bottom: 0.3rem !important;
    }

    .why-card p {
      font-size: 0.7rem !important;
      line-height: 1rem !important;
      padding: 0 0.25rem !important;
    }

    .flip-container {
      width: 60px !important;
      height: 60px !important;
      perspective: 1000px !important;
    }

    .flip-inner {
      position: relative !important;
      width: 100% !important;
      height: 100% !important;
      transition: transform 0.8s !important;
      transform-style: preserve-3d !important;
    }

    /* Flip the entire card on hover */
    .flip-container:hover .flip-inner {
      transform: rotateY(180deg) !important;
    }

    .flip-front,
    .flip-back {
      position: absolute !important;
      width: 100% !important;
      height: 100% !important;
      backface-visibility: hidden !important;
      border-radius: 1rem !important;
    }

    .flip-front {
      background: white !important;
    }

    .flip-back {
      background: #f9f9f9 !important;
      transform: rotateY(180deg) !important;
    }

    svg {
      transform: scale(0.85);
      transform-origin: center;
    }

    /* Hide vertical connector lines on tablet */
    .connector-line {
      display: none !important;
    }

    /* Hide side lines on tablet */
    .side-line {
      display: none !important;
    }

    /* Grid layout for tablet */
    .cards-wrapper {
      display: grid !important;
      grid-template-columns: repeat(6, 1fr) !important;
      justify-items: center !important;
      gap: 0.2rem !important;
    }

    /* Top row: 3 cards spanning 2 columns each */
    .cards-wrapper > div:nth-child(1) {
      grid-column: 1 / span 2 !important;
    }

    .cards-wrapper > div:nth-child(2) {
      grid-column: 3 / span 2 !important;
    }

    .cards-wrapper > div:nth-child(3) {
      grid-column: 5 / span 2 !important;
    }

    /* Second row: perfectly centered between top cards */
    .cards-wrapper > div:nth-child(4) {
      grid-column: 2 / span 2 !important;
      margin-top: 2rem !important;
    }

    .cards-wrapper > div:nth-child(5) {
      grid-column: 4 / span 2 !important;
      margin-top: 2rem !important;
    }

    .flip-inner img {
      width: 34px !important;
      height: 34px !important;
    }
  }

  /* 👇 Hide connector line only near 640px width range (small tablets) */
  @media (min-width: 640px) and (max-width: 767.98px) {
    .connector-line {
      display: none !important;
    }
      .side-line {
      display: none !important;
    }

  }
    /* ✅ Hide arcs (topSvg & bottomSvg) only at 1024px range */
@media (min-width: 1024px) and (max-width: 1025px) {
  .top-arc,
  .bottom-arc {
    display: none !important;
  }
  /* Reduce gaps between cards */
  .cards-wrapper {
    gap: 0.5rem !important;           /* tighter horizontal spacing */
    row-gap: 1.5rem !important;     /* tighter vertical spacing */
    margin-top: 1rem !important;    /* slightly closer to heading */
    margin-bottom: 4rem !important; /* balanced bottom space */
  }

  /* Move the whole section upward */
  section {
    margin-top: -60px !important;   /* lift the section upward */
  }
}
  

`}</style>


      <div className="container mx-auto px-4 max-w-7xl">
        <h2
          className="
            text-3xl sm:text-3xl md:text-3xl font-bold text-center text-gray-900
            mb-10 sm:mb-10 md:mb-16 lg:mb-24
            mt-[-10px] sm:mt-[-50px] md:mt-[-170px] lg:mt-[-20px]
          "
        >
          Why Choose Rareminds
        </h2>

        <div className="cards-wrapper relative flex justify-center items-start gap-6 sm:gap-3 md:gap-5 mt-4 mb-20 overflow-visible flex-wrap lg:flex-nowrap">
          {cards.map((card, idx) => (
            <div key={idx} className="relative flex flex-col items-center">
              {/* Top and Bottom SVGs */}
              {card.topSvg && (
                <div className="top-arc hidden lg:block absolute -top-[60px] md:-top-[75px] left-1/2 -translate-x-1/2 z-20">
                  {card.topSvg}
                </div>
              )}
              {card.bottomSvg && (
                <div className="bottom-arc hidden lg:block absolute -bottom-[60px] md:-bottom-[70px] left-1/2 -translate-x-1/2 z-20">
                  {card.bottomSvg}
                </div>
              )}

              {/* Side Lines - Hidden on tablet */}
              {card.sideLineLeft && (
                <div className="side-line hidden sm:flex lg:flex absolute -left-1 md:-left-3 -top-7 md:-top-10 h-full flex-col items-center">
                  <svg
                    className="sm:h-[140px] md:h-[160px]"
                    width="2"
                    viewBox="0 0 2 209"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="1" x2="1" y2="209" stroke="#1E88E5" strokeWidth="1.6" />
                  </svg>
                  <div className="w-2 h-2 rounded-full border-2 border-[#1E88E5] bg-white"></div>
                </div>
              )}
              {card.sideLineRight && (
                <div className="side-line hidden sm:flex lg:flex absolute -right-5 md:-right-3 -top-7 md:-top-10 h-full flex-col items-center">
                  <svg
                    className="sm:h-[150px] md:h-[165px]"
                    width="2"
                    viewBox="0 0 2 222"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="1" x2="1" y2="209" stroke="#1E88E5" strokeWidth="1.6" />
                  </svg>
                  <div className="w-2 h-2 rounded-full border-2 border-[#1E88E5] bg-white -bottom-3 -mt-2"></div>
                </div>
              )}

              {/* Card */}
              <div
                className="
                  why-card
                  relative bg-[#F5FAFF] border-2 border-[#1E88E5]
                  rounded-[24px] text-center flex flex-col items-center justify-start
                  p-5 sm:p-3 md:p-4
                  w-[230px] sm:w-[165px] md:w-[180px]
                  h-[340px] sm:h-[250px] md:h-[270px]
                  shadow-md z-10
                "
              >
                <div className="flex justify-center items-center mb-5 sm:mb-3 mt-2 flip-container w-20 h-20 sm:w-14 sm:h-14">
                  <div className="flip-inner">
                    <div className="flip-front">
                      <img src={card.img} alt={card.title} />
                    </div>
                    <div className="flip-back">
                      <img src={card.img} alt={card.title} />
                    </div>
                  </div>
                </div>

                {/* Text Section */}
                <div className="flex flex-col justify-start flex-grow">
                  <h3 className="text-[#1E88E5] font-semibold text-base sm:text-xs md:text-xs mb-2 sm:mb-1 py-3">
                    {card.title}
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-[11px] md:text-[11px] leading-snug px-1">
                    {card.desc}
                  </p>
                </div>
              </div>

              {/* Connector Line - Hidden on tablet (md), visible on mobile (sm) and desktop (lg) */}
              {idx < cards.length - 1 && (
                <div className="connector-line hidden sm:block lg:block absolute top-[50%] right-[-12px] translate-y-[-50%] z-0">
                  {connectorSvg}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseRareminds;