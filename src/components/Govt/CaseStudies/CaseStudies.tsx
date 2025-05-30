import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Puzzle } from 'lucide-react';
import { supabase } from "@/lib/supabaseClient";
import VelsPDF from '@/assets/pdfs/Vels.pdf';

// Import components
import CaseCard from './CaseCard';
import AuthChoiceModal from './Modals/AuthChoiceModal';
import AuthFormModal from './Modals/AuthFormModal';
import DownloadModal from './Modals/DownloadModal';
import CaseListModal from './Modals/CaseListModal';

const caseStudies = [
  {
    icon: Trophy,
    title: 'One College, 2 Months, 40% Placement Jump',
    institution: 'Vels University',
    details: '600 Students | Soft Skills + Resume Bootcamp',
    pdfUrl: VelsPDF
  },
  {
    icon: TrendingUp,
    title: 'Interview-Ready in 30 Days',
    institution: 'Salem College',
    details: '350 Students | Food Tech + Hackathon',
    pdfUrl: '/pdfs/salem-college-case-study.pdf'
  },
  {
    icon: Puzzle,
    title: 'From Theory to Job Offers: 45-Hour EV Bootcamp',
    institution: 'Coimbatore Arts College',
    details: '420 Students | EV & AI Modules',
    pdfUrl: '/pdfs/coimbatore-arts-case-study.pdf'
  },
];

export default function CaseStudies() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  
  // Authentication statesP
  const [user, setUser] = useState(null);
  const [showAuthChoice, setShowAuthChoice] = useState(false);
  const [authMode, setAuthMode] = useState('');
  const [authData, setAuthData] = useState({ email: '', password: '', name: '' });
  const [authMessage, setAuthMessage] = useState('');

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const handleDownloadClick = (study) => {
    setSelectedPdf(study);
    if (user) {
      setFormData({ 
        name: user.user_metadata?.name || '', 
        email: user.email || '' 
      });
      setIsDownloadModalOpen(true);
    } else {
      setShowAuthChoice(true);
    }
  };

  const handleAuthChoice = (mode) => {
    setAuthMode(mode);
    setShowAuthChoice(false);
    setAuthData({ email: '', password: '', name: '' });
    setAuthMessage('');
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAuthMessage('');

    try {
      if (authMode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email: authData.email,
          password: authData.password,
          options: {
            data: {
              name: authData.name,
            }
          }
        });

        if (error) throw error;

        if (data?.user && !data?.user?.email_confirmed_at) {
          setAuthMessage('Please check your email to confirm your account, then try again.');
        } else {
          setAuthMessage('Account created successfully!');
          setTimeout(() => {
            setAuthMode('');
            setFormData({ 
              name: authData.name, 
              email: authData.email 
            });
            setIsDownloadModalOpen(true);
          }, 1500);
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: authData.email,
          password: authData.password,
        });

        if (error) throw error;

        setAuthMessage('Signed in successfully!');
        setTimeout(() => {
          setAuthMode('');
          setFormData({ 
            name: data.user.user_metadata?.name || '', 
            email: data.user.email 
          });
          setIsDownloadModalOpen(true);
        }, 1500);
      }
    } catch (error) {
      console.error('Auth error:', error);
      setAuthMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const trackDownload = async (userId, pdfInfo) => {
    try {
      const { data, error } = await supabase
        .from('pdf_downloads')
        .insert([
          {
            user_id: userId,
            name: formData.name,
            email: formData.email,
            pdf_url: pdfInfo.pdfUrl,
            title: pdfInfo.title
          }
        ]);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error tracking download:', error);
      throw error;
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      await trackDownload(user.id, {
        title: selectedPdf.title,
        pdfUrl: selectedPdf.pdfUrl
      });

      const link = document.createElement('a');
      link.href = selectedPdf.pdfUrl;
      link.download = `${selectedPdf.institution}-case-study.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setSubmitMessage('Thank you! Your download has started successfully.');
      
      setTimeout(() => {
        setIsDownloadModalOpen(false);
        setFormData({ name: '', email: '' });
        setSelectedPdf(null);
        setSubmitMessage('');
      }, 2000);

    } catch (error) {
      console.error('Download error:', error);
      setSubmitMessage(`Download failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAuthInputChange = (e) => {
    setAuthData({
      ...authData,
      [e.target.name]: e.target.value
    });
  };

  const closeAllModals = () => {
    setIsDownloadModalOpen(false);
    setShowAuthChoice(false);
    setAuthMode('');
    setFormData({ name: '', email: '' });
    setAuthData({ email: '', password: '', name: '' });
    setSelectedPdf(null);
    setSubmitMessage('');
    setAuthMessage('');
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-academy-blue animate-fade-in">
            Success Stories
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 animate-fade-in">
            Colleges that choose outcome and we helped them achieve it.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 px-16">
          {caseStudies.map((study, index) => (
            <CaseCard
              key={index}
              {...study}
              onDownloadClick={() => handleDownloadClick(study)}
            />
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
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl opacity-75 animate-pulse" />
            
            <motion.button
              onClick={() => setIsModalOpen(true)}
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
            >
              <span>See full Results By College Type</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <CaseListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        caseStudies={caseStudies}
        onDownloadClick={handleDownloadClick}
      />

      <AuthChoiceModal
        isOpen={showAuthChoice}
        onClose={closeAllModals}
        onAuthChoice={handleAuthChoice}
        selectedPdf={selectedPdf}
      />

      <AuthFormModal
        isOpen={!!authMode}
        authMode={authMode}
        onClose={closeAllModals}
        onAuthChoice={handleAuthChoice}
        authData={authData}
        handleAuthInputChange={handleAuthInputChange}
        handleAuthSubmit={handleAuthSubmit}
        isSubmitting={isSubmitting}
        authMessage={authMessage}
        selectedPdf={selectedPdf}
      />

      <DownloadModal
        isOpen={isDownloadModalOpen && user}
        onClose={closeAllModals}
        selectedPdf={selectedPdf}
        formData={formData}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
        submitMessage={submitMessage}
      />
    </section>
  );
}
