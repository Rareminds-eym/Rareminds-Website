import { motion } from 'framer-motion';
import { useState } from 'react';
import { Trophy, TrendingUp, Puzzle , X } from 'lucide-react';

import VelsPDF from '@/assets/pdfs/Vels.pdf';

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
             Colleges that choose outcomes. And got them.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 px-16">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <study.icon className="w-7 h-7 text-red-500 mb-4" />
              <h3 className="text-medium font-bold mb-4">{study.title}</h3>
              <a 
                href={study.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold px-3 py-2  border-2 border-black rounded-full bg-gradient-to-bl from-gray-300 to-gray-50 text-black hover:text-black transition-colors inline-block mb-2"
                download
              >
                {study.institution}
              </a>
              <p className="text-gray-600 text-sm">{study.details}</p>
            </motion.div>
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
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl opacity-75 animate-pulse " />
            
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
      className="bg-white max-w-2xl w-full p-6 rounded-2xl shadow-lg relative"
    >
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-4 right-4 text-gray-600 hover:text-black"
      >
        <X className="w-6 h-6" />
      </button>
      <h3 className="text-xl font-bold mb-6 text-center">
        Download Case Studies
      </h3>
      <div className="space-y-4">
        {caseStudies.map((study, index) => (
          <div key={index} className="flex justify-between items-center border p-4 rounded-xl">
            <div>
              <p className="font-semibold">{study.institution}</p>
              <p className="text-sm text-gray-500">{study.details}</p>
            </div>
            <a
              href={study.pdfUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium"
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