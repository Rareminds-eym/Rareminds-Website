import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, HelpCircle, MessageCircle, Calendar, Download } from 'lucide-react';
import FAQChatbot from "./FAQChatbot";
import { ChatButton } from './ChatButton';
import { BookDemo } from './BookDemo';
import { cn } from "@/lib/utils";
import { supabase } from '@/lib/supabaseClient';

interface MenuItem {
  id: string;
  icon: React.ComponentType<any>;
  label: string;
  onClick: () => void;
}

// Resource type for download modal
interface Resource {
  title: string;
  pdfLink: string;
}

const FloatingActionMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFAQChatbot, setShowFAQChatbot] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showBookDemo, setShowBookDemo] = useState(false);
  const [activeIcon, setActiveIcon] = useState<React.ComponentType<any>>(Plus);
  // Modal state for download
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const handleDownloadClick = (resource: Resource) => {
    setSelectedResource(resource);
    setModalOpen(true);
    setName("");
    setEmail("");
    setPhone("");
    setErrorMsg("");
  };

  const menuItems: MenuItem[] = [
    {
      id: 'download',
      icon: Download,
      label: 'Download Brochure',
      onClick: () => handleDownloadClick({ title: 'Brochure', pdfLink: 'https://drive.google.com/file/d/18Q-Rd1ZTrXEjgLhW0EqTQO8K1xoC9aJ9/view?usp=drive_link' }),
    },
    {
      id: 'demo',
      icon: Calendar,
      label: 'Book a Demo',
      onClick: () => setShowBookDemo(true),
    },
    {
      id: 'faq',
      icon: HelpCircle,
      label: 'FAQ',
      onClick: () => {}, // Handled below
    },
    {
      id: 'chat',
      icon: MessageCircle,
      label: 'Live Chat',
      onClick: () => {}, // Handled below
    },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleMenuItemClick = (item: MenuItem) => {
    switch (item.id) {
      case 'faq':
        setShowFAQChatbot(!showFAQChatbot);
        setShowChat(false);
        setShowBookDemo(false);
        setActiveIcon(showFAQChatbot ? Plus : HelpCircle);
        break;
      case 'chat':
        setShowChat(!showChat);
        setShowFAQChatbot(false);
        setShowBookDemo(false);
        setActiveIcon(showChat ? Plus : MessageCircle);
        break;
      case 'demo':
        setShowBookDemo(!showBookDemo);
        setShowFAQChatbot(false);
        setShowChat(false);
        setActiveIcon(showBookDemo ? Plus : Calendar);
        break;
      case 'download':
        setActiveIcon(Download);
        setTimeout(() => setActiveIcon(Plus), 1000);
        item.onClick();
        break;
      default:
        item.onClick();
        setActiveIcon(Plus);
    }
    setIsOpen(false);
  };

  const getItemPosition = (index: number, total: number) => {
    const radius = 80;
    const angle = (index * (80 / (total - 1)) - 10) * (Math.PI / 100);
    return {
      x: -Math.cos(angle) * radius,
      y: -Math.sin(angle) * radius,
    };
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (timeoutId) clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            setIsOpen(entry.isIntersecting);
          }, 300);
        });
      },
      {
        threshold: [0.1, 0.5],
        rootMargin: '50px',
      }
    );

    const footer = document.getElementById('footer');
    if (footer) observer.observe(footer);

    return () => {
      if (footer) observer.unobserve(footer);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // --- Add handleSubmit for modal form ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    // Basic email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    // Basic phone validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
      setErrorMsg("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!selectedResource) return;

    setLoading(true);

    try {
      // Insert data into Supabase table demo_pdf
      const { error } = await supabase.from("demo_pdf").insert([
        {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        setLoading(false);
        setErrorMsg("Failed to save data. Please try again.");
        return;
      }

      // Send email
      const response = await fetch('https://email-sender-ssmu.onrender.com/send-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          resourceTitle: selectedResource.title,
          pdfUrl: selectedResource.pdfLink
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setLoading(false);
      setModalOpen(false);
    } catch (err) {
      setLoading(false);
      setErrorMsg("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <FAQChatbot isVisible={showFAQChatbot} onClose={() => setShowFAQChatbot(false)} />
      <ChatButton isVisible={showChat} onClose={() => setShowChat(false)} />
      <BookDemo isVisible={showBookDemo} onClose={() => setShowBookDemo(false)} />

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              aria-label="Close modal"
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4">Please enter your details</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-1 font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit phone number"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              {errorMsg && <p className="text-red-600">{errorMsg}</p>}

              <button
                type="submit"
                disabled={loading}
                className={cn(
                  "w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded transition-colors",
                  loading ? "opacity-50 cursor-not-allowed" : ""
                )}
              >
                {loading ? "Submitting..." : "Submit & Download"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="fixed bottom-10 right-16 z-50">
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 -z-10"
                onClick={() => setIsOpen(false)}
              />

              {menuItems.map((item, index) => {
                const position = getItemPosition(index, menuItems.length);
                const IconComponent = item.icon;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{ opacity: 1, scale: 1, x: position.x, y: position.y }}
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
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleMenuItemClick(item)}
                      className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors group relative"
                    >
                      <IconComponent size={20} />
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`absolute bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap invisible group-hover:visible transition-all ${
                          index === menuItems.length - 1 ? 'bottom-16 right-0' : 'right-14'
                        }`}
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

        {/* Main FAB Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMenu}
          className={`w-14 h-14 border-2 border-red-200 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center text-white hover:from-red-600 hover:to-red-300 transition-all duration-200 ${
            !isOpen && 'animate-bounce'
          } shadow-xl shadow-red-400/50`}
        >
          <motion.div animate={{ rotate: isOpen ? 0 : 0 }}>
            {React.createElement(activeIcon, { size: 24, className: 'animate-pulse' })}
          </motion.div>
        </motion.button>

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
