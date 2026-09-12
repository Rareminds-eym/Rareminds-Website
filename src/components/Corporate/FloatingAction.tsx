import React, { useState, useEffect, useCallback, Suspense, lazy, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  HelpCircle,
  MessageCircle,
  Calendar,
  Download,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { initialSession, type Session } from "./ChatBot/engine";

const FAQChatbot = lazy(() => import("./ChatBot/FAQChatbot"));
const ChatButton = lazy(() => import("./ChatButton").then((m) => ({ default: m.ChatButton })));
const BookDemo = lazy(() => import("./BookDemo").then((m) => ({ default: m.BookDemo })));

type ActivePanel = "faq" | "chat" | "demo" | null;

interface MenuItem {
  id: string;
  icon: React.ComponentType<any>;
  label: string;
}

const FloatingActionMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [session, setSession] = useState<Session>(initialSession);
  const [chatDetails, setChatDetails] = useState({ name: "", email: "" });

  const userDismissedAtBottom = useRef(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const defaultTopic = location.pathname.startsWith("/corporate/training")
    ? "training"
    : location.pathname.startsWith("/corporate/recruitment")
    ? "recruitment"
    : "all";

  // Close active panel and menu on route changes
  useEffect(() => {
    setActivePanel(null);
    setIsOpen(false);
    userDismissedAtBottom.current = false;
  }, [location.key]);

  // Keyboard navigation: Escape key dismisses open menus and modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activePanel) {
          setActivePanel(null);
        } else if (isOpen) {
          userDismissedAtBottom.current = true;
          setIsOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePanel, isOpen]);

  // Close floating speed-dial menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        userDismissedAtBottom.current = true;
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Open menu automatically when user scrolls near the bottom (before footer)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset;
          const windowHeight = window.innerHeight;
          const docHeight = Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight
          );
          const footer = document.getElementById("footer");
          const footerHeight = footer ? footer.offsetHeight + 10 : 120;
          const isNearBottom = scrollY + windowHeight >= docHeight - footerHeight;

          if (!activePanel) {
            if (isNearBottom) {
              // Only auto-open if the visitor hasn't intentionally dismissed it at the bottom
              if (!userDismissedAtBottom.current) {
                setIsOpen(true);
              }
            } else {
              // Reset the dismissal lock once the visitor scrolls back up
              userDismissedAtBottom.current = false;
              setIsOpen(false);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial position on mount (e.g. direct deep link or page reload at bottom)
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activePanel]);

  // Robust observer-assisted scrolling to #contact section for the Download action
  useEffect(() => {
    if (!location.state?.corporateDownload) return;
    const scrollToContact = () => {
      const el = document.getElementById("contact");
      if (!el) return false;
      el.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
      return true;
    };

    if (scrollToContact()) return;
    const observer = new MutationObserver(() => {
      if (scrollToContact()) observer.disconnect();
    });
    observer.observe(document.body, { subtree: true, childList: true });
    const timer = window.setTimeout(() => observer.disconnect(), 8000);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [location.key, location.state]);

  const handleDownloadClick = useCallback(() => {
    setIsOpen(false);
    setActivePanel(null);
    const targetPath =
      defaultTopic === "training" ? "/corporate/training" : "/corporate/recruitment";

    // If already on the target page, scroll directly without triggering full route reload
    if (location.pathname === targetPath) {
      const el = document.getElementById("contact");
      if (el) {
        el.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        });
        return;
      }
    }

    navigate(targetPath, { state: { corporateDownload: true } });
  }, [defaultTopic, location.pathname, navigate]);

  const menuItems: MenuItem[] = [
    {
      id: "download",
      icon: Download,
      label: "Download",
    },
    {
      id: "chat",
      icon: MessageCircle,
      label: "Chat",
    },
    {
      id: "demo",
      icon: Calendar,
      label: "Book a Demo",
    },
    {
      id: "faq",
      icon: HelpCircle,
      label: "FAQ",
    },
  ];

  const toggleMenu = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (!next) {
        // User explicitly closed it; prevent scroll from immediately forcing it open
        userDismissedAtBottom.current = true;
      } else {
        userDismissedAtBottom.current = false;
      }
      return next;
    });
  };

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.id === "download") {
      handleDownloadClick();
    } else if (item.id === "chat") {
      setActivePanel("chat");
      setIsOpen(false);
    } else if (item.id === "demo") {
      setActivePanel("demo");
      setIsOpen(false);
    } else if (item.id === "faq") {
      setActivePanel("faq");
      setIsOpen(false);
    }
  };

  const closePanel = () => {
    setActivePanel(null);
  };

  // Circular layout positions expanding upward and to the left
  const getItemPosition = (index: number, total: number) => {
    const radius = 80;
    const startAngle = -10;
    const angleStep = 90 / (total - 1);
    const angle = (startAngle + angleStep * index) * (Math.PI / 130);

    return {
      x: -Math.cos(angle) * radius,
      y: -Math.sin(angle) * radius,
    };
  };

  return (
    <div ref={menuRef} className="fixed right-10 bottom-6 z-50">
      {/* Menu Items (Expanding Arc) */}
      <AnimatePresence>
        {isOpen && (
          <>
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
                    aria-label={item.label}
                    className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors group relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
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
                          className="absolute right-14 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap shadow-md pointer-events-none"
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
        aria-label={isOpen ? "Close quick actions menu" : "Open quick actions menu"}
        className={`w-14 h-14 bg-[#434343] rounded-full shadow-lg flex items-center justify-center text-white hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 ${
          !isOpen ? "animate-bounce" : ""
        }`}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
        >
          <Plus size={24} />
        </motion.div>
      </motion.button>

      {/* Ripple effect on open */}
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

      {/* Clean backdrop when any modal panel is active */}
      <AnimatePresence>
        {activePanel !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/25 backdrop-blur-sm z-40"
            onClick={closePanel}
          />
        )}
      </AnimatePresence>

      {/* FAQ Chatbot Modal */}
      {activePanel === "faq" && (
        <Suspense fallback={null}>
          <FAQChatbot
            isVisible={activePanel === "faq"}
            onClose={closePanel}
            session={session}
            setSession={setSession}
            defaultTopic={defaultTopic}
            onOpenChat={() => setActivePanel("chat")}
          />
        </Suspense>
      )}

      {/* Live WhatsApp Chat Modal */}
      {activePanel === "chat" && (
        <Suspense fallback={null}>
          <ChatButton
            isVisible={activePanel === "chat"}
            onClose={closePanel}
            details={chatDetails}
            setDetails={setChatDetails}
          />
        </Suspense>
      )}

      {/* Book a Demo Modal */}
      {activePanel === "demo" && (
        <Suspense fallback={null}>
          <BookDemo
            isVisible={activePanel === "demo"}
            onClose={closePanel}
          />
        </Suspense>
      )}
    </div>
  );
};

export default FloatingActionMenu;
