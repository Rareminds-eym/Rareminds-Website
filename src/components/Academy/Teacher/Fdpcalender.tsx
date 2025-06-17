"use client";
import { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "../UI/button";
import { supabase } from "@/lib/supabase"; // adjust path based on your structure
import { cn } from "@/lib/utils";

interface FdpcalenderProps {
  Facultytocontact: () => void;
}

interface TdpCard {
  title: string;
  description: string;
  image: string;
  alt: string;
  pdfLink: string;
  features: string[];
}

interface Resource {
  title: string;
  pdfLink: string;
}

const tdpPrograms: TdpCard[] = [
  {
    title: "3-Day Intensive TDP",
    description: "Quick-impact, high-energy program focused on essential teaching techniques for the digital classroom",
    image: "/academy/3-Day Intensive TDP.svg",
    alt: " Icon of a smart classroom interface with three students, symbolizing digital learning and virtual instruction",
    pdfLink: "https://drive.google.com/file/d/113jMQrHdB9aTxtpFUtluf-o-go19l_QC/view?usp=drive_link",
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
    alt: " Calendar icon displaying the number 5, representing scheduling, program duration, or structured learning timelines",
    pdfLink: "https://drive.google.com/file/d/1bmJoQdaW5oC0vZcuDs-iieFgOVCudl9q/view?usp=drive_link",
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
    alt: " Icon of an empowered individual with raised arms, symbolizing student confidence, achievement, or career readiness",
    pdfLink: "https://drive.google.com/file/d/1FexjnvsqLziLlk71F2wU4I7apQWzK5i2/view?usp=drive_link",
    features: [
      "NEP Framework and Objectives",
      "Technology Integration to accelerate future-forward learning.",
      "Building empowered educator communities."
    ]
  }
];

const Fdpcalender = ({ Facultytocontact }: FdpcalenderProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [downloadReady, setDownloadReady] = useState(false);
  

  // Open modal and set the clicked resource
    const handleDownloadClick = (resource: Resource) => {
      setSelectedResource(resource);
      setModalOpen(true);
      setName("");
      setEmail("");
      setPhone("");
      setErrorMsg("");
      setDownloadReady(false);
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
        setDownloadReady(true);
        // Do not close modal yet; show download link
      } catch (err) {
        setLoading(false);
        setErrorMsg("An error occurred. Please try again.");
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
                <img src={program.image} alt={program.title } className="w-[100px] h-[100px]" />
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
                  onClick={() => handleDownloadClick(program)}
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
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => { setModalOpen(false); setDownloadReady(false); }}
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
              {!downloadReady && (
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
              )}
            </form>
            {downloadReady && selectedResource && (
              <div className="mt-4 text-center">
                <a
                  href={selectedResource.pdfLink}
                  download
                  className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition-colors mt-2"
                  onClick={() => { setModalOpen(false); setDownloadReady(false); }}
                >
                  Click here to download your PDF
                </a>
                <p className="text-green-600 mt-2">A copy has also been sent to your email.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Fdpcalender;
