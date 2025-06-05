import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  HelpCircle,
  MessageCircle,
  Calendar,
  Download,
} from "lucide-react";
import FAQChatbot from "./ChatBot/FAQChatbot";
import { ChatButton } from "./ChatButton";
import { BookDemo } from "./BookDemo";
import { useLocation, useNavigate } from "react-router-dom";

interface MenuItem {
  id: string;
  icon: React.ComponentType<any>;
  label: string;
  onClick: () => void;
}

const FloatingActionMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenFaq, setIsOpenFaq] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showBookDemo, setShowBookDemo] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Open menu when user scrolls near the bottom (before footer)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const footer = document.querySelector("#footer");
      const footerHeight = footer
        ? (footer as HTMLElement).offsetHeight + 10
        : 120; // fallback if no footer
      if (scrollY + windowHeight >= docHeight - footerHeight) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = useCallback(() => {
    const isOnTrainingPage = location.pathname.startsWith(
      "/corporate/training"
    );

    if (isOnTrainingPage) {
      navigate("/corporate/training");

      setTimeout(() => {
        const el = document.getElementById("contact");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    } else {
      // Navigate and scroll after DOM loads
      navigate("/corporate/recruitment");

      setTimeout(() => {
        const el = document.getElementById("contact");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 300); // allow time for route to change and render
    }
  }, [location.pathname, navigate]);

  const menuItems: MenuItem[] = [
    {
      id: "download",
      icon: Download,
      label: "Download",
      onClick: handleClick,
    },
    {
      id: "chat",
      icon: MessageCircle,
      label: "Chat",
      onClick: () => {}, // Handled in handleMenuItemClick
    },
    {
      id: "demo",
      icon: Calendar,
      label: "Book a Demo",
      onClick: () => {}, // Handled in handleMenuItemClick
    },
    {
      id: "faq",
      icon: HelpCircle,
      label: "FAQ",
      onClick: () => {}, // Handled in handleMenuItemClick
    },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.id === "chat") {
      setShowChat(true);
      setIsOpenFaq(false);
      setShowBookDemo(false);
    } else if (item.id === "faq") {
      setIsOpenFaq(true);
      setShowChat(false);
      setShowBookDemo(false);
    } else if (item.id === "demo") {
      setShowBookDemo(true);
      setShowChat(false);
      setIsOpenFaq(false);
    } else {
      item.onClick();
    }
    setIsOpen(false);
  };

  // Calculate positions for circular layout expanding to the left
  const getItemPosition = (index: number, total: number) => {
    const radius = 80;
    const startAngle = -10; // Start from top-left
    const angleStep = 90 / (total - 1); // Spread across 90 degrees
    const angle = (startAngle + angleStep * index) * (Math.PI / 130);

    return {
      x: -Math.cos(angle) * radius, // Negative to expand left
      y: -Math.sin(angle) * radius, // Negative to go upward
    };
  };

  return (
    <div className="fixed right-10 bottom-6 z-50">
      {/* Menu Items */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background overlay */}
            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
              onClick={() => setIsOpen(false)}
            /> */}

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
                    damping: 20,
                  }}
                  className="absolute bottom-0 right-0"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleMenuItemClick(item)}
                    className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors group relative"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <IconComponent size={20} />
                    {/* Tooltip */}
                    <AnimatePresence>
                      {hoveredIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="absolute right-14 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap transition-opacity"
                        >
                          {item.label}
                        </motion.div>
                      )}
                    </AnimatePresence>
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
        className={`w-14 h-14 bg-[#434343] rounded-full shadow-lg flex items-center justify-center text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-200 ${
          !isOpen && "animate-bounce"
        }`}
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
            className="absolute inset-0 bg-[#434343] rounded-full -z-10"
          />
        )}
      </AnimatePresence>
      {isOpenFaq && (
        <div className="fixed inset-0 z-[9999] flex items-end justify-end">
          {/* Overlay background for closing */}
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setIsOpenFaq(false)}
          />
          <div className="relative z-10" onClick={(e) => e.stopPropagation()}>
            <FAQChatbot open={isOpenFaq} onClose={() => setIsOpenFaq(false)} />
          </div>
        </div>
      )}

      {/* Chat Button */}
      <ChatButton isVisible={showChat} onClose={() => setShowChat(false)} />

      {/* Book Demo */}
      <BookDemo
        isVisible={showBookDemo}
        onClose={() => setShowBookDemo(false)}
      />
    </div>
  );
};

export default FloatingActionMenu;
