
// import { FaCalendarAlt } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useEffect } from "react";
// import desktopBanner from "../../../../../public/passport/banner 1.2.jpg";
// import mobileBanner from "../../../../../public/passport/BANNER 1 MOB.jpg";

// const slides = [
//   {
//     desktopImage: desktopBanner,
//     mobileImage: mobileBanner,
//     heading: "More Than Certificates — Credibility Matters",
//   },
// ];

// const HeroSection = ({ onDemoClick }: { onDemoClick: () => void }) => {
//   const [current, setCurrent] = useState(0);
//   const multipleSlides = slides.length > 1;
//   const [isMobile, setIsMobile] = useState(false);

//   // Detect mobile or desktop
//   useEffect(() => {
//     const checkScreen = () => setIsMobile(window.innerWidth < 768);
//     checkScreen();
//     window.addEventListener("resize", checkScreen);
//     return () => window.removeEventListener("resize", checkScreen);
//   }, []);

//   // Auto fade only if multiple banners
//   useEffect(() => {
//     if (!multipleSlides) return;

//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % slides.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [multipleSlides]);

//   const currentImage = isMobile
//     ? slides[current].mobileImage
//     : slides[current].desktopImage;

//   return (
//     <section className="relative w-auto h-[600px] md:h-[600px] overflow-hidden m-4 md:m-6 rounded-2xl shadow-sm bg-[#EDF2F9]">
//       {/* Banner Image */}
//       <div className="absolute inset-0 z-0">
//         {multipleSlides ? (
//           <AnimatePresence>
//             <motion.img
//               key={currentImage}
//               src={currentImage}
//               alt="Hero Banner"
//               className="w-full h-full object-cover absolute"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 1.2, ease: "easeInOut" }}
//             />
//           </AnimatePresence>
//         ) : (
//           <img
//             src={currentImage}
//             alt="Hero Banner"
//             className="w-full h-full object-cover absolute"
//           />
//         )}
//       </div>

//       {/* Content */}
//       <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-20 md:py-28 flex flex-end items-center justify-center h-full text-center">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1.2, ease: "easeInOut" }}
//             className="text-white"
//           >
//             {/* Heading */}
//             <AnimatePresence mode="wait">
//               <motion.h1
//                 key={slides[current].heading}
//                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-black ml-5"

//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.6, ease: "easeInOut" }}
//               >
//                 {slides[current].heading}
//               </motion.h1>
//             </AnimatePresence>

//             {/* Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <button
//                 onClick={onDemoClick}
//                 className="bg-[#E32A18] hover:bg-[#cc2515] px-7 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg text-white"
//               >
//                 Enquiry <FaCalendarAlt />
//               </button>
//               <button
//                 onClick={onDemoClick}
//                 className="bg-[#E32A18] hover:bg-[#cc2515] px-7 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg text-white"
//               >
//                 Connect with us <FaCalendarAlt />
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// import { FaCalendarAlt } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useEffect } from "react";
// import desktopBanner from "../../../../../public/passport/banner 1.2.jpg";
// import mobileBanner from "../../../../../public/passport/BANNER 1 MOB.jpg";

// const slides = [
//   {
//     desktopImage: desktopBanner,
//     mobileImage: mobileBanner,
//     heading: "More Than Certificates — Credibility Matters",
//   },
// ];

// const HeroSection = ({ onDemoClick }: { onDemoClick: () => void }) => {
//   const [current, setCurrent] = useState(0);
//   const multipleSlides = slides.length > 1;
//   const [isMobile, setIsMobile] = useState(false);

//   // Detect mobile or desktop
//   useEffect(() => {
//     const checkScreen = () => setIsMobile(window.innerWidth < 768);
//     checkScreen();
//     window.addEventListener("resize", checkScreen);
//     return () => window.removeEventListener("resize", checkScreen);
//   }, []);

//   // Auto fade only if multiple banners
//   useEffect(() => {
//     if (!multipleSlides) return;

//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % slides.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [multipleSlides]);

//   const currentImage = isMobile
//     ? slides[current].mobileImage
//     : slides[current].desktopImage;

//   return (
//     <section className="relative w-auto h-[600px] md:h-[600px] overflow-hidden m-4 md:m-6 rounded-2xl shadow-sm bg-[#EDF2F9]">
//       {/* Banner Image */}
//       <div className="absolute inset-0 z-0">
//         {multipleSlides ? (
//           <AnimatePresence>
//             <motion.img
//               key={currentImage}
//               src={currentImage}
//               alt="Hero Banner"
//               className="w-full h-full object-cover absolute"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 1.2, ease: "easeInOut" }}
//             />
//           </AnimatePresence>
//         ) : (
//           <img
//             src={currentImage}
//             alt="Hero Banner"
//             className="w-full h-full object-cover absolute"
//           />
//         )}
//       </div>

