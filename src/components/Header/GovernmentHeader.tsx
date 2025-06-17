import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, AlignJustify } from "lucide-react";

const GovernmentHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleFullMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto h-[80px] px-4 py-4 flex justify-between items-center">
        {/* Left: Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          <img src="/RareMinds.webp" alt="Rareminds Logo" width={200}/>
        </Link>

        {/* Right: Government & Blogs Buttons */}
        <div className="hidden md:flex gap-3 items-center">
          <Link
            to="/government"
            className="bg-gradient-to-b from-red-400 to-red-500 px-3 py-2 border-2 text-white border-red-300 rounded-full hover:bg-red-500 transition-colors"
          >
            Government
          </Link>
          <button
            onClick={toggleFullMenu}
            className="px-3 py-2 rounded-full text-gray-800 hover:bg-gray-100 transition-colors"
          >
            <AlignJustify />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-gray-700">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-2">
          <Link
            to="/government"
            className="block w-full text-center bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Government
          </Link>
          <button
            onClick={toggleFullMenu}
            className="block w-full text-center text-gray-800 px-6 py-2 rounded-md transition"
          >
            <AlignJustify />
          </button>
        </div>
      )}

      {/* Full Screen Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full font-extrabold bg-white z-40 flex flex-col pl-[10%] pt-[10%] items-start justify-start">
          <button
            onClick={toggleFullMenu}
            className="absolute top-4 right-4 text-gray-700"
          >
            <X size={24} />
          </button>

          <Link
            to="/government/blogs"
            className="text-xl text-gray-800 md:text-4xl py-2 hover:text-red-600 mb-4"
            onClick={() => setIsMenuOpen(false)}
          >
            Blogs
          </Link>
        </div>
      )}
    </header>
  );
};

export default GovernmentHeader;
