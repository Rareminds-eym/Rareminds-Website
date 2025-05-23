import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Download } from 'lucide-react';
import { useState } from 'react';

const upcomingFDPs = [
  {
    title: "New-Age Pedagogy Workshop",
    date: "March 15-20, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "Online",
    seats: "50 seats available",
    registrationLink: "#"
  },
  {
    title: "AI in Education Masterclass",
    date: "March 25-27, 2024",
    time: "9:30 AM - 3:30 PM",
    location: "Hybrid Mode",
    seats: "35 seats available",
    registrationLink: "#"
  },
   {
    title: "AI in Education Masterclass",
    date: "March 25-27, 2024",
    time: "9:30 AM - 3:30 PM",
    location: "Hybrid Mode",
    seats: "35 seats available",
    registrationLink: "#"
  },
  {
    title: "Research Methodology Workshop",
    date: "April 5-10, 2024",
    time: "11:00 AM - 5:00 PM",
    location: "Chennai Campus",
    seats: "40 seats available",
    registrationLink: "#"
  }
];

export default function CalendarSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(upcomingFDPs.length / itemsPerPage);

  const visibleFDPs = upcomingFDPs.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">Upcoming FDP Calendar</h2>
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              onClick={() => window.open('/calendar.pdf', '_blank')}
            >
              <Download className="w-5 h-5" />
              Download Full Calendar
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={false}
          animate={{ x: `${-currentPage * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {visibleFDPs.map((fdp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {fdp.title}
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span>{fdp.date}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span>{fdp.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span>{fdp.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-600">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span>{fdp.seats}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold mt-4"
                >
                  Register Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        <div className="flex justify-center gap-3 mt-12">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentPage === index 
                  ? 'bg-blue-600 w-8' 
                  : 'bg-blue-200 hover:bg-blue-300'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}