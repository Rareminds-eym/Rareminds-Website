// import { motion, useScroll, useTransform } from 'framer-motion';
// import { 
//   GraduationCap,
//   Briefcase,
//   BookOpen,
//   Users,
//   School,
//   Building2,
//   ArrowRight,
//   Download,
//   FileSpreadsheet,
//   Search
// } from 'lucide-react';
// import { useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Input } from "../../../components/Academy/UI/input"; // Adjust the path as necessary
// import { toast } from "@/hooks/use-toast"; // Adjust the path as necessary

// export const Coursess = [
//   {
//     id: 'full-semester',
//     icon: GraduationCap,
//     name: 'Full Semester Skill Program',
//     subtitle: '',
//     description: 'Multiple courses + internships + final evaluation + certification',
//     whatitis: `, problem-solving, and workplace adaptability – all essential for modern careers.`,
//     image: "/institutions/images/Coursess/1.png",
//     color: 'from-blue-600 to-purple-600',
//     duration: '6 Months',
//     mode: 'Hybrid',
//     Coursessimg: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800',
//     focus: 'Comprehensive skill development',
//     benefits: [
//       'Industry-aligned curriculum',
//       'Hands-on projects',
//       'Internship opportunities',
//       'Professional certification',
//       'Placement assistance',
//     ]
//   },
//   {
//     id: 'pre-placement',
//     icon: Briefcase,
//     name: 'Pre-Placement Accelerator',
//     subtitle: 'Career Oriented',
//     description: 'Final year focused bootcamp + placement tie-up',
//     whatitis: `This is Rareminds' flagship bootcamp-style training for final-year students, tailored to ensure placement readiness. It combines technical revision, aptitude training, mock interviews, group discussions, personality development, and career coaching. The program is integrated with strategic placement tie-ups, giving students access to recruitment drives and hiring partners.`,
//     image: "/institutions/images/Coursess/2.png",
//     color: 'from-blue-600 to-purple-600',
//     duration: '3 Months',
//     mode: 'Intensive',
//     Coursessimg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800',
//     focus: 'Placement preparation',
//     benefits: [
//       'Interview preparation',
//       'Resume building',
//       'Mock interviews',
//       'Technical training',
//       'Soft skills development'
//     ]
//   },
//   {
//     id: 'bridge-courses',
//     icon: BookOpen,
//     name: 'Bridge Courses',
//     subtitle: 'First Years',
//     description: 'Foundational programs on communication, digital tools, work ethics',
//     whatitis: `Designed for newly admitted students, this Rareminds initiative focuses on building a strong foundation for college success. It covers effective communication, digital fluency (MS Office, Google tools, etc.), teamwork, and ethical behavior. The courses promote emotional intelligence and self-awareness to help students manage the transition to college life and adapt to a new learning environment.`,
//     image: "/institutions/images/Coursess/3.png",
//     color: 'from-blue-600 to-purple-600',
//     duration: '2 Months',
//     mode: 'Regular',
//     Coursessimg: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800',
//     focus: 'Foundation building',
//     benefits: [
//       'Basic communication skills',
//       'Digital literacy',
//       'Professional ethics',
//       'Time management',
//       'Team collaboration'
//     ]
//   },
//   {
//     id: 'skill-based',
//     icon: School,
//     name: 'Skill-Based Training',
//     subtitle: 'Credit-Linked',
//     description: 'Add-on courses that enhance your academic profile',
//     whatitis: `These modular training programs, developed by Rareminds, are either integrated into the curriculum (credit-linked) or offered as supplementary add-ons. Covering areas like data analytics, digital marketing, communication mastery, coding, food safety, and more – they align with industry trends and student aspirations. Each module is designed for hands-on, measurable learning.`,
//     image: "/institutions/images/Coursess/4.png",
//     color: 'from-blue-600 to-purple-600',
//     duration: 'Flexible',
//     mode: 'Modular',
//     Coursessimg: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800',
//     focus: 'Specialized skills',
//     benefits: [
//       'Industry certifications',
//       'Practical workshops',
//       'Expert sessions',
//       'Project-based learning',
//       'Credit recognition'
//     ]
//   },
//   {
//     id: 'faculty-development',
//     icon: Users,
//     name: 'Faculty Development',
//     subtitle: 'NEP & Technology',
//     description: 'Comprehensive training on NEP and Industry Integration',
//     whatitis: `Rareminds conducts specialized FDPs to help educators embrace National Education Policy (NEP) guidelines, integrate emerging technologies, and implement industry-relevant content. These programs are interactive, insightful, and practice-oriented—equipping faculty to become facilitators of innovation and mentors of the future workforce.`,
//     image: "/institutions/images/Coursess/1.png",
//     color: 'from-blue-600 to-purple-600',
//     duration: '1 Week',
//     mode: 'Intensive',
//     Coursessimg:'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?auto=format&fit=crop&w=800',
//     focus: 'Teacher training',
//     benefits: [
//       'NEP 2020 implementation',
//       'Modern teaching methods',
//       'Technology integration',
//       'Research guidance',
//       'Industry collaboration'
//     ]
//   },
//   {
//     id: 'internship-placement',
//     icon: Building2,
//     name: 'Internship & Placement',
//     subtitle: 'Industry Connect',
//     description: 'Direct industry partnerships for real-world experience',
//     whatitis: `Rareminds acts as a bridge between institutions and industries by forming structured internship and placement partnerships. We facilitate student access to internships, project work, and job interviews with reputed companies across domains. Through close collaboration with Career Coursess Cells and Training & Placement Officers, Rareminds ensures seamless employability pathways.`,
//     image: "/institutions/images/Coursess/2.png",
//     color: 'from-blue-600 to-purple-600',
//     duration: 'Ongoing',
//     mode: 'Facilitation',
//     Coursessimg: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800',
//     focus: 'Career launch',
//     benefits: [
//       'Industry partnerships',
//       'Internship opportunities',
//       'Placement drives',
//       'Career counseling',
//       'Alumni network'
//     ]
//   },
// ];

