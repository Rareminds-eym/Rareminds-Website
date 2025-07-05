import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ComingSoonModal } from "@/components/universities/Modals/ComingSoonModal"; 

const InstitutionDashboardSection = () => {
   const [modalOpen, setModalOpen] = useState(false);
  return (
    <section className="w-full bg-[#F5F7F8] py-16 px-4 md:px-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-xl font-bold mb-4 bg-black bg-clip-text text-transparent">
          Interactive Learning Meets Intelligent Tracking.
        </h1>
        <p className="text-sm text-gray-600 mx-auto max-w-xl">
          Boost Engagement with Simulation Games while Leveraging real-time dashboards LMS tools to monitor and enhance outcomes across the board.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-10">
        {/* Simulation Games (Single Box with Dummy Image & Animation) */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
  <h3 className="text-lg font-semibold text-[#495E57] mb-4">🎮 Simulation Games</h3>

  <motion.div
    className="rounded-xl border-4 border-[#589ed7] px-1 py-2 bg-zinc-800 grid grid-cols-2 gap-2 md:grid-cols-4"
    animate={{ boxShadow: ["0 0 0px #F4CE14", "0 0 20px #F4CE14", "0 0 0px #F4CE14"] }}
    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
  >
    {/* Each Image Card */}
    {[
      {
       
        link: "sgcev.rareminds.in",
        image: "/institutions/vectors/SimulationGames/sgcev.png",
      },
      {
        
        link: "/games/evbattery",
        image: "/institutions/vectors/SimulationGames/evbms.png",
      },
      {
        
        link: "/games/foodprocessing",
        image: "/institutions/vectors/SimulationGames/fapp.png",
      },
      {
        
        link: "/games/chemical",
        image: "/institutions/vectors/SimulationGames/csevbm.png",
      },
    ].map(({ image }, index) => (
      <button
        type="button"
        key={index}
        onClick={() => setModalOpen(true)}
        className="group hover:scale-125 transition-transform duration-300 focus:outline-none"
      >
        <img src={image} className="w-full h-64 object-contain" />
      </button>
    ))}
    <ComingSoonModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
  </motion.div>
</motion.div>


        {/* Real Time Dashboards & Analytics */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold text-[#495E57] mb-4">📊 Real Time Dashboards & Analytics</h3>
          <motion.div
            className="rounded-xl overflow-hidden border-4 border-[#589ed7] p-12 bg-zinc-800"
            animate={{ boxShadow: ["0 0 0px #F4CE14", "0 0 20px #F4CE14", "0 0 0px #F4CE14"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <img
              src="institutions/vectors/Dashboard.png"
              alt="Analytics Dashboard Demo"
              className="rounded-lg w-full object-cover"
            />
          </motion.div>
        </motion.div>

        
        {/* LMS */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 sm:col-span-2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-[#495E57] mb-4">📚 Learning Management System</h3>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* Image Section */}
              <motion.div
                className="flex-1 rounded-xl overflow-hidden border-4 border-[#589ed7] p-1 max-w-full bg-zinc-800"
                animate={{ boxShadow: ["0 0 0px #F4CE14", "0 0 20px #F4CE14", "0 0 0px #F4CE14"] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <img
                  src="institutions/vectors/LMS.jpg"
                  alt="Rareprep LMS"
                  className="rounded-lg w-full h-full object-cover p-10"
                />
              </motion.div>

              {/* Text Section */}
              <div className="flex-1 text-left pl-10">
                <h4 className="text-md font-bold mb-2">VidyaSethu by Rareminds</h4>
                <p className="text-sm text-gray-600">
                  A Learning Management System with streamlined course access and tracking for student progress.
                </p>
                <a
                  href="https://learning.rareminds.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-[#50b1f6] font-medium"
                >
                  Explore More <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

      </div>
    </section>
  );
};

export default InstitutionDashboardSection;
