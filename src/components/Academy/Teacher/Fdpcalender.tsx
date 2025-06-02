"use client";
import { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "../UI/button";
import { supabase } from "@/lib/supabase"; // adjust path based on your structure

interface FdpcalenderProps {
  Facultytocontact: () => void;
}

interface TdpCard {
  title: string;
  description: string;
  image: string;
  pdfLink: string;
  features: string[];
}

const tdpPrograms: TdpCard[] = [
  {
    title: "3-Day Intensive TDP",
    description: "Quick-impact, high-energy program focused on essential teaching techniques for the digital classroom",
    image: "/academy/3-Day Intensive TDP.svg",
    pdfLink: "/academy/pdfs/3_Day.pdf",
    features: [
      "Digital Tools Workshop",
      "Student Engagement Tactics",
      "Assessment Redesign"
    ]
  },
  {
    title: "5-Day NEP Mastery TDP",
    description: "Comprehensive program covering NEP principles, implementation strategies and pedagogical transformation",
    image: "/academy/5-Day TDP Calendar (Customizable).svg",
    pdfLink: "/academy/pdfs/5_Day.pdf",
    features: [
      "NEP Framework Deep-Dive",
      "Skill-Based Teaching",
      "Project-Based Learning",
      "Outcome Mapping"
    ]
  },
  {
    title: "Weekend Program for School Leaders",
    description: "Reimagining Education with Transformational Leadership",
    image: "/academy/Weekend Program -Reimagining Education with Transformational Leadership.svg",
    pdfLink: "/academy/pdfs/Weekend_Program.pdf",
    features: [
      "NEP Framework and Objectives",
      "Technology Integration to accelerate future-forward learning.",
      "Building empowered educator communities."
    ]
  }
];

const Fdpcalender = ({ Facultytocontact }: FdpcalenderProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<{ title: string; pdfLink: string } | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  const openModal = (program: { title: string; pdfLink: string }) => {
    setSelectedPdf(program);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !selectedPdf) return;

    setLoading(true);
    const { error } = await supabase.from("pdf_downloads").insert([
      {
        name: formData.name,
        email: formData.email,
        title: selectedPdf.title,
        downloaded_at: new Date().toISOString()
      }
    ]);

    setLoading(false);
    if (!error) {
      setShowModal(false);
      setFormData({ name: "", email: "" });
      const link = document.createElement("a");
      link.href = selectedPdf.pdfLink;
      link.download = selectedPdf.title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("Failed to log download. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10 px-4 md:px-6" data-aos="fade-left">
      <div className="w-full max-w-6xl mt-10">
        <div className="text-center mb-12">
          <h1 className="text-lg md:text-4xl font-bold mb-2">Pick from Ready-to-Run TDP Calendars</h1>
          <p className="text-gray-600 text-8px">Choose the perfect Teacher development program format for your institution</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tdpPrograms.map((program, index) => (
            <div
              key={index}
              className="border rounded-lg p-6 flex flex-col h-full hover:scale-105 transition-transform duration-200"
            >
              <div className="flex justify-center mb-6">
                <img src={program.image} alt={program.title} className="w-[100px] h-[100px]" />
              </div>

              <h2 className="text-xl font-bold text-center mb-2">{program.title}</h2>
              <p className="text-gray-600 text-5px text-center mb-6">{program.description}</p>

              <div className="mb-6">
                <p className="font-medium mb-3">Program Includes:</p>
                <div className="space-y-2">
                  {program.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center mr-3">
                        <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => openModal(program)}
                >
                  <Calendar className="w-4 h-4" />
                  Download Calendar
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            onClick={Facultytocontact}
            className="bg-red-500 hover:bg-red-600 text-white px-6 shadow-lg"
          >
            Get My TDP Calendar
          </Button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm space-y-4 shadow-lg">
            <h2 className="text-lg font-semibold">Enter your details to download</h2>
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button disabled={loading} onClick={handleSubmit}>
                {loading ? "Processing..." : "Download"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fdpcalender;
