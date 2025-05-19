import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const CorporateHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isTrainingPage = location.pathname.includes('/corporate/training');
  const buttonLink = isTrainingPage ? '/corporate' : '/corporate/training';
  const buttonText = isTrainingPage ? 'Recruitment' : 'Training';

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto h-[80px] px-4 py-4 flex justify-between items-center">
        {/* Left: Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          <img src="/RareMinds.webp" alt="Rareminds Logo" width={200}/>
        </Link>

        {/* Right: Dynamic Button */}
        <div className="hidden md:block">
          <Link
            to={buttonLink}
            className="corporate-btn-1"
          >
            {buttonText}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-gray-700">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4">
          <Link
            to={buttonLink}
            className="block w-full text-center bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {buttonText}
          </Link>
        </div>
      )}
    </header>
  );
};

export default CorporateHeader;
