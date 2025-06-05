import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  GraduationCap,
  Briefcase,
  BookOpen,
  Users,
  School,
  Building2,
  ArrowRight,
  Download,
  FileSpreadsheet
} from 'lucide-react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

// Make sure this matches your app's root element
if (typeof document !== "undefined") {
  Modal.setAppElement('#root');
}

export const services = [
  {
    id: 'academic-excellence',
    icon: GraduationCap,
    name: 'Academic Excellence',
    subtitle: 'Student-Centered Pedagogy',
    description: 'Innovative teaching methods, ICT integration, and inclusive education practices',
    whatitis: `In a rapidly evolving educational landscape, academic excellence demands more than subject expertise. Today's educators must master a range of student-centered, inclusive, and interdisciplinary strategies that make learning meaningful, measurable, and transformative. From innovative pedagogy to integrating sustainability and technology, this vertical equips teachers to raise both engagement and achievement across classrooms.

This program goes beyond traditional teacher training—it fosters reflective practice, promotes experiential and inquiry-driven methods, and empowers educators to embed DEI and sustainability values into everyday teaching. It's designed not just to inform, but to transform academic delivery.`,
    image: "/institutions/images/services/1.png",
    color: 'from-blue-600 to-purple-600',
    duration: 'Modular',
    mode: 'Hybrid',
    servicesimg: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800',
    focus: 'Student-centered teaching',
    benefits: [
      'Encourages personalized, inclusive, and high-impact learning for every student',
      'Bridges the gap between NEP goals, SDG alignment, and classroom execution',
      'Equips educators to lead with clarity, empathy, and innovation',
      'Strengthens academic integrity and outcomes across diverse learning environments',
      'Modules on student-centered and active learning pedagogy'
    ]
  },
  {
    id: 'capacity-building',
    icon: Users,
    name: 'Capacity Building',
    subtitle: 'Leadership & Management',
    description: 'Leadership development, team building, and professional growth skills',
    whatitis: `Schools thrive when teachers lead with vision, communicate with clarity, and collaborate with purpose. Capacity building is no longer an option—it is essential. This vertical equips educators with the personal, managerial, and leadership competencies they need to contribute meaningfully to institutional growth while advancing their own professional journey.

The program blends leadership development with practical efficiency tools and emotional intelligence, fostering well-rounded educators who can perform, lead, and grow in dynamic school ecosystems. It nurtures teachers as change makers—not just content deliverers.`,
    image: "/institutions/images/services/2.png",
    color: 'from-green-600 to-blue-600',
    duration: 'Flexible',
    mode: 'Interactive',
    servicesimg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800',
    focus: 'Leadership and collaboration',
    benefits: [
      'Builds resilience, flexibility, and confidence in academic teams',
      'Prepares teachers to navigate change, lead innovation, and manage diverse classrooms',
      'Elevates performance by embedding goal-setting, collaboration, and reflection',
      'Strengthens school systems through empowered individuals',
      'Leadership, negotiation, and team-building modules tailored for school settings'
    ]
  },
  {
    id: 'current-affairs',
    icon: BookOpen,
    name: 'Current Affairs',
    subtitle: '21st Century Challenges',
    description: 'Mental health, climate education, digital literacy, and contemporary issues',
    whatitis: `Teachers are not just facilitators—they are frontline responders to the realities of the 21st century. From mental health challenges to climate education, digital distractions to social change, educators need the tools to teach with context, compassion, and confidence. This vertical is designed to help teachers respond with relevance and resilience.

It's not about textbook updates—it's about mindset evolution. This program prepares educators to contextualize learning in real-world events and equip students with the life skills needed to thrive in a complex, uncertain world.`,
    image: "/institutions/images/services/3.png",
    color: 'from-purple-600 to-pink-600',
    duration: 'Ongoing',
    mode: 'Responsive',
    servicesimg: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800',
    focus: 'Contemporary relevance',
    benefits: [
      'Prepares schools to respond sensitively and strategically to contemporary issues',
      'Empowers teachers to make classrooms inclusive, ethical, and emotionally safe',
      'Promotes global citizenship, values-based learning, and mental well-being',
      'Builds teacher readiness to navigate crises and evolving learner needs',
      'Modules on stress management, emotional well-being, and post-pandemic recovery'
    ]
  },
  {
    id: 'skill-upgradation',
    icon: School,
    name: 'Skill Upgradation',
    subtitle: 'Digital & Administrative Skills',
    description: 'Technology integration, documentation, Excel training, and professional communication',
    whatitis: `As education becomes increasingly digital and data-driven, teachers must continuously evolve to stay effective. Skill upgradation ensures that educators stay equipped with both the technical know-how and the professional edge required in modern classrooms. This vertical sharpens practical competencies for better planning, communication, and execution.

It's not just about learning new tools—it's about integrating them meaningfully. This program focuses on upskilling teachers with actionable digital, administrative, and documentation skills—ensuring readiness for blended learning and institutional compliance.`,
    image: "/institutions/images/services/4.png",
    color: 'from-orange-600 to-red-600',
    duration: 'Practical',
    mode: 'Hands-on',
    servicesimg: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800',
    focus: 'Technical proficiency',
    benefits: [
      'Enhances digital fluency and communication effectiveness',
      'Empowers educators to manage classrooms, data, and documentation with ease',
      'Bridges gaps between planning, execution, and evaluation using smart tools',
      'Increases efficiency and confidence in everyday professional responsibilities',
      'Practical sessions on digital tools, LMS platforms, and collaborative technologies'
    ]
  }
];

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
    width: '80%',
    maxWidth: '600px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
};

