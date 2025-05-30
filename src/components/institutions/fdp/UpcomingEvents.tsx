import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

export default function UpcomingEvents() {
  const events = [
    {
      date: "Duration: 5 Days",
      title: "NEP-Ready Teaching: From Policy to Practice",
      description:
        "Equip faculty to implement NEP 2020 through interdisciplinary teaching, OBE, credit-based course design, and leadership in curriculum transformation.",
      extra: "Audience: University Faculty, Department Heads, Academic Leaders",
      link: "/downloads/nep-policy-practice.pdf",
    },
    {
      date: "Duration: 5 Days",
      title: "Translating NEP 2020 into Pedagogical Practice",
      description:
        "Equip faculty with 21st-century pedagogical tools including Activity-Based Learning, experiential design, gamification, blended learning, and outcome-aligned assessments to foster student-centered classrooms.",
      extra: "Audience: University Faculty, Department Heads, Academic Leaders",
      link: "/downloads/nep-pedagogy.pdf",
    },
    {
      date: "Duration: 2 Days",
      title: "Building Research Excellence & Publication Readiness in Higher Education",
      description:
        "Empower faculty with practical research and publication skills, enabling them to write high-impact papers, secure research grants, and contribute to institutional research visibility.",
      extra: "Audience: University Faculty, Department Heads, Academic Leaders",
      link: "/downloads/research-excellence.pdf",
    },
    {
      date: "Duration: 2 Days",
      title: "Empowering Entrepreneurial Faculty for NEP-Aligned Innovation in Higher Education",
      description:
        "Enable faculty to nurture entrepreneurial mindsets in students through experiential pedagogy, curriculum design, mentorship, and institutional innovation frameworks.",
      extra: "Audience: University Faculty, Department Heads, Academic Leaders",
      link: "/downloads/entrepreneurial-faculty.pdf",
    },
    {
      date: "Duration: 1 Day",
      title: "Green Campus & Sustainability Education for Future-Ready Universities",
      description:
        "Equip faculty with the knowledge, tools, and strategies to integrate sustainability into curriculum, campus practices, and institutional frameworks aligned with NAAC, NBA, and SDG goals.",
      extra: "Audience: University Faculty, Department Heads, Academic Leaders",
      link: "/downloads/green-campus.pdf",
    },
    {
      date: "Duration: 5 Days",
      title: "Digital Tools Upskilling & Tech-Integrated Teaching",
      description:
        "Equip faculty with practical skills to leverage digital tools and tech-integrated pedagogy for creating engaging, inclusive, and NEP-aligned learning experiences.",
      extra: "Audience: University Faculty, Department Heads, Academic Leaders",
      link: "/downloads/digital-tools.pdf",
    },
  ];

  const LogoCard = () => (
    <div className="relative flex-shrink-0 w-[22rem] min-h-[9rem] bg-white p-6 rounded-2xl shadow-lg border border-gray-200 flex items-center justify-center flex-col">
      <img
        src="/institutions/logos/bulb.png"
        alt="Company Logo"
        className="h-16 w-auto mb-2"
      />
      <p className="text-lg font-semibold text-gray-800">Rareminds</p>
    </div>
  );

  const EventCard = ({ event }: { event: typeof events[0] }) => {
    const [hovered, setHovered] = useState(false);

    return (
      <div
        className="relative flex-shrink-0 w-[22rem] min-h-[12rem] bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between text-center"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-10">
          <div className="text-sm font-medium text-white bg-black inline-block px-4 py-1 rounded-full shadow">
            {event.date}
          </div>
        </div>

        <div>
          <h1 className="text-xl font-normal text-black mb-2">{event.title}</h1>
          <p className="text-gray-700 text-base pt-8">{event.extra}</p>
        </div>

        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute inset-0 bg-white bg-opacity-95 p-6 rounded-2xl shadow-xl z-20 flex flex-col justify-center text-center"
          >
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600 text-sm mb-4">{event.description}</p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(event.link, "_blank")}
              className="self-center mt-2 inline-flex items-center gap-2 button-secondary py-2"
            >
              <Download className="w-4 h-4" />
              Download Calendar
            </motion.button>
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="w-screen px-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-black mb-4">
            Upcoming FDP Calendar
          </h2>
          <p className="text-black text-sm">
            Explore the exciting events, workshops, and seminars organized by our
            institution.
          </p>
          <div className="flex justify-center gap-4 py-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="button-primary py-2"
              onClick={() => window.open("/calendar.pdf", "_blank")}
            >
              <Download className="w-5 h-5" />
              Download Full Calendar
            </motion.button>
          </div>
        </div>

        <div className="relative overflow-hidden pt-16">
          <div className="absolute top-8 left-0 right-0 h-px bg-black z-0" />

          <motion.div
            animate={{
              x: ["0%", "-100%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                duration: 60,
                ease: "linear",
              },
            }}
            className="flex gap-12"
          >
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                {events.map((event, index) => (
                  <EventCard key={`${i}-${index}`} event={event} />
                ))}
                <LogoCard />
              </React.Fragment>
            ))}
          </motion.div>

          
        </div>
      </div>
    </section>
  );
}
