import { motion } from "framer-motion";
import {
  Laptop,
  Code,
  Users2,
  BadgeDollarSign,
  UserCog,
  Building,
  ArrowRight,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCorporateServiceCategories } from "@/services/sdp/courseService";

type Service = {
  id: string;
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  color: string;
};

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Laptop,
  Code,
  Users2,
  BadgeDollarSign,
  UserCog,
  Building,
  ArrowRight,
  Sparkles,
  BookOpen,
};

const animations = {
  card: {
    initial: { opacity: 0, y: 50, scale: 0.9 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 12 },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { type: "spring" as const, stiffness: 400, damping: 10 },
    },
  },
  container: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
  },
};

const ServiceCard = ({
  service,
  index,
}: {
  service: Service;
  index: number;
}) => {
  const IconComponent = service.icon || BookOpen;

  return (
    <Link
      to={`/corporate/training/services/${service.slug}`}
      className="block h-full no-underline"
    >
      <motion.div
        key={index}
        initial={animations.card.initial}
        whileInView={animations.card.animate}
        whileHover={animations.card.hover}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: index * 0.1 }}
        className="relative group h-full min-h-[420px] w-full max-w-sm mx-auto"
      >
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-4 sm:w-6 bg-[#020202] rounded-l-lg transform -skew-y-12"
          initial={{ height: 0 }}
          animate={{ height: "100%" }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        />
        <motion.div
          className="relative bg-white/40 backdrop-blur-sm rounded-r-lg shadow-2xl overflow-hidden ml-4 sm:ml-6 h-full"
          whileHover={{
            rotateY: -8,
            x: 5,
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div className="relative h-40 sm:h-48 overflow-hidden">
            <img
              src={service.image}
              alt={"Illustration of a book with symbols, icons, and corporate professionals interacting around gears and charts."}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#222B33] opacity-50" />
          </div>
          <div className="p-5 sm:p-7">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-sm sm:text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent leading-tight">
                {service.name}
              </h3>
              <IconComponent className="w-5 h-5 sm:w-7 sm:h-7 text-gray-800" />
            </div>
            {service.subtitle && (
              <p
                className={`text-xs font-medium bg-gradient-to-r ${service.color} bg-clip-text text-transparent mb-2 sm:mb-3`}
              >
                {service.subtitle}
              </p>
            )}
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 sm:mb-5 min-h-[3rem]">
              {service.description}
            </p>
            <motion.div
              whileHover={{ x: 10 }}
              className={`flex items-center gap-2 text-xs font-semibold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}
            >
              Learn More
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const data = await getCorporateServiceCategories();
      
      // Map data to include icon components
      const mappedServices = data.map((service: any) => ({
        ...service,
        icon: iconMap[service.icon] || BookOpen
      }));
      
      setServices(mappedServices);
      setLoading(false);
    };
    fetchServices();
  }, []);

  return (
    <section className="py-8 sm:py-12 lg:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-black bg-clip-text text-transparent"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg text-gray-600 mx-auto max-w-2xl"
          >
            Our training services are crafted to tackle diverse workforce
            challenges and deliver measurable business impact.
          </motion.p>
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
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        )}

        <motion.div
          initial={animations.container.initial}
          animate={animations.container.animate}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex justify-center items-center mt-8 sm:mt-12 relative"
        >
          <motion.button
            className="relative bg-[#222B33] text-white px-8 py-4 rounded-full min-w-[240px] sm:min-w-[300px]
              font-semibold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300 
              flex items-center justify-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }}
            type="button"
          >
            <span>Make Your Career Recession-Proof</span>
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