// const Courses=()=> {
//   const containerRef = useRef(null);
//   const navigate = useNavigate();
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"]
//   });

//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [activeFilters, setActiveFilters] = useState<string[]>([]);

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   const toggleFilter = (value: string) => {
//     setActiveFilters(prev => 
//       prev.includes(value) 
//         ? prev.filter(f => f !== value) 
//         : [...prev, value]
//     );
//   };

//   const filteredCoursess = Coursess.filter(Courses => {
//     // Search logic
//     if (searchQuery.trim() !== "") {
//       const query = searchQuery.toLowerCase();
//       const matchesName = Courses.name.toLowerCase().includes(query);
//       const matchesDescription = Courses.description.toLowerCase().includes(query);
//       if (!(matchesName || matchesDescription)) {
//         return false;
//       }
//     }
//     // Filter logic (if any filter is active, match any)
//     if (activeFilters.length > 0) {
//       return activeFilters.includes(Courses.id);
//     }
//     // If no filters, show all
//     return true;
//   });

//   const filterOptions = [
//     { name: "Full Semester", value: "full-semester", category: "program" },
//     { name: "Pre-Placement", value: "pre-placement", category: "program" },
//     { name: "Bridge Courses", value: "bridge-courses", category: "program" },
//     { name: "Skill-Based Training", value: "skill-based", category: "program" },
//     { name: "Faculty Development", value: "faculty-development", category: "program" },
//     { name: "Internship & Placement", value: "internship-placement", category: "program" },
//   ];

//   const yOffsets = Coursess.map((_, index) =>
//     useTransform(
//       scrollYProgress,
//       [index / Coursess.length, (index + 1) / Coursess.length],
//       [50, -50]
//     )
//   );

//   return (
//     <section ref={containerRef} className="py-8 relative overflow-hidden">
  

//       <div className="max-full mx-auto px-6 relative z-10">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             NEP-Compliant Training Programs
//           </h2>
//           <p className="text-lg text-gray-600">
//             Discover specialized courses designed to transform teaching practices in alignment with 
//             the National Education Policy 2020
//           </p>
//         </div>
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-4"
//         >
        
//         </motion.div>

//         <form onSubmit={(e) => { e.preventDefault(); }} className="max-w-md mx-auto mb-8">
//           <div className="relative">
//             <Input 
//               type="text"
//               placeholder="Search for Coursess..." 
//               value={searchQuery}
//               onChange={handleSearch}
//               className="pr-10"
//             />
//             <button 
//               type="submit"
//               className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-red-600"
//             >
//               <Search className="h-4 w-4" />
//             </button>
//           </div>
//         </form>

//         <div className="flex flex-wrap justify-center gap-3 mb-8">
//           {filterOptions.map((option) => (
//             <button
//               key={option.value}
//               onClick={() => toggleFilter(option.value)}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilters.includes(option.value) ? "bg-red-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"}`}
//             >
//               {option.name}
//               {activeFilters.includes(option.value) && <span className="ml-2">✓</span>}
//             </button>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
//           {filteredCoursess.map((Courses, index) => {
//             // Find the index in the original Coursess array for correct yOffset
//             const originalIndex = Coursess.findIndex(s => s.id === Courses.id);
//             const yOffset = yOffsets[originalIndex];
//             return (
//               <motion.div
//                 key={Courses.id}
//                 style={{ y: yOffset }}
//                 className="relative group h-[360px] cursor-pointer max-w-xs mx-auto"
//                 onClick={() => navigate(`/academia/school/Courses/${Courses.id}`)}
//               >
//                 <div className={`absolute left-0 top-0 bottom-0 w-6 bg-[#020202] rounded-l-lg transform -skew-y-12`} />
                
//                 <motion.div
//                   whileHover={{ rotateY: -15, translateX: 10 }}
//                   transition={{ type: "spring", stiffness: 300, damping: 20 }}
//                   className="relative bg-white/40 backdrop-blur-sm rounded-r-lg shadow-2xl overflow-hidden ml-6 h-full"
//                 >
//                   <div className="relative h-40 overflow-hidden">
//                     <img
//                       src={Courses.image}
//                       alt={Courses.name}
//                       className="w-[404.61] h-[160] object-cover"
//                     />
//                     <div className={`absolute inset-0 bg-[#222B33] opacity-50`} />
//                   </div>

//                   <div className="p-6">
//                     <div className="flex items-center justify-between mb-3">
//                       <h3 className="text-medium font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
//                         {Courses.name}
//                       </h3>
//                       <Courses.icon className="w-7 h-7 text-gray-800" />
//                     </div>
//                     {Courses.subtitle && (
//                       <p className={`text-xs font-medium bg-gradient-to-r ${Courses.color} bg-clip-text text-transparent mb-3`}>
//                         {Courses.subtitle}
//                       </p>
//                     )}
//                     <p className="text-gray-600 text-sm leading-relaxed mb-4">
//                       {Courses.description}
//                     </p>
                    
//                     <motion.div
//                       whileHover={{ x: 10 }}
//                       className={`flex items-center gap-2 text-xs font-semibold bg-gradient-to-r ${Courses.color} bg-clip-text text-transparent`}
//                     >
//                       Learn More
//                       <ArrowRight className="w-4 h-4" />
//                     </motion.div>
//                   </div>

//                   <div className="absolute right-0 top-0 bottom-0 w-1 bg-gray-200 transform skew-y-45" />
//                 </motion.div>
//               </motion.div>
//             );
//           })}
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mt-9 relative"
//         >
//           <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-pink-400/30 animate-pulse" />
          
//           <motion.div
//             animate={{
//               textShadow: [
//                 "0 0 10px rgba(79, 70, 229, 0.5)",
//                 "0 0 20px rgba(79, 70, 229, 0.3)",
//                 "0 0 10px rgba(79, 70, 229, 0.5)"
//               ]
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               repeatType: "reverse"
//             }}
//             className="relative"
//           >
//           </motion.div>

//           <motion.div
//             className="relative inline-block"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
           
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// export default Courses;



import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  GraduationCap,
  Briefcase,
  BookOpen,
  Users,
  School,
  Building2,
  ArrowRight,
  Search
} from 'lucide-react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "../../../components/Academy/UI/input";
import { Book } from "@/components/ui/book";

