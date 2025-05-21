import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  GraduationCap,
  Briefcase,
  BookOpen,
  Users,
  School,
  Building2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const services = [
  {
    id: 'full-semester',
    icon: GraduationCap,
    name: 'Full Semester Skill Program',
    subtitle: '(Naan Mudhalvan)',
    description: 'Multiple courses + internships + final evaluation + certification',
    image: "/institutions/images/services/1.png",
    color: 'from-blue-600 to-purple-600',
    duration: '6 Months',
    mode: 'Hybrid',
    focus: 'Comprehensive skill development',
    benefits: [
      'Industry-aligned curriculum',
      'Hands-on projects',
      'Internship opportunities',
      'Professional certification',
      'Placement assistance'
    ]
  },
  {
    id: 'pre-placement',
    icon: Briefcase,
    name: 'Pre-Placement Accelerator',
    subtitle: 'Career Oriented',
    description: 'Final year focused bootcamp + placement tie-up',
    image: "/institutions/images/services/2.png",
    color: 'from-blue-600 to-purple-600',
    duration: '3 Months',
    mode: 'Intensive',
    focus: 'Placement preparation',
    benefits: [
      'Interview preparation',
      'Resume building',
      'Mock interviews',
      'Technical training',
      'Soft skills development'
    ]
  },
  {
    id: 'bridge-courses',
    icon: BookOpen,
    name: 'Bridge Courses',
    subtitle: 'First Years',
    description: 'Foundational programs on communication, digital tools, work ethics',
    image: "/institutions/images/services/3.png",
    color: 'from-blue-600 to-purple-600',
    duration: '2 Months',
    mode: 'Regular',
    focus: 'Foundation building',
    benefits: [
      'Basic communication skills',
      'Digital literacy',
      'Professional ethics',
      'Time management',
      'Team collaboration'
    ]
  },
  {
    id: 'skill-based',
    icon: School,
    name: 'Skill-Based Training',
    subtitle: 'Credit-Linked',
    description: 'Add-on courses that enhance your academic profile',
    image: "/institutions/images/services/4.png",
    color: 'from-blue-600 to-purple-600',
    duration: 'Flexible',
    mode: 'Modular',
    focus: 'Specialized skills',
    benefits: [
      'Industry certifications',
      'Practical workshops',
      'Expert sessions',
      'Project-based learning',
      'Credit recognition'
    ]
  },
  {
    id: 'faculty-development',
    icon: Users,
    name: 'Faculty Development',
    subtitle: 'NEP & Technology',
    description: 'Comprehensive training on NEP and Industry Integration',
    image: "/institutions/images/services/1.png",
    color: 'from-blue-600 to-purple-600',
    duration: '1 Week',
    mode: 'Intensive',
    focus: 'Teacher training',
    benefits: [
      'NEP 2020 implementation',
      'Modern teaching methods',
      'Technology integration',
      'Research guidance',
      'Industry collaboration'
    ]
  },
  {
    id: 'internship-placement',
    icon: Building2,
    name: 'Internship & Placement',
    subtitle: 'Industry Connect',
    description: 'Direct industry partnerships for real-world experience',
    image: "/institutions/images/services/2.png",
    color: 'from-blue-600 to-purple-600',
    duration: 'Ongoing',
    mode: 'Facilitation',
    focus: 'Career launch',
    benefits: [
      'Industry partnerships',
      'Internship opportunities',
      'Placement drives',
      'Career counseling',
      'Alumni network'
    ]
  },
];

export default function Services() {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-4"
        >
          <h1 className="text-xl font-bold mb-4 bg-black bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-sm text-gray-600 mx-auto">
            Transform your institution with our integrated learning programs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {services.map((service, index) => {
            const yOffset = useTransform(
              scrollYProgress,
              [index / services.length, (index + 1) / services.length],
              [50, -50]
            );

            return (
              <motion.div
                key={index}
                style={{ y: yOffset }}
                className="relative group h-[360px] cursor-pointer max-w-xs mx-auto"
                onClick={() => navigate(`/service/${service.id}`)}
              >
                <div className={`absolute left-0 top-0 bottom-0 w-6 bg-[#020202] rounded-l-lg transform -skew-y-12`} />
                
                <motion.div
                  whileHover={{ rotateY: -15, translateX: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative bg-white/40 backdrop-blur-sm rounded-r-lg shadow-2xl overflow-hidden ml-6 h-full"
                >
                  <div className="relative h-40 overflow-hidden">
                    {/* Move the image below the icon */}
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-[404.61] h-[160] object-cover"
                    />
                    <div className={`absolute inset-0 bg-[#222B33] opacity-50`} />
                  </div>

                  <div className="p-6">
                    {/* Title section with icon on the right */}
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-medium font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
                        {service.name}
                      </h3>
                      <service.icon className="w-7 h-7 text-gray-800" />
                    </div>
                    {service.subtitle && (
                      <p className={`text-xs font-medium bg-gradient-to-r ${service.color} bg-clip-text text-transparent mb-3`}>
                        {service.subtitle}
                      </p>
                    )}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    
                    <motion.div
                      whileHover={{ x: 10 }}
                      className={`flex items-center gap-2 text-xs font-semibold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>

                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-gray-200 transform skew-y-45" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-9 relative"
        >
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-pink-400/30 animate-pulse" />
          
          <motion.div
            animate={{
              textShadow: [
                "0 0 10px rgba(79, 70, 229, 0.5)",
                "0 0 20px rgba(79, 70, 229, 0.3)",
                "0 0 10px rgba(79, 70, 229, 0.5)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="relative"
          >
          
          </motion.div>

          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl opacity-75 animate-pulse" />
            
            <motion.button
              className="relative bg-[#222B33] text-white px-4 py-4 rounded-full w-68 h-10
                font-semibold text-sm shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(79, 70, 229, 0.5)",
                  "0 0 40px rgba(79, 70, 229, 0.3)",
                  "0 0 20px rgba(79, 70, 229, 0.5)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <span>Future-Proof Your Career!</span>
              <Sparkles className="w-6 h-6 animate-pulse" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}