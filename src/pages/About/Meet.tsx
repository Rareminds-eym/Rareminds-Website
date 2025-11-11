
// // import React from "react";
// // import personImage from "../../assets/vishak.png"; // example image import

// // export default function LeadershipTeam() {
// //   const leaders = [
// //     {
// //       name: "Dr. SUBHASHINI RAMASWAMY",
// //       title: "Founder & CEO",
// //       description:
// //         "Visionary leader redefining India's skill and employability landscape.",
// //       image: null,
// //     },
// //     {
// //       name: "VISAKH MADHU",
// //       title: "Director HR, People Culture",
// //       description: "Aligning people, performance, and purpose.",
// //       image: personImage,
// //     },
// //     {
// //       name: "KRISHNALATHA",
// //       title: "Director, Operations",
// //       description: "Leading state-wide projects with precision and passion.",
// //       image: null,
// //     },
// //     {
// //       name: "SANDHYARANI",
// //       title: "Head, Recruitment & Corporate Relations",
// //       description:
// //         "Bridging talent and opportunity through strategic partnerships.",
// //       image: null,
// //     },
// //     {
// //       name: "LABHITHABORA LALITHA",
// //       title: "Head, Recruitment & Corporate Relations",
// //       description:
// //         "Bridging talent and opportunity through strategic partnerships.",
// //       image: null,
// //     },
// //   ];

// //   return (
// //     <div className="min-h-screen bg-white mb-28 px-6">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Header */}
// //         <div className="text-center mb-16">
// //           <h1 className="text-3xl md:text-4xl sm-text-5xl font-bold text-gray-900 mb-6">
// //             Led by Purpose. Driven by People.
// //           </h1>
// //           <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
// //             Our leadership team represents education, operations, and human
// //             capital at their best — united by a shared belief: skill transforms
// //             lives.
// //           </p>
// //         </div>

// //         {/* Cards Grid */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
// //           {leaders.map((leader, index) => (
// //             <div
// //               key={index}
// //               className="border border-blue-400 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
// //             >
// //               {/* Image Section */}
// //               <div className="flex justify-center items-end bg-white h-56 relative">
// //                 <div className="w-32 h-44 bg-gray-100 border border-gray-200 rounded-3xl overflow-hidden shadow-sm flex items-center justify-center -mt-10 mb-4">
// //                   {leader.image ? (
// //                     <img
// //                       src={leader.image}
// //                       alt={leader.name}
// //                       className="w-full h-full object-cover"
// //                     />
// //                   ) : (
// //                     <svg
// //                       className="w-12 h-12 text-gray-400"
// //                       fill="currentColor"
// //                       viewBox="0 0 20 20"
// //                     >
// //                       <path
// //                         fillRule="evenodd"
// //                         d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
// //                         clipRule="evenodd"
// //                       />
// //                     </svg>
// //                   )}
// //                 </div>
// //               </div>

// //               {/* Blue Section */}
// //               <div className="bg-blue-500 text-white text-center py-6 px-4 flex flex-col justify-between flex-grow rounded-t-none rounded-b-2xl">
// //                 <h3 className="font-bold text-sm md:text-base uppercase mb-1 leading-tight tracking-wide">
// //                   {leader.name}
// //                 </h3>
// //                 <p className="text-blue-50 text-xs md:text-sm font-medium mb-2">
// //                   {leader.title}
// //                 </p>
// //                 <p className="text-white text-xs md:text-sm leading-relaxed opacity-90">
// //                   {leader.description}
// //                 </p>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import React from "react";
// import personImage from "../../assets/vishak.png"; // example image import

