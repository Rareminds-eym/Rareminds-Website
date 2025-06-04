import React from "react";
import { motion } from "framer-motion";
import CaseStudiesCarousel from "../CaseStudiesCarousel";
import { caseStudies } from "@/components/Corporate/Recruitment/Home/CaseStudies/caseStudiesData.ts";


const WorkWith: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 px-4 bg-gradient-to-br from-gray-50 to-white text-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none select-none opacity-10 bg-[radial-gradient(circle_at_60%_40%,#38bdf8_0,transparent_60%),radial-gradient(circle_at_20%_80%,#6366f1_0,transparent_60%)]"></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent"
        >
          Who We Work With
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
          className="text-base sm:text-lg text-gray-600 mb-8 font-medium max-w-2xl mx-auto"
        >
          Corporate to Campus to Shop Floor.{" "}
          <span className="text-sky-600 font-semibold">
            We Speak Everyone’s Language.
          </span>
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.18,
              },
            },
          }}
          className="flex flex-wrap justify-center gap-3 mb-6"
        >
          {["Auto", "BFSI", "Manufacturing", "Retail", "Government"].map(
            (sector) => (
              <motion.span
                key={sector}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4, ease: "easeOut" },
                  },
                }}
                className="inline-block bg-white/90 border border-sky-100 rounded-full px-6 py-2 text-base font-semibold text-sky-700 shadow hover:bg-sky-50 transition-all duration-200"
              >
                {sector}
              </motion.span>
            )
          )}
        </motion.div>
        <div className="mb-12">
          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.5, delay: 0.32, ease: "easeOut" }}
            className="text-lg font-semibold mb-4 text-gray-700"
          >
            Clients Include:
          </motion.h3>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.4,
                },
              },
            }}
            className="flex flex-wrap justify-center items-center gap-6"
          ></motion.div>
          <div>
            <CaseStudiesCarousel caseStudies={caseStudies}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkWith;
