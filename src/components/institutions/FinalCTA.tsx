import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, School, FileDown, X, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient'; // adjust path as needed
import { useState } from 'react';
export default function FinalCTA() {
  const [showScheduler, setShowScheduler] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    university: '',
    phone: '',
    date: '',
    time: ''
  });



  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const { name, university, phone, date, time } = formData;
  
    const { error } = await supabase.from('demo_bookings').insert([
      { name, university, phone, date, time }
    ]);
  
    if (error) {
      console.error('Error submitting demo:', error.message);
      alert('Something went wrong. Please try again.');
      return;
    }
  
    console.log('Schedule submitted:', formData);
    setShowScheduler(false);
    setFormData({
      name: '',
      university: '',
      phone: '',
      date: '',
      time: ''
    });
  
    alert('Demo successfully scheduled!');
  };
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const [showDownloads, setShowDownloads] = useState(false);

  return (
    <>
      <section className="py-12 bg-[#222B33] text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-xl mb-4 font-bold  bg-clip-text text-opacity-5 ">
              Let's Turn Your Classrooms into Career Labs.
            </h1>
            <p className="text- text-blue-100 mb-12 mx-auto">
              Results don't wait. Neither should you.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+919902326951"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 bg-white text-blue-900  py-3 rounded-xl font-normal hover:bg-blue-50 transition-colors text-sm"
              >
                <PhoneCall size={20} />
                Talk to a Training <br />Strategist
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowScheduler(true)}
                className="flex items-center justify-center gap-1 bg-[#1E40AF4D]  text-white  py-3 rounded-xl font-medium hover:bg-blue-500/30 transition-colors text-sm"
              >
                <School size={20} />
                Book a Free <br />University Demo
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDownloads(true)}
                className="flex items-center justify-center gap-1 bg-[#4B5563] border-2 border-white  py-3 rounded-xl font-medium hover:bg-white/10 transition-colors text-sm"
              >
                <FileDown size={20} />
                Download Our Results <br /> Pack
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scheduler Modal */}
      <AnimatePresence>
        {showScheduler && (
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
              className="bg-white rounded-2xl shadow-xl max-w-md w-full"
            >
              <div className="p-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-t-2xl">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-white">Schedule Demo</h3>
                  <button
                    onClick={() => setShowScheduler(false)}
                    className="text-white hover:text-blue-200 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleScheduleSubmit} className="p-6 space-y-4">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">University Name</label>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold mt-6"
                >
                  <Calendar className="inline-block mr-2 h-5 w-5" />
                  Schedule Demo
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
  {showDownloads && (
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
        className="bg-white rounded-2xl shadow-xl max-w-md w-full"
      >
        <div className="p-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-t-2xl flex justify-between items-center">
          <h3 className="text-2xl font-bold text-white">Results Pack</h3>
          <button
            onClick={() => setShowDownloads(false)}
            className="text-white hover:text-blue-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <a
            href="/institutions/pdfs/Vels.pdf"
            download
            className="block w-full px-4 py-3 text-center rounded-lg bg-blue-100 text-blue-800 font-semibold hover:bg-blue-200 transition-colors"
          >
            📄 VELS University Case Study
          </a>

          {/* You can duplicate this for more PDFs */}
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </>
  );
}