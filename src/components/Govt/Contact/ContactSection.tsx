import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { supabase } from "../../../lib/supabaseClient";

import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Facebook,
  Twitter,
  Youtube,
} from "lucide-react";
import { Icon } from "@iconify/react";
import { useToast } from "../../../hooks/use-toast";
import { AiFillYoutube,AiFillLinkedin } from "react-icons/ai";
import { FaXTwitter,FaFacebookF } from "react-icons/fa6";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Add timestamp and format data with correct column names
      const submission = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        message: formData.message.trim(),
        submitted_at: new Date().toISOString(),
      };


      const { error, data } = await supabase
        .from('government_form')
        .insert([submission])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        toast({
          title: "Database Error",
          description: `Error: ${error.message}`,
        });
        throw error;
      }

      const emailResponse = await fetch(
      'https://itvhjkgfafikpqmuunlh.supabase.co/functions/v1/Government_email_function',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          record: submission // Your function expects a 'record' property
        }),
      }
    );

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      console.error('Email function error:', errorData);
      // Optional: Log this error to your error tracking system
    }

      toast({
        title: "Message Sent!",
        description:
          "Thank you for reaching out. Our team will contact you shortly.",
      });

      setSubmitted(true);

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          message: "",
        });
        setSubmitted(false);
        if (formRef.current) formRef.current.reset();
      }, 3000);

    } catch (error) {
      console.error('Full error details:', error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="section py-4 md:py-8 relative overflow-hidden  text-gray-800 bg-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container mx-auto px-5 lg:px-14 relative z-10"
      >

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex"
          >
            <div className="md:bg-gray-50 backdrop-blur-sm border border-white/30 rounded-3xl overflow-hidden shadow-xl w-full">
              <div className="p-4 md:p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800">
                  <span className="bg-black w-10 h-10 rounded-full flex items-center justify-center text-white">
                    <Mail size={20} />
                  </span>
                  Contact Us
                </h3>

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 text-sm md:text-base gap-4 md:gap-6">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block mb-2 font-medium text-gray-700"
                      >
                        Full Name*
                      </label>
                      <Input
                        id="fullName"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-white/50 border-gray-200 text-gray-800 placeholder:text-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 font-medium text-gray-700"
                      >
                        Email Address*
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john.doe@example.com"
                        className="w-full bg-white/50 border-gray-200 text-gray-800 placeholder:text-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 text-sm md:text-base md:grid-cols-2 gap-3 md:gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block mb-2 font-medium text-gray-700"
                      >
                        Phone Number*
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full bg-white/50 border-gray-200 text-gray-800 placeholder:text-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="address"
                        className="block mb-2 font-medium text-gray-700"
                      >
                        Address
                      </label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Address"
                        className="w-full bg-white/50 border-gray-200 text-gray-800 placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="text-sm md:text-base">
                    <label
                      htmlFor="message"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      Message*
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please tell us how we can help you..."
                      className="w-full min-h-[170px] bg-white/50 border-gray-200 text-gray-800 placeholder:text-gray-400"
                      required
                    />
                  </div>

                  <div className="pt-0">
                    <AnimatePresence mode="wait">
                      {!submitted ? (
                        <motion.div
                          key="button"
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col sm:flex-row gap-4 flex-wrap"
                        >
                          <button
                            type="submit"
                            className="flex items-center px-6 shadow-xl shadow-red-400/40 border-2 border-red-300 py-3 bg-gradient-to-br from-red-400 to-red-600 rounded-full text-white hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <svg
                                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Sending...
                              </>
                            ) : (
                              <>
                                Submit{" "}
                                <Icon
                                  icon="cil:arrow-right"
                                  height={20}
                                  width={20}
                                  className="ml-2 animate-pulse"
                                />
                              </>
                            )}
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-green-100 border border-green-300 rounded-xl p-4 text-center"
                        >
                          <CheckCircle2
                            size={32}
                            className="mx-auto mb-2 text-green-600"
                          />
                          <p className="font-medium text-green-800">
                            Message sent successfully!
                          </p>
                          <p className="text-sm text-green-700 mt-1">
                            Our team will contact you shortly.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex"
          >
            <div className="md:bg-gray-50 backdrop-blur-sm border border-white/30 rounded-3xl shadow-xl w-full">
              <div className="p-4 md:p-8 h-full flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">
                  Get in Touch
                </h3>
                <div className="space-y-6 flex-1">
                  <div className="flex items-start gap-4">
                    <div className="bg-black/10 text-black p-3 rounded-xl">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-gray-800">
                        Phone
                      </h4>
                      <p className="ttext-sm md:text-base text-gray-600">+91 82960 61534</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-black/10 text-black p-3 rounded-xl">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-gray-800">
                        Email
                      </h4>
                      <p className="text-sm md:text-base text-gray-600">info@rareminds.in</p>
                      <p className="text-sm md:text-base text-gray-600">careers@rareminds.in</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-black/10 text-black p-3 rounded-xl">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-gray-800">
                        Address
                      </h4>
                      <p className="text-sm md:text-base text-gray-600 max-w-[300px]">
                        231, 2nd stage, 13th Cross Road, Hoysala Nagar,
                        Indiranagar
                      </p>
                      <p className="text-gray-600">
                        Bengaluru, Karnataka 560001
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-base md:text-xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                    <span className="bg-black w-8 h-8 rounded-full flex items-center justify-center text-white">
                      <Icon icon="mdi:web" className="text-lg" />
                    </span>
                    Connect With Us
                  </h4>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                    <a
                      href="https://www.facebook.com/raremindsgroup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center group bg-gray-100 p-3 sm:p-4 rounded-2xl"
                    >
                      <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center">
                        <FaFacebookF className="w-5 h-5 sm:w-7 sm:h-7 text-[#1877F2] group-hover:rotate-12 group-hover:scale-125 transition-all duration-300"/>
                      </div>
                      <span className="mt-1 sm:mt-2 text-xs sm:text-sm font-medium text-gray-600 group-hover:-translate-y-3 group-hover:bg-blue-600 group-hover:text-white group-hover:rounded-full group-hover:px-2 sm:group-hover:px-4 px-2 sm:px-4 py-0.5 sm:py-1 group-hover:py-0.5 sm:group-hover:py-1 transition-all duration-300 whitespace-nowrap">Facebook</span>
                    </a>
                    <a
                      href="https://x.com/minds_rare"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center group bg-gray-100 p-3 sm:p-4 rounded-2xl"
                    >
                      <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center">
                        <FaXTwitter className="w-5 h-5 sm:w-7 sm:h-7 group-hover:rotate-12 group-hover:scale-125 transition-all duration-300"/>
                      </div>
                      <span className="mt-1 sm:mt-2 text-xs sm:text-sm font-medium text-gray-600 group-hover:-translate-y-3 group-hover:bg-black group-hover:text-white group-hover:rounded-full group-hover:px-2 sm:group-hover:px-4 px-2 sm:px-4 py-0.5 sm:py-1 group-hover:py-0.5 sm:group-hover:py-1 transition-all duration-300 whitespace-nowrap">Twitter</span>
                    </a>
                    <a
                      href="https://www.youtube.com/channel/UClkBtwJsScYxFzNoFdlifeA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center group bg-gray-100 p-3 sm:p-4 rounded-2xl"
                    >
                      <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center">
                        <AiFillYoutube className="w-7 h-7 sm:w-10 sm:h-10 text-[#FF0000] group-hover:rotate-12 group-hover:scale-125 transition-all duration-300"/>
                      </div>
                      <span className="mt-1 sm:mt-2 text-xs sm:text-sm font-medium text-gray-600 group-hover:-translate-y-3 group-hover:bg-[#FF0000] group-hover:text-white group-hover:rounded-full group-hover:px-2 sm:group-hover:px-4 px-2 sm:px-4 py-0.5 sm:py-1 group-hover:py-0.5 sm:group-hover:py-1 transition-all duration-300 whitespace-nowrap">YouTube</span>
                    </a>
                    <a
                      href="https://linkedin.com/company/rareminds"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center group bg-gray-100 p-3 sm:p-4 rounded-2xl"
                    >
                      <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center">
                        <AiFillLinkedin className="w-7 h-7 sm:w-10 sm:h-10 text-[#0A66C2] group-hover:rotate-12 group-hover:scale-125 transition-all duration-300"/>
                      </div>
                      <span className="mt-1 sm:mt-2 text-xs sm:text-sm font-medium text-gray-600 group-hover:-translate-y-3 group-hover:bg-[#0A66C2] group-hover:text-white group-hover:rounded-full group-hover:px-2 sm:group-hover:px-4 px-2 sm:px-4 py-0.5 sm:py-1 group-hover:py-0.5 sm:group-hover:py-1 transition-all duration-300 whitespace-nowrap">LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;