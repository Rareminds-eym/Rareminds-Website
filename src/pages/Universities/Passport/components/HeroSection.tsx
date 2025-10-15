
// import { FaCalendarAlt } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useEffect } from "react";
// import banner1 from "../../../../../public/passport/banner 1.2.jpg";
// import banner2 from "../../../../../public/passport/BANNER 2.2.jpg";
// import Banner4 from "../../../../../public/passport/banner 4.1.jpg";

// import mobileBanner1 from "../../../../../public/passport/BANNER 1 MOB.jpg";
// import mobileBanner2 from "../../../../../public/passport/banner 2 mob.jpg";
// import mobileBanner4 from "../../../../../public/passport/banner 4.MOB.jpg";

// const desktopSlides = [
//   {
//     image: banner1,
//     heading:
//       "Your Students Deserve More Than Certificates — They Deserve Credibility",
//     align: "left",
//   },
//   {
//     image: banner2,
//     heading: "Transform Every Student into a Verified Employable Talent.",
//     align: "left",
//   },
//   {
//     image: Banner4,
//     heading: "Successful Placements Aren’t Luck — They’re Verified",
//     align: "center",
//   },
// ];

// const mobileSlides = [
//   {
//     image: mobileBanner1,
//     heading:
//       "Your Students Deserve More Than Certificates — They Deserve Credibility",
//     align: "left",
//   },
//   {
//     image: mobileBanner2,
//     heading: "Transform Every Student into a Verified Employable Talent",
//     align: "left",
//   },
//   {
//     image: mobileBanner4,
//     heading: "Successful Placements Aren’t Luck — They’re Verified",
//     align: "center",
//   },
// ];

// const HeroSection = ({ onDemoClick }: { onDemoClick: () => void }) => {
//   const [current, setCurrent] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);

//   // Detect screen size
//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const slides = isMobile ? mobileSlides : desktopSlides;
//   const currentSlide = slides[current];

//   // Auto fade every 5s
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [slides]);

//   // Dynamic alignment classes based on slide
//   const alignment =
//     currentSlide.align === "left"
//       ? "items-start text-left"
//       : "items-center text-center";

//   // left padding for left aligned slides (keeps text from the edge)
//   const leftPadding = currentSlide.align === "left" ? "pl-6 sm:pl-10 md:pl-20" : "";

//   return (
//     <section className="relative w-auto h-[600px] md:h-[640px] overflow-hidden m-4 md:m-6 rounded-2xl shadow-sm bg-[#EDF2F9]">
//       {/* Background Images */}
//       <div className="absolute inset-0 z-0">
//         <AnimatePresence>
//           <motion.img
//             key={currentSlide.image}
//             src={currentSlide.image}
//             alt="Hero Banner"
//             className="w-full h-full object-cover absolute"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 1.2, ease: "easeInOut" }}
//           />
//         </AnimatePresence>
//       </div>

//       {/* Content */}
//       <div
//         className={`
//           absolute inset-0 
//           flex flex-col justify-center 
//           ${alignment}
//           z-10 
//           px-6 sm:px-10 md:px-0
//         `}
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1.2, ease: "easeInOut" }}
//           className={`flex flex-col justify-center break-words w-full ${leftPadding}`}
//         >
//           {/* Constrain width so long headings create readable multiple lines */}
//           <div
//             className={`
//               w-full
//               ${currentSlide.align === "left" ? "max-w-[min(92%,680px)] ml-0" : "max-w-[min(90%,720px)] mx-auto"}
//             `}
//           >
//             {/* Heading */}
//             <AnimatePresence mode="wait">
//               <motion.h1
//                 key={currentSlide.heading}
//                 // clamp() ensures the font scales responsively so really long headings become more lines on small screens
//                 style={{
//                   fontSize: "clamp(3.5rem, 5.5vw, 3.6rem)",
//                   WebkitHyphens: "auto",
//                   MozHyphens: "auto",
//                   hyphens: "auto",
//                   overflowWrap: "anywhere",
//                   wordBreak: "break-word",
//                 }}
//                 className={`
//                   font-extrabold
//                   leading-snug md:leading-tight
//                   mb-6
//                   tracking-tight
//                   whitespace-normal
//                   text-black
//                   drop-shadow-md
//                   ${currentSlide.align === "left" ? "text-left" : "text-center"}
//                 `}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.6, ease: "easeInOut" }}
//               >
//                 {currentSlide.heading}
//               </motion.h1>
//             </AnimatePresence>

//             {/* Buttons */}
//             <div
//               className={`
//                 flex flex-col sm:flex-row gap-4 sm:gap-6 
//                 ${currentSlide.align === "left" ? "justify-start" : "justify-center"}
//               `}
//             >
//               <button
//                 onClick={onDemoClick}
//                 className="
//                   bg-[#E32A18]
//                   hover:bg-[#cc2515]
//                   px-6 sm:px-8 py-3 sm:py-3.5
//                   rounded-lg
//                   font-semibold
//                   transition-all duration-300
//                   flex items-center justify-center gap-2
//                   shadow-lg
//                   text-white
//                   w-full sm:w-auto
//                 "
//               >
//                 Enquiry <FaCalendarAlt />
//               </button>

