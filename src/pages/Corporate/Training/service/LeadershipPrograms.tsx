import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Users,
  Brain,
  Target,
  Award,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { services } from "./leadershipProgramsData";

const iconMap = {
  users: <Users className="w-5 h-5 text-blue-600" />,
  brain: <Brain className="w-5 h-5 text-purple-600" />,
  target: <Target className="w-5 h-5 text-indigo-600" />,
};

const LeadershipPrograms = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === id);

  if (!service) {
    return <div>Service not found {id}</div>;
  }

  const { heroTitle, heroSubtitle, featureBadges, programs } = service;
  const [activeProgram, setActiveProgram] = useState(programs[0].id);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-4"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          Back to All Services
        </button>
      </div>

      {/* Hero Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {heroTitle}
            </h1>
            <p className="text-xl text-gray-600 mb-8">{heroSubtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-1/4">
              <div className="sticky top-[90px] bg-white rounded-xl shadow-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Our Programs
                </h3>
                <nav className="space-y-2">
                  {programs.map((program) => (
                    <button
                      key={program.id}
                      onClick={() => setActiveProgram(program.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                        activeProgram === program.id
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "hover:bg-gray-50 text-gray-600"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{program.title}</span>
                        <ChevronRight
                          className={`w-4 h-4 transition-transform ${
                            activeProgram === program.id ? "rotate-90" : ""
                          }`}
                        />
                      </div>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              {programs.map(
                (program) =>
                  program.id === activeProgram && (
                    <motion.div
                      key={program.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-8"
                    >
                      {/* Program Overview */}
                      <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="flex items-start justify-between">
                          <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                              {program.title}
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                              {program.overview}
                            </p>
                          </div>
                          <Award className="w-12 h-12 text-blue-600 flex-shrink-0" />
                        </div>

                        {/* Key Features */}
                        <div className="grid sm:grid-cols-2 gap-6 mt-8">
                          <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="font-semibold text-xl mb-4 text-gray-900">
                              What We Cover
                            </h3>
                            <ul className="space-y-3">
                              {program.whatWeCover.map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2" />
                                  <span className="text-gray-700">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="font-semibold text-xl mb-4 text-gray-900">
                              Our Approach
                            </h3>
                            <ul className="space-y-3">
                              {program.delivery.map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2" />
                                  <span className="text-gray-700">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Course Modules */}
                      <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h3 className="text-2xl font-bold mb-6 text-gray-900">
                          Course Modules
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
                                  Module
                                </th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
                                  Title
                                </th>
                                <th className="py-4 px-6 text-center text-sm font-semibold text-gray-900">
                                  Duration
                                </th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
                                  Objectives
                                </th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
                                  Activities
                                </th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
                                  Outcome
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {program.modules.map((mod, i) => (
                                <tr
                                  key={i}
                                  className="hover:bg-gray-50 transition-colors"
                                >
                                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                                    {i + 1}
                                  </td>
                                  <td className="py-4 px-6 text-sm text-gray-600">
                                    {mod.title}
                                  </td>
                                  <td className="py-4 px-6 text-sm text-gray-600 text-center">
                                    {mod.hours}
                                  </td>
                                  <td className="py-4 px-6 text-sm text-gray-600">
                                    {mod.objectives}
                                  </td>
                                  <td className="py-4 px-6 text-sm text-gray-600">
                                    {mod.activities}
                                  </td>
                                  <td className="py-4 px-6 text-sm text-gray-600">
                                    {mod.outcome}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Why Choose Section */}
                      {program.whyChoose && (
                        <div className="mt-6 bg-blue-50 rounded-xl p-6">
                          <h3 className="font-semibold text-xl mb-2 text-blue-800">
                            Why Choose This Program?
                          </h3>
                          <p className="text-gray-700">{program.whyChoose}</p>
                        </div>
                      )}

                      {/* CTA Section */}
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
                        <div className="max-w-3xl mx-auto text-center">
                          <h4 className="text-2xl font-bold mb-4">
                            {program.cta.text}
                          </h4>
                          <p className="text-lg opacity-90 mb-8">
                            {program.cta.description}
                          </p>
                          <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1" onClick={handleClick}>
                            Connect with Us
                            <ArrowRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
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
