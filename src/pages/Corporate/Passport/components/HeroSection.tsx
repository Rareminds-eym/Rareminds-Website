import { FaCalendarAlt, FaDownload } from "react-icons/fa";
import { supabase } from "../../../../lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
// import banner1 from "../../../../../public/passport/Home-page-banner_1.png";
// import banner2 from "../../../../../public/passport/Home-page-banner_2.png";
// import Banner3 from "../../../../../public/passport/Home-page-banner_3.png";
// import Banner4 from "../../../../../public/passport/Home-page-banner_4.png";
// import Banner5 from "../../../../../public/passport/Home-page-banner_5.png";

// import mobileBanner1 from "../../../../../public/passport/Home-page-banner_mobile_1.png";
// import mobileBanner2 from "../../../../../public/passport/Home-page-banner_mobile_2.png";
// import mobileBanner3 from "../../../../../public/passport/Home-page-banner_mobile_3.png";
// import mobileBanner4 from "../../../../../public/passport/Home-page-banner_mobile_4.png";
// import mobileBanner5 from "../../../../../public/passport/Home-page-banner_mobile_5.png";

const banner1 = "/passport/Home-page-banner_1.png";
const banner2 = "/passport/Home-page-banner_2.png";
const Banner3 = "/passport/Home-page-banner_3.png";
const Banner4 = "/passport/Home-page-banner_4.png";
const Banner5 = "/passport/Home-page-banner_5.png";

const mobileBanner1 = "/passport/Home-page-banner_mobile_1.png";
const mobileBanner2 = "/passport/Home-page-banner_mobile_2.png";
const mobileBanner3 = "/passport/Home-page-banner_mobile_3.png";
const mobileBanner4 = "/passport/Home-page-banner_mobile_4.png";
const mobileBanner5 = "/passport/Home-page-banner_mobile_5.png";


const desktopSlides = [
  {
    image: banner1,
    heading: "Still Reading Resumes? You’re Already Behind",
  },
  {
    image: banner2,
    heading: "Stop Guessing. Start Hiring Verified.",
  },
  {
    image: Banner3,
    heading: "AI Verifies. Not Guesses. Your Hiring Should Too.",
  },
  {
    image: Banner4,
    heading: "Smart Companies Don’t Hunt Talent — They Scan SkillPassports.",
  },
  {
    image: Banner5,
    heading: "Cut Hiring Time by 70%. Keep Every Bit of Quality.",
  }
];

const mobileSlides = [
  {
    image: mobileBanner1,
    heading: "Still Reading Resumes? You’re Already Behind",
  },
  {
    image: mobileBanner2,
    heading: "Stop Guessing. Start Hiring Verified.",
  },
  {
    image: mobileBanner3,
    heading: "AI Verifies. Not Guesses. Your Hiring Should Too.",
  },
  {
    image: mobileBanner4,
    heading: "Smart Companies Don’t Hunt Talent. They Scan SkillPassports.",
  },
  {
    image: mobileBanner5,
    heading: "Cut Hiring Time by 70%. Keep Every Bit of Quality.",
  }
];

const HeroSection = ({ onDemoClick }: { onDemoClick: () => void }) => {
  const [showForm, setShowForm] = useState(false);
  const [formTimeout, setFormTimeout] = useState<NodeJS.Timeout | null>(null);
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.from('contact').insert([form]);
      if (error) {
        setError('Failed to submit. Please try again.');
        setSubmitted(false);
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      setError('Unexpected error. Please try again.');
      setSubmitted(false);
    }
    setLoading(false);
  };

  return (
  <section className="relative w-auto min-h-[640px] md:min-h-[640px] overflow-hidden m-4 md:m-6 rounded-2xl shadow-sm bg-[#EDF2F9]">
      {/* Fade Images */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.img
            key={slides[current].image}
            src={slides[current].image}
            alt="Hero Banner"
            loading="lazy"
            className="w-full h-full object-cover absolute"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-10 sm:py-20 md:py-28">
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
              From classrooms to careers → verified, portable, and future-ready skills at your fingertips.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onDemoClick}
                className="bg-[#E32A18] hover:bg-[#cc2515] px-7 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg text-white"
              >
                <FaCalendarAlt /> Enquiry
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="bg-white hover:bg-gray-50 border-2 border-[#E32A18] text-[#E32A18] hover:text-[#cc2515] px-7 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
              >
                <FaDownload /> Download
              </button>
            </div>

            {showForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <form className="bg-white rounded-xl p-6 shadow-2xl max-w-2xl w-full relative max-h-[90vh] overflow-y-auto" autoComplete="off" onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                setError(null);
                try {
                  const { error } = await supabase.from('training_forms').insert([form]);
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
                    <label className="block text-gray-700 font-semibold mb-2">Your Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E32A18] text-black bg-white" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-700 font-semibold mb-2">Company</label>
                    <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Company Name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E32A18] text-black bg-white" />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="flex-1">
                    <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="name@company.com" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E32A18] text-black bg-white" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-700 font-semibold mb-2">Role to Hire</label>
                    <input type="text" name="role" value={form.role} onChange={handleChange} placeholder="Job Title/Position" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E32A18] text-black bg-white" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your hiring needs or challenges" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E32A18] text-black bg-white resize-none" rows={3} />
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
            
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
