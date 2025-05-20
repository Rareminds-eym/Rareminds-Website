import React from 'react';
import { Target, BookOpen, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const goals = [
  {
    icon: Target,
    title: 'Training Scale',
    description: 'Training over 30,000 students across 18 specialized courses, focusing on industry-relevant skills.',
  },
  {
    icon: BookOpen,
    title: 'Expanded Reach',
    description: 'Expanding our reach to additional colleges to provide students with a robust learning experience.',
  },
  {
    icon: Users,
    title: 'Career Development',
    description: 'Enhancing career readiness by connecting students with top corporates for internships and placements.',
  },
];

export function Future({f_data}) {
  return (
    <div className="relative bg-gradient-to-b from-gray-50 to-white py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl lg:text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
          >
            {/* What We're Doing in 2025 */}
            {f_data.what_we_doing}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-xl leading-8 text-gray-600"
          >
            Building on this success, Rareminds is taking the program to new heights this year
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
        >
          <dl className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {goals.map((goal, index) => (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 * (index + 4) }}
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200/50 hover:shadow-xl transition-all duration-300"
              >
                <dt className="flex items-center gap-x-4">
                  <goal.icon className="h-12 w-12 flex-none text-blue-600" />
                  <span className="text-xl font-semibold leading-7 text-gray-900">{goal.title}</span>
                </dt>
                <dd className="mt-4 text-base leading-7 text-gray-600">{goal.description}</dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </div>
  );
}