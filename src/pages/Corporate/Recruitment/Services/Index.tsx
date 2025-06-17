import React from "react";
import { motion } from "framer-motion";
import { useRecruitmentService } from "@/hooks/useRecruitmentService";
import { Link } from "react-router-dom";

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
        {/* Animated Background Elements */}
        <div className="absolute transform -rotate-45 -top-10 -left-32 w-80 h-80 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute transform rotate-45 -bottom-10 -right-32 w-80 h-80 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

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
                <button className="group relative corporate-btn-2 bg-white text-black overflow-hidden">
                  <span className="relative z-10">Get Started</span>
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
                        typeof service.icon === "string" &&
                        service.icon.startsWith("http") ? (
                          <img
                            src={service.icon}
                            alt={service.title}
                            className="w-8 h-8"
                          />
                        ) : (
                          <div className="text-3xl">{service.icon}</div>
                        )
                      ) : (
                        <div className="text-3xl text-blue-600">🧑‍💼</div>
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
            className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-12 text-center"
          >
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
