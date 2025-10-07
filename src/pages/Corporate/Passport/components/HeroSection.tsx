import { FaUserGraduate, FaBriefcase, FaCalendarAlt } from "react-icons/fa";

export default function HeroSection({ phoneImage }: { phoneImage: string }) {
  return (
    <div className="bg-gradient-to-br from-[#0A1F3D] via-[#0D2847] to-[#0A1F3D] text-white py-10 md:py-16 rounded-3xl m-4 md:m-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Left Section with fade-in / slide-up */}
          <div className="animate-slide-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-snug">
              ✨India's First Skill Passport – Now Global at GITEX
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6">
              From Classrooms to careers → verified, portable, and future-ready
              skills at your fingertips
            </p>

            <div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => (window.location.href = "/passport/student")}
                  className="flex-1 bg-[#1E3A5F] hover:bg-[#2A4A6F] px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaUserGraduate /> I'm a Student
                </button>
                <button
                  onClick={() => (window.location.href = "/passport/recruiter")}
                  className="flex-1 bg-[#1E3A5F] hover:bg-[#2A4A6F] px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaBriefcase /> I'm a Recruiter
                </button>
              </div>
              <button
                onClick={() => (window.location.href = "/passport/demo")}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaCalendarAlt /> Book a Demo
              </button>
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
