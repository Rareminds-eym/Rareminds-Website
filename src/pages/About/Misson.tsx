

// import React from "react";
// import { FaFlask, FaEye, FaTrophy } from "react-icons/fa";

// const MissionVisionValues = () => {
//   return (
//     <div className="container mx-auto pt-0 pb-5 px-4 -mt-20">
//       <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">Mission Vision Values</h2>
//       <div className="flex items-center justify-center space-x-16">
//         {/* SVG Connector Line Between Mission and Vision */}
//         {/* Mission Section */}
//         <div className="flex flex-col items-center relative">
//           <div className="bg-black p-2 rounded-xl mb-3">
//             <FaFlask className="h-8 w-8 text-white" />
//           </div>
//           <h3 className="text-xl font-semibold text-gray-900 mb-3">Mission</h3>
//           <p className="text-gray-600 text-lg text-center max-w-xs mx-auto">
//             To build a sustainable Skill Ecosystem that transforms learning into livelihoods and creates measurable social impact.
//           </p>
//         </div>

//         {/* SVG Connector Line Between Vision and Values */}
//         <div className="hidden md:block relative">
//           <svg width="2" height="350" viewBox="0 0 2 400" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <line x1="1" y1="0" x2="1" y2="350" stroke="black" strokeWidth="2" />
//           </svg>
//         </div>

//         {/* Vision Section */}
//         <div className="flex flex-col items-center relative">
//           <div className="bg-black p-2 rounded-xl mb-3">
//             <FaEye className="h-8 w-8 text-white" />
//           </div>
//           <h3 className="text-xl font-semibold text-gray-900 mb-3">Vision</h3>
//           <p className="text-gray-600 text-lg text-center max-w-xs mx-auto">
//             To be India’s most trusted catalyst for employability and skill-driven growth, empowering one million learners by 2030.
//           </p>
//         </div>

//         {/* SVG Connector Line Between Values */}
//         <div className="hidden md:block relative">
//           <svg width="2" height="350" viewBox="0 0 2 400" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <line x1="1" y1="0" x2="1" y2="350" stroke="black" strokeWidth="2" />
//           </svg>
//         </div>

//         {/* Values Section */}
//         <div className="flex flex-col items-center relative">
//           <div className="bg-black p-2 rounded-xl mb-3">
//             <FaTrophy className="h-8 w-8 text-white" />
//           </div>
//           <h3 className="text-xl font-semibold text-gray-900 mb-16">Values</h3>
//           <p className="text-gray-600 text-lg text-center max-w-xs mx-auto">
//            Empathy, Innovation, Collaboration, Excellence, Ownership
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MissionVisionValues;

import React from "react";
import { FaFlask, FaEye, FaTrophy } from "react-icons/fa";

const MissionVisionValues = () => {
  return (
    <div className="container mx-auto pt-0 pb-0 mb-1 -mt-8 px-4 md:pt-0 md:-mt-20 md:pb-10 md:mb-10">
      <h2 className="text-3xl font-bold text-center mb-6 md:mb-16 text-gray-900">
        Mission Vision Values
      </h2>

      {/* Desktop layout remains unchanged */}
      <div className="hidden md:flex items-center justify-center space-x-16">
        {/* Mission Section */}
        <div className="flex flex-col items-center relative">
          <div className="bg-black p-2 rounded-xl mb-3">
            <FaFlask className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Mission</h3>
          <p className="text-gray-600 text-lg text-center max-w-xs mx-auto">
            To build a sustainable Skill Ecosystem that transforms learning into livelihoods and creates measurable social impact.
          </p>
        </div>

        {/* SVG Connector Line Between Mission and Vision */}
        <div className="hidden md:block relative">
          <svg width="2" height="350" viewBox="0 0 2 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="1" y1="0" x2="1" y2="350" stroke="black" strokeWidth="2" />
          </svg>
        </div>

        {/* Vision Section */}
        <div className="flex flex-col items-center relative">
          <div className="bg-black p-2 rounded-xl mb-3">
            <FaEye className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Vision</h3>
          <p className="text-gray-600 text-lg text-center max-w-xs mx-auto">
            To be India’s most trusted catalyst for employability and skill-driven growth, empowering one million learners by 2030.
          </p>
        </div>

        {/* SVG Connector Line Between Values */}
        <div className="hidden md:block relative">
          <svg width="2" height="350" viewBox="0 0 2 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="1" y1="0" x2="1" y2="350" stroke="black" strokeWidth="2" />
          </svg>
        </div>

        {/* Values Section */}
        <div className="flex flex-col items-center relative">
          <div className="bg-black p-2 rounded-xl mb-3">
            <FaTrophy className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-16">Values</h3>
          <p className="text-gray-600 text-lg text-center max-w-xs mx-auto">
            Empathy, Innovation, Collaboration, Excellence, Ownership
          </p>
        </div>
      </div>

      {/* Mobile view layout */}
      <div className="flex flex-col items-center space-y-10 md:hidden mt-6">
        {/* Mission */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-black p-2 rounded-xl mb-1">
            <FaFlask className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">Mission</h3>
          <p className="text-gray-600 text-base max-w-xs">
            To build a sustainable Skill Ecosystem that transforms learning into livelihoods and creates measurable social impact.
          </p>
        </div>

        {/* Vision */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-black p-2 rounded-xl -mt-4">
            <FaEye className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Vision</h3>
          <p className="text-gray-600 text-base max-w-xs">
            To be India’s most trusted catalyst for employability and skill-driven growth, empowering one million learners by 2030.
          </p>
        </div>

        {/* Values */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-black p-2 rounded-xl -mt-4">
            <FaTrophy className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Values</h3>
          <p className="text-gray-600 text-base max-w-xs">
            Empathy, Innovation, Collaboration, Excellence, Ownership
          </p>
        </div>
      </div>
    </div>
  );
};

export default MissionVisionValues;
