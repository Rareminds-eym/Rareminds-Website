
// import React from "react";
// import blueBg from "../../assets/About-us-Banner.png"; // background image
// import peopleDiscussion from "../../assets/About-us right.png"; // right image

// const HeroSection = () => {
//   return (
//     <section
//       className="w-[94%] mx-auto bg-cover bg-center flex flex-col md:flex-row justify-between items-center text-white px-6 md:px-12 py-10 md:py-16 mt-10 rounded-tl-[30px] rounded-tr-[30px] rounded-br-[30px] rounded-bl-[250px]"
//       style={{
//         backgroundImage: `url(${blueBg})`,
//       }}
//     >
//       {/* Left Text Section */}
//       <div className="md:w-[50%] text-center md:text-justify space-y-5 mr-10">
//         <h1 className="text-2xl md:text-4xl font-bold leading-snug">
//           The Powerhouse Behind <br /> India’s Skill Revolution.
//         </h1>

//         <p className="text-base md:text-lg font-medium text-white/90 leading-relaxed mt-2">
//           From schools to corporates, from learning to livelihoods — <br />
//           Rareminds powers skill, scale, and success.
//         </p>

//         <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start pt-2">
//           <button className="bg-[#E53935] hover:bg-[#d32f2f] text-white font-semibold px-5 py-2.5 rounded-xl transition">
//             Explore our Ecosystem
//           </button>

//           <button className="bg-white text-black border border-black font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-100 transition">
//             Partners with us
//           </button>
//         </div>
//       </div>

//       {/* Right Image */}
//       <div className="md:w-[45%] flex justify-center md:justify-end mt-8 md:mt-0">
//         <img
//           src={peopleDiscussion}
//           alt="Discussion Illustration"
//           className="w-[350px] md:w-[420px] h-auto object-contain rounded-[30px]"
//         />
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// import React from "react";
// import blueBg from "../../assets/The Powerhouse Behind banner 2.png"; // background image
// import peopleDiscussion from "../../assets/Vector Smart Object-01.png"; // right image

// const HeroSection = () => {
//   return (
//     <section
//       className="w-[94%] mx-auto bg-cover bg-center flex flex-col md:flex-row justify-between items-center text-black px-6 md:px-12 py-10 md:py-16 mt-10 rounded-tl-[30px] rounded-tr-[30px] rounded-br-[30px] rounded-bl-[250px]"
//       style={{
//         backgroundImage: `url(${blueBg})`,
//       }}
//     >
//       {/* Left Text Section */}
//       <div className="md:w-[50%] text-center md:text-left space-y-5 md:pl-10 lg:pl-16">
//         <h1 className="text-3xl md:text-4xl font-bold leading-snug">
//           The Powerhouse Behind <br /> India’s Skill Revolution.
//         </h1>

//         <p className="text-base md:text-lg font-medium text-black/90 leading-relaxed mt-2">
//           From schools to corporates, from learning to livelihoods — <br />
//           Rareminds powers skill, scale, and success.
//         </p>

//         <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start pt-2">
//           <button className="bg-[#E53935] hover:bg-[#d32f2f] text-white font-semibold px-5 py-2.5 rounded-xl transition">
//             Explore our Ecosystem
//           </button>

//           <button className="bg-white text-black border border-black font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-100 transition">
//             Partners with us
//           </button>
//         </div>
//       </div>

//       {/* Right Image */}
//       <div className="md:w-[45%] flex justify-center md:justify-end mt-8 md:mt-0">
//         <img
//           src={peopleDiscussion}
//           alt="Discussion Illustration"
//           className="w-[340px] md:w-[400px] lg:w-[440px] h-auto object-contain rounded-[30px]"
//         />
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

import React from "react";
import blueBg from "../../assets/The Powerhouse Behind banner 2.png"; // background image
import peopleDiscussion from "../../assets/Vector Smart Object-01.png"; // right image

const HeroSection = () => {
  // ✅ Navigation handler
  const handleNavigation = (url: string) => {
    window.open(url, "_blank"); // opens in new tab
  };

  return (
    <section
      className="w-[94%] mx-auto bg-cover bg-center flex flex-col md:flex-row justify-between items-center text-black px-6 md:px-12 py-10 md:py-16 mt-10 rounded-tl-[30px] rounded-tr-[30px] rounded-br-[30px] rounded-bl-[250px]"
      style={{
        backgroundImage: `url(${blueBg})`,
      }}
    >
      {/* Left Text Section */}
      <div className="md:w-[70%] text-center md:text-left space-y-5 md:pl-10 lg:pl-16">
        <h1 className="text-3xl md:text-6xl font-bold leading-snug">
          The Powerhouse Behind <br /> India’s Skill Revolution
        </h1>

        <p className="text-base md:text-lg font-medium text-black/90 leading-relaxed mt-2">
          From schools to corporates, from learning to livelihoods <br />
          Rareminds powers skill, scale, and success.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start pt-2">
          {/* Explore Our Ecosystem */}
          <button
            onClick={() => handleNavigation("https://skillpassport.rareminds.in/")}
            className="bg-[#E53935] hover:bg-[#d32f2f] text-white font-semibold px-5 py-2.5 rounded-xl transition"
          >
            Explore our Ecosystem
          </button>

          {/* Partner With Us */}
          <button
            onClick={() => handleNavigation("https://rareminds.in/contact-us")}
            className="bg-white text-black border border-black font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-100 transition"
          >
            Partners with us
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="md:w-[45%] flex justify-center md:justify-end mt-8 md:mt-0">
        <img
          src={peopleDiscussion}
          alt="Discussion Illustration"
          className="w-[340px] md:w-[400px] lg:w-[460px] h-auto object-contain rounded-[30px]"
        />
      </div>
    </section>
  );
};

export default HeroSection;
