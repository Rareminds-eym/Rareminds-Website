import React from 'react';
import { BookOpen, Calendar, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const cards = [
  // {
  //   title: 'Explore the Curriculum',
  //   description: 'Discover our 18 specialized courses covering various fields',
  //   icon: BookOpen,
  //   href: '#curriculum',
  // },
  {
    title: 'Upcoming Events',
    description: 'Check out training events and opportunities',
    icon: Calendar,
    href: '#events',
  },
  {
    title: 'Contact Us',
    description: 'Get in touch to learn more or collaborate',
    icon: Mail,
    href: 'https://rareminds.in/contact-us',
  },
];

export function CallToAction() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
          >
            Take the Next Step
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-xl leading-8 text-gray-600"
          >
            Join the Naan Mudhalvan 2025 Program and help create a skilled, empowered workforce for Tamil Nadu.
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 * (index + 4) }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
              }}
              className="relative isolate flex flex-col justify-between rounded-2xl bg-white p-8 ring-1 ring-gray-200 transition-all duration-300"
            >
              <div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/10">
                  <card.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold leading-8 tracking-tight text-gray-900">
                  {card.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-gray-600">{card.description}</p>
              </div>
              <motion.a
                whileHover={{ x: 5 }}
                href={card.href}
                className="mt-8 inline-flex items-center gap-x-2 text-lg font-semibold leading-6 text-blue-600 hover:text-blue-500"
              >
                Learn more <ArrowRight className="h-5 w-5" />
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}