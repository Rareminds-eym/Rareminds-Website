import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

// Types
interface ServiceData {
  ContentSlug: string;
  Heading1: string;
}

interface SocialIcon {
  id: number;
  icon: React.ComponentType<{ size?: number; className?: string }> | string;
  link: string;
  label: string;
}

// Constants
const SOCIAL_ICONS: SocialIcon[] = [
  {
    id: 1,
    icon: Facebook,
    link: "https://www.facebook.com/raremindsgroup",
    label: "Facebook",
  },
  {
    id: 2,
    icon: "ri:twitter-x-fill",
    link: "https://x.com/minds_rare",
    label: "X (Twitter)",
  },
  {
    id: 3,
    icon: Instagram,
    link: "https://www.instagram.com/rareminds_eym/",
    label: "Instagram",
  },
  {
    id: 4,
    icon: Youtube,
    link: "https://www.youtube.com/channel/UClkBtwJsScYxFzNoFdlifeA",
    label: "YouTube",
  },
  {
    id: 5,
    icon: Linkedin,
    link: "https://www.linkedin.com/company/rareminds/",
    label: "LinkedIn",
  },
];

const MOCK_SERVICE_DATA: ServiceData[] = [
  { ContentSlug: "recruitment", Heading1: "Recruitment" },
  { ContentSlug: "executive-search", Heading1: "Executive Search" },
  { ContentSlug: "contract-staffing", Heading1: "Contract Staffing" },
  { ContentSlug: "talent-assessment", Heading1: "Talent Assessment" },
];

const CORPORATE_TRAINING_SERVICES = [
  {
    to: "/corporate/training/services/workplace-productivity",
    label: "Workplace Productivity & Digital Fluency",
  },
  {
    to: "/corporate/training/services/tech-upskilling",
    label: "Tech Upskilling & Future Skills",
  },
  {
    to: "/corporate/training/services/behavioral-culture",
    label: "Behavioral & Organizational Culture Programs",
  },
];

const CORPORATE_SERVICES = [
  {
    to: "/corporate/recruitment/services/interview-as-a-service",
    label: "Interview-as-a-service",
  },
  {
    to: "/corporate/recruitment/services/diversity-hiring",
    label: "Diversity Hiring",
  },
  {
    to: "/corporate/recruitment/services/pre-onboarding-support",
    label: "Pre-Onboarding Support",
  },
];

const EMAIL_REGEX = /(.+)@(.+){2,}\.(.+){2,}/;
const SUCCESS_MESSAGE_TIMEOUT = 2000;
const SCROLL_DELAY = 350;

// Animation variants
const socialIconsVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const socialIconVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

