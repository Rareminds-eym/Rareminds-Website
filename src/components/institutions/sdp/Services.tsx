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
import { supabase } from '@/lib/supabaseClient'; 

// Make sure this matches your app's root element
if (typeof document !== "undefined") {
  Modal.setAppElement('#root');
}

export const services  = [
  // ...existing services array...
  {
    id: 'full-semester',
    icon: GraduationCap,
    name: 'Full Semester Skill Program',
    subtitle: '(Naan Mudhalvan)',
    description: 'Multiple courses + internships + final evaluation + certification',
    whatitis: `Offered in collaboration with the Tamil Nadu government’s Naan Mudhalvan initiative, this is a full-semester skill development program designed and delivered by Rareminds. It includes a series of industry-aligned certification courses, intensive hands-on training, and internship opportunities. The program ends with a final evaluation and certification that reflects the student's overall skill progression.
Rareminds ensures that students not only gain technical skills but also master communication, problem-solving, and workplace adaptability – all essential for modern careers.`,
    image: "/institutions/images/services/1.png",
    color: 'from-blue-600 to-purple-600',
    duration: '6 Months',
    mode: 'Hybrid',
    servicesimg: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800',
    focus: 'Comprehensive skill development',
    benefits: [
      'Industry-aligned curriculum',
      'Hands-on projects',
      'Internship opportunities',
      'Professional certification',
      'Placement assistance',
    ]
  },
  // ...rest of the services...
  {
    id: 'pre-placement',
    icon: Briefcase,
    name: 'Pre-Placement Accelerator',
    subtitle: 'Career Oriented',
    description: 'Final year focused bootcamp + placement tie-up',
    whatitis: `This is Rareminds' flagship bootcamp-style training for final-year students, tailored to ensure placement readiness. It combines technical revision, aptitude training, mock interviews, group discussions, personality development, and career coaching. The program is integrated with strategic placement tie-ups, giving students access to recruitment drives and hiring partners.`,
    image: "/institutions/images/services/2.png",
    color: 'from-blue-600 to-purple-600',
    duration: '3 Months',
    mode: 'Intensive',
    servicesimg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800',
    focus: 'Placement preparation',
    benefits: [
      'Interview preparation',
      'Resume building',
      'Mock interviews',
      'Technical training',
      'Soft skills development'
    ]
  },
  {
    id: 'bridge-courses',
    icon: BookOpen,
    name: 'Bridge Courses',
    subtitle: 'First Years',
    description: 'Foundational programs on communication, digital tools, work ethics',
    whatitis: `Designed for newly admitted students, this Rareminds initiative focuses on building a strong foundation for college success. It covers effective communication, digital fluency (MS Office, Google tools, etc.), teamwork, and ethical behavior. The courses promote emotional intelligence and self-awareness to help students manage the transition to college life and adapt to a new learning environment.`,
    image: "/institutions/images/services/3.png",
    color: 'from-blue-600 to-purple-600',
    duration: '2 Months',
    mode: 'Regular',
    servicesimg: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800',
    focus: 'Foundation building',
    benefits: [
      'Basic communication skills',
      'Digital literacy',
      'Professional ethics',
      'Time management',
      'Team collaboration'
    ]
  },
  {
    id: 'skill-based',
    icon: School,
    name: 'Skill-Based Training',
    subtitle: 'Credit-Linked',
    description: 'Add-on courses that enhance your academic profile',
    whatitis: `These modular training programs, developed by Rareminds, are either integrated into the curriculum (credit-linked) or offered as supplementary add-ons. Covering areas like data analytics, digital marketing, communication mastery, coding, food safety, and more – they align with industry trends and student aspirations. Each module is designed for hands-on, measurable learning.`,
    image: "/institutions/images/services/4.png",
    color: 'from-blue-600 to-purple-600',
    duration: 'Flexible',
    mode: 'Modular',
    servicesimg: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800',
    focus: 'Specialized skills',
    benefits: [
      'Industry certifications',
      'Practical workshops',
      'Expert sessions',
      'Project-based learning',
      'Credit recognition'
    ]
  },
  {
    id: 'faculty-development',
    icon: Users,
    name: 'Faculty Development',
    subtitle: 'NEP & Technology',
    description: 'Comprehensive training on NEP and Industry Integration',
    whatitis: `Rareminds conducts specialized FDPs to help educators embrace National Education Policy (NEP) guidelines, integrate emerging technologies, and implement industry-relevant content. These programs are interactive, insightful, and practice-oriented—equipping faculty to become facilitators of innovation and mentors of the future workforce.`,
    image: "/institutions/images/services/1.png",
    color: 'from-blue-600 to-purple-600',
    duration: '1 Week',
    mode: 'Intensive',
    servicesimg:'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?auto=format&fit=crop&w=800',
    focus: 'Teacher training',
    benefits: [
      'NEP 2020 implementation',
      'Modern teaching methods',
      'Technology integration',
      'Research guidance',
      'Industry collaboration'
    ]
  },
  {
    id: 'internship-placement',
    icon: Building2,
    name: 'Internship & Placement',
    subtitle: 'Industry Connect',
    description: 'Direct industry partnerships for real-world experience',
    whatitis: `Rareminds acts as a bridge between institutions and industries by forming structured internship and placement partnerships. We facilitate student access to internships, project work, and job interviews with reputed companies across domains. Through close collaboration with Career Services Cells and Training & Placement Officers, Rareminds ensures seamless employability pathways.`,
    image: "/institutions/images/services/2.png",
    color: 'from-blue-600 to-purple-600',
    duration: 'Ongoing',
    mode: 'Facilitation',
    servicesimg: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800',
    focus: 'Career launch',
    benefits: [
      'Industry partnerships',
      'Internship opportunities',
      'Placement drives',
      'Career counseling',
      'Alumni network'
    ]
  },
];
// New: Email automation for Course List
const sendCourseListEmail = async (name: string, email: string) => {
  const response = await fetch('https://rareminds.in/api/send-pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      pdfUrl: '/institutions/pdfs/Course_List.pdf',
      institution: 'Course List Download'
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to send email');
  }
};

