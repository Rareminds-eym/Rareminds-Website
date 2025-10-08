import { FaUserGraduate, FaBriefcase, FaCalendarAlt } from "react-icons/fa";

export default function HeroSection({ phoneImage }: { phoneImage: string }) {
  return (
    <div className="bg-gradient-to-br from-[#0A1F3D] via-[#0D2847] to-[#0A1F3D] text-white py-10 md:py-16 rounded-3xl m-4 md:m-6 shadow-lg ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Left Section with fade-in / slide-up */}
          <div className="animate-slide-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-snug tracking-wider">
              ✨Empowering Institutions to Build Future-Ready Students
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 tracking-wider">
             The Rareminds Skill Passport is a verified digital learning identity that captures every student’s growth — from classroom learning to employability readiness.
            </p>

            <div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => (window.location.href = "/passport/demo")}
                  className="flex-1 bg-[#1E3A5F] hover:bg-[#2A4A6F] px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaCalendarAlt /> Schedule a Demo
                </button>
                <button
                  onClick={() => (window.location.href = 'https://wa.me/1234567890')}
                  className="flex-1 bg-[#1E3A5F] hover:bg-[#2A4A6F] px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                <FaBriefcase /> Connect with Us
                </button>
              </div>
            </div>
          </div>

          {/* Image Section with float effect */}
          <div className="flex justify-center">
            <img
              src={phoneImage}
              alt="Skill Passport App"
              className="w-64 sm:w-72 md:w-[26rem] lg:w-[35rem] drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
