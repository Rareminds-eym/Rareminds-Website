import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export const ServiceList: React.FC = () => {
  const services = useSelector(
    (state: RootState) => state.recruitmentService.services
  );
  const location = useLocation();
  if (!services || services.length === 0) return null;
  return (
    <div className="bg-[#F5FAFF] p-6 rounded-lg border border-corporate-primary">
      <h3 className="font-bold text-xl mb-4">All Services</h3>
      <ul
        className="space-y-2 mt-0 w-full max-h-[350px] overflow-y-auto overflow-x-visible scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50"
        style={{ scrollbarWidth: "thin" }}
      >
        {services.map((service: any, idx: number) => {
          const isActive =
            location.pathname === `/corporate/recruitment/services/${service.link}`;
          return (
            <motion.li
              key={idx}
              className={`relative w-full before:content-[''] before:top-1/2 before:-translate-y-1/2 before:rounded-r-[10px] before:w-[5px] before:h-5 before:absolute ${
                isActive
                  ? "before:bg-corporate-primary"
                  : "before:bg-transparent"
              }`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              whileHover={{ boxShadow: "0 8px 32px 0 rgba(59,130,246,0.15)" }}
            >
              <Link
                to={`/corporate/recruitment/services/${service.link}`}
                className={`flex items-center justify-between text-sm w-full text-black bg-[#E5F1FF] hover:text-blue-600 transition-colors px-3 py-2 rounded-lg font-medium text-left ${
                  isActive ? "font-bold text-blue-700" : ""
                }`}
              >
                <span className="truncate block max-w-[170px]">
                  {service.title}
                </span>
                <motion.span
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon
                    icon="mdi:arrow-right"
                    className="w-4 h-4 ml-2 text-blue-500"
                  />
                </motion.span>
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};
