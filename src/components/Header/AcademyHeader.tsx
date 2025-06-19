// export default AcademyHeader;
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, AlignJustify } from "lucide-react";

const AcademyHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleFullMenu = () => setIsMenuOpen(!isMenuOpen);

  const isStudentPage = location.pathname.includes("/school/student");
  const isTeacherPage = location.pathname.includes("/school/teacher");
  const isAcademiaMain = location.pathname === "/school";

  let buttonLink = "";
  let buttonText = "";

  if (isStudentPage) {
    buttonLink = "/school/teacher";
    buttonText = "School";
  } else if (isTeacherPage) {
    buttonLink = "/school/student";
    buttonText = "Student";
  } else {
    buttonLink = "/school/student";
    buttonText = "Student";
  }

  const showButtons = isStudentPage || isTeacherPage;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto h-[80px] px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          <img src="/RareMinds.webp" alt="Rareminds Logo" width={180} />
        </Link>

        {/* Desktop Navigation Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {showButtons && (
            <>
              {/* <Link
                to="/academia"
                className="px-5 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
              >
                Academia
              </Link> */}
              <Link
                to="/school/teacher"
                className={`px-5 py-2 rounded-md transition-colors ${
                  isTeacherPage
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-blue-100"
                }`}
              >
                Teacher
              </Link>
              <Link
                to="/school/student"
                className={`px-5 py-2 rounded-md transition-colors ${
                  isStudentPage
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-blue-100"
                }`}
              >
                Student
              </Link>
            </>
          )}
          {/* Menu Button */}
          <button
            onClick={toggleFullMenu}
            className="px-5 py-2 rounded-md text-gray-800 transition-colors"
          >
            <AlignJustify />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={toggleMenu} className="md:hidden text-gray-700">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-2">
          {showButtons && (
            <>
              {/* <Link
                to="/academia"
                className="block w-full text-center bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition"
                onClick={() => setIsOpen(false)}
              >
                Academia
              </Link> */}
              <Link
                to="/school/teacher"
                className={`block w-full text-center px-6 py-2 rounded-md transition ${
                  isTeacherPage
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-blue-100"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Teacher
              </Link>
              <Link
                to="/school/student"
                className={`block w-full text-center px-6 py-2 rounded-md transition ${
                  isStudentPage
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-blue-100"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Student
              </Link>
            </>
          )}
          {/* New Menu Button for Mobile */}
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
            to="/school/projects"
            className="text-xl text-gray-800 md:text-4xl py-2 hover:text-red-600 mb-4"
            onClick={() => setIsMenuOpen(false)}
          >
            Projects
          </Link>      
              <Link
            to={isStudentPage ? "/school/student/blogs" : isTeacherPage ? "/school/teacher/blogs" : "/school/blogs"}
            className="text-xl text-gray-800 md:text-4xl py-2 hover:text-red-600 mb-4"
            onClick={() => setIsMenuOpen(false)}
          >
            Blogs
          </Link>          
           {/* <Link
            to="/school/new-projects"
            className="text-xl text-gray-800 md:text-4xl py-2 hover:text-red-600 mb-4"
            onClick={() => setIsMenuOpen(false)}
          >
            New_Projects 
          </Link> */}
        </div>
      )}
    </header>
  );
};

export default AcademyHeader;

