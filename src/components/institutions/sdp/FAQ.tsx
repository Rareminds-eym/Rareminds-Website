import { motion } from 'framer-motion';
import { ChevronsDown, X as XIcon } from 'lucide-react'; // Importing the X icon for the cross
import { useState } from 'react';
import Track from '../assets/vectors/Tracking.jpg';
import Fund from '../assets/vectors/Funding.jpg';
import Courses from '../assets/vectors/Tracking.jpg';
import Sessions from '../assets/vectors/Sessions.jpg';

const faqs = [
  {
    title: 'Tracking',
    question: 'How do I measure student progress?',
    image: Track,
    bgColor: '#FDDCE6',
    extraQuestions: [
      'What tools can help in tracking student performance?',
      'How do I set milestones for student progress?',
      'What data should be collected for tracking purposes?',
    ],
  },
  {
    title: 'Funding',
    question: 'Is government funding available?',
    image: Fund,
    bgColor: '#FFE9B7',
    extraQuestions: [
      'How do I apply for government funding?',
      'Are there any eligibility requirements for funding?',
      'What are the deadlines for applying for funding?',
    ],
  },
  {
    title: 'Courses',
    question: 'What courses do you offer for my college stream?',
    image: Courses,
    bgColor: '#FEE2D5',
    extraQuestions: [
      'Are there online courses available?',
      'How do I register for a course?',
      'What are the course durations?',
    ],
  },
  {
    title: 'Sessions',
    question: 'Can you align sessions with our academic calendar?',
    image: Sessions,
    bgColor: '#D1F7C4',
    extraQuestions: [
      'How do I schedule sessions around the calendar?',
      'Can sessions be rescheduled if needed?',
      'How many sessions are typically held per month?',
    ],
  },
];

export default function FAQ() {
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query

  // Filter FAQs based on the search query
  const filteredFaqs = faqs.filter(faq => {
    const searchLower = searchQuery.toLowerCase();
    return (
      faq.title.toLowerCase().includes(searchLower) ||
      faq.question.toLowerCase().includes(searchLower) ||
      faq.extraQuestions.some(q =>
        q.toLowerCase().includes(searchLower)
      )
    );
  });

  const handleCategoryClick = (index: number) => {
    setOpenCategory(openCategory === index ? null : index); // Toggle open/close
  };

  const handleClearSearch = () => {
    setSearchQuery(''); // Clear the search query
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search FAQs..."
              className="w-full max-w-md px-5 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:font-semibold placeholder:text-gray-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                <XIcon className="w-5 h-5 text-gray-500" />
              </button>
            )}
          </div>
        </motion.div>

        {/* FAQ Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.03] cursor-pointer"
              style={{ backgroundColor: faq.bgColor }}
              onClick={() => handleCategoryClick(index)} // Toggle the category info
            >
              <div className="w-full h-[180px] bg-white flex items-center justify-center overflow-hidden">
                <img
                  src={faq.image}
                  alt={faq.title}
                  className="h-full object-contain"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-black mb-3">{faq.title}</h3>
                <p className="text-md text-black mb-2">{faq.question}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated Scroll Down Icon (Always visible) */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="mt-16 flex justify-center cursor-pointer"
          onClick={() => setOpenCategory(null)} // Toggle close on icon click
        >
          {openCategory !== null ? (
            <XIcon className="w-8 h-8 text-blue-500" /> // Cross button when opened
          ) : (
            <ChevronsDown className="w-8 h-8 text-blue-500" /> // Down arrow when closed
          )}
        </motion.div>

        {/* Expanded Information */}
        {openCategory !== null && (
          <motion.div
            className="mt-8 p-8 rounded-lg shadow-lg max-w-xl mx-auto"
            style={{ backgroundColor: faqs[openCategory].bgColor }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-black mb-4 text-center">
              {faqs[openCategory].title} 
            </h3>
            <ul className="space-y-3">
              {faqs[openCategory].extraQuestions.map((question, idx) => (
                <li key={idx} className="text-md text-black text-left ml-10">
                  {/* Adding number before the question and drawing a line */}
                  <span className="font-semibold">{idx + 1}. </span>
                  {question}
                  <hr className="my-2 border-gray-300" />
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </section>
  );
}