//               <button
//                 onClick={onDemoClick}
//                 className="
//                   bg-[#E32A18]
//                   hover:bg-[#cc2515]
//                   px-6 sm:px-8 py-3 sm:py-3.5
//                   rounded-lg
//                   font-semibold
//                   transition-all duration-300
//                   flex items-center justify-center gap-2
//                   shadow-lg
//                   text-white
//                   w-full sm:w-auto
//                 "
//               >
//                 Connect with us <FaCalendarAlt />
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Subtle Overlay (for text visibility) */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent rounded-2xl pointer-events-none" />
//     </section>
//   );
// };

// export default HeroSection;


import { FaCalendarAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import banner1 from "../../../../../public/passport/banner 1.2.jpg";
import banner2 from "../../../../../public/passport/BANNER 2.2.jpg";
import Banner4 from "../../../../../public/passport/banner 4.1.jpg";
import Banner5 from "../../../../../public/passport/One-Partnership_2.png"

import mobileBanner1 from "../../../../../public/passport/BANNER 1 MOB.jpg";
import mobileBanner2 from "../../../../../public/passport/banner 2 mob.jpg";
import mobileBanner4 from "../../../../../public/passport/banner 4.MOB.jpg";

const desktopSlides = [
  {
    image: banner1,
    heading:
      "Your Students Deserve More Than Certificates — They Deserve Credibility",
    align: "left",
  },
  {
    image: banner2,
    heading: "Transform Every Student into a Verified Employable Talent.",
    align: "left",
  },
  {
    image: Banner4,
    heading: "Successful Placements Aren’t Luck — They’re Verified",
    align: "center",
  },
  {
    image: Banner5,
    heading: "Successful Placements Aren’t Luck — They’re Verified",
    align: "left",
  },
];

const mobileSlides = [
  {
    image: mobileBanner1,
    heading:
      "Your Students Deserve More Than Certificates — They Deserve Credibility",
    align: "top-center",
  },
  {
    image: mobileBanner2,
    heading: "Transform Every Student into a Verified Employable Talent",
    align: "top-center",
  },
  {
    image: mobileBanner4,
    heading: "Successful Placements Aren’t Luck — They’re Verified",
    align: "center",
  },
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
  const currentSlide = slides[current];

  // Auto fade every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  // Alignment classes
  let alignment = "items-center text-center"; // default
  if (isMobile) {
    alignment =
      currentSlide.align === "top-center"
        ? "items-start text-center pt-6" // first two mobile slides
        : "items-center text-center justify-center"; // mobileBanner4
  } else {
    alignment =
      currentSlide.align === "left"
        ? "items-start text-left justify-center"
        : "items-center text-center justify-center";
  }

  // Left padding for desktop left-aligned slides
  const leftPadding =
    !isMobile && currentSlide.align === "left" ? "pl-6 sm:pl-10 md:pl-20" : "";

  // Heading container padding for top or center alignment
  const headingContainerPadding = isMobile
    ? currentSlide.align === "top-center"
      ? "px-4" // top padding handled via alignment
      : "px-4 flex flex-col justify-center h-full" // mobileBanner4 vertically centered
    : currentSlide.align === "left"
    ? "max-w-[92%] ml-0 px-0 pt-10 pb-6" // desktop left
    : "max-w-[90%] mx-auto px-0 pt-10 pb-6"; // desktop center

  return (
    <section className="relative w-auto h-[600px] md:h-[640px] overflow-hidden m-4 md:m-6 rounded-2xl shadow-sm bg-[#EDF2F9]">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.img
            key={currentSlide.image}
            src={currentSlide.image}
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
      <div
        className={`absolute inset-0 flex flex-col ${alignment} z-10 px-6 sm:px-10 md:px-0 ${leftPadding}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="flex flex-col justify-center break-words w-full"
        >
          {/* Heading container */}
          <div className={`w-full ${headingContainerPadding}`}>
            {/* Heading */}
            <motion.h1
              key={currentSlide.heading}
              style={{
                fontSize: isMobile
                  ? "clamp(1.8rem, 5vw, 2.2rem)"
                  : "clamp(50px, 30.5px, 35.5px)",
                lineHeight: isMobile ? "1.3" : "1.2",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                hyphens: "auto",
                maxWidth: isMobile ? "100%" : "800px",
                marginLeft: isMobile ? "0" : currentSlide.align === "left" ? "0" : "auto",
marginRight: isMobile ? "0" : currentSlide.align === "left" ? "auto" : "auto",
              }}
              className={`font-extrabold leading-snug md:leading-tight mb-6 tracking-tight text-black drop-shadow-md ${
                isMobile
                  ? "text-center"
                  : currentSlide.align === "left"
                  ? "text-left"
                  : "text-center"
              }`}
            >
              {currentSlide.heading}
            </motion.h1>

            {/* Buttons */}
            <motion.div
              className={`flex flex-col sm:flex-row gap-4 sm:gap-6 w-full ${
                isMobile
                  ? "justify-center items-center"
                  : currentSlide.align === "left"
                  ? "justify-start"
                  : "justify-center"
              }`}
            >
              <button
                onClick={onDemoClick}
                className="bg-[#E32A18] hover:bg-[#cc2515] px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg text-white w-full sm:w-auto"
              >
                Enquiry <FaCalendarAlt />
              </button>

              <button
                onClick={onDemoClick}
                className="bg-[#E32A18] hover:bg-[#cc2515] px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg text-white w-full sm:w-auto"
              >
                Connect with us <FaCalendarAlt />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent rounded-2xl pointer-events-none" />
    </section>
  );
};

export default HeroSection;
