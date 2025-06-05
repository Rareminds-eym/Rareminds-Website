import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComingSoonModal: React.FC<ComingSoonModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-2xl p-6 shadow-xl w-[90%] max-w-md text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800">🚧 Coming Soon</h2>
            <p className="text-gray-600 mt-2">This feature is currently in development. Stay tuned!</p>
            <button
              onClick={onClose}
              className="mt-6 px-4 py-2 bg-[#83cffb] text-black font-medium rounded-full hover:scale-105 transition"
            >
              Okay!
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
