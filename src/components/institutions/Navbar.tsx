import { motion } from 'framer-motion';
import { Menu, X, BookOpen, Users, Phone} from 'lucide-react';
import { useState } from 'react';
import RMlogo from '../assets/logos/Rareminds Logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Courses', icon: BookOpen },
    { name: 'About Us', icon: Users },
    { name: 'Contact', icon: Phone },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-lg"
    >
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between h-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-2xl font-bold"
          >
            <img src={RMlogo} alt="Logo" className="w-32 h-24 object-contain" />
          </motion.div>

          
          <div className="flex items-center gap-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-28 h-6 bg-[#222B33] text-white  rounded-full font-semibold text-xs "
            >
              Institutions
            </motion.button>

            {/* Show menu icon on both mobile and desktop */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="block"
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Menu dropdown */}
        {/* Menu dropdown */}
{isOpen && (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="py-2 md:absolute md:right-6 md:top-20 md:bg-white/80 md:shadow-xl md:rounded-lg md:p-2"
  >
    <div className="flex flex-col md:items-center md:text-sm md:gap-1">
      {menuItems.map((item, index) => (
        <motion.a
          key={index}
          href="#"
          className={`flex items-center gap-2 py-2 px-4 text-gray-600 hover:text-blue-600 transition-colors md:justify-center ${
            index !== menuItems.length - 1 ? 'border-b border-gray-200' : ''
          }`}
          whileHover={{ x: 8 }}
        >
          <item.icon className="w-4 h-4 md:w-4 md:h-4" />
          {item.name}
        </motion.a>
      ))}
    </div>
  </motion.div>
)}

        
      </div>
    </motion.nav>
  );
}
