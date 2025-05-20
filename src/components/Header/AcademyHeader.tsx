// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Menu, X } from "lucide-react";

// const AcademyHeader: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   const toggleMenu = () => setIsOpen(!isOpen);

//   const isStudentPage = location.pathname.includes("/academia/student");
//   const isSchoolPage = location.pathname.includes("/academia/school");

//   let buttonLink = "";
//   let buttonText = "";

//   if (isStudentPage) {
//     buttonLink = "/academia/school";
//     buttonText = "School";
//   } else if (isSchoolPage) {
//     buttonLink = "/academia/student";
//     buttonText = "Student";
//   } else {
//     buttonLink = "/academia/student";
//     buttonText = "Student";
//   }

//   return (
//     <header className="fixed top-0 left-0 w-full z-50 bg-white border-b shadow-sm">
//       <div className="container mx-auto h-[80px] px-4 py-4 flex justify-between items-center">
//         {/* Logo */}
//         <Link to="/" className="text-xl font-bold text-blue-600">
//           <img src="/RareMinds.webp" alt="Rareminds Logo" width={180} />
//         </Link>

//         {/* Desktop Navigation Buttons */}
//         <div className="hidden md:flex items-center gap-4">
//           <Link
//             to="/academia"
//             className="px-5 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
//           >
//             Academia
//           </Link>
//           <Link
//             to={buttonLink}
//             className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
//           >
//             {buttonText}
//           </Link>
//         </div>

//         {/* Mobile Toggle */}
//         <button onClick={toggleMenu} className="md:hidden text-gray-700">
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Mobile Dropdown */}
//       {isOpen && (
//         <div className="md:hidden bg-white border-t px-4 py-4 space-y-2">
//           <Link
//             to="/academia"
//             className="block w-full text-center bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition"
//             onClick={() => setIsOpen(false)}
//           >
//             Academia
//           </Link>
//           <Link
//             to={buttonLink}
//             className="block w-full text-center bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
//             onClick={() => setIsOpen(false)}
//           >
//             {buttonText}
//           </Link>
//         </div>
//       )}
//     </header>
//   );
// };

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

  const isStudentPage = location.pathname.includes("/academia/student");
  const isSchoolPage = location.pathname.includes("/academia/school");
  const isAcademiaMain = location.pathname === "/academia";

  let buttonLink = "";
  let buttonText = "";

  if (isStudentPage) {
    buttonLink = "/academia/school";
    buttonText = "School";
  } else if (isSchoolPage) {
    buttonLink = "/academia/student";
    buttonText = "Student";
  } else {
    buttonLink = "/academia/student";
    buttonText = "Student";
  }

  const showButtons = isStudentPage || isSchoolPage;

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
              <Link
                to="/academia"
                className="px-5 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
              >
                Academia
              </Link>
              <Link
                to={buttonLink}
                className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                {buttonText}
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
              <Link
                to="/academia"
                className="block w-full text-center bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition"
                onClick={() => setIsOpen(false)}
              >
                Academia
              </Link>
              <Link
                to={buttonLink}
                className="block w-full text-center bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                onClick={() => setIsOpen(false)}
              >
                {buttonText}
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
            to="/academia/projects"
            className="text-xl text-gray-800 md:text-4xl py-2 hover:text-red-600 mb-4"
            onClick={() => setIsMenuOpen(false)}
          >
            Projects
          </Link>

                    <Link
            to="/academia/coming-soon"
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

export default AcademyHeader;

