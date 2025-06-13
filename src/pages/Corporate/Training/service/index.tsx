import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Award } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { services } from "./serviceData";
import ErrorComponent from "@/components/ErrorComponent";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const LeadershipPrograms = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <ErrorComponent
        title="404 - Service Not Found"
        message="The service you are looking for does not exist or is not available."
      />
    );
  }

  const { heroTitle, heroSubtitle, featureBadges, programs } = service;
  const [activeProgram, setActiveProgram] = useState(programs[0].id);

  const location = useLocation();

  useEffect(() => {
    setActiveProgram(programs[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const handleBack = () => {
    navigate("/corporate/training", { state: { scrollTo: "services" } });
  };

  const handleClick = () => {
    navigate("/corporate/training");

    setTimeout(() => {
      const el = document.getElementById("contact");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Enhanced Hero Section with Overlay */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-800 to-slate-900 text-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Back Button */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={handleBack}
            className="flex items-center gap-2 text-blue-200 hover:text-white font-medium mb-8 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            Back to All Services
          </motion.button>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            {/* Feature Badges */}
            {featureBadges && featureBadges.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {featureBadges.map((badge, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-blue-100 flex items-center gap-2"
                  >
                    {typeof badge === 'object' && badge.icon && (
                      <span className="text-xs">{badge.icon}</span>
                    )}
                    <span>
                      {typeof badge === 'string' ? badge : (badge as any)?.text || 'Feature'}
                    </span>
                  </motion.span>
                ))}
              </div>
            )}

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                {heroTitle}
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl lg:text-2xl text-blue-100/90 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              {heroSubtitle}
            </motion.p>

            {/* Quick Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">{programs.length}</div>
                <div className="text-blue-200">Training Programs</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-blue-200">Companies Trained</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">50K+</div>
                <div className="text-blue-200">Professionals Certified</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z" fill="rgb(248 250 252)"></path>
          </svg>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Explore Our Programs
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover comprehensive training solutions designed to elevate your team's potential
            </p>
          </motion.div>

          <div className="flex flex-col xl:flex-row gap-8">
            {/* Enhanced Sidebar Navigation */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="xl:w-1/3"
            >
              <div className="sticky top-[90px] bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Training Programs
                  </h3>
                </div>
                <nav className="space-y-3">
                  {programs.map((program, index) => (
                    <motion.button
                      key={program.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                      onClick={() => setActiveProgram(program.id)}
                      className={`w-full text-left p-4 rounded-xl transition-all group relative overflow-hidden ${
                        activeProgram === program.id
                          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105"
                          : "hover:bg-gray-50 text-gray-700 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center justify-between relative z-10">
                        <div>
                          <span className="font-semibold block">{program.title}</span>
                          <span className={`text-sm ${activeProgram === program.id ? 'text-white/80' : 'text-gray-500'}`}>
                            {program.modules?.length || 0} modules
                          </span>
                        </div>
                        <ChevronRight
                          className={`w-5 h-5 transition-all ${
                            activeProgram === program.id ? "rotate-90 text-white" : "text-gray-400 group-hover:translate-x-1"
                          }`}
                        />
                      </div>
                      {activeProgram !== program.id && (
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/5 group-hover:to-purple-500/5 transition-all duration-300"></div>
                      )}
                    </motion.button>
                  ))}
                </nav>

                {/* Program Count */}
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200/50">
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {programs.length}
                    </div>
                    <div className="text-sm text-gray-600">Available Programs</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Main Content */}
            <div className="xl:w-2/3">
              {programs.map(
                (program) =>
                  program.id === activeProgram && (
                    <motion.div
                      key={program.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-8"
                    >
                      {/* Enhanced Program Overview */}
                      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-8 text-white">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                  <Award className="w-6 h-6 text-white" />
                                </div>
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                                  Featured Program
                                </span>
                              </div>
                              <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                                {program.title}
                              </h2>
                              <p className="text-xl text-white/90 leading-relaxed">
                                {program.overview}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Key Features */}
                        <div className="p-8">
                          <div className="grid lg:grid-cols-2 gap-8">
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/50">
                              <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </div>
                                <h3 className="font-bold text-xl text-gray-900">
                                  What We Cover
                                </h3>
                              </div>
                              <ul className="space-y-4">
                                {program.whatWeCover.map((item, i) => (
                                  <motion.li 
                                    key={i} 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: i * 0.1 }}
                                    className="flex items-start gap-3"
                                  >
                                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 mt-2 flex-shrink-0" />
                                    <span className="text-gray-700 leading-relaxed">{item}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200/50">
                              <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                  </svg>
                                </div>
                                <h3 className="font-bold text-xl text-gray-900">
                                  Our Approach
                                </h3>
                              </div>
                              <ul className="space-y-4">
                                {program.delivery.map((item, i) => (
                                  <motion.li 
                                    key={i} 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: i * 0.1 }}
                                    className="flex items-start gap-3"
                                  >
                                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mt-2 flex-shrink-0" />
                                    <span className="text-gray-700 leading-relaxed">{item}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Course Modules */}
                      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
                        <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8">
                          <h3 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                            </div>
                            Course Modules
                          </h3>
                          <p className="text-slate-300 mt-2">Comprehensive curriculum designed for maximum impact</p>
                        </div>
                        <div className="p-8">
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="bg-gradient-to-r from-slate-50 to-gray-50">
                                  <th className="py-4 px-6 text-left text-sm font-bold text-gray-900 rounded-l-xl">
                                    Module
                                  </th>
                                  <th className="py-4 px-6 text-left text-sm font-bold text-gray-900">
                                    Title
                                  </th>
                                  <th className="py-4 px-6 text-center text-sm font-bold text-gray-900">
                                    Duration
                                  </th>
                                  <th className="py-4 px-6 text-left text-sm font-bold text-gray-900">
                                    Objectives
                                  </th>
                                  <th className="py-4 px-6 text-left text-sm font-bold text-gray-900">
                                    Activities
                                  </th>
                                  <th className="py-4 px-6 text-left text-sm font-bold text-gray-900 rounded-r-xl">
                                    Outcome
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100">
                                {program.modules.map((mod, i) => (
                                  <motion.tr
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: i * 0.1 }}
                                    className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all group"
                                  >
                                    <td className="py-6 px-6">
                                      <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl text-white font-bold text-sm">
                                        {i + 1}
                                      </div>
                                    </td>
                                    <td className="py-6 px-6">
                                      <div className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                        {mod.title}
                                      </div>
                                    </td>
                                    <td className="py-6 px-6 text-center">
                                      <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-indigo-700 rounded-full text-sm font-medium">
                                        {mod.hours}
                                      </span>
                                    </td>
                                    <td className="py-6 px-6 text-gray-600 leading-relaxed max-w-xs">
                                      {mod.objectives}
                                    </td>
                                    <td className="py-6 px-6 text-gray-600 leading-relaxed max-w-xs">
                                      {mod.activities}
                                    </td>
                                    <td className="py-6 px-6 text-gray-600 leading-relaxed max-w-xs">
                                      {mod.outcome}
                                    </td>
                                  </motion.tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Why Choose Section */}
                      {program.whyChoose && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 rounded-3xl p-8 border border-emerald-200/50 relative overflow-hidden"
                        >
                          {/* Background Pattern */}
                          <div className="absolute inset-0 opacity-5">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
                          </div>
                          
                          <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                              </div>
                              <h3 className="font-bold text-2xl bg-gradient-to-r from-emerald-700 to-blue-700 bg-clip-text text-transparent">
                                Why Choose This Program?
                              </h3>
                            </div>
                            <p className="text-lg text-gray-700 leading-relaxed">{program.whyChoose}</p>
                          </div>
                        </motion.div>
                      )}

                      {/* Enhanced CTA Section */}
                      <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl overflow-hidden"
                      >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
                        
                        <div className="relative z-10 p-12 text-white text-center">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                              <ArrowRight className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                              {program.cta.text}
                            </h4>
                            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                              {program.cta.description}
                            </p>
                            <motion.button
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-indigo-600 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all group relative overflow-hidden"
                              onClick={handleClick}
                            >
                              <span className="relative z-10">Connect with Us</span>
                              <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                            </motion.button>
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeadershipPrograms;
