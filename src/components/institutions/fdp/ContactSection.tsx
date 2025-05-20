import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Calendar, X } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; 

export default function ContactSection() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    phone: '',
    message: '',
    facultyCount: ''
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  
    const { data, error } = await supabase
      .from('fdp_requests') // Replace with your actual table name
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
      console.error('Supabase insert error:', error.message);
      alert('Something went wrong. Please try again.');
      return;
    }
  
    console.log('Data saved to Supabase:', data);
    setShowContactForm(false);
    setFormData({
      name: '',
      email: '',
      institution: '',
      phone: '',
      message: '',
      facultyCount: ''
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <section className="py-24 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-4xl font-bold mb-6">Partner With Us</h2>
              <p className="text-xl text-blue-200">
                Want to upskill 50–500 faculty across departments?
                Need outcome-based FDPs that also uplift student outcomes?
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-6">
              <motion.button
                onClick={() => setShowContactForm(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-900 px-8 py-4 rounded-full font-semibold flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Request Custom FDP
              </motion.button>
              
              <motion.button
                onClick={() => setShowSchedule(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-800/30 backdrop-blur-sm border border-blue-400/30 px-8 py-4 rounded-full font-semibold flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                View FDP Schedule
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-t-2xl">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-white">Request Custom FDP</h3>
                  <button
                    onClick={() => setShowContactForm(false)}
                    className="text-white hover:text-blue-200 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold"
                >
                  Submit Request
                </motion.button>
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-t-2xl">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-white">Upcoming FDP Schedule</h3>
                  <button
                    onClick={() => setShowSchedule(false)}
                    className="text-white hover:text-blue-200 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {/* Add your schedule content here */}
                  <p className="text-center text-gray-600">Schedule details coming soon...</p>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Contact us for custom scheduling and group bookings
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowSchedule(false);
                      setShowContactForm(true);
                    }}
                    className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold"
                  >
                    Request Custom Schedule
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}