
import { motion } from "framer-motion";
import { TestimonialCard } from "./TestimonialCard";
import { TestimonialCardsProps } from "@/types/partnerships";

export const TestimonialContent = ({ trainer, student }: TestimonialCardsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-1 flex-col justify-center gap-4 sm:gap-6"
    >
      <TestimonialCard data={trainer} />
      <TestimonialCard data={student} />
    </motion.div>
  );
};
