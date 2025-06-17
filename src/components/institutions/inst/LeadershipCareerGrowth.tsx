import { motion } from "framer-motion";
import { BookOpen, CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";

const bannerImg = "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=1200&q=80"; // Leadership & Career Growth

const whyItMatters = [
  "Strengthen leadership at every level to align with NEP 2020 and NAAC/NBA",
  "Boost faculty morale, teaching quality, and research culture through empowered leadership",
  "Enhance placement outcomes via industry networking and student readiness",
  "Ensure sustainable professional development with institutionalized frameworks"
];

const howWeDeliver = [
  "3-Day Leadership Retreats with scenario-based planning and reflective labs",
  "Skill-building in governance, mentoring, and accreditation-aligned leadership",
  "Placement Officer Modules focused on ecosystem building, networking, and student-industry interface",
  "Custom frameworks for Continuous Professional Development (CPD) across departments",
  "Ready-to-use toolkits for academic audits, stakeholder engagement, and goal setting"
];

const modules = [
  {
    title: "Foundations of Academic Leadership",
    hours: 10,
    objectives: "Understand leadership frameworks, institutional transformation strategies, and NEP-aligned goals",
    activities: "Leadership case studies in higher education, stakeholder mapping, and vision-setting tools",
    outcomes: "Faculty articulate academic vision and align teams with strategic institutional priorities"
  },
  {
    title: "Curriculum Planning & Faculty Development",
    hours: 10,
    objectives: "Build instructional leadership through academic planning, faculty mentoring, and quality assurance",
    activities: "Program planning templates, FDP frameworks, peer mentoring role-plays",
    outcomes: "Academic leaders design effective programs and support faculty growth and innovation"
  },
  {
    title: "Emotional Intelligence & Conflict Resolution",
    hours: 8,
    objectives: "Strengthen emotional resilience, team management, and conflict-handling skills in academic settings",
    activities: "Reflection journals, empathy case labs, and feedback simulations",
    outcomes: "Faculty leaders foster collaboration, reduce friction, and manage diverse teams constructively"
  },
  {
    title: "Innovation & Change Leadership",
    hours: 10,
    objectives: "Drive institutional improvement through academic innovation and change management practices",
    activities: "Innovation tracking dashboards, change readiness maps, and ideation sessions",
    outcomes: "Leaders initiate adaptive reforms and build a culture of continuous improvement"
  },
  {
    title: "Institutional Growth Planning & Leadership Communication",
    hours: 7,
    objectives: "Create strategic development plans and effectively communicate institutional progress",
    activities: "University growth plan templates, leadership pitch decks, and impact storytelling tools",
    outcomes: "Leaders confidently design and present data-driven improvement strategies"
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
    title: "Institutional ed Services",
    image: "/institutions/vectors/insticons/6.png",
    link: "/institutions/institutional-value-added-services",
    banner: "/institutions/images/services/value-added-banner.jpg",
  },
];

const LeadershipCareerGrowth = () => {
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
          alt="Leadership & Career Growth – Universities"
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
              Leadership & Career Growth – Universities
            </h1>
            <p className="pt-3 text-lg text-white/90">
              Equipping university faculty and academic leaders with strategic, instructional, and emotional competencies for institutional transformation and personal growth.
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
              Leadership & Career Growth – Universities
            </motion.h2>
            <motion.p
              className="text-gray-700 leading-relaxed text-justify text-base px-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Many universities face the challenge of developing effective academic leaders (HODs/Deans) and equipping their placement officers with the skills needed to drive institutional growth and enhance student career success in alignment with NEP goals.
            </motion.p>
          </div>
          {/* Module Table (now after intro) */}
          <div className="bg-white rounded-2xl shadow p-6 border border-blue-100">
            <h3 className="font-bold mb-3 text-black text-xl">Leadership and Career Growth – Module Plan (Total: 45 Hours)</h3>
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
          <motion.h2 className="text-xl font-bold mt-6 mb-2 px-2">What makes Rareminds Leadership & Career Growth Program different for Universities?</motion.h2>
          <motion.p className="text-gray-700 leading-relaxed text-justify text-base px-2">
            From the Aspiring Academic Leaders Program to strategic networking modules for Placement Officers, we develop leadership agility, strategic planning skills, and cross-functional collaboration. Participants gain practical tools to mentor faculty, align with accreditation standards, and build industry partnerships for student success.
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
          <motion.h2 className="text-xl font-bold mt-6 mb-2 px-2">How RareMinds Delivers Impact</motion.h2>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            {howWeDeliver.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <p className="mb-6 text-gray-700 mt-6">
            Lead with Purpose. Scale with Strategy.<br />
            By investing in Rare Minds' leadership and career growth programs, your university can cultivate a strong leadership team and enhance its career services, ultimately benefiting both faculty and students.<br />
            
          </p>
        </div>

        {/* DESKTOP ORDER */}
        <div className="max-w-7xl mx-auto gap-10 hidden md:flex flex-row">
          {/* LEFT: About, Details, Why It Matters, How We Deliver */}
          <div className="flex-1 min-w-0 px-2">
            <motion.h2
              className="text-xl md:text:2xl font-bold mb-6 px-2 pt-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Leadership & Career Growth – Universities
            </motion.h2>
            <motion.p
              className="text-gray-700 leading-relaxed text-justify text-base md:text-lg px-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Many universities face the challenge of developing effective academic leaders (HODs/Deans) and equipping their placement officers with the skills needed to drive institutional growth and enhance student career success in alignment with NEP goals.
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
            <motion.h2 className="text-xl font-bold mt-6 mb-2 px-2">What makes Rareminds Leadership & Career Growth Program different for Universities?</motion.h2>
            <motion.p className="text-gray-700 leading-relaxed text-justify text-base md:text-lg px-2">
              From the Aspiring Academic Leaders Program to strategic networking modules for Placement Officers, we develop leadership agility, strategic planning skills, and cross-functional collaboration. Participants gain practical tools to mentor faculty, align with accreditation standards, and build industry partnerships for student success.
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
            <motion.h2 className="text-xl font-bold mt-6 mb-2 px-2">How RareMinds Delivers Impact</motion.h2>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              {howWeDeliver.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p className="mb-6 text-gray-700 mt-6">
              Lead with Purpose. Scale with Strategy.<br />
              By investing in Rare Minds' leadership and career growth programs, your university can cultivate a strong leadership team and enhance its career services, ultimately benefiting both faculty and students.<br />
              <span className="font-semibold">👉 [Have questions or ready to collaborate? Contact us today!]</span>
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
              <h3 className="font-bold mb-3 text-black text-xl">Leadership and Career Growth – Module Plan (Total: 45 Hours)</h3>
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

export default LeadershipCareerGrowth;
