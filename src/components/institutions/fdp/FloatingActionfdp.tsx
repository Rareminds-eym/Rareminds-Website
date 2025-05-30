import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Calendar, Download, MessageCircleQuestion,MessageCircle, X } from "lucide-react";
import FAQChatbot from "@/components/institutions/sdp/FAQChatbot";
import { supabase } from "@/lib/supabaseClient";
import { ChatButton } from "@/components/institutions/ChatButton";

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
  const [showContactForm, setShowContactForm] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
    phone: "",
    message: "",
    facultyCount: "",
  });

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


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("fdp_requests").insert([
      {
        name: formData.name,
        email: formData.email,
        institution: formData.institution,
        phone: formData.phone,
        facultyCount: formData.facultyCount,
        message: formData.message,
      },
    ]);

    if (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
      return;
    }

    setShowContactForm(false);
    setFormData({
      name: "",
      email: "",
      institution: "",
      phone: "",
      message: "",
      facultyCount: "",
    });
  };

  const menuItems: MenuItem[] = [
    {
      id: "faq",
      icon: MessageCircleQuestion,
      label: "FAQ",
      onClick: () => {
        setIsChatbotOpen(true);
        setIsOpen(false);
      },
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
      id: "fdp",
      icon: Calendar,
      label: "Request Custom FDP",
      onClick: () => {
        setShowContactForm(true);
        setIsOpen(false);
      },
    },
    {
      id: "download",
      icon: Download,
      label: "Download FDP Brochure",
      onClick: () => {
        window.open('institutions/pdfs/Brochure.pdf');
        setIsOpen(false);
      },
    },
  ];

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

  let MainIcon = Plus;
  if (!isOpen) {
    MainIcon = isHovered || showPlusIcon ? Plus : iconCycle[iconIndex];
  }

  return (
    <>
      {/* Floating Menu */}
      <div className="fixed bottom-8 right-6 z-50">
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
                    onClick={item.onClick}
                    className="group relative flex items-center gap-3 bg-[#222B33] text-white p-4 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20"></div>
                      <Icon size={20} />
                    </div>
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
          onClick={() => setIsOpen((prev) => !prev)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="w-14 h-14 bg-gradient-to-tr from-gray-700 to-gray-900 rounded-full shadow-lg flex items-center justify-center text-white hover:opacity-90 transition-all duration-200"
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          >
            <MainIcon size={24} />
          </motion.div>
        </motion.button>
      </div>

      {/* Chatbot */}
      <FAQChatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
      <ChatButton isVisible={isChatOpen} onClose={() => setIsChatOpen(false)} />
      {/* Modal for Request Custom FDP */}
       <AnimatePresence>
            {showContactForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-2"
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-white rounded-3xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
                >
                  <div className="p-6 bg-gradient-to-br from-gray-600 to-gray-900 rounded-t-2xl">
                    <div className="flex justify-between items-center">
                      <h3 className="text-medium font-bold text-white pl-[120px]">Request Custom FDP</h3>
                      <button
                        onClick={() => setShowContactForm(false)}
                        className="text-white hover:text-blue-200 transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleFormSubmit} className="p-8 space-y-2">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                        <input
                          type="text"
                          name="institution"
                          value={formData.institution}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Number of Faculty</label>
                      <input
                        type="number"
                        name="facultyCount"
                        value={formData.facultyCount}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={2}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        required
                      ></textarea>
                    </div>

                    <div className="text-center">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="mt-4 bg-[#222b33] text-white px-4 py-2 rounded-2xl font-medium text-sm"
                      >
                        Submit Request
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
    </>
  );
};

export default FloatingActionMenu;
