import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Target, Award, Phone, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getServiceBySlug } from '@/services/sdp/courseService';

export default function ServiceDetailPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch service data from Supabase
  useEffect(() => {
    const fetchService = async () => {
      if (!categorySlug) return;
      
      setLoading(true);
      const data = await getServiceBySlug(categorySlug);
      setService(data);
      setLoading(false);
    };
    fetchService();
  }, [categorySlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-100 border-t-blue-700 rounded-full"
        />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Service not found</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-700 hover:text-gray-900 font-medium"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  // Map database fields to UI format
  const serviceData = {
    name: service.title,
    subtitle: service.subtitle || '',
    description: service.description || '',
    overview: service.overview || '',
    duration: service.duration || 'Flexible',
    mode: service.mode || 'Hybrid',
    focus: service.focus || '',
    benefits: service.benefits || [],
    color: service.color_gradient || 'from-blue-600 to-purple-600',
    servicesimg: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* Hero Banner Section */}
      <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${serviceData.servicesimg})` }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/50" />

        {/* Content Container */}
        <div className="relative h-full container mx-auto px-6 lg:px-8 flex flex-col justify-center max-w-7xl">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-colors font-medium group w-fit"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Services</span>
          </motion.button>

          {/* Service Icon & Category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 flex items-center gap-4"
          >
            <div className={`w-16 h-16 bg-gradient-to-br ${serviceData.color} rounded-2xl flex items-center justify-center shadow-lg`}>
              <Target className="w-9 h-9 text-white" />
            </div>
            {serviceData.subtitle && (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-semibold">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                {serviceData.subtitle}
              </span>
            )}
          </motion.div>

          {/* Service Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight max-w-4xl"
          >
            {serviceData.name}
          </motion.h1>

          {/* Service Meta Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 text-white/90"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <span className="text-sm font-medium">{serviceData.duration}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <span className="text-sm font-medium">{serviceData.mode}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-600/90 backdrop-blur-sm rounded-lg border border-blue-500/50">
              <span className="text-sm font-bold">{serviceData.focus}</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Fade Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-7xl -mt-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-blue-700" />
                About This Program
              </h2>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                {serviceData.overview}
              </p>
            </motion.div>

            {/* Program Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-blue-700" />
                Program Benefits
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {serviceData.benefits.map((benefit: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200"
                  >
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN - Contact CTA */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:sticky lg:top-24"
            >
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                {/* CTA Header */}
                <div className={`bg-gradient-to-r ${serviceData.color} p-6`}>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Interested in This Program?
                  </h3>
                  <p className="text-white/90 text-sm">
                    Get in touch with us to learn more about how this program can benefit your institution
                  </p>
                </div>

                {/* CTA Content */}
                <div className="p-6 space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/universities/services#contact')}
                    className="w-full bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold shadow-lg shadow-blue-700/20 hover:shadow-xl hover:bg-blue-800 transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    Contact Us
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/universities/services#download')}
                    className="w-full bg-white border-2 border-slate-300 text-slate-700 py-3 px-6 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Request Information
                  </motion.button>

                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-sm text-slate-600 text-center">
                      Our team will get back to you within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
