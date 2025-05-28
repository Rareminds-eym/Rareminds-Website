import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, HelpCircle, MessageCircle, Calendar, Download } from 'lucide-react';
import FAQChatbot from "../../components/Academy/FAQChatbot";
// import { ChatButton } from './ChatButton';

interface MenuItem {
  id: string;
  icon: React.ComponentType<any>;
  label: string;
  onClick: () => void;
}

const FloatingActionMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFAQChatbot, setShowFAQChatbot] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleDownloadClick = () => {
    // Create a link element
    const link = document.createElement('a');
    link.href = ''; // Adjust path as needed
    link.download = '';
    link.click();
  };

  const menuItems: MenuItem[] = [
    {
      id: 'faq',
      icon: HelpCircle,
      label: 'FAQ',
      onClick: () => {}, 
    },
    {
      id: 'chat',
      icon: MessageCircle,
      label: 'Live Chat',
      onClick: () => {}, 
    },
    {
      id: 'demo',
      icon: Calendar,
      label: 'Book a Demo',
      onClick: () => console.log('Book a Demo clicked'),
    },
    {
      id: 'download',
      icon: Download,
      label: 'Download Brochure',
      onClick: handleDownloadClick,
    },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.id === 'faq') {
      // Toggle FAQChatbot visibility
      setShowFAQChatbot(!showFAQChatbot);
      setShowChat(false); // Hide chat if FAQ is clicked
    } else if (item.id === 'chat') {
      // Toggle chat visibility
      setShowChat(!showChat);
      setShowFAQChatbot(false); // Hide FAQ if chat is clicked
    } else {
      item.onClick();
    }
    setIsOpen(false);
  };

  // Calculate positions for circular layout expanding to the left
  const getItemPosition = (index: number, total: number) => {
    const radius = 80;
    const startAngle = -10; // Start from top-left
    const angleStep = 80 / (total - 1); // Spread across 90 degrees
    const angle = (startAngle + angleStep * index) * (Math.PI / 100);
    
    return {
      x: -Math.cos(angle) * radius, // Negative to expand left
      y: -Math.sin(angle) * radius, // Negative to go upward
    };
  };

  return (
    <>
      <FAQChatbot isVisible={showFAQChatbot} /> 
      {/* <ChatButton isVisible={showChat} onClose={() => setShowChat(false)} />  */}
      <div className="fixed bottom-24 right-16 z-50">
        {/* Menu Items */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Background overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
                onClick={() => setIsOpen(false)}
              />
              
              {menuItems.map((item, index) => {
                const position = getItemPosition(index, menuItems.length);
                const IconComponent = item.icon;
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ 
                      opacity: 0, 
                      scale: 0,
                      x: 0,
                      y: 0,
                    }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      x: position.x,
                      y: position.y,
                    }}
                    exit={{ 
                      opacity: 0, 
                      scale: 0,
                      x: 0,
                      y: 0,
                    }}
                    transition={{ 
                      duration: 0.3,
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }}
                    className="absolute bottom-0 right-0"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleMenuItemClick(item)}
                      className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors group relative"
                    >
                      <IconComponent size={20} />
                      
                      {/* Tooltip */}
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute right-14 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap invisible group-hover:visible transition-all" 
                      >
                        {item.label}
                      </motion.div>
                    </motion.button>
                  </motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>

        {/* Main Action Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMenu}
          className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          >
            <Plus size={24} />
          </motion.div>
        </motion.button>

        {/* Ripple effect */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0.3 }}
              animate={{ scale: 4, opacity: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full -z-10"
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default FloatingActionMenu;