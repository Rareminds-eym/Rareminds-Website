import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "./input";
import { Textarea } from "./textarea";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  ArrowRight,
  School,
  Contact,
   PhoneCall,} from "lucide-react";
import { Icon } from "@iconify/react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    role: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description:
          "Thank you for reaching out. Our team will contact you shortly.",
      });

      setSubmitted(true);
      setIsSubmitting(false);

      setTimeout(() => {
        setFormData({
          name: "",
          company: "",
          email: "",
          role: "",
          message: "",
        });
        setSubmitted(false);
        if (formRef.current) formRef.current.reset();
      }, 3000);
    }, 1500);
  };

  return (
    <section className="section py-12 relative overflow-hidden bg-gradient-to-br from-blue-50 via-pink-30 to-purple-30 text-gray-800 "
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-xl font-bold mb-4 bg-black bg-clip-text text-transparent">
            Partner With Us
          </h1>
          <p className="text-sm text-gray-600 mx-auto">
             Results don't Wait , Neither Should You.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 px-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-gray-50 backdrop-blur-sm border border-white/30 rounded-3xl overflow-hidden shadow-xl">
              <div className="p-8">
                <h3 className="text-lg font-semibold mb-10 flex items-center gap-3 text-gray-800">
                  
                    <School size={20} />
                  
                      Book A Free University Demo Now. 
                </h3>

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-4 font-medium text-gray-700 text-sm"
                      >
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="w-full bg-white/50 border-gray-200 text-gray-800 placeholder:text-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="company"
                        className="block mb-4 font-medium text-gray-700 text-sm"
                      >
                        University Name
                      </label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company Name"
                        className="w-full bg-white/50 border-gray-200 text-gray-800 placeholder:text-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-4 font-medium text-gray-700 text-sm"
                      >
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@university.com"
                        className="w-full bg-white/50 border-gray-200 text-gray-800 placeholder:text-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="role"
                        className="block mb-4 font-medium text-gray-700 text-sm"
                      >
                        Role to Hire
                      </label>
                      <Input
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="Job Title/Position"
                        className="w-full bg-white/50 border-gray-200 text-gray-800 placeholder:text-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block mb-4 font-medium text-gray-700 text-sm"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your hiring needs or challenges"
                      className="w-full min-h-[120px] bg-white/50 border-gray-200 text-gray-800 placeholder:text-gray-400"
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <AnimatePresence mode="wait">
                      {!submitted ? (
                        <motion.div
                          key="button"
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center px-4 py-2 bg-blue-900 text-white rounded-full font-medium shadow-md transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs "
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
                                <Send size={20} className="mr-2" />
                                Submit Request
                              </>
                            )}
                          </button>

                                <motion.a
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  href="tel:+919902326951"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-4 py-2 bg-white text-blue-900 border border-blue-900 rounded-full font-medium shadow-md hover:bg-blue-50 transition-colors text-xs"
                                >
                                  <PhoneCall size={20} />
                                  Talk to a Strategist
                                </motion.a>
                              </motion.div>
                            ) : (
                              <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-green-100 border border-green-300 rounded-xl p-4 text-center"
                              >
                                <CheckCircle2 size={32} className="mx-auto mb-2 text-green-600" />
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
            className="lg:col-span-2"
          >
            <div className="h-full flex flex-col justify-between gap-6">
              <div className="bg-gray-50 backdrop-blur-sm border border-white/30 rounded-3xl p-8 shadow-xl">
                <h3 className="text-lg font-semibold mb-9 flex items-center gap-3 text-gray-800">
                  
                    <Contact size={20} />
                  
                      Get In Touch. 
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 rounded-full p-2">
                      <Phone size={20} className="text-blue-900" />
                    </div>
                    <div>
                      <h4 className=" mb-4 text-gray-800 text-sm font-semibold">
                        Phone
                      </h4>
                      <p className="text-gray-600 text-sm font-medium">+91 95624 81100</p>
                      <p className="text-gray-600 text-sm font-medium">+91 82960 61534</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 rounded-full p-2">
                      <Mail size={20} className="text-blue-900"/>
                    </div>
                    <div>
                      <h4 className="mb-4 text-gray-800 text-sm font-semibold">
                        Email
                      </h4>
                      <p className="text-gray-600 text-sm font-medium">info@rareminds.com</p>
                      <p className="text-gray-600 text-sm font-medium">careers@rareminds.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 rounded-full p-2">
                      <MapPin size={20} className="text-blue-900"/>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4 text-gray-800 text-sm">
                        Address
                      </h4>
                      <p className="text-gray-600 max-w-[300px] text-sm font-medium">
                        231, 2nd stage, 13th Cross Road, Hoysala Nagar,
                        Indiranagar
                      </p>
                      <p className="text-gray-600 text-sm font-medium">
                        Bengaluru, Karnataka 560001
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
