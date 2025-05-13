import React from 'react';

interface HeaderProps {
  navbarOpen: boolean;
  setNavbarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ navbarOpen, setNavbarOpen }) => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">Rareminds</div>
        <button 
          className="md:hidden"
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          <span className="block w-6 h-0.5 bg-black mb-1"></span>
          <span className="block w-6 h-0.5 bg-black mb-1"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;