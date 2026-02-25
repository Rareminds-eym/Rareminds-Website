import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Target, Award, BookOpen } from 'lucide-react';
import { getCorporateCourseBySlug, getOtherCorporateCourses } from '@/services/sdp/courseService';
import ErrorComponent from '@/components/ErrorComponent';
import { Helmet } from 'react-helmet-async';
import ExpandableText from '@/components/universities/sdp/shared/ExpandableText';
import { useState, useEffect } from 'react';

export default function CourseDetailPage() {
  const { serviceSlug, programId } = useParams<{ serviceSlug: string; programId: string }>();
  const navigate = useNavigate();
  
  const [program, setProgram] = useState<any>(null);
  const [otherPrograms, setOtherPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!programId || !serviceSlug) return;
      
      setLoading(true);
      const courseData = await getCorporateCourseBySlug(programId);
      setProgram(courseData);

      if (courseData) {
        const others = await getOtherCorporateCourses(serviceSlug, courseData.id);
        setOtherPrograms(others);
      }
      
      setLoading(false);
    };
    fetchData();
  }, [programId, serviceSlug]);

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

  if (!program) {
    return (
      <ErrorComponent
        title="404 - Course Not Found"
        message="The course you are looking for does not exist or is not available."
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>{program.title} | Corporate Training | Rareminds</title>
        <meta name="description" content={program.overview} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
        {/* Hero Banner Section */}
        <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900" />

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
                {program.category}
              </span>
            </motion.div>

            {/* Course Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight max-w-4xl"
            >
              {program.title}
            </motion.h1>

            {/* Course Meta Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 text-white/90"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <span className="text-sm font-medium">{program.duration}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <span className="text-sm font-medium">{program.modules?.length || 0} Modules</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <span className="text-sm font-medium">Online</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <span className="text-sm font-medium">Professional</span>
              </div>
              {/* Price Display - Commented out for now */}
              {/* <div className="flex items-center gap-2 px-4 py-2 bg-blue-600/90 backdrop-blur-sm rounded-lg border border-blue-500/50">
                <span className="text-sm font-bold">₹0</span>
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
                  text={program.overview}
                  maxLines={5}
                  className="text-slate-700 leading-relaxed"
                />
              </motion.div>

              {/* What You Will Learn */}
              {program.whatWeCover && program.whatWeCover.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Award className="w-6 h-6 text-blue-700" />
                    What You Will Learn
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {program.whatWeCover.map((item: string, index: number) => (
                      <motion.div
                        key={index}
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
              )}

              {/* Who Should Take This Program */}
              {program.delivery && program.delivery.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Award className="w-6 h-6 text-blue-700" />
                    Who Should Take This Program
                  </h2>
                  <ul className="space-y-3">
                    {program.delivery.map((item: string, index: number) => (
                      <motion.li
                        key={index}
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
              )}

              {/* Benefits */}
              {program.whyChoose && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Award className="w-6 h-6 text-blue-700" />
                    Benefits
                  </h2>
                  <p className="text-slate-700 leading-relaxed">{program.whyChoose}</p>
                </motion.div>
              )}

              {/* Outcomes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Award className="w-6 h-6 text-blue-700" />
                  Outcomes
                </h2>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="leading-relaxed">Execute Sales Communication Discipline using a standard corporate workflow</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="leading-relaxed">Build a KPI tracker/dashboard and interpret trends</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="leading-relaxed">Produce audit-ready documentation of completed work</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="leading-relaxed">Escalate risks/issues using defined triggers and response timelines</span>
                  </li>
                </ul>
              </motion.div>

              {/* Lessons */}
              {program.modules && program.modules.length > 0 && program.modules[selectedModuleIndex]?.lessons && 
               Array.isArray(program.modules[selectedModuleIndex].lessons) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-blue-700" />
                    Lessons
                  </h2>
                  <ul className="space-y-2.5">
                    {program.modules[selectedModuleIndex].lessons.map((lesson: string, index: number) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * index }}
                        className="flex items-start gap-3 text-slate-700"
                      >
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="leading-relaxed">{lesson}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
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
                      <h3 className="text-xl font-bold">Courses</h3>
                    </div>
                    <p className="text-blue-100 text-sm mt-2">
                      Explore more courses in this service
                    </p>
                  </div>

                  {/* Program List */}
                  <div className="max-h-[600px] overflow-y-auto">
                    {otherPrograms.length > 0 ? (
                      <div className="divide-y divide-slate-100">
                        {otherPrograms.map((otherProgram, index) => (
                          <motion.button
                            key={otherProgram.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.05 }}
                            onClick={() => navigate(`/corporate/training/services/${serviceSlug}/course/${otherProgram.slug}`)}
                            className="w-full text-left p-4 hover:bg-blue-50 transition-colors group"
                          >
                            <div className="flex gap-4">
                              {/* Serial Number */}
                              <div className="flex-shrink-0 w-10 h-10 bg-slate-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
                                <span className="text-slate-700 group-hover:text-blue-700 font-bold text-sm">
                                  {index + 1}
                                </span>
                              </div>

                              {/* Program Info */}
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 mb-1">
                                  {otherProgram.title}
                                </h4>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  <span className="inline-flex items-center px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-md">
                                    {otherProgram.duration}
                                  </span>
                                  <span className="inline-flex items-center px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-md">
                                    {otherProgram.mode}
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
                        <p className="text-sm">No other programs available in this service</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Curriculum Section */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-6"
                >
                  <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                    {/* Curriculum Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                      <div className="flex items-center gap-3 text-white">
                        <BookOpen className="w-6 h-6" />
                        <h3 className="text-xl font-bold">Curriculum</h3>
                      </div>
                      <p className="text-blue-100 text-sm mt-2">
                        Select a module to view lessons
                      </p>
                    </div>

                    {/* Module List */}
                    {program.modules && program.modules.length > 0 ? (
                      <div className="p-4">
                        <div className="space-y-2">
                          {program.modules.map((module: any, index: number) => (
                            <button
                              key={index}
                              onClick={() => setSelectedModuleIndex(index)}
                              className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all ${
                                selectedModuleIndex === index
                                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                                  : 'text-slate-700 hover:bg-slate-50 border border-slate-200'
                              }`}
                            >
                              {module.module || module.title}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 text-center text-slate-500">
                        <BookOpen className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                        <p className="text-sm">No curriculum data available</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