//       {/* ✅ Centered Content */}
//       <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-5">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1.2, ease: "easeInOut" }}
//           className="text-white flex flex-col items-center justify-center"
//         >
//           {/* Heading */}
//           <AnimatePresence mode="wait">
//             <motion.h1
//               key={slides[current].heading}
//               className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-black text-center drop-shadow-md px-4 sm:px-6 md:px-10 max-w-[90%] md:max-w-[80%] break-words mx-aut"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.6, ease: "easeInOut" }}
//             >
//               {slides[current].heading}
//             </motion.h1>
//           </AnimatePresence>

//           {/* Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4">
//             <button
//               onClick={onDemoClick}
//               className="bg-[#E32A18] hover:bg-[#cc2515] px-7 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg text-white"
//             >
//               Enquiry <FaCalendarAlt />
//             </button>
//             <button
//               onClick={onDemoClick}
//               className="bg-[#E32A18] hover:bg-[#cc2515] px-7 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg text-white"
//             >
//               Connect with us <FaCalendarAlt />
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;



import { FaCalendarAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import banner1 from "../../../../../public/passport/banner 1.2.jpg";
import banner2 from "../../../../../public/passport/BANNER 2.2.jpg";
// import Banner3 from "../../../../../public/passport/Home-page-banner_3.png";
import Banner4 from "../../../../../public/passport/banner 4.1.jpg";
// import Banner5 from "../../../../../public/passport/Home-page-banner_5.png";

import mobileBanner1 from "../../../../../public/passport/BANNER 1 MOB.jpg";
// import mobileBanner2 from "../../../../../public/passport/Home-page-banner_mobile_2.png";

const desktopSlides = [
  {
    image: banner1,
    heading: "Your Students Deserve More Than Certificates — They Deserve Credibility",
  },
  {
    image: banner2,
    heading: "Transform Every Student into a Verified Employable Talent.",
  },
  // {
  //   image: Banner3,
  //   heading: "AI Verifies. Not Guesses. Your Hiring Should Too.",
  // },
  {
    image: Banner4,
    heading: "Successful Placements Aren’t Luck — They’re Verified",
  },
  // {
  //   image: Banner5,
  //   heading: "Cut Hiring Time by 70%. Keep Every Bit of Quality.",
  // }
];

const mobileSlides = [
  {
    image: mobileBanner1,
    heading: "Your Students Deserve More Than Certificates — They Deserve Credibility",
  },
  // {
  //   image: mobileBanner2,
  //   heading: "Stop Guessing. Start Hiring Verified.",
  // },
  // {
  //   image: Banner3,
  //   heading: "AI Verifies. Not Guesses. Your Hiring Should Too.",
  // },
  // {
  //   image: Banner4,
  //   heading: "Smart Companies Don’t Hunt Talent. They Scan SkillPassports.",
  // },
  // {
  //   image: Banner5,
  //   heading: "Cut Hiring Time by 70%. Keep Every Bit of Quality.",
  // }
];

const HeroSection = ({ onDemoClick }: { onDemoClick: () => void }) => {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const slides = isMobile ? mobileSlides : desktopSlides;

  // Auto fade every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  return (
    <section className="relative w-auto h-[600px] md:h-[640px] overflow-hidden m-4 md:m-6 rounded-2xl shadow-sm bg-[#EDF2F9]">
      {/* Fade Images */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.img
            key={slides[current].image}
            src={slides[current].image}
            alt="Hero Banner"
            className="w-full h-full object-cover absolute"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="text-white"
          >
            {/* Fade Headings */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={slides[current].heading}
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-[50px] xl:text-6xl font-extrabold leading-tight mb-6 text-black`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {slides[current].heading}
              </motion.h1>
            </AnimatePresence>

            <p className="text-base sm:text-lg md:text-xl mb-8 max-w-xl text-gray-700">
              The Rareminds Skill Passport is a verified digital learning identity that captures every student’s growth — from classroom learning to employability readiness.

            </p>

            <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onDemoClick}
              className="bg-[#E32A18] hover:bg-[#cc2515] px-7 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg text-white"
            >
              Enquiry <FaCalendarAlt />
            </button>
            <button
              onClick={onDemoClick}
              className="bg-[#E32A18] hover:bg-[#cc2515] px-7 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg text-white"
            >
              Connect with us <FaCalendarAlt />
            </button>
          </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
