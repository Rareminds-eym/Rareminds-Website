import Marquee from 'react-fast-marquee';
// MarqueeRow: reusable component for infinite logo loop
interface MarqueeRowProps {
  logos: { image: any; name: string }[];
  direction: 'left' | 'right';
  duration?: number;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({ logos, direction, duration = 15 }) => {
  // Repeat logos to fill the visible area and avoid gaps
  const repeatedLogos = Array(4).fill(logos).flat();
  return (
    <div className="relative flex justify-center overflow-hidden">
      <Marquee
        direction={direction}
        speed={50}
        gradient={false}
        pauseOnHover={true}
        style={{ width: '100%' }}
      >
        {repeatedLogos.map((logo, idx) => (
          <PartnerCard key={logo.name + idx} image={logo.image} name={logo.name} />
        ))}
      </Marquee>
    </div>
  );
};
// // // "use client";
// // // import React from "react";
// // // import Image from "next/image";

// // // // import your logos from assets
// // // import tnsdc from "../../assets/tamil.png";
// // // import naan from "../../assets/Tripura Skill Development Mission 1.png";
// // // import tripura from "../../assets/skill.png";
// // // import vels from "../../assets/Vels_University_logo 1.png";
// // // import anna from "../../assets/Anna_University_Logo.svg 1.png";
// // // import bharathiar from "../../assets/Bharathiar_University_logo 1.png";
// // // import multiple from "../../assets/university.png";
// // // import toyota from "../../assets/toyato.png";
// // // import industry from "../../assets/skill.png";

// // // const PartnerCard = ({ image, name }: { image: any; name: string }) => (
// // //   <div className="flex flex-col items-center bg-white shadow-md hover:shadow-lg rounded-2xl p-6 w-44 h-52 transition-all duration-300">
// // //     <div className="flex items-center justify-center h-24 mb-3">
// // //       <Image src={image} alt={name} className="object-contain h-20 w-auto" />
// // //     </div>
// // //     <p className="text-center text-sm text-gray-800 font-medium leading-snug">{name}</p>
// // //   </div>
// // // );

// // // const PartnersAndCollaborations = () => {
// // //   return (
// // //     <section className="py-24 bg-gray-50">
// // //       {/* Heading */}
// // //       <h2 className="text-4xl md:text-5xl font-extrabold text-center text-black mb-4">
// // //         Partners and Collaborations
// // //       </h2>
// // //       <p className="text-lg text-gray-600 text-center mb-16">By Audience Type</p>

// // //       <div className="container mx-auto px-6">
// // //         {/* Government & Mission Collaborations */}
// // //         <div className="mb-20 text-center">
// // //           <h3 className="text-xl font-semibold text-gray-900 mb-8">
// // //             Government & Mission Collaborations
// // //           </h3>
// // //           <div className="flex flex-wrap justify-center gap-10">
// // //             <PartnerCard image={tnsdc} name="Tamil Nadu Skill Development Corporation (TNSDC)" />
// // //             <PartnerCard image={naan} name="NAAN MADUHLVAN" />
// // //             <PartnerCard image={tripura} name="Tripura Skill Development Mission" />
// // //           </div>
// // //         </div>

// // //         {/* Universities & Institutions */}
// // //         <div className="mb-20 text-center">
// // //           <h3 className="text-xl font-semibold text-gray-900 mb-8">
// // //             Universities & Institutions
// // //           </h3>
// // //           <div className="flex flex-wrap justify-center gap-10">
// // //             <PartnerCard image={vels} name="VELS University" />
// // //             <PartnerCard image={anna} name="ANNA University" />
// // //             <PartnerCard image={bharathiar} name="Bharathiyar University" />
// // //             <PartnerCard image={multiple} name="Multiple Arts and Science Colleges Across Tamil Nadu" />
// // //           </div>
// // //         </div>

// // //         {/* Corporate Collaborations */}
// // //         <div className="text-center">
// // //           <h3 className="text-xl font-semibold text-gray-900 mb-8">
// // //             Corporate Collaborations
// // //           </h3>
// // //           <div className="flex flex-wrap justify-center gap-10">
// // //             <PartnerCard image={toyota} name="TOYOTA" />
// // //             <PartnerCard image={industry} name="Partner industries for skill training" />
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default PartnersAndCollaborations;

// // "use client";
// // import React from "react";

// // // import your logos from assets
// // import tnsdc from "../../assets/tamil.png";
// // import naan from "../../assets/Tripura Skill Development Mission 1.png";
// // import tripura from "../../assets/skill.png";
// // import vels from "../../assets/Vels_University_logo 1.png";
// // import anna from "../../assets/Anna_University_Logo.svg 1.png";
// // import bharathiar from "../../assets/Bharathiar_University_logo 1.png";
// // import multiple from "../../assets/university.png";
// // import toyota from "../../assets/toyato.png";
// // import industry from "../../assets/skill.png";

// // interface PartnerCardProps {
// //   image: string;
// //   name: string;
// // }

// // const PartnerCard: React.FC<PartnerCardProps> = ({ image, name }) => (
// //   <div className="flex flex-col items-center bg-white shadow-md hover:shadow-lg rounded-2xl p-6 w-44 h-40 transition-all duration-300">
// //     <div className="flex items-center justify-center h-20 mb-3">
// //       <img 
// //         src={image} 
// //         alt={name} 
// //         className="object-contain h-13 w-auto"
// //       />
// //     </div>
// //     <p className="text-center text-sm text-gray-800 font-medium leading-snug">{name}</p>
// //   </div>
// // );

// // const PartnersAndCollaborations: React.FC = () => {
// //   return (
// //     <section className="py-24 bg-gray-50">
// //       {/* Heading */}
// //       <h2 className="text-3xl md:text-4xl font-extrabold text-center text-black mb-4">
// //         Partners and Collaborations
// //       </h2>
// //       <p className="text-lg text-gray-600 text-center mb-16">By Audience Type</p>

// //       <div className="container mx-auto px-6">
// //         {/* Government & Mission Collaborations */}
// //         <div className="mb-20 text-center">
// //           <h3 className="text-lg font-semibold text-gray-900 mb-8">
// //             Government & Mission Collaborations
// //           </h3>
// //           <div className="flex flex-wrap justify-center gap-10">
// //             <PartnerCard image={tnsdc} name="Tamil Nadu Skill Development Corporation" />
// //             <PartnerCard image={naan} name="NAAN MADUHLVAN" />
// //             <PartnerCard image={tripura} name="Tripura Skill Development Mission" />
// //           </div>
// //         </div>

// //         {/* Universities & Institutions */}
// //         <div className="mb-20 text-center">
// //           <h3 className="text-lg font-semibold text-gray-900 mb-8">
// //             Universities & Institutions
// //           </h3>
// //           <div className="flex flex-wrap justify-center gap-10">
// //             <PartnerCard image={vels} name="VELS University" />
// //             <PartnerCard image={anna} name="ANNA University" />
// //             <PartnerCard image={bharathiar} name="Bharathiyar University" />
// //             <PartnerCard image={multiple} name="Multiple Arts and Science Colleges Across Tamil Nadu" />
// //           </div>
// //         </div>

// //         {/* Corporate Collaborations */}
// //         <div className="text-center">
// //           <h3 className="text-lg font-semibold text-gray-900 mb-8">
// //             Corporate Collaborations
// //           </h3>
// //           <div className="flex flex-wrap justify-center gap-10">
// //             <PartnerCard image={toyota} name="TOYOTA" />
// //             <PartnerCard image={industry} name="Partner industries for skill training" />
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default PartnersAndCollaborations;

// // import React from "react";

// // // import your logos from assets
// // import tnsdc from "../../assets/tamil.png";
// // import naan from "../../assets/Tripura Skill Development Mission 1.png";
// // import tripura from "../../assets/skill.png";
// // import vels from "../../assets/Vels_University_logo 1.png";
// // import anna from "../../assets/Anna_University_Logo.svg 1.png";
// // import bharathiar from "../../assets/Bharathiar_University_logo 1.png";
// // import multiple from "../../assets/university.png";
// // import toyota from "../../assets/toyato.png";
// // import industry from "../../assets/skill.png";

// // interface PartnerCardProps {
// //   image: string;
// //   name: string;
// // }

// // const PartnerCard: React.FC<PartnerCardProps> = ({ image, name }) => (
// //   <div className="flex flex-col items-center bg-white shadow-md hover:shadow-lg rounded-2xl p-4 w-36 h-32 transition-all duration-300">
// //     <div className="flex items-center justify-center h-16 mb-2">
// //       <img 
// //         src={image} 
// //         alt={name} 
// //         className="object-contain h-12 w-auto"
// //       />
// //     </div>
// //     <p className="text-center text-xs text-gray-800 font-medium leading-tight">{name}</p>
// //   </div>
// // );

// // const PartnersAndCollaborations: React.FC = () => {
// //   return (
// //     <section className="py-24">
// //       {/* Heading */}
// //       <h2 className="text-3xl md:text-4xl font-extrabold text-center text-black mb-4">
// //         Partners and Collaborations
// //       </h2>
// //       <p className="text-lg text-gray-600 text-center mb-16">By Audience Type</p>

// //       <div className="container mx-auto px-6">
// //         {/* Government & Mission Collaborations */}
// //         <div className="mb-20 text-center overflow-hidden">
// //           <h3 className="text-lg font-semibold text-gray-900 mb-8">
// //             Government & Mission Collaborations
// //           </h3>
// //           <div className="flex flex-wrap justify-center gap-10 animate-slide-left">
// //             <PartnerCard image={tnsdc} name="Tamil Nadu Skill Development Corporation" />
// //             <PartnerCard image={naan} name="NAAN MADUHLVAN" />
// //             <PartnerCard image={tripura} name="Tripura Skill Development Mission" />
// //           </div>
// //         </div>

// //         {/* Universities & Institutions */}
// //         <div className="mb-20 text-center overflow-hidden">
// //           <h3 className="text-lg font-semibold text-gray-900 mb-8">
// //             Universities & Institutions
// //           </h3>
// //           <div className="flex flex-wrap justify-center gap-10 animate-slide-right">
// //             <PartnerCard image={vels} name="VELS University" />
// //             <PartnerCard image={anna} name="ANNA University" />
// //             <PartnerCard image={bharathiar} name="Bharathiyar University" />
// //             <PartnerCard image={multiple} name="Multiple Arts and Science Colleges Across Tamil Nadu" />
// //           </div>
// //         </div>

// //         {/* Corporate Collaborations */}
// //         <div className="text-center overflow-hidden">
// //           <h3 className="text-lg font-semibold text-gray-900 mb-8">
// //             Corporate Collaborations
// //           </h3>
// //           <div className="flex flex-wrap justify-center gap-10 animate-slide-left">
// //             <PartnerCard image={toyota} name="TOYOTA" />
// //             <PartnerCard image={industry} name="Partner industries for skill training" />
// //           </div>
// //         </div>
// //       </div>

// //       <style>{`
// //         @keyframes slideLeft {
// //           from {
// //             opacity: 0;
// //             transform: translateX(100px);
// //           }
// //           to {
// //             opacity: 1;
// //             transform: translateX(0);
// //           }
// //         }

// //         @keyframes slideRight {
// //           from {
// //             opacity: 0;
// //             transform: translateX(-100px);
// //           }
// //           to {
// //             opacity: 1;
// //             transform: translateX(0);
// //           }
// //         }

// //         .animate-slide-left {
// //           animation: slideLeft 1s ease-out;
// //         }

// //         .animate-slide-right {
// //           animation: slideRight 1s ease-out;
// //         }
// //       `}</style>
// //     </section>
// //   );
// // };

// // export default PartnersAndCollaborations;

// import React from "react";

// // import your logos from assets
// import tnsdc from "../../assets/tamil.png";
// import naan from "../../assets/Tripura Skill Development Mission 1.png";
// import tripura from "../../assets/skill.png";
// import vels from "../../assets/Vels_University_logo 1.png";
// import anna from "../../assets/Anna_University_Logo.svg 1.png";
// import bharathiar from "../../assets/Bharathiar_University_logo 1.png";
// import multiple from "../../assets/university.png";
// import toyota from "../../assets/toyato.png";
// import industry from "../../assets/skill.png";

// interface PartnerCardProps {
//   image: string;
//   name: string;
// }

// const PartnerCard: React.FC<PartnerCardProps> = ({ image, name }) => (
//   <div className="flex flex-col items-center shadow-md hover:shadow-lg rounded-xl p-3 w-28 h-28 transition-all duration-300 transform hover:scale-105">
//     <div className="flex items-center justify-center h-14 mb-1">
//       <img
//         src={image}
//         alt={name}
//         className="object-contain h-10 w-auto"
//       />
//     </div>
//     <p className="text-center text-[10px] text-gray-800 font-medium leading-tight">
//       {name}
//     </p>
//   </div>
// );

// const PartnersAndCollaborations: React.FC = () => {
//   return (
//     <section className="py-24 overflow-hidden">
//       {/* Heading */}
//       <h2 className="text-3xl md:text-4xl font-extrabold text-center text-black mb-4">
//         Partners and Collaborations
//       </h2>
//       <p className="text-lg text-gray-600 text-center mb-16">
//         By Audience Type
//       </p>

//       <div className="container mx-auto px-6">
//         {/* Government & Mission Collaborations */}
//         <div className="mb-20 text-center overflow-hidden">
//           <h3 className="text-lg font-semibold text-gray-900 mb-8">
//             Government & Mission Collaborations
//           </h3>
//           <div className="flex flex-wrap justify-center gap-8 animate-slide-left-infinite">
//             <PartnerCard image={tnsdc} name="Tamil Nadu Skill Development Corporation" />
//             <PartnerCard image={naan} name="NAAN MADUHLVAN" />
//             <PartnerCard image={tripura} name="Tripura Skill Development Mission" />
//           </div>
//         </div>

//         {/* Universities & Institutions */}
//         <div className="mb-20 text-center overflow-hidden">
//           <h3 className="text-lg font-semibold text-gray-900 mb-8">
//             Universities & Institutions
//           </h3>
//           <div className="flex flex-wrap justify-center gap-8 animate-slide-right-infinite">
//             <PartnerCard image={vels} name="VELS University" />
//             <PartnerCard image={anna} name="ANNA University" />
//             <PartnerCard image={bharathiar} name="Bharathiyar University" />
//             <PartnerCard image={multiple} name="Multiple Arts and Science Colleges Across Tamil Nadu" />
//           </div>
//         </div>

//         {/* Corporate Collaborations */}
//         <div className="text-center overflow-hidden">
//           <h3 className="text-lg font-semibold text-gray-900 mb-8">
//             Corporate Collaborations
//           </h3>
//           <div className="flex flex-wrap justify-center gap-8 animate-slide-left-infinite">
//             <PartnerCard image={toyota} name="TOYOTA" />
//             <PartnerCard image={industry} name="Partner industries for skill training" />
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes slideLeftInfinite {
//           0% {
//             transform: translateX(0);
//           }
//           50% {
//             transform: translateX(-40px);
//           }
//           100% {
//             transform: translateX(0);
//           }
//         }

//         @keyframes slideRightInfinite {
//           0% {
//             transform: translateX(0);
//           }
//           50% {
//             transform: translateX(40px);
//           }
//           100% {
//             transform: translateX(0);
//           }
//         }

//         .animate-slide-left-infinite {
//           animation: slideLeftInfinite 4s ease-in-out infinite;
//         }

//         .animate-slide-right-infinite {
//           animation: slideRightInfinite 4s ease-in-out infinite;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default PartnersAndCollaborations;
// import React from "react";

// // import your logos from assets
// import tnsdc from "../../assets/tamil.png";
// import naan from "../../assets/Tripura Skill Development Mission 1.png";
// import tripura from "../../assets/skill.png";
// import vels from "../../assets/Vels_University_logo 1.png";
// import anna from "../../assets/Anna_University_Logo.svg 1.png";
// import bharathiar from "../../assets/Bharathiar_University_logo 1.png";
// import multiple from "../../assets/university.png";
// import toyota from "../../assets/toyato.png";
// import industry from "../../assets/skill.png";

// interface PartnerCardProps {
//   image: string;
//   name: string;
// }

// const PartnerCard: React.FC<PartnerCardProps> = ({ image, name }) => (
//   <div className="flex flex-col items-center bg-gray-100 shadow-md hover:shadow-lg hover:bg-gray-200 rounded-xl p-3 w-28 h-28 transition-all duration-300 transform hover:scale-105">
//     <div className="flex items-center justify-center h-14 mb-1">
//       <img
//         src={image}
//         alt={name}
//         className="object-contain h-10 w-auto"
//       />
//     </div>
//     <p className="text-center text-[10px] text-gray-800 font-medium leading-tight">
//       {name}
//     </p>
//   </div>
// );

// const PartnersAndCollaborations: React.FC = () => {
//   return (
//     <section className="py-24 bg-gray-50 overflow-hidden">
//       {/* Heading */}
//       <h2 className="text-3xl md:text-4xl font-extrabold text-center text-black mb-4">
//         Partners and Collaborations
//       </h2>
//       <p className="text-lg text-gray-600 text-center mb-16">
//         By Audience Type
//       </p>

//       <div className="container mx-auto px-6">
//         {/* Government & Mission Collaborations */}
//         <div className="mb-20 text-center overflow-hidden">
//           <h3 className="text-lg font-semibold text-gray-900 mb-8">
//             Government & Mission Collaborations
//           </h3>
//           <div className="flex flex-wrap justify-center gap-8 animate-slide-left-infinite">
//             <PartnerCard image={tnsdc} name="Tamil Nadu Skill Development Corporation" />
//             <PartnerCard image={naan} name="NAAN MADUHLVAN" />
//             <PartnerCard image={tripura} name="Tripura Skill Development Mission" />
//           </div>
//         </div>

//         {/* Universities & Institutions */}
//         <div className="mb-20 text-center overflow-hidden">
//           <h3 className="text-lg font-semibold text-gray-900 mb-8">
//             Universities & Institutions
//           </h3>
//           <div className="flex flex-wrap justify-center gap-8 animate-slide-right-infinite">
//             <PartnerCard image={vels} name="VELS University" />
//             <PartnerCard image={anna} name="ANNA University" />
//             <PartnerCard image={bharathiar} name="Bharathiyar University" />
//             <PartnerCard image={multiple} name="Multiple Arts and Science Colleges Across Tamil Nadu" />
//           </div>
//         </div>

//         {/* Corporate Collaborations */}
//         <div className="text-center overflow-hidden">
//           <h3 className="text-lg font-semibold text-gray-900 mb-8">
//             Corporate Collaborations
//           </h3>
//           <div className="flex flex-wrap justify-center gap-8 animate-slide-left-infinite">
//             <PartnerCard image={toyota} name="TOYOTA" />
//             <PartnerCard image={industry} name="Partner industries for skill training" />
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes slideLeftInfinite {
//           0% {
//             transform: translateX(0);
//           }
//           50% {
//             transform: translateX(-40px);
//           }
//           100% {
//             transform: translateX(0);
//           }
//         }

//         @keyframes slideRightInfinite {
//           0% {
//             transform: translateX(0);
//           }
//           50% {
//             transform: translateX(40px);
//           }
//           100% {
//             transform: translateX(0);
//           }
//         }

//         .animate-slide-left-infinite {
//           animation: slideLeftInfinite 4s ease-in-out infinite;
//         }

//         .animate-slide-right-infinite {
//           animation: slideRightInfinite 4s ease-in-out infinite;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default PartnersAndCollaborations;


import React from "react";

// import your logos from assets
import tnsdc from "../../assets/tamil_nadu.jpg";
import tripura from "../../assets/logo_sdp.webp";
import naan from "../../assets/skill.png";
import vels from "../../assets/Vels_University_logo 1.png";
import anna from "../../assets/Anna_University_Logo.svg 1.png";
import bharathiar from "../../assets/Bharathiar_University_logo 1.png";
// import multiple from "../../assets/university.png";
import toyota from "../../assets/toyato.png";
import industry from "../../assets/sugam.png";

interface PartnerCardProps {
  image: string;
  name: string;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ image, name }) => (
  <div className="flex flex-col items-center bg-white shadow-md hover:shadow-lg hover:bg-gray-100 rounded-xl p-3 w-28 min-h-28 transition-all duration-300 transform hover:scale-105 mx-3">
    <div className="flex items-center justify-center flex-shrink-0 h-14 mb-1">
      <img
        src={image}
        alt={name}
        className="object-contain h-10 w-auto max-w-full "
        onError={e => {
          // Only fallback for local images, not external URLs
          if (image.startsWith('/institutions/logos/')) {
            e.currentTarget.src = '/institutions/logos/logo1.png';
          } else if (image.startsWith('/Corporate/Images/')) {
            e.currentTarget.src = '/Corporate/Images/logo1.png';
          } else if (image.startsWith('/Govt-Images/Logos/')) {
            e.currentTarget.src = '/Govt-Images/Logos/logo1.png';
          }
        }}
      />
    </div>
    <p className="text-center text-[10px] text-gray-800 font-medium leading-tight line-clamp-3">
      {name}
    </p>
  </div>
);


const PartnersAndCollaborations: React.FC = () => {
  return (
  <section className="py-16 md:py-24 bg-gray-100 overflow-hidden">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-black mb-4">
        Partners and Collaborations
      </h2>
      <p className="text-lg text-gray-600 text-center mb-4">
        By Audience Type
      </p>

      <div className="container mx-auto">
        {/* Government & Mission Collaborations */}
        {/* <div className="mb-9 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-8">
            Government & Mission Collaborations
          </h3>
          <MarqueeRow
            logos={[{ image: tnsdc, name: "Tamil Nadu Skill Development Corporation" }, { image: naan, name: "NAAN MADUHLVAN" }, { image: tripura, name: "Tripura Skill Development Mission" },
              { image: '/institutions/logos/Alagappa_University_Logo.png', name: "Alagappa" },
              { image: '/institutions/logos/Manonmaniam_Sundaranar_University_logo.png', name: "Manonmaniam" }
            ]}
            direction="left"
            duration={15}
          />
        </div> */}

        {/* Universities & Institutions */}
        <div className="mb-9 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-8">
            Universities & Institutions
          </h3>
          <MarqueeRow
            logos={[{ image: vels, name: "VELS University" }, { image: anna, name: "ANNA University" }, 
              { image: bharathiar, name: "Bharathiyar University" }, 
              // { image: multiple, name: "Multiple Arts and Science Colleges Across Tamil Nadu" },
              { image: '/institutions/logos/Alagappa_University_Logo.png', name: "Alagappa" },
              { image: '/institutions/logos/Bharathidasan_University_logo.png', name: "Bharathidasan" },
              { image: '/institutions/logos/Manonmaniam_Sundaranar_University_logo.png', name: "Manonmaniam" },
              { image: '/institutions/logos/Mother_Teresa_University_logo.png', name: "Mother_Teresa" },
              {image: '/institutions/logos/Madurai_Kamaraj_University_logo.png', name: "Madurai_Kamaraj"},
              {image: '/institutions/logos/University_Of_Madras_logo.png', name: "Madras"},
              {image: '/institutions/logos/TUemblem.png', name: "Thiruvalluvar"},
              {image: '/institutions/logos/PES-University-Bangalore.png', name: "PES"},
            ]}
            direction="right"
            duration={18}
          />
        </div>

        {/* Corporate Collaborations */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-8">
            Corporate Collaborations
          </h3>
          <MarqueeRow
            logos={[{ image: toyota, name: "TOYOTA" }, { image: industry, name: "Sugam" },
              { image: 'https://media.glassdoor.com/sqll/423113/infolob-solutions-squarelogo-1457532897669.png', name: "Golden Source" },
              { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Ik35QrNrZsTxJDmMKuyS7RfaX6w_I7vCPQ&s', name: "InfoLabs" },
              { image: 'https://verastarsolutions.in/images/headerlogo.png', name: "Verastar" },
              { image: 'https://static.ambitionbox.com/assets/v2/images/rs:fit:1280:960:false:false/aHR0cHM6Ly9tZWRpYS5uYXVrcmkuY29tL21lZGlhL2FiY29tcGxvZ28vZGF0YWZvcnR1bmUtb3JpZ2luYWwuanBn.png', name: "DataFortune" },
              { image: 'https://5.imimg.com/data5/SELLER/Default/2023/9/347644752/ZT/PQ/MO/3625416/csm-technologies-software.png', name: "CSM" },
              { image: 'https://nexgendrying.com/wp-content/uploads/2023/08/Nexgen-drying-logo-2.png', name: "Nexgen" },
              {image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVGpFDm8UIB2QED8UCgbTIUj5YDm9qL3wM-A&s', name: "E4m"},
              {image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsqnyIYYYsKCZROUdbJ-B5R_2l9GnibTkyrg&s', name: "BSV"},
              {image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK0R5DChZSJdBHUl_Xa1eWSoleAQjGXZARGQ&s', name: "motherson"},
              {image: 'https://rmkcdn.successfactors.com/83e0592a/d435f4cf-cd4f-4907-a013-d.png', name: "NEC"},
              {image: 'https://qwqer.in/wp-content/uploads/2023/03/Frame-2.png', name: "QWQER"},
              {image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf7c1SPaEXSdaxOv5n_wc4or5u8itx7a0CUw&s', name: "AceGroup"},
              {image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8iG8P3xhinUN6s9Qo4i5cViiF2NO9z5bqFA&s', name: "BNM"},
              {image: 'https://www.sssi.in/assets/front_new/new-style/images/logo_trademark_3.webp', name: "SSSi"},
              {image: 'https://quadgenwireless.com/wp-content/uploads/2022/12/Quadgen-Logopng.png', name: "QuadGen"},
              {image: 'https://arbrands.in/demo2/navkis-landing/images/logo/logo2.png', name:"Navkis"},
              {image: 'https://www.parkcontrols.com/image/logo/PCC%20Logo%20(No%20Background)(9.12.24)-01.png', name:"PCC"},
              {image: 'https://images.squarespace-cdn.com/content/v1/650bf3ee96714871f4364ce8/77e20a8e-6555-4c3b-84fd-817f06fa88b6/PFC+Logo+-+High+Res..png', name:'PFC'}
            ]}
            direction="left"
            duration={15}
          />
        </div>
      </div>

      {/* Removed custom marquee styles, now using react-fast-marquee for seamless loop */}
    </section>
  );
};

export default PartnersAndCollaborations;
