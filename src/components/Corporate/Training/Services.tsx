import { motion, AnimatePresence } from "framer-motion";
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
  Download,
  FileSpreadsheet,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCorporateServiceCategories } from "@/services/sdp/courseService";
import { supabase } from "@/lib/supabaseClient";
import { sendEmailNotification } from "@/services/emailBff";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/Corporate/Training/Contact/input";
import { Textarea } from "@/components/Corporate/Training/Contact/textarea";

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
              loading="lazy"
              decoding="async"
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

const COURSE_LIST_PDF_URL = "/institutions/pdfs/Course_List.pdf";

const DownloadCourseListModal = ({ onClose }: { onClose: () => void }) => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: dbError } = await supabase.from("pdf_downloads").insert([
        {
          name: form.name,
          email: form.email,
          title: "Corporate Training Course List",
          pdf_url: COURSE_LIST_PDF_URL,
          download_type: "Course List",
        },
      ]);

      if (dbError) throw dbError;

      await sendEmailNotification("download-notification", {
        name: form.name,
        email: form.email,
        download_type: "Course List",
      }).catch((emailError) => console.error("Download notification failed:", emailError));

      setSubmitted(true);

      const link = document.createElement("a");
      link.href = COURSE_LIST_PDF_URL;
      link.download = "Rareminds-Course-List.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Download started",
        description: "Your course list is downloading now.",
      });
    } catch (err) {
      console.error("Error submitting course list request:", err);
      setError("Something went wrong. Please try again.");
      toast({
        title: "Error",
        description: "There was an error preparing your download. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9998] p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-2xl max-w-md w-full z-[9999]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none"
          aria-label="Close"
        >
          &times;
        </button>

        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Download Course List
        </h3>

        {submitted ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <p className="font-medium text-green-800">
              Your download has started!
            </p>
            <p className="text-sm text-gray-600 mt-1">
              If it didn't start automatically, check your browser's download bar.
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-5">
              Share your details and we'll send you the full course catalog.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="course-list-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <Input
                  id="course-list-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="course-list-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input
                  id="course-list-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  required
                />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={isSubmitting}
                className="button-primary w-full py-3 rounded-full font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? "Preparing download..." : "Download Now"}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

const RequestBlueprintModal = ({ onClose }: { onClose: () => void }) => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    role: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const submission = {
        name: form.name,
        company: form.company,
        email: form.email,
        role: form.role,
        message: form.message
          ? `[Blueprint request] ${form.message}`
          : "[Blueprint request] Requested a training blueprint from the Corporate Training services page.",
        submitted_at: new Date().toISOString(),
      };

      const { error: dbError, data } = await supabase
        .from("training_forms")
        .insert([submission])
        .select()
        .single();

      if (dbError) throw dbError;

      await sendEmailNotification("training-enquiry", data as Record<string, unknown>);

      toast({
        title: "Request Sent!",
        description: "Thank you for reaching out. Our team will send your blueprint shortly.",
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting blueprint request:", err);
      setError("Something went wrong. Please try again.");
      toast({
        title: "Error",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9998] p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-2xl max-w-lg w-full my-8 z-[9999]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none"
          aria-label="Close"
        >
          &times;
        </button>

        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Request Blueprint
        </h3>

        {submitted ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <p className="font-medium text-green-800">
              Request sent successfully!
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Our team will reach out with your training blueprint shortly.
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-5">
              Tell us a bit about your team and we'll put together a tailored training blueprint.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="blueprint-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <Input
                    id="blueprint-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="blueprint-company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <Input
                    id="blueprint-company"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Company Name"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="blueprint-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <Input
                    id="blueprint-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="blueprint-role" className="block text-sm font-medium text-gray-700 mb-1">
                    Role to Train
                  </label>
                  <Input
                    id="blueprint-role"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    placeholder="Job Title/Position"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="blueprint-message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <Textarea
                  id="blueprint-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your training needs"
                  className="min-h-[100px]"
                  required
                />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={isSubmitting}
                className="button-secondary w-full py-3 rounded-full font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Send Request"}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default function Services() {
  const [isCourseListModalOpen, setIsCourseListModalOpen] = useState(false);
  const [isBlueprintModalOpen, setIsBlueprintModalOpen] = useState(false);

  const { data: rawData = [], isLoading: loading } = useQuery({
    queryKey: ['corporate-service-categories'],
    queryFn: getCorporateServiceCategories,
    staleTime: 5 * 60 * 1000,
  });

  const services = useMemo(() => {
    return (rawData as any[]).map((service: any) => ({
      ...service,
      icon: iconMap[service.icon] || BookOpen,
    }));
  }, [rawData]);

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
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="button-primary py-3 px-6 flex items-center gap-2 rounded-full font-semibold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300"
              onClick={() => setIsCourseListModalOpen(true)}
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Download Course List</span>
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="button-secondary py-3 px-6 flex items-center gap-2 rounded-full font-semibold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300"
              onClick={() => setIsBlueprintModalOpen(true)}
            >
              <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Request Blueprint</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isCourseListModalOpen && (
          <DownloadCourseListModal onClose={() => setIsCourseListModalOpen(false)} />
        )}
        {isBlueprintModalOpen && (
          <RequestBlueprintModal onClose={() => setIsBlueprintModalOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}