// export default function LeadershipTeam() {
//   const leaders = [
//     {
//       name: "Dr. SUBHASHINI RAMASWAMY",
//       title: "Founder & CEO",
//       description:
//         "Visionary leader redefining India's skill and employability landscape.",
//       image: null,
//     },
//     {
//       name: "VISAKH MADHU",
//       title: "Director HR, People Culture",
//       description: "Aligning people, performance, and purpose.",
//       image: personImage,
//     },
//     {
//       name: "KRISHNALATHA",
//       title: "Director, Operations",
//       description: "Leading state-wide projects with precision and passion.",
//       image: null,
//     },
//     {
//       name: "SANDHYARANI",
//       title: "Head, Recruitment & Corporate Relations",
//       description:
//         "Bridging talent and opportunity through strategic partnerships.",
//       image: null,
//     },
//     {
//       name: "LALITHA",
//       title: "Head, Recruitment & Corporate Relations",
//       description:
//         "Bridging talent and opportunity through strategic partnerships.",
//       image: null,
//     },
//     {
//       name: "LABHITHA BORA",
//       title: "Head, Recruitment & Corporate Relations",
//       description:
//         "Bridging talent and opportunity through strategic partnerships.",
//       image: null,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-white mb-28 px-6 -mt-2 md:-mt-16">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h1 className="text-3xl md:text-4xl sm-text-5xl font-bold text-gray-900 mb-6">
//             Led by Purpose. Driven by People.
//           </h1>
//           <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
//             Our leadership team represents education, operations, and human
//             capital at their best — united by a shared belief: skill transforms
//             lives.
//           </p>
//         </div>

//         {/* Cards Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//           {leaders.map((leader, index) => (
//             <div
//               key={index}
//               className="border border-blue-400 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group w-48 sm:w-48 md:w-auto mx-auto"
//             >
//               {/* Image Section */}
//               <div className="flex justify-center items-end bg-white h-56 relative">
//                 <div
//                   className="
//                    w-32 h-44 sm:w-24 sm:h-32 md:w-32 md:h-44  bg-gray-100 border border-gray-200 rounded-3xl overflow-hidden shadow-sm 
//                     flex items-center justify-center -mt-8 sm:-mt-10 mb-4
//                     transition-all duration-500 ease-in-out 
//                     group-hover:scale-105 group-hover:border-blue-500
//                   "
//                 >
//                   {leader.image ? (
//                     <img
//                       src={leader.image}
//                       alt={leader.name}
//                       className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
//                     />
//                   ) : (
//                     <svg
//                       className="w-12 h-12 text-gray-400"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   )}
//                 </div>
//               </div>

//               {/* Blue Section */}
//               <div className="bg-blue-500 text-white text-center py-6 px-4 flex flex-col justify-between flex-grow rounded-t-none rounded-b-2xl">
//                 <h3 className="font-bold text-sm md:text-base uppercase mb-1 leading-tight tracking-wide">
//                   {leader.name}
//                 </h3>
//                 <p className="text-blue-50 text-xs md:text-sm font-medium mb-2">
//                   {leader.title}
//                 </p>
//                 <p className="text-white text-xs md:text-sm leading-relaxed opacity-90">
//                   {leader.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


// import React from "react";
// import personImage from "../../assets/vishak.png"; // example image import

// export default function LeadershipTeam() {
//   const leaders = [
//     {
//       name: "Dr. SUBHASHINI RAMASWAMY",
//       title: "Founder & CEO",
//       description:
//         "Visionary leader redefining India's skill and employability landscape.",
//       image: null,
//     },
//     {
//       name: "VISAKH MADHU",
//       title: "Director HR, People Culture",
//       description: "Aligning people, performance, and purpose.",
//       image: personImage,
//     },
//     {
//       name: "KRISHNALATHA",
//       title: "Director, Operations",
//       description: "Leading state-wide projects with precision and passion.",
//       image: null,
//     },
//     {
//       name: "SANDHYARANI",
//       title: "Head, Recruitment & Corporate Relations",
//       description:
//         "Bridging talent and opportunity through strategic partnerships.",
//       image: null,
//     },
//     {
//       name: "LALITHA",
//       title: "Head, Recruitment & Corporate Relations",
//       description:
//         "Bridging talent and opportunity through strategic partnerships.",
//       image: null,
//     },
//     {
//       name: "LABHITHA BORA",
//       title: "Head, Recruitment & Corporate Relations",
//       description:
//         "Bridging talent and opportunity through strategic partnerships.",
//       image: null,
//     },
//   ];
// <style>{`
//   /* 👇 Only for small tablets (around 640px) — tighten grid spacing */
//   @media (min-width: 640px) and (max-width: 767px) {
//     .leadership-grid {
//       gap-y: 6px !important;  /* reduce vertical gap */
//       gap-x: 10px !important; /* slightly reduce horizontal gap */
//     }
//   }
// `}</style>

