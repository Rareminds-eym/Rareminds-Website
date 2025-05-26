import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { supabase } from "@/lib/supabaseClient";
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
import { useToast } from "@/hooks/use-toast";

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

    console.log('Form submission started with data:', formData);

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

      console.log('Submitting to Supabase:', submission);

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

      console.log('Submission successful:', data);

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
      className="section py-24 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-200 text-gray-800 bg-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container mx-auto px-5 lg:px-14 relative z-10"
      >

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-1 h-full"
          >
            <div className="bg-gray-50 backdrop-blur-sm border border-white/30 rounded-3xl overflow-hidden shadow-xl h-full">
              <div className="p-8">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <div>
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
                      className="w-full min-h-[120px] bg-white/50 border-gray-200 text-gray-800 placeholder:text-gray-400"
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
                            className="flex items-center px-6 py-3 bg-red-500 rounded-full text-white shadow-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
            className="lg:col-span-1"
          >
            <div className="h-full flex flex-col justify-between gap-6">
              <div className="bg-gray-50 backdrop-blur-sm border border-white/30 rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">
                  Get in Touch
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-black/10 text-black p-3 rounded-xl">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-gray-800">
                        Phone
                      </h4>
                      <p className="text-gray-600">+91 95624 81100</p>
                      <p className="text-gray-600">+91 82960 61534</p>
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
                      <p className="text-gray-600">info@rareminds.com</p>
                      <p className="text-gray-600">careers@rareminds.com</p>
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
                      <p className="text-gray-600 max-w-[300px]">
                        231, 2nd stage, 13th Cross Road, Hoysala Nagar,
                        Indiranagar
                      </p>
                      <p className="text-gray-600">
                        Bengaluru, Karnataka 560001
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-gray-200 pt-8 h-full">
                  <h4 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                    <span className="bg-black w-8 h-8 rounded-full flex items-center justify-center text-white">
                      <Icon icon="mdi:web" className="text-lg" />
                    </span>
                    Connect With Us
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <a
                      href="https://facebook.com/rareminds"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center p-4 bg-black/5 rounded-2xl hover:bg-black/10 transition-colors group"
                    >
                      <Facebook size={28} className="text-gray-600 group-hover:text-blue-600 transition-colors" />
                      <span className="mt-2 text-sm font-medium text-gray-600 group-hover:text-gray-800">Facebook</span>
                    </a>
                    <a
                      href="https://twitter.com/rareminds"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center p-4 bg-black/5 rounded-2xl hover:bg-black/10 transition-colors group"
                    >
                      <Twitter size={28} className="text-gray-600 group-hover:text-blue-400 transition-colors" />
                      <span className="mt-2 text-sm font-medium text-gray-600 group-hover:text-gray-800">Twitter</span>
                    </a>
                    <a
                      href="https://youtube.com/rareminds"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center p-4 bg-black/5 rounded-2xl hover:bg-black/10 transition-colors group"
                    >
                      <Youtube size={28} className="text-gray-600 group-hover:text-red-600 transition-colors" />
                      <span className="mt-2 text-sm font-medium text-gray-600 group-hover:text-gray-800">YouTube</span>
                    </a>
                    <a
                      href="https://linkedin.com/company/rareminds"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center p-4 bg-black/5 rounded-2xl hover:bg-black/10 transition-colors group"
                    >
                      <Icon icon="mdi:linkedin" className="text-3xl text-gray-600 group-hover:text-blue-700 transition-colors" />
                      <span className="mt-2 text-sm font-medium text-gray-600 group-hover:text-gray-800">LinkedIn</span>
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
