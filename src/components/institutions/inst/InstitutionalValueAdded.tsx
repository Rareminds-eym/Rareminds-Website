import { motion } from "framer-motion";
import { BookOpen, CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";

const bannerImg = "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80"; // Institutional Value-Added Services

const whyItMatters = [
  "Ensure transparent and developmental teacher performance evaluations",
  "Enhance NAAC and NIRF ranking preparedness with structured support",
  "Encourage faculty-led innovation through clubs and research cells",
  "Foster a peer-driven, growth-oriented teaching culture"
];

const howWeSupport = [
  "Customizable Teacher Performance Audits aligned with institutional goals",
  "Expert-led NAAC/NIRF readiness workshops and ranking strategy sessions",
  "Support in launching Teacher-Led Innovation Cells and Knowledge Clubs",
  "Facilitation of Peer-Learning Communities across departments",
  "Dashboards, rubrics, and tracking tools for institutional planning and review"
];

const modules = [
  {
    title: "Faculty Performance Audits & Feedback Systems",
    hours: 10,
    objectives: "Develop structured systems to evaluate teaching effectiveness and promote faculty growth",
    activities: "Audit rubrics, classroom observation tools, and feedback mechanisms",
    outcomes: "Universities implement transparent, evidence-based faculty review processes"
  },
  {
    title: "Accreditation & Ranking Readiness (NAAC/NIRF)",
    hours: 8,
    objectives: "Align academic and administrative practices with national quality benchmarks and frameworks",
    activities: "Self-evaluation grids, compliance audit checklists, and strategic planning sheets",
    outcomes: "Improved preparedness for NAAC, NIRF, and global ranking assessments"
  },
  {
    title: "Faculty-Led Innovation & Research Cells",
    hours: 9,
    objectives: "Foster an innovation culture through interdisciplinary faculty projects and campus initiatives",
    activities: "Innovation proposal formats, research impact trackers, and project logs",
    outcomes: "Increased faculty participation in institutional innovation and student engagement"
  },
  {
    title: "Peer-Learning & Academic Mentorship Networks",
    hours: 10,
    objectives: "Create collaborative communities for continuous professional development and peer mentoring",
    activities: "Learning circle models, CPD journals, and co-teaching reflections",
    outcomes: "Enhanced academic collaboration, leadership in pedagogy, and mentorship"
  },
  {
    title: "University Growth Dashboards & Strategic Monitoring",
    hours: 8,
    objectives: "Enable leadership teams to track academic, research, and institutional growth through data",
    activities: "KPI dashboards, data visualization tools, performance reports",
    outcomes: "Data-informed decision-making and evidence-backed institutional reporting"
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
    banner: "/institutions/images/services/communication-banner.jpg", // Add a relevant banner image
  },
  {
    id: "03",
    title: "Mental Health & Counselling Training",
    image: "/institutions/vectors/insticons/3.png",
    link: "/institutions/mental-health-counseling-fdp",
    banner: "/institutions/images/services/mental-health-banner.jpg", // Add a relevant banner image
  },
  {
    id: "04",
    title: "Domain Specific Classification Programs",
    image: "/institutions/vectors/insticons/4.png",
    link: "/institutions/domain-specific-programs",
    banner: "/institutions/images/services/domain-specific-banner.jpg", // Add a relevant banner image
  },
  {
    id: "05",
    title: "Leadership & Career Growth",
    image: "/institutions/vectors/insticons/5.png",
    link: "/institutions/leadership-career-growth",
    banner: "/institutions/images/services/leadership-banner.jpg", // Add a relevant banner image
  },
  {
    id: "06",
    title: "Institutional Value-added Services",
    image: "/institutions/vectors/insticons/6.png",
    link: "/institutions/institutional-value-added-services",
    banner: "/institutions/images/services/value-added-banner.jpg", // Add a relevant banner image
  },
];

const InstitutionalValueAdded = () => {
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
          alt="Institutional Value-Added Services – Universities"
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
              Institutional Value-Added Services – Universities
            </h1>
            <p className="pt-3 text-lg text-white/90">
              Designed to enhance institutional quality, faculty innovation, and academic governance in higher education.
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
              Institutional Value-Added Services – Universities
            </motion.h2>
            <motion.p
              className="text-gray-700 leading-relaxed text-justify text-base px-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              As universities strive for academic excellence and improved rankings, many lack integrated systems that support faculty performance, innovation, and collaborative growth.
            </motion.p>
          </div>
          {/* Module Table (now after intro) */}
          <div className="bg-white rounded-2xl shadow p-6 border border-blue-100">
            <h3 className="font-bold mb-3 text-black text-xl">Institutional Value-Added Services – 5-Module Plan (Total: 45 Hours)</h3>
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
          <motion.h2 className="text-xl font-bold mt-6 mb-2 px-2">What makes Rareminds’ Institutional Value-Add Services different for Higher Education?</motion.h2>
          <motion.p className="text-gray-700 leading-relaxed text-justify text-base px-2">
            Our modular, scalable offerings help institutions build measurable teaching effectiveness, drive innovation from within, and enhance their readiness for NAAC/NIRF accreditation. These services are designed to embed quality, accountability, and collaboration into the core of your academic culture.
          </motion.p>
          <motion.h2 className="text-xl font-bold mt-6 mb-2 px-2">Why It Matters</motion.h2>
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
              {whyItMatters.map((item, index) => (
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
          <motion.h2 className="text-xl font-bold mt-6 mb-2 px-2">How RareMinds Supports Universities</motion.h2>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            {howWeSupport.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <p className="mb-6 text-gray-700 mt-6">
            Empower Educators. Strengthen Systems. Advance Excellence.<br />
            With RareMinds, transform your university into a dynamic, future-ready institution where quality education, collaborative leadership, and grassroots innovation thrive every day.<br />
            
          </p>
        </div>

        {/* DESKTOP ORDER */}
        <div className="max-w-7xl mx-auto gap-10 hidden md:flex flex-row">
          {/* LEFT: About, Details, Why It Matters, How We Support */}
          <div className="flex-1 min-w-0 px-2">
            <motion.h2
              className="text-xl md:text:2xl font-bold mb-6 px-2 pt-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Institutional Value-Added Services – Universities
            </motion.h2>
            <motion.p
              className="text-gray-700 leading-relaxed text-justify text-base md:text-lg px-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              As universities strive for academic excellence and improved rankings, many lack integrated systems that support faculty performance, innovation, and collaborative growth.
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
            <motion.h2 className="text-xl font-bold mt-6 mb-2 px-2">What makes Rareminds’ Institutional Value-Add Services different for Higher Education?</motion.h2>
            <motion.p className="text-gray-700 leading-relaxed text-justify text-base md:text-lg px-2">
              Our modular, scalable offerings help institutions build measurable teaching effectiveness, drive innovation from within, and enhance their readiness for NAAC/NIRF accreditation. These services are designed to embed quality, accountability, and collaboration into the core of your academic culture.
            </motion.p>
            <motion.h2 className="text-xl font-bold mt-6 mb-2 px-2">Why It Matters</motion.h2>
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
                {whyItMatters.map((item, index) => (
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
            <motion.h2 className="text-xl font-bold mt-6 mb-2 px-2">How RareMinds Supports Universities</motion.h2>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              {howWeSupport.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p className="mb-6 text-gray-700 mt-6">
              Empower Educators. Strengthen Systems. Advance Excellence.<br />
              With RareMinds, transform your university into a dynamic, future-ready institution where quality education, collaborative leadership, and grassroots innovation thrive every day.<br />
              
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
              <ul className="space-y-3">
                {filteredServiceCards.map((card) => (
                  <li key={card.id}>
                    <button
                      onClick={() => navigate(card.link)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 transition`}
                    >
                      <img src={card.image} alt={card.title} className="w-8 h-8 rounded-full bg-blue-100 object-contain" />
                      <span className="text-sm font-medium text-blue-900 text-left">{card.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Module Table Section */}
            <div className="bg-white rounded-2xl shadow p-6 border border-blue-100">
              <h3 className="font-bold mb-3 text-black text-xl">Institutional Value-Added Services – 5-Module Plan (Total: 45 Hours)</h3>
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

export default InstitutionalValueAdded;