//   return (
//     <div className="min-h-screen bg-white mb-28 md:mb-60 px-6 -mt-2 md:-mt-16">
//       <div className="max-w-6xl mx-auto px-0 md:px-2">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h1 className="text-3xl md:text-4xl sm-text-5xl font-bold text-gray-900 mb-6">
//             Led by Purpose. Driven by People.
//           </h1>
//           <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
//             Our leadership team represents education, operations, and human
//             capital at their best — united by a shared belief: skill transforms
//             lives.
//           </p>
//         </div>

       
// <div
//   className="
//     leadership-grid
//     grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
//     gap-y-10 gap-x-4 sm:gap-x-16 md:gap-x-10 lg:gap-x-12
//     justify-items-center
//   "
// >
//   {leaders.map((leader, index) => (
//     <div
//       key={index}
//       className="
//         border border-blue-400 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg 
//         transition-all duration-300 flex flex-col justify-between group
//         w-64 sm:w-48 md:w-56 lg:w-64   /* 👈 narrower for tablet */
//         h-[390px]
//       "
//     >
//       {/* Image Section */}
//       <div className="flex justify-center items-end bg-white h-56 relative">
//         <div
//           className="
//             w-32 h-44 sm:w-28 sm:h-36 md:w-32 md:h-44 bg-gray-100 border border-gray-200 rounded-3xl overflow-hidden shadow-sm 
//             flex items-center justify-center -mt-8 sm:-mt-10 mb-4
//             transition-all duration-500 ease-in-out 
//             group-hover:scale-105 group-hover:border-blue-500
//           "
//         >
//           {leader.image ? (
//             <img
//               src={leader.image}
//               alt={leader.name}
//               className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
//             />
//           ) : (
//             <svg
//               className="w-12 h-12 text-gray-400"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           )}
//         </div>
//       </div>

//       {/* Blue Section */}
//       <div className="bg-blue-500 text-white text-center py-6 px-4 flex flex-col justify-between flex-grow rounded-t-none rounded-b-2xl">
//         <h3 className="font-bold text-sm md:text-base uppercase mb-1 leading-tight tracking-wide">
//           {leader.name}
//         </h3>
//         <p className="text-blue-50 text-xs md:text-sm font-medium mb-2">
//           {leader.title}
//         </p>
//         <p className="text-white text-xs md:text-sm leading-relaxed opacity-90">
//           {leader.description}
//         </p>
//       </div>
//     </div>
//   ))}
// </div>

//       </div>
//     </div>
//   );
// }


//  {/* Cards Grid */}
//         {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-1 lg:gap-x-[0px] justify-items-center">
//           {leaders.map((leader, index) => (
//             <div
//               key={index}
//               className="border border-blue-400 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group w-64 h-[390px]"
//             >
              
//               <div className="flex justify-center items-end bg-white h-56 relative">
//                 <div
//                   className="
//                     w-32 h-44 sm:w-28 sm:h-36 md:w-32 md:h-44 bg-gray-100 border border-gray-200 rounded-3xl overflow-hidden shadow-sm 
//                     flex items-center justify-center -mt-8 sm:-mt-10 mb-4
//                     transition-all duration-500 ease-in-out 
//                     group-hover:scale-105 group-hover:border-blue-500
//                   "
//                 >
//                   {leader.image ? (
//                     <img
//                       src={leader.image}
//                       alt={leader.name}
//                       className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-130"
//                     />
//                   ) : (
//                     <svg
//                       className="w-12 h-12 text-gray-400"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   )}
//                 </div>
//               </div>

              
//               <div className="bg-blue-500 text-white text-center py-6 px-4 flex flex-col justify-between flex-grow rounded-t-none rounded-b-2xl">
//                 <h3 className="font-bold text-sm md:text-base uppercase mb-1 leading-tight tracking-wide">
//                   {leader.name}
//                 </h3>
//                 <p className="text-blue-50 text-xs md:text-sm font-medium mb-2">
//                   {leader.title}
//                 </p>
//                 <p className="text-white text-xs md:text-sm leading-relaxed opacity-90">
//                   {leader.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div> */}
//         {/* Cards Grid */}

