import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Users, Gauge, Award, Target } from "lucide-react";

interface TechTeamSectionProps {
  title?: string;
  description?: string[];
}

const TechTeamSection: React.FC<TechTeamSectionProps> = ({
  title = "",
  description = [""],
}) => {
  const stats = [
    {
      icon: Users,
      stat: "500+",
      label: "Tech Roles Filled",
      color: "from-blue-600 to-cyan-500",
    },
    {
      icon: Gauge,
      stat: "48hrs",
      label: "Average Response Time",
      color: "from-purple-600 to-pink-500",
    },
    {
      icon: Award,
      stat: "95%",
      label: "Success Rate",
      color: "from-green-600 to-emerald-500",
    },
    {
      icon: Target,
      stat: "100+",
      label: "Happy Clients",
      color: "from-orange-600 to-yellow-500",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-50/50 to-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] -right-24 -top-24 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50" />
        <div className="absolute w-[500px] h-[500px] -left-24 -bottom-24 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50" />
      </div>

      <div className="relative container mx-auto px-4">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight"
          >
            {title}
          </motion.h2>

          <div className="space-y-6">
            {Array.isArray(description) ? (
              description.map((desc, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="text-lg text-gray-600 leading-relaxed"
                >
                  {desc}
                </motion.p>
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-gray-600 leading-relaxed"
              >
                {description}
              </motion.p>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <button className="corporate-btn-1 mx-auto">
            Get Started
            <ArrowUpRight className="ml-2" size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TechTeamSection;
