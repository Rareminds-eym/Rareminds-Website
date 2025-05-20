import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function HeroBanner({hero_data}) {
  console.log("Props received:",hero_data);
  return (

     <div>
      <div className="relative bg-blue-900 text-white mt-[-50px] md:top-16 top-20">
      {/* <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/images/naan_Mudhalvan/Naan-Mudalvan-banner.png")',
          backgroundAttachment: 'fixed'
        }}
      /> */}
      <img src="/images/naan_Mudhalvan/Naan-Mudalvan_banner.jpg" alt="" width="100%" height={600} className='object-center'  />
      <div className="absolute inset-0 bg-gradient-to-br" />
      
       
      
      {/* <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 min-h-screen flex items-center"> */}
        <motion.div
          // initial={{ opacity: 0, y: 20 }}
          // animate={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          {/* <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Our Role in Naan Mudhalvan
          </motion.h1> */}
          {/* <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-xl leading-8 text-blue-100"
          >
            As a dedicated partner of the Government of Tamil Nadu, Rareminds has been instrumental in driving the success of the Naan Mudhalvan initiative.
          </motion.p> */}
          <motion.div
            // initial={{ opacity: 0, y: 20 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ delay: 0.7 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            {/* <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#join-network"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full shadow-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
            >
              Join Our Trainer Network
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.a> */}
            {/* <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#work-with-us"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-full text-white hover:bg-white/10 transition-colors duration-300"
            >
              Work With Us
            </motion.a> */}
          </motion.div>
        </motion.div>
      {/* </div> */}
    </div>

    <div className="relative min-h-screen bg-blue-900 text-white">
      {/* <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("images/naan_Mudhalvan/Naan-Mudalvan-banner.png?auto=format&fit=crop&w=2000")',
          backgroundAttachment: 'fixed'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-blue-800/90" /> */}
      

      
      <div className="relative max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl "
        >
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            {/* Naan Mudhalvan Upskilling Program (Powered by Rareminds) */}
           {hero_data.pname} 

          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8  leading-8 text-blue-100 text-[16px]"
          >
            {/* Rareminds, in collaboration with the Government of Tamil Nadu, proudly launches the Naan Mudhalvan 2025 Program—a flagship initiative designed to equip over 30,000 students with industry-specific skills across 18 specialized courses. */}
              {hero_data.description}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-[16px] leading-8 text-blue-100"
          >
            This groundbreaking program bridges the gap between education and employability, empowering students to achieve their career aspirations while supporting the state’s vision for a skilled workforce.

          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#join-network"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full shadow-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
            >
              Explore More
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#work-with-us"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-full text-white hover:bg-white/10 transition-colors duration-300"
            >
              <Link to="/">Work With Us</Link>
              
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
     </div>
   
  );
}

export default HeroBanner;