import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, HomeIcon } from "lucide-react";

const verticalOptions = [
  { label: "SDP", path: "/institutions" },
  { label: "Institutions", path: "/institutions/services" },
  { label: "FDP", path: "/institutions/fdp" }, // not linked yet
];

const InstitutionsHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [currentVertical, setCurrentVertical] = useState("SDP");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (label: string) => {
    const selectedOption = verticalOptions.find(
      (option) => option.label === label
    );

    if (selectedOption && selectedOption.path) {
      setCurrentVertical(label);
      navigate(selectedOption.path);
      setIsOpen(false);
    } else {
      alert("FDP page is coming soon!");
      setCurrentVertical("Institutions");
    }
  };

  // Back to Home handler
  const handleBackToHome = () => {
    setIsOpen(false);
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto h-[80px] px-4 py-4 flex justify-between items-center">
        {/* Left: Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600 flex items-center">
          <img src="/RareMinds.webp" alt="Rareminds Logo" width={200} />
        </Link>

        {/* Desktop Dropdown */}
        <div className="hidden md:block relative" ref={dropdownRef}>
          <button
            onClick={toggleMenu}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            className="inline-flex items-center gap-2 border border-blue-600 bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition rounded-xl"
          >
            {currentVertical}
            <ChevronDown size={18} className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {isOpen && (
            <ul
              role="listbox"
              tabIndex={-1}
              className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none z-50"
            >
              {/* Back to Home for Desktop */}
              <li
                role="option"
                tabIndex={0}
                onClick={handleBackToHome}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleBackToHome();
                  }
                }}
                className="cursor-pointer px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 border-b"
              >
                <HomeIcon size={16} className="inline mr-1" />
                Homepage
              </li>
              {verticalOptions.map(({ label, path }) => (
                <li
                  key={label}
                  role="option"
                  aria-selected={currentVertical === label}
                  onClick={() => handleSelect(label)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleSelect(label);
                    }
                  }}
                  tabIndex={0}
                  className={`cursor-pointer px-4 py-2 text-sm ${
                    currentVertical === label ? "bg-blue-100 text-blue-700 font-semibold" : "hover:bg-blue-50"
                  } ${!path ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {label} {!path && <span className="italic text-xs text-gray-400">(coming soon)</span>}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 py-3 shadow-lg">
          {/* Back to Home for Mobile */}
          <button
            onClick={handleBackToHome}
            className="w-full text-left px-4 py-3 mb-2 rounded-md text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100"
          >
            <HomeIcon size={16} className="inline mr-1" />
             Homepage
          </button>
          {verticalOptions.map(({ label, path }) => (
            <button
              key={label}
              onClick={() => handleSelect(label)}
              disabled={!path}
              className={`w-full text-left px-4 py-3 mb-1 rounded-md text-sm font-medium ${
                currentVertical === label
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-blue-50"
              } ${!path ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              {label} {!path && <span className="italic text-xs text-gray-400 ml-2">(coming soon)</span>}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default InstitutionsHeader;