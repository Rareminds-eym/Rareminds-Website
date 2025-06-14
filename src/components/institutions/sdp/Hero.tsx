import { motion } from 'framer-motion';
import { Download, FileSpreadsheet, PhoneCall, Rocket, BadgeCheck, Users, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import ContactSection from '@/components/institutions/Contact/ContactSection';

const API_BASE_URL = "https://rareminds.in";
    

const banners = [
  {
    title: "Graduate With Skills That Pay!",
    subtitle: "Don't just pass exams.Get job-ready with our industry-aligned programs.",
    video: "https://player.vimeo.com/external/370467553.hd.mp4?...",
    poster: "/institutions/images/Banners/sdp/Banner1.jpg",
    mobilePoster: "/institutions/images/Banners/sdp/Banner1_mobile.jpg",
    alt: "Students celebrating graduation with skills",
    cta: [
      {
        text: "Download Course List",
        icon: <Download className="inline-block mr-2 h-5 w-5" />,
        style: "button-primary",
        pdfUrl: "/institutions/pdfs/Course_List.pdf",
        institution: "Course List"
      },
      {
        text: "Get a Free Campus Audit",
        icon: <FileSpreadsheet className="inline-block mr-2 h-5 w-5" />,
        style: "button-secondary",
        pdfUrl: "/institutions/pdfs/Campus Audit.pdf",
        institution: "Campus Audit"
      }
    ]
  },
  {
    title: "From Campus to Career: We Bridge the Gap.",
    subtitle: "Real world training, placement assistance & certifications that matter.",
    video: "https://player.vimeo.com/external/370467553.hd.mp4?...",
    poster: "/institutions/images/Banners/sdp/Banner2.jpg",
    mobilePoster: "/institutions/images/Banners/sdp/Banner2_mobile.jpg",
    alt: "Career bridge from campus to workplace",
    cta: [
      {
        text: "Get Trained. Get Hired →",
        icon: <Rocket className="inline-block mr-2 h-5 w-5" />,
        style: "button-secondary"
      }
    ]
  },
  {
    title: "College is Temporary. Your Career Isn’t.",
    subtitle: "Build your future, with expert-led modules in trending domains.",
    video: "https://player.vimeo.com/external/370467553.hd.mp4?...",
    poster: "/institutions/images/Banners/sdp/Banner3.jpeg",
    mobilePoster: "/institutions/images/Banners/sdp/Banner3_mobile.jpg",
    alt: "Student planning for a long-term career",
    cta: [
      {
        text: "Book a Free Counseling Call →",
        icon: <PhoneCall className="inline-block mr-2 h-5 w-5" />,
        style: "button-primary",
        href: "tel:+919902326951",
        target: "_blank",
        rel: "noopener noreferrer"
      }
    ]
  },
  {
    title: "Why Settle for Degrees Alone?",
    subtitle: "Upskill in 45 hours. Land internships, projects, and job offers.",
    video: "https://player.vimeo.com/external/370467553.hd.mp4?...",
    poster: "/institutions/images/Banners/sdp/Banner4.jpg",
    mobilePoster: "/institutions/images/Banners/sdp/Banner4_mobile.jpg",
    alt: "Student upskilling for internships and jobs",
    cta: [
      {
        text: "See What You Can Become →",
        icon: <BadgeCheck className="inline-block mr-2 h-5 w-5" />,
        style: "button-primary"
      }
    ]
  },
  {
    title: "You're Not Just a Student.You're a Brand.",
    subtitle: "Personal branding, communication skills & placement prep – we’ve got you.",
    video: "https://player.vimeo.com/external/370467553.hd.mp4?...",
    poster: "/institutions/images/Banners/sdp/Banner5.jpg",
    mobilePoster: "/institutions/images/Banners/sdp/Banner5_mobile.jpg",
    alt: "Student building a personal brand",
    cta: [
      {
        text: "Join the Future-Ready Tribe →",
        icon: <Users className="inline-block mr-2 h-5 w-5" />,
        style: "button-secondary"
      }
    ]
  }
];

// Utility scroll function
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

function sendEmail(name: string, email: string, pdfUrl: string, institution: string) {
  return fetch(`${API_BASE_URL}/api/send-pdf`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, pdfUrl, institution }),
  }).then(async (response) => {
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to send email');
    return data;
  });
}

