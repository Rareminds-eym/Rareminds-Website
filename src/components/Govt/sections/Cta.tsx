import React from "react";
import { motion } from 'framer-motion';
import {
  Phone, FileText, Mail, MapPin,
  Facebook, Twitter, Linkedin, Instagram
} from 'lucide-react';

export const Cta = () => {
    return (
        
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 py-3 px-4 sm:px-8 z-50 shadow-lg"
      >
        <div className="container mx-auto flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 bg-[#222B33] text-white px-4 py-2 rounded-full text-base sm:text-sm w-full sm:w-auto"
            href="tel:+919902326951"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Phone size={16} />
            Book a Demo
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-base sm:text-sm w-full sm:w-auto"
          >
            <FileText size={20} />
            Download Course List
          </motion.a>
        </div>
      </motion.div>
    )
 }