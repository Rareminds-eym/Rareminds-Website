import React, { useState, Dispatch, SetStateAction } from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
    navbarOpen: boolean;
    setNavbarOpen: Dispatch<SetStateAction<boolean>>;
}

const Index: React.FC<HeaderProps> = ({ navbarOpen, setNavbarOpen }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setNavbarOpen(!navbarOpen);
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="w-full py-4 px-4 md:px-8 relative">
            <div className="container mx-auto relative z-50">
                {/* Logo and social icons */}
                <div className="flex justify-between items-center">
                    <img src="/RareMinds.webp" className="w-64" />
                    <div className={`hidden sm:flex gap-x-2 transition-all duration-300 ${isMenuOpen ? 'text-gray-200' : 'text-[#3C3C3B]'}`}>
                        <span className="w-[40px] h-[40px]"><a href="https://www.facebook.com/raremindsgroup" target="_blank" rel="noopener noreferrer"><svg width="100%" height="100%" viewBox="0 0 275 275" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M137.576 274.013C130.232 274.013 122.857 273.427 115.672 272.262C83.9571 267.155 54.891 250.853 33.8391 226.361C12.559 201.603 0.838135 169.964 0.838135 137.275C0.838135 61.8734 62.1823 0.536865 137.576 0.536865C212.97 0.536865 274.322 61.881 274.322 137.275C274.322 170.474 262.281 202.485 240.407 227.411C218.747 252.109 188.988 268.191 156.611 272.704C150.347 273.579 143.939 274.021 137.576 274.021V274.013ZM137.576 9.66237C67.2131 9.66237 9.97125 66.9042 9.97125 137.267C9.97125 200.263 55.0356 253.25 117.126 263.243C129.646 265.26 142.752 265.405 155.348 263.647C217.963 254.925 265.181 200.59 265.181 137.267C265.181 66.9042 207.939 9.66237 137.569 9.66237H137.576Z" fill="currentColor"></path><path d="M155.979 111.223V140.015H191.599L185.959 178.808H155.979V268.175C149.967 269.013 143.817 269.446 137.576 269.446C130.369 269.446 123.298 268.868 116.403 267.757V178.808H83.5538V140.015H116.403V104.791C116.403 82.9328 134.121 65.207 155.987 65.207V65.2298C156.048 65.2298 156.109 65.207 156.17 65.207H191.606V98.7484H168.454C161.566 98.7484 155.987 104.327 155.987 111.215L155.979 111.223Z" fill="currentColor"></path></svg></a></span><span className="w-[40px] h-[40px]"><a href="https://www.linkedin.com/company/rareminds/" target="_blank" rel="noopener noreferrer"><svg width="100%" height="100%" viewBox="0 0 275 275" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M137.589 274.314C130.236 274.314 122.869 273.728 115.684 272.571C83.9696 267.464 54.9034 251.161 33.8516 226.669C12.5714 201.911 0.850586 170.273 0.850586 137.576C0.850586 62.1744 62.1946 0.837891 137.589 0.837891C212.982 0.837891 274.334 62.182 274.334 137.576C274.334 170.775 262.294 202.786 240.42 227.712C218.759 252.41 189 268.492 156.623 273.005C150.36 273.88 143.951 274.322 137.589 274.322V274.314ZM137.589 9.96339C67.2255 9.96339 9.98371 67.2053 9.98371 137.568C9.98371 200.572 55.048 253.551 117.138 263.545C129.65 265.561 142.764 265.706 155.36 263.948C217.975 254.925 265.193 200.59 265.193 137.568C265.193 67.2053 207.952 9.96339 137.581 9.96339H137.589Z" fill="currentColor"></path><path d="M69.7295 92.9378C66.2057 89.6651 64.4475 85.6161 64.4475 80.7983C64.4475 75.9806 66.2057 71.749 69.7295 68.4763C73.2534 65.2036 77.7894 63.5673 83.353 63.5673C88.9166 63.5673 93.2701 65.2036 96.7864 68.4763C100.31 71.749 102.068 75.8588 102.068 80.7983C102.068 85.7378 100.31 89.6651 96.7864 92.9378C93.2625 96.2105 88.7872 97.8468 83.353 97.8468C77.9188 97.8468 73.2534 96.2105 69.7295 92.9378ZM99.1001 111.706V211.996H67.4158V111.706H99.1001Z" fill="currentColor"></path><path d="M204.595 121.608C211.498 129.105 214.954 139.403 214.954 152.509V210.23H184.852V156.58C184.852 149.974 183.14 144.837 179.715 141.176C176.29 137.515 171.686 135.688 165.901 135.688C160.117 135.688 155.512 137.523 152.087 141.176C148.662 144.837 146.95 149.974 146.95 156.58V210.23H116.674V111.432H146.95V124.538C150.017 120.17 154.15 116.722 159.348 114.18C164.539 111.646 170.384 110.375 176.876 110.375C188.445 110.375 197.684 114.127 204.588 121.616L204.595 121.608Z" fill="currentColor"></path></svg></a></span><span className="w-[40px] h-[40px]"><a href="https://www.youtube.com/channel/UClkBtwJsScYxFzNoFdlifeA" target="_blank" rel="noopener noreferrer"><svg width="100%" height="100%" viewBox="0 0 274 275" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M137.249 274.314C129.897 274.314 122.53 273.728 115.345 272.571C83.6305 267.464 54.5643 251.161 33.5125 226.669C12.2323 201.911 0.511475 170.273 0.511475 137.576C0.511475 62.1744 61.8556 0.837891 137.249 0.837891C212.643 0.837891 273.995 62.182 273.995 137.576C273.995 170.775 261.955 202.786 240.081 227.712C218.42 252.41 188.661 268.492 156.284 273.005C150.021 273.88 143.612 274.322 137.249 274.322V274.314ZM137.249 9.96339C66.8864 9.96339 9.64459 67.2053 9.64459 137.568C9.64459 200.572 54.7089 253.551 116.799 263.545C129.311 265.561 142.425 265.706 155.021 263.948C217.636 255.226 264.854 200.891 264.854 137.568C264.854 67.2053 207.613 9.96339 137.242 9.96339H137.249Z" fill="currentColor"></path><path d="M221.244 109.941C220.201 99.8029 217.941 88.6072 209.629 82.7163C203.183 78.1498 194.72 77.9824 186.819 77.99C170.113 78.0052 153.408 78.0204 136.702 78.0356C120.635 78.0508 104.568 78.0661 88.5015 78.0813C81.7886 78.0813 75.2661 77.5638 69.0327 80.4635C63.6746 82.9599 59.4886 87.7015 56.977 92.9758C53.476 100.32 52.7377 108.632 52.3191 116.752C51.5428 131.533 51.6265 146.359 52.5627 161.124C53.24 171.909 54.9677 183.82 63.3017 190.693C70.6919 196.781 81.1189 197.078 90.6934 197.086C121.107 197.109 151.52 197.131 181.933 197.162C185.83 197.162 189.902 197.093 193.875 196.66C201.699 195.815 209.15 193.577 214.173 187.785C219.242 181.948 220.544 173.812 221.32 166.117C223.192 147.455 223.169 128.595 221.244 109.941ZM119.113 163.75V111.402L164.451 137.576L119.113 163.75Z" fill="currentColor"></path></svg></a></span><span className="w-[40px] h-[40px]"><a href="https://x.com/minds_rare" target="_blank" rel="noopener noreferrer"><svg width="100%" height="100%" viewBox="0 0 164 164" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M82.5018 163.712H82.143C37.277 163.712 0.774719 127.199 0.774719 82.3199V81.961C0.774719 37.0818 37.277 0.568741 82.143 0.568741H82.5018C127.368 0.568741 163.87 37.0818 163.87 81.961V82.3199C163.87 127.199 127.368 163.712 82.5018 163.712ZM82.143 6.09098C40.3189 6.09098 6.29533 40.1245 6.29533 81.961V82.3199C6.29533 124.156 40.3189 158.19 82.143 158.19H82.5018C124.326 158.19 158.349 124.156 158.349 82.3199V81.961C158.349 40.1245 124.326 6.09098 82.5018 6.09098H82.143Z" fill="currentColor"></path><path d="M35.4939 39.0146L71.8305 87.6103L35.2675 127.122H43.4987L75.5128 92.5307L101.377 127.122H129.383L91.0036 75.7927L125.038 39.0146H116.807L87.3268 70.8724L63.5054 39.0146H35.4993H35.4939ZM47.595 45.0781H60.458L117.271 121.058H104.408L47.595 45.0781Z" fill="currentColor"></path></svg></a></span><span className="w-[40px] h-[40px]"><a href="https://www.instagram.com/rareminds_eym/" target="_blank" rel="noopener noreferrer"><svg width="100%" height="100%" viewBox="0 0 274 275" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M137.249 274.013C129.905 274.013 122.53 273.427 115.345 272.262C83.6305 267.155 54.5643 250.853 33.5125 226.361C12.2323 201.603 0.511475 169.964 0.511475 137.267C0.511475 61.8657 61.8556 0.529236 137.249 0.529236C212.643 0.529236 273.995 61.8734 273.995 137.267C273.995 170.466 261.955 202.478 240.081 227.404C218.42 252.101 188.661 268.183 156.284 272.696C150.021 273.572 143.612 274.013 137.249 274.013ZM137.249 9.66236C66.8864 9.66236 9.64459 66.9042 9.64459 137.267C9.64459 200.263 54.7089 253.25 116.799 263.243C129.319 265.26 142.425 265.405 155.021 263.647C217.636 254.925 264.854 200.59 264.854 137.267C264.854 66.9042 207.613 9.66236 137.242 9.66236H137.249Z" fill="currentColor"></path><path d="M178.645 57.9309H95.8613C72.9904 57.9309 54.3893 76.532 54.3893 99.4029V175.139C54.3893 198.01 72.9904 216.611 95.8613 216.611H178.645C201.516 216.611 220.117 198.01 220.117 175.139V99.4029C220.117 76.532 201.516 57.9309 178.645 57.9309ZM69.0175 99.4029C69.0175 84.5996 81.058 72.5591 95.8613 72.5591H178.645C193.449 72.5591 205.489 84.5996 205.489 99.4029V175.139C205.489 189.943 193.449 201.983 178.645 201.983H95.8613C81.058 201.983 69.0175 189.943 69.0175 175.139V99.4029Z" fill="currentColor"></path><path d="M137.25 175.847C158.522 175.847 175.829 158.54 175.829 137.267C175.829 115.995 158.522 98.6874 137.25 98.6874C115.977 98.6874 98.6697 115.995 98.6697 137.267C98.6697 158.54 115.977 175.847 137.25 175.847ZM137.25 113.323C150.454 113.323 161.194 124.062 161.194 137.267C161.194 150.472 150.454 161.211 137.25 161.211C124.045 161.211 113.306 150.472 113.306 137.267C113.306 124.062 124.045 113.323 137.25 113.323Z" fill="currentColor"></path><path d="M179.406 104.921C185.137 104.921 189.803 100.255 189.803 94.5243C189.803 88.7932 185.137 84.1277 179.406 84.1277C173.675 84.1277 169.01 88.7932 169.01 94.5243C169.01 100.255 173.675 104.921 179.406 104.921Z" fill="currentColor"></path></svg></a></span>
                    </div>
                </div>

                {/* Menu Button */}
                <div className="mt-0">
                    <button
                        onClick={toggleMenu}
                        className="bg-black text-white px-6 py-2 space-x-1 rounded-full flex items-center justify-center w-auto relative z-50"
                        aria-label="Menu"
                        aria-expanded={isMenuOpen}
                    >
                        <Menu className='rotate-90'/>
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
                                <a 
                                    href="https://rareminds.zohorecruit.in/jobs/Trainers" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    onClick={handleLinkClick} 
                                    className="text-2xl font-medium text-white-300 animate-glow relative group p-2"
                                >
                                    Trainers
                                    <span className="absolute left-1/2 -bottom-12 -translate-x-1/2 whitespace-nowrap bg-yellow-300 text-black text-sm font-semibold px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                        Applications filling fast.Apply Now!
                                    </span>
                                </a>
                                <a href="/careers" onClick={handleLinkClick} className="text-2xl font-medium hover:text-blue-300">Careers</a>
                                <a href="/blogs" onClick={handleLinkClick} className="text-2xl font-medium hover:text-blue-300">Blogs</a>
                                <a href="/contact" onClick={handleLinkClick} className="text-2xl font-medium hover:text-blue-300">Contact us</a>
                                
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Index;
