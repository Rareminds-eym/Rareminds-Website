import { useState } from "react";
import { Calendar, ChartLine, Download, FileText, Book } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient"; // Adjust the import path as necessary



type IconType = "calendar" | "chart-line" | "download" | "file-text" | "book";

interface Resource {
  icon: IconType;
  title: string;
  description: string;
  pdfLink: string;
  svgIconPath: string; // for your custom SVG icon in /academy/
}

const resources: Resource[] = [
  {
    icon: "calendar",
    title: "5-Day TDP Calendar",
    description: '"Reimagine Teaching. Redefine Learning."',
    pdfLink: "https://drive.google.com/file/d/1bmJoQdaW5oC0vZcuDs-iieFgOVCudl9q/view?usp=drive_link",
    svgIconPath: "/academy/5-Day TDP Calendar (Customizable).svg",
  },
  {
    icon: "chart-line",
    title: "Our Career Counselling Blueprint for Grades 9–12",
    description: "Your Child’s Future Starts Today: Career Counselling Blueprint for Grades 9–12",
    pdfLink: "https://drive.google.com/file/d/1HZR62_uyBC4kceBO3KV2KYYOzjwM1mfk/view?usp=drive_link",
    svgIconPath: "/academy/careerCounsellingBlueprint.svg",
  },
  {
    icon: "file-text",
    title: "Checklist: Is Your School NEP-Ready?",
    description: "A Quick Audit for Schools Moving toward 21st-Century Excellence.",
    pdfLink: "https://drive.google.com/file/d/1kK27P0N26CiREpZK9tRirJaJCyKv4Mh-/view?usp=drive_link",
    svgIconPath: "/academy/NEP-Ready School Checklist.svg",
  },
];

const getIcon = (icon: IconType) => {
  switch (icon) {
    case "calendar":
      return <Calendar className="h-6 w-6" />;
    case "chart-line":
      return <ChartLine className="h-6 w-6" />;
    case "file-text":
      return <FileText className="h-6 w-6" />;
    case "book":
      return <Book className="h-6 w-6" />;
    default:
      return <Download className="h-6 w-6" />;
  }
};

const ResourcesPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Open modal and set the clicked resource
  const handleDownloadClick = (resource: Resource) => {
    setSelectedResource(resource);
    setModalOpen(true);
    setName("");
    setEmail("");
    setPhone("");
    setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    // Basic email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    // Basic phone validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
      setErrorMsg("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!selectedResource) return;

    setLoading(true);

    try {
      // Insert data into Supabase table demo_pdf
      const { error } = await supabase.from("demo_pdf").insert([
        {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        setLoading(false);
        setErrorMsg("Failed to save data. Please try again.");
        return;
      }

      // Send email
      const response = await fetch('https://email-sender-ssmu.onrender.com/send-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          resourceTitle: selectedResource.title,
          pdfUrl: selectedResource.pdfLink
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setLoading(false);
      setModalOpen(false);
    } catch (err) {
      setLoading(false);
      setErrorMsg("An error occurred. Please try again.");
    }
  };

  return (
    <div className="h-auto bg-white py-8" data-aos="fade-down-right">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-6">
          <h1 className="text-xl md:text-4xl text-center font-bold mb-2">Downloadable Resources</h1>
          <p className="text-gray-600 mb-8 text-center">
            Get free resources to help transform your educational approach
          </p>

          <div className="flex justify-center md:justify-start">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-6 mt-16">
              {resources.map((resource) => (
                <div
                  key={resource.title}
                  className="relative w-[300px] h-auto rounded-md overflow-hidden shadow-md"
                >
                  <img
                    src="/academy/resourcecard.jpg"
                    alt="Resource Background"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center text-black text-left px-6 bg-white bg-opacity-70">
                    <img
                      src={resource.svgIconPath}
                      alt={`${resource.title} icon`}
                      className="w-8 h-8 md:w-12 md:h-12 mb-2"
                    />
                    <h2 className="text-[18px] font-semibold mb-2">{resource.title}</h2>
                    <p className="text-[16px] mb-4">{resource.description}</p>
                  </div>
                  <button
                    onClick={() => handleDownloadClick(resource)}
                    className="w-[160px] absolute bottom-2 right-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-center"
                  >
                    Download PDF
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              aria-label="Close modal"
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4">Please enter your details</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-1 font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit phone number"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              {errorMsg && <p className="text-red-600">{errorMsg}</p>}

              <button
                type="submit"
                disabled={loading}
                className={cn(
                  "w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded transition-colors",
                  loading ? "opacity-50 cursor-not-allowed" : ""
                )}
              >
                {loading ? "Submitting..." : "Submit & Download"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;
