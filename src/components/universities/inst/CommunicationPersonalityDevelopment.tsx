import { motion } from "framer-motion";
import { BookOpen, CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";

// Use unique dummy images for each service
const bannerImg =
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80"; // Communication & Personality Development

const whyItMatters = [
  "Enhances teaching effectiveness and faculty presence in classrooms and academic events",
  "Improves student trust, participation, and overall learning outcomes",
  "Strengthens external communication with institutional stakeholders",
  "Supports NEP-aligned goals of holistic education and learner-centered pedagogy",
];

const modules = [
  {
    title: "Academic & Professional Spoken English",
    hours: 9,
    objectives:
      "Enhance fluency, pronunciation, and confidence in academic and professional English contexts",
    activities:
      "Academic debates, elevator pitches, pronunciation labs, mock interviews",
    outcomes:
      "Improved academic discourse, professional articulation, and fluency",
  },
  {
    title: "Public Speaking & Presentation Mastery",
    hours: 9,
    objectives:
      "Develop impactful presentations, voice modulation, and audience engagement for seminars, conferences, and teaching",
    activities: "TED-style talks, peer evaluations, storytelling drills",
    outcomes:
      "Stronger stage presence, persuasive delivery, and presentation confidence",
  },
  {
    title: "Inclusive & Positive Classroom Communication",
    hours: 9,
    objectives:
      "Learn empathetic, inclusive strategies for managing diverse learners in classrooms or seminars",
    activities: "Case studies, group dynamics, role-play, empathy mapping",
    outcomes:
      "Collaborative classroom environment, respectful dialogue, and inclusive leadership",
  },
  {
    title: "Professional Communication & Stakeholder Interaction",
    hours: 9,
    objectives:
      "Build effective communication with peers, industry professionals, parents (for educators), and academic committees",
    activities:
      "Email frameworks, mock stakeholder meetings, and conflict resolution role-plays",
    outcomes:
      "Sharper professional writing, confident stakeholder interaction",
  },
  {
    title: "Self-Confidence, Influence & Emotional Intelligence",
    hours: 9,
    objectives:
      "Strengthen interpersonal impact, emotional regulation, and leadership presence",
    activities: "Reflective journals, self-image mapping, peer coaching circles",
    outcomes:
      "Enhanced self-awareness, assertive communication, leadership readiness",
  },
];

// Card details for Explore Other Services
const serviceCards = [
  {
    id: "01",
    title: "Faculty Development Programs",
    image: "/institutions/vectors/insticons/1.png",
    link: "/universities/fdp",
  },
  {
    id: "02",
    title: "Communication & Personality Development",
    image: "/institutions/vectors/insticons/2.png",
    link: "/universities/communication-personality-development",
    banner: "/institutions/images/services/communication-banner.jpg",
  },
  {
    id: "03",
    title: "Mental Health & Counselling Training",
    image: "/institutions/vectors/insticons/3.png",
    link: "/universities/mental-health-counseling-fdp",
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
    link: "/universities/leadership-career-growth",
    banner: "/institutions/images/services/leadership-banner.jpg",
  },
  {
    id: "06",
    title: "Institutional Value-added Services",
    image: "/institutions/vectors/insticons/6.png",
    link: "/universities/institutional-value-added-services",
    banner: "/institutions/images/services/value-added-banner.jpg",
  },
];

const CommunicationPersonalityDevelopment = () => {
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
          alt="Communication and Personality Development"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6">
            <motion.button
              onClick={() => navigate("/universities/services#coursecards")}
              whileHover={{ x: -5 }}
              className="text-white text-base mb-4 flex items-center gap-2 font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Services
            </motion.button>
            <h1 className="pt-3 text-3xl md:text-3xl font-bold text-white mb-2 drop-shadow">
              Communication and Personality Development
            </h1>
            <p className="pt-3 text-lg text-white/90">
              Empowering university students and educators with 21st-century
              communication, confidence, and collaboration skills.
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
              Communication and Personality Development
            </motion.h2>
            <motion.p
              className="text-gray-700 leading-relaxed text-justify text-base px-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              In today’s evolving higher education landscape, subject expertise
              alone is no longer sufficient. University educators are now expected
              to inspire diverse student cohorts, engage in cross-disciplinary
              dialogue, and communicate with clarity across academic,
              administrative, and industry platforms. Rareminds’ 21st-century
              communication and leadership training equips faculty with the skills
              needed to lead with presence, empathy, and professionalism.
            </motion.p>
          </div>
          {/* Module Table (now after intro) */}
          <div className="bg-white rounded-2xl shadow p-6 border border-blue-100">
            <h3 className="font-bold mb-3 text-black text-xl">
              Communication and Personality Development – Module Plan (Total: 45
              Hours)
            </h3>
            <div className="max-h-[400px] overflow-y-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left py-2 text-zinc-700 font-semibold">
                      Module Title
                    </th>
                    <th className="text-left py-2 text-zinc-700 font-semibold">
                      Hours
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {modules.map((mod, idx) => (
                    <tr
                      key={mod.title}
                      className={`cursor-pointer rounded-lg transition ${
                        selectedModule === idx
                          ? "bg-blue-100 font-semibold"
                          : "hover:bg-blue-50"
                      }`}
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
              <h3 className="font-bold text-xl pt-2 mb-6 text-black">
                Module Details
              </h3>
              <div className="bg-white rounded-2xl p-8 shadow border border-blue-100">
                <div className="mb-6">
                  <div className="font-semibold text-blue-700 mb-1">
                    Learning Objectives:
                  </div>
                  <p className="text-gray-800 pl-2">
                    {modules[selectedModule].objectives}
                  </p>
                </div>
                <div className="mb-6">
                  <div className="font-semibold text-blue-700 mb-1">
                    Activities / Tools:
                  </div>
                  <p className="text-gray-800 pl-2">
                    {modules[selectedModule].activities}
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-blue-700 mb-1">
                    Outcomes:
                  </div>
                  <p className="text-gray-800 pl-2">
                    {modules[selectedModule].outcomes}
                  </p>
                </div>
              </div>
            </div>
          )}
          <motion.h2 className="text-xl font-bold mt-6 mb-2 px-2">
            What Sets Rareminds’ Program Apart?
          </motion.h2>
          <motion.p className="text-gray-700 leading-relaxed text-justify text-base px-2">
            Our modules are designed specifically for higher education
            professionals, blending real-world case simulations with
            evidence-based strategies. Whether it’s delivering impactful
            lectures, managing student interactions, or collaborating with
            stakeholders, participants gain tools they can apply immediately
            within their academic environments.
          </motion.p>
          <motion.h2 className="text-xl font-bold mt-6 mb-2 px-2">
            How Rareminds Supports University Faculty:
          </motion.h2>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>
              <b>Academic Communication & Public Speaking:</b> Strengthens
              educators’ verbal and non-verbal communication for seminars,
              conferences, classroom delivery, and peer collaboration. Focus
              areas include articulation, presentation fluency, pronunciation
              enhancement, and academic discourse techniques to foster
              confidence in any professional setting.
            </li>
            <li>
              <b>Inclusive Classroom Facilitation & Student Engagement:</b>
              Introduces non-confrontational, student-centered engagement
              strategies to manage academic discourse, student behavior, and
              diverse learning profiles. Faculty learn how to foster
              inclusivity, maintain authority with empathy, and adapt teaching
              methods to accommodate neurodiverse and multicultural student
              populations.
            </li>
            <li>
              <b>Parent & Stakeholder Communication (for University Contexts):</b>
              For educators in roles involving outreach, mentorship, or placement
              coordination, the module builds communication strategies for
              interacting with parents, alumni, and industry partners. Training
              includes giving feedback, managing expectations, and delivering
              difficult conversations with clarity and respect.
            </li>
          </ul>
          <motion.h2 className="text-xl font-bold mt-6 mb-2 px-2">
            Why It Matters:
          </motion.h2>
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
          <p className="mb-6 text-gray-700 mt-6">
            At Rareminds, we don’t just train educators to teach—we prepare them
            to lead, communicate, and inspire with clarity and purpose across the
            academic spectrum.
          </p>
        </div>

        {/* DESKTOP ORDER */}
        <div className="max-w-7xl mx-auto gap-10 hidden md:flex flex-row">
          {/* LEFT: About, Details, Why It Matters */}
          <div className="flex-1 min-w-0 px-2">
            <motion.h2
              className="text-xl md:text:2xl font-bold mb-6 px-2 pt-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Communication and Personality Development
            </motion.h2>
            <motion.p
              className="text-gray-700 leading-relaxed text-justify text-base md:text-lg px-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              In today’s evolving higher education landscape, subject expertise
              alone is no longer sufficient. University educators are now expected
              to inspire diverse student cohorts, engage in cross-disciplinary
              dialogue, and communicate with clarity across academic,
              administrative, and industry platforms. Rareminds’ 21st-century
              communication and leadership training equips faculty with the skills
              needed to lead with presence, empathy, and professionalism.
            </motion.p>
            {/* Show Module Details immediately after intro */}
            {modules[selectedModule] && (
              <div className="mt-8 mb-8">
                <h3 className="font-bold text-xl pt-2 mb-6 text-black">
                  Module Details
                </h3>
                <div className="bg-white rounded-2xl p-8 shadow border border-blue-100">
                  <div className="mb-6">
                    <div className="font-semibold text-blue-700 mb-1">
                      Learning Objectives:
                    </div>
                    <p className="text-gray-800 pl-2">
                      {modules[selectedModule].objectives}
                    </p>
                  </div>
                  <div className="mb-6">
                    <div className="font-semibold text-blue-700 mb-1">
                      Activities / Tools:
                    </div>
                    <p className="text-gray-800 pl-2">
                      {modules[selectedModule].activities}
                    </p>
                  </div>
                  <div>
                    <div className="font-semibold text-blue-700 mb-1">
                      Outcomes:
                    </div>
                    <p className="text-gray-800 pl-2">
                      {modules[selectedModule].outcomes}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <motion.h2 className="text-xl font-bold mt-6 mb-2 px-2">
              What Sets Rareminds’ Program Apart?
            </motion.h2>
            <motion.p className="text-gray-700 leading-relaxed text-justify text-base md:text-lg px-2">
              Our modules are designed specifically for higher education
              professionals, blending real-world case simulations with
              evidence-based strategies. Whether it’s delivering impactful
              lectures, managing student interactions, or collaborating with
              stakeholders, participants gain tools they can apply immediately
              within their academic environments.
            </motion.p>
            <motion.h2 className="text-xl font-bold mt-6 mb-2 px-2">
              How Rareminds Supports University Faculty:
            </motion.h2>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>
                <b>Academic Communication & Public Speaking:</b> Strengthens
                educators’ verbal and non-verbal communication for seminars,
                conferences, classroom delivery, and peer collaboration. Focus
                areas include articulation, presentation fluency, pronunciation
                enhancement, and academic discourse techniques to foster
                confidence in any professional setting.
              </li>
              <li>
                <b>Inclusive Classroom Facilitation & Student Engagement:</b>
                Introduces non-confrontational, student-centered engagement
                strategies to manage academic discourse, student behavior, and
                diverse learning profiles. Faculty learn how to foster
                inclusivity, maintain authority with empathy, and adapt teaching
                methods to accommodate neurodiverse and multicultural student
                populations.
              </li>
              <li>
                <b>Parent & Stakeholder Communication (for University Contexts):</b>
                For educators in roles involving outreach, mentorship, or placement
                coordination, the module builds communication strategies for
                interacting with parents, alumni, and industry partners. Training
                includes giving feedback, managing expectations, and delivering
                difficult conversations with clarity and respect.
              </li>
            </ul>
            <motion.h2 className="text-xl font-bold mt-6 mb-2 px-2">
              Why It Matters:
            </motion.h2>
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
            <p className="mb-6 text-gray-700 mt-6">
              At Rareminds, we don’t just train educators to teach—we prepare them
              to lead, communicate, and inspire with clarity and purpose across the
              academic spectrum.
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
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-6 h-6 rounded"
                      />
                      <span className="text-sm font-medium text-blue-900">
                        {card.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Module Table Section */}
            <div className="bg-white rounded-2xl shadow p-6 border border-blue-100">
              <h3 className="font-bold mb-3 text-black text-xl">
                Communication and Personality Development – Module Plan (Total: 45
                Hours)
              </h3>
              <div className="max-h-[720px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left py-2 text-zinc-700 font-semibold">
                        Module Title
                      </th>
                      <th className="text-left py-2 text-zinc-700 font-semibold">
                        Hours
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {modules.map((mod, idx) => (
                      <tr
                        key={mod.title}
                        className={`cursor-pointer rounded-lg transition ${
                          selectedModule === idx
                            ? "bg-blue-100 font-semibold"
                            : "hover:bg-blue-50"
                        }`}
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

export default CommunicationPersonalityDevelopment;
