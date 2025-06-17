import { motion } from "framer-motion";
import { BookOpen, CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";

const bannerImg = "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80"; // Domain Specific Classification Programs

const whyChoose = [
  "Enhance student employability by building job-ready skills",
  "Complement academic degrees with practical expertise",
  "Strengthen university-industry collaboration for research and innovation",
  "Support accreditation and NAAC/UGC CARE standards with relevant program design",
  "Open pathways to internships, placements, and entrepreneurial ventures"
];

const howWeDeliver = [
  "Collaborations with leading sector experts and companies to co-design course content",
  "Practical, project-based learning modules aligned with NSQF and OBE frameworks",
  "Integration of emerging technologies and industry tools in training",
  "Flexible delivery modes: online, hybrid, or on-campus workshops",
  "Continuous faculty development for program delivery and mentorship",
  "Certification endorsed jointly by RareMinds and industry partners"
];

const modules = [
  {
    title: "Introduction to Emerging Domains",
    hours: 8,
    objectives: "Familiarize students with high-growth sectors like AI, Electric Vehicles, FinTech, AgriTech, and Bioinformatics",
    activities: "Sector-specific industry briefings, career pathway maps, expert video bytes",
    outcomes: "Students gain awareness of future career landscapes and industry expectations"
  },
  {
    title: "Core Concepts in Innovation & Technology",
    hours: 10,
    objectives: "Build interdisciplinary foundations in digital tools, innovation logic, and tech applications",
    activities: "Concept labs, digital simulations, domain-based problem challenges",
    outcomes: "Students understand key innovation principles and tech frameworks across domains"
  },
  {
    title: "Applied Skill Labs by Sector",
    hours: 12,
    objectives: "Strengthen practical understanding through guided labs, tool-based experimentation, and software/hardware tasks",
    activities: "Tinkering toolkits, guided lab modules, simulation-based assessments",
    outcomes: "Students gain hands-on technical exposure relevant to their field of study"
  },
  {
    title: "Capstone Mini Projects (Idea to Prototype)",
    hours: 10,
    objectives: "Enable students to ideate, prototype, and iterate real-world solutions aligned to domain challenges",
    activities: "Design thinking sprints, mentorship sessions, prototyping canvas",
    outcomes: "Students build original functional or conceptual solutions and document the process"
  },
  {
    title: "Project Presentation & Certification",
    hours: 5,
    objectives: "Build professional presentation skills and prepare for industry-endorsed certification",
    activities: "Pitch decks, digital portfolios, evaluation rubrics, and co-branded certification",
    outcomes: "Students demonstrate domain understanding, gain presentation skills, and earn credentials"
  }
];

// Card details for Explore Other Services
const serviceCards = [
  {
    id: "01",
    title: "Faculty Development Programs",
    image: "/institutions/vectors/insticons/1.png",
    link: "/institutions/fdp",
  },
  {
    id: "02",
    title: "Communication & Personality Development",
    image: "/institutions/vectors/insticons/2.png",
    link: "/institutions/communication-personality-development",
    banner: "/institutions/images/services/communication-banner.jpg",
  },
  {
    id: "03",
    title: "Mental Health & Counselling Training",
    image: "/institutions/vectors/insticons/3.png",
    link: "/institutions/mental-health-counseling-fdp",
    banner: "/institutions/images/services/mental-health-banner.jpg",
  },
  {
    id: "04",
    title: "Domain Specific Classification Programs",
    image: "/institutions/vectors/insticons/4.png",
    link: "/institutions/domain-specific-programs",
    banner: "/institutions/images/services/domain-specific-banner.jpg",
  },
  {
    id: "05",
    title: "Leadership & Career Growth",
    image: "/institutions/vectors/insticons/5.png",
    link: "/institutions/leadership-career-growth",
    banner: "/institutions/images/services/leadership-banner.jpg",
  },
  {
    id: "06",
    title: "Institutional Value-added Services",
    image: "/institutions/vectors/insticons/6.png",
    link: "/institutions/institutional-value-added-services",
    banner: "/institutions/images/services/value-added-banner.jpg",
  },
];

const DomainSpecificPrograms = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedModule, setSelectedModule] = React.useState(0);

  // Filter out the current page from the explore section
  const filteredServiceCards = serviceCards.filter(
    (card) => card.link !== location.pathname
  );

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      {/* Header Banner */}
      <div className="relative h-[38vh] overflow-hidden shadow">
        <img
          src={bannerImg}
          alt="Domain-Specific Certification Programs – Universities"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6">
            <motion.button
              onClick={() => navigate("/institutions/services#coursecards")}
              whileHover={{ x: -5 }}
              className="text-white text-base mb-4 flex items-center gap-2 font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Services
            </motion.button>
            <h1 className="pt-3 text-3xl md:text-3xl font-bold text-white mb-2 drop-shadow">
              Domain-Specific Certification Programs – Universities
            </h1>
            <p className="pt-3 text-lg text-white/90">
              Designed to prepare university students for emerging sectors through domain-aligned technical exposure, hands-on innovation, and industry-relevant certifications.
            </p>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="container mx-auto px-4 py-10">
        {/* MOBILE ORDER */}
        <div className="flex flex-col gap-8 md:hidden">
          {/* About The Program */}
          <div>
            <motion.h2
              className="text-xl font-bold mb-4 px-2 pt-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Domain-Specific Certification Programs – Universities
            </motion.h2>
            <motion.p
              className="text-gray-700 leading-relaxed text-justify text-base px-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Many universities face the challenge of ensuring their graduates possess the specific, industry-validated skills (AgriTech, EV, EdTech, AI, Biotechnology) that employers highly seek after in today's competitive job market.
            </motion.p>
          </div>
          {/* Module Table (now after intro) */}
          <div className="bg-white rounded-2xl shadow p-6 border border-blue-100">
            <h3 className="font-bold mb-3 text-black text-xl">Domain-Specific Certification Programs – Module Plan (Total: 45 Hours)</h3>
            <div className="max-h-[400px] overflow-y-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left py-2 text-zinc-700 font-semibold">Module Title</th>
                    <th className="text-left py-2 text-zinc-700 font-semibold">Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {modules.map((mod, idx) => (
                    <tr
                      key={mod.title}
                      className={`cursor-pointer rounded-lg transition ${selectedModule === idx ? "bg-blue-100 font-semibold" : "hover:bg-blue-50"}`}
                      onClick={() => setSelectedModule(idx)}
                    >
                      <td className="py-2 pr-2">{mod.title}</td>
                      <td className="py-2">{mod.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Module Details (now after table) */}
          {modules[selectedModule] && (
            <div className="mt-2 mb-8">
              <h3 className="font-bold text-xl pt-2 mb-6 text-black">Module Details</h3>
              <div className="bg-white rounded-2xl p-8 shadow border border-blue-100">
                <div className="mb-6">
                  <div className="font-semibold text-blue-700 mb-1">Learning Objectives:</div>
                  <p className="text-gray-800 pl-2">{modules[selectedModule].objectives}</p>
                </div>
                <div className="mb-6">
                  <div className="font-semibold text-blue-700 mb-1">Activities / Tools:</div>
                  <p className="text-gray-800 pl-2">{modules[selectedModule].activities}</p>
                </div>
                <div>
                  <div className="font-semibold text-blue-700 mb-1">Outcomes:</div>
                  <p className="text-gray-800 pl-2">{modules[selectedModule].outcomes}</p>
                </div>
              </div>
            </div>
          )}
          <motion.h2 className="text-xl font-bold mt-6 mb-2 px-2">What makes Rareminds Domain-Specific Certification Programs different?</motion.h2>
          <motion.p className="text-gray-700 leading-relaxed text-justify text-base px-2">
            Our programs integrate the latest industry standards, technologies, and skill demands directly into the curriculum. Through hands-on projects, expert mentorship, and real-world case studies, students gain specialized knowledge and credentials that differentiate them in competitive job markets.
          </motion.p>
          <motion.h2 className="text-xl font-bold mt-6 mb-2 px-2">Why Choose Domain-Specific Certifications?</motion.h2>
          <div className="mt-6 bg-gradient-to-br from-blue-100 to-indigo-100 p-8 rounded-2xl px-8 shadow border border-indigo-100">
            <motion.ul
              className="space-y-4"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
            >
              {whyChoose.map((item, index) => (
                <motion.li
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-800 text-base">{item}</p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
          <motion.h2 className="text-xl font-bold mt-6 mb-2 px-2">How RareMinds Delivers Excellence</motion.h2>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            {howWeDeliver.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <p className="mb-6 text-gray-700 mt-6">
            Unlock Industry-Ready Expertise<br />
            By partnering with Rare Minds, your university can offer programs that directly address industry needs, making your graduates more competitive and your institution a leader in career-focused education.<br />
            <span className="font-semibold">👉 [Have questions or ready to collaborate? Contact us today!]</span>
          </p>
        </div>

        {/* DESKTOP ORDER */}
        <div className="max-w-7xl mx-auto gap-10 hidden md:flex flex-row">
          {/* LEFT: About, Details, Why Choose, How We Deliver */}
          <div className="flex-1 min-w-0 px-2">
            <motion.h2
              className="text-xl md:text:2xl font-bold mb-6 px-2 pt-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Domain-Specific Certification Programs – Universities
            </motion.h2>
            <motion.p
              className="text-gray-700 leading-relaxed text-justify text-base md:text-lg px-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Many universities face the challenge of ensuring their graduates possess the specific, industry-validated skills (AgriTech, EV, EdTech, AI, Biotechnology) that employers highly seek after in today's competitive job market.
            </motion.p>
            {/* Show Module Details immediately after intro */}
            {modules[selectedModule] && (
              <div className="mt-8 mb-8">
                <h3 className="font-bold text-xl pt-2 mb-6 text-black">Module Details</h3>
                <div className="bg-white rounded-2xl p-8 shadow border border-blue-100">
                  <div className="mb-6">
                    <div className="font-semibold text-blue-700 mb-1">Learning Objectives:</div>
                    <p className="text-gray-800 pl-2">{modules[selectedModule].objectives}</p>
                  </div>
                  <div className="mb-6">
                    <div className="font-semibold text-blue-700 mb-1">Activities / Tools:</div>
                    <p className="text-gray-800 pl-2">{modules[selectedModule].activities}</p>
                  </div>
                  <div>
                    <div className="font-semibold text-blue-700 mb-1">Outcomes:</div>
                    <p className="text-gray-800 pl-2">{modules[selectedModule].outcomes}</p>
                  </div>
                </div>
              </div>
            )}
            <motion.h2 className="text-xl font-bold mt-6 mb-2 px-2">What makes Rareminds Domain-Specific Certification Programs different?</motion.h2>
            <motion.p className="text-gray-700 leading-relaxed text-justify text-base md:text-lg px-2">
              Our programs integrate the latest industry standards, technologies, and skill demands directly into the curriculum. Through hands-on projects, expert mentorship, and real-world case studies, students gain specialized knowledge and credentials that differentiate them in competitive job markets.
            </motion.p>
            <motion.h2 className="text-xl font-bold mt-6 mb-2 px-2">Why Choose Domain-Specific Certifications?</motion.h2>
            <div className="mt-6 bg-gradient-to-br from-blue-100 to-indigo-100 p-8 rounded-2xl px-8 shadow border border-indigo-100">
              <motion.ul
                className="space-y-4"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.15,
                    },
                  },
                }}
              >
                {whyChoose.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-800 text-base">{item}</p>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            <motion.h2 className="text-xl font-bold mt-6 mb-2 px-2">How RareMinds Delivers Excellence</motion.h2>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              {howWeDeliver.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p className="mb-6 text-gray-700 mt-6">
              Unlock Industry-Ready Expertise<br />
              By partnering with Rare Minds, your university can offer programs that directly address industry needs, making your graduates more competitive and your institution a leader in career-focused education.<br />
            </p>
          </div>
          {/* RIGHT: Bookmark & Module Table */}
          <div className="w-full md:w-[370px] shrink-0 flex flex-col gap-8">
            {/* Bookmark Section */}
            <div className="bg-white rounded-2xl shadow p-6 border border-blue-100">
              <h3 className="font-bold mb-4 flex items-center gap-2 text-black text-xl">
                <BookOpen className="w-5 h-5 text-black" />
                Explore Other Services
              </h3>
              <ul className="space-y-2">
                {filteredServiceCards.map((card) => (
                  <li key={card.id}>
                    <button
                      onClick={() => navigate(card.link)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 transition flex items-center gap-2"
                    >
                      <img src={card.image} alt={card.title} className="w-6 h-6 rounded" />
                      <span className="text-sm font-medium text-blue-900">{card.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Module Table Section */}
            <div className="bg-white rounded-2xl shadow p-6 border border-blue-100">
              <h3 className="font-bold mb-3 text-black text-xl">Domain-Specific Certification Programs – Module Plan (Total: 45 Hours)</h3>
              <div className="max-h-[720px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left py-2 text-zinc-700 font-semibold">Module Title</th>
                      <th className="text-left py-2 text-zinc-700 font-semibold">Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modules.map((mod, idx) => (
                      <tr
                        key={mod.title}
                        className={`cursor-pointer rounded-lg transition ${selectedModule === idx ? "bg-blue-100 font-semibold" : "hover:bg-blue-50"}`}
                        onClick={() => setSelectedModule(idx)}
                      >
                        <td className="py-2 pr-2">{mod.title}</td>
                        <td className="py-2">{mod.hours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainSpecificPrograms;
