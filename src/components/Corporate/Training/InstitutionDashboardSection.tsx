import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const InstitutionDashboardSection = () => {
  return (
    <section className="w-full bg-[#F5F7F8] py-12 sm:py-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 bg-black bg-clip-text text-transparent">
            Interactive Learning Meets Intelligent Tracking.
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mx-auto max-w-2xl">
            Boost Engagement with Simulation Games while Leveraging real-time
            dashboards LMS tools to monitor and enhance outcomes across the board.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Simulation Games */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 flex flex-col h-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-[#495E57] mb-4 text-left">
              🎮 Simulation Games
            </h3>
            <motion.div
              className="rounded-xl mb-2"
            >
              <img
                src="https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/Index/Dashboard/games.webp"
                alt="Simulation Game Demo"
                className="rounded-lg w-full"
              />
            </motion.div>
          </motion.div>

          {/* Real Time Dashboards & Analytics */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 flex flex-col h-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-[#495E57] mb-4 text-left">
              📊 Real Time Dashboards & Analytics
            </h3>
            <motion.div
              className="rounded-xl mb-2"
            >
              <img
                src="https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/Index/Dashboard/dashboard-preview-3.webp"
                alt="Analytics Dashboard Demo"
                className="rounded-lg w-full"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* LMS Section - full width below */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-5 sm:p-8 mt-8 lg:mt-12 flex flex-col md:flex-row items-center gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Image Section */}
          <motion.div
            className="flex-1 rounded-xl h-max max-w-full"
          >
            <img
              src="https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/Index/Dashboard/dashboard-preview-2.webp"
              alt="Rareprep LMS"
              className="rounded-lg w-full h-full"
            />
          </motion.div>

          {/* Text Section */}
          <div className="flex-1 text-left pl-0 md:pl-10">
            <h4 className="text-md sm:text-lg font-bold mb-2">
              Rareminds Learning Management System
            </h4>
            <p className="text-sm sm:text-base text-gray-600">
              Streamlined course access and tracking for student progress.
            </p>
            {/* <button className="mt-4 inline-flex items-center gap-2 text-[#50b1f6] font-medium">
              Explore More <ArrowRight className="w-4 h-4" />
            </button> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InstitutionDashboardSection;