const FooterBar: React.FC = () => {
  // State
  const [serviceData, setServiceData] = useState<ServiceData[]>([]);
  const [subscriberEmail, setSubscriberEmail] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoized values
  const userType = useMemo(() => localStorage.getItem("currentUserType"), []);
  
  const pageType = useMemo(() => {
    const pathname = location.pathname;
    return {
      isCorporate: pathname.startsWith("/corporate/recruitment"),
      isCorporateTraining: pathname.startsWith("/corporate/training"),
    };
  }, [location.pathname]);

  // Effects
  useEffect(() => {
    setServiceData(MOCK_SERVICE_DATA);
  }, [userType]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Handlers
  const scrollToServices = useCallback((path: string) => {
    navigate(path);
    setTimeout(() => {
      const el = document.getElementById("services");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, SCROLL_DELAY);
  }, [navigate]);

  const handleViewAll = useCallback((
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    scrollToServices("/corporate/recruitment");
  }, [scrollToServices]);

  const handleTrainingViewAll = useCallback((
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    scrollToServices("/corporate/training");
  }, [scrollToServices]);

  const validateEmail = useCallback((email: string): boolean => {
    return EMAIL_REGEX.test(email);
  }, []);

  const submitSubscription = useCallback(() => {
    if (!subscriberEmail.trim()) {
      setSuccessMessage("Please enter an email address");
      return;
    }

    if (!validateEmail(subscriberEmail)) {
      setSuccessMessage("Enter a valid email address");
      return;
    }

    setSuccessMessage("Thank you for subscribing");
    setSubscriberEmail("");
    
    // Clear previous timeout if exists
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setSuccessMessage(null);
      timeoutRef.current = null;
    }, SUCCESS_MESSAGE_TIMEOUT);
  }, [subscriberEmail, validateEmail]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSuccessMessage(null);
    setSubscriberEmail(e.target.value);
  }, []);

  const handleFormSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    submitSubscription();
  }, [submitSubscription]);

  // Render functions
  const renderSocialIcon = useCallback((social: SocialIcon) => {
    const commonProps = {
      key: social.id,
      href: social.link,
      target: "_blank" as const,
      rel: "noopener noreferrer",
      "aria-label": social.label,
      className: "bg-gray-800 hover:bg-red-600 transition-colors p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500",
      variants: socialIconVariants,
      whileHover: { scale: 1.18, rotate: -6 },
    };

    if (typeof social.icon === "string") {
      return (
        <motion.a {...commonProps}>
          <Icon
            icon={social.icon}
            width={20}
            height={20}
            className="text-white"
          />
        </motion.a>
      );
    }

    const IconComponent = social.icon as React.ComponentType<{ size?: number; className?: string }>;
    return (
      <motion.a {...commonProps}>
        <IconComponent size={20} className="text-white" />
      </motion.a>
    );
  }, []);

  const renderServiceLinks = useCallback(() => {
    if (pageType.isCorporateTraining) {
      return (
        <>
          {CORPORATE_TRAINING_SERVICES.map((service) => (
            <li key={service.to}>
              <Link
                to={service.to}
                className="hover:text-red-400 transition-colors"
              >
                {service.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="/corporate/training/services"
              onClick={handleTrainingViewAll}
              className="hover:text-red-400 transition-colors font-semibold cursor-pointer"
            >
              View All
            </a>
          </li>
        </>
      );
    }

    if (pageType.isCorporate) {
      return (
        <>
          {CORPORATE_SERVICES.map((service) => (
            <li key={service.to}>
              <Link
                to={service.to}
                className="hover:text-red-400 transition-colors"
              >
                {service.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="/corporate/recruitment#services"
              onClick={handleViewAll}
              className="hover:text-red-400 transition-colors font-semibold cursor-pointer"
            >
              View All
            </a>
          </li>
        </>
      );
    }

    return serviceData.map((service) => (
      <li key={service.ContentSlug}>
        <Link
          to={`/${service.ContentSlug}`}
          className="hover:text-red-400 transition-colors"
        >
          {service.Heading1}
        </Link>
      </li>
    ));
  }, [pageType, serviceData, handleViewAll, handleTrainingViewAll]);

  return (
    <div
      className="relative bg-[url('https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/general/footer.webp')] text-white font-medium"
      id="footer"
    >
      <div className="absolute w-full h-full bg-black/90" />
      
      <div className="relative px-4 lg:px-14 grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-6 lg:gap-8 container mx-auto py-12">
        {/* Quick Links Section */}
        <div className="lg:col-span-1">
          <h2 className="font-bold mb-4 uppercase tracking-wider text-lg">
            Quick Links
          </h2>
          <ul className="space-y-3">
            <li>
              <Link to="/" className="hover:text-red-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-red-400 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact-us"
                className="hover:text-red-400 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Verticals Section */}
        <div className="lg:col-span-1">
          <h2 className="font-bold mb-4 uppercase tracking-wider text-lg">
            Verticals
          </h2>
          <ul className="space-y-3">
            <li>
              <Link
                to="/corporate/recruitment"
                className="hover:text-red-400 transition-colors"
              >
                Corporate
              </Link>
            </li>
            <li>
              <Link
                to="/institutions"
                className="hover:text-red-400 transition-colors"
              >
                Institutions
              </Link>
            </li>
            <li>
              <Link
                to="/government"
                className="hover:text-red-400 transition-colors"
              >
                Government
              </Link>
            </li>
            <li>
              <Link
                to="/academia"
                className="hover:text-red-400 transition-colors"
              >
                Academia
              </Link>
            </li>
          </ul>
        </div>

        {/* Our Services Section */}
        <div className="lg:col-span-1">
          <h2 className="font-bold mb-4 uppercase tracking-wider text-lg">
            Our Services
          </h2>
          <ul className="space-y-3">
            {renderServiceLinks()}
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="lg:col-span-1">
          <h2 className="font-bold mb-4 uppercase tracking-wider text-lg">
            Contact Us
          </h2>
          <ul className="space-y-3 text-white/90">
            <li>
              <span className="font-semibold">Phone:</span>
              <a
                href="tel:+919562481100"
                className="ml-2 text-sm hover:text-red-400 transition-colors inline-block"
              >
                +91 95624 81100
              </a>
            </li>
            <li>
              <span className="font-semibold">Email:</span>
              <a
                href="mailto:info@rareminds.com"
                className="ml-2 text-sm hover:text-red-400 transition-colors inline-block"
              >
                info@rareminds.com
              </a>
            </li>
            <li>
              <span className="font-semibold">Location:</span>
              <span className="ml-2 text-sm inline-block">Karnataka</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup Section */}
        <div className="lg:col-span-1 md:col-span-2">
          <h2 className="font-bold mb-4 uppercase tracking-wider text-lg">
            Sign up to our newsletter
          </h2>
          <form onSubmit={handleFormSubmit} className="space-y-3 max-w-sm">
            <input
              type="email"
              placeholder="Email address"
              value={subscriberEmail}
              className="p-3 w-full bg-white/10 border border-red-400/30 text-white placeholder-white/70 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white/20"
              onChange={handleEmailChange}
            />
            <button
              type="submit"
              className="p-3 w-full bg-red-600 text-white font-bold rounded hover:bg-red-700 transition-colors"
            >
              SUBSCRIBE
            </button>
          </form>
          {successMessage && (
            <p className="text-white text-center mt-4 bg-red-500/20 p-2 rounded max-w-sm">
              {successMessage}
            </p>
          )}
        </div>
      </div>

      {/* Social Icons */}
      <motion.div
        className="container relative mx-auto flex justify-center space-x-4 py-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={socialIconsVariants}
      >
        {SOCIAL_ICONS.map(renderSocialIcon)}
      </motion.div>

      {/* Footer Bottom Section */}
      <div className="relative border-t border-gray-700 py-6 text-center text-gray-400">
        <div className="container px-4 lg:px-14 mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm sm:text-base">© {new Date().getFullYear()} Rareminds. All rights reserved.</p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4">
            <Link
              to="/privacy-policy"
              className="hover:text-red-400 transition-colors text-sm sm:text-base"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="hover:text-red-400 transition-colors text-sm sm:text-base"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBar;