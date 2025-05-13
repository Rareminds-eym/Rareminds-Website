import React, { useState } from 'react';
import { Facebook, Linkedin, Youtube, Instagram, X } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="w-full py-4 px-4 md:px-8 relative">
            <div className="container mx-auto relative z-50">
                {/* Logo and social icons */}
                <div className="flex justify-between items-center">
                    <img src="/RareMinds.png" className="w-64" />
                    <div className="flex items-center gap-4">
                        <a href="https://facebook.com" aria-label="Facebook" className="text-gray-500 hover:text-gray-700">
                            <Facebook size={40} className="rounded-full border border-gray-400 p-1" />
                        </a>
                        <a href="https://linkedin.com" aria-label="LinkedIn" className="text-gray-500 hover:text-gray-700">
                            <Linkedin size={40} className="rounded-full border border-gray-400 p-1" />
                        </a>
                        <a href="https://youtube.com" aria-label="YouTube" className="text-gray-500 hover:text-gray-700">
                            <Youtube size={40} className="rounded-full border border-gray-400 p-1" />
                        </a>
                        <a href="https://twitter.com" aria-label="Twitter" className="text-gray-500 hover:text-gray-700">
                            <X size={40} className="rounded-full border border-gray-400 p-1" />
                        </a>
                        <a href="https://instagram.com" aria-label="Instagram" className="text-gray-500 hover:text-gray-700">
                            <Instagram size={40} className="rounded-full border border-gray-400 p-1" />
                        </a>
                    </div>
                </div>

                {/* Menu Button */}
                <div className="mt-6">
                    <button
                        onClick={toggleMenu}
                        className="bg-black text-white px-6 py-2 rounded-full flex items-center justify-center w-auto relative z-50"
                        aria-label="Menu"
                        aria-expanded={isMenuOpen}
                    >
                        <div className={`flex flex-col mr-2 space-y-1 transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-40 space-y-0' : ''}`}>
                            <span className={`block w-4 h-0.5 bg-white transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 absolute' : ''}`}></span>
                            <span className={`block w-4 h-0.5 bg-white transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`block w-4 h-0.5 bg-white transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 absolute' : ''}`}></span>

                        </div>
                        <span className="font-medium">MENU</span>
                    </button>
                </div>
            </div>

            {/* Fullscreen Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black/90  text-white z-40 flex items-center justify-center">
                    <div className="relative w-full h-full">
                        <div className="container mx-auto py-36">
                            <div className="flex flex-col items-center text-center space-y-8">
                                <a href="/careers" onClick={handleLinkClick} className="text-3xl font-medium hover:text-blue-300">Careers</a>
                                <a href="/blogs" onClick={handleLinkClick} className="text-3xl font-medium hover:text-blue-300">Blogs</a>
                                <a href="/contact" onClick={handleLinkClick} className="text-3xl font-medium hover:text-blue-300">Contact us</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
