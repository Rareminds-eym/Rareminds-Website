import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, HomeIcon, BookOpen, Briefcase, Users, School, GraduationCap, AlertTriangle, Zap, BookAIcon } from "lucide-react";


const verticalOptions = [
  { label: "SDP", path: "/universities", icon: <School size={22} /> },
  { label: "Universities", path: "/universities/services", icon: <Users size={22} /> },
  { label: "FDP", path: "/universities/fdp", icon: <GraduationCap size={22} /> },
];

const commonOptions = [
  { label: "Careers", path: "https://rareminds.zohorecruit.in/jobs/Careers", icon: <Briefcase size={22} /> },
  { label: "Trainers: Apply Now", path: "https://rareminds.zohorecruit.in/jobs/Trainers", icon: <Zap size={22} />, isTrainers: true },
  { label: "Blogs", path: "/universities/blogs", icon: <BookOpen size={22} /> },
  { label: "Skill Passport", path: "/universities/skill-passport", icon: <BookAIcon size={22} /> },

];

const mobileOptions = [
  ...verticalOptions.map((opt) => ({ ...opt, urgent: false })),
  ...commonOptions,
];

const UniversitiesHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // Track last scroll position
  const lastScrollY = useRef(window.scrollY);

  // Collapse menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Collapse menu on scroll
      if (isMenuOpen && window.scrollY !== lastScrollY.current) {
        setIsMenuOpen(false);
      }
      // Open menu if user scrolls to top
      if (!isMenuOpen && window.scrollY === 0 && lastScrollY.current !== 0) {
        setIsMenuOpen(true);
      }
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleSelect = (option: any) => {
    setIsMenuOpen(false);
    if (option.path) {
      if (option.path.startsWith('http')) {
        window.open(option.path, '_blank');
      } else {
        navigate(option.path);
      }
    } else {
      alert("Page coming soon!");
    }
  };

  const handleMenuButtonClick = () => {
    setIsMenuOpen((prev) => !prev);
    setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.blur();
      }
    }, 0);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto h-[80px] px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600 flex items-center">
          <img src="/RareMinds.webp" alt="Rareminds Logo" width={200} />
        </Link>
        <div className="flex items-center gap-6">
          {/* Trainers CTA Button with glow animation */}
          <a
            href="https://rareminds.zohorecruit.in/jobs/Trainers"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex font-medium text-sm shadow group focus:outline-none focus:ring-2 focus:ring-secondary-600 transition relative animate-glow hover:animate-none w-auto bg-gradient-to-tr from-gray-700 to-gray-900 text-white button-secondary h-9 min-h-0 py-1 gap-1"
            style={{ minWidth: 0 }}
          >
            <Zap size={20} />
            Trainers: Apply Now
            <span className="absolute left-1/2 -bottom-8 -translate-x-1/2 whitespace-nowrap bg-yellow-300 text-black text-[11px] font-semibold px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              Applications filling fast!
            </span>
          </a>
          {/* Menu Button */}
          <button
            ref={buttonRef}
            onClick={handleMenuButtonClick}
            className="text-gray-700 p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition md:flex"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {/* Dropdown Menu below button, right-aligned */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute top-[80px] z-50 w-full md:w-[420px] flex justify-end md:justify-end"
          style={{ pointerEvents: 'auto', right: 0, ...(window.innerWidth >= 768 ? { right: '2rem' } : {}) }}
        >
          <div className="relative w-full md:w-[420px] bg-white border border-gray-200 rounded-xl shadow-2xl p-0">
            {/* Caret ^ */}
            <div className="absolute -top-3 right-6 md:right-6">
              <svg width="32" height="16" viewBox="0 0 32 16"><polygon points="16,0 32,16 0,16" fill="#fff" stroke="#e5e7eb" /></svg>
            </div>
            {/* Navigation Section */}
            <div className="p-4 pb-2">
              <div className="text-xs font-bold text-gray-500 mb-2 tracking-widest">NAVIGATION</div>
              <div className="grid grid-cols-3 gap-3">
                {verticalOptions.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => handleSelect(option)}
                    className="flex flex-col items-center gap-1 p-3 rounded-lg border hover:bg-blue-50 transition shadow-sm"
                  >
                    {option.icon}
                    <span className="font-semibold text-blue-700 text-xs">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* Divider */}
            <div className="border-t my-2 mx-4" />
            {/* Common Pages Section */}
            <div className="p-4 pt-2">
              <div className="text-xs font-bold text-gray-500 mb-2 tracking-widest">COMMON PAGES</div>
              <div className="grid grid-cols-3 gap-3">
                {commonOptions.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => handleSelect(option)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-lg border hover:bg-blue-50 transition shadow-sm group ${option.isTrainers ? 'animate-glow border-cyan-400' : ''}`}
                  >
                    <div className="relative flex flex-col items-center">
                      {option.icon}
                      {/* Show hover message for trainers button */}
                      {option.isTrainers && (
                        <span className="absolute left-1/2 -bottom-8 -translate-x-1/2 whitespace-nowrap bg-yellow-300 text-black text-[11px] font-semibold px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          Applications filling fast! Apply now
                        </span>
                      )}
                    </div>
                    <span className={`font-semibold text-xs ${option.isTrainers ? 'text-blue-700' : 'text-blue-700'}`}>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* Home Button */}
            <button
              onClick={() => { setIsMenuOpen(false); navigate("/"); }}
              className="mt-4 mb-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition mx-auto"
              style={{ width: 'calc(100% - 2rem)' }}
            >
              <HomeIcon size={20} /> Homepage
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default UniversitiesHeader;