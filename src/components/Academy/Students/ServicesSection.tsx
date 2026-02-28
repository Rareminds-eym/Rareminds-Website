import { motion } from 'framer-motion';
import {
  GraduationCap,
  BookOpen,
  Users,
  Award,
  ArrowRight,
  LucideIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getSchoolServiceCategories } from '@/services/school/schoolCourseService';
import ExpandableText from '@/components/universities/sdp/shared/ExpandableText';

// Service type definition
interface Service {
  id: string;
  slug: string;
  icon: LucideIcon;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  color: string;
}

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Users,
  BookOpen,
  GraduationCap,
  Award
};

const SERVICES_PER_PAGE = 6;

export default function ServicesSection() {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState<string>('Middle School');
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const data = await getSchoolServiceCategories(selectedLevel);
      
      // Map data to include icon components
      const mappedServices = data.map((service: any) => ({
        ...service,
        icon: iconMap[service.icon] || BookOpen
      }));
      
      setServices(mappedServices);
      setLoading(false);
    };
    fetchServices();
  }, [selectedLevel]);

  // Reset to page 0 when education level changes
  useEffect(() => {
    setCurrentPage(0);
  }, [selectedLevel]);

  // Calculate pagination
  const totalPages = Math.ceil(services.length / SERVICES_PER_PAGE);
  const startIndex = currentPage * SERVICES_PER_PAGE;
  const endIndex = startIndex + SERVICES_PER_PAGE;
  const currentServices = services.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  return (
    <section id="services" className="py-16 relative overflow-hidden">
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
          
          {/* Education Level Filter */}
          <div className="flex items-center justify-center gap-10 mt-6">
            <button
              onClick={() => setSelectedLevel('Middle School')}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                selectedLevel === 'Middle School'
                  ? 'bg-blue-700 text-white shadow-lg shadow-blue-700/30'
                  : 'bg-white text-slate-600 border border-slate-250 hover:border-blue-300'
              }`}
            >
              Middle School
            </button>
            <button
              onClick={() => setSelectedLevel('High School')}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                selectedLevel === 'High School'
                  ? 'bg-blue-700 text-white shadow-lg shadow-blue-700/30'
                  : 'bg-white text-slate-600 border border-slate-250 hover:border-blue-300'
              }`}
            >
              High School
            </button>
            <button
              onClick={() => setSelectedLevel('Higher Secondary')}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                selectedLevel === 'Higher Secondary'
                  ? 'bg-blue-700 text-white shadow-lg shadow-blue-700/30'
                  : 'bg-white text-slate-600 border border-slate-250 hover:border-blue-300'
              }`}
            >
              Higher Secondary
            </button>
          </div>
        </motion.div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-blue-100 border-t-blue-700 rounded-full mx-auto mb-4"
            />
            <p className="text-slate-600 font-medium">Loading services...</p>
          </motion.div>
        ) : services.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-slate-600 text-lg">No services available for {selectedLevel}</p>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 items-start">
              {currentServices.map((service, index) => {
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group min-h-[360px] cursor-pointer max-w-xs mx-auto"
                  onClick={() => {
                    // Navigate to courses listing page for this service with education level
                    const url = `/school/student/services/${service.slug}/courses${selectedLevel ? `?level=${encodeURIComponent(selectedLevel)}` : ''}`;
                    navigate(url);
                  }}
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-6 bg-[#020202] rounded-l-lg transform -skew-y-12`} />

                  <motion.div
                    whileHover={{ rotateY: -15, translateX: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative bg-white/40 backdrop-blur-sm rounded-r-lg shadow-2xl overflow-visible ml-6 flex flex-col"
                  >
                    <div className="relative h-40 overflow-hidden flex-shrink-0 rounded-tr-lg">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-[#222B33] opacity-50`} />
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-medium font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
                          {service.name}
                        </h3>
                        <service.icon className="w-7 h-7 text-gray-800 flex-shrink-0" />
                      </div>
                      {service.subtitle && (
                        <p className={`text-xs font-medium bg-gradient-to-r ${service.color} bg-clip-text text-transparent mb-3`}>
                          {service.subtitle}
                        </p>
                      )}
                      
                      {/* Description - WITH conditional expansion */}
                      <div className="mb-4 flex-1">
                        <ExpandableText
                          text={service.description}
                          maxLines={2}
                          className="text-gray-600 text-sm leading-relaxed"
                        />
                      </div>

                      <motion.div
                        whileHover={{ x: 10 }}
                        className={`flex items-center gap-2 text-xs font-semibold bg-gradient-to-r ${service.color} bg-clip-text text-transparent mt-auto`}
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center justify-center gap-4 mt-12"
            >
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  currentPage === 0
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:text-blue-700'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentPage(i);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                      currentPage === i
                        ? 'bg-blue-700 text-white shadow-lg shadow-blue-700/30'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages - 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  currentPage === totalPages - 1
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:text-blue-700'
                }`}
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
          </>
        )}
      </div>
    </section>
  );
}
