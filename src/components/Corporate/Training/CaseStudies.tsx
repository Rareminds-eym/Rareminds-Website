import { motion } from 'framer-motion';
import { useState } from 'react';
import { Trophy, TrendingUp, Puzzle , X } from 'lucide-react';

const caseStudies = [
  {
    icon: Trophy,
    title: 'One College, 2 Months, 40% Placement Jump',
    institution: 'Vels University',
    details: '600 Students | Soft Skills + Resume Bootcamp',
    pdfUrl: "VelsPDF"
  },
  {
    icon: TrendingUp,
    title: 'From Tier-3 to Interview-Ready in 30 Days',
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
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-black bg-clip-text text-transparent">
            Delivering on Outcomes: Success Stories.
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mx-auto max-w-2xl">
             Colleges That Chose Outcomes. And Got Them.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-0 sm:px-4 lg:px-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <study.icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{study.title}</h3>
              <a 
                href={study.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base font-semibold text-blue-600 hover:text-blue-800 transition-colors inline-block mb-2"
                download
              >
                {study.institution}
              </a>
              <p className="text-sm sm:text-base text-gray-600">{study.details}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-8 sm:mt-10 lg:mt-12"
        >
          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl opacity-75 animate-pulse" />
            
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="relative bg-[#222B33] text-white px-4 py-2 sm:px-6 sm:py-4 rounded-full w-full sm:w-auto min-w-[200px] sm:min-w-[280px]
                font-semibold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
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

      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4 sm:p-6"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white w-full max-w-lg sm:max-w-xl lg:max-w-2xl p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg relative"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-600 hover:text-black"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center">
              Download Case Studies
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {caseStudies.map((study, index) => (
                <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border p-3 sm:p-4 rounded-lg sm:rounded-xl">
                  <div className="mb-2 sm:mb-0">
                    <p className="font-semibold text-sm sm:text-base">{study.institution}</p>
                    <p className="text-xs sm:text-sm text-gray-500">{study.details}</p>
                  </div>
                  <a
                    href={study.pdfUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
                  >
                    Download PDF
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}