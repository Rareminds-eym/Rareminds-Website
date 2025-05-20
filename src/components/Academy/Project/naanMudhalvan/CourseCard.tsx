import React from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen } from 'lucide-react';
import { Course } from '../types/course';

interface CourseCardProps {
  course: Course;
  onClick: (course: Course) => void;
}

export function CourseCard({ course, onClick }: CourseCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200/50"
      onClick={() => onClick(course)}
    >
      <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
        <img
          src={course.imageUrl}
          alt={course.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{course.name}</h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{course.description}</p>
        {/* <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="mr-1 h-4 w-4" />
            {course.duration}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <BookOpen className="mr-1 h-4 w-4" />
            {course.level}
          </div>
        </div> */}
      </div>
    </motion.div>
  );
}