function HeroModal({ open, onClose, pdfUrl, institution }: {
  open: boolean;
  onClose: () => void;
  pdfUrl: string;
  institution: string;
}) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // Store in Supabase
      const { error: supabaseError } = await supabase.from('case_study_requests').insert([
        { name: form.name, email: form.email, pdf_url: pdfUrl, institution }
      ]);
      if (supabaseError) throw supabaseError;

      // Send email via backend API
      await sendEmail(form.name, form.email, pdfUrl, institution);

      setSuccess("An email with the PDF has been sent to you!");
      setTimeout(() => {
        setForm({ name: "", email: "" });
        setSuccess("");
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    }
    setLoading(false);
  };

  if (!open) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center px-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white max-w-xl w-full p-6 rounded-2xl shadow-lg relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <X className="w-6 h-6" />
        </button>
        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-medium font-semibold my-4 text-center">
            Enter your details to receive the PDF
          </h3>
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send PDF"}
          </button>
          {error && (
            <p className="text-red-500 text-sm text-center mt-4">{error}</p>
          )}
          {success && (
            <p className="text-green-600 text-sm text-center mt-4">{success}</p>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
}

function InfoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const handleContactClick = () => {
    onClose();
    setTimeout(() => scrollToSection("contact-section"), 300);
  };

  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center px-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white max-w-2xl w-full p-8 rounded-2xl shadow-lg relative overflow-y-auto max-h-[90vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <X className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-2xl font-bold mb-4 text-blue-900">
            Empower Your Students with Industry-Ready Skills
          </h2>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Partner with RareMinds to Transform Learning into Employability
          </h3>
          <p className="mb-4 text-gray-700">
            In today’s competitive job market, academic knowledge alone isn’t enough. Students need practical skills, industry exposure, and career-ready training to stand out. That’s where RareMinds steps in.
          </p>
          <p className="mb-4 text-gray-700">
            We collaborate with forward-thinking universities to deliver industry-focused certification programs, hands-on workshops, and real-world project experience — all integrated with your academic framework.
          </p>
          <h4 className="font-semibold mb-2 text-blue-800">Why Choose RareMinds?</h4>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li><b>Custom-Aligned Programs:</b> Designed to complement university curricula across domains like IT, Life Sciences, Management, and Emerging Tech.</li>
            <li><b>Industry Partnerships:</b> Our courses are co-created with industry experts to match real-time hiring needs.</li>
            <li><b>Placement Support:</b> Students get career guidance, interview prep, and direct connections to hiring partners.</li>
            <li><b>Outcome-Driven Learning:</b> Every program ends with tangible results — internships, certifications, or job offers.</li>
          </ul>
          <h4 className="font-semibold mb-2 text-blue-800">What You Gain:</h4>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Enhanced student placement rates</li>
            <li>Stronger industry-university linkage</li>
            <li>Value-added programs to attract top student talent</li>
            <li>A future-ready campus ecosystem</li>
          </ul>
          <div className="mt-6 text-center">
            <p className="font-semibold mb-4 text-lg text-blue-900">
              Ready to Bridge the Gap Between Classrooms and Careers?
            </p>
            <button
              onClick={handleContactClick}
              className="bg-blue-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-800 transition"
            >
              Get Trained, Get Hired
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ImpactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const handleServicesClick = () => {
    onClose();
    setTimeout(() => scrollToSection("services-section"), 300);
  };

  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center px-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white max-w-2xl w-full p-8 rounded-2xl shadow-lg relative overflow-y-auto max-h-[90vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <X className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-2xl font-bold mb-4 text-blue-900">
            Empowering Your University
          </h2>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Glimpses of Our Impact
          </h3>
          <p className="mb-4 text-gray-700">
            Prepare to be inspired! Our success stories demonstrate tangible results across diverse areas relevant to universities. Here’s a snapshot of the Rare Minds difference:
          </p>
          <h4 className="font-semibold mb-2 text-blue-800">Faculty Development:</h4>
          <p className="mb-4 text-gray-700">
            <b>Impact:</b> For a leading university, our Faculty Development Programs (FDPs) enhanced teaching effectiveness, leading to a 10% improvement in student learning outcomes and a 15% increase in student retention rates.
          </p>
          <h4 className="font-semibold mb-2 text-blue-800">Student Success & Employability:</h4>
          <p className="mb-4 text-gray-700">
            <b>Impact:</b> Our Student Development & Assessment (SDA) programs equipped graduates with in-demand skills, resulting in a 20% increase in campus placements and higher internship conversion rates.
          </p>
          <h4 className="font-semibold mb-2 text-blue-800">Leadership & Institutional Effectiveness:</h4>
          <p className="mb-4 text-gray-700">
            <b>Impact:</b> By implementing our talent management strategies, universities have seen improved faculty satisfaction and a reduction in faculty turnover by 10%, leading to greater institutional stability.
          </p>
          <h4 className="font-semibold mb-2 text-blue-800">The Rare Minds Reach:</h4>
          <p className="mb-4 text-gray-700">
            Our dedicated efforts have empowered over 300,000 individuals, including faculty, staff, and students, with the skills and knowledge to excel within the higher education landscape.
          </p>
          <div className="mt-6 text-center">
            <p className="font-semibold mb-4 text-lg text-blue-900">
              You’ve Seen the Impact. Now imagine what YOU can become.
            </p>
            <button
              className="bg-blue-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-800 transition"
              onClick={handleServicesClick}
            >
              Our services
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// --- Mobile version ---
function HeroMobile() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [modal, setModal] = useState<{ open: boolean; pdfUrl: string; institution: string }>({ open: false, pdfUrl: "", institution: "" });
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [impactModalOpen, setImpactModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };


  return (
    <section className="relative min-h-full flex flex-col bg-gradient-to-br from-[#A7D8DE] to-[#FCD5CE] text-black overflow-hidden lg:hidden">
      <HeroModal
        open={modal.open}
        onClose={() => setModal({ open: false, pdfUrl: "", institution: "" })}
        pdfUrl={modal.pdfUrl}
        institution={modal.institution}
      />
      <InfoModal open={infoModalOpen} onClose={() => setInfoModalOpen(false)} />
      <ImpactModal open={impactModalOpen} onClose={() => setImpactModalOpen(false)} />

      {/* Banner image with text overlay at the top */}
      <div className="relative w-full flex-1 flex items-center justify-center">
        <img
          src={banners[currentBanner].mobilePoster}
          alt={banners[currentBanner].alt}
          className="w-[556px] h-[320px] object-cover rounded-lg shadow-md transition-all duration-700"
          style={{ background: "#e5e7eb" }}
        />
        {/* Text overlay */}
        <div className="absolute top-0 left-0 w-full px-4 pt-6 z-20">
          <motion.h1
            className="text-xl font-bold mb-3 leading-tight text-black drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {banners[currentBanner].title.match(/[^:.]+[:.]?/g)?.map((part, idx) => (
              <span key={idx} className="block">
                {part.trim()}
              </span>
            ))}
          </motion.h1>
          <motion.p
            className="text-medium mb-2 text-black drop-shadow"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {banners[currentBanner].subtitle === "Build your future, with expert-led modules in trending domains." ? (
              <>
                <span className="block">Build your future, with expert-led modules</span>
                <span className="block">in trending domains.</span>
              </>
            ) : banners[currentBanner].subtitle.match(/[^:.&]+[:.&]?/g)?.map((part, i) => (
              <span key={i} className="block">
                {part.trim()}
              </span>
            ))}
          </motion.p>
        </div>
        {/* Optional: Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/20 rounded-lg pointer-events-none" />
      </div>

      {/* CTA buttons and pagination below image */}
      <div className="w-full px-4 pb-24 z-10 relative pt-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="flex flex-col gap-4">
          {banners[currentBanner].cta.map((btn, i) =>
            btn.text === "See What You Can Become →" ? (
              <motion.button
                key={i}
                onClick={() => setImpactModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={btn.style + " w-full flex justify-center items-center"}
              >
                {btn.icon}
                {btn.text}
              </motion.button>
            ) : btn.text === "Get Trained. Get Hired →" ? (
              <motion.button
                key={i}
                onClick={() => setInfoModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={btn.style + " w-full flex justify-center items-center"}
              >
                {btn.icon}
                {btn.text}
              </motion.button>
            ) : btn.text === "Join the Future-Ready Tribe →" ? (
              <motion.button
                key={i}
                onClick={() => scrollToSection("contact-section")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={btn.style + " w-full flex justify-center items-center"}
              >
                {btn.icon}
                {btn.text}
              </motion.button>
            ) : btn.pdfUrl ? (
              <motion.button
                key={i}
                onClick={() => setModal({ open: true, pdfUrl: btn.pdfUrl, institution: btn.institution })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={btn.style + " w-full flex justify-center items-center"}
              >
                {btn.icon}
                {btn.text}
              </motion.button>
            ) : btn.href ? (
              <motion.a
                key={i}
                href={btn.href}
                download
                target={btn.target || "_blank"}
                rel={btn.rel || "noopener noreferrer"}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={btn.style + " w-full flex justify-center items-center"}
              >
                {btn.icon}
                {btn.text}
              </motion.a>
            ) : (
              <motion.button
                key={i}
                onClick={() => {}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={btn.style + " w-full flex justify-center items-center"}
              >
                {btn.icon}
                {btn.text}
              </motion.button>
            )
          )}
          </div>
        </motion.div>
        {/* Pagination */}
        <div className="absolute left-0 right-0 bottom-18 z-20 flex justify-center gap-2 pt-4">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentBanner === index ? 'bg-[#222B33] w-6' : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        {/* Scroll down button */}
        <div className="absolute left-0 right-0 bottom-1 flex justify-center z-30 ">
          <button
            onClick={handleScrollDown}
            aria-label="Scroll down"
            className="flex flex-col items-center"
          >
            <img
              src="/institutions/vectors/scroll.png"
              width="60"
              height="60"
              alt="Scroll down"
              className="scroll-rotate"
            />
            <img
              src="/institutions/vectors/arrowDown.svg"
              width="36"
              height="36"
              alt="Scroll down"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </button>
        </div>
      </div>
    </section>
  );
}


export default function Hero() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [modal, setModal] = useState<{ open: boolean; pdfUrl: string; institution: string }>({ open: false, pdfUrl: "", institution: "" });
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [impactModalOpen, setImpactModalOpen] = useState(false);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Modal for desktop */}
      <HeroModal
        open={modal.open}
        onClose={() => setModal({ open: false, pdfUrl: "", institution: "" })}
        pdfUrl={modal.pdfUrl}
        institution={modal.institution}
      />
      <InfoModal open={infoModalOpen} onClose={() => setInfoModalOpen(false)} />
      <ImpactModal open={impactModalOpen} onClose={() => setImpactModalOpen(false)} />

      {/* Mobile */}
      <HeroMobile />

      {/* Desktop */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#A7D8DE] to-[#FCD5CE] text-white overflow-hidden hidden lg:flex">
        {banners.map((banner, index) => (
          <motion.div
            key={index}
            initial={false}
            animate={{
              opacity: currentBanner === index ? 1 : 0,
              scale: currentBanner === index ? 1 : 1.05,
            }}
            transition={{ duration: 0.8 }}
            className={`absolute inset-0 w-full h-screen overflow-hidden ${currentBanner === index ? 'z-10' : 'z-0'}`}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.5, 0.7, 0.85],
                transition: { duration: 2, repeat: Infinity, repeatType: "reverse" }
              }}
              className="absolute inset-0 w-full h-full"
            >
              <video
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover z-0"
                poster={banner.poster}
              >
                <source src={banner.video} type="video/mp4" />
              </video>
            </motion.div>

            <div className="container mx-auto px-4 relative z-10 h-screen flex items-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: currentBanner === index ? 1 : 0, y: currentBanner === index ? 0 : 50 }}
                transition={{ duration: 1, delay: 0.4 }}
                className={`max-w-2xl ${
                  index === 2 || index === 5
                    ? 'text-center ml-auto'
                    : index === 1 || index === 3
                    ? 'text-center mr-auto'
                    : 'text-center ml-auto'
                } ${index === 0 ? 'pt-44' : ''}`}
              >
                <motion.h1
                  className="text-3xl md:text-3xl font-bold mb-20 text-black leading-tight"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: currentBanner === index ? 1 : 0.95 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {banner.title.match(/[^:.]+[:.]?/g)?.map((part, idx) => (
                    <span key={idx} className="block">
                      {part.trim()}
                    </span>
                  ))}
                </motion.h1>

                <motion.p
                  className="text-xl md:text-xl mb-12 text-black"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: currentBanner === index ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  {banner.subtitle === "Build your future, with expert-led modules in trending domains." ? (
                <>
                  <span className="block">Build your future, with expert-led modules</span>
                  <span className="block">in trending domains.</span>
                </>
                 )   : banner.subtitle.match(/[^:.&]+[:.&]?/g)?.map((part, i) => (
                        <span key={i} className="block">
                          {part.trim()}
                        </span>
                      ))}
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-8 pt-4 justify-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: currentBanner === index ? 0 : 20, opacity: currentBanner === index ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  {banner.cta.map((btn, i) =>
                    btn.text === "See What You Can Become →" ? (
                      <motion.button
                        key={i}
                        onClick={() => setImpactModalOpen(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={btn.style}
                      >
                        {btn.icon}
                        {btn.text}
                      </motion.button>
                    ) : btn.text === "Get Trained. Get Hired →" ? (
                      <motion.button
                        key={i}
                        onClick={() => setInfoModalOpen(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={btn.style}
                      >
                        {btn.icon}
                        {btn.text}
                      </motion.button>
                    ) : btn.text === "Join the Future-Ready Tribe →" ? (
                      <motion.button
                        key={i}
                        onClick={() => scrollToSection("contact-section")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={btn.style}
                      >
                        {btn.icon}
                        {btn.text}
                      </motion.button>
                    ) : btn.pdfUrl ? (
                      <motion.button
                        key={i}
                        onClick={() => setModal({ open: true, pdfUrl: btn.pdfUrl, institution: btn.institution })}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={btn.style}
                      >
                        {btn.icon}
                        {btn.text}
                      </motion.button>
                    ) : btn.href ? (
                      <motion.a
                        key={i}
                        href={btn.href}
                        download
                        target={btn.target || "_blank"}
                        rel={btn.rel || "noopener noreferrer"}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={btn.style}
                      >
                        {btn.icon}
                        {btn.text}
                      </motion.a>
                    ) : (
                      <motion.button
                        key={i}
                        onClick={() => {}}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={btn.style}
                      >
                        {btn.icon}
                        {btn.text}
                      </motion.button>
                    )
                  )}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        ))}

        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentBanner === index ? 'bg-[#222B33] w-6' : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-900/80 via-primary-900/50 to-transparent z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        />

        <div className="hidden lg:block container ">
          <div
            onClick={handleScrollDown}
            className="w-max absolute bottom-[60px] left-36 cursor-pointer transition-opacity z-10"
            aria-label="Scroll down"
          >
            <img
              src="/institutions/vectors/scroll.png"
              width="100"
              height="100"
              alt="Scroll down"
              className="scroll-rotate"
            />
            <img
              src="/institutions/vectors/arrowDown.svg"
              width="62"
              height="62"
              alt="Scroll down"
              className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
            />
          </div>
        </div>
      </section>
    </>
  );
}