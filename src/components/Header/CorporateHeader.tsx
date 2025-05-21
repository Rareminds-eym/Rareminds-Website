import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const CorporateHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isTrainingPage = location.pathname.includes('/corporate/training');
  const isRecruitmentPage = location.pathname.includes('/corporate') && !location.pathname.includes('/training');

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto h-[80px] px-4 py-4 flex justify-between items-center">
        {/* Left: Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          <img src="/RareMinds.webp" alt="Rareminds Logo" width={200}/>
        </Link>

        {/* Right: Navigation Buttons */}
        <div className="hidden md:flex gap-4">
          <Link
            to="/corporate"
            className={isRecruitmentPage ? "corporate-btn-1" : "corporate-btn-2"}
          >
            Recruitment
          </Link>
          <Link
            to="/corporate/training"
            className={isTrainingPage ? "corporate-btn-1" : "corporate-btn-2"}
          >
            Training
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-gray-700">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-3">
          <Link
            to="/corporate"
            className={`block w-full text-center ${isRecruitmentPage ? "corporate-btn-1" : "corporate-btn-2"}`}
            onClick={() => setIsOpen(false)}
          >
            Recruitment
          </Link>
          <Link
            to="/corporate/training"
            className={`block w-full text-center ${isTrainingPage ? "corporate-btn-1" : "corporate-btn-2"}`}
            onClick={() => setIsOpen(false)}
          >
            Training
          </Link>
        </div>
      )}
    </header>
  );
};

export default CorporateHeader;
