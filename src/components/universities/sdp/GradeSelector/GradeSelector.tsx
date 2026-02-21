// Grade/Institution type selector component
import { motion } from 'framer-motion';
import { School, Building2 } from 'lucide-react';

interface GradeSelectorProps {
  onSelect: (institutionType: 'school' | 'college') => void;
}

export default function GradeSelector({ onSelect }: GradeSelectorProps) {
  const institutions = [
    {
      type: 'school' as const,
      icon: School,
      title: 'School',
      description: 'Programs designed for school students',
      color: 'from-blue-600 to-purple-600'
    },
    {
      type: 'college' as const,
      icon: Building2,
      title: 'College',
      description: 'Programs designed for college students',
      color: 'from-purple-600 to-pink-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {institutions.map((institution, index) => (
        <motion.div
          key={institution.type}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -10, scale: 1.02 }}
          onClick={() => onSelect(institution.type)}
          className="relative group cursor-pointer"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
          
          <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 group-hover:border-gray-400 group-hover:shadow-2xl transition-all duration-300 p-8">
            <div className={`w-20 h-20 bg-gradient-to-br ${institution.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
              <institution.icon className="w-12 h-12 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
              {institution.title}
            </h3>
            
            <p className="text-gray-600 text-center mb-6">
              {institution.description}
            </p>
            
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center justify-center gap-2 text-gray-800 font-semibold"
            >
              <span>Select</span>
              <span>→</span>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
