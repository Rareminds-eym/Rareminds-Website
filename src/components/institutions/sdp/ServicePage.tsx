import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, GraduationCap } from 'lucide-react';
import { services } from '@/components/institutions/sdp/Services';

export default function ServicePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find(s => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service not found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-800"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  // Table data
  const tableRows = [
    ["1", "Good Manufacturing Practices & Quality Assurance", "GMP, SOPs, QA/QC, compliance, pharma/food safety", "Life Sciences: FSSAI, lab safety,\nChemistry: Pharma, Commerce: Audit processes", "QA Analyst, QC Executive, GMP Associate, Compliance Officer"],
    ["2", "Medical Coding & Health Information Management", "CPT, ICD, HCPCS coding, healthcare documentation, CPC exam prep", "Life Sciences: Anatomy & physiology focus,\nCommerce: Claims processing,\nIT: Medical data systems", "Medical Coder, Health Records Analyst, CPC Certified Professional"],
    ["3", "Food Safety & Organic Production", "FSSAI, HACCP, organic certification, sustainable food systems", "Life Sciences: Food microbiology,\nAgriculture: Organic farming practices, Commerce: Organic marketing", "Food Safety Officer, Organic Certification Assistant, QA Analyst"],
    ["4", "Basic & Advanced Computer Applications", "Excel, Google Suite, dashboards, automation, productivity tools", "Science: Lab records, research logs,\nCommerce: Financial tracking tools,\nArts: Document design", "Data Entry Operator, MIS Executive, Office Assistant"],
    ["5", "Professional Communication & Workplace Readiness", "Email etiquette, group discussion, presentations, articulation", "MBA/Commerce: Business communication,\nScience: Technical reports,\nArts: Creative articulation", "Customer Support, Corporate Trainee, Admin Assistant"],
    ["6", "AI & Data Analytics for Beginners", "Python, Tableau, Excel, data visualization, real-world case studies", "Science: Experimental data,\nCommerce: Sales dashboards,\nMBA: Market analytics", "Data Analyst, BI Executive, Junior Data Scientist"],
    ["7", "Digital Marketing & Social Media Strategy", "SEO, SEM, content planning, branding, campaign analysis", "Arts: Content & visuals,\nCommerce: Ads & ROI,\nMBA: Full funnel strategy", "Digital Marketing Executive, SEO Analyst, Social Media Coordinator"],
    ["8", "Interview & Aptitude Bootcamp", "Logical reasoning, quantitative aptitude, resume building, mock interviews", "All Streams: Stream-specific aptitude training and job interview prep", "Job-ready candidates across sectors, Placement preparation"],
    ["9", "Faculty Development Program (FDP)", "Teaching excellence, NEP alignment, industry 4.0, learner-centered methods", "Arts: Project-based learning,\nScience: Research-integrated methods,\nCommerce: Business case pedagogy", "Faculty Trainer, Curriculum Developer, Academic Leader"],
    ["10", "ICT & Digital Pedagogy in Teaching", "LMS tools, gamification, MOOCs, online assessments", "All Streams: Tools mapped to stream-specific teaching strategies", "Digital Educator, LMS Administrator, eLearning Specialist"],
    ["11", "Mentorship & Counseling Skills for Educators", "Student motivation, emotional intelligence, and basic counseling techniques", "Arts: Narrative mentoring,\nScience: Research motivation,\nMBA: Career counseling", "Academic Mentor, Student Advisor, Career Counselor"],
    ["12", "Inclusive Teaching & Universal Design for Learning", "UDL, differentiated instruction, supporting students with disabilities", "All Streams: Adapted teaching materials and delivery strategies", "Inclusive Educator, Special Needs Coordinator, Accessibility Consultant"],
    ["13", "Socio-Emotional Learning & Mental Health Literacy", "Teacher empathy, trauma-informed practices, recognizing mental health cues", "Arts: SEL through literature,\nScience: Lab stress management,\nCommerce: Workplace SEL", "SEL Facilitator, Wellbeing Coordinator, Mental Health Liaison"],
    ["14", "Curriculum Co-Design Workshop", "Experiential curriculum, outcome-based design, industry alignment", "Engineering: Tech projects,\nArts: Creative output-based curriculum,\nCommerce: Industry case studies", "Curriculum Developer, Program Coordinator, Instructional Designer"],
    ["15", "Academic Project Supervision Masterclass", "Guiding student research, innovation mentoring, and evaluation frameworks", "Science: Lab projects,\nHumanities: Dissertations,\nCommerce: Market research supervision", "Research Supervisor, Innovation Mentor, Capstone Advisor"],
    ["16", "Research Methodology & Publishing Workshop", "Writing skills, data tools, publishing ethics, Scopus/UGC journals", "Science: Experimental methodology,\nHumanities: Literature reviews,\nCommerce: Applied research papers", "Research Author, Academic Writer, Journal Contributor"],
  ];

  // Other services for sticky note/bookmark links (excluding current)
  const otherServices = services.filter(s => s.id !== id);

  return (
    <div className="pt-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
      {/* Header Banner */}
      <div className="relative h-[38vh] md:h-[44vh] overflow-hidden rounded-b-3xl shadow-lg">
        <img
          src={service.servicesimg}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6">
            <motion.button
              onClick={() => navigate('/institutions#services')}
              whileHover={{ x: -5 }}
              className="text-white text-sm mb-4 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </motion.button>
            <h1 className="pt-4 text-2xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">{service.name}</h1>
            {service.subtitle && (
              <p className="pt-2 text-lg text-white/90 drop-shadow">{service.subtitle}</p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-3 py-12">
        <div className="max-w-6xl mx-auto">
          {/* About, Table, and Third Column Section */}
          <div className="grid md:grid-cols-3 gap-16 mb-8">
            {/* About Section and Table */}
            <div className="md:col-span-2 flex flex-col gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white/80 rounded-2xl shadow-lg p-4 md:p-6"
              >
                <h2 className="text-xl md:text-2xl font-semibold mb-3 text-zinc-800">About The Course</h2>
                <p className="text-gray-700 leading-relaxed text-justify text-sm md:text-base">
                  {service.whatitis}
                </p>
              </motion.div>
              {/* Notebook-style Table for Skill Programs */}
              <div className="relative mt-4 mb-10 max-w-full md:max-w-3xl mx-auto">
                {/* Notebook spiral */}
                <div className="absolute -left-4 top-0 bottom-0 flex flex-col justify-between z-10">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2.5 h-2.5 rounded-full bg-gray-300 border-2 border-white shadow-md my-1"
                    />
                  ))}
                </div>
                <div
                  className="rounded-2xl shadow-2xl border-2 border-blue-200 bg-white relative pl-6 notebook-paper"
                  style={{ minWidth: 0 }}
                >
                  <table className="relative z-10 min-w-[700px] w-full text-xs md:text-sm text-left text-gray-700">
                    <thead className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-900 border-b-2 border-blue-200 sticky top-0 z-20">
                      <tr>
                        <th className="px-2 py-2 font-bold text-zinc-800">Sl. No</th>
                        <th className="px-2 py-2 font-bold text-zinc-800">Program Title</th>
                        <th className="px-2 py-2 font-bold text-zinc-800">Key Focus Areas</th>
                        <th className="px-2 py-2 font-bold text-zinc-800">Customization by Academic Stream</th>
                        <th className="px-2 py-2 font-bold text-zinc-800">Job Roles / Outcomes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableRows.map(([no, title, focus, custom, jobs], i) => (
                        <tr key={no} className={i % 2 === 0 ? "bg-white" : "bg-blue-50"}>
                          <td className="px-2 py-2 align-top font-semibold text-center">{no}</td>
                          <td className="px-2 py-2 align-top font-semibold">{title}</td>
                          <td className="px-2 py-2 align-top whitespace-pre-line">{focus}</td>
                          <td className="px-2 py-2 align-top whitespace-pre-line">{custom}</td>
                          <td className="px-2 py-2 align-top whitespace-pre-line">{jobs}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Notebook margin line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200 rounded-full z-20" />
              </div>
            </div>
            {/* Third Column: Program Benefits and Image */}
            <div className="flex flex-col gap-8">
              {/* Other Services Sticky Notes/Bookmarks */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-zinc-800 mb-2">Other Services</h3>
                <div className="flex flex-col gap-3">
                  {otherServices.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => navigate(`/institutions/services/${s.id}`)}
                      className={`relative text-left px-4 py-3 rounded-lg shadow-md transition-all duration-200
                        bg-yellow-100 hover:bg-yellow-200 border-l-8 border-yellow-400
                        font-medium text-blue-600 cursor-pointer bookmark-note
                      `}
                      style={{
                        clipPath: 'polygon(0 0, 100% 0, 100% 85%, 90% 100%, 0 85%)'
                      }}
                    >
                      <span className="block truncate">{s.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              {/* Program Benefits */}
              <div className="relative bg-white rounded-2xl shadow-lg border-2 border-indigo-200 p-8 flex flex-col items-center justify-center education-benefits text-center">
                {/* Decorative graduation cap icon */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                  <div className="bg-indigo-100 rounded-full p-3 shadow-lg border-2 border-indigo-200">
                    <GraduationCap className="w-8 h-8 text-indigo-600" />
                  </div>
                </div>
                <motion.h2
                  className="text-xl md:text-2xl font-bold mb-7 text-indigo-900 text-center mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Program Benefits
                </motion.h2>
                <motion.ul
                  className="space-y-3 w-full flex flex-col items-center"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.15
                      }
                    }
                  }}
                >
                  {service.benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      className="flex items-center gap-2 bg-indigo-50 rounded-lg px-3 py-2 shadow-sm max-w-xl w-full justify-center"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <p className="text-gray-800 text-sm text-center w-full">{benefit}</p>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
              {/* Dummy Education Image */}
              <div className="flex justify-center items-center">
                <img
                  src="https://img.freepik.com/free-vector/leadership-concept-illustration_114360-10280.jpg?semt=ais_hybrid&w=740"
                  alt="Education Illustration"
                  className="rounded-2xl shadow-lg w-full h-auto max-h-[380px] object-cover border-2 border-indigo-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notebook-style table custom CSS */}
      <style>{`
        .notebook-paper {
          background-image:
            repeating-linear-gradient(to bottom, #e0e7ff 0 2px, transparent 2px 2.2rem);
        }
        .bookmark-note {
          font-family: 'Segoe UI', 'Arial', sans-serif;
          box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08);
        }
        .education-benefits {
          margin-top: 3.5rem;
        }
      `}</style>
    </div>
  );
}