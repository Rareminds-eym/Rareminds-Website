import React from "react";
import { motion } from "framer-motion";

interface ModelsSectionProps {
  title?: string;
  description?: string;
  list?: { title: string; desc: string; icon?: string }[];
}

const ModelsSection: React.FC<ModelsSectionProps> = ({
  title,
  description,
  list,
}) => {
  return (
    <section className="relative w-full bg-[#FFCD2E]">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Left Yellow Column */}
        <div className="relative flex flex-col justify-center p-10 lg:p-20 z-10">
          <div className="absolute top-10 left-10 w-16 h-16 bg-[url('https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/service/blocks.png')]"></div>
          <div className="absolute bottom-10 left-[10%] w-16 h-16 bg-[url('https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/service/blocks.png')]"></div>
          <div className="absolute bottom-[20%] right-0 w-16 h-[20%] bg-[#FDB400]"></div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6 after:content-[''] after:block after:w-16 after:h-1 after:bg-[#000000] after:mt-2 after:rounded-full"
          >
            {title || ""}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative text-base lg:text-lg text-gray-900"
          >
            {description ||
              "Our tried-and-tested 4-phase strategy ensures every hire is skilled, aligned, and set up for success:"}
          </motion.p>
        </div>

        {/* Right Blue Column */}
        <div className="relative bg-[#0B4372] py-20 px-6 sm:px-10 lg:px-20 overflow-hidden col-span-2">
          <div className="absolute top-[30%] right-0 w-[120px] h-16 bg-[#003867]"></div>
          <div className="absolute bottom-1/2 left-[120px] w-[160px] h-16 bg-[#003867]"></div>
          <div className="absolute bottom-[20%] left-0 w-16 h-[20%] bg-[#003867]"></div>
          <div className="absolute bottom-10 right-[10%] w-[160px] h-16 bg-[#003867]"></div>
          <div className="grid grid-cols-1 gap-12 relative z-10">
            {Array.isArray(list) &&
              list.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  className="relative border-l-4 border-dashed border-white pl-6"
                >
                  <div className="absolute -left-4 top-1 w-8 h-8 bg-green-500 text-white font-bold flex items-center justify-center rounded-sm shadow-md">
                    {idx + 1}
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/90 text-base mb-3">{item.desc}</p>
                  {item.icon && (
                    <img
                      src={item.icon}
                      alt={item.title}
                      width={48}
                      height={48}
                      className="mt-2"
                    />
                  )}
                </motion.div>
              ))}
          </div>

          {/* Optional Decorative Dotted Lines or Squares can be added here if needed */}
        </div>
      </div>
    </section>
  );
};

export default ModelsSection;
