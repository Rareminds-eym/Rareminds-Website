import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const InstitutionDashboardSection = () => {
  return (
    <section className="w-full bg-[#F5F7F8] py-20 px-4 md:px-20 text-center">
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-xl font-bold mb-4 bg-black bg-clip-text text-transparent">
            Iterative Learning Meets Intelligent Tracking.
          </h1>
          <p className="text-sm text-gray-600 mx-auto">
             Boost Engagement with Simulation Games while Leveraging real-time dashboards LMS tools to monitor and enhance outcomes across the board.
          </p>
        </motion.div>

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
          className="bg-white rounded-2xl shadow-xl p-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold text-[#495E57] mb-4">📊 Real Time Dashboards & Analytics</h3>
          <img
            src="https://via.placeholder.com/400x200"
            alt="Dashboard Preview"
            className="rounded-xl w-full object-cover"
          />
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
