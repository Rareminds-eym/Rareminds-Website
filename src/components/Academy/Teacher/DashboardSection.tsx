import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const InstitutionDashboardSection = () => {
  return (
    <section className="w-full bg-[#F5F7F8] py-20 px-4 md:px-20 text-center">
      <motion.h2
        className="text-2xl md:text-4xl font-bold text-[#45474B] mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Your dashboard. Your reports. Your outcomes. Delivered weekly.
      </motion.h2>
      <p className="text-sm md:text-base text-gray-500 mb-12">
        Complete transparency with real-time tracking and comprehensive reporting
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Simulation Games */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-[#495E57] mb-4">🎮 Simulation Games</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#0F172A] text-white rounded-xl p-4 flex flex-col items-start justify-between min-h-[160px]">
              <h4 className="text-md font-semibold mb-2">EV Battery Fault Diagnostic System</h4>
              <span className="text-xs text-gray-300">Track progress in real-time</span>
            </div>
            <div className="bg-[#34D399] text-black rounded-xl p-4 flex flex-col items-start justify-between min-h-[160px]">
              <h4 className="text-md font-semibold mb-2">Sustainable Green Chemistry XP</h4>
              <span className="text-xs text-gray-800">Gamified chemical education</span>
            </div>
            <div className="bg-[#0F172A] text-white rounded-xl p-4 flex flex-col items-start justify-between min-h-[160px] sm:col-span-2">
              <h4 className="text-md font-semibold mb-2">Chemical Safety EVBMS</h4>
              <span className="text-xs text-gray-300">Gamifies lab safety protocols</span>
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
  <div className="flex justify-center">
    <div className="flex flex-col md:flex-row gap-4 items-center max-w-4xl w-full">
      <img
        src="/academy/Dashboardleft.png"
        alt="Dashboard Preview 1"
        className="rounded-xl w-full md:w-1/2 object-cover"
      />
      <img
        src="/academy/Dashboardright.png"
        alt="Dashboard Preview 2"
        className="rounded-xl w-full md:w-1/2 object-cover"
      />
    </div>
  </div>
</motion.div>



        {/* LMS */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-6 md:col-span-2"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-[#495E57] mb-4">📚 Learning Management System</h3>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src="https://via.placeholder.com/400x240"
              alt="Rareprep LMS"
              className="rounded-xl w-full md:w-1/2 object-cover"
            />
            <div className="text-left">
              <h4 className="text-md font-bold mb-2">Rareprep</h4>
              <p className="text-sm text-gray-600">
                Streamlined course access, mock interviews, and tracking for student progress.
              </p>
              <button className="mt-4 inline-flex items-center gap-2 text-[#F4CE14] font-medium">
                Explore More <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InstitutionDashboardSection;
