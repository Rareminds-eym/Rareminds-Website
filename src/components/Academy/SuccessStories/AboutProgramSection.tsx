
"use client";

import { motion } from "framer-motion";
import { Monitor, Code } from 'lucide-react';

interface AboutProgramSectionProps {
  section: {
    title: string;
    content: Array<{
      title: string;
      description: string;
    }>;
  };
  technologies: string[];
}

function AboutProgramSection({ section, technologies }: AboutProgramSectionProps) {
  return (
    <div className="py-16 -mt-10" style={{ background: '#ffffff', width: '100vw', marginLeft: 'calc(-50vw + 50%)', minHeight: '100%' }}>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 md:mb-16 text-center"
      >
        {section.title}
      </motion.h2>

      <div className="w-full px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* LEFT CARD */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
              className="relative p-8 md:p-10"
            >
              <div
                className="absolute inset-0"
                style={{
                  background: '#F5F9FF',
                  clipPath: 'polygon(8% 6%, 100% 0%, 100% 100%, 8% 94%)',
                }}
              />
              <div className="relative z-10 ml-2 md:ml-6" style={{ maxWidth: '200%' }}>

                {/* Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
                  viewport={{ once: true }}
                  className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mb-3 md:mb-6"
                >
                  <Monitor className="w-6 h-6 text-white" />
                </motion.div>

                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.45 }}
                  viewport={{ once: true }}
                  className="text-sm md:text-base md:text-xl font-bold text-gray-900 mb-4 mr-3"
                >
                  {section.content[0]?.title || 'Program Details'}
                </motion.h3>

                {/* Technology Tags */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.55 }}
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-2 mb-4"
                >
                  {technologies.slice(0, Math.ceil(technologies.length / 2)).map((tech, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.55 + index * 0.07 }}
                      viewport={{ once: true }}
                      className="px-2 py-1 md:px-3 bg-white text-blue-700 border border-gray-200 text-xs rounded-lg"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.65 }}
                  viewport={{ once: true }}
                  className="text-xs md:text-sm text-gray-600 leading-relaxed"
                >
                  {section.content[0]?.description || ''}
                </motion.p>

              </div>
            </motion.div>

            {/* RIGHT CARD */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true }}
              className="relative p-8 md:p-10"
            >
              <div
                className="absolute inset-0"
                style={{
                  background: '#F3FEF9',
                  clipPath: 'polygon(0% 0%, 92% 6%, 92% 94%, 0% 100%)',
                }}
              />
              <div className="relative z-10 ml-0 md:-ml-3" style={{ maxWidth: '250%' }}>

                {/* Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}
                  viewport={{ once: true }}
                  className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mb-3 md:mb-6"
                >
                  <Code className="w-6 h-6 text-white" />
                </motion.div>

                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.55 }}
                  viewport={{ once: true }}
                  className="text-base md:text-xl font-bold text-gray-900 mb-4"
                >
                  {section.content[1]?.title || 'Program Details'}
                </motion.h3>

                {/* Technology Tags */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-2 mb-4"
                >
                  {technologies.slice(Math.ceil(technologies.length / 2)).map((tech, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.07 }}
                      viewport={{ once: true }}
                      className="px-2 py-1 md:px-3 bg-white border border-gray-200 text-blue-700 text-xs rounded-lg"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.7 }}
                  viewport={{ once: true }}
                  className="text-xs md:text-sm text-gray-600 leading-relaxed"
                >
                  {section.content[1]?.description || ''}
                </motion.p>

              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutProgramSection;