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
//           <div className='w-full flex gap-10 flex-col md:flex-row'>
//             <div className="relative w-full md:w-96"> {/* Responsive width for all browsers */}
//               <Input 
//                 type="text"
//                 placeholder="Search for Coursess..." 
//                 value={searchQuery}
//                 onChange={handleSearch}
//                 className="pr-10 w-full"
//                 autoComplete="off"
//                 aria-label="Search for Coursess"
//                 inputMode="search"
//               />
//               <button 
//                 type="submit"
//                 className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-red-600"
//                 tabIndex={0}
//                 aria-label="Submit search"
//                 style={{ background: 'none', border: 'none', cursor: 'pointer' }}
//               >
//                 <Search className="h-4 w-8" />
//               </button>
//             </div>
//             <div className="mb-8 text-center w-full md:w-72"> {/* Responsive width for all browsers */}
//               <select
//                 onChange={(e) => toggleFilter(e.target.value)}
//                 className="px-4 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
//                 value={activeFilters[0] || ''}
//                 aria-label="Filter by program"
//               >
//                 <option value="">Select a filter</option>
//                 {filterOptions.map((option) => (
//                   <option key={option.value} value={option.value}>
//                     {option.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
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
//                 onClick={() => navigate(`/school/teacher/Courses/${Courses.id}`)}
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
import { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
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
    image: '/academy/courseBanner/TDP.png',
    color: '#D5D5D5',
    duration: '',
    mode: '',
    Coursessimg: '/academy/courseBanner/TDP.png',
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
    image: '/academy/courseBanner/CommunicationDevelopment.png',
    color: '#D5D5D5',
    duration: '15–20 hours',
    mode: ' Offline / Hybrid',
    Coursessimg: '/academy/courseBanner/CommunicationDevelopment.png',
    focus: 'Teacher communication & soft skills',
    benefits: [
      'English fluency for educators',
      'Effective classroom management',
      'Parent-teacher communication mastery'
    ],
    modules: [
      {
        id: 1,
        title: "Spoken English for the Classroom",
        hours: 9,
        objectives: "Improve classroom English fluency, pronunciation, and basic command",
        activities: "Speaking drills, situational dialogues, fluency games",
        outcomes: "Improved everyday classroom communication and teacher confidence"
      },
      {
        id: 2,
        title: "Public Speaking & Presentation Skills",
        hours: 9,
        objectives: "Build effective delivery, stage presence, and clarity for group settings",
        activities: "Presentations, voice modulation exercises, peer feedback",
        outcomes: "Clearer articulation, stronger presence in meetings and events"
      },
      {
        id: 3,
        title: "Inclusive and Stress-Free Classroom Management",
        hours: 9,
        objectives: "Adopt non-punitive strategies to manage diverse student behaviors",
        activities: "Classroom scenarios, role-play, and behavior mapping tools",
        outcomes: "Increased control, calmer classrooms, inclusive engagement"
      },
      {
        id: 4,
        title: "Parent Communication & Feedback Delivery",
        hours: 9,
        objectives: "Develop structured and empathetic communication with parents",
        activities: "Role-play with parent profiles, email templates, video-based practice",
        outcomes: "Improved handling of parent conversations and feedback clarity"
      },
      {
        id: 5,
        title: "Personal Confidence & Influence Building",
        hours: 9,
        objectives: "Strengthen personal presence, emotional control, and professional demeanor",
        activities: "Group reflection, assertiveness exercises, self-assessment journals",
        outcomes: "Higher confidence, better influence in peer and leadership interactions"
      }
    ]
  },
  {
    id: 'mental-health-counseling',
    icon: School,
    name: 'Mental Health and Counseling Training',
    subtitle: 'Wellbeing & Support',
    description: 'Recognizing At-Risk Students. Peer Counseling & First Response Techniques. Faculty as Mentors: Empathy & Active Listening. Creating a Safe Classroom.',
    whatitis: 'Train teachers to support student mental health, provide first response, and create safe, empathetic classrooms.',
    image: '/academy/courseBanner/MentalHealthandCounsellingTraining.png',
    color: '#D5D5D5',
    duration: '12–15 hours',
    mode: ' Offline / Online',
    Coursessimg: '/academy/courseBanner/MentalHealthandCounsellingTraining.png',
    focus: 'Student wellbeing',
    benefits: [
      'Recognize at-risk students',
      'Peer counseling skills',
      'Empathy & active listening',
      'Safe classroom creation'
    ],
    modules: [
  {
    id: 1,
    title: "Identifying At-Risk Students",
    hours: 10,
    objectives: "Recognize early signs of emotional distress using behavioral indicators",
    activities: "Case studies, red flag checklist, observation templates",
    outcomes: "Teachers proactively identify students needing emotional support"
  },
  {
    id: 2,
    title: "Peer Counseling & First Response Skills",
    hours: 8,
    objectives: "Apply basic emotional first-aid and facilitate peer counseling systems",
    activities: "Role-play, response cards, peer network toolkit",
    outcomes: "Teachers provide safe first response and enable peer support"
  },
  {
    id: 3,
    title: "Faculty as Mentors: Empathy & Active Listening",
    hours: 10,
    objectives: "Practice empathy, active listening, and student-centered communication",
    activities: "Listening labs, empathy scenarios, reflection journals",
    outcomes: "Stronger student-teacher trust and meaningful engagement"
  },
  {
    id: 4,
    title: "Creating a Safe Classroom Environment",
    hours: 9,
    objectives: "Design classrooms that reduce anxiety and support emotional wellbeing",
    activities: "Safe space strategies, class charters, anxiety mapping",
    outcomes: "Emotionally secure and inclusive classrooms"
  },
  {
    id: 5,
    title: "Responding and Referring Effectively",
    hours: 8,
    objectives: "Follow school-safe procedures for emotional response and referral",
    activities: "Referral flowcharts, boundary-setting exercises, case simulations",
    outcomes: "Teachers act confidently without overstepping their role"
  }
]
  },
  {
    id: 'domain-specific-certification',
    icon: Briefcase,
    name: 'Domain-Specific Certification Programs',
    subtitle: 'Industry Partnerships',
    description: 'In partnership with industries (AgriTech, EV, EdTech, AI, Biotechnology, etc.).',
    whatitis: 'Certification programs for teachers in collaboration with leading industry partners.',
    image: '/academy/courseBanner/DomainSpecificCertificationPrograms.png',
    color: '#D5D5D5',
    duration: '20–30 hours',
    mode: 'Online / Hybrid',
    Coursessimg: '/academy/courseBanner/DomainSpecificCertificationPrograms.png',
    focus: 'Industry-relevant upskilling',
    benefits: [
      'Industry-recognized certifications',
      'Exposure to latest trends',
      'Collaboration with sector leaders'
    ],
    modules: [
  {
    id: 1,
    title: "Exploring Emerging Industries",
    hours: 8,
    objectives: "Introduce students to future-focused fields like AI, EV, AgriTech, etc.",
    activities: "Industry videos, career maps, expert talk snippets",
    outcomes: "Students gain awareness of modern career options and industries"
  },
  {
    id: 2,
    title: "Fundamentals of Innovation & Technology",
    hours: 10,
    objectives: "Build basic concepts in science, tech, and problem-solving related to key domains",
    activities: "Interactive simulations, digital toolkits, concept challenges",
    outcomes: "Students understand foundational principles across chosen sectors"
  },
  {
    id: 3,
    title: "Hands-On Skill Labs",
    hours: 12,
    objectives: "Apply practical skills through experiments, tinkering, and STEM-based activities",
    activities: "DIY kits, project sheets, guided lab tasks",
    outcomes: "Students build prototypes, experiment, and apply real-world logic"
  },
  {
    id: 4,
    title: "Idea to Prototype: Mini Projects",
    hours: 10,
    objectives: "Develop original ideas and convert them into tangible solutions",
    activities: "Design thinking templates, mentorship checkpoints, peer showcases",
    outcomes: "Students create and present functional or conceptual models"
  },
  {
    id: 5,
    title: "Presentation & Certification Showcase",
    hours: 5,
    objectives: "Communicate learning outcomes and receive certification and feedback",
    activities: "Pitch sessions, digital portfolios, co-branded certificates",
    outcomes: "Students gain confidence, presentation skills, and recognition"
  }
]
  },
  {
    id: 'leadership-career-growth',
    icon: Building2,
    name: 'Leadership and Career Growth',
    subtitle: 'For Academic Leaders',
    description: 'Investing in Rare Minds leadership development programs will equip your school leaders with the skills and knowledge to drive positive change and create a thriving learning environment for your students.',
    whatitis: 'Leadership and professional growth programs for aspiring and current academic leaders.',
    image: '/academy/courseBanner/LeadershipandCareerGrowth.png',
    color: '#D5D5D5',
    duration: '45 hours',
    mode: 'Hybrid',
    Coursessimg: '/academy/courseBanner/LeadershipandCareerGrowth.png',
    focus: 'Leadership development',
    benefits: [
      'Leadership training for HODs/Coordinators',
      'Principal excellence programs',
      'Professional development workshops'
    ],
    modules: [
  {
    id: 1,
    title: "Foundations of School Leadership",
    hours: 10,
    objectives: "Understand leadership styles, school transformation levers, and NEP-driven goals",
    activities: "School leadership case studies, stakeholder mapping, vision setting tools",
    outcomes: "Leaders articulate school vision and align teams to NEP priorities"
  },
  {
    id: 2,
    title: "Academic Planning & Teacher Enablement",
    hours: 10,
    objectives: "Build instructional leadership by planning academic systems and mentoring teachers",
    activities: "Cluster planning sheets, CPD frameworks, mentorship role-plays",
    outcomes: "Leaders improve instructional quality and support teacher growth"
  },
  {
    id: 3,
    title: "Emotional Intelligence & Conflict Management",
    hours: 8,
    objectives: "Strengthen leadership presence, emotional control, and conflict resolution skills",
    activities: "Reflection tools, empathy scenarios, feedback labs",
    outcomes: "Leaders foster trust, reduce friction, and guide teams empathetically"
  },
  {
    id: 4,
    title: "Innovation & Change Management",
    hours: 10,
    objectives: "Drive continuous improvement through school innovation and systemic thinking",
    activities: "Innovation dashboard, change mapping, peer ideation sessions",
    outcomes: "Leaders lead adaptive change and build a culture of experimentation"
  },
  {
    id: 5,
    title: "School Development & Presentation",
    hours: 7,
    objectives: "Create development plans and communicate school transformation stories",
    activities: "School growth plan templates, leadership pitch decks",
    outcomes: "Leaders design structured improvement plans and communicate with clarity"
  }
]
  },
  {
  id: 'institutional-value-added',
  icon: BookOpen,
  name: 'Institutional Value-Added Services',
  subtitle: 'For Teachers & Management',
  description: 'Improve Systems. Inspire Teachers. Build Future-Ready Schools.\n\nWith Rareminds’ institutional value-added services, your school cultivates a high-performing, inclusive, and collaborative culture that supports both teacher excellence and student success.',
  whatitis: 'Value-added services benefiting both teachers and management for institutional growth.',
  image: '/academy/courseBanner/InstitutionalValueAddedServices.png',
  color: '#D5D5D5',
  duration: '10–15 hours',
  mode: 'Offline / Hybrid',
  Coursessimg: '/academy/courseBanner/InstitutionalValueAddedServices.png',
  focus: 'Institutional excellence',
  benefits: [
    'Performance audits',
    'Ranking preparation',
    'Teacher-led clubs',
    'Peer-learning communities',
    'On-demand counselling',
    'Leadership dashboards'
  ],
  modules: [
    {
      id: 1,
      title: "On-Demand Counsellor Services",
      hours: 6,
      objectives: "Provide DEI-aligned counselling support for academic, emotional, and career needs",
      activities: "In-school/online counsellors, referral protocols, wellbeing reports",
      outcomes: "Students receive timely support; schools foster inclusion and emotional safety"
    },
    {
      id: 2,
      title: "External Teacher Performance Audits & Feedback Systems",
      hours: 9,
      objectives: "Use external audit tools to assess and improve instructional quality",
      activities: "Rubric-based evaluations, classroom observation tools, assessor reports",
      outcomes: "Leadership gains actionable insights for professional development"
    },
    {
      id: 3,
      title: "Accreditation & Ranking Readiness",
      hours: 7,
      objectives: "Align school practices with NEP benchmarks and quality standards",
      activities: "Self-assessment grids, compliance trackers, improvement maps",
      outcomes: "Schools improve readiness for NAAC/NIRF-style evaluations"
    },
    {
      id: 4,
      title: "Teacher-Led Innovation Cells",
      hours: 8,
      objectives: "Foster innovation through teacher-driven projects and initiatives",
      activities: "Innovation formats, action research tools, idea banks",
      outcomes: "Teachers actively contribute to school improvement and engagement"
    },
    {
      id: 5,
      title: "Peer-Learning & Mentorship Communities",
      hours: 8,
      objectives: "Build sustainable peer-led systems for reflection and growth",
      activities: "CPD journals, peer learning formats, mentorship logs",
      outcomes: "Teachers share practices, improve morale, and build a growth culture"
    },
    {
      id: 6,
      title: "School Development Tracking & Leadership Dashboards",
      hours: 7,
      objectives: "Equip leadership with tools to monitor, evaluate, and present growth",
      activities: "Dashboard templates, impact reports, data visualization formats",
      outcomes: "Informed, strategic decision-making with measurable outcomes"
    }
  ]
}
];

