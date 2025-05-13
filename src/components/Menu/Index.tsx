import React from 'react';
import { Link } from 'react-router-dom';

interface MenuProps {
  navbarOpen: boolean;
  setNavbarOpen: (open: boolean) => void;
}

const Menu: React.FC<MenuProps> = ({ navbarOpen, setNavbarOpen }) => {
  return (
    <nav className={`fixed top-[72px] left-0 w-full bg-white shadow-md transition-transform duration-300 ${navbarOpen ? 'translate-y-0' : '-translate-y-full'} md:translate-y-0 md:static md:shadow-none`}>
      <div className="container mx-auto px-4 py-4">
        <ul className="flex flex-col md:flex-row gap-4">
          <li>
            <Link to="/about" onClick={() => setNavbarOpen(false)}>About</Link>
          </li>
          <li>
            <Link to="/home" onClick={() => setNavbarOpen(false)}>Home</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;