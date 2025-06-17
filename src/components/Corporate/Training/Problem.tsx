import { motion } from "framer-motion";
import { Icon } from '@iconify/react';

interface CircleImage {
  image: string;
  alt: string;
  color: string;
  delay: number;
}

interface ImageCircleProps extends CircleImage {
  className?: string;
}

const circleImages: CircleImage[] = [
  {
    image: "Are-you-measuring.webp",
    alt: "Industry Sectors Overview",
    color: "bg-[#eeffcc]",
    delay: 0.2,
  },
  {
    image: "Burned-out.webp",
    alt: "Language Support",
    color: "bg-[#ffffff]",
    delay: 0.3,
  },
  {
    image: "Hired-fresh.webp",
    alt: "Global Coverage",
    color: "bg-[#fbd1e9]",
    delay: 0.4,
  },
  {
    image: "Learning-limited.webp",
    alt: "Business Solutions",
    color: "bg-[#ffa6b3]",
    delay: 0.5,
  },
  {
    image: "Promoted.webp",
    alt: "Communication Training",
    color: "bg-[#fce8b6]",
    delay: 0.6,
  },
  {
    image: "Remote.webp",
    alt: "International Programs",
    color: "bg-[#dfe7fe]",
    delay: 0.7,
  },
  {
    image: "Teamwork.webp",
    alt: "Strategic Development",
    color: "bg-[#c5c2ff]",
    delay: 0.8,
  },
];

const ImageCircle = ({
  image,
  alt,
  color,
  delay,
  className = "",
}: ImageCircleProps) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    transition={{ delay, duration: 0.5 }}
    className={`flex justify-center items-center ${className}`}
  >
    <div
      className={`w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full ${color} shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center border-2 border-white/20`}
    >
      <img
        src={`/Corporate/Images/Training/approch/${image}`}
        alt={alt}
        className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-cover rounded-full"
      />
    </div>
  </motion.div>
);

export default function Problem() {
  return (
    <section
      className="relative overflow-hidden py-12 sm:py-16 md:py-20 rounded-t-[50px] md:rounded-t-[200px] lg:py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50"
      aria-label="Training Experience Section"
    >
      {/* Modern Background Design */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/15 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-500/15 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-blue-500/40 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-1/3 w-3 h-3 bg-purple-500/30 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-indigo-500/40 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-500/50 rounded-full animate-ping"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8 lg:gap-12">
          {/* LEFT TEXT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold  mb-2 sm:mb-4 leading-tight">
              You're Training on Scripts. But Are You Creating Experiences?
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-gray-700 mt-2 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              If your training stops at scripts, you're probably losing customers.
              Our experience-led methods turn every interaction into a{" "}
              <span className="font-semibold text-blue-600">loyalty magnet</span>.
            </p>

            {/* Features List */}
            <div className="mt-4 sm:mt-6 text-left">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3 shadow-lg">
                  <span className="text-white font-bold text-sm">RM</span>
                </div>
                <span className="text-lg font-bold">
                  Rareminds Fix:
                </span>
              </div>
              <div className="space-y-3">
                {[
                  {
                    icon: <Icon icon="mdi:gamepad-variant" className="text-blue-600 text-lg" />, // Gamified learning
                    text: "Immersive, gamified learning that keeps your people engaged and growing."
                  },
                  {
                    icon: <Icon icon="mdi:account-group" className="text-indigo-600 text-lg" />, // Culture-building
                    text: "Culture-building experiences that create purpose, connection, and belongingness."
                  },
                  {
                    icon: <Icon icon="mdi:target-variant" className="text-pink-600 text-lg" />, // Role-relevant
                    text: "Role-relevant training paths that evolve with your tools, tech, and business goals."
                  },
                  {
                    icon: <Icon icon="mdi:laptop" className="text-green-600 text-lg" />, // Virtual labs
                    text: "Interactive virtual labs that keep remote and hybrid teams truly connected."
                  },
                  {
                    icon: <Icon icon="mdi:account-check" className="text-yellow-600 text-lg" />, // Team synergy
                    text: "Team synergy programs that sharpen trust, communication, and collaboration amongst your team."
                  },
                  {
                    icon: <Icon icon="mdi:trophy-award" className="text-purple-600 text-lg" />, // Leadership bootcamps
                    text: "Leadership bootcamps that build emotionally intelligent, real-world-ready leaders."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-blue-100/50 hover:bg-white/90 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <span className="text-gray-700 text-sm xs:text-base leading-relaxed">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE - CIRCLE IMAGES */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative mt-8 lg:mt-0 flex items-center justify-center lg:justify-end mx-auto"
          >
            <div className="flex flex-col items-center justify-center min-h-[420px] sm:min-h-[480px] md:min-h-[520px] lg:min-h-[560px]">
              {/* Main grid for first 6 circles */}
              <div className="grid grid-cols-3 gap-4 xs:gap-6 sm:gap-8 md:gap-10 lg:gap-12 max-w-[340px] xs:max-w-[420px] sm:max-w-[520px] md:max-w-[600px] lg:max-w-[700px] mb-4 sm:mb-6 md:mb-8">
                {circleImages.slice(0, 6).map((circle, index) => (
                  <div key={index} className="flex justify-center items-center">
                    <ImageCircle {...circle} />
                  </div>
                ))}
              </div>
              {/* Last circle centered below */}
              <div className="flex justify-center items-center w-full mt-4 sm:mt-6 md:mt-8">
                <ImageCircle {...circleImages[6]} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