export const Coursess = [
  {
    id: 'Teacher Development Programs (TDP)',
    icon: GraduationCap,
    name: 'Teacher Development Programs (TDP)',
    subtitle: '',
    description: 'NEP Implementation for Foundational, Preparatory, Middle & Secondary Stages. Pedagogy: Activity-Based Learning (ABL), Experiential Learning, Gamification and EdTech Integration, Blended Learning Methods, Assessment Design and Bloom’s Taxonomy Mapping. Differentiated Instruction & Inclusive Classrooms & holistic. Remedial & Special Education Support Training. Entrepreneurial teacher (How to mentor startups, incubation programs, IIC involvement). Green Campus & Sustainability Education (ESG, SDGs, climate literacy integration). Digital and Pedagogical Upskilling (Google Suite, Canva for Education, Microsoft Teams, Padlet, Kahoot, Mentimeter).',
    whatitis: 'Comprehensive, NEP-aligned professional development for teachers, covering pedagogy, technology, sustainability, and entrepreneurship.',
    image: '/institutions/images/Coursess/1.png',
    color: '#D5D5D5',
    duration: '',
    mode: '',
    Coursessimg: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800',
    focus: 'Comprehensive skill development',
    benefits: [
      'NEP Implementation for all school stages',
      'Activity-Based, Experiential, and Gamified Learning',
      'Assessment Design & Bloom’s Taxonomy',
      'Inclusive & Remedial Education Training',
      'Entrepreneurial & Green Campus Initiatives',
      'Digital and Pedagogical Upskilling',
      'Teacher Performance Audits',
      'School/College Ranking Preparation',
      'Building Teacher-Led Clubs & Innovation Cells',
      'Peer-Learning Teacher Communities'
    ]
  },
  
  {
    id: 'communication-personality',
    icon: Users,
    name: 'Communication and Personality Development',
    subtitle: 'Empowering Teachers',
    description: 'English Fluency & Public Speaking for Teachers. Classroom Management without Stress. Parent-Teacher Communication Mastery.',
    whatitis: 'Enhance communication, classroom management, and parent engagement skills for teachers.',
    image: '/institutions/images/Coursess/2.png',
    color: '#D5D5D5',
    duration: '15–20 hours',
    mode: ' Offline / Hybrid',
    Coursessimg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800',
    focus: 'Teacher communication & soft skills',
    benefits: [
      'English fluency for educators',
      'Effective classroom management',
      'Parent-teacher communication mastery'
    ]
  },
  {
    id: 'mental-health-counseling',
    icon: School,
    name: 'Mental Health and Counseling Training',
    subtitle: 'Wellbeing & Support',
    description: 'Recognizing At-Risk Students. Peer Counseling & First Response Techniques. Faculty as Mentors: Empathy & Active Listening. Creating a Safe Classroom.',
    whatitis: 'Train teachers to support student mental health, provide first response, and create safe, empathetic classrooms.',
    image: '/institutions/images/Coursess/3.png',
    color: '#D5D5D5',
    duration: '12–15 hours',
    mode: ' Offline / Online',
    Coursessimg: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800',
    focus: 'Student wellbeing',
    benefits: [
      'Recognize at-risk students',
      'Peer counseling skills',
      'Empathy & active listening',
      'Safe classroom creation'
    ]
  },
  {
    id: 'domain-specific-certification',
    icon: Briefcase,
    name: 'Domain-Specific Certification Programs',
    subtitle: 'Industry Partnerships',
    description: 'In partnership with industries (AgriTech, EV, EdTech, AI, Biotechnology, etc.).',
    whatitis: 'Certification programs for teachers in collaboration with leading industry partners.',
    image: '/institutions/images/Coursess/4.png',
    color: '#D5D5D5',
    duration: '20–30 hours',
    mode: 'Online / Hybrid',
    Coursessimg: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800',
    focus: 'Industry-relevant upskilling',
    benefits: [
      'Industry-recognized certifications',
      'Exposure to latest trends',
      'Collaboration with sector leaders'
    ]
  },
  {
    id: 'leadership-career-growth',
    icon: Building2,
    name: 'Leadership and Career Growth',
    subtitle: 'For Academic Leaders',
    description: 'Aspiring Academic Leaders Program (For HODs/Coordinators). School Principal Excellence Program. Continuous Professional Development Frameworks for School Clusters - Workshops.',
    whatitis: 'Leadership and professional growth programs for aspiring and current academic leaders.',
    image: '/institutions/images/Coursess/2.png',
    color: '#D5D5D5',
    duration: '18–25 hours',
    mode: 'Hybrid',
    Coursessimg: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800',
    focus: 'Leadership development',
    benefits: [
      'Leadership training for HODs/Coordinators',
      'Principal excellence programs',
      'Professional development workshops'
    ]
  },
  {
    id: 'institutional-value-added',
    icon: BookOpen,
    name: 'Institutional Value-Added Services',
    subtitle: 'For Teachers & Management',
    description: 'Teacher Performance Audits. School/College Ranking Preparation (NAAC/NIRF Readiness). Building Teacher-Led Clubs & Innovation Cells. Creating Peer-Learning Teacher Communities.',
    whatitis: 'Value-added services benefiting both teachers and management for institutional growth.',
    image: '/institutions/images/Coursess/3.png',
    color: '#D5D5D5',
    duration: '10–15 hours',
    mode: 'Offline / Hybrid',
    Coursessimg: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800',
    focus: 'Institutional excellence',
    benefits: [
      'Performance audits',
      'Ranking preparation',
      'Teacher-led clubs',
      'Peer-learning communities',

    ],
    
  },
];

