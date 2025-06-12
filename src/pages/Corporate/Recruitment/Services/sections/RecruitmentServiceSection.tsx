import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface RecruitmentServiceSectionProps {
  foundService: {
    title: string;
    title_desc?: string;
    title_cta?: string;
    title_img?: string;
  };
}

const RecruitmentServiceSection: React.FC<RecruitmentServiceSectionProps> = ({
  foundService,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/corporate/recruitment");

    setTimeout(() => {
      const el = document.getElementById("contact");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  };
  return (
    <section className="w-full corporate-full-screen-h flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/service/service-bg.webp')] bg-cover bg-center opacity-[0.35] z-0" />
      <div className="corporate-container">
        <nav
          aria-label="Breadcrumb"
          className="relative z-20 w-full mt-6 mb-4 px-0"
        >
          <ol className="flex gap-2 flex-wrap text-[#727272] text-sm">
            <li>
              <Link to="/corporate/recruitment" className="hover:underline">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                to="/corporate/recruitment/services"
                className="hover:underline"
              >
                Services
              </Link>
            </li>
            <li>/</li>
            <li aria-current="page">
              <span className="text-black font-semibold">
                {foundService.title}
              </span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="corporate-container grid grid-cols-1 lg:grid-cols-2 gap-y-10 gap-x-10 z-10 w-full h-full mt-8 lg:mt-0 items-center">
        <div className="flex flex-col justify-center items-center lg:items-start my-auto z-10 text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-5xl font-bold text-corporate-black mb-6 drop-shadow-lg"
          >
            {foundService.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-xl text-gray-700 mb-8 max-w-2xl "
          >
            {foundService.title_desc}
          </motion.p>
          {foundService.title_cta && (
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              onClick={handleClick}
              className="corporate-btn-1 flex items-center gap-2"
            >
              {foundService.title_cta}
              <Icon icon="mdi:calendar-clock-outline" className="w-5 h-5" />
            </motion.button>
          )}
        </div>
        <div className="flex justify-center items-center h-full z-0">
          {foundService.title_img && (
            <motion.img
              src={foundService.title_img}
              alt={foundService.title}
              className="lg:absolute bottom-0 right-0 w-full lg:scale-110 origin-bottom-right max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl object-contain mx-auto"
              loading="lazy"
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3 }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default RecruitmentServiceSection;
