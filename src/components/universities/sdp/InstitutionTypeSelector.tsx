import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getInstitutionTypes } from '@/services/sdp/institutionService';

export default function InstitutionTypeSelector() {
  const navigate = useNavigate();
  const institutionTypes = getInstitutionTypes();

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50/30 via-slate-50 to-indigo-50/20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          {/* ✅ Updated font size */}
      <h2 className="text-xl font-bold">
            Select Your Institution Type
          </h2>

          <p className="text-base md:text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Choose your institution type to explore customized programs and services
          </p>
        </motion.div>

        {/* Institution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {institutionTypes.map((institution, index) => {
            const Icon = institution.icon;
            const isSchool = institution.id === 'school';

            return (
              <motion.div
                key={institution.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => navigate(institution.path)}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200 hover:border-blue-300 h-full flex flex-col">

                  {/* Icon */}
                  <div className="p-8 text-center bg-gradient-to-br from-slate-50 to-white">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className={`w-16 h-16 mx-auto ${
                        isSchool ? 'bg-blue-600' : 'bg-indigo-600'
                      } rounded-xl flex items-center justify-center shadow-sm`}
                    >
                      <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-8 text-center flex flex-col flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      {institution.title}
                    </h3>

                    <p className="text-slate-600 text-base leading-relaxed mb-6 flex-1">
                      {institution.description}
                    </p>

                    <div className="flex justify-center">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-slate-300 hover:border-blue-600 text-slate-700 hover:text-blue-700 rounded-lg font-semibold text-sm transition-all duration-300"
                      >
                        <span>Explore Programs</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Why Choose Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm p-8 border border-slate-200">

            {/* ✅ Updated font size */}
            <h2 className="text-xl font-bold mb-8 text-center">
                                    Why Choose Our Programs?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { emoji: '🎯', title: 'Customized', desc: 'Tailored to your institution\'s needs' },
                { emoji: '💼', title: 'Industry-Ready', desc: 'Aligned with market demands' },
                { emoji: '🚀', title: 'Proven Results', desc: 'Track record of success' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
                    <span className="text-2xl">{item.emoji}</span>
                  </div>

                  <h4 className="font-bold text-slate-900 mb-2 text-lg">
                    {item.title}
                  </h4>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}