export const domainSpecificCertificationDetails = {
  title: "What makes Rareminds Domain-Specific Certification Programs different?",
  intro: [
    "Schools play a crucial role in inspiring students towards future careers in emerging fields (AgriTech, EV, EdTech, AI, Biotechnology). However, many lack the resources to provide meaningful exposure and skill development in these areas.",
    "These age-appropriate certification programs combine fun, practical activities and real-world insights to introduce students to exciting career paths. Through hands-on experiments, interactive lessons, and project work, schools create an environment that nurtures curiosity and innovation."
  ],
  whyItMatters: [
    "Introduce students to emerging industries and technologies early",
    "Build foundational skills aligned with NEP 2020 and 21st-century learning goals",
    "Enhance STEM and vocational education with real-world applications",
    "Foster entrepreneurial mindset and problem-solving abilities",
    "Strengthen school reputation through innovative program offerings"
  ],
  highlights: [
    { icon: 'Award', text: 'Co-developed curriculum and modules for different age groups' },
    { icon: 'Lightbulb', text: 'Interactive digital tools, kits, and project guides for hands-on learning' },
    { icon: 'Users2', text: 'Teacher training for confident, effective delivery' },
    { icon: 'Target', text: 'Mentorship and support for student-led innovation clubs' },
    { icon: 'FileText', text: 'Co-branded certificates with Rareminds and industry partners' },
    { icon: 'Building2', text: 'Flexible delivery: online, hybrid, or onsite' }
  ],
  cta: {
    heading: 'Ignite Curiosity. Inspire Careers.',
    text: "With Rare Minds, your school can empower students to explore future career pathways and develop valuable skills that will set them apart.",
    button: 'Get Started Today'
  }
};

