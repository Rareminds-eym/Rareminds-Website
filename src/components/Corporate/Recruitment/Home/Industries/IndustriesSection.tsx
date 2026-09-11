import IndutriesSVG from "@/assets/corporate/Home/industries/industries";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Icon } from "@iconify/react";
import { industryImage, recruitmentIndustries } from "@/data/recruitmentIndustries";

const IndustriesSection = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const scrollToCaseStudies = () => {
    const element = document.getElementById("case-studies");
    if (element) {
      element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  };

  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="section w-full flex flex-col relative scroll-mt-24 overflow-hidden bg-white"
    >
      <div className="relative mb-8 mt-12 px-5 text-center sm:px-8 lg:mb-12 lg:mt-16">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center items-center">
            <div className="bg-corporate-black text-white w-16 h-16 rounded-[25px] mx-auto mb-4 flex items-center justify-center transform rotate-6">
              <Icon icon="carbon:settings-services" width={32} height={32} />
            </div>
          </div>
          <h2 id="industries-heading" className="text-3xl md:text-5xl font-bold mb-4 text-corporate-black">
            Industries We Serve
          </h2>
          <p className="text-corporate-grey max-w-3xl mx-auto text-lg">
            Rareminds is a global recruitment and cross-border talent
            acquisition firm based in India, specializing in hiring
            third-country nationals for international roles
          </p>
        </motion.div>
      </div>
      <ul aria-label="Industries we serve" className="grid grid-cols-2 gap-3 px-5 sm:grid-cols-3 sm:gap-4 sm:px-8 lg:grid-cols-4 xl:hidden">
        {recruitmentIndustries.map((industry) => (
          <li key={industry.id} className="flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50/60 px-2 py-4 text-center">
            <img src={industryImage(industry.image)} alt="" width={112} height={112} loading="lazy" className="mb-3 h-24 w-24 object-contain sm:h-28 sm:w-28" />
            <span className="flex min-h-10 items-center justify-center text-[13px] font-semibold leading-5 text-corporate-black sm:text-sm"><span>{industry.name === "Telecommunications" ? <>Tele<wbr />communications</> : industry.name}</span></span>
          </li>
        ))}
      </ul>
      <div className="mx-auto hidden w-full max-w-[1440px] xl:block">
        <IndutriesSVG className="w-full h-auto" />
      </div>

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="my-10 text-center flex justify-center"
      >
        <button type="button" onClick={scrollToCaseStudies} className="corporate-btn-1">
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
