import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Icon } from "@iconify/react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // First, insert into Supabase
      const submission = {
        name: formData.name,
        company: formData.company,
        email: formData.email,
        role: formData.role,
        message: formData.message,
        submitted_at: new Date().toISOString(),
      };

      const { error: dbError, data } = await supabase
        .from("recruitment_forms")
        .insert([submission])
        .select()
        .single();

      if (dbError) {
        console.error("Supabase database error:", {
          message: dbError.message,
          details: dbError.details,
          hint: dbError.hint,
        });
        throw dbError;
      }

      // Then, trigger the email function
      const { error: functionError } = await supabase.functions.invoke(
        "send-recruitment-email",
        {
          body: { record: data },
        }
      );

      if (functionError) {
        console.error("Supabase function error:", functionError);
        throw functionError;
      }

      toast({
        title: "Message Sent!",
        description:
          "Thank you for reaching out. Our team will contact you shortly.",
      });

      setSubmitted(true);
      setFormData({
        name: "",
        company: "",
        email: "",
        role: "",
        message: "",
      });

      if (formRef.current) formRef.current.reset();

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      const supabaseError = error as any;
      console.error("Error submitting form:", {
        message: supabaseError.message,
        details: supabaseError.details,
        hint: supabaseError.hint,
        error: supabaseError,
      });
      toast({
        title: "Error",
        description: `There was an error submitting your message.\n${
          supabaseError.message || ""
        }\n${supabaseError.details || ""}\n${supabaseError.hint || ""}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section py-24 relative overflow-hidden bg-gradient-to-br from-blue-50 to-red-50 text-gray-800 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container mx-auto px-5 lg:px-14 relative z-10"
      >
        <div className="text-center mb-16">
          <div className="bg-corporate-black text-white w-16 h-16 rounded-[25px] mx-auto mb-4 flex items-center justify-center transform rotate-6">
            <Send size={32} />
          </div>
          <h2 className="text-3xl md:text-5xl text-center font-bold mb-4 text-corporate-black">
            Partner with Us
          </h2>
          <p className="text-corporate-grey max-w-3xl mx-auto text-lg text-center">
            Whether you're hiring 5 or 500, we'll help you get it right
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-3xl overflow-hidden shadow-xl">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800">
                  <span className="bg-corporate-black w-10 h-10 rounded-full flex items-center justify-center text-white">
                    <Mail size={20} />
                  </span>
                  Request Talent Now
                </h3>

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 font-medium text-gray-700"
                      >
                        Your Name
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
                        className="block mb-2 font-medium text-gray-700"
                      >
                        Company
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
                        className="block mb-2 font-medium text-gray-700"
                      >
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@company.com"
                        className="w-full bg-white/50 border-gray-200 text-gray-800 placeholder:text-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="role"
                        className="block mb-2 font-medium text-gray-700"
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
                      className="block mb-2 font-medium text-gray-700"
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

                  <div className="pt-4">
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
                            className="corporate-btn-1"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <span className="flex items-center">
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
                              </span>
                            ) : (
                              <span className="flex items-center">
                                Request Talent{" "}
                                <Icon
                                  icon="cil:arrow-right"
                                  height={20}
                                  width={20}
                                  className="ml-2"
                                />
                              </span>
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
            className="lg:col-span-2"
          >
            <div className="h-full flex flex-col justify-between gap-6">
              <div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">
                  Get in Touch
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-corporate-black/10 text-corporate-black p-3 rounded-xl">
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
                    <div className="bg-corporate-black/10 text-corporate-black p-3 rounded-xl">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-gray-800">
                        Email
                      </h4>
                      <p className="text-gray-600">info@rareminds.in</p>
                      <p className="text-gray-600">careers@rareminds.in</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-corporate-black/10 text-corporate-black p-3 rounded-xl">
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
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-3xl px-8 py-7 shadow-xl">
                <h3 className="text-xl font-bold mb-2 text-gray-800 flex items-center gap-2">
                  <Icon
                    icon="mdi:share-variant"
                    width={22}
                    height={22}
                    className="text-corporate-black"
                  />
                  Follow Us
                </h3>
                <motion.div
                  className="flex items-center gap-4 mt-2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.12 } },
                  }}
                >
                  {[
                    {
                      href: "https://www.linkedin.com/company/rareminds/",
                      icon: "mdi:linkedin",
                      color: "#0A66C2",
                      label: "LinkedIn",
                    },
                    {
                      href: "https://www.instagram.com/rareminds_eym/",
                      icon: "mdi:instagram",
                      color: "#E4405F",
                      label: "Instagram",
                    },
                    {
                      href: "https://www.facebook.com/people/RaremindsHR/61576026163390/",
                      icon: "mdi:facebook",
                      color: "#1877F3",
                      label: "Facebook",
                    },
                    {
                      href: "https://x.com/minds_rare",
                      icon: "ri:twitter-x-fill",
                      color: "#1A1A1A",
                      label: "X (Twitter)",
                    },
                    {
                      href: "https://www.youtube.com/channel/UClkBtwJsScYxFzNoFdlifeA",
                      icon: "mdi:youtube",
                      color: "#FF0000",
                      label: "YouTube",
                      size: 40,
                    },
                  ].map((item) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="hover:scale-110 transition-transform"
                      variants={{
                        hidden: { opacity: 0, y: 24 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 24,
                          },
                        },
                      }}
                      whileHover={{ scale: 1.18, rotate: -6 }}
                    >
                      <Icon
                        icon={item.icon}
                        width={item.size || 32}
                        height={item.size || 32}
                        style={{ color: item.color }}
                      />
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
