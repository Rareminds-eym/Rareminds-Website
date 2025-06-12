import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail } from "lucide-react";
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
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center transform rotate-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Let's Begin a Conversation
          </h1>
          <p className="text-lg text-gray-600">
            Write us a note below, and we'll get back to you shortly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="font-medium text-lg text-gray-800">Dear Rareminds Team,</div>
            
            <div className="prose max-w-none">
              <p>
                I am{" "}
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="border-b-2 border-gray-300 focus:border-blue-500 px-2 py-1 outline-none inline-block w-48"
                  required
                  placeholder="Your Full Name"
                />
                {" "}currently working as a{" "}
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="border-b-2 border-gray-300 focus:border-blue-500 px-2 py-1 outline-none inline-block w-48"
                  required
                  placeholder="Your Job Title"
                />
                {" "}at{" "}
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="border-b-2 border-gray-300 focus:border-blue-500 px-2 py-1 outline-none inline-block w-48"
                  required
                  placeholder="Your Company"
                />
                .
              </p>

              <p className="mt-6">
                You can reach me at{" "}
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border-b-2 border-gray-300 focus:border-blue-500 px-2 py-1 outline-none inline-block w-48"
                  required
                  placeholder="Your Email"
                />
                , and if needed, at{" "}
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border-b-2 border-gray-300 focus:border-blue-500 px-2 py-1 outline-none inline-block w-48"
                  placeholder="Your Phone (Optional)"
                />
                .
              </p>

              <div className="mt-6">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full min-h-[120px] border-2 border-gray-300 rounded-lg p-4 outline-none focus:border-blue-500"
                  required
                  placeholder="I'd like to discuss..."
                />
              </div>

              <div className="mt-8 space-y-3">
                <p className="font-medium">I'm interested in discussing:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center space-x-3 p-3 rounded-lg border-2 border-gray-100 hover:border-blue-100 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.categories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <p>Looking forward to connecting with you.</p>
                <p className="mt-4">
                  Best regards,
                  <br />
                  {formData.fullName || "Your Name"}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  w-full sm:w-auto px-8 py-3 rounded-xl font-medium text-white
                  flex items-center justify-center space-x-2
                  transform transition-all duration-200
                  ${isSubmitting
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95'
                  }
                `}
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
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
