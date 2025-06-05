import { motion } from 'framer-motion';

// Mobile version
function ProblemMobile() {
  return (
    <section className="relative overflow-hidden py-6 bg-white block lg:hidden">
      {/* Top text section with white background */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full text-left mb-8"
        >
          <h2 className="text-3xl font-light mb-4 text-black">
            You're Producing Graduates.
          </h2>
          <h2 className="text-3xl font-bold mb-4 text-black">
            But Are You Producing Professionals?
          </h2>
          <p className="text-md text-black mt-2">
            Most colleges tick the syllabus checkbox. We go beyond with employability-first, industry-validated training.
          </p>
        </motion.div>
      </div>
      {/* Images section with horizontal gradient background */}
      <div className="w-full py-16 relative" style={{ background: 'linear-gradient(90deg, #2C3E50 0%, #000000 100%)' }}>
        <div className="relative w-full h-[320px] max-w-[350px] mx-auto">
          {/* Top Left */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: -20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute top-0 left-0"
          >
            <div className="w-32 h-32 rounded-full bg-pink-100 p-2 shadow-xl hover:scale-105 hover:bg-pink-200 flex flex-col items-center justify-center text-center transition-all duration-300">
              <img src="/institutions/vectors/problem1.png" alt="icon1" className="w-24 h-20 mb-1 object-cover rounded-full" />
            </div>
          </motion.div>
          {/* Top Right */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: -20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-0 right-0"
          >
            <div className="w-32 h-32 rounded-full bg-pink-100 p-2 shadow-xl hover:scale-105 hover:bg-pink-200 flex flex-col items-center justify-center text-center transition-all duration-300">
              <img src="/institutions/vectors/problem2.png" alt="icon2" className="w-24 h-20 mb-1 object-cover rounded-full" />
            </div>
          </motion.div>
          {/* Bottom Center */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-0 left-1/3 -translate-x-1/2"
          >
            <div className="w-32 h-32 rounded-full bg-green-100 p-2 shadow-xl hover:scale-105 hover:bg-green-200 flex flex-col items-center justify-center text-center transition-all duration-300">
              <img src="/institutions/vectors/solution.png" alt="icon3" className="w-24 h-20 mb-1 object-cover rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Desktop version (existing)
function ProblemDesktop() {
  return (
    <section className="relative overflow-hidden py-6 bg-white hidden lg:block">
      {/* Diagonal split background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full [background:linear-gradient(-71deg,_#2C3E50,_#000000)] clip-diagonal-right" />
      </div>

      <div className="container mx-auto px-0 relative z-10 flex flex-col lg:flex-row items-center justify-between">
        {/* LEFT TEXT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-auto text-left"
        >
          <h2 className="text-4xl font-light mb-6 text-black">
            You're Producing Graduates.
          </h2>
          <h2 className="text-4xl font-bold mb-6 text-black whitespace-nowrap">
            But Are You Producing Professionals?
          </h2>
          <p className="text-md text-black mt-2">
            Most colleges tick the syllabus checkbox. We go beyond with employability-first, industry-validated training.
          </p>
        </motion.div>

        {/* RIGHT SIDE - 3 CIRCULAR CARDS */}
        <div className="relative w-full lg:w-[500px] h-[400px] mt-16 lg:mt-0 flex items-center justify-center">
          {/* Top Left */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: -20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute top-0 left-0 "
          >
            <div className="w-48 h-48 rounded-full bg-pink-100 p-3 shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-pink-200 flex flex-col items-center justify-center text-center">
              <img src="/institutions/vectors/problem1.png" alt="icon1" className="w-40 h-32 mb-1 object-cover rounded-full" />
            </div>
          </motion.div>

          {/* Top Right */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: -20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-0 -right-4"
          >
            <div className="w-48 h-48 rounded-full bg-pink-100 p-3 shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-pink-200 flex flex-col items-center justify-center text-center">
              <img src="/institutions/vectors/problem2.png" alt="icon2" className="w-40 h-32 mb-1 object-cover rounded-full" />
            </div>
          </motion.div>

          {/* Bottom Center */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-4 left-[32%] transform -translate-x-1/2"
          >
            <div className="w-48 h-48 rounded-full bg-green-100 p-3 shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-green-200 flex flex-col items-center justify-center text-center">
              <img src="/institutions/vectors/solution.png" alt="icon3" className="w-40 h-32 mb-1 object-cover rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom clip-path for diagonal background */}
      <style jsx>{`
        .clip-diagonal-right {
          clip-path: polygon(30% 0%, 100% 0%, 100% 100%, 100% 100%);
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

export default function Problem() {
  return (
    <>
      <ProblemMobile />
      <ProblemDesktop />
    </>
  );
}