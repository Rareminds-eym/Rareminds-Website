import { motion } from "framer-motion";
import { BookOpen, CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";

const bannerImg = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"; // Mental Health & Counselling Training

const whyItMatters = [
  "Supports safe, supportive, and inclusive classrooms.",
  "Empowers teachers to teach holistically, not just grade assignments.",
  "Reduces teacher burnout and emotional overload.",
  "Boosts student trust, engagement, and retention."
];

const howWeSupport = [
  {
    title: "Identifying At-Risk Students",
    desc: "Training instructors to spot behavioral warning signs and preliminary mental health signals through classroom observation and interaction patterns."
  },
  {
    title: "Peer Counseling & First Response Skills",
    desc: "Providing teachers with formal peer support techniques and emotional first-aid strategies to address distress before it escalates."
  },
  {
    title: "Faculty as Mentors: Empathy & Active Listening",
    desc: "Establishing empathetic communication practices through active listening training, enabling teachers to engage more effectively with students."
  },
  {
    title: "Social-Emotional Learning (SEL) Integration",
    desc: "Introducing SEL models that can be incorporated into everyday teaching, developing emotional intelligence, resilience, and classroom harmony."
  },
  {
    title: "Experiential Learning",
    desc: "Utilizing simulations and exercises focusing on empathy-building to empower faculty."
  }
];

const modules = [
  {
    title: "Recognizing Mental Health Challenges in University Settings",
    hours: 10,
    objectives: "Identify early warning signs of emotional distress among students and peers using behavioral and academic indicators",
    activities: "Case studies, behavioral checklists, observation rubrics",
    outcomes: "Faculty and student leaders proactively identify peers needing support"
  },
  {
    title: "Peer Support and Emotional First Aid",
    hours: 8,
    objectives: "Understand how to offer non-judgmental listening and emotional first aid within peer groups and student circles",
    activities: "Role-plays, peer help cards, support network mapping",
    outcomes: "Students and faculty provide appropriate initial emotional support"
  },
  {
    title: "Mentoring with Empathy & Active Listening",
    hours: 10,
    objectives: "Build skills in empathy, non-verbal listening, and reflective communication for effective mentorship",
    activities: "Listening labs, empathy drills, mentoring journals",
    outcomes: "Improved mentor-mentee relationships and stronger emotional trust"
  },
  {
    title: "Creating Emotionally Safe Learning Environments",
    hours: 9,
    objectives: "Develop practices that foster psychological safety in classrooms, labs, and campus spaces",
    activities: "Safe zone strategies, collaborative class charters, and anxiety mapping",
    outcomes: "Emotionally inclusive classrooms and mentally secure learning spaces"
  },
  {
    title: "Referral Protocols and Professional Boundaries",
    hours: 8,
    objectives: "Respond to distress signs with clarity and know when and how to refer to professional counselors or helplines",
    activities: "Referral pathways, boundary-setting scenarios, and case simulations",
    outcomes: "Faculty and peer mentors respond ethically without overstepping their roles"
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

const MentalHealthCounselingFDP = () => {
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
          alt="Mental Health and Counseling Training – Faculty Development Program (FDP)"
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
              Mental Health and Counseling Training – Faculty Development Program (FDP)
            </h1>
            <p className="pt-3 text-lg text-white/90">
              Empowering university stakeholders to recognize, support, and promote student mental health and emotional well-being.
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
              Mental Health and Counseling Training – Faculty Development Program (FDP)
            </motion.h2>
            <motion.p
              className="text-gray-700 leading-relaxed text-justify text-base px-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              In today's educational environments, supporting student mental health is essential. Faculty members are often the first to notice academic stress, emotional distress, and behavioral difficulties in students. However, many educators lack the specific skills and confidence to identify early warning signs or respond effectively. This gap can lead to missed intervention opportunities and student disengagement.
            </motion.p>
          </div>
          {/* Module Table (now after intro) */}
          <div className="bg-white rounded-2xl shadow p-6 border border-blue-100">
            <h3 className="font-bold mb-3 text-black text-xl">Mental Health and Counselling Training – Module Plan (Total: 45 Hours)</h3>
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
          <motion.h2 className="text-xl font-bold mt-6 mb-2 px-2">What makes Rareminds’ Mental Health & Counseling Training different for your faculty?</motion.h2>
          <motion.p className="text-gray-700 leading-relaxed text-justify text-base px-2">
            Our program enables your institution to cultivate emotionally empathetic faculty members equipped to support student well-being while maintaining their own mental equilibrium. We focus on practical skills rather than turning teachers into therapists. Our training prepares them to be more observant, attentive, and supportive guides for students.
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
          <motion.h2 className="text-xl font-bold mt-6 mb-2 px-2">How RareMinds Supports Your Institution</motion.h2>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            {howWeSupport.map((item, idx) => (
              <li key={idx}>
                <b>{item.title}:</b> {item.desc}
              </li>
            ))}
          </ul>
          <p className="mb-6 text-gray-700 mt-6">
            Empower Educators. Foster Well-being. Enhance Learning.<br />
            With RareMinds, transform your institution by equipping your faculty to become emotionally intelligent educators, building classrooms that nurture both academic achievement and personal well-being.<br />
            <span className="font-semibold">👉 [Have questions or ready to collaborate? Contact us today!]</span>
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
              Mental Health and Counseling Training – Faculty Development Program (FDP)
            </motion.h2>
            <motion.p
              className="text-gray-700 leading-relaxed text-justify text-base md:text-lg px-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              In today's educational environments, supporting student mental health is essential. Faculty members are often the first to notice academic stress, emotional distress, and behavioral difficulties in students. However, many educators lack the specific skills and confidence to identify early warning signs or respond effectively. This gap can lead to missed intervention opportunities and student disengagement.
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
            <motion.h2 className="text-xl font-bold mt-6 mb-2 px-2">What makes Rareminds’ Mental Health & Counseling Training different for your faculty?</motion.h2>
            <motion.p className="text-gray-700 leading-relaxed text-justify text-base md:text-lg px-2">
              Our program enables your institution to cultivate emotionally empathetic faculty members equipped to support student well-being while maintaining their own mental equilibrium. We focus on practical skills rather than turning teachers into therapists. Our training prepares them to be more observant, attentive, and supportive guides for students.
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
            <motion.h2 className="text-xl font-bold mt-6 mb-2 px-2">How RareMinds Supports Your Institution</motion.h2>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              {howWeSupport.map((item, idx) => (
                <li key={idx}>
                  <b>{item.title}:</b> {item.desc}
                </li>
              ))}
            </ul>
            <p className="mb-6 text-gray-700 mt-6">
              Empower Educators. Foster Well-being. Enhance Learning.<br />
              With RareMinds, transform your institution by equipping your faculty to become emotionally intelligent educators, building classrooms that nurture both academic achievement and personal well-being.<br />
             
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
              <h3 className="font-bold mb-3 text-black text-xl">Mental Health and Counselling Training – Module Plan (Total: 45 Hours)</h3>
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

export default MentalHealthCounselingFDP;
