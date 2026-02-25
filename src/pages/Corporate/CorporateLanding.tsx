import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function CorporateLanding() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Corporate Training Solutions | Rareminds</title>
        <meta name="description" content="Transform your workforce with Rareminds' corporate training solutions" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Corporate Training Solutions
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Empower your workforce with customized training programs and services
            </p>
          </motion.div>

          {/* Corporate Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-md mx-auto"
          >
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/corporate/training#services')}
              className="group relative bg-white rounded-2xl shadow-lg border-2 border-slate-200 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-blue-500"
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative p-8 text-center">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
                >
                  <Building2 className="w-10 h-10 text-white" />
                </motion.div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                  CORPORATE
                </h2>

                {/* Description */}
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Professional training solutions designed for corporate workforce development
                </p>

                {/* Button */}
                <motion.button
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-md group-hover:bg-blue-700 group-hover:shadow-lg transition-all"
                >
                  <span>Explore Programs</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.button>
              </div>

              {/* Bottom Accent */}
              <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          </motion.div>

          {/* Optional: Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12 text-slate-500 text-sm"
          >
            <p>Click the card above to view our training services</p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
