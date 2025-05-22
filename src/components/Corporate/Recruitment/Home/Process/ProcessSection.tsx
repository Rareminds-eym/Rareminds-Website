import { motion } from "framer-motion";
import ProcessSVGMob from "@/assets/corporate/Home/process/processMobile";
import ProcessSVG from "@/assets/corporate/Home/process/process";
import { Icon } from "@iconify/react";

const ProcessSection = () => {
  return (
    <section
      id="process"
      className="py-16 relative overflow-hidden min-h-screen bg-white"
    >
      <div className="mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center mb-4">
            <div className="bg-corporate-black text-white w-16 h-16 rounded-[25px] mx-auto mb-4 flex items-center justify-center transform rotate-6">
              <Icon icon="hugeicons:new-job" width={32} height={32} />
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-corporate-black">
            Our Process = Your Peace of Mind
          </h2>
          <p className="text-corporate-grey max-w-3xl mx-auto text-lg">
            At Rareminds, we believe a great hire is not a coincidence. <br />
            It's the outcome of a structured, insight-driven, and human-centric
            process.
          </p>
        </motion.div>

        <div className="lg:hidden relative">
          <img
            src="https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/Index/Process/bg-mobile.webp"
            className="object-center w-full h-[852px]"
            width={400}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
            <ProcessSVGMob className="scale-[0.8] xl:scale-110" />
          </div>
        </div>
      </div>

      <div className="hidden lg:block relative">
        <img
          src="https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/Index/Process/process-bg.webp"
          className="w-full h-[720px] object-cover"
          height={626}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] max-h-[626px] -mt-5">
          <ProcessSVG className="scale-[0.8] xl:scale-110" />
        </div>
        <button
          className="absolute left-1/2 -translate-x-[50%] bottom-10 corporate-btn-1"
          onClick={() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          type="button"
        >
          Start Your Talent Journey
        </button>
      </div>
    </section>
  );
};

export default ProcessSection;