const sendEmail = async (formData: any) => {
  try {
    console.log('Form data submitted:', formData);
    alert("Request submitted successfully! We'll get back to you soon.");
  } catch (err) {
    console.error("Error:", err);
    alert("An error occurred. Please try again.");
  }
};

const sendCourseListEmail = async (email: string) => {
  try {
    console.log('Course list requested for:', email);
    alert("Course list request submitted! Check your email soon.");
  } catch (err) {
    console.error("Error:", err);
    alert("An error occurred. Please try again.");
  }
};

export default function Services() {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [modalIsOpen, setModalOpen] = useState(false);
  const [courseModalIsOpen, setCourseModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    schoolName: '',
    message: '',
  });

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openCourseModal = () => setCourseModalOpen(true);
  const closeCourseModal = () => setCourseModalOpen(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await sendEmail(formData);
    closeModal();
  };

  const handleCourseListDownload = async (e: any) => {
    e.preventDefault();
    await sendCourseListEmail(formData.email);
    closeCourseModal();
  };

  return (
    <section ref={containerRef} className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Teacher Development Program (TDP)
          </h1>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Empowering Educators. Transforming Schools.
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            In today's evolving educational landscape, the role of the teacher has expanded beyond instruction. Teachers are now leaders, facilitators, mentors, and change agents. The Teacher Development Program (TDP) is designed to meet this transformation head-on—equipping educators with the knowledge, skills, and mindsets needed to thrive in modern classrooms and learning ecosystems.
          </p>
          <div className="mt-8 p-6 bg-white/60 rounded-lg">
            <p className="text-gray-700 font-medium">
              TDP is built on four foundational pillars and is modular, customised, and aligned with NEP 2020 priorities. Whether the goal is academic innovation, inclusive classrooms, or operational excellence, the Teacher Development Program provides schools with a comprehensive framework to support educator growth and student success.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const yOffset = useTransform(
              scrollYProgress,
              [index / services.length, (index + 1) / services.length],
              [50, -50]
            );

            return (
              <motion.div
                key={index}
                style={{ y: yOffset }}
                className="relative group cursor-pointer"
                onClick={() => navigate(`/service/${service.id}`)}
              >
                <div className={`absolute left-0 top-0 bottom-0 w-6 bg-[#020202] rounded-l-lg transform -skew-y-12`} />
                
                <motion.div
                  whileHover={{ rotateY: -15, translateX: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative bg-white/40 backdrop-blur-sm rounded-r-lg shadow-2xl overflow-hidden ml-6 h-[400px]"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-[#222B33] opacity-50`} />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
                        {service.name}
                      </h3>
                      <service.icon className="w-8 h-8 text-gray-800" />
                    </div>
                    {service.subtitle && (
                      <p className={`text-sm font-medium bg-gradient-to-r ${service.color} bg-clip-text text-transparent mb-3`}>
                        {service.subtitle}
                      </p>
                    )}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    
                    <motion.div
                      whileHover={{ x: 10 }}
                      className={`flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>

                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-gray-200 transform skew-y-45" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 relative"
        >
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-pink-400/30 animate-pulse" />
          <div className="relative bg-white/80 rounded-lg p-8 max-w-4xl mx-auto mb-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Invest in your teachers. Transform your classrooms. Build future-ready institutions.
            </h3>
          </div>
          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex flex-col sm:flex-row gap-8 pt-8 justify-center">
              <motion.button
                type="button"
                onClick={() => setCourseModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center"
              >
                <Download className="inline-block mr-2 h-5 w-5" />
                Download Course List
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center"
              >
                <FileSpreadsheet className="inline-block mr-2 h-5 w-5" />
                Request Blueprint
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Request Blueprint Modal"
      >
        <h2 className="text-2xl font-bold mb-4">Request Blueprint</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label htmlFor="schoolName" className="block text-gray-700 text-sm font-bold mb-2">
              School Name:
            </label>
            <input
              type="text"
              id="schoolName"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={4}
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={courseModalIsOpen}
        onRequestClose={closeCourseModal}
        style={customStyles}
        contentLabel="Course List Download Modal"
      >
        <h2 className="text-2xl font-bold mb-4">Download Course List</h2>
        <form onSubmit={handleCourseListDownload} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={closeCourseModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
