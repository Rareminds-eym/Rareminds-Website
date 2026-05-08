// Icons: FaCalendarAlt (Enquiry button), FaDownload (Download button), FaRedo (Retry download button)
import { FaCalendarAlt, FaDownload, FaRedo } from "react-icons/fa";
import { supabase } from "../../../../lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const banner1 = "/passport/Home-page-banner_1.png";
const banner2 = "/passport/Home-page-banner_2.png";
const banner3 = "/passport/Home-page-banner_3.png";
const banner4 = "/passport/Home-page-banner_4.png";
const banner5 = "/passport/Home-page-banner_5.png";

const mobileBanner1 = "/passport/Home-page-banner_mobile_1.png";
const mobileBanner2 = "/passport/Home-page-banner_mobile_2.png";
const mobileBanner3 = "/passport/Home-page-banner_mobile_3.png";
const mobileBanner4 = "/passport/Home-page-banner_mobile_4.png";
const mobileBanner5 = "/passport/Home-page-banner_mobile_5.png";

const desktopSlides = [
  {
    image: banner1,
    heading: "Still Reading Resumes? You're Already Behind",
  },
  {
    image: banner2,
    heading: "Stop Guessing. Start Hiring Verified.",
  },
  {
    image: banner3,
    heading: "AI Verifies. Not Guesses. Your Hiring Should Too.",
  },
  {
    image: banner4,
    heading: "Smart Companies Don't Hunt Talent — They Scan SkillPassports.",
  },
  {
    image: banner5,
    heading: "Cut Hiring Time by 70%. Keep Every Bit of Quality.",
  }
];

const mobileSlides = [
  {
    image: mobileBanner1,
    heading: "Still Reading Resumes? You're Already Behind",
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
    heading: "Smart Companies Don't Hunt Talent. They Scan SkillPassports.",
  },
  {
    image: mobileBanner5,
    heading: "Cut Hiring Time by 70%. Keep Every Bit of Quality.",
  }
];

