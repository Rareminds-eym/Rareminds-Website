import { motion } from "framer-motion";

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
    color: "from-pink-200 to-pink-400",
    delay: 0.2,
  },
  {
    image: "Burned-out.webp",
    alt: "Language Support",
    color: "from-blue-200 to-blue-400",
    delay: 0.3,
  },
  {
    image: "Hired-fresh.webp",
    alt: "Global Coverage",
    color: "from-green-200 to-green-400",
    delay: 0.4,
  },
  {
    image: "Learning-limited.webp",
    alt: "Business Solutions",
    color: "from-yellow-200 to-yellow-400",
    delay: 0.5,
  },
  {
    image: "Promoted.webp",
    alt: "Communication Training",
    color: "from-purple-200 to-purple-400",
    delay: 0.6,
  },
  {
    image: "Remote.webp",
    alt: "International Programs",
    color: "from-orange-200 to-orange-400",
    delay: 0.7,
  },
  {
    image: "Teamwork.webp",
    alt: "Strategic Development",
    color: "from-teal-200 to-teal-400",
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
    initial={{ scale: 0.8 }}
    whileInView={{ scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    className={`flex justify-center items-center ${className}`}
  >
    <div
      className={`w-14 h-14 xs:w-18 xs:h-18 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br ${color} shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center`}
    >
      <img
        src={`/Corporate/Images/Training/approch/${image}`}
        alt={alt}
        className="w-10 h-10 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-cover rounded-full"
      />
    </div>
  </motion.div>
);

export default function Problem() {
  return (
    <section
      className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-32 bg-white rounded-t-[30px] sm:rounded-t-[50px] md:rounded-t-[100px] lg:rounded-t-[200px] shadow-[0_-20px_30px_-22px_rgba(0,0,0,0.25)]"
      aria-label="Training Experience Section"
    >
      {/* Diagonal split background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full [background:linear-gradient(-71deg,_#2C3E50,_#000000)] clip-diagonal-right" />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8 lg:gap-12">
          {/* LEFT TEXT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-light mb-2 sm:mb-4 text-black">
              You're Training on Scripts. But Are You Creating Experiences?
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-black mt-2 max-w-2xl mx-auto lg:mx-0">
              If your training stops at scripts, you're probably losing customers.
              Our experience-led methods turn every interaction into a loyalty magnet.
            </p>

            {/* Features List */}
            <div className="mt-4 sm:mt-6 text-left">
              <div className="font-bold text-black mb-2">Rareminds Fix:</div>
              <ul className="list-disc pl-4 sm:pl-5 space-y-1.5 sm:space-y-2 text-black text-sm xs:text-base">
                <li>
                  Immersive, gamified learning that keeps your people engaged
                  and growing.
                </li>
                <li>
                  Culture-building experiences that create purpose, connection,
                  and belongingness.
                </li>
                <li>
                  Role-relevant training paths that evolve with your tools,
                  tech, and business goals.
                </li>
                <li>
                  Interactive virtual labs that keep remote and hybrid teams
                  truly connected.
                </li>
                <li>
                  Team synergy programs that sharpen trust, communication, and
                  collaboration amongst your team.
                </li>
                <li>
                  Leadership bootcamps that build emotionally intelligent,
                  real-world-ready leaders.
                </li>
              </ul>
            </div>
          </motion.div>

          {/* RIGHT SIDE - CIRCLE IMAGES */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative mt-8 lg:mt-0"
          >
            <div className="grid grid-cols-3 gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6 max-w-[280px] xs:max-w-[380px] sm:max-w-[480px] md:max-w-[580px] lg:max-w-[680px] mx-auto">
              {circleImages.slice(0, 6).map((circle, index) => (
                <ImageCircle key={index} {...circle} />
              ))}
              {/* Last circle centered */}
              <ImageCircle
                {...circleImages[6]}
                className="col-span-3 mx-auto -mt-3 xs:-mt-4 sm:-mt-5 md:-mt-6 lg:-mt-8"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom clip-path for diagonal background */}
      <style>{`
        .clip-diagonal-right {
          clip-path: polygon(45% 0%, 100% 0%, 100% 100%, 100% 100%);
        }

        @media (min-width: 480px) {
          .clip-diagonal-right {
            clip-path: polygon(40% 0%, 100% 0%, 100% 100%, 100% 100%);
          }
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
