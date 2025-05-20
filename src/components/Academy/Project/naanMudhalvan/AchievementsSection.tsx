import React from 'react';
import { Users, GraduationCap, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  {
    label: '5th Semester Students',
    value: '10,000+',
    subtext: '143 colleges/batches',
    icon: Users,
  },
  {
    label: '6th Semester Students',
    value: '20,500+',
    subtext: '546 colleges/batches',
    icon: GraduationCap,
  },
  {
    label: 'Expert Trainers',
    value: '250+',
    subtext: 'Industry professionals',
    icon: Building2,
  },
];

export function AchievementsSection() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-10  sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl lg:max-w-none"
        >
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
            >
            What We've Achieved So Far
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-xl leading-8 text-gray-600"
            >
              Since 2024, we have made a significant impact across Tamil Nadu
            </motion.p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-12 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 * (index + 2) }}
                whileHover={{ scale: 1.05 }}
                className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200/50 hover:shadow-xl transition-all duration-300"
              >
                <dt className="flex items-center justify-center">
                  <stat.icon className="h-12 w-12 text-blue-600" />
                </dt>
                <dd className="mt-4 flex flex-col items-center gap-1">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-4xl font-bold tracking-tight text-gray-900"
                  >
                    {stat.value}
                  </motion.span>
                  <span className="text-lg font-semibold text-gray-900">{stat.label}</span>
                  <span className="text-sm text-gray-500">{stat.subtext}</span>
                </dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </div>
  );
}