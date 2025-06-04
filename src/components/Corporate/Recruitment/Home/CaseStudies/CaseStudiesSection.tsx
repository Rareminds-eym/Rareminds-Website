import { motion } from "framer-motion";
import { Award } from "lucide-react";
import CaseStudiesCarousel from "../../../CaseStudiesCarousel";
import { caseStudies } from "./caseStudiesData";

const CaseStudiesSection = () => {
  return (
    <section
      id="case-studies"
      className="section py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden bg-white"
    >
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00TTE2IDI0YzAtMi4yIDEuOC00IDQtNHM0IDEuOCA0IDQtMS44IDQtNCA0LTQtMS44LTQtNCIvPjwvZz48L2c+PC9zdmc+')]"></div>

      <div className="container lg:px-14 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="bg-corporate-black text-white w-16 h-16 rounded-[25px] mx-auto mb-4 flex items-center justify-center transform rotate-6">
            <Award size={32} />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-corporate-black">
            Proven Impact, Delivered
          </h2>
          <p className="text-corporate-grey max-w-3xl mx-auto text-lg">
            Real stories. Real results. See how our recruitment solutions
            transform businesses.
          </p>
        </motion.div>
        <CaseStudiesCarousel caseStudies={caseStudies} />
      </div>
    </section>
  );
};

export default CaseStudiesSection;
