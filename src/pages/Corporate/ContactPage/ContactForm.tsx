import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, PenTool } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  fullName: string;
  jobTitle: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  categories: string[];
}

const defaultFormData: FormData = {
  fullName: "",
  jobTitle: "",
  company: "",
  email: "",
  phone: "",
  message: "",
  categories: [],
};

const categories = [
  "Corporate Hiring Solutions",
  "Training & Upskilling Services",
  "Campus Engagements",
  "Government Collaboration",
  "Partnership or Collaboration",
  "Other Curious Things",
];

const ContactForm: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submission = {
        ...formData,
        categories: formData.categories.join(", "),
        submitted_at: new Date().toISOString(),
      };

      const { error: dbError, data } = await supabase
        .from("contact_forms")
        .insert([submission])
        .select()
        .single();

      if (dbError) throw dbError;

      // Send email notification
      const { error: functionError } = await supabase.functions.invoke(
        "send-contact-email",
        {
          body: { record: data },
        }
      );

      if (functionError) throw functionError;

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll contact you shortly.",
      });

      // Reset form
      setFormData(defaultFormData);
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100/30 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-100/30 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-100/20 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 6 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-blue-500/25"
          >
            <Mail className="w-7 h-7 text-white" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 tracking-tight"
          >
            Craft Your Message
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed"
          >
            Share your thoughts in this digital letter, and we'll respond with care.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Letter paper effect */}
          <div className="absolute inset-0 bg-white rounded-2xl shadow-xl transform rotate-1"></div>
          <div className="absolute inset-0 bg-white rounded-2xl shadow-lg transform -rotate-1"></div>
          
          {/* Main letter container */}
          <div className="relative bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100/50 backdrop-blur-sm">
            {/* Letter header with decorative line */}
            <div className="text-center mb-6 pb-4 border-b border-gray-200/50">
              <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto mb-3"></div>
              <h2 className="text-lg text-gray-800 italic">A Personal Note</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Letter greeting */}
              <motion.div 
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg font-medium text-gray-800 border-l-3 border-blue-500 pl-4 bg-blue-50/30 py-3 rounded-r-lg"
              >
                Dear Rareminds Team,
              </motion.div>
              
              {/* Letter body */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="prose max-w-none text-base leading-relaxed space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-3 text-gray-700 leading-relaxed">
                    <span>I am</span>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="border-0 border-b-2 border-dotted border-blue-300 focus:border-blue-600 bg-transparent px-2 py-1 outline-none font-medium text-blue-900 placeholder-blue-400/60 transition-all duration-300 hover:bg-blue-50/50 focus:bg-blue-50/50 rounded-t-md min-w-[220px] max-w-[260px] flex-shrink-0"
                      required
                      placeholder="your name"
                    />
                    <span>, working as a</span>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className="border-0 border-b-2 border-dotted border-blue-300 focus:border-blue-600 bg-transparent px-2 py-1 outline-none font-medium text-blue-900 placeholder-blue-400/60 transition-all duration-300 hover:bg-blue-50/50 focus:bg-blue-50/50 rounded-t-md min-w-[220px] max-w-[260px] flex-shrink-0"
                      required
                      placeholder="your role"
                    />
                    <span>at</span>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="border-0 border-b-2 border-dotted border-blue-300 focus:border-blue-600 bg-transparent px-2 py-1 outline-none font-medium text-blue-900 placeholder-blue-400/60 transition-all duration-300 hover:bg-blue-50/50 focus:bg-blue-50/50 rounded-t-md min-w-[220px] max-w-[260px] flex-shrink-0"
                      required
                      placeholder="your company"
                    />
                    <span>.</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-2 gap-y-3 text-gray-700 leading-relaxed">
                    <span>Reach me at</span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border-0 border-b-2 border-dotted border-blue-300 focus:border-blue-600 bg-transparent px-2 py-1 outline-none font-medium text-blue-900 placeholder-blue-400/60 transition-all duration-300 hover:bg-blue-50/50 focus:bg-blue-50/50 rounded-t-md min-w-[200px] flex-shrink-0"
                      required
                      placeholder="your.email@domain.com"
                    />
                    <span>, or at</span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border-0 border-b-2 border-dotted border-blue-300 focus:border-blue-600 bg-transparent px-2 py-1 outline-none font-medium text-blue-900 placeholder-blue-400/60 transition-all duration-300 hover:bg-blue-50/50 focus:bg-blue-50/50 rounded-t-md min-w-[140px] flex-shrink-0"
                      placeholder="phone (optional)"
                    />
                    <span>.</span>
                  </div>
                </div>

                {/* Message section with elegant styling */}
                <div className="mt-6 space-y-3">
                  <p className="text-gray-700 font-medium">Here's what I'd like to share:</p>
                  <div className="relative">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full min-h-[100px] border-2 border-gray-200 rounded-xl p-4 outline-none focus:border-blue-500 resize-none transition-all duration-300 bg-gradient-to-br from-gray-50/50 to-blue-50/30 leading-relaxed shadow-inner"
                      required
                      placeholder="I'd like to discuss..."
                    />
                    <div className="absolute top-3 right-3 text-blue-300">
                      <PenTool className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Categories section with modern card design */}
                <div className="mt-8 space-y-4">
                  <p className="font-medium text-gray-800">I'm interested in:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {categories.map((category, index) => (
                      <motion.label
                        key={category}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                        className={`
                          flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 group
                          ${formData.categories.includes(category)
                            ? 'border-blue-500 bg-blue-50 shadow-md shadow-blue-500/10'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                          }
                        `}
                      >
                        <div className={`
                          w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300
                          ${formData.categories.includes(category)
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300 group-hover:border-blue-400'
                          }
                        `}>
                          {formData.categories.includes(category) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-1.5 h-1.5 bg-white rounded-full"
                            />
                          )}
                        </div>
                        <input
                          type="checkbox"
                          checked={formData.categories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                          className="sr-only"
                        />
                        <span className="text-sm text-gray-700 font-medium group-hover:text-blue-700 transition-colors duration-300">
                          {category}
                        </span>
                      </motion.label>
                    ))}
                  </div>
                </div>

                {/* Letter closing */}
                <div className="mt-8 pt-4 border-t border-gray-200/50 space-y-3 text-gray-700">
                  <p>Looking forward to connecting with you.</p>
                  <div className="flex justify-between items-end mt-4">
                    <div>
                      <p className="mb-1">Best regards,</p>
                      <p className="font-semibold text-lg text-blue-900">
                        {formData.fullName || "Your Name"}
                      </p>
                    </div>
                    <div className="text-right text-xs text-gray-500">
                      <p>{new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Send button with elegant design */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="pt-6 border-t border-gray-100 flex justify-center"
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    group relative px-8 py-3 rounded-xl font-medium text-white
                    flex items-center justify-center space-x-2 overflow-hidden
                    transform transition-all duration-300 shadow-lg
                    ${isSubmitting
                      ? 'bg-blue-400 cursor-not-allowed scale-95'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 hover:scale-105 hover:shadow-xl active:scale-95'
                    }
                  `}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin w-5 h-5 text-white"
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
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                      <span>Send Letter</span>
                    </>
                  )}
                </button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
