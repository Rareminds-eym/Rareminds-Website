import { motion } from 'framer-motion';
import { useState } from 'react';
import { Trophy, TrendingUp, Puzzle, X, EyeIcon } from 'lucide-react';
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

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

export default function CaseStudies() {
  const { user, loading, signOut } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<null | (() => void)>(null);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  // Custom toolbar: only FullScreen
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar: (Toolbar) => (
      <Toolbar>
        {(slots) => (
          <>
            {slots.fullScreen}
          </>
        )}
      </Toolbar>
    ),
  });

  // Google sign-in
  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  // Wrapper to require auth before action
  const requireAuth = (action: () => void) => {
    if (user) {
      action();
    } else {
      setShowAuthModal(true);
      setPendingAction(() => action);
    }
  };

  // Run pending action after login
  if (user && pendingAction) {
    pendingAction();
    setPendingAction(null);
    setShowAuthModal(false);
  }

  if (loading) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-12">
        {/* Show only 3 case studies, add scroll if more */}
        <div
          className={`grid md:grid-cols-3 gap-10 px-12`}
          style={{
            maxHeight: caseStudies.length > 3 ? '420px' : 'auto',
            overflowY: caseStudies.length > 3 ? 'auto' : 'visible',
          }}
        >
          {caseStudies.slice(0, 3).map((study, index) => (
            <motion.div
              key={index}
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
          {/* If more than 3, show the rest in a scrollable area */}
          {caseStudies.length > 3 &&
            caseStudies.slice(3).map((study, index) => (
              <motion.div
                key={index + 3}
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

        <motion.div className="text-center mt-12">
          <motion.div className="relative inline-block mt-10" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <motion.button
              onClick={() => requireAuth(() => setIsModalOpen(true))}
              className="relative bg-[#222B33] text-white px-4 py-4 rounded-full w-68 h-10 font-semibold text-sm shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
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
            >
              <EyeIcon className="inline-block mr-1 h-5 w-5" />
              <span>See full Results By College Type</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Google Auth Modal */}
      {showAuthModal && (
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
            className="bg-white max-w-sm w-full p-6 rounded-2xl shadow-lg relative"
          >
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-medium font-semibold my-4 text-center">
              Sign in with Google to access case studies
            </h3>
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-[#4285F4] text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C36.68 2.34 30.74 0 24 0 14.82 0 6.71 5.06 2.69 12.44l7.98 6.2C12.13 13.16 17.62 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.91-2.18 5.38-4.65 7.04l7.19 5.59C43.93 37.36 46.1 31.44 46.1 24.55z"/><path fill="#FBBC05" d="M10.67 28.65c-1.06-3.18-1.06-6.6 0-9.78l-7.98-6.2C.86 16.13 0 19.96 0 24c0 4.04.86 7.87 2.69 11.33l7.98-6.2z"/><path fill="#EA4335" d="M24 48c6.74 0 12.42-2.23 16.56-6.07l-7.19-5.59c-2.01 1.35-4.59 2.14-7.37 2.14-6.38 0-11.87-3.66-14.33-8.94l-7.98 6.2C6.71 42.94 14.82 48 24 48z"/></g></svg>
              <span>Sign in with Google</span>
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Modal with all case studies and open PDF buttons */}
      {isModalOpen && (
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
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-medium font-semibold my-4 text-center">
              View Case Studies
            </h3>
            <div className="space-y-4">
              {caseStudies.map((study, index) => (
                <div key={index} className="flex justify-between items-center border p-4 rounded-xl">
                  <div>
                    <p className="font-normal">{study.institution}</p>
                    <p className="text-sm text-gray-500">{study.details}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedPdf(study.pdfUrl);
                      setIsModalOpen(false);
                    }}
                    className="text-blue-600 hover:text-blue-800 font-normal underline"
                  >
                    Open PDF
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

       {/* PDF Preview Modal */}
      {selectedPdf && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-[100] flex justify-center items-center px-4 pt-12"
          onContextMenu={e => e.preventDefault()} // Disable right click for the entire modal
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white max-w-3xl w-full p-2 rounded-2xl shadow-lg relative flex flex-col"
          >
            <button
              onClick={() => setSelectedPdf(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-medium font-semibold mb-4 text-center">PDF Preview</h3>
            <div
              className="w-full h-[70vh] border rounded bg-gray-100 flex items-center justify-center overflow-auto"
              onContextMenu={e => e.preventDefault()} // Extra: disable right click on PDF area
            >
              <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                <Viewer
                  fileUrl={selectedPdf}
                  plugins={[defaultLayoutPluginInstance]}
                />
              </Worker>
            </div>
            <span className="text-xs text-gray-400 mt-2 text-center">Rareminds</span>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}