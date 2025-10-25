
// import { FaCalendarAlt } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useEffect } from "react";
// import banner1 from "../../../../../public/passport/banner 1.2.jpg";
// import banner2 from "../../../../../public/passport/BANNER 2.2.jpg";
// import banner3 from "../../../../../public/passport/Get-Your-Students-Discovered.png";
// import Banner4 from "../../../../../public/passport/banner 4.1.jpg";
// import Banner5 from "../../../../../public/passport/One-Partnership_2.png"

// import mobileBanner1 from "../../../../../public/passport/BANNER 1 MOB.jpg";
// import mobileBanner2 from "../../../../../public/passport/banner 2 mob.jpg";
// import mobileBanner3 from "../../../../../public/passport/Get-Your-Students-Discovered_mobile.png";
// import mobileBanner4 from "../../../../../public/passport/banner 4.MOB.jpg";
// import mobileBanner5 from "../../../../../public/passport/One-Partnership_mobile.png";

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
//     image: banner3,
//     heading: "Get Your Students Discovered — and Hired — Beyond Campus Boundaries.",
//     align: "left",
//   },
//   {
//     image: Banner4,
//     heading: "Successful Placements Aren’t Luck — They’re Verified",
//     align: "center",
//   },
//   {
//     image: Banner5,
//     heading: "One Partnership. Unlimited Placement Confidence.",
//     align: "left",
//   },
// ];

// const mobileSlides = [
//   {
//     image: mobileBanner1,
//     heading:
//       "Your Students Deserve More Than Certificates — They Deserve Credibility",
//     align: "top-center",
//   },
//   {
//     image: mobileBanner2,
//     heading: "Transform Every Student into a Verified Employable Talent",
//     align: "top-center",
//   },
//   {
//     image: mobileBanner3,
//     heading: "Get Your Students Discovered — and Hired — Beyond Campus Boundaries.",
//     align: "top-center",
//   },
//   {
//     image: mobileBanner4,
//     heading: "Successful Placements Aren’t Luck — They’re Verified",
//     align: "center",
//   },
//   {
//     image: mobileBanner5,
//     heading: "One Partnership. Unlimited Placement Confidence.",
//     align: "top-center",
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

//   // Alignment classes
//   let alignment = "items-center text-center"; // default
//   if (isMobile) {
//     alignment =
//       currentSlide.align === "top-center"
//         ? "items-start text-center pt-6" // first two mobile slides
//         : "items-center text-center justify-center"; // mobileBanner4
//   } else {
//     alignment =
//       currentSlide.align === "left"
//         ? "items-start text-left justify-center"
//         : "items-center text-center justify-center";
//   }

//   // Left padding for desktop left-aligned slides
//   const leftPadding =
//     !isMobile && currentSlide.align === "left" ? "pl-6 sm:pl-10 md:pl-20" : "";

//   // Heading container padding for top or center alignment
//   const headingContainerPadding = isMobile
//     ? currentSlide.align === "top-center"
//       ? "px-4" // top padding handled via alignment
//       : "px-4 flex flex-col justify-center h-full" // mobileBanner4 vertically centered
//     : currentSlide.align === "left"
//     ? "max-w-[92%] ml-0 px-0 pt-10 pb-6" // desktop left
//     : "max-w-[90%] mx-auto px-0 pt-10 pb-6"; // desktop center

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
//         className={`absolute inset-0 flex flex-col ${alignment} z-10 px-6 sm:px-10 md:px-0 ${leftPadding}`}
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1.2, ease: "easeInOut" }}
//           className="flex flex-col justify-center break-words w-full"
//         >
//           {/* Heading container */}
//           <div className={`w-full ${headingContainerPadding}`}>
//             {/* Heading */}
//             <motion.h1
//               key={currentSlide.heading}
//               style={{
//                 fontSize: isMobile
//                   ? "clamp(1.8rem, 5vw, 2.2rem)"
//                   : "clamp(50px, 30.5px, 35.5px)",
//                 lineHeight: isMobile ? "1.3" : "1.2",
//                 overflowWrap: "break-word",
//                 wordBreak: "break-word",
//                 hyphens: "auto",
//                 maxWidth: isMobile ? "100%" : "800px",
//                 marginLeft: isMobile ? "0" : currentSlide.align === "left" ? "0" : "auto",
// marginRight: isMobile ? "0" : currentSlide.align === "left" ? "auto" : "auto",
//               }}
//               className={`font-extrabold leading-snug md:leading-tight mb-6 tracking-tight text-black drop-shadow-md ${
//                 isMobile
//                   ? "text-center"
//                   : currentSlide.align === "left"
//                   ? "text-left"
//                   : "text-center"
//               }`}
//             >
//               {currentSlide.heading}
//             </motion.h1>

