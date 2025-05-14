import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Corporate", path: "/corporate" },
  { label: "Govt", path: "/govt" },
  { label: "Colleges", path: "/colleges" },
  { label: "School", path: "/school" },
  { label: "Counselling", path: "https://career.rareminds.in", external: true },
];

const VerticalsHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          Rareminds
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item, i) =>
            item.external ? (
              <a
                key={i}
                href={`https://${item.path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={i}
                to={item.path}
                className={`${
                  location.pathname === item.path
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700"
                } hover:text-blue-600`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button onClick={toggleMenu} className="md:hidden text-gray-700">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 py-2">
          {navItems.map((item, i) =>
            item.external ? (
              <a
                key={i}
                href={`https://${item.path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2 text-gray-700 hover:text-blue-600"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={i}
                to={item.path}
                className={`block py-2 ${
                  location.pathname === item.path
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700"
                } hover:text-blue-600`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      )}
    </header>
  );
};

export default VerticalsHeader;
