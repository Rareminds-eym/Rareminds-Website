import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Calendar, Download, MessageCircleQuestion, MessageCircle } from "lucide-react";
import FAQChatbot from "@/components/institutions/sdp/FAQChatbot";
import { ChatButton } from "@/components/institutions/ChatButton";
import Modal from "react-modal";
import { supabase } from "@/lib/supabaseClient";

interface MenuItem {
  id: string;
  icon: React.ComponentType<any>;
  label: string;
  onClick: () => void;
}

const iconCycle = [MessageCircleQuestion, Download, Calendar];
const cycleIntervalMs = 1500;
const showPlusDuration = 4000;

const FloatingActionMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [iconIndex, setIconIndex] = useState(0);
  const [showPlusIcon, setShowPlusIcon] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Course List Modal State
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [courseForm, setCourseForm] = useState({ name: '', email: '' });
  const [courseSending, setCourseSending] = useState(false);
  const [courseSuccess, setCourseSuccess] = useState(false);
  const [courseError, setCourseError] = useState('');

  // Email automation for Course List
  const sendCourseListEmail = async (name: string, email: string) => {
    const response = await fetch('https://rareminds.in/api/send-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        pdfUrl: '/institutions/pdfs/Course_List.pdf',
        institution: 'Course List Download'
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to send email');
    }
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseForm({ ...courseForm, [e.target.name]: e.target.value });
  };

  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCourseSending(true);
    setCourseError('');
    try {
      await supabase.from('course_list_requests').insert([
        { name: courseForm.name, email: courseForm.email }
      ]);
      await sendCourseListEmail(courseForm.name, courseForm.email);
      setCourseSuccess(true);
      setTimeout(() => {
        setCourseModalOpen(false);
        setCourseSuccess(false);
        setCourseForm({ name: '', email: '' });
      }, 2000);
    } catch (err: any) {
      setCourseError(err.message || 'Failed to send course list. Try again.');
    }
    setCourseSending(false);
  };

  useEffect(() => {
    let plusTimeout: NodeJS.Timeout;
    let cycleInterval: NodeJS.Timeout;

    if (!isOpen) {
      setShowPlusIcon(true);
      plusTimeout = setTimeout(() => {
        setShowPlusIcon(false);
        cycleInterval = setInterval(() => {
          setIconIndex((prev) => (prev + 1) % iconCycle.length);
        }, cycleIntervalMs);
      }, showPlusDuration);
    } else {
      setShowPlusIcon(true);
      setIconIndex(0);
    }

    return () => {
      clearTimeout(plusTimeout);
      clearInterval(cycleInterval);
    };
  }, [isOpen]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDown = currentScrollY > lastScrollY;
      const scrollUp = currentScrollY < lastScrollY;

      const scrollBottom = currentScrollY + window.innerHeight >= document.body.scrollHeight - 50;

      if (scrollDown && scrollBottom && !isOpen) {
        setIsOpen(true);
      }

      if (scrollUp && isOpen) {
        setIsOpen(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const toggleChatbot = () => {
    setIsChatbotOpen((prev) => !prev);
    setIsOpen(false);
  };
  const closeChatbot = () => setIsChatbotOpen(false);

  const menuItems: MenuItem[] = [
    {
      id: "faq",
      icon: MessageCircleQuestion,
      label: "FAQ",
      onClick: toggleChatbot,
    },
    {
      id: "chat",
      icon: MessageCircle,
      label: "Live Chat",
      onClick: () => {
        setIsChatOpen((prev) => !prev);
        setIsChatbotOpen(false); // Close chatbot if chat is opened
        setIsOpen(false);
      },
    },
    {
      id: "demo",
      icon: Calendar,
      label: "Book a Demo",
      onClick: () => {
        window.open("tel:+919902326951");
        setIsOpen(false);
      },
    },
    {
      id: "download",
      icon: Download,
      label: "Download Course List",
      onClick: () => {
        setCourseModalOpen(true);
        setIsOpen(false);
      },
    },
  ];

  const handleMenuItemClick = (item: MenuItem) => {
    item.onClick();
  };

  const getItemPosition = (index: number, total: number) => {
    const radius = 120;
    const angleStep = 90 / (total - 1);
    const angleDeg = 180 - index * angleStep;
    const angleRad = (angleDeg * Math.PI) / 180;

    return {
      x: Math.cos(angleRad) * radius,
      y: -Math.sin(angleRad) * radius,
    };
  };

  // Determine the icon to show in FAB
  let MainIcon = Plus;
  if (!isOpen) {
    MainIcon = isHovered || showPlusIcon ? Plus : iconCycle[iconIndex];
  }

  return (
    <>
      {/* Floating Menu */}
      <div className="fixed bottom-8 right-6 z-50">
        {/* Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Menu Items */}
        <AnimatePresence>
          {isOpen &&
            menuItems.map((item, index) => {
              const position = getItemPosition(index, menuItems.length);
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: position.x,
                    y: position.y,
                  }}
                  exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
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
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleMenuItemClick(item)}
                    className="group relative flex items-center gap-3 bg-[#222B33] text-white p-4 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20"></div>
                      <Icon size={20} />
                    </div>

                    {/* Tooltip */}
                    <div
                      className={`absolute right-14 ${
                        item.id === "download" ? "-top-6" : "top-0"
                      } bg-black/60 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity`}
                    >
                      {item.label}
                    </div>
                  </motion.button>
                </motion.div>
              );
            })}
        </AnimatePresence>

        {/* Main FAB */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={isOpen ? {} : { y: [0, -27, 0] }}
          transition={
            isOpen
              ? {}
              : {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 1.5,
                  ease: "easeInOut",
                }
          }
          onClick={toggleMenu}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="w-14 h-14 bg-gradient-to-tr from-gray-700 to-gray-900 rounded-full shadow-lg flex items-center justify-center text-white hover:opacity-90 transition-all duration-200"
          aria-label="Toggle menu"
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          >
            <MainIcon size={24} />
          </motion.div>
        </motion.button>
      </div>

      {/* Modal for Course List Download */}
      <Modal
        isOpen={courseModalOpen}
        onRequestClose={() => {
          setCourseModalOpen(false);
          setCourseSuccess(false);
          setCourseForm({ name: '', email: '' });
          setCourseError('');
        }}
        className="bg-white rounded-lg p-8 max-w-md mx-auto mt-24 shadow-lg relative z-[9999]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[9998]"
      >
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={() => {
            setCourseModalOpen(false);
            setCourseSuccess(false);
            setCourseForm({ name: '', email: '' });
            setCourseError('');
          }}
        >
          ×
        </button>
        <h2 className="text-lg font-bold mb-4">Download Course List</h2>
        {courseSuccess ? (
          <div className="text-green-600">
            Course List sent to your email!
          </div>
        ) : (
          <form onSubmit={handleCourseSubmit} className="space-y-4">
            <input
              name="name"
              value={courseForm.name}
              onChange={handleCourseChange}
              required
              placeholder="Your Name"
              className="w-full border px-3 py-2 rounded"
            />
            <input
              name="email"
              value={courseForm.email}
              onChange={handleCourseChange}
              required
              type="email"
              placeholder="Email ID"
              className="w-full border px-3 py-2 rounded"
            />
            {courseError && (
              <p className="text-red-500 text-sm text-center">{courseError}</p>
            )}
            <button
              type="submit"
              disabled={courseSending}
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold"
            >
              {courseSending ? 'Sending...' : 'Send & Download'}
            </button>
          </form>
        )}
      </Modal>

      {/* FAQ Chatbot Panel */}
      <FAQChatbot isOpen={isChatbotOpen} onClose={closeChatbot} />
      <ChatButton isVisible={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default FloatingActionMenu;