import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const ResourcesPage = () => {
  // Modal and form state
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [downloadReady, setDownloadReady] = useState(false);
  const [selectedResource, setSelectedResource] = useState<{ title: string; pdfLink: string } | null>(null);

  // Dummy resource links for demonstration
  const resourceLinks = [
    {
      title: "Career Counselling Blueprint (Grades 9–12)",
      pdfLink: "/academy/pdfs/Career_Counselling_Blueprint.pdf",
    },
    {
      title: "Confidence & Goal Tracker PDF",
      pdfLink: "/academy/pdfs/Confidence,Goal,Skill&8–12.pdf",
    },
    {
      title: "Spoken English Daily Practice Sheet",
      pdfLink: "/academy/pdfs/30-DaySpokenEnglishPracticeSheet.pdf",
    },
    {
      title: "EEE Course Overview with Job Pathways",
      pdfLink: "/academy/pdfs/EEECourseOverviewwithJobPathways.pdf",
    },
  ];

  // Open modal with selected resource
  const handleDownloadClick = (resourceIdx: number) => {
    setSelectedResource(resourceLinks[resourceIdx]);
    setModalOpen(true);
    setName("");
    setEmail("");
    setPhone("");
    setErrorMsg("");
    setDownloadReady(false);
  };

  // Form submit handler (replace with your Supabase/email logic if needed)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg("Please fill in all fields.");
      return;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
      setErrorMsg("Please enter a valid 10-digit phone number.");
      return;
    }
    setLoading(true);
    // Simulate async (replace with real logic)
    setTimeout(() => {
      setLoading(false);
      setDownloadReady(true);
    }, 1200);
  };

  return (
    <div className="h-autopx-8 bg-white py-8 mt-8" data-aos="fade-down-right ">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-6">
          <h1 className="text-3xl text-center font-bold mb-2">Free Student Resource Pack – Instant Downloads
          </h1>
          <p className="text-gray-600 mb-8 text-center">
          What Students, Parents & Schools Get:

          </p>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="relative w-[300px] h-[auto]  ">
  <img src="/images/academy/resourcecard.jpg" alt="Example" className="w-full h-full object-cover rounded-md" />
  <button className="w-[160px] absolute bottom-2 right-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
    Download PDF
  </button>
</div>



            <ResourceCard
              title="5-Day PDP Calendar"
              description="Complete breakdown of our signature faculty development program with daily activities"
              icon="calendar"
              downloadLabel="Download PDF"
            />
            <ResourceCard
              title="Career Counselling Blueprint"
              description="Comprehensive guide to career guidance for a wide range of student needs"
              icon="chart-line"
              downloadLabel="Download PDF"
            />
          </div> */}

<div className="flex justify-center md:justify-center">
<div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-6 mt-16">
  <div className="relative w-[300px] h-[auto] rounded-md overflow-hidden">
    <img
      src=" /academy/resourcecard.jpg"
      alt="Example"
      className="w-full h-full object-cover"
    />


    <div className="absolute inset-0 flex flex-col justify-center text-black text-left px-6">

  {/* Icon/Image below content */}
  <img src="/academy/careerCounsellingBlueprint.svg" alt="" className="w-16 h-16 "  />
  {/* Heading */}
  <h2 className="text-[18px] font-semibold mb-2">
  Career Counselling Blueprint (Grades 9–12)


  </h2>

  {/* Subheading */}
  <p className="text-[16px] mb-4">
  {/* "Reimagine Teaching. Redefine Learning." */}

  </p>

</div>
    {/* Button */}
    <a
  href="#"
  onClick={e => { e.preventDefault(); handleDownloadClick(0); }}
  className="w-[160px] absolute bottom-2 right-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-center"
>
  Download PDF
