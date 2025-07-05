import { motion, AnimatePresence } from "framer-motion";
import { Phone, FileText, X } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ContactSection() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
    phone: "",
    message: "",
    facultyCount: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("fdp_requests")
      .insert([
        {
          name: formData.name,
          email: formData.email,
          institution: formData.institution,
          phone: formData.phone,
          facultyCount: formData.facultyCount,
          message: formData.message,
        },
      ]);

    if (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
      return;
    }

    setShowContactForm(false);
    setFormData({
      name: "",
      email: "",
      institution: "",
      phone: "",
      message: "",
      facultyCount: "",
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* === Sticky Bottom Buttons === */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 py-3 px-4 sm:px-8 z-50 shadow-lg"
      >
        <div className="container mx-auto flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowContactForm(true)}
            className="flex items-center justify-center gap-2 bg-[#222B33] text-white px-4 py-2 rounded-full text-base sm:text-sm w-full sm:w-auto cursor-pointer"
          >
            <Phone size={16} />
            Request Custom FDP
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSchedule(true)}
            className="flex items-center justify-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-base sm:text-sm w-full sm:w-auto cursor-pointer"
          >
            <FileText size={20} />
            View FDP Schedule
          </motion.button>
        </div>
      </motion.div>

       {/* Contact Form Modal */}
          <AnimatePresence>
            {showContactForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2"
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-white rounded-3xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
                >
                  <div className="p-6 bg-gradient-to-br from-gray-600 to-gray-900 rounded-t-2xl">
                    <div className="flex justify-between items-center">
                      <h3 className="text-medium font-bold text-white pl-[120px]">Request Custom FDP</h3>
                      <button
                        onClick={() => setShowContactForm(false)}
                        className="text-white hover:text-blue-200 transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleFormSubmit} className="p-8 space-y-2">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                        <input
                          type="text"
                          name="institution"
                          value={formData.institution}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Number of Faculty</label>
                      <input
                        type="number"
                        name="facultyCount"
                        value={formData.facultyCount}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={2}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        required
                      ></textarea>
                    </div>

                    <div className="text-center">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="mt-4 bg-[#222b33] text-white px-4 py-2 rounded-2xl font-medium text-sm"
                      >
                        Submit Request
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

      {/* Schedule Modal */}
      <AnimatePresence>
        {showSchedule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 bg-gradient-to-br from-gray-600 to-gray-900 rounded-t-2xl">
                <div className="flex justify-between items-center">
                  <h3 className="text-medium font-bold text-white pl-[120px]">Upcoming FDP Schedule</h3>
                  <button
                    onClick={() => setShowSchedule(false)}
                    className="text-white hover:text-blue-200 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-8">
                <div className="space-y-2">
                  {/* Add your schedule content here */}
                  <p className="text-center text-black text-sm">Schedule details coming soon...</p>
                </div>
                
                <div className="mt-1 text-center">
                  <p className="text-black text-sm">
                    Contact us for custom scheduling and group bookings
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowSchedule(false);
                      setShowContactForm(true);
                    }}
                    className="mt-4 bg-[#222b33] text-white px-4 py-2 rounded-2xl font-medium text-sm"
                  >
                    Request Custom Schedule
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
