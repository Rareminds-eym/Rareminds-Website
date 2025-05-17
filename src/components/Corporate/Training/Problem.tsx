import { motion } from 'framer-motion';

export default function Problem() {
  return (
    <section className="relative overflow-hidden py-8 sm:py-12 lg:py-20 bg-white">
      {/* Diagonal split background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full [background:linear-gradient(-71deg,_#2C3E50,_#000000)] clip-diagonal-right" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-14 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-20">
          {/* LEFT TEXT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[45%] text-center lg:text-left"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-2 sm:mb-4 text-black">
              You're Producing Graduates.
            </h2>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-black">
              But Are You Producing Professionals?
            </h2>
            <p className="text-base sm:text-lg text-black mt-2 max-w-2xl mx-auto lg:mx-0">
              Most colleges tick the syllabus checkbox. We go beyond with employability-first, industry-validated training.
            </p>
          </motion.div>

          {/* RIGHT SIDE - 3 CIRCULAR CARDS */}
          <div className="relative w-full lg:w-[55%] h-[300px] sm:h-[350px] lg:h-[400px] mt-8 lg:mt-0 flex items-center justify-center">
            {/* Top Left */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute top-0 left-[5%] sm:left-[10%]"
            >
              <div className="w-32 sm:w-40 lg:w-48 h-32 sm:h-40 lg:h-48 rounded-full bg-pink-100 p-2 sm:p-3 shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-pink-200 flex flex-col items-center justify-center text-center">
                <img src={"Problem1"} alt="icon1" className="w-24 sm:w-32 lg:w-40 h-20 sm:h-24 lg:h-32 mb-1 object-cover rounded-full" />
              </div>
            </motion.div>

            {/* Top Right */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-0 right-[5%] sm:right-[10%]"
            >
              <div className="w-32 sm:w-40 lg:w-48 h-32 sm:h-40 lg:h-48 rounded-full bg-pink-100 p-2 sm:p-3 shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-pink-200 flex flex-col items-center justify-center text-center">
                <img src={"Problem2"} alt="icon2" className="w-24 sm:w-32 lg:w-40 h-20 sm:h-24 lg:h-32 mb-1 object-cover rounded-full" />
              </div>
            </motion.div>

            {/* Bottom Center */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <div className="w-32 sm:w-40 lg:w-48 h-32 sm:h-40 lg:h-48 rounded-full bg-green-100 p-2 sm:p-3 shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-green-200 flex flex-col items-center justify-center text-center">
                <img src={"Solution"} alt="icon3" className="w-24 sm:w-32 lg:w-40 h-20 sm:h-24 lg:h-32 mb-1 object-cover rounded-full" />
              </div>
            </motion.div>
          </div>
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
