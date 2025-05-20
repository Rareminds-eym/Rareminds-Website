import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users } from 'lucide-react';

const events = [
  // {
  //   id: 1,
  //   date: 'March 2024',
  //   title: 'Chennai Tech Hackathon',
  //   description: 'Over 500 students participated in this 24-hour coding challenge',
  //   location: 'Chennai',
  //   participants: 500,
  //   icon: Calendar,
  // },
  // {
  //   id: 2,
  //   date: 'May 2024',
  //   title: 'Coimbatore Innovation Summit',
  //   description: 'Industry leaders shared insights with emerging talent',
  //   location: 'Coimbatore',
  //   participants: 300,
  //   icon: Calendar,
  // },
  // {
  //   id: 3,
  //   date: 'July 2024',
  //   title: 'Madurai Tech Fest',
  //   description: 'A celebration of technology and innovation',
  //   location: 'Madurai',
  //   participants: 450,
  //   icon: Calendar,
  // },
  // {
  //   id: 3,
  //   date: 'July 2024',
  //   title: 'Madurai Tech Fest',
  //   description: 'A celebration of technology and innovation',
  //   location: 'Madurai',
  //   participants: 450,
  //   icon: Calendar,
  // },
  // {
  //   id: 3,
  //   date: 'July 2024',
  //   title: 'Madurai Tech Fest',
  //   description: 'A celebration of technology and innovation',
  //   location: 'Madurai',
  //   participants: 450,
  //   icon: Calendar,
  // },
  // {
  //   id: 3,
  //   date: 'July 2024',
  //   title: 'Madurai Tech Fest',
  //   description: 'A celebration of technology and innovation',
  //   location: 'Madurai',
  //   participants: 450,
  //   icon: Calendar,
  // },
  // {
  //   id: 3,
  //   date: 'July 2024',
  //   title: 'Madurai Tech Fest',
  //   description: 'A celebration of technology and innovation',
  //   location: 'Madurai',
  //   participants: 450,
  //   icon: Calendar,
  // },{
  //   id: 3,
  //   date: 'July 2024',
  //   title: 'Madurai Tech Fest',
  //   description: 'A celebration of technology and innovation',
  //   location: 'Madurai',
  //   participants: 450,
  //   icon: Calendar,
  // },{
  //   id: 3,
  //   date: 'July 2024',
  //   title: 'Madurai Tech Fest',
  //   description: 'A celebration of technology and innovation',
  //   location: 'Madurai',
  //   participants: 450,
  //   icon: Calendar,
  // },
];

export function Timeline({t_data}) {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Event Timeline
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Journey through our key events and milestones
          </p>
        </motion.div>

        <div className="mt-16 space-y-8">
          {t_data.event_time_line.map((event:any,index:number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-none">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <event.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-grow bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-600">
                      {event.date}
                    </span>
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        {event.location}
                      </span>
                      <span className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        {event.participants}+ participants
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{event.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}