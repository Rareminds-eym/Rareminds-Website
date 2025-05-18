import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function FDPButton() {
  const location = useLocation();
  const isFDPPage = location.pathname === '/fdp';

  const buttonText = isFDPPage ? 'Back to home page' : 'For Institutions';
  const subText = isFDPPage ? 'Click to return home' : 'Click to explore programs';
  const targetLink = isFDPPage ? '/' : '/fdp';

  return (
    <Link to={targetLink}>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-40 right-0 z-50"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-2 bg-[#434343] text-white px-6 py-4 rounded-l-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20"></div>
            <GraduationCap className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium">{buttonText}</span>
            <span className="text-[10px] text-blue-200">{subText}</span>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
}
