import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Calendar, Download } from 'lucide-react';
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

// Minimal WhatsApp icon used in FAB menu
const WhatsAppIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 48 48"
    className={className}
  >
    <path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path>
    <path fill="#fff" fillRule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clipRule="evenodd"></path>
  </svg>
);

const FloatingActionMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
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
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

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
      id: 'chat',
      icon: WhatsAppIcon,
      label: 'Live Chat',
      onClick: () => {}, // Handled below
    },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleMenuItemClick = (item: MenuItem) => {
    switch (item.id) {
      case 'chat':
        setShowChat(!showChat);
        setShowBookDemo(false);
        setActiveIcon(showChat ? Plus : WhatsAppIcon);
        break;
      case 'demo':
        setShowBookDemo(!showBookDemo);
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
    // On mobile, stack items vertically above the FAB for maximum visibility
    const isMobile = windowWidth < 640; // sm breakpoint
    if (isMobile) {
      const spacing = 60; // px between items
      const bottomOffset = 24; // px from bottom of screen
      const fabHeight = 56; // FAB button height
      const sideMargin = 24; // px from right edge of screen
      const maxHeight = (typeof window !== 'undefined' ? window.innerHeight : 800) - bottomOffset - fabHeight - 20; // 20px safety margin
      
      // Calculate position ensuring it doesn't go off-screen
      let yPosition = -(spacing * (index + 1));
      const totalStackHeight = spacing * total;
      
      // If the stack would go off-screen, compress the spacing
      if (totalStackHeight > maxHeight) {
        const compressedSpacing = maxHeight / total;
        yPosition = -(compressedSpacing * (index + 1));
      }
      
      return {
        x: 0,
        y: yPosition,
      };
    }

    // Desktop/tablet: arrange items on an arc
    const isSmallMobile = windowWidth < 400; // extra small screens
    let radius = 80;

    // Slightly reduce radius on smaller tablets
    if (windowWidth < 768) radius = 70;
    if (isSmallMobile) radius = 55;

    const angle = (index * (80 / (total - 1)) - 10) * (Math.PI / 100);
    return {
      x: -Math.cos(angle) * radius,
      y: -Math.sin(angle) * radius,
    };
  };

  // Handle window resize for responsive positioning
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
      setViewportWidth(newWidth);
      // Close menu on resize to prevent positioning issues
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    // Also listen for orientation changes on mobile
    window.addEventListener('orientationchange', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [isOpen]);

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
      <ChatButton isVisible={showChat} onClose={() => setShowChat(false)} />
      <BookDemo isVisible={showBookDemo} onClose={() => setShowBookDemo(false)} />

      {/* Floating Action Button Container - Responsive positioning to prevent cutoff */}
      {/* 
        Mobile positioning strategy:
        - Extra small phones (<375px): 12px from right edge
        - Small phones (<480px): 16px from right edge  
        - Regular mobile: 24px from right edge
        - Tablet/Desktop: 16px+ from right edge with responsive scaling
      */}
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

      <div 
        className={`fixed z-50 ${
          windowWidth < 640 
            ? windowWidth < 375 
              ? 'bottom-6 right-3' // Extra small phones (12px margin)
              : windowWidth < 480
                ? 'bottom-6 right-4' // Small phones (16px margin) 
                : 'bottom-6 right-6' // Regular mobile (24px margin)
            : 'bottom-6 right-4 sm:right-8 md:bottom-10 md:right-16' // Tablet and desktop
        }`}
        style={{
          minWidth: '56px', // Ensure container is at least as wide as the FAB
          minHeight: windowWidth < 640 ? '300px' : '100px', // Extra height for mobile vertical stack
          maxWidth: windowWidth < 640 ? 'calc(100vw - 16px)' : 'auto', // Prevent overflow on mobile
        }}
      >
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
                      title={windowWidth >= 640 ? item.label : undefined} // Native tooltip for mobile
                    >
                      <IconComponent size={20} />
                      {/* Only show custom tooltip on larger screens */}
                      {windowWidth >= 640 && (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`absolute bg-gray-800 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap invisible group-hover:visible transition-all z-10 pointer-events-none ${
                            index === menuItems.length - 1 ? 'bottom-16 right-0' : 'right-14'
                          }`}
                        >
                          {item.label}
                        </motion.div>
                      )}
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
