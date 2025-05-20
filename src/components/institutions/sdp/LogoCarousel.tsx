import { motion } from 'framer-motion';


const collegeLogos = [
  {
    name: "Alagappa University",
    url: "/institutions/logos/Alagappa_University_Logo.png",
  },
  {
    name: "Annamalai University",
    url: "/institutions/logos/Annamalai_University_logo.png",
  },
  {
    name: "Bharathidasan University",
    url: "/institutions/logos/Bharathidasan_University_logo.png",
  },
  {
    name: "Madurai University",
    url: "/institutions/logos/Madurai_Kamaraj_University_logo.png",
  },
  {
    name: "PES University",
    url: "/institutions/logos/PES-University-Bangalore.png",
  },
  {
    name: "Thiruvalluvar University",
    url: "/institutions/logos/TUemblem.png",
  },
  {
    name: "VELS University",
    url: "/institutions/logos/Vels_University_logo.png",
  },
  {
  name: "Mother Teresa University",
  url: "/institutions/logos/Mother_Teresa_University_logo.png",
  }, 
  {
    name: "University of Madras",
    url: "/institutions/logos/University_Of_Madras_logo.png",
  }, 
  {
    name: "Manonmaniam Sundaranar University",
    url: "/institutions/logos/Manonmaniam_Sundaranar_University_logo.png",
  },
];

export default function LogoCarousel() {
  return (
    <div className="py-8 bg-white/10 backdrop-blur-md relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-1">
        <h3 className="text-center text-sm font-semibold text-gray-600 mb-4">
          Trusted by Leading Institutions
        </h3>
        
        <div className="relative">
          {/* First row of logos */}
          <motion.div
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }
            }}
            className="flex gap-10 items-center"
          >
            {[...collegeLogos, ...collegeLogos].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 relative group"
              >
                <div className="w-28 h-16 bg-white rounded-lg shadow-md flex items-center justify-center p-2 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={logo.url}
                    alt={logo.name}
                    className="max-h-full max-w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300 text-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 mix-blend-overlay" />
                </div>
                <div className="opacity-0 group-hover:opacity-100 absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded-full text-xs transition-opacity duration-300">
                  {logo.name}
                </div>
              </div>
            ))}
          </motion.div>
         
        </div>
      </div>
    </div>
  );
}