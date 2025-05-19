import React, { useState } from "react";
import { motion } from "framer-motion";
import Bulb from "../assets/logos/bulb.png";

export default function UpcomingEvents() {
  const events = [
    {
      date: "October 15, 2022",
      title: "Workshop on Digital Marketing Strategies",
      description:
        "Join us for an insightful workshop on the latest digital marketing trends and strategies.",
      extra:
        "Agenda: SEO, Social Media Ads, Email Campaigns | Speaker: Jane Doe, Google",
    },
    {
      date: "November 8, 2022",
      title: "Seminar on Sustainable Development",
      description:
        "Learn about sustainable development practices in our upcoming seminar.",
      extra:
        "Agenda: Renewable Energy, Green Technology | Speaker: John Smith, Environmental Expert",
    },
    {
      date: "December 10, 2022",
      title: "Networking Event for Entrepreneurs",
      description:
        "Connect with like-minded entrepreneurs at our networking event.",
      extra:
        "Agenda: Business Networking, Startup Strategies | Speaker: Mark Adams, Entrepreneur",
    },
  ];

  const LogoCard = () => (
    <div className="relative flex-shrink-0 w-[22rem] min-h-[9rem] bg-white p-6 rounded-2xl shadow-lg border border-gray-200 flex items-center justify-center flex-col">
      <img src={Bulb} alt="Company Logo" className="h-16 w-auto mb-2" />
      <p className="text-lg font-semibold text-gray-800">Rareminds</p>
    </div>
  );

  const EventCard = ({ event }: { event: typeof events[0] }) => {
    const [hovered, setHovered] = useState(false);

    return (
      <div
        className="relative flex-shrink-0 w-[22rem] min-h-[9rem] bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-10">
          <div className="text-sm font-medium text-white bg-black inline-block px-4 py-1 rounded-full shadow">
            {event.date}
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {event.title}
        </h2>

        <p className="text-gray-700 text-base pt-10">{event.extra}</p>

        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute inset-0 bg-white bg-opacity-95 p-6 rounded-2xl shadow-xl z-20 flex flex-col justify-center"
          >
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600 text-sm">{event.description}</p>
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full bg-[#DEFBE9] py-16 px-6">
      <div className="w-screen px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
          <p className="text-gray-600 text-lg">
            Explore the exciting events, workshops, and seminars organized by our institution.
          </p>
        </div>

        <div className="relative overflow-hidden pt-16">
          {/* Timeline line */}
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

          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[#DEFBE9] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#DEFBE9] to-transparent z-10" />
        </div>
      </div>
    </div>
  );
}
