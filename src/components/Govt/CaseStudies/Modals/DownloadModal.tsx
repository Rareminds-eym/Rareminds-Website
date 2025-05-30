import { motion } from 'framer-motion';
import { X, User, Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useEffect } from 'react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPdf: { institution: string; fileUrl: string } | null;
  formData: { name: string; email: string };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  submitMessage: string;
}

// Initialize EmailJS
const EMAILJS_SERVICE_ID = 'service_s98a357';
const EMAILJS_TEMPLATE_ID = 'template_opg41i9';       
const EMAILJS_PUBLIC_KEY = '_LNozfSKtBia32ZV9';

export default function DownloadModal({
  isOpen,
  onClose,
  selectedPdf,
  formData,
  handleInputChange,
  handleFormSubmit: propHandleFormSubmit,
  isSubmitting,
  submitMessage
}: DownloadModalProps) {
  useEffect(() => {
    try {
      emailjs.init(EMAILJS_PUBLIC_KEY);
      console.log('EmailJS initialized successfully');
    } catch (error) {
      console.error('Error initializing EmailJS:', error);
    }
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submission started');
    console.log('Form data:', formData);
    console.log('Selected PDF:', selectedPdf);
    
    if (!formData.email || !formData.name || !(selectedPdf?.fileUrl || (selectedPdf.fileUrl = 'https://raremindswebsite.netlify.app/'))) {
  console.error('Missing required fields:', {
    email: formData.email,
    name: formData.name,
    fileUrl: selectedPdf?.fileUrl
  });
  return;
}

    const templateParams = {
      to_email: formData.email,
      to_name: formData.name,
      pdf_url: selectedPdf.fileUrl,
      institution: selectedPdf.institution,
    };

    console.log('Sending email with params:', templateParams);

    try {
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID, 
        EMAILJS_TEMPLATE_ID,
        templateParams
      );
      console.log('Email sent successfully:', response);
      
      // Call the parent's form submit handler after email is sent
      propHandleFormSubmit(e);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again.');
    }
  };

  if (!isOpen) return null;

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
        className="bg-white max-w-md w-full p-6 rounded-2xl shadow-lg relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h3 className="text-xl font-bold mb-2 text-center">
          Send Case Study to Email
        </h3>
        <p className="text-sm text-gray-600 text-center mb-6">
          {selectedPdf?.institution}
        </p>

        {submitMessage ? (
          <div className="text-center">
            <div className={`p-4 rounded-xl ${submitMessage.includes('sent') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {submitMessage}
            </div>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your email address"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  Send PDF
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
