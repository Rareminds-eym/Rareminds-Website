import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../../../components/Academy/UI/input";
import { Textarea } from "../../../components/Academy/UI/textarea";
import { supabase } from "../../../lib/supabase";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Icon } from "@iconify/react";
import { useToast } from "@/hooks/use-toast";

const AcademyContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
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
      // Insert data into Supabase
      const { error } = await supabase
        .from("academia_form")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            course_interest: formData.course,
            message: formData.message,
            submitted_at: new Date().toISOString(),
          },
        ]);      if (error) {
        console.error('Supabase error:', error.message, error.details, error.hint);
        throw error;
      }

      toast({
        title: "Inquiry Submitted!",
        description:
          "Thank you for your interest in our Academy. Our team will contact you shortly.",
      });

      setSubmitted(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        course: "",
        message: "",
      });

      if (formRef.current) formRef.current.reset();

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {      const supabaseError = error as any;
      console.error("Error submitting form:", {
        message: supabaseError.message,
        details: supabaseError.details,
        hint: supabaseError.hint,
        error: supabaseError
      });
      toast({
        title: "Error",
        description: "There was an error submitting your inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="academy-contact"
      className="section py-24 relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800 bg-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container mx-auto px-5 lg:px-14 relative z-10"
      >
        <div className="text-center mb-16">
          <div className="bg-red-600 text-white w-16 h-16 rounded-[25px] mx-auto mb-4 flex items-center justify-center transform rotate-6">
            <Send size={32} />
          </div>
          <h2 className="text-3xl md:text-5xl text-center font-bold mb-4 text-gray-800">
            Partner With Us
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg text-center">
            Take the first step towards your tech career with our specialized training programs
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
                  <span className="bg-red-600 w-10 h-10 rounded-full flex items-center justify-center text-white">
                    <Mail size={20} />
                  </span>
                  Request Course Information
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
                        htmlFor="phone"
                        className="block mb-2 font-medium text-gray-700"
                      >
                        Phone
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your phone number"
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
                        placeholder="name@example.com"
                        className="w-full bg-white/50 border-gray-200 text-gray-800 placeholder:text-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="course"
                        className="block mb-2 font-medium text-gray-700"
                      >
                        Course Interest
                      </label>
                      <Input
                        id="course"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        placeholder="Which course are you interested in?"
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
                      placeholder="Tell us about your learning goals or any questions you have"
                      className="w-full min-h-[120px] bg-white/50 border-gray-200 text-gray-800 placeholder:text-gray-400"
                      required
                    />
                  </div>

                  <div className="pt-4 pb-10">
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
                            className="bg-red-500  hover:bg-red-600 text-white font-medium py-3 px-6 rounded-xl transition-all flex items-center justify-center"
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
                                Get Course Info{" "}
                                <ArrowRight size={20} className="ml-2" />
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
                            Inquiry submitted successfully!
                          </p>
                          <p className="text-sm text-green-700 mt-1">
                            Our team will contact you with course details soon.
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
                 Get In Touch
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-indigo-100 text-red-600 p-3 rounded-xl">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-gray-800">
                        Helpline
                      </h4>
                      <p className="text-gray-600">+91 99023 26951</p>
                      {/* <p className="text-gray-600">+91 82960 61534</p> */}
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-indigo-100 text-red-600 p-3 rounded-xl">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-gray-800">
                        Email
                      </h4>
                      <p className="text-gray-600">info@rareminds.in</p>
                      {/* <p className="text-gray-600">training@rareminds.com</p> */}
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-indigo-100 text-red-600 p-3 rounded-xl">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-gray-800">
                        Address
                      </h4>
                      <p className="text-gray-600 max-w-[300px]">
                        Rareminds 231, 13th Cross Rd, 2nd Stage, Indira Nagar II Stage, Hoysala Nagar, Indiranagar,
                      </p>
                      <p className="text-gray-600">
                         Bengaluru, Karnataka 560038
                      </p>
                    </div>
                  </div>
                </div>
              </div>


               <div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-3xl px-8 py-7 shadow-xl flex flex-col items-center ">
                            <h3 className="text-xl font-bold mb-2 text-gray-800 flex items-center gap-2">
                              <Icon icon="mdi:share-variant" width={22} height={22} className="text-corporate-black" />
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
                                  href: "https://www.facebook.com/raremindsgroup",
                                  icon: "mdi:facebook",
                                  color: "#1877F3",
                                  label: "Facebook",
                                },
                                {
                                  href: "https://x.com/minds_rare",
                                  icon: "mdi:twitter",
                                  color: "#1DA1F2",
                                  label: "Twitter (X)",
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
                                    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
                                  }}
                                  whileHover={{ scale: 1.18, rotate: -6 }}
                                >
                                  <Icon icon={item.icon} width={item.size || 32} height={item.size || 32} style={{ color: item.color }} />
                                </motion.a>
                              ))}
                            </motion.div>
                          </div>

              {/* <div className="bg-black opacity-30 text-white rounded-3xl p-8 shadow-xl">
                <h3 className="text-xl font-bold mb-4">Why Choosen Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={20} className="mt-1 flex-shrink-0" />
                    <span>Industry-relevant curriculum</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={20} className="mt-1 flex-shrink-0" />
                    <span>Experienced instructors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={20} className="mt-1 flex-shrink-0" />
                    <span>Placement assistance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={20} className="mt-1 flex-shrink-0" />
                    <span>Hands-on practical training</span>
                  </li>
                </ul>
              </div> */}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AcademyContactSection;