// Email automation logic (from CaseStudies.tsx)
const sendEmail = async (
  name: string,
  email: string,
  location: string,
  university: string
) => {
  const response = await fetch('https://rareminds.in/api/send-pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      location,
      university,
      pdfUrl: '/institutions/pdfs/Blueprint.pdf',
      institution: university
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to send email');
  }
};

export default function Services() {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    university: ''
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Modal state for Course List
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [courseForm, setCourseForm] = useState({ name: '', email: '' });
  const [courseSending, setCourseSending] = useState(false);
  const [courseSuccess, setCourseSuccess] = useState(false);
  const [courseError, setCourseError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleCourseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseForm({ ...courseForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      // Store in Supabase
      const { error: supabaseError } = await supabase.from('blueprint_requests').insert([
        {
          name: form.name,
          phone: form.phone,
          email: form.email,
          location: form.location,
          university: form.university
        }
      ]);
      if (supabaseError) throw supabaseError;

      // Send email with PDF
      await sendEmail(form.name, form.email, form.location, form.university);

      setSuccess(true);
      setTimeout(() => {
        setModalOpen(false);
        setSuccess(false);
        setForm({
          name: '',
          phone: '',
          email: '',
          location: '',
          university: ''
        });
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to send blueprint. Try again.');
    }
    setSending(false);
  };
  // New: handle Course List download automation
  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCourseSending(true);
    setCourseError('');
    try {
      // Store in Supabase (optional, if you want to track downloads)
      await supabase.from('course_list_requests').insert([
        { name: courseForm.name, email: courseForm.email }
      ]);
      // Send email with Course List PDF
      await sendCourseListEmail(courseForm.name, courseForm.email);
      setCourseSuccess(true);
      setTimeout(() => {
        setCourseModalOpen(false);
        setCourseSuccess(false);
        setCourseForm({ name: '', email: '' });
      }, 2000);
    } catch (err: any) {
      setCourseError(err.message || 'Failed to send course list. Try again.');
    }
    setCourseSending(false);
  };

  return (
    <section ref={containerRef} className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-4"
        >
          <h1 className="text-xl font-bold mb-4 bg-black bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-sm text-gray-600 mx-auto">
            Transform your institution with our integrated learning programs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
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
                className="relative group h-[360px] cursor-pointer max-w-xs mx-auto"
                onClick={() => navigate(`/service/${service.id}`)}
              >
                <div className={`absolute left-0 top-0 bottom-0 w-6 bg-[#020202] rounded-l-lg transform -skew-y-12`} />
                
                <motion.div
                  whileHover={{ rotateY: -15, translateX: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative bg-white/40 backdrop-blur-sm rounded-r-lg shadow-2xl overflow-hidden ml-6 h-full"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-[404.61] h-[160] object-cover"
                    />
                    <div className={`absolute inset-0 bg-[#222B33] opacity-50`} />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-medium font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
                        {service.name}
                      </h3>
                      <service.icon className="w-7 h-7 text-gray-800" />
                    </div>
                    {service.subtitle && (
                      <p className={`text-xs font-medium bg-gradient-to-r ${service.color} bg-clip-text text-transparent mb-3`}>
                        {service.subtitle}
                      </p>
                    )}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    
                    <motion.div
                      whileHover={{ x: 10 }}
                      className={`flex items-center gap-2 text-xs font-semibold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}
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
          className="text-center mt-9 relative"
        >
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-pink-400/30 animate-pulse" />
          <motion.div className="relative" />
          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex flex-col sm:flex-row gap-8 pt-8 justify-center">
              {/* Course List Download with automation */}
              <motion.button
                type="button"
                onClick={() => setCourseModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="button-primary py-2 flex items-center"
              >
                <Download className="inline-block mr-2 h-5 w-5" />
                Download Course List
              </motion.button>
              {/* Blueprint Request */}
              <motion.button
                type="button"
                onClick={() => setModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="button-secondary py-2 flex items-center"
              >
                <FileSpreadsheet className="inline-block mr-2 h-5 w-5" />
                Request Blueprint
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Modal for Request Blueprint */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => {
          setModalOpen(false);
          setSuccess(false);
          setForm({
            name: '',
            phone: '',
            email: '',
            location: '',
            university: ''
          });
          setError('');
        }}
        className="bg-white rounded-lg p-8 max-w-md mx-auto mt-24 shadow-lg relative z-[9999]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[9998]"
      >
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={() => {
            setModalOpen(false);
            setSuccess(false);
            setForm({
              name: '',
              phone: '',
              email: '',
              location: '',
              university: ''
            });
            setError('');
          }}
        >
          ×
        </button>
        <h2 className="text-lg font-bold mb-4">Request Blueprint</h2>
        {success ? (
          <div className="text-green-600">
            Blueprint sent to your email!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
              className="w-full border px-3 py-2 rounded"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="Phone Number"
              className="w-full border px-3 py-2 rounded"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              type="email"
              placeholder="Email ID"
              className="w-full border px-3 py-2 rounded"
            />
            <input
              name="university"
              value={form.university}
              onChange={handleChange}
              required
              placeholder="University Name"
              className="w-full border px-3 py-2 rounded"
            />
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              placeholder="Location"
              className="w-full border px-3 py-2 rounded"
            />
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              disabled={sending}
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold"
            >
              {sending ? 'Sending...' : 'Request & Send PDF'}
            </button>
          </form>
        )}
      </Modal>

      {/* Modal for Course List Download */}
      <Modal
        isOpen={courseModalOpen}
        onRequestClose={() => {
          setCourseModalOpen(false);
          setCourseSuccess(false);
          setCourseForm({ name: '', email: '' });
          setCourseError('');
        }}
        className="bg-white rounded-lg p-8 max-w-md mx-auto mt-24 shadow-lg relative z-[9999]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[9998]"
      >
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={() => {
            setCourseModalOpen(false);
            setCourseSuccess(false);
            setCourseForm({ name: '', email: '' });
            setCourseError('');
          }}
        >
          ×
        </button>
        <h2 className="text-lg font-bold mb-4">Download Course List</h2>
        {courseSuccess ? (
          <div className="text-green-600">
            Course List sent to your email!
          </div>
        ) : (
          <form onSubmit={handleCourseSubmit} className="space-y-4">
            <input
              name="name"
              value={courseForm.name}
              onChange={handleCourseChange}
              required
              placeholder="Your Name"
              className="w-full border px-3 py-2 rounded"
            />
            <input
              name="email"
              value={courseForm.email}
              onChange={handleCourseChange}
              required
              type="email"
              placeholder="Email ID"
              className="w-full border px-3 py-2 rounded"
            />
            {courseError && (
              <p className="text-red-500 text-sm text-center">{courseError}</p>
            )}
            <button
              type="submit"
              disabled={courseSending}
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold"
            >
              {courseSending ? 'Sending...' : 'Send & Download'}
            </button>
          </form>
        )}
      </Modal>
    </section>
  );
}