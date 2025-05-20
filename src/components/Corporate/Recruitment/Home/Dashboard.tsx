import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const Dashboard: React.FC = () => {
  return (
    <div className="bg-[url('/Corporate/Images/Home/Dashboard/grid-bg.webp')] bg-cover py-16 px-6 text-center">
      <div className="text-center mb-12 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center items-center">
            <div className="bg-corporate-black text-white w-16 h-16 rounded-[25px] mx-auto mb-4 flex items-center justify-center transform rotate-6">
              <Icon
                icon="hugeicons:analytics-up"
                className="text-[32px]"
                width={32}
                height={32}
                color="white"
              />
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-corporate-black">
            Your dashboard. Your reports.Your outcomes.
            <br />
            Delivered periodically.
          </h2>
          <p className="text-corporate-grey max-w-3xl mx-auto">
            Complete transparency with real-time tracking and comprehensive
            reporting
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-1 gap-12 items-start">
        {/* Real Time Dashboards */}
        <div className="flex items-center text-left">
          <div className="flex items-start mb-4 w-1/2">
            <Icon icon="carbon:dashboard" className="text-xl mr-3 mt-1" />
            <div>
              <h3 className="font-semibold text-lg">
                Real Time Dashboards And Analytics
              </h3>
              <p className="text-gray-600 text-sm">
                Streamlined course access and tracking for progress.
              </p>
            </div>
          </div>
          <div className="w-1/2">
            <img
              src="/Corporate/Images/Home/Dashboard/dashboard-preview-1.webp"
              alt="Real Time Dashboard"
              className="rounded-xl"
            />
          </div>
        </div>

        {/* Learning Management System */}
        <div className="flex items-center text-left">
          <div className="flex items-start mb-4 w-1/2">
            <Icon
              icon="hugeicons:online-learning-01"
              className="text-xl mr-3 mt-1"
            />
            <div>
              <h3 className="font-semibold text-lg">
                Learning Management System
              </h3>
              <p className="text-gray-600 text-sm">
                Streamlined sourcing, tracking, and hiring candidates.
              </p>
            </div>
          </div>
          <div className="w-1/2">
            <img
              src="/Corporate/Images/Home/Dashboard/dashboard-preview-2.webp"
              alt="Real Time Dashboard"
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