import React from "react";
import personImage from "../../assets/vishak.png"; // example image import
import ps1 from "../../assets/Subhashini.jpg"
import ps2 from "../../assets/sandya.jpg"
import ps3 from "../../assets/KrishanLatha.jpg"
import ps4 from "../../assets/Lalitha.jpg"
import ps5 from "../../assets/Labhitha.jpg"
export default function LeadershipTeam() {
  const leaders = [
    {
      name: "Dr. SUBHASHINI RAMASWAMY",
      title: "Founder & CEO",
      description:
        "Visionary leader redefining India's skill and employability landscape.",
      image: ps1,
    },
    {
      name: "VISAKH MADHU",
      title: "Director HR, People Culture",
      description: "Aligning people, performance, and purpose.",
      image: personImage,
    },
    {
      name: "KRISHNALATHA",
      title: "Director, Operations",
      description: "Leading state-wide projects with precision and passion.",
      image: ps3,
    },
    {
      name: "SANDHYARANI",
      title: "Head, Recruitment & Corporate Relations",
      description:
        "Bridging talent and opportunity through strategic partnerships.",
      image: ps2,
    },
    {
      name: "LALITHA",
      title: "Head, Recruitment & Corporate Relations",
      description:
        "Bridging talent and opportunity through strategic partnerships.",
      image: ps4,
    },
    {
      name: "LABHITHA BORA",
      title: "Head, Recruitment & Corporate Relations",
      description:
        "Bridging talent and opportunity through strategic partnerships.",
      image: ps5,
    },
  ];

  return (
    <>
      {/* ✅ Inline Media Query for 640–767px */}
      <style>{`
  /* 👇 Small tablets (640–767px): tighten spacing between cards */
  @media (min-width: 640px) and (max-width: 767px) {
    div.leadership-grid {
      row-gap: 20px !important;  /* reduces vertical gap */
      column-gap: 1px !important; /* reduces horizontal gap */
    }
      .leadership-section {
      margin-top: -3rem !important;
    }
  }
  /* 👇 Tablets only (640px–1024px) — reduce top margin */
  @media (min-width: 640px) and (max-width: 767px) {
    .leadership-section {
      margin-top: -3rem !important;
    }
  }
    
    
`}</style>

      <div className="leadership-section min-h-screen bg-white mb-28 md:mb-60 px-6 -mt-2 md:-mt-16">
        <div className="max-w-6xl mx-auto px-0 md:px-2">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl sm-text-5xl font-bold text-gray-900 mb-6">
              Led by Purpose. Driven by People.
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Our leadership team represents education, operations, and human
              capital at their best — united by a shared belief: skill
              transforms lives.
            </p>
          </div>

          {/* Grid */}
          <div
            className="
              leadership-grid
              grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
              gap-y-10 gap-x-4 sm:gap-x-16 md:gap-x-10 lg:gap-x-12
              justify-items-center
            "
          >
            {leaders.map((leader, index) => (
              <div
                key={index}
                className="
                  border border-blue-400 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg 
                  transition-all duration-300 flex flex-col justify-between group
                  w-64 sm:w-48 md:w-56 lg:w-64   /* 👈 narrower for tablet */
                  h-[390px]
                "
              >
                {/* Image Section */}
                <div className="flex justify-center items-end bg-white h-56 relative">
                  <div
                    className="
                      w-32 h-44 sm:w-28 sm:h-36 md:w-32 md:h-44 bg-gray-100 border border-gray-200 rounded-3xl overflow-hidden shadow-sm 
                      flex items-center justify-center -mt-8 sm:-mt-10 mb-4
                      transition-all duration-500 ease-in-out 
                      group-hover:scale-105 group-hover:border-blue-500
                    "
                  >
                    {leader.image ? (
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                      />
                    ) : (
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Blue Section */}
                <div className="bg-blue-500 text-white text-center py-6 px-4 flex flex-col justify-between flex-grow rounded-t-none rounded-b-2xl">
                  <h3 className="font-bold text-sm md:text-base uppercase mb-1 leading-tight tracking-wide">
                    {leader.name}
                  </h3>
                  <p className="text-blue-50 text-xs md:text-sm font-medium mb-2">
                    {leader.title}
                  </p>
                  <p className="text-white text-xs md:text-sm leading-relaxed opacity-90">
                    {leader.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
