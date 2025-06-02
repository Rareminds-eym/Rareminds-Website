import { motion } from 'framer-motion';
import { X, Mail } from 'lucide-react';

interface CaseStudy {
  icon: any;
  title: string;
  institution: string;
  details: string;
  pdfUrl: string;
}

interface CaseListModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudies: CaseStudy[];
  onDownloadClick: (study: CaseStudy) => void;
}

export default function CaseListModal({
  isOpen,
  onClose,
  caseStudies,
  onDownloadClick
}: CaseListModalProps) {
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
        className="bg-white max-w-2xl w-full p-6 rounded-2xl shadow-lg relative"
      >
        <button
          onClick={onClose}
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
              <button
                onClick={() => {
                  onClose();
                  onDownloadClick(study);
                }}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Get PDF
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
