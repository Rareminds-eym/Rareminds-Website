import { motion } from 'framer-motion';
import { useState } from 'react';
import { Trophy, TrendingUp, Puzzle, X, EyeIcon } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient'; // adjust path as needed

const caseStudies = [
  {
    icon: Trophy,
    title: 'One College, 2 Months, 40% Jump in Placement ',
    institution: 'VELS University',
    details: '600 Students | Soft Skills + Resume Bootcamp',
    pdfUrl: "/institutions/pdfs/Vels.pdf"
  },
  {
    icon: TrendingUp,
    title: 'Fast Track Success: From Tier-3 to Interview Ready in a Month',
    institution: 'PES University',
    details: '350 Students | Food Tech + Hackathon',
    pdfUrl: "/institutions/pdfs/Pes.pdf"
  },
  {
    icon: Puzzle,
    title: 'From Theory to Job Offers: 45-Hour EV Bootcamp',
    institution: 'Thiruvalluvar University',
    details: '420 Students | EV & AI Modules',
    pdfUrl: "/institutions/pdfs/TVU.pdf"
  },
];

// Use correct API base URL for dev/prod
const API_BASE_URL ="https://rareminds.in";


export default function CaseStudies() {
  const [modalStep, setModalStep] = useState<"none" | "form" | "pdfs">("none");
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Use this function in your component:
const sendEmail = async (
  name: string,
  email: string,
  pdfUrl: string,
  institution: string
) => {
  const response = await fetch(`${API_BASE_URL}/api/send-pdf`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, pdfUrl, institution }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to send email');
  }
};

  // Store in Supabase and send email
  const handlePdfSelect = async (pdfUrl: string, institution: string) => {
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
        setModalStep("none");
        setForm({ name: "", email: "" });
        setSuccess("");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    }
    setLoading(false);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-xl font-bold mb-4 bg-black bg-clip-text text-transparent">
            Delivering on Outcomes: Success Stories.
          </h1>
          <p className="text-sm text-gray-600 mx-auto">
            Colleges That Chose Outcomes and achieved them.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 px-12">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-md transition-shadow duration-150"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 15px rgba(79, 70, 229, 0.3)",
                backgroundColor: "#e0e7ff",
                transition: { duration: 0.15, ease: "easeOut" },
              }}
            >
              <study.icon className="w-7 h-7 text-blue-600 mb-4" />
              <h3 className="text-medium font-bold mb-4">{study.title}</h3>
              <p className="text-sm font-semibold text-blue-600 mb-2">{study.institution}</p>
              <p className="text-gray-600 text-sm">{study.details}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-12"
        >
          <motion.div
            className="relative inline-block mt-10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.button
              onClick={() => setModalStep("form")}
              className="relative bg-[#222B33] text-white px-4 py-4 rounded-full w-68 h-10
                font-semibold text-sm shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(79, 70, 229, 0.5)",
                  "0 0 40px rgba(79, 70, 229, 0.3)",
                  "0 0 20px rgba(79, 70, 229, 0.5)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            ><EyeIcon className="inline-block mr-1 h-5 w-5" />
              <span>See full Results By College Type</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Modal */}
      {modalStep !== "none" && (
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
              onClick={() => {
                setModalStep("none");
                setForm({ name: "", email: "" });
                setError("");
                setSuccess("");
              }}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Step 1: Form */}
            {modalStep === "form" && (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  setModalStep("pdfs");
                }}
                className="space-y-6"
              >
                <h3 className="text-medium font-semibold my-4 text-center">
                  Enter your details to access case studies
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
                >
                  Continue
                </button>
              </form>
            )}

            {/* Step 2: PDFs */}
            {modalStep === "pdfs" && (
              <div>
                <h3 className="text-medium font-semibold my-4 text-center">
                  Download Case Studies
                </h3>
                <div className="space-y-4">
                  {caseStudies.map((study, index) => (
                    <div key={index} className="flex justify-between items-center border p-4 rounded-xl">
                      <div>
                        <p className="font-normal">{study.institution}</p>
                        <p className="text-sm text-gray-500">{study.details}</p>
                      </div>
                      <button
                        className="text-blue-600 hover:text-blue-800 font-normal"
                        onClick={() => handlePdfSelect(study.pdfUrl, study.institution)}
                        disabled={loading}
                      >
                        {loading ? "Sending..." : "Email PDF"}
                      </button>
                    </div>
                  ))}
                </div>
                {error && (
                  <p className="text-red-500 text-sm text-center mt-4">{error}</p>
                )}
                {success && (
                  <p className="text-green-600 text-sm text-center mt-4">{success}</p>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}