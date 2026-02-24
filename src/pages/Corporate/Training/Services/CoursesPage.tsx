import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { BookOpen, ArrowLeft, GraduationCap, Clock, Monitor, BarChart3, IndianRupee, X, ChevronDown, Check, Search, ArrowUpDown } from 'lucide-react';
import { useState, useEffect, useMemo, useRef } from 'react';
import { services } from './serviceData';
import ErrorComponent from '@/components/ErrorComponent';
import { Helmet } from 'react-helmet-async';
import ExpandableText from '@/components/universities/sdp/shared/ExpandableText';

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Utility function to calculate and format duration
function calculateDuration(modules: any[]): string {
  if (!modules || modules.length === 0) return '0 hours';
  
  // Sum up all module hours
  const totalHours = modules.reduce((sum, module) => {
    if (module.hours) {
      // Extract number from strings like "4 hrs", "5 hrs"
      const match = module.hours.match(/(\d+)/);
      if (match) {
        return sum + parseInt(match[1], 10);
      }
    }
    return sum;
  }, 0);

  // If no hours found, estimate 2 hours per module
  const hours = totalHours > 0 ? totalHours : modules.length * 2;

  // Format duration
  if (hours < 24) {
    return `${hours} hours`;
  } else if (hours < 168) { // Less than a week
    const days = Math.ceil(hours / 8); // 8 hours per day
    return `${days} ${days === 1 ? 'day' : 'days'}`;
  } else {
    const weeks = Math.ceil(hours / 40); // 40 hours per week
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'}`;
  }
}

// Transform program to course-like structure
interface CourseProgram {
  id: string;
  title: string;
  overview: string;
  duration: string;
  level: string;
  mode: string;
  price: number;
  category: string;
  modules: any[];
}

