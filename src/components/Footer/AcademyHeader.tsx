import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const AcademyHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isStudentPage = location.pathname.includes("/academia/student");
  const isSchoolPage = location.pathname.includes("/academia/school");

  let buttonLink = "";
  let buttonText = "";

  if (isStudentPage) {
    buttonLink = "/academia/school";
    buttonText = "School";
  } else if (isSchoolPage) {
    buttonLink = "/academia/student";
    buttonText = "Student";
  } else {
    buttonLink = "/academia/student";
    buttonText = "Student";
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto h-[80px] px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          <img src="/RareMinds.webp" alt="Rareminds Logo" width={180} />
        </Link>

        {/* Desktop Navigation Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/academia"
            className="px-5 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
          >
            Academia
          </Link>
          <Link
            to={buttonLink}
            className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            {buttonText}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={toggleMenu} className="md:hidden text-gray-700">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-2">
          <Link
            to="/academia"
            className="block w-full text-center bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition"
            onClick={() => setIsOpen(false)}
          >
            Academia
          </Link>
          <Link
            to={buttonLink}
            className="block w-full text-center bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => setIsOpen(false)}
          >
            {buttonText}
          </Link>
        </div>
      )}
    </header>
  );
};

export default AcademyHeader;