//             {/* Buttons */}
//             <motion.div
//               className={`flex flex-col sm:flex-row gap-4 sm:gap-6 w-full ${
//                 isMobile
//                   ? "justify-center items-center"
//                   : currentSlide.align === "left"
//                   ? "justify-start"
//                   : "justify-center"
//               }`}
//             >
//               <button
//                 onClick={onDemoClick}
//                 className="bg-[#E32A18] hover:bg-[#cc2515] px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg text-white w-full sm:w-auto"
//               >
//                 Enquiry <FaCalendarAlt />
//               </button>

//               <button
//                 onClick={onDemoClick}
//                 className="bg-[#E32A18] hover:bg-[#cc2515] px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg text-white w-full sm:w-auto"
//               >
//                 Connect with us <FaCalendarAlt />
//               </button>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Subtle Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent rounded-2xl pointer-events-none" />
//     </section>
//   );
// };

// export default HeroSection;



import { FaCalendarAlt, FaDownload } from "react-icons/fa";
import { supabase } from "../../../../lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import banner1 from "../../../../../public/passport/banner 1.2.jpg";
import banner2 from "../../../../../public/passport/BANNER 2.2.jpg";
import banner3 from "../../../../../public/passport/Get-Your-Students-Discovered.png";
import Banner4 from "../../../../../public/passport/banner 4.1.jpg";
import Banner5 from "../../../../../public/passport/One-Partnership_2.png";

import mobileBanner1 from "../../../../../public/passport/BANNER 1 MOB.jpg";
import mobileBanner2 from "../../../../../public/passport/banner 2 mob.jpg";
import mobileBanner3 from "../../../../../public/passport/Get-Your-Students-Discovered_mobile.png";
import mobileBanner4 from "../../../../../public/passport/banner 4.MOB.jpg";
import mobileBanner5 from "../../../../../public/passport/One-Partnership_mobile.png";

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
    image: banner3,
    heading:
      "Get Your Students Discovered — and Hired — Beyond Campus Boundaries.",
    align: "left",
  },
  {
    image: Banner4,
    heading: "Successful Placements Aren’t Luck — They’re Verified",
    align: "center",
  },
  {
    image: Banner5,
    heading: "One Partnership. Unlimited Placement Confidence.",
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
    image: mobileBanner3,
    heading:
      "Get Your Students Discovered — and Hired — Beyond Campus Boundaries.",
    align: "top-center",
  },
  {
    image: mobileBanner4,
    heading: "Successful Placements Aren’t Luck — They’re Verified",
    align: "center",
  },
  {
    image: mobileBanner5,
    heading: "One Partnership. Unlimited Placement Confidence.",
    align: "top-center",
  },
];

