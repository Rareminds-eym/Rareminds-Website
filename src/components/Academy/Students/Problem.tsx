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
<h2
  className="text-4xl pb-10 font-bold text-black"
  // style={{
  //   textShadow:
  //     "1px 1px 0 #999, " +
  //     "2px 2px 0 #888, " +
  //     "3px 3px 0 #777, " +
  //     "4px 4px 0 #666",
  // }}
>
  Our Approach
</h2>

           <h2 className="text-3xl font-light mb-4 text-black">
          The Gap Between School and Success? Skills.
          </h2>
        
          <ul className="list-disc pl-5 text-xl font-bold mb-4 text-black">
          <li className="mb-2 text-start"> Skills that matter.</li>
                  <li className="mb-2 text-start"> Confidence that stays. </li>
          <li className="mb-2 text-start"> Opportunities that don’t wait.</li>
        </ul>

          <p className="text-md text-md text-black mt-2">
          With real-world communication, digital fluency, and career readiness training, we bridge the gap between academics and industry by preparing students to step in with clarity and capability.
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
              <img src="/academy/vector/3Circlesleft.png" alt="icon1" className="w-24 h-20 mb-1 object-cover rounded-full" />
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
              <img src="/academy/vector/3Circlesright.png" alt="icon2" className="w-24 h-20 mb-1 object-cover rounded-full" />
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
              <img src="/academy/vector/3Circlescenter.png" alt="icon3" className="w-24 h-20 mb-1 object-cover rounded-full" />
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
   <div className="container mx-auto px-4 md:px-10 relative z-10 flex flex-col-reverse md:flex-row items-center justify-between">
        {/* LEFT TEXT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 mb-10 lg:mb-0 md:text-left text-center"
        >

<h2
  className="text-4xl pb-10 font-bold text-black"
  // style={{
  //   textShadow:
  //     "1px 1px 0 #999, " +
  //     "2px 2px 0 #888, " +
  //     "3px 3px 0 #777, " +
  //     "4px 4px 0 #666",
  // }}
>
  Our Approach
</h2>

          <h2 className="text-2xl font-bold text-black mb-6">
          The Gap Between School and Success? Skills.
          </h2>
        
          <ul className="list-disc pl-5 text-black text-[20px] font-medium mb-4">
          <li className="mb-2 text-start"> Skills that matter.</li>
                  <li className="mb-2 text-start"> Confidence that stays. </li>
          <li className="mb-2 text-start"> Opportunities that don’t wait.</li>
        </ul>

          <p className="text-md text-black">
          With real-world communication, digital fluency, and career readiness training, we bridge the gap between academics and industry by preparing students to step in with clarity and capability.
          </p>
        </motion.div>

        {/* RIGHT SIDE - 3 CIRCULAR CARDS */}
        <div className="relative w-full lg:w-1/2 h-[300px] md:h-[500px] mt-10 lg:mt-0 flex items-center justify-center">
          {/* Top Left */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: -20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute  top-0 left-0 sm:left-[10%]"
          >
            <div className="w-44 h-44 md:w-64 md:h-64 rounded-full bg-pink-100 p-4 shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-pink-200 flex flex-col items-center justify-center text-center">
              <img src="/academy/vector/3Circlesleft.png" alt="Student looking confused during a coding test, representing difficulty in learning" className="w-56 h-44 mb-2 object-cover rounded-full" />
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
            <div className="w-44 h-44 md:w-64 md:h-64 rounded-full bg-pink-100 p-4 shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-pink-200 flex flex-col items-center justify-center text-center">
              <img src='/academy/vector/3Circlesright.png' alt="Graduate surrounded by icons for teamwork, etiquette, and confidence, symbolizing a lack of essential professional skills" className="w-56 h-44 mb-2 object-cover rounded-full" />
            </div>
          </motion.div>

          {/* Bottom Center */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-[200px] absolute md:bottom-0  left-[30%] md:left-[35%] transform -translate-x-1/2"
          >
            <div className="w-44 h-44 md:w-64 md:h-64  rounded-full bg-green-100 p-4 shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-green-200 flex flex-col items-center justify-center text-center">
              <img src="/academy/vector/3Circlescenter.png" alt="A student using a laptop with dollar signs and charts in the background, representing outcome-focused training for job placements" className="w-56 h-44 mb-2 object-cover rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom clip-path for diagonal background */}
      <style>{`
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