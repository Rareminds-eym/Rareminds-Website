import { motion, Variants } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  Users,
  School,
  Building2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const services = [
  {
    id: "full-semester",
    icon: GraduationCap,
    name: "Full Semester Skill Program",
    subtitle: "(Naan Mudhalvan)",
    description:
      "Multiple courses + internships + final evaluation + certification",
    image: "/Corporate/Images/Training/service-header.webp",
    color: "from-blue-600 to-purple-600",
    duration: "6 Months",
    mode: "Hybrid",
    focus: "Comprehensive skill development",
    benefits: [
      "Industry-aligned curriculum",
      "Hands-on projects",
      "Internship opportunities",
      "Professional certification",
      "Placement assistance",
    ],
  },
  {
    id: "pre-placement",
    icon: Briefcase,
    name: "Pre-Placement Accelerator",
    subtitle: "Career Oriented",
    description: "Final year focused bootcamp + placement tie-up",
    image: "/Corporate/Images/Training/service-header.webp",
    color: "from-blue-600 to-purple-600",
    duration: "3 Months",
    mode: "Intensive",
    focus: "Placement preparation",
    benefits: [
      "Interview preparation",
      "Resume building",
      "Mock interviews",
      "Technical training",
      "Soft skills development",
    ],
  },
  {
    id: "bridge-courses",
    icon: BookOpen,
    name: "Bridge Courses",
    subtitle: "First Years",
    description:
      "Foundational programs on communication, digital tools, work ethics",
    image: "/Corporate/Images/Training/service-header.webp",
    color: "from-blue-600 to-purple-600",
    duration: "2 Months",
    mode: "Regular",
    focus: "Foundation building",
    benefits: [
      "Basic communication skills",
      "Digital literacy",
      "Professional ethics",
      "Time management",
      "Team collaboration",
    ],
  },
  {
    id: "skill-based",
    icon: School,
    name: "Skill-Based Training",
    subtitle: "Credit-Linked",
    description: "Add-on courses that enhance your academic profile",
    image: "/Corporate/Images/Training/service-header.webp",
    color: "from-blue-600 to-purple-600",
    duration: "Flexible",
    mode: "Modular",
    focus: "Specialized skills",
    benefits: [
      "Industry certifications",
      "Practical workshops",
      "Expert sessions",
      "Project-based learning",
      "Credit recognition",
    ],
  },
  {
    id: "faculty-development",
    icon: Users,
    name: "Faculty Development",
    subtitle: "NEP & Technology",
    description: "Comprehensive training on NEP and Industry Integration",
    image: "/Corporate/Images/Training/service-header.webp",
    color: "from-blue-600 to-purple-600",
    duration: "1 Week",
    mode: "Intensive",
    focus: "Teacher training",
    benefits: [
      "NEP 2020 implementation",
      "Modern teaching methods",
      "Technology integration",
      "Research guidance",
      "Industry collaboration",
    ],
  },
  {
    id: "internship-placement",
    icon: Building2,
    name: "Internship & Placement",
    subtitle: "Industry Connect",
    description: "Direct industry partnerships for real-world experience",
    image: "/Corporate/Images/Training/service-header.webp",
    color: "from-blue-600 to-purple-600",
    duration: "Ongoing",
    mode: "Facilitation",
    focus: "Career launch",
    benefits: [
      "Industry partnerships",
      "Internship opportunities",
      "Placement drives",
      "Career counseling",
      "Alumni network",
    ],
  },
];

const containerVariants = {
  hidden: { 
    opacity: 0,
    y: 20 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2
    }
  }
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.6
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

export default function Services() {
  const navigate = useNavigate();

  return (
    <section className="py-8 sm:py-12 lg:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-black bg-clip-text text-transparent"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg text-gray-600 mx-auto max-w-2xl"
          >
            Transform your institution with our integrated learning programs
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="relative group h-[360px] cursor-pointer w-full max-w-sm mx-auto"
              onClick={() => navigate(`/service/${service.id}`)}
            >
              <motion.div
                className={`absolute left-0 top-0 bottom-0 w-4 sm:w-6 bg-[#020202] rounded-l-lg transform -skew-y-12`}
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              />

              <motion.div
                className="relative bg-white/40 backdrop-blur-sm rounded-r-lg shadow-2xl overflow-hidden ml-4 sm:ml-6 h-full"
                whileHover={{
                  rotateY: -8,
                  translateX: 5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <div className="relative h-32 sm:h-40 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#222B33] opacity-50" />
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h3 className="text-sm sm:text-base font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
                      {service.name}
                    </h3>
                    <service.icon className="w-5 h-5 sm:w-7 sm:h-7 text-gray-800" />
                  </div>
                  {service.subtitle && (
                    <p
                      className={`text-xs font-medium bg-gradient-to-r ${service.color} bg-clip-text text-transparent mb-2 sm:mb-3`}
                    >
                      {service.subtitle}
                    </p>
                  )}
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4">
                    {service.description}
                  </p>

                  <motion.div
                    whileHover={{ x: 10 }}
                    className={`flex items-center gap-2 text-xs font-semibold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}
                  >
                    Learn More
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </motion.div>
                </div>

                <div className="absolute right-0 top-0 bottom-0 w-1 bg-gray-200 transform skew-y-45" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-8 sm:mt-12 relative"
        >
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 blur-3xl bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-pink-400/30"
          />

          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl opacity-75"
            />

            <motion.button
              className="relative bg-[#222B33] text-white px-4 py-2 sm:px-6 sm:py-4 rounded-full w-full sm:w-auto min-w-[200px] sm:min-w-[280px]
                font-semibold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Future-Proof Your Career!</span>
              <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 animate-pulse" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
