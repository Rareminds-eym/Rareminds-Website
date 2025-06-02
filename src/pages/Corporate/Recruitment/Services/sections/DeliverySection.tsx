import React from "react";
import { motion } from "framer-motion";
import { ServiceList } from "@/components/Corporate/Recruitment/ServiceList";

interface DeliverySectionProps {
  title?: string;
  description?: string;
  list?: { t_1: string; t_2: string; points: string[] }[];
}

const DeliverySection: React.FC<DeliverySectionProps> = ({
  title,
  description,
  list,
}) => {
  const paragraphs = description ? description.split(/\n\n+/) : [];

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
        >
          {title}
        </motion.h2>

        <div className="space-y-4 max-w-3xl text-gray-600 mb-16">
          {paragraphs.map((desc, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
              className="text-base md:text-lg leading-relaxed"
            >
              {desc}
            </motion.p>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          {Array.isArray(list) && list.length > 0 && (
            <>
              <div className="mt-12 space-y-12 w-full lg:w-3/4">
                {list.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 40, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 0.15 * idx,
                      type: "spring",
                      stiffness: 120,
                    }}
                    className="bg-white rounded-xl p-6 md:p-8 flex flex-col md:flex-row md:items-start md:gap-8"
                  >
                    <div className="md:w-1/3 mb-4 md:mb-0">
                      <div className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                        <div>{item.t_1}</div>
                        <div className="relative inline-block">
                          <div className="ml-8">{item.t_2}</div>
                          <div className="h-1 w-10 bg-blue-600 mt-1 rounded"></div>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <ul className="list-disc pl-5 text-gray-700 space-y-3 text-base text-left">
                        {item.points.map((point, pidx) => (
                          <li key={pidx}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="w-full lg:w-1/4 relative mt-8 lg:mt-12 hidden lg:block">
                <div className="sticky top-[90px]">
                  <ServiceList />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default DeliverySection;
