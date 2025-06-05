import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

interface ApproachSectionProps {
  title?: string;
  description?: string;
  list?: { title: string; points: string[] }[];
}

const ApproachSection: React.FC<ApproachSectionProps> = ({
  title,
  description,
  list,
}) => {
  const paragraphs = description ? description.split(/\n\n+/) : [];
  const [openIdx, setOpenIdx] = React.useState<number | null>(null);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/corporate/recruitment");

    setTimeout(() => {
      const el = document.getElementById("contact");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };
  
  return (
    <section className="relative w-full \ bg-white">
      <div className="absolute w-full h-full bg-[url('https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/service/approch-bg.webp')] opacity-[0.03]" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-[120px]">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              {title || "Our Proven Approach to Technical Hiring"}
            </h2>
            <div className="space-y-4 text-gray-600 text-base md:text-lg">
              {paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
            <button className="corporate-btn-2" onClick={handleClick}>
              Begin the Journey
              <Icon icon="cil:arrow-right" className="ml-2 w-4 h-4" />
            </button>
          </motion.div>

          {/* Right Feature List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {Array.isArray(list) &&
              list.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  title={item.title}
                  open={openIdx === idx}
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                >
                  <ul className="list-disc pl-5 space-y-2">
                    {item.points &&
                      item.points.map((point, pidx) => (
                        <li key={pidx}>{point}</li>
                      ))}
                  </ul>
                </AccordionItem>
              ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Simple Accordion implementation for this section
const AccordionItem: React.FC<{
  title: string;
  children: React.ReactNode;
  open: boolean;
  onClick: () => void;
}> = ({ title, children, open, onClick }) => {
  return (
    <motion.div
      className="border-b-[2px]"
      initial={false}
      transition={{ duration: 0.3 }}
    >
      <button
        className="flex justify-between items-center w-full py-4 cursor-pointer focus:outline-none"
        onClick={onClick}
        type="button"
      >
        <span className="text-lg md:text-xl font-semibold text-gray-900">
          {title}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Icon
            icon={open ? "f7:minus-square" : "f7:plus-square"}
            className={`w-5 h-5 text-gray-500 transition-transform`}
          />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={
          open
            ? { height: "auto", opacity: 1, marginTop: 8 }
            : { height: 0, opacity: 0, marginTop: 0 }
        }
        transition={{
          height: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
          opacity: { duration: 0.25 },
          marginTop: { duration: 0.2 },
        }}
        style={{ overflow: "hidden" }}
      >
        <div className="text-gray-600 pb-4">{children}</div>
      </motion.div>
    </motion.div>
  );
};

export default ApproachSection;
