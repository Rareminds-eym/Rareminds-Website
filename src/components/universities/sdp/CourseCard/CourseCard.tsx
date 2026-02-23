// Individual course card component
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, MapPin, DollarSign } from 'lucide-react';
import type { Course } from '@/types/sdp/course.types';
import ExpandableText from '@/components/universities/sdp/shared/ExpandableText';

interface CourseCardProps {
  course: Course;
  institutionType: string;
  index: number;
}

export default function CourseCard({ course, institutionType, index }: CourseCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative group cursor-pointer h-full"
      onClick={() => navigate(`/universities/sdp/${institutionType}/${course.serviceType}/${course.slug}`)}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
      
      <div className="relative bg-white rounded-2xl shadow-md overflow-hidden h-full border border-gray-200 group-hover:border-gray-400 group-hover:shadow-xl transition-all duration-300 flex flex-col">
        <div className="p-6 relative flex-1 flex flex-col">
          {/* Category Badge */}
          <div className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full mb-4 border border-gray-200 w-fit">
            {course.courseCategory}
          </div>

          {/* Course Name - Fixed 2 lines */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight line-clamp-2 group-hover:text-gray-700 transition-colors">
            {course.name}
          </h3>

          {/* Description - Expandable */}
          <div className="mb-4">
            <ExpandableText
              text={course.description}
              maxLines={3}
              className="text-gray-600 text-sm leading-relaxed"
            />
          </div>

          {/* Spacer to push footer to bottom */}
          <div className="flex-1"></div>

          {/* Course Meta */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-gray-600 text-xs">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-xs">
              <MapPin className="w-4 h-4" />
              <span>{course.mode}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-xs">
              <DollarSign className="w-4 h-4" />
              <span>{course.currency} {course.price.toLocaleString()}</span>
            </div>
          </div>

          {/* View Details Button - Always at bottom */}
          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-gray-800 font-semibold text-sm group-hover:text-gray-900 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>View Details</span>
          </motion.div>
        </div>

        {/* Bottom accent */}
        <div className="h-1 bg-gradient-to-r from-gray-800 to-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>
    </motion.div>
  );
}
