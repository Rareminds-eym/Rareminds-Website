import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Calendar } from 'lucide-react';
import { ChatButton } from './ChatButton';
import { AddToCalendar } from './AddToCalendar';
import { Event } from '../../../types/Events/event';

interface MenuItem {
  id: string;
  icon: React.ComponentType<any>;
  label: string;
  onClick: () => void;
}

interface FloatingActionMenuProps {
  currentEvent?: Event;
}

// Minimal WhatsApp icon used for the FAB menu
const WhatsAppIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 48 48" className={className}>
    <path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path>
    <path fill="#fff" fillRule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clipRule="evenodd"></path>
  </svg>
);

const FloatingActionMenu: React.FC<FloatingActionMenuProps> = ({ currentEvent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showAddToCalendar, setShowAddToCalendar] = useState(false);
  const [activeIcon, setActiveIcon] = useState<React.ComponentType<any>>(Plus);

  const menuItems: MenuItem[] = [
    {
      id: 'calendar',
      icon: Calendar,
      label: 'Add to Calendar',
      onClick: () => setShowAddToCalendar(true),
    },
    {
      id: 'chat',
      icon: WhatsAppIcon,
      label: 'Live Chat',
      onClick: () => {},
    },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.id === 'chat') {
      setShowChat(!showChat);
      setShowAddToCalendar(false);
      setActiveIcon(showChat ? Plus : WhatsAppIcon);
    } else if (item.id === 'calendar') {
      setShowAddToCalendar(!showAddToCalendar);
      setShowChat(false);
      setActiveIcon(showAddToCalendar ? Plus : Calendar);
    } else {
      item.onClick();
      setActiveIcon(Plus);
    }
    setIsOpen(false);
  };

  const getItemPosition = (index: number, total: number) => {
    // Adjusted for bottom-right anchor: fan items upwards toward the left (left/up)
    let radius = 80;
    if (window.innerWidth < 768) radius = 70;

    if (total === 2) {
      // Index 0 (Calendar) -> 135° (top-left)
      // Index 1 (Chat/WhatsApp) -> 90° (straight up)
      const angles = [(135 * Math.PI) / 180, (90 * Math.PI) / 180];
      const theta = angles[index];
      return {
        x: Math.cos(theta) * radius,
        y: -Math.sin(theta) * radius,
      };
    }

    // Fallback: evenly distribute over an arc above the FAB
    const startDeg = 50;  // Start from top-left relative to right anchor
    const endDeg = 130;   // to top-right
    const step = total > 1 ? (endDeg - startDeg) / (total - 1) : 0;
    const theta = ((startDeg + step * index) * Math.PI) / 180;
    return {
      x: -Math.cos(theta) * radius, // Negative to expand left
      y: -Math.sin(theta) * radius,
    };
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
      
          if (timeoutId) clearTimeout(timeoutId);
        
          if (entry.isIntersecting) {
            
            timeoutId = setTimeout(() => {
              setIsOpen(true);
            }, 300);
          } else {
            timeoutId = setTimeout(() => {
              setIsOpen(false);
            }, 300);
          }
        });
      },
      {
        threshold: [0.1, 0.5], 
        rootMargin: '50px', 
      }
    );

    // Find the footer element
    const footer = document.getElementById('footer');
    if (footer) {
      observer.observe(footer);
    }

    // Cleanup observer and timeout on component unmount
    return () => {
      if (footer) {
        observer.unobserve(footer);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <>
      <ChatButton isVisible={showChat} onClose={() => setShowChat(false)} />
      <AddToCalendar isVisible={showAddToCalendar} onClose={() => setShowAddToCalendar(false)} currentEvent={currentEvent} />
      <div className="fixed bottom-6 right-4 sm:bottom-8 sm:right-6 md:bottom-10 md:right-16 z-50">
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
                className="fixed inset-0   -z-10"
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
                      <IconComponent size={26} />
                      
                      {/* Tooltip */}
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`absolute bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap invisible group-hover:visible transition-all z-20 pointer-events-none bottom-16 right-0 -translate-x-0`}
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
          className={`w-14 h-14 border-2 border-red-200 bg-gradient-to-r from-red-400 to-red-600 rounded-full  flex items-center justify-center text-white hover:from-red-600 hover:to-red-300 transition-all duration-200  ${!isOpen && 'animate-bounce'} shadow-xl shadow-red-400/50`}
        >
          <motion.div
            animate={{ rotate: isOpen ? 0 : 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          >
            <Plus size={24} className="animate-pulse" />
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