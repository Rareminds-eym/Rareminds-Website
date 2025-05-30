import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface CaseStudyProps {
  icon: LucideIcon;
  title: string;
  institution: string;
  details: string;
  onDownloadClick: () => void;
}

export default function CaseCard({
  icon: Icon,
  title,
  institution,
  details,
  onDownloadClick
}: CaseStudyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
    >
      <Icon className="w-7 h-7 text-red-500 mb-4" />
      <h3 className="text-medium font-bold mb-4">{title}</h3>
      <button 
        onClick={onDownloadClick}
        className="text-sm font-semibold px-3 py-2 border-2 border-black rounded-full bg-gradient-to-bl from-gray-300 to-gray-50 text-black hover:text-black transition-colors inline-block mb-2 cursor-pointer"
      >
        {institution}
      </button>
      <p className="text-gray-600 text-sm">{details}</p>
    </motion.div>
  );
}
