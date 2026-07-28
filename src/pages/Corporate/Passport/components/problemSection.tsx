import { Card } from "@/components/ui/card";
import { ArrowRight, BadgeCheck, FileBarChart2, EyeOff, Download } from "lucide-react";
import { useState } from "react";
import { supabase } from "../../../../lib/supabase";

export const ProblemSection = ({ onDemoClick }: { onDemoClick: () => void }) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    role: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFormComplete = Object.values(form).every((v) => v.trim() !== "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Guard against duplicate submissions while a request is in flight or already done.
    if (loading || submitted) return;

    // Native browser validity check covers required, maxLength, type=email, etc.
    const formEl = e.target as HTMLFormElement;
    if (!formEl.checkValidity()) {
      formEl.reportValidity();
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(form.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    // Normalize phone (strip spaces, dashes, parentheses) then validate
    const normalizedPhone = form.phone.trim().replace(/[\s\-()]/g, '');
    const phoneRegex = /^\+?\d{7,15}$/;
    if (!phoneRegex.test(normalizedPhone)) {
      setError('Please enter a valid phone number (7–15 digits).');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: dbError } = await supabase.from('pdf_downloads').insert([{
        ...form,
        download_type: 'Habit Card'
      }]);

      if (dbError) {
        // DB insert failed — do NOT trigger download
        setError('Failed to submit. Please try again.');
        return;
      }

      // Insert succeeded — mark submitted and trigger download
      setSubmitted(true);
      const link = document.createElement('a');
      link.href = '/passport/pdf/Habit Card_Website.pdf';
      link.download = 'Habit-Card.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      setError('Unexpected error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const problems = [
    {
      icon: BadgeCheck,
      title: "Skills Without Proof",
      description:
        "70% of graduates lack visible, validated job-ready skills. Training happens everywhere — but without standardized records, employers can't verify capability beyond a resume.",
      circleBg: "bg-indigo-500",
      iconColor: "text-white",
    },
    {
      icon: FileBarChart2,
      title: "Data Without Context",
      description:
        "Traditional systems track attendance, not ability. Time and completion data don't tell who can do what. Organizations waste hours screening for skills they already trained for.",
      circleBg: "bg-rose-500",
      iconColor: "text-white",
    },
    {
      icon: EyeOff,
      title: "Talent Without Visibility",
      description:
        "Skilled learners remain unseen. Without a single, live source of truth, employees lose opportunities — and  organizations lose great talent. Managing Resources better - With Skill Passport.",
      circleBg: "bg-sky-400",
      iconColor: "text-white",
    },
  ];

  return (
    <section
      id="habit-card-download"
      className="py-20 bg-[#F9FAFB]"
      style={{ scrollMarginTop: '100px' }}
    >
      <div className="container mx-auto px-6 text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#000000] mb-4">
          It's Not the Employability Gap — It's the{" "}
          <span className="text-[#E32A18]">Visibility Gap.</span>
        </h2>
        <p className="text-sm md:text-base text-gray-500 mb-16">
          The right talent isn't found through resumes — it's revealed through skills.
        </p>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <Card
                key={index}
                className="relative p-8 pt-12 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 mt-6 md:mt-6 lg:mt-0"
              >
                {/* Circular icon that overlaps the card */}
                <div
                  className={`absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white ${problem.circleBg} ${problem.iconColor}`}
                >
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-[#000000] text-center mb-3">
                  {problem.title}
                </h3>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed text-center">
                  {problem.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Small italic line + CTA */}
        <p className="text-sm text-gray-500 italic mt-12 mb-6">
          It's time to change how skills are recognized &amp; resources are managed.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={onDemoClick}
            type="button"
            className="inline-flex items-center gap-3 bg-[#E32A18] hover:bg-[#cc2515] text-white px-6 py-3 rounded-full font-semibold shadow-md transition-all duration-200"
          >
            See How It Works <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => setShowForm(true)}
            type="button"
            className="inline-flex items-center gap-3 bg-white hover:bg-gray-50 border-2 border-[#E32A18] text-[#E32A18] hover:text-[#cc2515] px-6 py-3 rounded-full font-semibold shadow-md transition-all duration-200"
          >
            <Download className="h-4 w-4" /> Habit Card
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <form className="bg-white rounded-xl p-6 shadow-2xl max-w-2xl w-full relative max-h-[90vh] overflow-y-auto" autoComplete="off" onSubmit={handleSubmit}>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-3xl font-bold focus:outline-none z-10"
                aria-label="Close form"
              >
                &times;
              </button>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Download Habit Card</h3>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <label htmlFor="hc-name" className="block text-gray-700 font-semibold mb-2">Your Name</label>
                  <input id="hc-name" type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required maxLength={100} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E32A18] text-black bg-white" />
                </div>
                <div className="flex-1">
                  <label htmlFor="hc-company" className="block text-gray-700 font-semibold mb-2">Company</label>
                  <input id="hc-company" type="text" name="company" value={form.company} onChange={handleChange} placeholder="Company Name" required maxLength={100} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E32A18] text-black bg-white" />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <label htmlFor="hc-email" className="block text-gray-700 font-semibold mb-2">Email Address</label>
                  <input id="hc-email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="name@company.com" required maxLength={255} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E32A18] text-black bg-white" />
                </div>
                <div className="flex-1">
                  <label htmlFor="hc-phone" className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                  <input id="hc-phone" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" required maxLength={20} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E32A18] text-black bg-white" />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <label htmlFor="hc-role" className="block text-gray-700 font-semibold mb-2">Role to Hire</label>
                  <input id="hc-role" type="text" name="role" value={form.role} onChange={handleChange} placeholder="Job Title/Position" required maxLength={100} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E32A18] text-black bg-white" />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="hc-message" className="block text-gray-700 font-semibold mb-2">Message</label>
                <textarea id="hc-message" name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your hiring needs or challenges" required maxLength={1000} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E32A18] text-black bg-white resize-none" rows={3} />
              </div>
              {error && <p className="text-red-600 mb-2">{error}</p>}
              {submitted && <p className="text-green-600 mb-2">Thank you! Your download will start now.</p>}
              <button
                type="submit"
                disabled={!isFormComplete || loading || submitted}
                className={`bg-[#E32A18] hover:bg-[#cc2515] px-7 py-3 rounded-lg font-semibold transition-all duration-300 text-white w-full mt-2 ${(!isFormComplete || loading || submitted) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Submitting...' : submitted ? 'Submitted' : 'Submit'}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