</a>
  </div>

  <div className="relative w-[300px] h-[auto] rounded-md overflow-hidden">
    <img
      src="/academy/resourcecard.jpg"
      alt="Example"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 flex flex-col justify-center text-black text-left px-6">

  {/* Icon/Image below content */}
  <img src="/academy/Confidence & Goal Tracker PDF.svg" alt="" className="w-8 h-8 md:w-16 md:h-16 "  />
  {/* Heading */}
  <h2 className="text-[18px] font-semibold mb-2">
  Confidence & Goal Tracker PDF

  </h2>

  {/* Subheading */}
  <p className="text-[16px] mb-4">
  {/* "Your Child’s Future Starts Today: Career Counselling Blueprint for Grades 9–12" */}
  </p>

</div>
    {/* Button */}
    <a
  href="#"
  onClick={e => { e.preventDefault(); handleDownloadClick(1); }}
  className="w-[160px] absolute bottom-2 right-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-center"
>
  Download PDF
</a>
  </div>





  <div className="relative w-[300px] h-[auto] rounded-md overflow-hidden">
    <img
      src="/academy/resourcecard.jpg"
      alt="Example"
      className="w-full h-full object-cover"
    />

    {/* Overlay content */}
    {/* <div className="absolute inset-0 flex flex-col items-center justify-center text-black text-center px-4 ">
       <img src="/images/academy/ai.png" alt="" className="w-28 h-6 "/>
      <div className="flex items-center gap-2 mb-2">
       
        <h2 className="text-[24px] font-semibold pl-6 text-left">Career Counselling Blueprint</h2>
      </div>
      <p className="text-[16px] text-left pl-6">
        Comprehensive guide to career guidance for grades 9–12 with assessment tools
      </p>
    </div> */}
    <div className="absolute inset-0 flex flex-col justify-center text-black text-left px-6">

  {/* Icon/Image below content */}
  <img src="/academy/spoken english dally Practice Sheet .svg" alt="" className="w-8 h-8 md:w-16 md:h-16 "  />
  {/* Heading */}
  <h2 className="text-[18px] font-semibold mb-2">
  Spoken English Daily Practice Sheet


  </h2>

  {/* Subheading */}
  <p className="text-[16px] mb-4">
  {/* A Quick Audit for Schools Moving Toward 21st-Century Excellence. */}

  </p>

</div>
    {/* Button */}
    <a
  href="#"
  onClick={e => { e.preventDefault(); handleDownloadClick(2); }}
  className="w-[160px] absolute bottom-2 right-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-center"
>
  Download PDF
</a>
  </div>


  <div className="relative w-[300px] h-[auto] rounded-md overflow-hidden">
    <img
      src="/academy/resourcecard.jpg"
      alt="Example"
      className="w-full h-full object-cover"
    />

    {/* Overlay content */}
    {/* <div className="absolute inset-0 flex flex-col items-center justify-center text-black text-center px-4 ">
       <img src="/images/academy/ai.png" alt="" className="w-28 h-6 "/>
      <div className="flex items-center gap-2 mb-2">
       
        <h2 className="text-[24px] font-semibold pl-6 text-left">Career Counselling Blueprint</h2>
      </div>
      <p className="text-[16px] text-left pl-6">
        Comprehensive guide to career guidance for grades 9–12 with assessment tools
      </p>
    </div> */}
    <div className="absolute inset-0 flex flex-col justify-center text-black text-left px-6">

  {/* Icon/Image below content */}
  <img src="/academy/EEE Course Overview with Job Pathways.svg" alt="" className="w-8 h-8 md:w-16 md:h-16  "  />
  {/* Heading */}
  <h2 className="text-[18px] font-semibold mb-2">
  EEE Course Overview with Job Pathways


  </h2>

  {/* Subheading */}
  <p className="text-[16px] mb-4">
  {/* A Quick Audit for Schools Moving Toward 21st-Century Excellence. */}

  </p>

</div>
    {/* Button */}
    <a
  href="#"
  onClick={e => { e.preventDefault(); handleDownloadClick(3); }}
  className="w-[160px] absolute bottom-2 right-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-center"
>
  Download PDF
</a>
  </div>
  </div>
</div>


        </div>
      </div>

      {/* <div className="border-t border-gray-100 mt-12"></div> */}
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

export default ResourcesPage;
