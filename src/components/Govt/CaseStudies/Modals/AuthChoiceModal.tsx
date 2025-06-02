import { motion } from 'framer-motion';
import { X, LogIn, UserPlus } from 'lucide-react';

interface AuthChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthChoice: (mode: 'signin' | 'signup') => void;
  selectedPdf: { institution: string } | null;
}

export default function AuthChoiceModal({
  isOpen,
  onClose,
  onAuthChoice,
  selectedPdf
}: AuthChoiceModalProps) {
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
          Access Case Study
        </h3>
        <p className="text-sm text-gray-600 text-center mb-8">
          Please sign in or create an account to download the PDF
        </p>

        <div className="space-y-4">
          <button
            onClick={() => onAuthChoice('signin')}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </button>
          
          <button
            onClick={() => onAuthChoice('signup')}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Create Account
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
