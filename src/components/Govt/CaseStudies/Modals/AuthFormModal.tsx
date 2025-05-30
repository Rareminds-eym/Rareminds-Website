import { motion } from 'framer-motion';
import { X, User, Mail, LogIn, UserPlus } from 'lucide-react';

interface AuthFormModalProps {
  isOpen: boolean;
  authMode: 'signin' | 'signup';
  onClose: () => void;
  onAuthChoice: (mode: 'signin' | 'signup') => void;
  authData: {
    name: string;
    email: string;
    password: string;
  };
  handleAuthInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAuthSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  authMessage: string;
  selectedPdf: { institution: string } | null;
}

export default function AuthFormModal({
  isOpen,
  authMode,
  onClose,
  onAuthChoice,
  authData,
  handleAuthInputChange,
  handleAuthSubmit,
  isSubmitting,
  authMessage,
  selectedPdf,
}: AuthFormModalProps) {
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
          {authMode === 'signup' ? 'Create Account' : 'Sign In'}
        </h3>
        <p className="text-sm text-gray-600 text-center mb-6">
          {selectedPdf?.institution}
        </p>

        {authMessage && (
          <div className={`p-4 rounded-xl mb-4 ${authMessage.includes('successfully') || authMessage.includes('check your email') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {authMessage}
          </div>
        )}

        <form onSubmit={handleAuthSubmit} className="space-y-4">
          {authMode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={authData.name}
                onChange={handleAuthInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={authData.email}
              onChange={handleAuthInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={authData.password}
              onChange={handleAuthInputChange}
              required
              minLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter your password"
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
                Processing...
              </>
            ) : (
              <>
                {authMode === 'signup' ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                {authMode === 'signup' ? 'Create Account' : 'Sign In'}
              </>
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => onAuthChoice(authMode === 'signup' ? 'signin' : 'signup')}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {authMode === 'signup' ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
