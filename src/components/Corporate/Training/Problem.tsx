import { motion } from "framer-motion";

export default function Problem() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-32 bg-white rounded-t-[50px] md:rounded-t-[200px] shadow-[0_-20px_30px_-22px_rgba(0,0,0,0.25)]">
      {/* Diagonal split background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full [background:linear-gradient(-71deg,_#2C3E50,_#000000)] clip-diagonal-right" />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* LEFT TEXT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-2 sm:mb-4 text-black">
              You're Conducting Pieces Of Training.
            </h2>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-black">
              But Are You Creating Transformation?
            </h2>
            <p className="text-base sm:text-lg text-black mt-2 max-w-2xl mx-auto lg:mx-0">
              Across 25 sectors. In 13 languages. 30+ countries. With zero
              excuses. <br />
              We drive ROI, retention, and real behavioral change.
            </p>
          </motion.div>

          {/* RIGHT SIDE - 3 CIRCULAR CARDS */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative mt-12 lg:mt-0"
          >
            <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-[600px] mx-auto">
              <motion.div 
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex justify-center items-center px-4 sm:px-6"
              >
                <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-pink-100 to-pink-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-pink-200 hover:to-pink-300 flex items-center justify-center">
                  <div className="text-center">
                    <span className="block text-2xl sm:text-3xl font-bold text-gray-800 mb-1">25+</span>
                    <span className="text-sm sm:text-base font-medium text-gray-600">Sectors</span>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex justify-center items-center px-4 sm:px-6"
              >
                <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-pink-100 to-pink-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-pink-200 hover:to-pink-300 flex items-center justify-center">
                  <div className="text-center">
                    <span className="block text-2xl sm:text-3xl font-bold text-gray-800 mb-1">13</span>
                    <span className="text-sm sm:text-base font-medium text-gray-600">Languages</span>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex justify-center items-center col-span-2"
              >
                <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-green-100 to-green-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-green-200 hover:to-green-300 flex items-center justify-center -mt-6 sm:-mt-8 lg:-mt-10">
                  <div className="text-center">
                    <span className="block text-2xl sm:text-3xl font-bold text-gray-800 mb-1">30+</span>
                    <span className="text-sm sm:text-base font-medium text-gray-600">Countries</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom clip-path for diagonal background */}
      <style>{`
        .clip-diagonal-right {
          clip-path: polygon(40% 0%, 100% 0%, 100% 100%, 100% 100%);
        }

        @media (min-width: 640px) {
          .clip-diagonal-right {
            clip-path: polygon(35% 0%, 100% 0%, 100% 100%, 100% 100%);
          }
        }

        @media (min-width: 1024px) {
          .clip-diagonal-right {
            clip-path: polygon(30% 0%, 100% 0%, 100% 100%, 100% 100%);
          }
        }
      `}</style>
    </section>
  );
}
