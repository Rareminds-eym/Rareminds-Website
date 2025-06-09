import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const InstitutionDashboardSection = () => {
  return (
    <section className="w-full bg-white py-20 px-4 md:px-20 text-center">
      <motion.h2
        className="text-2xl md:text-4xl font-bold text-[#45474B] mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Your dashboard. Your reports. Your outcomes. Delivered Periodically.
      </motion.h2>
      <p className="text-sm md:text-base text-gray-500 mb-12">
        Complete transparency with real-time tracking and comprehensive reporting
      </p>

      <div className="grid grid-cols-1  md:grid-cols-2 gap-8">
        {/* Simulation Games */}
        <motion.div
          className="bg-white  rounded-2xl shadow-xl   p-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-[#495E57] mb-4">🎮 Simulation Games</h3>
        

        <div className="flex flex-col sm:flex-row items-center  justify-center gap-6 mt-10">
  {/* Left Tilted Card */}

    <div className="relative group w-[280px] h-[220px]">
  {/* Hover Text Appears Above */}
  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white font-bold text-black text-xs px-3 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:-translate-y-2  z-20">
    Track progress in real-time
  </span>

  {/* Rotated Card with Image */}
  <div
    onClick={() => (window.location.href = "   ")}
    className="relative rounded-xl p-6 cursor-pointer transform rotate-[-6deg] hover:rotate-[-3deg] transition-all duration-300 w-full h-full shadow-lg overflow-hidden z-10"
    style={{
      backgroundImage: 'url("/academy/ev.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
    }}
  ></div>
</div>




  {/* Center Card */}

    <div className="relative group w-[280px] h-[220px]">
  {/* Hover Text Above the Card */}
  <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-black  font-bold text-xs px-3 py-1  opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:-translate-y-2  z-20">
    Gamified chemical education
  </span>

  {/* Card */}
  <div
    onClick={() => (window.location.href = "")}
    className="relative text-black rounded-xl p-6 cursor-pointer hover:scale-105 transition-all duration-300 w-full h-full shadow-xl overflow-hidden z-10"
    style={{
      backgroundImage: 'url("/academy/sgc.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
    }}
  ></div>
</div>

 

  {/* Right Tilted Card */}

<div className="relative group w-[280px] h-[220px]">
  {/* Hover Text Above Card */}
  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-black  px-3 py-1  opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:-translate-y-2 z-10 ">
    Gamified lab safety protocols
  </span>

  {/* Card */}
  <div
    onClick={() => (window.location.href = "")}
    className="relative text-white rounded-xl p-6 cursor-pointer transform rotate-[6deg] hover:rotate-[3deg] transition-all duration-300 w-full h-full shadow-lg overflow-hidden"
    style={{
      backgroundImage: 'url("/academy/cs.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
    }}
  ></div>
</div>

 


<div className="relative group w-[280px] h-[220px]">
  {/* Hover Text Above the Card */}
  <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-black font-bold text-xs px-3 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:-translate-y-2 z-10">
    Gamified lab safety protocols
  </span>

  {/* Clickable Image Card */}
  <div
    onClick={() => (window.location.href = "")}
    className="relative text-white rounded-xl p-6 cursor-pointer transform rotate-[6deg] hover:rotate-[3deg] transition-all duration-300 w-full h-full shadow-lg overflow-hidden"
    style={{
      backgroundImage: 'url("/academy/fp.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
    }}
  ></div>
</div>


  

</div>



        </motion.div>
{/* Real Time Dashboards & Analytics */}
<motion.div
  className="bg-white rounded-2xl shadow-xl p-6 text-center"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}
>
  <h3 className="text-lg font-semibold text-[#495E57] mb-6">
    📊 Real Time Dashboards & Analytics
  </h3>

  {/* Wrapper to center image container */}
  <div className="w-full ">
      <img
              src="/academy/Rareprep.png"
              alt="Students interacting with a digital dashboard system on large screens, representing data access and database integration through the Rareminds Hub"
              className="rounded-xl w-full  object-cover"
            />
  </div>
</motion.div>



        <motion.div
          className="bg-white rounded-2xl shadow-xl p-6 md:col-span-2"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-[#495E57] mb-4">Learning Management System</h3>
          <div className="flex flex-col md:flex-row items-center gap-6">
          
            <div className="flex justify-center">
    <div className="flex flex-col md:flex-row gap-4 items-center max-w-4xl w-full">
      <img
        src="/academy/Dashboardleft.png"
        alt="Two laptop screens displaying dashboards from Rareminds’ Learning Management System, showing student analytics and course management tools"
        className="rounded-xl w-full md:w-1/2 object-cover  transition-transform duration-500 ease-in-out hover:scale-110 cursor-pointer"
      />
      <img
        src="/academy/Dashboardright.png"
        alt="Two laptop screens displaying dashboards from Rareminds’ Learning Management System, showing student analytics and course management tools"
        className="rounded-xl w-full md:w-1/2 object-cover  transition-transform duration-500 ease-in-out hover:scale-110 cursor-pointer"
      />
    </div>
  </div>
            <div className="text-left">
              <h4 className="text-md font-bold mb-2">Vidyasethu by Rareminds</h4>
              <p className="text-sm text-gray-600">
                A Learning Management System with streamlined course access and tracking for student progress.
              </p>
              <a
  href="https://learning.rareminds.in/"
  target="_blank"
  rel="noopener noreferrer"
>
  <button className="mt-4 inline-flex items-center gap-2 text-red-500 font-medium">
    Explore More <ArrowRight className="w-4 h-4" />
  </button>
</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InstitutionDashboardSection;
