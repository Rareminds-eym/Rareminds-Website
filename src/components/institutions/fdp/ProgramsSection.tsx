import { motion } from 'framer-motion';
import { BookOpen, Monitor, Target, School, FileText, Award, Clock, Sparkles } from 'lucide-react';

const programs = [
  {
    name: 'New-Age Pedagogy 360°',
    focus: 'Experiential, flipped & case-based teaching',
    duration: '5 Days',
    mode: 'Online/Hybrid',
    icon: BookOpen,
    color: 'from-blue-600 to-indigo-600',
    benefits: ['Interactive Learning', 'Student Engagement', 'Modern Methods'],
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800'
  },
  {
    name: 'Digital Dexterity for Educators',
    focus: 'Tools like AI in teaching, LMS, content creation',
    duration: '3 Days',
    mode: 'Online',
    icon: Monitor,
    color: 'from-purple-600 to-pink-600',
    benefits: ['AI Integration', 'Digital Tools', 'Content Creation'],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800'
  },
  {
    name: 'Assessment & Evaluation Mastery',
    focus: 'Designing rubrics, continuous assessment, outcome-based learning',
    duration: '2 Days',
    mode: 'Offline/Online',
    icon: Target,
    color: 'from-green-600 to-teal-600',
    benefits: ['Rubric Design', 'Continuous Assessment', 'Learning Outcomes'],
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800'
  },
  {
    name: 'Industry-Ready Curriculum Mapping',
    focus: 'Aligning syllabi to careers & industry needs',
    duration: '1 Week',
    mode: 'Hybrid',
    icon: School,
    color: 'from-amber-600 to-orange-600',
    benefits: ['Industry Alignment', 'Career Focus', 'Modern Curriculum'],
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800'
  },
  {
    name: 'Research to Publication Bootcamp',
    focus: 'Proposal writing, UGC care journals, funding',
    duration: '4 Days',
    mode: 'Online/Offline',
    icon: FileText,
    color: 'from-red-600 to-rose-600',
    benefits: ['Research Skills', 'Publication Strategy', 'Funding Access'],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800'
  },
  {
    name: 'Leadership for Academic Excellence',
    focus: 'Institutional strategy, faculty mentoring, policy',
    duration: '3 Days',
    mode: 'Retreat Style',
    icon: Award,
    color: 'from-violet-600 to-purple-600',
    benefits: ['Strategic Planning', 'Mentorship', 'Policy Development'],
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800'
  }
];

export default function ProgramsSection() {
  return (
    <section className="py-32 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold mb-6">Structured FDP Tracks</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive programs designed for the modern educator
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-[400px] perspective-1000"
            >
              <div className="flip-card">
                {/* Front of card */}
                <div className="flip-card-front rounded-2xl overflow-hidden">
                  <div className="relative h-full group">
                    <img 
                      src={program.image} 
                      alt={program.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <program.icon className="w-12 h-12 mb-4" />
                      <h3 className="text-2xl font-bold mb-2">{program.name}</h3>
                      <p className="text-white/90">{program.focus}</p>
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div className={`flip-card-back rounded-2xl overflow-hidden bg-gradient-to-br ${program.color}`}>
                  <div className="p-6 h-full flex flex-col text-white">
                    <h3 className="text-2xl font-bold mb-4">{program.name}</h3>
                    <div className="flex items-center gap-4 text-sm mb-6">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {program.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <Monitor className="w-4 h-4" />
                        {program.mode}
                      </div>
                    </div>
                    <div className="space-y-3 flex-grow">
                      {program.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-yellow-300" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                    <button className="mt-auto w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-lg transition-colors">
                      Learn More
                    </button>
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