const HeroSection = ({ onDemoClick }: { onDemoClick: () => void }) => {
  const [showForm, setShowForm] = useState(false);
  const formTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    role: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const slides = isMobile ? mobileSlides : desktopSlides;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const isFormComplete = Object.values(form).every((v) => v.trim() !== "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newForm = { ...form, [e.target.name]: e.target.value };
    setForm(newForm);
    if (formTimeoutRef.current && Object.values(newForm).some((v) => v.trim() !== "")) {
      clearTimeout(formTimeoutRef.current);
      formTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    // Clear any existing timeout first to prevent stale timer overwrites
    if (formTimeoutRef.current) {
      clearTimeout(formTimeoutRef.current);
      formTimeoutRef.current = null;
    }
    
    // Set new timeout only if form is shown and all fields are empty
    if (showForm && Object.values(form).every((v) => v.trim() === "")) {
      const newTimeout = setTimeout(() => {
        setShowForm(false);
      }, 10000);
      formTimeoutRef.current = newTimeout;
    }
    
    return () => {
      if (formTimeoutRef.current) {
        clearTimeout(formTimeoutRef.current);
        formTimeoutRef.current = null;
      }
    };
  }, [showForm, form]);

  const handleOpenForm = () => {
    setShowForm(true);
    setError(null);
    setSubmitted(false);
    setDownloadError(false);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setError(null);
    setSubmitted(false);
    setDownloadError(false);
  };

  const submitFormToDatabase = async (formData: typeof form) => {
    const { error } = await supabase.from('pdf_downloads').insert([{
      ...formData,
      download_type: 'Resume Checklist'
    }]);
    
    if (error) {
      // Log only in development environment for debugging
      if (process.env.NODE_ENV === 'development') {
        console.error('Form submission failed:', {
          errorCode: error.code,
          errorMessage: error.message,
          company: formData.company, // Business context, not PII
          role: formData.role,
          timestamp: new Date().toISOString()
        });
      }
      throw new Error('FORM_SUBMISSION_FAILED');
    }
  };

  const attemptFileDownload = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    try {
      const response = await fetch('/passport/pdf/Resume checklist.pdf', {
        signal: controller.signal
      });
      
      if (response.status === 404) {
        throw new Error('FILE_NOT_FOUND');
      }
      if (!response.ok) {
        throw new Error('NETWORK_ERROR');
      }
      
      // Download file once using blob
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      try {
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Resume-Checklist.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return true;
      } finally {
        // Always clean up blob URL to prevent memory leaks
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('DOWNLOAD_TIMEOUT');
      }
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('DOWNLOAD_FAILED');
    } finally {
      // Always clear timeout to prevent memory leaks
      clearTimeout(timeoutId);
    }
  };

  const handleRetryDownload = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await attemptFileDownload();
      setDownloadError(false);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        switch (err.message) {
          case 'FILE_NOT_FOUND':
            setError('File is not available. Please contact support for assistance.');
            break;
          case 'DOWNLOAD_TIMEOUT':
            setError('Download timed out. Please check your connection and try again.');
            break;
          case 'NETWORK_ERROR':
            setError('Network error occurred. Please check your connection and try again.');
            break;
          default:
            setError('Download failed. Please try the direct download link below or contact support.');
        }
      } else {
        setError('Download failed. Please try the direct download link below or contact support.');
      }
      setDownloadError(true);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Direct download fallback - intentionally simple and synchronous.
   * This is a last-resort option when automatic download fails.
   * Browser handles file availability naturally (404 page in new tab).
   * No async error handling to avoid complexity in fallback mechanism.
   */
  const handleDirectDownload = () => {
    const link = document.createElement('a');
    link.href = '/passport/pdf/Resume checklist.pdf';
    link.download = 'Resume-Checklist.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setDownloadError(false);
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(form.email.trim())) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }
    
    // Validate phone format
    const phoneRegex = /^[+]?[\d\s\-()]{7,15}$/;
    if (!phoneRegex.test(form.phone.trim())) {
      setError('Please enter a valid phone number.');
      setLoading(false);
      return;
    }
    
    try {
      await submitFormToDatabase(form);
      // Don't set submitted here - wait for download to complete
    } catch (err) {
      if (err instanceof Error && err.message === 'FORM_SUBMISSION_FAILED') {
        setError('Failed to submit form. Please try again.');
        setSubmitted(false);
        setDownloadError(false);
      } else {
        setError('Unexpected error. Please try again.');
        setSubmitted(false);
        setDownloadError(false);
      }
      setLoading(false);
      return;
    }

    try {
      await attemptFileDownload();
      setError(null);
      setDownloadError(false);
      setSubmitted(true);  // Set submitted only after successful download
    } catch (downloadErr) {
      setDownloadError(true);
      setSubmitted(true);  // Form was submitted successfully, just download failed
      if (downloadErr instanceof Error) {
        switch (downloadErr.message) {
          case 'FILE_NOT_FOUND':
            setError('Form submitted successfully! However, the file is temporarily unavailable. Use the options below to get your download.');
            break;
          case 'DOWNLOAD_TIMEOUT':
            setError('Form submitted successfully! Download timed out. Use the options below to retry.');
            break;
          case 'NETWORK_ERROR':
            setError('Form submitted successfully! Network error occurred. Use the options below to retry.');
            break;
          default:
            setError('Form submitted successfully! Download failed. Use the options below to get your file.');
        }
      } else {
        setError('Form submitted successfully! Download failed. Use the options below to get your file.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Calculate button state before rendering
  const isSubmitDisabled = !isFormComplete || loading || (submitted && !downloadError);
  const buttonText = loading ? 'Submitting...' : (submitted && !downloadError) ? 'Submitted' : 'Submit & Download';
  const submitButtonClassName = `bg-[#E32A18] hover:bg-[#cc2515] px-7 py-3 rounded-lg font-semibold transition-all duration-300 text-white w-full mt-2 ${isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  return (
    <section id="resume-checklist-download" className="relative w-auto min-h-[640px] md:min-h-[640px] overflow-hidden m-4 md:m-6 rounded-2xl shadow-sm bg-[#EDF2F9]">
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-10 sm:py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="text-white"
          >
            <AnimatePresence mode="wait">
              <motion.h1
                key={slides[current].heading}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] xl:text-6xl font-extrabold leading-tight mb-6 text-black"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {slides[current].heading}
              </motion.h1>
            </AnimatePresence>

            <p className="text-base sm:text-lg md:text-xl mb-8 max-w-xl text-gray-700">
              From Classrooms To Careers → Verified, Portable, And Future-Ready Skills At Your Fingertips.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onDemoClick}
                className="bg-[#E32A18] hover:bg-[#cc2515] px-7 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg text-white"
              >
                <FaCalendarAlt /> Enquiry
              </button>
              <button
                onClick={handleOpenForm}
                className="bg-white hover:bg-gray-50 border-2 border-[#E32A18] text-[#E32A18] hover:text-[#cc2515] px-7 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
              >
                <FaDownload /> Download
              </button>
            </div>

            {showForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <form className="bg-white rounded-xl p-6 shadow-2xl max-w-2xl w-full relative max-h-[90vh] overflow-y-auto" autoComplete="off" onSubmit={handleFormSubmit}>
                  <button 
                    type="button" 
                    onClick={handleCloseForm}
                    className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-3xl font-bold focus:outline-none z-10"
                    aria-label="Close form"
                  >
                    &times;
                  </button>
                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div className="flex-1">
                      <label htmlFor="form-name" className="block text-gray-700 font-semibold mb-2">Your Name</label>
                      <input id="form-name" type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E32A18] text-black bg-white" />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="form-company" className="block text-gray-700 font-semibold mb-2">Company</label>
                      <input id="form-company" type="text" name="company" value={form.company} onChange={handleChange} placeholder="Company Name" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E32A18] text-black bg-white" />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div className="flex-1">
                      <label htmlFor="form-email" className="block text-gray-700 font-semibold mb-2">Email Address</label>
                      <input id="form-email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="name@company.com" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E32A18] text-black bg-white" />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="form-phone" className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                      <input id="form-phone" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E32A18] text-black bg-white" />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div className="flex-1">
                      <label htmlFor="form-role" className="block text-gray-700 font-semibold mb-2">Role to Hire</label>
                      <input id="form-role" type="text" name="role" value={form.role} onChange={handleChange} placeholder="Job Title/Position" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E32A18] text-black bg-white" />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="form-message" className="block text-gray-700 font-semibold mb-2">Message</label>
                    <textarea id="form-message" name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your hiring needs or challenges" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E32A18] text-black bg-white resize-none" rows={3} />
                  </div>
                  {error && <p className="text-red-600 mb-2">{error}</p>}
                  {submitted && !error && !downloadError && <p className="text-green-600 mb-2">Thank you! Your download should start automatically.</p>}
                  
                  {submitted && downloadError && (
                    <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-yellow-800 mb-3 font-medium">Download Options:</p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          type="button"
                          onClick={handleRetryDownload}
                          disabled={loading}
                          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          <FaRedo className={loading ? 'animate-spin' : ''} />
                          {loading ? 'Retrying...' : 'Retry Download'}
                        </button>
                        <button
                          type="button"
                          onClick={handleDirectDownload}
                          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium text-white transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <FaDownload />
                          Direct Download
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className={submitButtonClassName}
                  >
                    {buttonText}
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