export const mentalHealthCounselingDetails = {
  title: "What makes Rareminds' Mental Health and Counselling Training different?",
  intro: [
    "Mental health issues among students are increasing, yet the majority of classrooms lack the capacity to react. Teachers are usually the first adults to observe signs of distress, but they do not have the training to help or refer students. This creates lost intervention opportunities, intensified emotional problems, and unnecessary classroom disruption.",
    "Rareminds' Teachers' Mental Health and Counseling Training is intended to create emotional sensitivity, communication awareness, and first-responding skills for school teachers. Our training helps teachers become more than academic facilitators, yet emotionally sensitive care-takers of students' welfare."
  ],
  whyItMatters: [
    "Establishes communication and trust between teachers and students",
    "Decreases classroom interruptions due to unaddressed emotional concerns",
    "Prepares teachers to respond promptly and refer competently",
    "Fosters a safe, supportive learning climate school-wide"
  ],
  highlights: [
    { icon: 'Target', text: 'Identifying At-Risk Students with observation tools and behavior indicators' },
    { icon: 'Users2', text: 'Peer Counseling & First Response Skills for emotional first-aid' },
    { icon: 'Lightbulb', text: 'Faculty as Mentors: Empathy & Active Listening' },
    { icon: 'Award', text: 'Creating a Safe, Inclusive Classroom Environment' }
  ],
  cta: {
    heading: 'Empower Teachers as Mental Health Allies',
    text: "Rareminds empowers your teachers to be mental health allies — prepared to assist, listen, and lead with compassion.",
    button: 'Get Started Today'
  }
};

