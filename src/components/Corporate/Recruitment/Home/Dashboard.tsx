import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const Dashboard: React.FC = () => {
  return (
    <div className="bg-white bg-cover py-12 px-6 text-center">
      <div className="text-center mb-8 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center items-center">
            <div className="bg-corporate-black text-white w-14 h-14 rounded-[20px] mx-auto mb-3 flex items-center justify-center transform rotate-6">
              <Icon
                icon="hugeicons:analytics-up"
                className="text-[28px]"
                width={28}
                height={28}
                color="white"
              />
            </div>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-3 text-corporate-black">
            Your dashboard. Your reports.Your outcomes.
            <br />
            Delivered periodically.
          </h2>
          <p className="text-corporate-grey text-sm md:text-base max-w-2xl mx-auto">
            Complete transparency with real-time tracking and comprehensive
            reporting
          </p>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-1 gap-8 items-start">
        {/* Real Time Dashboards */}
        <div className="flex items-center text-left">
          <div className="flex items-start mb-3 w-1/2">
            <Icon
              icon="carbon:dashboard"
              className="text-3xl mr-3 mt-1"
              width={32}
              height={32}
            />
            <div>
              <h3 className="font-semibold text-xl md:text-2xl mb-2">
                Real Time Dashboards And Analytics
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                 Streamlined sourcing, tracking, and hiring candidates.
              </p>
            </div>
          </div>
          <div className="w-1/2">
            <img
              src="/Corporate/Images/Home/Dashboard/dashboard-preview-2.webp"
              alt="Real Time Dashboard"
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Learning Management System */}
        <div className="flex items-center text-left">
          <div className="flex items-start mb-3 w-1/2">
            <Icon
              icon="hugeicons:online-learning-01"
              className="text-3xl mr-3 mt-1"
              width={32}
              height={32}
            />
            <div>
              <h3 className="font-semibold text-xl md:text-2xl mb-2">
                Learning Management System
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                 Streamlined course access and tracking for progress.
              </p>
            </div>
          </div>
          <div className="w-1/2">
            <img
              src="/Corporate/Images/Home/Dashboard/dashboard-preview-1.webp"
              alt="Real Time Dashboard"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
