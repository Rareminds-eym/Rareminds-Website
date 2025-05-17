import { motion } from 'framer-motion';
import { useState } from 'react';

export default function InstitutionalEnquiry() {
  const [formData, setFormData] = useState({
    fullName: '',
    collegeName: '',
    course: '',
    email: '',
    phone: '',
    serviceType: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData); // Replace with actual form submission
    alert('Enquiry Submitted!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-10"
      >
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
          Institutional Enquiry
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-lg mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-lg mb-2">College Name</label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-lg mb-2">Course</label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-lg mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-lg mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-lg mb-2">Service Type</label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select a service</option>
                <option value="FDP">Faculty Development Program</option>
                <option value="Training">Training Programs</option>
                <option value="Placements">Placement Assistance</option>
                <option value="Consulting">Consulting</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-lg mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Please describe your requirements or any specific questions you have..."
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl text-xl font-medium shadow-md"
          >
            Submit Enquiry
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
