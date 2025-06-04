import { motion } from 'framer-motion';
import { BookOpen, Monitor, Target, School, FileText, Award, Clock, Sparkles } from 'lucide-react';

const programs = [
  {
    name: 'NEP-Ready Teaching',
    focus: 'Transformative Teaching Aligned with NEP',
    duration: '5 Days',
    mode: 'Online/Hybrid',
    icon: BookOpen,
    color: 'from-blue-600 to-indigo-600',
    benefits: ['NEP Integration', 'Policy Application', 'Learner-Centric'],
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800'
  },
  {
    name: 'Pedagogy ',
    focus: 'Modern, Active Learning Strategies',
    duration: '5 Days',
    mode: 'Online/Hybrid',
    icon: Monitor,
    color: 'from-purple-600 to-pink-600',
    benefits: ['Flipped Classroom', 'Experiential Leaning', 'Case-Based'],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800'
  },
  {
    name: 'Research & Publication Skills',
    focus: 'Enhancing Research Competence',
    duration: '2 Days',
    mode: 'Offline/Online',
    icon: Target,
    color: 'from-green-600 to-teal-600',
    benefits: ['Proposal Writing', 'UGC Compliance', 'Funding Sources'],
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800'
  },
  {
    name: 'Entrepreneurial Faculty',
    focus: 'Fostering Innovation and Start-Up Culture',
    duration: '1 Week',
    mode: 'Hybrid',
    icon: School,
    color: 'from-amber-600 to-orange-600',
    benefits: ['Innovation Mindset', 'Start-Up Mentoring', 'Incubation Strategies'],
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800'
  },
  {
    name: 'Green Campus & Sustainability Education',
    focus: 'Building Sustainable Educational Environments',
    duration: '4 Days',
    mode: 'Online/Offline',
    icon: FileText,
    color: 'from-red-600 to-rose-600',
    benefits: ['ESG Integration', 'Green Practices', 'Sustainabilty Awareness'],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800'
  },
  {
    name: 'Digital Tools Upskilling & Tech-Integrated Teaching',
    focus: 'Leveraging Technology in Education',
    duration: '3 Days',
    mode: 'Online',
    icon: Award,
    color: 'from-violet-600 to-purple-600',
    benefits: ['AI Tools', 'LMS Proficiency', 'Content Creation'],
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800'
  }
];

export default function ProgramsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-xl font-bold mb-4">Structured FDP Tracks</h1>
          <p className="text-sm text-gray-600 max-w-3xl mx-auto">
            Comprehensive programs designed for the modern educator
          </p>
        </motion.div>

       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-20">
  {programs.map((program, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-[280px] perspective-1000"
    >
      <div className="relative group h-full perspective-1000">
        <div className="relative w-full h-full transition-transform duration-700 transform-style preserve-3d group-hover:rotate-y-180">
          {/* Front side */}
          <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden">
            <div className="relative h-full group">
              <img 
                src={program.image} 
                alt={program.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <program.icon className="w-10 h-10 mb-2" />
                <h3 className="text-lg font-bold mb-2">{program.name}</h3>
                <p className="text-sm text-white/90">{program.focus}</p>
              </div>
            </div>
          </div>

          {/* Back side */}
          <div className={`absolute inset-0 backface-hidden rounded-2xl overflow-hidden transform rotate-y-180 bg-gradient-to-br ${program.color}`}>
            <div className="p-4 h-full flex flex-col text-white">
              <h3 className="text-lg font-bold mb-4">{program.name}</h3>
              <div className="flex items-center gap-3 text-xs mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {program.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Monitor className="w-4 h-4" />
                  {program.mode}
                </div>
              </div>
              <div className="space-y-2 flex-grow p-4 text-sm">
                {program.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              <button className="mt-auto w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 rounded-lg transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  ))}
</div>
      </div>
    </section>
  );
}