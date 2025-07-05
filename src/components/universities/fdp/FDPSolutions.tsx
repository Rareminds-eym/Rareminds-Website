import { motion } from 'framer-motion';
import { Download } from 'lucide-react';


export default function FDPSolutions() {
  return (
    <section className="relative bg-white overflow-hidden py-16 px-6 lg:px-20">
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full [background:linear-gradient(-71deg,_#88AED0,_#78A2CC)] clip-diagonal-right opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 gap-20 ">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 text-left space-y-6"
        >
          <h1 className="text-2xl font-bold text-gray-900">Custom FDP Solutions for Your Institution</h1>
          <ul className="list-none space-y-3 text-md text-gray-700">
            <li>• Launching new industry-driven programs</li>
            <li>• Preparing for NAAC or NBA accreditation</li>
            <li>• Upskilling junior faculty</li>
            <li>• Introducing AI & tech in pedagogy</li>
          </ul>
          <p className="text-md text-gray-800">
            We co-create FDP blueprints tailored to your institutional goals.
          </p>
          
          <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-800/30 border border-blue-400/30 px-6 py-3 rounded-full font-semibold flex items-center gap-3 text-sm sm:text-base sm:px-28 sm:py-2"
                href="/institutions/pdfs/FDP_Handbook.pdf"
              >
                <Download className="w-5 h-5" />
                Download Our FDP Handbook
              </motion.a>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 mt-10 lg:mt-0 flex justify-center"
        >
          <img
            src='/institutions/vectors/FDPImg.jpg'
            alt="FDP Illustration"
            className="rounded-2xl shadow-xl max-w-full h-auto"
          />
        </motion.div>
      </div>

      {/* Custom diagonal background styling */}
      <style jsx>{`
        .clip-diagonal-right {
          clip-path: polygon(30% 0%, 100% 0%, 100% 100%, 100% 100%);
        }
      `}</style>
    </section>
  );
}
