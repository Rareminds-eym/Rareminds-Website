
import React from "react";
import { motion } from "framer-motion";
import {
  Phone,
  FileText,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
const FooterBar: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} Rareminds. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default FooterBar;
