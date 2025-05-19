import { motion } from "framer-motion";
import { Timer, Laptop, GraduationCap, Languages } from "lucide-react";

const features = [
  {
    icon: Timer,
    title: "45-Hour Experiential Modules",
    description: "Leadership, Tech, Sales, Compliance, DEI & more—built for impact, not just info.",
    bgColor: "from-blue-100/60 to-purple-100/60",
  },
  {
    icon: Laptop,
    title: "Simulations + Final Assessments",
    description: "Scenarios, roleplays, and gamified tasks because growth doesn't come from slides.",
    bgColor: "from-pink-100/60 to-rose-100/60",
  },
  {
    icon: GraduationCap,
    title: "Trainer + LMS + Certification",
    description: "We bring the coach, the content, and the tracking. You bring the team.",
    bgColor: "from-green-100/60 to-teal-100/60",
  },
  {
    icon: Languages,
    title: "Delivered in 13+ Languages",
    description: "From factory floor to boardroom—everyone levels up in their preferred language.",
    bgColor: "from-yellow-100/60 to-orange-100/60",
  },
];

export default function Solution() {
  return (
    <section className="py-8 sm:py-12 lg:py-16 relative overflow-hidden bg-gradient-to-br from-blue-50 via-pink-30 to-purple-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-10 lg:mb-14"
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-black bg-clip-text text-transparent">
            Upskill. Uplift. Uncomplicate.
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mx-auto max-w-lg">
            Because good training shouldn’t need a post-mortem
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 20,
                rotate: index % 2 === 0 ? -5 : 5,
              }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative group"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} rounded-xl sm:rounded-2xl transform group-hover:scale-105 transition-transform duration-300`}
              ></div>
              <div className="relative bg-white/40 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl transform hover:translate-y-[-0.5rem] sm:hover:translate-y-[-1rem] transition-all duration-300 border border-white/20">
                <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700 mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
