import React from 'react';
import { AlertCircle, RefreshCw, Home, Search } from 'lucide-react';
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
  const is404 = title.toLowerCase().includes('404');

  if (is404) {
    // Special 404 full-page design
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-white via-red-50 to-red-100 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center z-10"
        >
          <div className="mb-8">
            <span className="inline-flex items-center justify-center rounded-full bg-red-100 shadow-lg p-6 animate-bounce-slow">
              <Search className="h-16 w-16 text-red-400" />
            </span>
          </div>
          <h1 className="text-7xl md:text-9xl font-extrabold text-red-500 mb-4 drop-shadow-lg">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-xl mx-auto">{message}</p>
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center px-8 py-4 bg-red-500 text-white rounded-full font-semibold text-lg shadow-xl hover:bg-red-600 transition-colors duration-200"
            >
              <Home className="h-6 w-6 mr-3" />
              Go Home
            </motion.button>
          </Link>
        </motion.div>
        {/* Decorative background shapes */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-40 z-0" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-200 rounded-full blur-2xl opacity-30 z-0" />
      </div>
    );
  }

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
