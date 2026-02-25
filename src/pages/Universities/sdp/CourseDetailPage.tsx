import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Users, Target, Award, BookOpen } from 'lucide-react';
import { getCourseBySlug, getCoursesByService } from '@/services/sdp/courseService';
import { useState, useEffect } from 'react';
import type { Course } from '@/types/sdp/course.types';
import { supabase } from '@/lib/supabaseClient';
import ExpandableText from '@/components/universities/sdp/shared/ExpandableText';

export default function CourseDetail() {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [otherCourses, setOtherCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [benefits, setBenefits] = useState<string[]>([]);

  // Fetch course data and service benefits as fallback
  useEffect(() => {
    const fetchData = async () => {
      if (!courseSlug) return;
      
      setLoading(true);
      const courseData = await getCourseBySlug(courseSlug);
      setCourse(courseData);

      if (courseData) {
        // If course has benefits, use them
        if (courseData.programBenefits && courseData.programBenefits.length > 0) {
          setBenefits(courseData.programBenefits);
        } else {
          // Otherwise, fetch service benefits as fallback
          const { data: serviceData } = await supabase
            .from('courses')
            .select('benefits')
            .eq('category', 'service')
            .eq('slug', courseData.courseCategory.toLowerCase().replace(/\s+/g, '-'))
            .single();
          
          if (serviceData && serviceData.benefits) {
            setBenefits(serviceData.benefits);
          }
        }

        const allCourses = await getCoursesByService(courseData.courseCategory);
        setOtherCourses(allCourses.filter(c => c.slug !== courseSlug));
      }
      
      setLoading(false);
    };
    fetchData();
  }, [courseSlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-100 border-t-blue-700 rounded-full"
        />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Course not found</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-700 hover:text-gray-900 font-medium"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* Hero Banner Section */}
      <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
        {/* Background Image or Gradient */}
        {course.heroBannerImage ? (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${course.heroBannerImage})` }}
            />
            {/* Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/50" />
          </>
        ) : (
          /* Fallback Gradient Background */
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900" />
        )}

        {/* Content Container */}
        <div className="relative h-full container mx-auto px-6 lg:px-8 flex flex-col justify-center max-w-7xl">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-colors font-medium group w-fit"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Courses</span>
          </motion.button>

          {/* Course Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-semibold">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              {course.courseCategory}
            </span>
          </motion.div>

          {/* Course Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight max-w-4xl"
          >
            {course.name}
          </motion.h1>

          {/* Course Meta Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 text-white/90"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <span className="text-sm font-medium">{course.duration}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <span className="text-sm font-medium">{course.mode}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <span className="text-sm font-medium">{course.level}</span>
            </div>
            {/* Price Display - Commented out for now */}
            {/* <div className="flex items-center gap-2 px-4 py-2 bg-blue-600/90 backdrop-blur-sm rounded-lg border border-blue-500/50">
              <span className="text-sm font-bold">₹{course.price.toLocaleString('en-IN')}</span>
            </div> */}
          </motion.div>
        </div>

        {/* Bottom Fade Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-7xl -mt-12 relative z-10">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN - Main Content */}
          <div className="lg:col-span-8 space-y-8">

        {/* Course Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-700" />
            Course Overview
          </h2>
          <ExpandableText
            text={course.overview}
            maxLines={5}
            className="text-slate-700 leading-relaxed"
          />
        </motion.div>

        {/* What You'll Learn */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-blue-700" />
            What You'll Learn
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {course.whatYouLearn.map((item: string, index: number) => (
              <motion.div
                key={`learn-${course.id}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Who Should Take This Course */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-700" />
            Who Should Take This Course
          </h2>
          <ul className="space-y-3">
            {course.whoShouldTake.map((item: string, index: number) => (
              <motion.li
                key={`should-take-${course.id}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="flex items-start gap-3 text-slate-700"
              >
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Career Outcomes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-blue-700" />
            Career Outcomes
          </h2>
          <p className="text-slate-700 mb-4">
            Upon completion of this course, you'll be prepared for roles such as:
          </p>
          <div className="flex flex-wrap gap-3">
            {course.outcomes.map((outcome: string, index: number) => (
              <motion.span
                key={`outcome-${course.id}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm font-medium text-slate-700"
              >
                {outcome}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Program Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-blue-700" />
            Program Benefits
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit: string, index: number) => (
              <motion.div
                key={`benefit-${course.id}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + index * 0.05 }}
                className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200"
              >
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 font-medium">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
          </div>

          {/* RIGHT COLUMN - Sidebar */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:sticky lg:top-24"
            >
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                {/* Sidebar Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                  <div className="flex items-center gap-3 text-white">
                    <BookOpen className="w-6 h-6" />
                    <h3 className="text-xl font-bold">Other Courses</h3>
                  </div>
                  <p className="text-blue-100 text-sm mt-2">
                    Explore more courses in this program
                  </p>
                </div>

                {/* Course List */}
                <div className="max-h-[600px] overflow-y-auto">
                  {otherCourses.length > 0 ? (
                    <div className="divide-y divide-slate-100">
                      {otherCourses.map((otherCourse, index) => (
                        <motion.button
                          key={otherCourse.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                          onClick={() => navigate(`/universities/sdp/course/${otherCourse.slug}`)}
                          className="w-full text-left p-4 hover:bg-blue-50 transition-colors group"
                        >
                          <div className="flex gap-4">
                            {/* Serial Number */}
                            <div className="flex-shrink-0 w-10 h-10 bg-slate-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
                              <span className="text-slate-700 group-hover:text-blue-700 font-bold text-sm">
                                {index + 1}
                              </span>
                            </div>

                            {/* Course Info */}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 mb-1">
                                {otherCourse.name}
                              </h4>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <span className="inline-flex items-center px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-md">
                                  {otherCourse.duration}
                                </span>
                                <span className="inline-flex items-center px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-md">
                                  {otherCourse.mode}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-slate-500">
                      <BookOpen className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                      <p className="text-sm">No other courses available in this program</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
