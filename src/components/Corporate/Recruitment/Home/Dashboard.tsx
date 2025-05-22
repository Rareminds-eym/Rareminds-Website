import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const Dashboard: React.FC = () => {
  return (
    <div className="bg-white bg-cover py-8 md:py-16 px-4 md:px-8 text-center">
      <div className="text-center mb-8 md:mb-16 relative">
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
                className="text-[32px]"
                width={32}
                height={32}
                color="white"
              />
            </div>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-3 text-corporate-black px-4">
            Your dashboard. Your reports. Your outcomes.
            <br className="hidden md:block" />
            Delivered periodically.
          </h2>
          <p className="text-corporate-grey text-sm md:text-base max-w-2xl mx-auto px-4">
            Complete transparency with real-time tracking and comprehensive
            reporting
          </p>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto grid gap-8 md:gap-16 items-start">
        {/* Real Time Dashboards */}
        <div className="flex flex-col md:flex-row items-center text-left space-y-6 md:space-y-0 md:space-x-8">
          <div className="flex items-start w-full md:w-1/2 px-4 md:px-0">
            <Icon
              icon="carbon:dashboard"
              className="text-2xl md:text-3xl mr-4 md:mr-6 mt-1 flex-shrink-0"
              width="1em"
              height="1em"
            />
            <div className="space-y-2 md:space-y-3">
              <h3 className="font-semibold text-lg md:text-2xl">
                AI-Powered Recruitment Dashboards
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Track funnel health, drop-offs, and hiring velocity in real time
                with our AI-powered recruitment engine.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 md:px-0">
            <img
              src="https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/Index/Dashboard/dashboard-preview-3.webp"
              alt="Real Time Dashboard"
              className="rounded-lg w-full drop-shadow-lg"
            />
          </div>
        </div>

        {/* Learning Management System */}
        <div className="flex flex-col md:flex-row items-center text-left space-y-6 md:space-y-0 md:space-x-8">
          <div className="flex items-start w-full md:w-1/2 px-4 md:px-0">
            <Icon
              icon="hugeicons:online-learning-01"
              className="text-2xl md:text-3xl mr-4 md:mr-6 mt-1 flex-shrink-0"
              width="1em"
              height="1em"
            />
            <div className="space-y-2 md:space-y-3">
              <h3 className="font-semibold text-lg md:text-2xl">
                Smart Learning Management Dashboards
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Track learner behaviour, engagement patterns, and performance
                gaps in real time with our AI-powered LMS dashboards.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 md:px-0">
            <img
              src="https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/Index/Dashboard/dashboard-preview-2.webp"
              alt="Learning Management System Dashboard"
              className="rounded-lg w-full drop-shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
