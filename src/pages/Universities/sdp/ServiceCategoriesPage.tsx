import { motion, useScroll, useTransform } from 'framer-motion';
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  Users,
  School,
  Award,
  ArrowRight,
  Download,
  FileSpreadsheet,
  LucideIcon
} from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { submitBlueprintRequest, submitCourseListRequest } from '@/services/sdp/enrollmentService';
import { getServices } from '@/services/sdp/courseService';

// Make sure this matches your app's root element
if (typeof document !== "undefined") {
  Modal.setAppElement('#root');
}

// Icon mapping for services
const iconMap: Record<string, LucideIcon> = {
  'arts-science': BookOpen,
  'engineering': GraduationCap,
  'management-business': Briefcase,
  'corporate-faculty-training': Users,
  'bsc-level': School,
  'skill-based': Award
};

// Service image mapping (fallback images)
const serviceImageMap: Record<string, string> = {
  'arts-science': 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800',
  'engineering': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800',
  'management-business': 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800',
  'corporate-faculty-training': 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?auto=format&fit=crop&w=800',
  'bsc-level': 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800',
  'skill-based': 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800'
};

interface Service {
  id: string;
  slug: string;
  icon: LucideIcon;
  name: string;
  subtitle: string;
  description: string;
  whatitis: string;
  image: string;
  color: string;
  duration: string;
  mode: string;
  servicesimg: string;
  focus: string;
  benefits: string[];
}

export default function Services() {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { institutionType } = useParams<{ institutionType: string }>();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch services from Supabase
  useEffect(() => {
    const fetchServicesData = async () => {
      setLoading(true);
      const data = await getServices(institutionType);

      // Map database data to UI format
      const mappedServices: Service[] = data.map((service: any) => ({
        id: service.slug,
        slug: service.slug,
        icon: iconMap[service.slug] || BookOpen,
        name: service.title,
        subtitle: service.subtitle || '',
        description: service.description || '',
        whatitis: service.overview || '',
        image: service.image_url || '/institutions/images/services/1.png',
        color: service.color_gradient || 'from-blue-600 to-purple-600',
        duration: service.duration || 'Flexible',
        mode: service.mode || 'Hybrid',
        servicesimg: serviceImageMap[service.slug] || 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800',
        focus: service.focus || '',
        benefits: service.benefits || []
      }));

      setServices(mappedServices);
      setLoading(false);
    };
    fetchServicesData();
  }, [institutionType]);

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
      await submitBlueprintRequest(form);
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

  // Handle Course List download automation
  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCourseSending(true);
    setCourseError('');
    try {
      await submitCourseListRequest(courseForm);
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
    <section ref={containerRef} className="py-16 pt-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-slate-900">
            Our Services
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Transform your institution with our integrated learning programs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 col-span-full"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-blue-100 border-t-blue-700 rounded-full mx-auto mb-4"
            />
            <p className="text-slate-600 font-medium">Loading services...</p>
          </motion.div>
        ) : (
          services.map((service, index) => {
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
                onClick={() => {
                  // Only Engineering has courses - all others go to service detail
                  if (service.slug === 'engineering') {
                    navigate(`/universities/sdp/${institutionType || 'college'}/engineering/courses`);
                  } else {
                    navigate(`/universities/sdp/${institutionType || 'college'}/${service.slug}`);
                  }
                }}
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
          })
        )}
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
