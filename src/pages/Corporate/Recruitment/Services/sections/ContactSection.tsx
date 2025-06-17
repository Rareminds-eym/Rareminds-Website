import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

interface ContactSectionProps {
  title?: string;
  description?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  title,
  description,
}) => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full py-24 bg-yellow-400 bg-[repeating-linear-gradient(45deg,#facc15_0,#facc15_2px,transparent_2px,transparent_6px)] overflow-hidden">
      {/* Decorative Boxes */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-[url('https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/service/blocks.png')]"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-[url('https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/service/blocks.png')]"></div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-extrabold text-black mb-6"
        >
          {title || "Scaling issues, skill gaps, or slow hiring cycles?"}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base md:text-lg text-black font-medium mb-8"
        >
          {description || ""}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            to="/corporate/recruitment/contact"
            className="inline-block px-8 py-3 bg-black text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
