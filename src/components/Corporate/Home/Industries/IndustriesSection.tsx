import IndutriesSVG from "@/assets/corporate/Home/industries/industries";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const IndustriesSection = () => {
  const scrollToCaseStudies = () => {
    const element = document.getElementById("case-studies");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="industries"
      className="section w-full flex flex-col relative overflow-hidden bg-white"
    >
      <div className="text-center mb-12 mt-16 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center items-center">
            <div className="bg-corporate-black text-white w-16 h-16 rounded-[25px] mx-auto mb-4 flex items-center justify-center transform rotate-6">
              <Icon icon="carbon:settings-services" width={32} height={32} />
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-corporate-black">
            Industries We Serve
          </h2>
          <p className="text-corporate-grey max-w-3xl mx-auto">
            Rareminds is a global recruitment and cross-border talent
            acquisition firm based in India, specializing in hiring
            third-country nationals for international roles
          </p>
        </motion.div>
      </div>
      <IndutriesSVG className="w-full h-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="my-10 text-center flex justify-center"
      >
        <button onClick={scrollToCaseStudies} className="corporate-btn-1">
          See Our Impact Stories{" "}
          <Icon
            icon="cil:arrow-right"
            height={20}
            width={20}
            className="ml-2"
          />
        </button>
      </motion.div>
    </section>
  );
};

export default IndustriesSection;
