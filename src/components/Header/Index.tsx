import React, { Dispatch, SetStateAction } from "react";
import Menu from "@/components/Menu/Index";

interface HeaderProps {
  navbarOpen: boolean;
  setNavbarOpen: Dispatch<SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ navbarOpen, setNavbarOpen }) => {
  return (
    <>
      <header className="fixed h-[80px] flex items-center top-0 left-0 w-full bg-slate-900 shadow-lg z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-white hover:text-gray-200 transition-colors">
            Rareminds
          </div>
          <Menu navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />
          <button
            className="p-2 rounded hover:bg-slate-800 transition-colors"
            onClick={() => setNavbarOpen(!navbarOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="block w-6 h-0.5 bg-white mb-1.5"></span>
            <span className="block w-6 h-0.5 bg-white mb-1.5"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