export default function CorporateCoursesPage() {
  const navigate = useNavigate();
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  
  const service = services.find((s) => s.id === serviceSlug);

  if (!service) {
    return (
      <ErrorComponent
        title="404 - Service Not Found"
        message="The service you are looking for does not exist or is not available."
      />
    );
  }

 
  const allCourses: CourseProgram[] = service.programs.map(program => ({
    id: program.id,
    title: program.title,
    overview: program.overview,
    duration: calculateDuration(program.modules || []),
    level: 'Professional',
    mode: 'Online',
    price: 0,
    category: (program as any).category || service.heroTitle,
    modules: program.modules || []
  }));

  const [courses, setCourses] = useState<CourseProgram[]>(allCourses);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 400);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('newest');
  
  // UI states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const serviceName = service.heroTitle;
  const totalCount = courses.length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Apply filters and search
  useEffect(() => {
    let filtered = [...allCourses];

    // Search filter
    if (debouncedSearchTerm.trim()) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchLower) ||
        course.overview.toLowerCase().includes(searchLower)
      );
    }

    // Duration filter
    if (selectedDurations.length > 0) {
      filtered = filtered.filter(course =>
        selectedDurations.includes(course.duration)
      );
    }

    // Mode filter
    if (selectedModes.length > 0) {
      filtered = filtered.filter(course =>
        selectedModes.includes(course.mode)
      );
    }

    // Level filter
    if (selectedLevels.length > 0) {
      filtered = filtered.filter(course =>
        selectedLevels.includes(course.level)
      );
    }

    // Sorting
    switch (sortBy) {
      case 'name-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'newest':
        // Keep original order
        break;
      case 'oldest':
        filtered.reverse();
        break;
    }

    setCourses(filtered);
  }, [debouncedSearchTerm, selectedDurations, selectedModes, selectedLevels, sortBy]);

  // Extract unique filter options
  const filterOptions = useMemo(() => {
    const durations = new Set<string>();
    const modes = new Set<string>();
    const levels = new Set<string>();
    
    allCourses.forEach(course => {
      if (course.duration) durations.add(course.duration);
      if (course.mode) modes.add(course.mode);
      if (course.level) levels.add(course.level);
    });

    return {
      durations: Array.from(durations),
      modes: Array.from(modes),
      levels: Array.from(levels)
    };
  }, []);

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedDurations([]);
    setSelectedModes([]);
    setSelectedLevels([]);
    setSortBy('newest');
    setOpenDropdown(null);
  };

  // Check if any filters are active
  const activeFilterCount = selectedDurations.length + selectedModes.length + selectedLevels.length;
  const hasActiveFilters = activeFilterCount > 0 || sortBy !== 'newest' || searchTerm.trim() !== '';

  // Toggle filter selection
  const toggleFilter = (filterType: string, value: string) => {
    switch (filterType) {
      case 'duration':
        setSelectedDurations(prev =>
          prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        );
        break;
      case 'mode':
        setSelectedModes(prev =>
          prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        );
        break;
      case 'level':
        setSelectedLevels(prev =>
          prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        );
        break;
    }
    setOpenDropdown(null);
  };

  const handleCourseClick = (programId: string) => {
    navigate(`/corporate/training/services/${serviceSlug}/course/${programId}`);
  };

  return (
    <>
      <Helmet>
        <title>{service.meta_title}</title>
        <meta name="description" content={service.meta_desc} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-slate-50 to-indigo-50/20 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 max-w-7xl">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
           onClick={() => navigate('/corporate/training/services', { replace: true })}

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
            className="mb-6"
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
                  <span className="font-semibold text-blue-700">{totalCount}</span> {totalCount === 1 ? 'course' : 'courses'} {hasActiveFilters ? 'found' : 'available'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Compact Search + Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 px-4 py-3">
              <div className="flex flex-wrap items-center gap-2" ref={dropdownRef}>
                {/* Search Bar */}
                <div className="relative flex-1 min-w-[220px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search courses..."
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                  />
                </div>

                {/* Duration Chip */}
                <div className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === 'duration' ? null : 'duration')}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                      selectedDurations.length > 0
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span className="flex items-center gap-1.5">
                      Duration
                      {selectedDurations.length > 0 && (
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                      )}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  <AnimatePresence>
                    {openDropdown === 'duration' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 py-1.5 z-50"
                      >
                        {filterOptions.durations.map(duration => (
                          <button
                            key={duration}
                            onClick={() => toggleFilter('duration', duration)}
                            className="w-full px-3 py-2 text-left hover:bg-slate-50 transition-colors flex items-center justify-between"
                          >
                            <span className="text-sm text-slate-700">{duration}</span>
                            {selectedDurations.includes(duration) && (
                              <Check className="w-3.5 h-3.5 text-blue-600" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mode Chip */}
                <div className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === 'mode' ? null : 'mode')}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                      selectedModes.length > 0
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span className="flex items-center gap-1.5">
                      Mode
                      {selectedModes.length > 0 && (
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                      )}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  <AnimatePresence>
                    {openDropdown === 'mode' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 py-1.5 z-50"
                      >
                        {filterOptions.modes.map(mode => (
                          <button
                            key={mode}
                            onClick={() => toggleFilter('mode', mode)}
                            className="w-full px-3 py-2 text-left hover:bg-slate-50 transition-colors flex items-center justify-between"
                          >
                            <span className="text-sm text-slate-700">{mode}</span>
                            {selectedModes.includes(mode) && (
                              <Check className="w-3.5 h-3.5 text-blue-600" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Level Chip */}
                <div className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === 'level' ? null : 'level')}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                      selectedLevels.length > 0
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span className="flex items-center gap-1.5">
                      Level
                      {selectedLevels.length > 0 && (
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                      )}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  <AnimatePresence>
                    {openDropdown === 'level' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 py-1.5 z-50"
                      >
                        {filterOptions.levels.map(level => (
                          <button
                            key={level}
                            onClick={() => toggleFilter('level', level)}
                            className="w-full px-3 py-2 text-left hover:bg-slate-50 transition-colors flex items-center justify-between"
                          >
                            <span className="text-sm text-slate-700">{level}</span>
                            {selectedLevels.includes(level) && (
                              <Check className="w-3.5 h-3.5 text-blue-600" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Sort Chip */}
                <div className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === 'sort' ? null : 'sort')}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                      sortBy !== 'newest'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <ArrowUpDown className="w-3.5 h-3.5" />
                    <span className="flex items-center gap-1.5">
                      Sort
                      {sortBy !== 'newest' && (
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                      )}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  <AnimatePresence>
                    {openDropdown === 'sort' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 py-1.5 z-50"
                      >
                        {[
                          { value: 'name-asc', label: 'Name (A → Z)' },
                          { value: 'name-desc', label: 'Name (Z → A)' },
                          { value: 'newest', label: 'Newest First' },
                          { value: 'oldest', label: 'Oldest First' }
                        ].map(option => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSortBy(option.value);
                              setOpenDropdown(null);
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-slate-50 transition-colors flex items-center justify-between"
                          >
                            <span className="text-sm text-slate-700">{option.label}</span>
                            {sortBy === option.value && (
                              <Check className="w-3.5 h-3.5 text-blue-600" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Clear All Link */}
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-slate-500 hover:text-red-600 font-medium transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Course Grid */}
          {courses.length === 0 ? (
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
                  {hasActiveFilters ? 'No courses match your filters' : 'No courses yet'}
                </h2>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  {hasActiveFilters
                    ? 'Try adjusting your search or filter criteria to find more courses.'
                    : 'We\'re preparing amazing content for you. Check back soon!'}
                </p>
                {hasActiveFilters && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={clearAllFilters}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-700/20 hover:shadow-xl hover:bg-blue-800 transition-all"
                  >
                    <X className="w-5 h-5" />
                    Clear Filters
                  </motion.button>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer h-full"
                  onClick={() => handleCourseClick(course.id)}
                >
                  <div className="relative bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-200">
                    {/* Card Body */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Category Badge */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 rounded-lg mb-4 w-fit">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                          {course.category}
                        </span>
                      </div>

                      {/* Course Title - Fixed 2 lines */}
                      <h3 className="text-xl font-bold text-slate-900 leading-tight mb-4 line-clamp-2 group-hover:text-blue-700 transition-colors">
                        {course.title}
                      </h3>

                      {/* Description - Expandable */}
                      <div className="mb-6">
                        <ExpandableText
                          text={course.overview}
                          maxLines={3}
                          className="text-sm text-slate-600 leading-relaxed"
                        />
                      </div>

                      {/* Spacer to push meta info to bottom */}
                      <div className="flex-1"></div>

                      {/* Course Meta Info */}
                      <div className="grid grid-cols-3 gap-2">
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
                    </div>

                    {/* Card Footer - Always visible with consistent border */}
                    <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-white">
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
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
