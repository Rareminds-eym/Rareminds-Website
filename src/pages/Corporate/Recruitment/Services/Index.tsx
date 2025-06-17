import React from "react";
import { motion } from "framer-motion";
import { useRecruitmentService } from "@/hooks/useRecruitmentService";
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';

const ServicesPage: React.FC = () => {
  const { services, loading, error } = useRecruitmentService();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-8 rounded-lg shadow-lg">
          <h3 className="text-red-600 font-semibold text-xl mb-2">Error</h3>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  if (!services || services.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-blue-50 p-8 rounded-lg shadow-lg">
          <h3 className="text-blue-600 font-semibold text-xl mb-2">
            No Services Found
          </h3>
          <p className="text-gray-700">
            Please check back later for our recruitment services.
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-800 via-indigo-900 to-blue-950 text-white">
        {/* Large Blurred Orbs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-cyan-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-400/30 to-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-300/20 to-blue-300/15 rounded-full mix-blend-multiply filter blur-2xl animate-pulse delay-500"></div>
        
        {/* Hexagonal Network Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            <defs>
              <pattern id="hexPattern" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
                <path d="M30 4l26 15v26L30 60 4 45V19z" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" fill="none"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexPattern)"/>
          </svg>
        </div>
        
        {/* Floating Geometric Elements */}
        <div className="absolute top-20 right-20 w-16 h-16 border-2 border-blue-300/40 rotate-45 animate-spin-slow">
          <div className="absolute inset-2 border border-cyan-300/30 animate-pulse"></div>
        </div>
        <div className="absolute bottom-32 left-16 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-transparent transform rotate-12 animate-float">
          <div className="w-full h-full border border-blue-300/40 rounded-sm"></div>
        </div>
        <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-cyan-400/30 transform rotate-45 animate-bounce delay-700"></div>
        
        {/* Circuit Board Lines */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            <path d="M100 100h200v100h300v-50h200" stroke="url(#lineGrad1)" strokeWidth="2"/>
            <path d="M50 300h150v-100h250v150h200" stroke="url(#lineGrad2)" strokeWidth="2"/>
            <path d="M200 500h300v-200h200v100h150" stroke="url(#lineGrad3)" strokeWidth="2"/>
            <defs>
              <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
                <stop offset="50%" stopColor="rgba(59, 130, 246, 0.8)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
              </linearGradient>
              <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(34, 211, 238, 0)" />
                <stop offset="50%" stopColor="rgba(34, 211, 238, 0.6)" />
                <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
              </linearGradient>
              <linearGradient id="lineGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(99, 102, 241, 0)" />
                <stop offset="50%" stopColor="rgba(99, 102, 241, 0.7)" />
                <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Animated Dots/Nodes */}
        <div className="absolute top-24 left-1/3 w-3 h-3 bg-blue-400 rounded-full animate-ping delay-300">
          <div className="absolute inset-0 bg-blue-300 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute bottom-40 right-1/3 w-4 h-4 bg-cyan-400 rounded-full animate-ping delay-800">
          <div className="absolute inset-1 bg-cyan-300 rounded-full animate-pulse delay-200"></div>
        </div>
        <div className="absolute top-1/2 left-20 w-2 h-2 bg-indigo-400 rounded-full animate-ping delay-1200">
          <div className="absolute inset-0 bg-indigo-300 rounded-full animate-pulse delay-400"></div>
        </div>
        
        {/* Morphing Shapes */}
        <div className="absolute top-16 right-1/3 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-cyan-400/10 rounded-3xl animate-float transform rotate-12">
          <div className="absolute inset-2 bg-gradient-to-tl from-blue-300/30 to-transparent rounded-2xl"></div>
        </div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-br from-indigo-400/20 to-purple-400/10 rounded-full animate-float delay-600">
          <div className="absolute inset-3 bg-gradient-to-tr from-indigo-300/40 to-transparent rounded-full animate-pulse"></div>
        </div>
        
        {/* Glass Morphism Elements */}
        <div className="absolute top-1/4 right-16 w-24 h-24 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 animate-float delay-400">
          <div className="absolute inset-2 bg-gradient-to-br from-blue-400/20 to-transparent rounded-xl"></div>
        </div>
        <div className="absolute bottom-1/3 left-32 w-20 h-20 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 animate-float delay-900">
          <div className="absolute inset-3 bg-gradient-to-tl from-cyan-400/30 to-transparent rounded-full"></div>
        </div>
        
        {/* Particle System */}
        <div className="absolute top-32 left-1/2 w-1 h-1 bg-blue-300/80 rounded-full animate-float delay-100"></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-cyan-300/80 rounded-full animate-float delay-1100"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-indigo-300/80 rounded-full animate-float delay-700"></div>
        <div className="absolute top-1/2 right-32 w-1 h-1 bg-purple-300/80 rounded-full animate-float delay-1300"></div>
        
        {/* Dynamic Grid Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, rgba(34, 211, 238, 0.3) 2px, transparent 2px),
              radial-gradient(circle at 75% 25%, rgba(99, 102, 241, 0.3) 2px, transparent 2px),
              radial-gradient(circle at 25% 75%, rgba(168, 85, 247, 0.3) 2px, transparent 2px)
            `,
            backgroundSize: '80px 80px, 120px 120px, 100px 100px, 140px 140px'
          }}></div>
        </div>

        {/* Content Container */}
        <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Side - Text Content */}
          <div className="flex-1 space-y-6">
            {/* Status Badge */}
            <div className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-200 ring-1 ring-inset ring-blue-500/20 animate-bounce">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
              </span>
              Now Hiring Top Talent
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              <span className="block">Recruitment,</span>
              <span className="bg-gradient-to-r from-blue-200 via-blue-300 to-indigo-200 bg-clip-text text-transparent">
                Reimagined
              </span>
            </h1>

            <p className="text-lg text-blue-100/90 max-w-xl">
              Modern, scalable recruitment solutions to help you attract, hire,
              and retain top talent in today's competitive market.
            </p>

            {/* Stats Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex-shrink-0 grid grid-cols-2 gap-8 p-8 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
            >
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">
                  95%
                </div>
                <div className="text-blue-200/80 text-sm">Placement Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">
                  48h
                </div>
                <div className="text-blue-200/80 text-sm">
                  Average Time to Hire
                </div>
              </div>
            </motion.div>

            <div>
              <Link to="/corporate/recruitment/contact">
                <button className="group relative corporate-btn-2 bg-white text-black overflow-hidden flex items-center gap-2">
                  <span className="relative z-10">Get Started</span>
                  <Icon icon="mdi:arrow-right" className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform duration-200 z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-stretch"
        >
          {services.map((service: any, idx: number) => (
            <Link
              to={`/corporate/recruitment/services/${service.link}`}
              key={service.id || idx}
              className="h-full flex"
            >
              <motion.div
                variants={itemVariants}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full"
                whileHover={{ y: -5 }}
              >
                {/* Card Header with Icon */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-bl-[100px] transition-all duration-300 group-hover:scale-110"></div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="relative z-10 mb-6 flex flex-col items-start">
                    <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                        {service.icon ? (
                          typeof service.icon === "string" && service.icon.startsWith("http") ? (
                          <img
                            src={service.icon}
                            alt={service.title}
                            className="w-8 h-8"
                          />
                          ) : (
                          <div className="text-3xl">{service.icon}</div>
                          )
                        ) : (
                          (() => {
                          const title = service.title?.toLowerCase() || "";
                          // Use a different set of outline icons from Iconify (tabler, heroicons, lucide, etc.)
                          let iconName = "tabler:user-circle";
                            if (title.includes("executive")) iconName = "tabler:award";
                            else if (title.includes("campus")) iconName = "tabler:school";
                            else if (title.includes("leadership")) iconName = "tabler:users-group";
                            else if (title.includes("diversity")) iconName = "tabler:users";
                            else if (title.includes("contract")) iconName = "tabler:file-contract";
                            else if (title.includes("project")) iconName = "tabler:layout-dashboard";
                            else if (title.includes("permanent")) iconName = "tabler:briefcase";
                            else if (title.includes("talent")) iconName = "tabler:star";
                            else if (title.includes("consulting")) iconName = "tabler:message-chatbot";
                            else if (title.includes("outsourcing")) iconName = "tabler:exchange";
                            else if (title.includes("assessment")) iconName = "tabler:checkup-list";
                            else if (title.includes("training")) iconName = "tabler:chalkboard";
                            else if (title.includes("onboarding")) iconName = "tabler:user-plus";
                            else if (title.includes("search")) iconName = "tabler:search";
                          return (
                            <Icon
                            icon={iconName}
                            className="text-3xl text-blue-600"
                            />
                          );
                          })()
                        )}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-left">
                      {service.title}
                    </h2>
                  </div>

                  {/* Card Content */}
                  <p className="text-gray-600 mb-6 line-clamp-3 text-left">
                    {service.title_desc || service.description}
                  </p>

                  {/* Benefits Section */}
                  {service.benefits && Array.isArray(service.benefits) && (
                    <div className="space-y-3 mb-4">
                      {service.benefits.map((benefit: string, bidx: number) => (
                        <div key={bidx} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                            <svg
                              className="w-3 h-3 text-green-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-700 text-sm text-left">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Learn More Link */}
                  <div className="mt-auto flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                    Learn more
                    <svg
                      className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* CTA Section */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative bg-gradient-to-br from-blue-950 via-indigo-900 to-blue-800 rounded-2xl p-12 text-center overflow-hidden"
          >
            {/* CTA Background Elements */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-white/10 to-blue-300/20 rounded-full mix-blend-overlay filter blur-2xl animate-float"></div>
            <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-gradient-to-br from-cyan-300/20 to-white/10 rounded-full mix-blend-overlay filter blur-2xl animate-float delay-1000"></div>
            
            {/* Geometric Accents */}
            <div className="absolute top-8 right-12 w-12 h-12 border border-white/20 rotate-45 animate-spin-slow">
              <div className="absolute inset-2 border border-white/15 rounded-sm animate-pulse"></div>
            </div>
            <div className="absolute bottom-8 left-12 w-8 h-8 bg-white/15 transform rotate-12 animate-float delay-700">
              <div className="w-full h-full border border-white/20 rounded-full"></div>
            </div>
            
            {/* Floating Particles */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-float delay-300"></div>
            <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-cyan-200/60 rounded-full animate-float delay-900"></div>
            <div className="absolute top-1/2 right-16 w-2 h-2 bg-white/30 rounded-full animate-float delay-600"></div>
            <div className="absolute bottom-1/3 left-20 w-1 h-1 bg-blue-200/50 rounded-full animate-float delay-1200"></div>
            
            {/* Circuit Lines */}
            <div className="absolute inset-0 opacity-15">
              <svg className="w-full h-full" viewBox="0 0 400 200" fill="none">
                <path d="M50 50h80v30h120v-15h100" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1"/>
                <path d="M30 120h60v-40h100v60h80" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1"/>
                <circle cx="130" cy="80" r="3" fill="rgba(255, 255, 255, 0.5)"/>
                <circle cx="290" cy="65" r="2" fill="rgba(255, 255, 255, 0.4)"/>
                <circle cx="90" cy="150" r="2" fill="rgba(255, 255, 255, 0.3)"/>
              </svg>
            </div>
            
            {/* Glass Morphism Elements */}
            <div className="absolute top-6 left-16 w-16 h-16 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 animate-float delay-400">
              <div className="absolute inset-2 bg-gradient-to-br from-white/20 to-transparent rounded-lg"></div>
            </div>
            <div className="absolute bottom-6 right-16 w-12 h-12 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 animate-float delay-800">
              <div className="absolute inset-2 bg-gradient-to-tl from-white/15 to-transparent rounded-full"></div>
            </div>
            
            {/* Gradient Overlay Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.3) 2px, transparent 2px),
                  radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
                  radial-gradient(circle at 60% 20%, rgba(255, 255, 255, 0.25) 1.5px, transparent 1.5px)
                `,
                backgroundSize: '60px 60px, 40px 40px, 80px 80px'
              }}></div>
            </div>
            
            {/* Content with relative positioning */}
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Transform Your Recruitment?
              </h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Let's discuss how our recruitment services can help you build
                high-performing teams.
              </p>
              <Link to="/corporate/recruitment/contact">
                <button className="group relative corporate-btn-2 mx-auto bg-white overflow-hidden">
                  <span className="relative z-10">Contact Our Recruitment Team</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
