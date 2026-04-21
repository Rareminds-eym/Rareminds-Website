import { motion } from "framer-motion";
import { Monitor, Code } from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  description: string;
}

interface AboutProgramSectionProps {
  section: {
    title: string;
    content: ContentItem[];
  };
}

const CARD_ICONS = [Monitor, Code];

function AboutProgramSection({ section }: AboutProgramSectionProps) {
  const items = section.content;

  return (
    <div className="py-16 -mt-10 bg-white min-h-full w-screen -ml-[calc(50vw-50%)]">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 md:mb-16 text-center"
      >
        {section.title}
      </motion.h2>

      <div className="w-full px-8">
        <div className="max-w-5xl mx-auto">
          <div
            className={`grid grid-cols-1 gap-8 ${
              items.length >= 2 ? "md:grid-cols-2" : ""
            }`}
          >
            {items.map((item, index) => {
              // Cycle through card styles and icons for visual variety
              const Icon = CARD_ICONS[index % CARD_ICONS.length];
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 0.2 + index * 0.1,
                  }}
                  viewport={{ once: true }}
                  className="relative p-8 md:p-10"
                >
                  {/* Background with clip-path - alternating styles */}
                  <div
                    className={`absolute inset-0 ${
                      isEven 
                        ? "bg-[#F5F9FF] [clip-path:polygon(8%_6%,100%_0%,100%_100%,8%_94%)]"
                        : "bg-[#F3FEF9] [clip-path:polygon(0%_0%,92%_6%,92%_94%,0%_100%)]"
                    }`}
                  />
                  <div
                    className={`relative z-10 max-w-[200%] ${
                      isEven ? "ml-2 md:ml-6" : "ml-0 md:-ml-3"
                    }`}
                  >
                    {/* Icon */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.7 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut",
                        delay: 0.4 + index * 0.1,
                      }}
                      viewport={{ once: true }}
                      className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mb-3 md:mb-6"
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                        delay: 0.45 + index * 0.1,
                      }}
                      viewport={{ once: true }}
                      className="text-sm md:text-xl font-bold text-gray-900 mb-4 mr-3"
                    >
                      {item.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                        delay: 0.65 + index * 0.1,
                      }}
                      viewport={{ once: true }}
                      className="text-xs md:text-sm text-gray-600 leading-relaxed"
                    >
                      {item.description}
                    </motion.p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutProgramSection;
