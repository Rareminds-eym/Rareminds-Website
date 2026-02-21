import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ArrowLeft, GraduationCap, Search, Filter, Clock, Monitor, BarChart3, IndianRupee, X } from 'lucide-react';
import { useState, useEffect, useRef, useMemo } from 'react';
import { getCoursesByService } from '@/services/sdp/courseService';
import type { Course } from '@/types/sdp/course.types';

export default function CourseList() {
  const navigate = useNavigate();
  const [displayCount, setDisplayCount] = useState(10);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedMode, setSelectedMode] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  // Hardcoded to engineering service
  const serviceId = 'engineering';
  const serviceName = 'Engineering Programs';

  // Fetch courses from Supabase
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const data = await getCoursesByService(serviceId);
      setCourses(data);
      setLoading(false);
    };
    fetchCourses();
  }, [serviceId]);

  // Extract unique filter options from courses
  const durations = useMemo(() => {
    const uniqueDurations = [...new Set(courses.map(c => c.duration))];
    return uniqueDurations.sort();
  }, [courses]);

  const modes = useMemo(() => {
    return [...new Set(courses.map(c => c.mode))];
  }, [courses]);

  const levels = useMemo(() => {
    return [...new Set(courses.map(c => c.level))];
  }, [courses]);

  // Apply filters
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = searchQuery === '' || 
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDuration = selectedDuration === '' || course.duration === selectedDuration;
      const matchesMode = selectedMode === '' || course.mode === selectedMode;
      const matchesLevel = selectedLevel === '' || course.level === selectedLevel;

      return matchesSearch && matchesDuration && matchesMode && matchesLevel;
    });
  }, [courses, searchQuery, selectedDuration, selectedMode, selectedLevel]);

  // TRUE LAZY LOADING: Only show courses up to displayCount
  const displayedCourses = filteredCourses.slice(0, displayCount);
  const hasMore = displayCount < filteredCourses.length;

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(10);
  }, [searchQuery, selectedDuration, selectedMode, selectedLevel]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Load 10 more courses when user scrolls to bottom
          setDisplayCount(prev => Math.min(prev + 10, filteredCourses.length));
        }
      },
      { rootMargin: '100px' }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasMore, filteredCourses.length]);

  const hasActiveFilters = searchQuery || selectedDuration || selectedMode || selectedLevel;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-slate-50 to-indigo-50/20 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 max-w-7xl">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-slate-600 hover:text-blue-700 mb-8 transition-all font-medium"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Services</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
              className="w-16 h-16 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20"
            >
              <GraduationCap className="w-9 h-9 text-white" />
            </motion.div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                {serviceName}
              </h1>
              <p className="text-base text-slate-600 mt-1">
                <span className="font-semibold text-blue-700">{courses.length}</span> {courses.length === 1 ? 'course' : 'courses'} available
              </p>
            </div>
          </div>
        </motion.div>

        {/* Premium Filter Section */}
        {courses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 lg:p-8 mb-10"
          >
            {/* Filter Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Filter className="w-5 h-5 text-blue-700" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Filter Courses</h2>
                  <p className="text-sm text-slate-500">Refine your search</p>
                </div>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDuration('');
                    setSelectedMode('');
                    setSelectedLevel('');
                  }}
                  className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors group"
                >
                  <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                  Clear all
                </button>
              )}
            </div>

            {/* Filter Controls - All in One Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search Input */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors z-10">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 bg-white border-2 border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:border-slate-900 outline-none transition-all text-sm"
                />
              </div>

              {/* Duration Filter */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none z-10">
                  <Clock className="w-4 h-4" />
                </div>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full h-12 pl-11 pr-10 bg-white border-2 border-slate-200 rounded-lg text-slate-700 text-sm focus:border-slate-900 outline-none transition-all appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25rem 1.25rem' }}
                >
                  <option value="">All Durations</option>
                  {durations.map(duration => (
                    <option key={duration} value={duration}>{duration}</option>
                  ))}
                </select>
              </div>

              {/* Mode Filter */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none z-10">
                  <Monitor className="w-4 h-4" />
                </div>
                <select
                  value={selectedMode}
                  onChange={(e) => setSelectedMode(e.target.value)}
                  className="w-full h-12 pl-11 pr-10 bg-white border-2 border-slate-200 rounded-lg text-slate-700 text-sm focus:border-slate-900 outline-none transition-all appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25rem 1.25rem' }}
                >
                  <option value="">All Modes</option>
                  {modes.map(mode => (
                    <option key={mode} value={mode}>{mode}</option>
                  ))}
                </select>
              </div>

              {/* Level Filter */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none z-10">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full h-12 pl-11 pr-10 bg-white border-2 border-slate-200 rounded-lg text-slate-700 text-sm focus:border-slate-900 outline-none transition-all appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25rem 1.25rem' }}
                >
                  <option value="">All Levels</option>
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 pt-6 border-t border-slate-100"
              >
                <p className="text-sm text-slate-600">
                  Showing <span className="font-semibold text-blue-700">{filteredCourses.length}</span> of <span className="font-semibold text-slate-900">{courses.length}</span> courses
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Course Grid */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-blue-100 border-t-blue-700 rounded-full mx-auto mb-4"
            />
            <p className="text-slate-600 font-medium">Loading courses...</p>
          </motion.div>
        ) : filteredCourses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                {courses.length === 0 ? 'No courses yet' : 'No courses found'}
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                {courses.length === 0 
                  ? "We're preparing amazing content for you. Check back soon!"
                  : "Try adjusting your filters to discover more courses."
                }
              </p>
              {courses.length === 0 ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/universities/services')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-700/20 hover:shadow-xl hover:bg-blue-800 transition-all"
                >
                  Browse Other Services
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDuration('');
                    setSelectedMode('');
                    setSelectedLevel('');
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-700/20 hover:shadow-xl hover:bg-blue-800 transition-all"
                >
                  Clear All Filters
                </motion.button>
              )}
            </div>
          </motion.div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayedCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
              onClick={() => navigate(`/universities/sdp/course/${course.slug}`)}
            >
              <div className="relative bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-200">
                {/* Course Number Watermark */}
                <div className="absolute top-4 right-4 text-6xl font-black text-slate-900 opacity-[0.03] select-none pointer-events-none z-0">
                  {course.id}
                </div>

                <div className="p-6 flex-1 flex flex-col relative z-10">
                  {/* Category Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 rounded-lg mb-4 w-fit">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                      {course.courseCategory}
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-blue-700 transition-colors line-clamp-2 min-h-[56px]">
                    {course.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 line-clamp-2 flex-1">
                    {course.description}
                  </p>

                  {/* Course Meta Info */}
                  <div className="grid grid-cols-3 gap-2 mb-6 pb-6 border-b border-slate-100">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 text-blue-500 mb-1">
                        <Clock className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-semibold text-slate-900">{course.duration}</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 text-blue-500 mb-1">
                        <Monitor className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-semibold text-slate-900">{course.mode}</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 text-blue-500 mb-1">
                        <BarChart3 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-semibold text-slate-900">{course.level}</span>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <IndianRupee className="w-5 h-5 text-slate-900 font-bold" />
                      <span className="text-2xl font-bold text-slate-900">
                        {course.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-2 text-blue-700 font-semibold text-sm group-hover:gap-3 transition-all"
                    >
                      <span>View Details</span>
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </motion.div>
                  </div>
                </div>

                {/* Bottom Accent Bar */}
                <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </motion.div>
          ))}
        </div>
        )}

        {/* Infinite Scroll Trigger */}
        {hasMore && (
          <div ref={loadMoreRef} className="text-center mt-16 py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 border-3 border-blue-100 border-t-blue-700 rounded-full mx-auto mb-4"
            />
            <p className="text-sm text-slate-500 font-medium">Loading more courses...</p>
          </div>
        )}
      </div>
    </div>
  );
}
