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
} from "lucide-react";
import { Link } from "react-router-dom";

type Service = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  color: string;
};

export const services = [
  {
    id: "leadership-management",
    icon: Laptop,
    name: "Leadership and Management Excellence",
    subtitle: "From First-Time Managers to Future-Ready CXOs",
    description:
      "Your people are your strategy. Equip them to lead with vision, empathy, and agility. Top Picks: Emotional Intelligence | OKRs & Feedback | Coaching Culture",
    image: "/Corporate/Images/Training/service-header.webp",
    color: "from-blue-600 to-purple-600",
  },
  {
    id: "communication-collaboration",
    icon: Users2,
    name: "Communication and Collaboration",
    subtitle: "No More Death by Email or Cross-Team Chaos",
    description:
      "Empower your teams to communicate clearly, influence effectively, and work in sync—across silos and time zones. Top Picks: Influencing Without Authority | Cross-Cultural Collab | Executive Presence",
    image: "/Corporate/Images/Training/service-header.webp",
    color: "from-blue-600 to-purple-600",
  },
  {
    id: "workplace-productivity",
    icon: Sparkles,
    name: "Workplace Productivity & Digital Fluency",
    subtitle: "Get More Done—Smarter, Not Harder",
    description:
      "Time, tech, and tools—master them all. We build productivity hackers who can handle any workflow with finesse. Top Picks: AI Tools at Work | Time Ninja Bootcamp | Excel to Power BI Mastery",
    image: "/Corporate/Images/Training/service-header.webp",
    color: "from-blue-600 to-purple-600",
  },
  {
    id: "tech-upskilling",
    icon: Code,
    name: "Tech Upskilling & Future Skills",
    subtitle: "Train for Today. Thrive in Tomorrow.",
    description:
      "Future-proof your teams with hands-on tech skills. Perfect for IT, Digital, and the Tech-Curious. Top Picks: GenAI & Prompt Engineering | Cybersecurity 101 | Cloud Basics (AWS/Azure)",
    image: "/Corporate/Images/Training/service-header.webp",
    color: "from-blue-600 to-purple-600",
  },
  {
    id: "behavioral-culture",
    icon: ArrowRight,
    name: "Behavioral & Organizational Culture",
    subtitle: "Because Culture Eats Strategy for Breakfast",
    description:
      "Create a workplace people don’t want to leave. We’re talking inclusion, ownership, psychological safety—real, not performative. Top Picks: DEI&B | Feedback Culture | Remote-Ready Teams",
    image: "/Corporate/Images/Training/service-header.webp",
    color: "from-blue-600 to-purple-600",
  },
  {
    id: "sales-marketing-customer",
    icon: BadgeDollarSign,
    name: "Sales, Marketing & Customer Centricity",
    subtitle: "Revenue-Driving Skills. Retention-Winning Mindsets.",
    description:
      "From cold calls to customer hugs, build teams that connect, convert, and retain with purpose. Top Picks: Storytelling for CX | CRM Tools Mastery | Voice of Customer Loops",
    image: "/Corporate/Images/Training/service-header.webp",
    color: "from-blue-600 to-purple-600",
  },
  {
    id: "hr-talent-development",
    icon: UserCog,
    name: "HR and Talent Development",
    subtitle: "From Process Pushers to Culture Shapers",
    description:
      "HR deserves a seat at the strategy table. These modules upskill teams to drive performance and people growth. Top Picks: Talent Analytics | Learning Ecosystem Design | EX Strategy",
    image: "/Corporate/Images/Training/service-header.webp",
    color: "from-blue-600 to-purple-600",
  },
  {
    id: "custom-corporate-academies",
    icon: Building,
    name: "Custom Corporate Academies",
    subtitle: "Internal Academies Built Like Brands",
    description:
      "Go beyond one-size-fits-all. We help you build academies that scale, stick, and spark transformation across roles. Top Picks: Women in Leadership | Campus to Corporate | Digital Champs",
    image: "/Corporate/Images/Training/service-header.webp",
    color: "from-blue-600 to-purple-600",
  },
  {
    id: "strategic-addons",
    icon: ArrowRight,
    name: "Strategic Add-Ons & Wrap-Arounds",
    subtitle: "Make Training Measurable. Make Learning Stick.",
    description:
      "Boost impact with data, projects, multilingual access, and CXO coaching. These aren't extras—they're essentials. Includes: Pre/Post Assessments | Certification Dashboards | Executive Coaching",
    image: "/Corporate/Images/Training/service-header.webp",
    color: "from-blue-600 to-purple-600",
  },
];

const animations = {
  card: {
    initial: { opacity: 0, y: 50, scale: 0.9 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { type: "spring", stiffness: 400, damping: 10 },
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
  return (
    <Link
      to={`/corporate/training/services/${service.id}`}
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
            translateX: 5,
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div className="relative h-40 sm:h-48 overflow-hidden">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#222B33] opacity-50" />
          </div>
          <div className="p-5 sm:p-7">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-sm sm:text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent leading-tight">
                {service.name}
              </h3>
              <service.icon className="w-5 h-5 sm:w-7 sm:h-7 text-gray-800" />
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

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
