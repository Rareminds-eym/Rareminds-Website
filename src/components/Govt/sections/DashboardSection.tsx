import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { simulationGames } from '../../../data/simulationGamesData';

const DashboardSection = () => {
  return (
    <section className="w-full bg-gray-50 py-10 md:py-20 px-4 md:px-20 text-center">
      <motion.h2
        className="text-2xl md:text-4xl font-bold text-black mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Your dashboard. Your reports. Your outcomes. Delivered weekly.
      </motion.h2>
      <p className="text-base md:text-base text-gray-800 mb-6 md:mb-12">
        Complete transparency with real-time tracking and comprehensive reporting
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Simulation Games */}
        <motion.div
          className="bg-white rounded-3xl shadow-xl shadow-black/5 p-3 md:p-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-base md:text-lg font-semibold text-[#495E57] mb-4">🎮 Simulation Games</h3>
          <div className="grid grid-cols-2 gap-2 md:gap-4">
            {simulationGames.map((game, index) => (
              <div key={index} className="bg-gray-100 rounded-3xl p-3 md:p-6 flex flex-col items-center h-auto">
                <h4 className="text-xs md:text-base font-semibold mb-2">{game.title}</h4>
                <img src={game.imageSrc} alt={game.imageAlt} className="rounded-xl mb-2 w-20 h-20 md:w-48 md:h-40 object-contain" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Real Time Dashboards & Analytics */}
        <motion.div
          className="bg-white rounded-3xl shadow-xl shadow-black/5 p-3 md:p-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-base md:text-lg font-semibold text-[#495E57] mb-4">📊 Real Time Dashboards & Analytics</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-100 rounded-3xl p-4 flex flex-col items-center h-72">
              <img src="/Govt-Images/dashboard1.png" alt="Performance Dashboard" className="rounded-xl  w-full h-60 object-contain" />
            </div>
            <div className="bg-gray-100 rounded-3xl p-6 flex flex-col items-center h-72">
              <img src="/Govt-Images/dashboard2.png" alt="Analytics Dashboard" className="rounded-xl mb-2 w-full h-60 object-contain" />
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

export default DashboardSection;