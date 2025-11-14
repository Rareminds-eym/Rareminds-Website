// "use client";
// import React from "react";

// const CollaborateSection: React.FC = () => {
//   return (
//     <section className="text-center pt-14 pb-20 md:pt-40 md:pb-44 bg-white">
//       {/* Heading */}
//       <h2 className="text-3xl md:text-4xl font-extrabold text-center text-black mb-6">
//         Be Part of India’s Skill Revolution.
//       </h2>

//       {/* Description */}
//       <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed mb-10 px-4">
//         Join hands with Rareminds to create impact — whether you’re a university, corporate, or government partner.{" "}
//         <br className="hidden md:block" />
//         Let’s make skills the new currency of growth.
//       </p>

//       {/* Buttons */}
//       <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-8">
//         <button className="bg-[#E53935] hover:bg-[#c62828] text-white font-medium px-10 py-4 rounded-2xl text-lg shadow-md transition-all duration-300">
//           Collaborate With Us
//         </button>
//         <button className="border border-black text-black hover:bg-black hover:text-white font-medium px-10 py-4 rounded-2xl text-lg transition-all duration-300">
//           Explore Our Ecosystem
//         </button>
//       </div>
//     </section>
//   );
// };

// export default CollaborateSection;

"use client";
import React from "react";

const CollaborateSection: React.FC = () => {
  // Navigation handler
  const handleNavigation = (url: string) => {
    window.open(url, "_blank"); // opens in new tab
  };

  return (
    <section className="text-center pt-14 pb-20 md:pt-40 md:pb-44 bg-white">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-black mb-6">
        Be Part of India’s Skill Revolution.
      </h2>

      {/* Description */}
      <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed mb-10 px-4">
        Join hands with Rareminds to create impact — whether you’re a university, corporate, or government partner.{" "}
        <br className="hidden md:block" />
        Let’s make skills the new currency of growth.
      </p>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-8">
        {/* Collaborate With Us */}
        <button
          onClick={() => handleNavigation("https://rareminds.in/contact-us")}
          className="bg-[#E53935] hover:bg-[#c62828] text-white font-medium px-10 py-4 rounded-2xl text-lg shadow-md transition-all duration-300"
        >
          Collaborate With Us
        </button>

        {/* Explore Our Ecosystem */}
        <button
          onClick={() => handleNavigation("https://skillpassport.rareminds.in/")}
          className="border border-black text-black hover:bg-black hover:text-white font-medium px-10 py-4 rounded-2xl text-lg transition-all duration-300"
        >
          Explore Our Ecosystem
        </button>
      </div>
    </section>
  );
};

export default CollaborateSection;
