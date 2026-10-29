import React, { useState, Dispatch, SetStateAction } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Briefcase } from 'lucide-react';
import BrandLogo from '../BrandLogo/BrandLogo';
import AcademyHeader from './AcademyHeader';
import CorporateHeader from './CorporateHeader';
import SocialIcons from './SocialIcons';
import UniversitiesHeader from './UniversitiesHeader';

interface HeaderProps {
    navbarOpen: boolean;
    setNavbarOpen: Dispatch<SetStateAction<boolean>>;
}

const ZOHO_RECRUIT_CAREERS_URL = 'https://rareminds.zohorecruit.in/jobs/Careers';

const Index: React.FC<HeaderProps> = ({ navbarOpen, setNavbarOpen }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    // Check if current path matches /events/:slug
    const isEventDetailPage = /^\/events\/.+/.test(location.pathname);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setNavbarOpen(!navbarOpen);
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    const handleCareersClick = () => {
        setIsMenuOpen(false);
        window.location.href = ZOHO_RECRUIT_CAREERS_URL;
    };

    const isEventsPage = location.pathname === '/events' || isEventDetailPage;

    // Teacher Gallery is navigated to from the Teacher page's own menu, so
    // this one route keeps the Academia nav bar (Teacher / Student) instead
    // of the default social-icons header.
    if (location.pathname === '/school/teacher/gallery') {
        return <AcademyHeader />;
    }

    // The corporate galleries keep their corporate nav bar
    // (Recruitment / Training buttons + hamburger, like the corporate pages)
    // only on their own path routes (/corporate/recruitment/gallery and
    // /corporate/training/gallery). The universities gallery keeps its own
    // universities nav bar (Trainers: Apply Now + hamburger) on its path.
    // All other gallery paths (/gallery and /gallery/:sector) use the
    // default social-icons header below.
    if (
        location.pathname === '/corporate/recruitment/gallery' ||
        location.pathname === '/corporate/training/gallery'
    ) {
        return <CorporateHeader />;
    }

    // Universities gallery keeps the Universities nav bar on its path.
    if (location.pathname === '/universities/gallery') {
        return <UniversitiesHeader />;
    }

    return (
        <nav className={`w-full px-4 md:px-8 ${isEventsPage ? 'sticky top-0 z-50 bg-white py-2' : 'relative py-4'}`}>
            <div className="container mx-auto relative z-50">
                {/* Logo and social icons */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <BrandLogo brandName="" />
                        {/* Buttons beside logo — desktop only, events pages only */}
                        {isEventsPage && (
                            <div className="hidden lg:flex items-center gap-2">
                                <button type="button"
                                    onClick={toggleMenu}
                                    className="bg-black text-white px-6 py-2 space-x-1 rounded-full flex items-center justify-center w-auto relative z-50"
                                    aria-label="Menu"
                                    aria-expanded={isMenuOpen}
                                >
                                    <Menu className="rotate-90 w-4 h-4 sm:w-6 sm:h-6" />
                                    <span className="font-medium text-sm sm:text-base">MENU</span>
                                </button>
                                <a
                                    href="https://skillpassport.rareminds.in/"
                                    className="bg-black text-white px-6 py-2 rounded-full flex items-center justify-center w-auto whitespace-nowrap relative z-40 font-medium text-sm sm:text-base group hover:bg-gray-50 hover:text-black transition"
                                    style={{ minWidth: 0 }}
                                >
                                    <Briefcase className="mr-1.5 sm:mr-2 w-4 h-4 sm:w-6 sm:h-6 flex-shrink-0 text-white group-hover:text-black" />
                                    Skill Passport
                                </a>
                            </div>
                        )}
                    </div>
                    <SocialIcons className={`hidden sm:flex gap-x-2 transition-all duration-300 ${isMenuOpen ? 'text-gray-200' : 'text-[#3C3C3B]'}`} />
                </div>

                {/* Menu Button and Skill Passport — hidden on desktop for events pages (shown beside logo instead) */}
                <div className={`relative h-12 mt-1 ${isEventsPage ? 'lg:hidden' : ''}`}>
                    <div className="flex items-center gap-2">
                      <button type="button"
                          onClick={toggleMenu}
                          className="bg-black text-white px-6 py-2 space-x-1 rounded-full flex items-center justify-center w-auto relative z-50"
                          aria-label="Menu"
                          aria-expanded={isMenuOpen}
                      >
                          <Menu className='rotate-90 w-4 h-4 sm:w-6 sm:h-6'/>
                          <span className="font-medium text-sm sm:text-base">MENU</span>
                      </button>
                      <a
                          href="https://skillpassport.rareminds.in/"
                          className="bg-black text-white px-6 py-2 rounded-full flex items-center justify-center w-auto whitespace-nowrap relative z-40 font-medium text-sm sm:text-base animate-glow group hover:bg-gray-50 hover:text-black transition"
                          style={{ minWidth: 0 }}
                      >
                          <Briefcase className="mr-1.5 sm:mr-2 w-4 h-4 sm:w-6 sm:h-6 flex-shrink-0 text-white hover:text-black" />
                          Skill Passport
                      </a>
                    </div>
                </div>
            </div>

            {/* Fullscreen Menu Overlay - hidden on event details page */}
            {isMenuOpen && !isEventDetailPage && (
                <div className="fixed inset-0 bg-black/90  text-white z-40 flex items-center justify-center">
                    <div className="relative w-full h-full">
                        <div className="container mx-auto py-36">
                            <div className="flex flex-col items-center text-center space-y-8">
                                <Link to="/about" onClick={handleLinkClick} className="text-2xl font-medium hover:text-blue-300">About</Link>
                                <Link
                                    to="/hackathons"
                                    onClick={handleLinkClick}
                                    className="text-2xl font-medium text-white-300 animate-glow relative group p-2 hover:text-blue-300"
                                >
                                    Hackathons
                                    <span className="absolute left-1/2 -bottom-12 -translate-x-1/2 whitespace-nowrap bg-yellow-300 text-black text-sm font-semibold px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                        Explore exciting hackathons!
                                    </span>
                                </Link>
                                <Link to="/events" onClick={handleLinkClick} className="text-2xl font-medium hover:text-blue-300">Events</Link>
                                <a href={ZOHO_RECRUIT_CAREERS_URL} onClick={(e) => { e.preventDefault(); handleCareersClick(); }} className="text-2xl font-medium hover:text-blue-300">Careers</a>
                                <Link to="/blogs" onClick={handleLinkClick} className="text-2xl font-medium hover:text-blue-300">Blogs</Link>
                                <Link to="/gallery" onClick={handleLinkClick} className="text-2xl font-medium hover:text-blue-300">Gallery</Link>
                                <Link to="/contact" onClick={handleLinkClick} className="text-2xl font-medium hover:text-blue-300">Contact us</Link>
                                <Link to="/success-stories" onClick={handleLinkClick} className="text-2xl font-medium hover:text-blue-300">Success stories</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Index;
