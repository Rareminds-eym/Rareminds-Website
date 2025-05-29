import React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ErrorComponentProps {
  title?: string;
  message: string;
  retry?: () => void;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  title = 'Oops! Something went wrong',
  message,
  retry
}) => {
  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white to-red-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg mx-auto"
      >
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-red-100 rounded-full blur-xl opacity-60"></div>
          <AlertCircle className="relative h-16 w-16 mx-auto text-red-500" />
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-base md:text-lg text-gray-600 mb-8">{message}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={retry || (() => window.location.reload())}
            className="inline-flex items-center px-6 py-3 bg-red-500 text-white rounded-lg font-medium shadow-lg hover:bg-red-600 transition-colors duration-200 group"
          >
            <RefreshCw className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
            Refresh Page
          </motion.button>
          
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium shadow-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Home className="h-5 w-5 mr-2" />
              Go Home
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-0 top-1/4 w-64 h-64 bg-red-100 rounded-full blur-3xl opacity-30 -translate-x-1/2"></div>
        <div className="absolute right-0 bottom-1/4 w-64 h-64 bg-red-100 rounded-full blur-3xl opacity-30 translate-x-1/2"></div>
      </div>
    </div>
  );
};

export default ErrorComponent;