export const communicationPersonalityDevelopmentDetails = {
  title: "What makes Rareminds’ Communication and Personality Development Program different?",
  intro: [
    "In today’s dynamic learning environments, academic expertise alone is not enough. The role of a teacher now demands fluency in communication, confidence in handling diverse classrooms, and the ability to engage effectively with parents.",
    "Rareminds’ 21st-century teacher training modules are designed to empower educators with the practical skills and behavioral strategies needed to lead classrooms with clarity, calm, and collaboration."
  ],
  whyItMatters: [
    "Enhances overall teacher confidence and classroom performance",
    "Improves student engagement, discipline, and academic outcomes",
    "Builds stronger school-home relationships",
    "Aligns with NEP’s holistic development and competency-based education approach"
  ],
  highlights: [
    { icon: 'Users2', text: 'English Fluency & Public Speaking for Teachers' },
    { icon: 'Lightbulb', text: 'Classroom Management without Stress' },
    { icon: 'Target', text: 'Parent-Teacher Communication Mastery' }
  ],
  cta: {
    heading: 'Empower, Inspire, Communicate.',
    text: "Rareminds empowers your educators not just to teach, but to lead, inspire, and communicate with purpose.",
    button: 'Get Started Today'
  }
};

export const institutionalValueAddedDetails = {
  title: "What makes Rareminds’ Institutional Value-Added Services different?",
  intro: [
    "Rareminds’ value-added services are designed to help schools and management teams achieve excellence in teaching, learning, and institutional growth. We go beyond compliance and audits, focusing on building a culture of innovation, collaboration, and continuous improvement.",
    "Our services include teacher performance audits, NAAC/NIRF ranking preparation, building teacher-led clubs and innovation cells, and creating peer-learning teacher communities."
  ],
  whyItMatters: [
    "Drives measurable improvement in teaching quality and student outcomes",
    "Prepares schools for national and international accreditations",
    "Fosters a culture of innovation and collaboration among teachers",
    "Strengthens the school’s reputation and stakeholder trust"
  ],
  highlights: [
    { icon: 'Award', text: 'Teacher Performance Audits & Feedback' },
    { icon: 'FileText', text: 'NAAC/NIRF Ranking Preparation' },
    { icon: 'Users2', text: 'Building Teacher-Led Clubs & Innovation Cells' },
    { icon: 'Lightbulb', text: 'Peer-Learning Teacher Communities' }
  ],
  cta: {
    heading: 'Transform Your Institution with Rareminds',
    text: "Partner with Rareminds to unlock your school’s full potential and achieve sustainable excellence.",
    button: 'Get Started Today'
  }
};

export const leadershipCareerGrowthDetails = {
  title: "What makes Rareminds’ Leadership and Career Growth Programs different?",
  intro: [
    "Rareminds’ leadership programs are designed for aspiring and current academic leaders, including HODs, coordinators, and principals. Our programs focus on practical leadership skills, strategic thinking, and continuous professional development.",
    "We offer workshops, mentoring, and frameworks that empower leaders to drive school improvement, foster teacher growth, and create a positive school culture."
  ],
  whyItMatters: [
    "Develops visionary and effective school leaders",
    "Supports succession planning and leadership pipelines",
    "Promotes a culture of continuous professional growth",
    "Enhances school performance and staff satisfaction"
  ],
  highlights: [
    { icon: 'Award', text: 'Leadership Training for HODs/Coordinators' },
    { icon: 'Target', text: 'Principal Excellence Programs' },
    { icon: 'Lightbulb', text: 'Professional Development Workshops' }
  ],
  cta: {
    heading: 'Lead with Vision. Grow with Rareminds.',
    text: "Empower your school’s leaders to inspire, innovate, and achieve lasting success.",
    button: 'Get Started Today'
  }
};

