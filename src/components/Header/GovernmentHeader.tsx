import React, { useState, useMemo, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const getNavItemsByVertical = (vertical: string) => {
  const basePath = `/${vertical.toLowerCase()}`;
  switch (vertical.toLowerCase()) {
    case 'government':
      return [
        { label: "Home", path: basePath },
        { label: "Contact Us", path: `${basePath}/contact` },
      ];
    case 'corporate':
      return [
        { label: "Home", path: basePath },
        { label: "Services", path: `${basePath}/services` },
        { label: "Contact Us", path: `${basePath}/contact` },
      ];
    case 'academia':
      return [
        { label: "Home", path: basePath },
        { label: "Contact", path: `${basePath}/contact` },
      ];
    case 'institutions':
      return [
        { label: "Home", path: basePath },
        { label: "Contact", path: `${basePath}/contact` },
      ];
    default:
      return [
        { label: "Home", path: basePath },
        { label: "Contact", path: `${basePath}/contact` },
      ];
  }
};

const verticalOptions = [
  "Government",
  "Corporate",
  "Academia",
  "Institutions",
];

const GovernmentHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine initial vertical from current path
  const currentPath = location.pathname.split('/')[1] || 'government';
  const [currentVertical, setCurrentVertical] = useState(
    currentPath.charAt(0).toUpperCase() + currentPath.slice(1)
  );

  // Update vertical when path changes
  useEffect(() => {
    const pathVertical = location.pathname.split('/')[1] || 'government';
    const formattedVertical = pathVertical.charAt(0).toUpperCase() + pathVertical.slice(1);
    if (verticalOptions.includes(formattedVertical)) {
      setCurrentVertical(formattedVertical);
    }
  }, [location.pathname]);

  const navItems = useMemo(() => getNavItemsByVertical(currentVertical), [currentVertical]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleVerticalChange = (value: string) => {
    setCurrentVertical(value);
    const basePath = `/${value.toLowerCase()}`;
    setIsOpen(false); // Close mobile menu when changing vertical
    navigate(basePath);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto h-[80px] px-4 py-4 flex justify-between items-center">
        {/* Left: Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          <img src="/RareMinds.webp" alt="Rareminds Logo" width={200}/>
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item, i) => (
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
          ))}
        </nav>

        {/* Right: Vertical Select Box */}
        <div className="hidden md:block">
          <select
            value={currentVertical}
            onChange={(e) => handleVerticalChange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {verticalOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-gray-700">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 py-2 space-y-2">
          {navItems.map((item, i) => (
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
          ))}
          <div className="pt-2">
            <select
              value={currentVertical}
              onChange={(e) => handleVerticalChange(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {verticalOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </header>
  );
};

export default GovernmentHeader;
