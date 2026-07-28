import { Download, Calendar } from "lucide-react";
import { useState } from "react";
import { supabase } from "../../../../lib/supabase";

export const CTASection = ({ onDemoClick }: { onDemoClick: () => void, onWaitlistClick: () => void }) => {
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
        download_type: 'Daily Learning'
      }]);

      if (dbError) {
        // DB insert failed — do NOT trigger download
        setError('Failed to submit. Please try again.');
        return;
      }

      // Insert succeeded — mark submitted and trigger download
      setSubmitted(true);
      const link = document.createElement('a');
      link.href = '/passport/pdf/Daily Learning.pdf';
      link.download = 'Daily-Learning.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      setError('Unexpected error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="daily-learning-download"
      className="py-20 px-6 text-center"
      style={{ scrollMarginTop: '100px' }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-[#000000] mb-4">
          Talent isn't missing — it's just not mapped. The Rareminds Skill Passport changes that.
        </h2>

        <p className="text-base md:text-xl text-gray-600 mb-10"></p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="bg-white border-2 border-[#000000] text-[#000000] hover:bg-gray-100 px-6 py-5 rounded-full font-semibold flex items-center justify-center transition-all">
            <Download className="mr-2 h-5 w-5" />
            Daily Learning
          </button>

          <button
            type="button"
            onClick={onDemoClick}
            className="bg-[#E32A18] hover:bg-[#C41F0D] text-white px-6 py-5 rounded-full font-semibold flex items-center justify-center transition-all"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Book a Demo
          </button>
        </div>
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
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Download Daily Learning</h3>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label htmlFor="dl-name" className="block text-gray-700 font-semibold mb-2">Your Name</label>
                <input id="dl-name" type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required maxLength={100} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E32A18] text-black bg-white" />
              </div>
              <div className="flex-1">
                <label htmlFor="dl-company" className="block text-gray-700 font-semibold mb-2">Company</label>
                <input id="dl-company" type="text" name="company" value={form.company} onChange={handleChange} placeholder="Company Name" required maxLength={100} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E32A18] text-black bg-white" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label htmlFor="dl-email" className="block text-gray-700 font-semibold mb-2">Email Address</label>
                <input id="dl-email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="name@company.com" required maxLength={255} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E32A18] text-black bg-white" />
              </div>
              <div className="flex-1">
                <label htmlFor="dl-phone" className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                <input id="dl-phone" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" required maxLength={20} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E32A18] text-black bg-white" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label htmlFor="dl-role" className="block text-gray-700 font-semibold mb-2">Role to Hire</label>
                <input id="dl-role" type="text" name="role" value={form.role} onChange={handleChange} placeholder="Job Title/Position" required maxLength={100} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E32A18] text-black bg-white" />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="dl-message" className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea id="dl-message" name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your hiring needs or challenges" required maxLength={1000} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E32A18] text-black bg-white resize-none" rows={3} />
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
    </section>
  );
};
