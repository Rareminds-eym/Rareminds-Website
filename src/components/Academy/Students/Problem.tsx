// import { motion } from 'framer-motion';
// import Problem1 from '/images/academy/vector/problem1.png';
// import Problem2 from '/images/academy/vector/problem2.png';
// import Solution from '/images/academy/vector/solution.png';

// const Problem=()=> {
//   return (
//     <section className="relative overflow-hidden py-10 bg-white">
//       {/* Diagonal split background */}
//       <div className="absolute inset-0 z-0">
//       <div className="w-full h-full [background:linear-gradient(-71deg,_#2C3E50,_#000000)] clip-diagonal-right" />
//       </div>

//       <div className="container mx-auto px-0 relative z-10 flex flex-col lg:flex-row items-center justify-between ">
//         {/* LEFT TEXT SIDE */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="max-w-auto text-left"
//         >
//           {/* <h2 className="text-3xl font-light mb-10 text-black">
//           Communication. Confidence. Clarity. The real essentials.
//           </h2>
//           <h2 className="text-2xl font-bold mb-10 text-black whitespace-nowrap">
//           Communication that works. Confidence that shows. Careers that start in school.
//           </h2>
//           <p className="text-md text-black mt-4">
//           From communication skills to digital fluency and career readiness, we help schools build confident students with practical skills for the real world.
//           </p> */}
//         </motion.div>

//         {/* RIGHT SIDE - 3 CIRCULAR CARDS */}
//         <div className="relative w-full md:w-[50%] h-[500px] mt-20 lg:mt-0 flex items-center justify-center ">
//           {/* Top Left */}
//           <motion.div
//             initial={{ opacity: 0, x: -20, y: -20 }}
//             whileInView={{ opacity: 1, x: 0, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="absolute top-0  sm:left-[15%]"
//           >
//              <div className="w-64 h-64 rounded-full bg-pink-100 p-4 shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-pink-200 flex flex-col items-center justify-center text-center">
//              <img src={Problem1} alt="icon1" className="w-56 h-44 mb-2 object-cover rounded-full" />
//             </div>
//           </motion.div>

//           {/* Top Right */}
//           <motion.div
//             initial={{ opacity: 0, x: 20, y: -20 }}
//             whileInView={{ opacity: 1, x: 0, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="absolute top-0 right-0"
//           >
//            <div className="w-64 h-64 rounded-full bg-pink-100 p-4 shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-pink-200 flex flex-col items-center justify-center text-center">
//            <img src={Problem2} alt="icon2" className="w-56 h-44 mb-2 object-cover rounded-full" />
//             </div>
//           </motion.div>

//           {/* Bottom Center */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="w-[200px] absolute bottom-0 left-[40%] transform -translate-x-1/2"
//           >
//              <div className="w-64 h-64 rounded-full bg-green-100 p-4 shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-green-200 flex flex-col items-center justify-center text-center">
//              <img src={Solution} alt="icon3" className="w-56 h-44 mb-2 object-cover rounded-full" />
              
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Custom clip-path for diagonal background */}
//       <style jsx>{`
//         .clip-diagonal-right {
//           clip-path: polygon(30% 0%, 100% 0%, 100% 100%, 100% 100%);
//         }

//         @media (min-width: 1024px) {
//           .clip-diagonal-right {
//             clip-path: polygon(30% 0%, 100% 0%, 100% 100%, 100% 100%);
//           }
//         }
//       `}</style>
//     </section>
//   );
// }

// export default Problem;
// ...your existing imports
import { motion } from 'framer-motion';
// import Problem1 from '/academy/vector/problem1.png';
// import Problem2 from '/academy/vector/problem2.png';
// import Solution from '/academy/vector/solution.png';

const Problem = () => {
  return (
    <section className="relative overflow-hidden py-10 bg-white">
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
              <img src="/academy/vector/problem1.png" alt="icon1" className="w-56 h-44 mb-2 object-cover rounded-full" />
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
              <img src='/academy/vector/problem2.png' alt="icon2" className="w-56 h-44 mb-2 object-cover rounded-full" />
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
              <img src="/academy/vector/solution.png" alt="icon3" className="w-56 h-44 mb-2 object-cover rounded-full" />
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
};

export default Problem;