const Courses = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  // Removed useScroll and useTransform logic for scroll-based animation

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleFilter = (value: string) => {
    setActiveFilters(prev => 
      prev.includes(value) 
        ? prev.filter(f => f !== value) 
        : [...prev, value]
    );
  };

  const filteredCoursess = Coursess.filter(course => {
    // Search logic
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const matchesName = course.name.toLowerCase().includes(query);
      const matchesDescription = course.description.toLowerCase().includes(query);
      if (!(matchesName || matchesDescription)) {
        return false;
      }
    }
    // Filter logic (if any filter is active, match any)
    if (activeFilters.length > 0) {
      return activeFilters.includes(course.id);
    }
    // If no filters, show all
    return true;
  });

  const filterOptions = [
    { name: "Teacher Development Programs (TDP)", value: "Teacher Development Programs (TDP)", category: "program" },
    { name: "communication-personality", value: "communication-personality", category: "program" },
    { name: "mental-health-counseling", value: "mental-health-counseling", category: "program" },
    { name: "domain-specific-certification", value: "domain-specific-certification", category: "program" },
    { name: "leadership-career-growth", value: "leadership-career-growth", category: "program" },
    { name: "institutional-value-added", value: "institutional-value-added", category: "program" },
  ];

  return (
    <section ref={containerRef} className="py-8 relative overflow-hidden">
      <div className="max-full mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            NEP-Compliant Training Programs
          </h2>
          <p className="text-lg text-gray-600">
            Discover specialized courses designed to transform teaching practices in alignment with 
            the National Education Policy 2020
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-4"
        >
        </motion.div>

        <form onSubmit={(e) => { e.preventDefault(); }} className="max-w-md mx-auto mb-8">
          <div className='w-full flex gap-10'>
            <div className="relative w-96"> {/* Increased width to 384px (w-96) for a larger search bar */}
              <Input 
                type="text"
                placeholder="Search for Coursess..." 
                value={searchQuery}
                onChange={handleSearch}
                className="pr-10 w-full"
              />
              <button 
                type="submit"
                className="absolute inset-y-0 right-0 bottom-8 flex items-center px-3 text-gray-500 hover:text-red-600"
              >
                <Search className="h-4 w-8" />
              </button>
            </div>
            <div className="mb-8 text-center w-72"> {/* Match width with input */}
              <select
                onChange={(e) => toggleFilter(e.target.value)}
                className="px-4 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
                value={activeFilters[0] || ''}
              >
                <option value="">Select a filter</option>
                {filterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>

     
       


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {filteredCoursess.map((course, index) => {
            // Removed yOffset and style prop for scroll animation
            return (
              <motion.div
                key={course.id}
                className="cursor-pointer"
                onClick={() => navigate(`/academia/school/Courses/${course.id}`)}
              >
                <Book 
                  depth={10 + (index % 3) * 2} 
                  color={course.color}
                  variant="default"
                  width={340}
                >
                  <div className="p-6 grid gap-4 h-[350px]">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white text-lg leading-tight">
                        {course.name}
                      </h3>
                      <course.icon className="w-7 h-7 text-white flex-shrink-0" />
                    </div>
                    {/* {course.subtitle && (
                      <p className="text-sm text-white/80 font-medium">
                        {course.subtitle}
                      </p>
                    )} */}

                    <ul className="text-sm text-white/90 h-[150px] overflow-y-auto leading-relaxed list-disc list-inside space-y-1">
  {course.benefits.map((point, index) => (
    <li key={index}>{point}</li>
  ))}
</ul>

                    {/* <p className="text-sm text-white/90 h-[150px] overflow-y-auto leading-relaxed">
                      {course.description}
                    </p> */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm text-white/70">
                        {course.duration}  {course.mode}
                      </span>
                    </div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 text-sm font-medium text-white/90 mt-1"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </Book>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 relative"
        >
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-pink-400/30 animate-pulse" />
          <motion.div
            animate={{
              textShadow: [
                "0 0 10px rgba(79, 70, 229, 0.5)",
                "0 0 20px rgba(79, 70, 229, 0.3)",
                "0 0 10px rgba(79, 70, 229, 0.5)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="relative"
          >
          </motion.div>
          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Courses;