const HeroSection = ({ onDemoClick }: { onDemoClick: () => void }) => {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formTimeout, setFormTimeout] = useState<NodeJS.Timeout | null>(null);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    role: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const isFormComplete = Object.values(form).every((v) => v.trim() !== "");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newForm = { ...form, [e.target.name]: e.target.value };
    setForm(newForm);
    // If any field is filled, clear the timeout so form stays open
    if (formTimeout && Object.values(newForm).some((v) => v.trim() !== "")) {
      clearTimeout(formTimeout);
    }
  };

  // Start timeout when form is opened
  useEffect(() => {
    if (showForm && Object.values(form).every((v) => v.trim() === "")) {
      if (formTimeout) clearTimeout(formTimeout);
      const timeout = setTimeout(() => {
        setShowForm(false);
      }, 10000);
      setFormTimeout(timeout);
    } else {
      if (formTimeout) clearTimeout(formTimeout);
    }
    // Cleanup on unmount
    return () => {
      if (formTimeout) clearTimeout(formTimeout);
    };
  }, [showForm, form]);

  let alignment = "items-center text-center";
  if (isMobile) {
    alignment =
      currentSlide.align === "top-center"
        ? "items-start text-center pt-6"
        : "items-center text-center justify-center";
  } else {
    alignment =
      currentSlide.align === "left"
        ? "items-start text-left justify-center"
        : "items-center text-center justify-center";
  }

  const leftPadding =
    !isMobile && currentSlide.align === "left" ? "pl-6 sm:pl-10 md:pl-20" : "";

  const headingContainerPadding = isMobile
    ? currentSlide.align === "top-center"
      ? "px-4"
      : "px-4 flex flex-col justify-center h-full"
    : currentSlide.align === "left"
    ? "max-w-[92%] ml-0 px-0 pt-10 pb-6"
    : "max-w-[90%] mx-auto px-0 pt-10 pb-6";

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

      {/* Text & Buttons with fade animation */}
      <div
        className={`absolute inset-0 flex flex-col ${alignment} z-10 px-6 sm:px-10 md:px-0 ${leftPadding}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.heading}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="flex flex-col justify-center break-words w-full"
          >
            <div className={`w-full ${headingContainerPadding}`}>
              <motion.h1
                style={{
                  fontSize: isMobile
                    ? "clamp(1.8rem, 5vw, 2.2rem)"
                    : "clamp(3rem, 5vw, 3.5rem)",
                  lineHeight: isMobile ? "1.3" : "1.2",
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                  hyphens: "auto",
                  maxWidth: isMobile ? "100%" : "650px",
                  marginLeft: isMobile
                    ? "0"
                    : currentSlide.align === "left"
                    ? "0"
                    : "auto",
                  marginRight: isMobile
                    ? "0"
                    : currentSlide.align === "left"
                    ? "auto"
                    : "auto",
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <button
                  onClick={onDemoClick}
                  className="bg-[#E32A18] hover:bg-[#cc2515] px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg text-white w-full sm:w-auto"
                >
                  Enquiry <FaCalendarAlt />
                </button>

                <button
                  onClick={() => setShowForm(true)}
                  className="bg-white hover:bg-gray-50 border-2 border-[#E32A18] text-[#E32A18] hover:text-[#cc2515] px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg w-full sm:w-auto"
                >
                  <FaDownload /> Download
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <form className="bg-white rounded-xl p-6 shadow-2xl max-w-2xl w-full relative max-h-[90vh] overflow-y-auto" autoComplete="off" onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            setError(null);
            try {
              const { error } = await supabase.from('demo_requests').insert([
                {
                  name: form.name,
                  university: form.company,
                  email: form.email,
                  course: form.role,
                  message: form.message,
                }
              ]);
              if (error) {
                setError('Failed to submit. Please try again.');
                setSubmitted(false);
              } else {
                setSubmitted(true);
                // Start download after successful submit
                const link = document.createElement('a');
                link.href = '/path/to/your/file.pdf'; // Replace with actual file path
                link.download = 'SkillPassport-Brochure.pdf'; // Replace with actual filename
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }
            } catch (err) {
              setError('Unexpected error. Please try again.');
              setSubmitted(false);
            }
            setLoading(false);
          }}>
            <button 
              type="button" 
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-3xl font-bold focus:outline-none z-10"
              aria-label="Close form"
            >
              &times;
            </button>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E32A18] text-black bg-white" />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-semibold mb-2">University Name</label>
                <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="University Name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E32A18] text-black bg-white" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="name@university.com" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E32A18] text-black bg-white" />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-semibold mb-2">Course Applied for</label>
                <input type="text" name="role" value={form.role} onChange={handleChange} placeholder="Course Name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E32A18] text-black bg-white" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E32A18] text-black bg-white resize-none" rows={3} />
            </div>
            {error && <p className="text-red-600 mb-2">{error}</p>}
            {submitted && <p className="text-green-600 mb-2">Thank you! Your download will start now.</p>}
            <button
              type="submit"
              disabled={!isFormComplete || loading || submitted}
              className={`bg-[#E32A18] hover:bg-[#cc2515] px-7 py-3 rounded-lg font-semibold transition-all duration-300 text-white w-full mt-2 ${(!isFormComplete || loading || submitted) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Submitting...' : submitted ? 'Submitted' : 'Submit'}
            </button>
          </form>
        </div>
      )}

      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent rounded-2xl pointer-events-none" />
    </section>
  );
};

export default HeroSection;
