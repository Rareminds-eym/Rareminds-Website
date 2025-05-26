import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, BookOpen, Target, CheckCircle, Sparkles } from 'lucide-react';
import { services } from '@/components/institutions/sdp/Services';

export default function ServicePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find(s => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service not found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-800"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Header Banner */}
      <div className="relative h-[40vh] overflow-hidden">
        <img
          src={service.servicesimg}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6">
            <motion.button
              onClick={() => navigate('/institutions#services')}
              whileHover={{ x: -5 }}
              className="text-white text-sm mb-4 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4"/>
              Back to Services
            </motion.button>
            <h1 className="pt-4 text-2xl md:text-4xl font-bold text-white mb-4">{service.name}</h1>
            {service.subtitle && (
              <p className="pt-4 text-lg text-white/90">{service.subtitle}</p>
            )}
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="container mx-auto px-3 py-12">
       

        {/* About and Benefits */}
        <div className="grid md:grid-cols-5 gap-x-20 px-20">
          <div className="md:col-span-3">
            <motion.h2
              className="text-2xl font-bold mb-6 p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              About The Course
            </motion.h2>
            <motion.p
              className="text-gray-700 leading-relaxed text-justify text-medium" 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {service.whatitis}
            </motion.p>
          </div>

            <div className="md:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 p-10 rounded-2xl">
            <motion.h2
              className="text-2xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Program Benefits
            </motion.h2>
            <motion.ul
              className="space-y-4"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
            >
              {service.benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">{benefit}</p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>

      </div>
    </div>
  );
}
