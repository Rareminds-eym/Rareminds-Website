import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Newspaper, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

const CorporateHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isRecruitmentPage = location.pathname.startsWith("/corporate/recruitment")? true : false;

  const prefix = isRecruitmentPage ? "/corporate/recruitment" : "/corporate/training";

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { path: prefix, label: "Home", icon: Home },
    {
      path: `${prefix}/services`,
      label: "Services",
      icon: BookOpen,
    },
    { path: `${prefix}/blogs`, label: "Blogs", icon: Newspaper },
    { path: `${prefix}/contact`, label: "Contact", icon: Phone },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const MenuButton = ({
    isOpen,
    toggle,
  }: {
    isOpen: boolean;
    toggle: () => void;
  }) => (
    <motion.button
      onClick={toggle}
      className="relative z-50 w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        initial={false}
        animate={{ opacity: isOpen ? 0 : 1, rotate: isOpen ? 90 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Icon icon="mdi:menu" width={24} height={24} />
      </motion.span>
      <motion.span
        initial={false}
        animate={{ opacity: isOpen ? 1 : 0, rotate: isOpen ? 0 : -90 }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Icon icon="mdi:close" width={24} height={24} />
      </motion.span>
    </motion.button>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b">
      <div className="container mx-auto h-[80px] px-4 py-4 flex justify-between items-center">
        {/* Left: Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600 relative z-50">
          <img src="/RareMinds.webp" alt="Rareminds Logo" width={200} />
        </Link>

        {/* Right: Navigation Buttons */}
        <div className="flex gap-5">
          <div className="hidden md:flex gap-4">
            <Link
              to="/corporate/recruitment"
              className={
                location.pathname.includes("/corporate/recruitment")
                  ? "corporate-btn-1"
                  : "corporate-btn-2"
              }
            >
              Recruitment
            </Link>
            <Link
              to="/corporate/training"
              className={
                location.pathname.includes("/corporate/training")
                  ? "corporate-btn-1"
                  : "corporate-btn-2"
              }
            >
              Training
            </Link>
          </div>

          {/* Menu Button */}
          <MenuButton isOpen={isOpen} toggle={toggleMenu} />
        </div>
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-[81px] bg-white backdrop-blur-lg border-b shadow-lg"
          >
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="container max-w-7xl mx-auto py-8 px-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {menuItems.map((menuItem, index) => {
                const IconComponent = menuItem.icon;
                const isActive =
                  location.pathname === menuItem.path ||
                  (menuItem.path.includes("recruitment") &&
                    location.pathname.includes("/corporate/recruitment")) ||
                  (menuItem.path.includes("training") &&
                    location.pathname.includes("/corporate/training"));

                return (
                  <motion.div
                    key={menuItem.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50 rounded-xl"
                  >
                    <Link
                      to={menuItem.path}
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center p-4 rounded-xl transition-all duration-200
                        ${
                          isActive
                            ? " text-black"
                            : "hover:bg-gray-50"
                        }`}
                    >
                      <span
                        className={`p-3 rounded-lg mr-4 transition-colors duration-200
                        ${
                          isActive
                            ? "bg-black/10 text-black"
                            : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                        }`}
                      >
                        <IconComponent size={20} />
                      </span>
                      <div>
                        <h3
                          className={`font-semibold mb-1 transition-colors duration-200
                          ${isActive ? "text-black" : "text-gray-800"}`}
                        >
                          {menuItem.label}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {menuItem.path === "/"
                            ? "Back to homepage"
                            : `Explore our ${menuItem.label.toLowerCase()}`}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default CorporateHeader;
