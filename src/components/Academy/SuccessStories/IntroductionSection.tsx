
"use client";

import { motion } from "framer-motion";

interface IntroductionSectionProps {
  title: string;
  content: string;
}

function IntroductionSection({ title, content }: IntroductionSectionProps) {
  return (
    <div className="w-full bg-white py-16">
      <div className="w-full px-4 sm:px-8 lg:px-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left side - Content */}
          <div className="pl-0 lg:pl-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`text-3xl md:text-5xl font-bold text-gray-900 mb-2 md:mb-8 ${
                title.trim().split(/\s+/).length === 1 ? 'text-center' : 'text-center md:text-left leading-relaxed'
              }`}
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
              className="text-sm md:text-base text-gray-600 leading-relaxed text-justify md:text-left"
            >
              {content}
            </motion.p>
          </div>

          {/* Right side - Images */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                viewport={{ once: true }}
                className="rounded-xl overflow-hidden"
              >
                <img
                  src="/Intro-1.png"
                  alt="Training Session 1"
                  className="w-full h-48 object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true }}
                className="rounded-xl overflow-hidden"
              >
                <img
                  src="/Intro 2.png"
                  alt="Training Session 2"
                  className="w-full h-48 object-cover"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden"
            >
              <img
                src="/Intro-3.png"
                alt="Training Session 3"
                className="w-full h-40 object-cover"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default IntroductionSection;