export const domainSpecificCertificationDetails = {
  title: "What makes Rareminds Domain-Specific Certification Programs different?",
   subtitle: "Schools play a crucial role in inspiring students towards future careers in emerging fields (AgriTech, EV, EdTech, AI, Biotechnology). However, many lack the resources to provide meaningful exposure and skill development in these areas.",
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
  // subtitle: "Mental Health Counseling for Teachers",
  
  intro: [
    "Mental health issues among students are increasing, yet the majority of classrooms lack the capacity to react. Teachers are usually the first adults to observe signs of distress, but they do not have the training to help or refer students. This creates lost intervention opportunities, intensified emotional problems, and unnecessary classroom disruption.",
    "Rareminds' Teachers' Mental Health and Counseling Training is intended to create emotional sensitivity, communication awareness, and first-responding skills for school teachers. Our training helps teachers become more than academic facilitators, yet emotionally sensitive care-takers of students' welfare."
  ],
  standOut: {
    title: "What Makes Rareminds' Program Stand Out?",
    description: "Our training is hands-on, scenario-based, and designed specifically for schools. Teachers are taught to recognize, respond, and refer with confidence — without overstepping professional boundaries or jeopardizing their own safety.",
    assists: [
      {
        title: "Identifying At-Risk Students",
        description: "Train teachers to identify warning signs of mental or emotional distress through easy-to-use observation tools and behavior indicators."
      },
      {
        title: "Peer Counseling & First Response Skills",
        description: "Introduce educators to fundamental counseling skills and response protocols so that they can provide emotional first-aid and facilitate student peer-counselor systems."
      },
      {
        title: "Faculty as Mentors: Empathy & Active Listening",
        description: "Enhance teachers' skill at reaching students through active listening, non-judgmental feedback, and reflective questioning."
      },
      {
        title: "Creating a Safe Classroom",
        description: "Assist educators in creating inclusive, emotionally safe classrooms reducing anxiety, encouraging openness, and fostering increased student trust."
      }
    ]
  },
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
  title: "Communication and Personality Development",
  // subtitle: "Communication and Personality Development for Teachers",
  
  intro: [
    "In today’s dynamic learning environments, academic expertise alone is not enough. The role of a teacher now demands fluency in communication, confidence in handling diverse classrooms, and the ability to engage effectively with parents.",
    "Rareminds’ 21st-century teacher training modules are designed to empower educators with the practical skills and behavioral strategies needed to lead classrooms with clarity, calm, and collaboration."
  ],
  standOut: {
    title: "What Makes Rareminds' Program Different?",
    description: "We equip educators with real-world tools to improve fluency, reduce stress, and foster better stakeholder relationships. Our hands-on workshops and classroom simulations ensure that teachers leave with skills they can implement from the very first day.",
    assists: [
      {
        title: "English Fluency & Public Speaking for Teachers",
        description: "Empowers educators to communicate confidently and fluently in English across classrooms, assemblies, parent interactions, and staff meetings. We cover pronunciation, presentation techniques, and situational speaking, building competence and presence."
      },
      {
        title: "Classroom Management without Stress",
        description: "Introduces stress-free, positive behavior management strategies. Teachers learn how to manage disruptions, build rapport with students, set boundaries, and maintain a calm and authoritative presence without resorting to punitive methods. The training also focuses on understanding newer student profiles and adapting to varied learning styles, enabling more inclusive and responsive classroom environments."
      },
      {
        title: "Parent-Teacher Communication Mastery",
        description: "Strengthens teachers' ability to build productive parent relationships. Modules include handling difficult conversations, setting communication protocols, giving constructive feedback, and maintaining mutual trust."
      }
    ]
  },
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
  subtitle: "Many schools seek to improve teacher performance, foster innovation, and align with NEP goals—but often lack structured, scalable systems that support continuous growth and measurable outcomes.",
  intro: [
        "Our services are designed to benefit both educators and school leadership by strengthening teaching quality, improving school readiness for national benchmarks, and fostering a collaborative, future-ready school culture. These services are modular, easy to implement, and aligned with school improvement frameworks across academic, operational, and psychosocial dimensions."
  ],
whyItMatters: [
  "Provide access to professional, DEI-aligned counsellor support for student wellbeing and career guidance",
  "Establish accountability through structured, external teacher performance audits",
  "Boost preparedness for NEP-aligned quality benchmarks and accreditation",
  "Empower teachers to lead innovation through clubs and action research projects",
  "Build sustainable systems for peer learning, mentoring, and knowledge exchange",
  "Equip school leaders with tools to monitor, track, and showcase growth"
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
  subtitle: "Many schools recognize the critical role of strong leadership (HODs/Coordinators, Principals) in driving school improvement and successfully implementing NEP, but often lack structured development programs for these key personnel.",
  intro: [
    "Our programs help leaders build inclusive cultures, enhance academic planning, support teacher growth, and integrate NEP 2020 reforms meaningfully. Through immersive learning and community engagement, school leaders gain tools to lead with clarity and connection.",
     ],
 whyItMatters: [
  "Drive school-wide transformation through strong, empathetic leadership",
  "Improve faculty engagement, classroom quality, and student outcomes",
  "Build a future-focused school culture with collaborative planning and innovation",
  "Create CPD systems to ensure teacher growth across school clusters"
],

highlights: [
  { icon: 'CalendarCheck', text: '2–3 Day Leadership Retreats tailored for school environments' },
  { icon: 'Briefcase', text: 'Real-world school leadership case studies and stakeholder mapping tools' },
  { icon: 'Users', text: 'CPD workshops for teacher cluster leaders' },
  { icon: 'Heart', text: 'Emotional intelligence, mentorship, and team-building skill modules' },
  { icon: 'BarChart2', text: 'Post-program access to leadership dashboards and development planning templates' }
],

  cta: {
    heading: 'Lead with Vision. Grow with Rareminds.',
    text: "Empower your school’s leaders to inspire, innovate, and achieve lasting success.",
    button: 'Get Started Today'
  }
};

// Meta content configuration for different pages/services
const metaContent = {
  default: {
    title: "Bilingual NEP 2020-Aligned School Programs | Rareminds School Services",
    description: "Bilingual, NEP 2020-aligned school programs that strengthen communication, digital skills, and career paths designed for practical, classroom-ready impact."
  },
  'Teacher Development Programs (TDP)': {
    title: "Teacher Development Programs | NEP Training for Educators | Rareminds",
    description: "Empower educators with NEP-aligned programs in ranking readiness, innovation cells, and peer-learning teacher communities."
  },
  'communication-personality': {
    title: "Communication & Personality Development for Teachers | Rareminds",
    description: "Enhance teacher communication skills, classroom management, and parent engagement with stress-free, practical training programs."
  },
  'mental-health-counseling': {
    title: "Mental Health & Counseling Training for Teachers | Rareminds",
    description: "Train teachers to recognize at-risk students, provide first response support, and create safe, empathetic classroom environments."
  },
  'domain-specific-certification': {
    title: "Industry Certification Programs for Teachers | AgriTech, AI, EV | Rareminds",
    description: "Industry-partnered certification programs in AgriTech, EV, EdTech, AI, and Biotechnology for future-ready teacher training."
  },
  'leadership-career-growth': {
    title: "School Leadership & Career Growth Programs | Principal Training | Rareminds",
    description: "Leadership development programs for academic leaders, HODs, and principals to drive positive change and institutional excellence."
  },
  'institutional-value-added': {
    title: "Institutional Value-Added Services | School Excellence Programs | Rareminds",
    description: "Comprehensive school improvement services including performance audits, ranking preparation, and teacher-led innovation programs."
  }
};

const Courses = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();  // Determine current meta content based on URL or selected service
  const getCurrentMetaContent = () => {
    const path = location.pathname.toLowerCase();
    const searchParams = new URLSearchParams(location.search);
    const courseParam = searchParams.get('course');
    const hash = location.hash.toLowerCase();
    
    // Check URL path for specific course routes
    if (path.includes('/tdp') || path.endsWith('tdp')) {
      return metaContent['Teacher Development Programs (TDP)'];
    }
    
    // Check for course ID in URL path (e.g., /school/teacher/Courses/communication-personality)
    if (path.includes('/courses/communication-personality') || path.includes('communication') || path.includes('personality')) {
      return metaContent['communication-personality'];
    }
    if (path.includes('/courses/mental-health-counseling') || path.includes('mental-health') || path.includes('counseling')) {
      return metaContent['mental-health-counseling'];
    }
    if (path.includes('/courses/domain-specific-certification') || path.includes('domain-specific') || path.includes('certification')) {
      return metaContent['domain-specific-certification'];
    }
    if (path.includes('/courses/leadership-career-growth') || path.includes('leadership') || path.includes('career-growth')) {
      return metaContent['leadership-career-growth'];
    }
    if (path.includes('/courses/institutional-value-added') || path.includes('institutional') || path.includes('value-added')) {
      return metaContent['institutional-value-added'];
    }
    
    // Check URL parameters for course selection
    if (courseParam && courseParam in metaContent) {
      return metaContent[courseParam as keyof typeof metaContent];
    }
    
    // Check route parameters for course ID
    if (params.id && params.id in metaContent) {
      return metaContent[params.id as keyof typeof metaContent];
    }
    
    // Check hash for course selection (e.g., #communication-personality)
    if (hash) {
      const hashCourse = hash.replace('#', '');
      if (hashCourse in metaContent) {
        return metaContent[hashCourse as keyof typeof metaContent];
      }
    }
    
    return metaContent.default;
  };

  const currentMeta = getCurrentMetaContent();
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
    <>
      <Helmet>
        <title>{currentMeta.title}</title>
        <meta
          name="description"
          content={currentMeta.description}
        />
      </Helmet>
      
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
          <div className='w-full flex gap-10 flex-col md:flex-row'>
            <div className="relative w-full md:w-96"> {/* Responsive width for all browsers */}
              <Input 
                type="text"
                placeholder="Search for Coursess..." 
                value={searchQuery}
                onChange={handleSearch}
                className="pr-10 w-full"
                autoComplete="off"
                aria-label="Search for Coursess"
                inputMode="search"
              />
              <button 
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-red-600"
                tabIndex={0}
                aria-label="Submit search"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <Search className="h-4 w-8 md:-mt-8" />
              </button>
            </div>
            <div className="mb-8 text-center w-full md:w-72"> {/* Responsive width for all browsers */}
              <select
                onChange={(e) => toggleFilter(e.target.value)}
                className="px-4 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
                value={activeFilters[0] || ''}
                aria-label="Filter by program"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center gap-16 ">
          {filteredCoursess.map((course, index) => {
            // Removed yOffset and style prop for scroll animation
            return (
              <motion.div
                key={course.id}
                className="cursor-pointer flex justify-center"
                onClick={() => {
                  if (course.id === 'Teacher Development Programs (TDP)') {
                    navigate('/school/teacher/tdp');
                  } else {
                    navigate(`/school/teacher/Courses/${course.id}`);
                  }
                }}
              >
                <Book 
                  depth={10 + (index % 3) * 2} 
                  color={course.color}
                  variant="default"
                  width={340}
                >
                  <div className="p-6 grid gap-4 h-[350px]">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-black text-lg leading-tight">
                        {course.name}
                      </h3>
                      <course.icon className="w-7 h-7 text-black flex-shrink-0" />
                    </div>
                    {/* {course.subtitle && (
                      <p className="text-sm text-white/80 font-medium">
                        {course.subtitle}
                      </p>
                    )} */}

                   <ul className="text-sm text-black h-[150px] overflow-y-auto leading-relaxed list-disc list-outside pl-5 space-y-1">
  {course.benefits.map((point, index) => (
    <li key={index} className="whitespace-normal break-words">
      {point}
    </li>
  ))}
</ul>


                    {/* <p className="text-sm text-white/90 h-[150px] overflow-y-auto leading-relaxed">
                      {course.description}
                    </p> */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm text-black">
                        {course.duration}  {course.mode}
                      </span>
                    </div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 text-sm font-medium text-black mt-1"
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
        </motion.div>      </div>
    </section>
    </>
  );
}

export default Courses;








