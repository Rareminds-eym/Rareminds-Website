import { motion } from "framer-motion";
import { CheckCircle, TrendingUp, Award, CheckCheck } from "lucide-react";
import { Icon } from "@iconify/react";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { caseStudies } from "./caseStudiesData";

const CaseStudiesSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
  });

  const handlePrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const handleNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

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

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {caseStudies.map((currentCase, idx) => (
                <div
                  key={`case-${idx}`}
                  className="flex-[0_0_100%] px-2 md:px-6"
                >
                  <div className="bg-white rounded-3xl overflow-hidden border border-corporate-black/40 w-full max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[70vh]">
                      {/* Left Panel - Image & Stats */}
                      <div className="bg-gradient-to-br from-corporate-purple to-corporate-purple/60 text-white p-8 flex flex-col justify-between">
                        <div>
                          <motion.div
                            key={`case-title-${idx}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-8"
                          >
                            <h3 className="text-2xl font-bold mb-2 flex items-center">
                              <span className="mr-2 bg-white min-w-8 min-h-8 rounded-full flex items-center justify-center text-[#7d64ff]">
                                {idx + 1}
                              </span>
                              {currentCase.title}
                            </h3>
                            <p className="">{currentCase.subtitle}</p>
                          </motion.div>

                          <div className="space-y-4">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-h-40 overflow-y-auto modern-scrollbar">
                              <TrendingUp size={24} className="mb-2" />
                              <h4 className="font-semibold mb-1">
                                Key Outcomes
                              </h4>
                              <ul className="space-y-2">
                                {currentCase.outcomes.map((outcome, i) => (
                                  <motion.li
                                    key={`outcome-${idx}-${i}`}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                      duration: 0.3,
                                      delay: i * 0.1,
                                    }}
                                    className="flex items-start gap-2"
                                  >
                                    <CheckCheck
                                      size={18}
                                      className="mt-1 flex-shrink-0"
                                    />
                                    <span className="text-sm">{outcome}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div>
                          <blockquote className="border-l-4 border-s-[#7d64ff] pl-4 italic mt-5">
                            "{currentCase.testimonial}"
                          </blockquote>
                          <p className="text-right text-sm mt-2">
                            — {currentCase.author}
                          </p>
                        </div>
                      </div>

                      {/* Right Panel - Case Study Details */}
                      <div className="col-span-2 p-8">
                        <div className="grid grid-cols-1 h-full gap-6">
                          <motion.div
                            key={`client-${idx}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="bg-corporate-black/5 p-6 rounded-xl border border-corporate-primary-light/20 max-h-32 overflow-y-auto modern-scrollbar"
                          >
                            <h4 className="text-corporate-black font-bold mb-3 flex items-center gap-2">
                              <span className="bg-[#7d64ff]/10 p-2 mr-1 rounded-lg">
                                <Icon
                                  icon="formkit:people"
                                  width="20"
                                  height="20"
                                />
                              </span>
                              Client
                            </h4>
                            <p className="text-gray-700">
                              {currentCase.client}
                            </p>
                          </motion.div>

                          <motion.div
                            key={`challenge-${idx}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="bg-corporate-black/5 p-6 rounded-xl border border-corporate-primary-light/20 max-h-32 overflow-y-auto modern-scrollbar"
                          >
                            <h4 className="text-corporate-black font-bold mb-3 flex items-center gap-2">
                              <span className="bg-[#7d64ff]/10 p-2 mr-1 rounded-lg">
                                <Icon
                                  icon="ant-design:aim-outlined"
                                  width="20"
                                  height="20"
                                />
                              </span>
                              Challenge
                            </h4>
                            <p className="text-gray-700">
                              {currentCase.challenge}
                            </p>
                          </motion.div>

                          <motion.div
                            key={`solution-${idx}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="bg-corporate-black/5 p-6 rounded-xl flex flex-col justify-between border border-corporate-primary-light/20 max-h-40 overflow-y-auto modern-scrollbar"
                          >
                            <div>
                              <h4 className="text-corporate-black font-bold mb-3 flex items-center gap-2">
                                <span className="bg-[#7d64ff]/10 p-2 mr-1 rounded-lg">
                                  <Icon
                                    icon="hugeicons:idea-01"
                                    width="20"
                                    height="20"
                                  />
                                </span>
                                Rareminds Solution
                              </h4>
                              <ul className="space-y-3 mt-5">
                                {currentCase.solution.map((step, i) => (
                                  <li
                                    key={`solution-${idx}-${i}`}
                                    className="flex items-start gap-3"
                                  >
                                    <CheckCircle
                                      className="text-corporate-black mt-1 flex-shrink-0"
                                      size={18}
                                    />
                                    <span className="text-gray-700">
                                      {step}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePrev}
              className="bg-white text-corporate-black hover:bg-gray-50 px-6 py-3 rounded-lg shadow-md transition-all duration-300 flex items-center gap-2 group"
            >
              <Icon
                icon="ph:arrow-left"
                width="24"
                height="24"
                className="group-hover:-translate-x-1 transition-transform duration-300"
              />
              <span>Previous</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="bg-white text-corporate-black hover:bg-gray-50 px-6 py-3 rounded-lg shadow-md transition-all duration-300 flex items-center gap-2 group"
            >
              <span>Next</span>
              <Icon
                icon="ph:arrow-right"
                width="24"
                height="24"
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
