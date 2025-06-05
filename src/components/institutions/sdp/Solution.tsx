import { motion } from 'framer-motion';
import { Microscope, Target, Brain, Globe } from 'lucide-react';
import { useNavigate } from "react-router-dom"; // Add this import

const features = [
  {
    icon: Microscope,
    title: '45-Hour Experiential Modules',
    description: 'EV, AI, Soft Skills, Food Tech, etc.',
    bgColor: 'from-blue-100/60 to-purple-100/60',
  },
  {
    icon: Target,
    title: 'Hackathons + Final Assessments',
    description: 'Real-world projects + shortlisting',
    bgColor: 'from-pink-100/60 to-rose-100/60',
  },
  {
    icon: Brain,
    title: 'Trainer + LMS + Certification',
    description: 'Full-stack execution, not DIY chaos',
    bgColor: 'from-green-100/60 to-teal-100/60',
  },
  {
    icon: Globe,
    title: 'Delivered in 13+ Indian Languages',
    description: 'Regional reach, national results',
    bgColor: 'from-yellow-100/60 to-orange-100/60',
  },
];

export default function Solution() {
  const navigate = useNavigate(); // Add this line

  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-br from-blue-50 via-pink-30 to-purple-30">
      <div className="container mx-auto px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h1 className="text-xl font-bold mb-4 bg-black bg-clip-text text-transparent">
            Learn. Build. Belong
          </h1>
          <p className="text-sm text-gray-600 mx-auto">
             Turning Education Into Employability.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, rotate: index % 2 === 0 ? -5 : 5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative group mb-4 cursor-pointer"
              onClick={() => navigate("/academia/projects")}
              tabIndex={0}
              role="button"
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") navigate("/academia/projects/projectlist");
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} rounded-2xl transform group-hover:scale-105 transition-transform duration-300 `}></div>
              <div className="relative bg-white/40 backdrop-blur-sm p-6 rounded-2xl transform hover:translate-y-[-1rem] transition-all duration-300 border border-white/20">
                <feature.icon className="w-7 h-7 text-gray-700 mb-6 transform group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-medium font-bold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}