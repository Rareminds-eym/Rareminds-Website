// Import statements should be at the top of the file
import { 
  Clock, 
  Target, 
  BookOpen, 
  TrendingUp,
  Compass,
  Brain,
  Users,
  Lightbulb,
  Building2,  
  GitCompare,
  Calculator,
  Award,
  Search
} from "lucide-react";

// Type definitions for better TypeScript support
export interface DetailedModule {
  id: number;
  title: string;
  hours: number;
  objectives: string;
  activities: string;
  outcomes: string;
}

export interface CourseModule {
  title: string;
  description: string[];
  image: string;
}

export interface CareerCounselingService {
  id: number;
  name: string;
  icon: any; // Using 'any' for Lucide icons
  features: string;
  outcomes: string;
  category: string;
}

export interface Course {
  id: string;
  name: string;
  shortName: string;
  description: string;
  targetGrade: string;
  modules: CourseModule[];
  heroImage?: string;
  subtitle?: string;
  subtitle2?: string;
  subtexttitle?: string;
  heading?: string;
  whyChoose: {
    title: string;
    points: string[];
    image: string;
  };
  pdfUrl?: string;
  showLoginLink?: boolean;
}

// // export interface CourseModule {
// //   title: string;
// //   description: string[];
// //   image: string;
// // }

// // export interface Course {
// //   id: string;
// //   name: string;
// //   shortName: string;
// //   description: string;
// //   targetGrade: string;
// //   modules: CourseModule[];
// //   heroImage?: string;
// //   whyChoose: {
// //     title: string;
// //     points: string[];
// //     image: string;
// //   };
// // }

// // export const coursesData: Course[] = [
  
// //   {
// //     id: "spoken-english-bootcamp",
// //     name: "Spoken English & Public Speaking Bootcamps",
// //     shortName: "Spoken English Bootcamp",
// //     description: "Speak to Lead. Speak with Confidence. Communicate fluently in English in academic and social settings. Deliver confident speeches, presentations, and interviews. Engage in group discussions, debates, and roleplays. Build vocabulary, articulation, and everyday language skills.",
// //     targetGrade: "For Grades 6–12 : Building Communication Confidence",
// //     modules: [
// //       {
// //         title: "Spoken English",
// //         description: [
// //           "Communicate fluently in English in academic and social settings",
// //           "Build vocabulary, articulation, and everyday language skills"
// //         ],
// //         image: "/academy/courses/3Eprogram/english.svg"
// //       },
// //       {
// //         title: "Public Speaking",
// //         description: [
// //           "Deliver confident speeches, presentations, and interviews",
// //           "Engage in group discussions, debates, and roleplays"
// //         ],
// //         image: "/academy/courses/3Eprogram/Employability.svg"
// //       }
// //     ],
// //     whyChoose: {
// //       title: "Why Join the Bootcamp?",
// //       points: [
// //         "Fluency and confidence in real-world English",
// //         "Practical public speaking and presentation skills",
// //         "Interactive, activity-based learning",
// //         "Preparation for academic and career success"
// //       ],
// //       image: "/academy/courses/3Eprogram/Employability.svg"
// //     }
// //   },
// //   {
// //     id: "career-counselling-psychometric",
// //     name: "Career Counselling with Psychometric Assessments",
// //     shortName: "Career Counselling",
// //     description: "Guessing Your Career is Risky. Planning It Isn't. Self-discovery through psychometric testing. Exploring careers in AI, EVs, AgriTech, Humanities, and more. SMART goal-setting and academic planning. Roadmap creation with quarterly mentoring.",
// //     targetGrade: "For Grades 9–12 : Career Blueprint Program",
// //     modules: [
// //       {
// //         title: "Psychometric Assessment",
// //         description: [
// //           "Self-discovery through psychometric testing",
// //           "SMART goal-setting and academic planning"
// //         ],
// //         image: "/academy/courses/3Eprogram/english.svg"
// //       },
// //       {
// //         title: "Career Exploration",
// //         description: [
// //           "Exploring careers in AI, EVs, AgriTech, Humanities, and more",
// //           "Roadmap creation with quarterly mentoring"
// //         ],
// //         image: "/academy/courses/3Eprogram/Employability.svg"
// //       }
// //     ],
// //     whyChoose: {
// //       title: "Why Choose Career Counselling?",
// //       points: [
// //         "Personalized career roadmap",
// //         "Expert mentoring and guidance",
// //         "Covers emerging and traditional career paths",
// //         "Evidence-based, psychometric approach"
// //       ],
// //       image: "/academy/courses/3Eprogram/Employability.svg"
// //     }
// //   },
// //   {
// //     id: "3e-program-bootcamp",
// //     name: "The 3E Program: English, Employability, Entrepreneurship",
// //     shortName: "3E Program Bootcamp",
// //     description: "From Job Seekers to Job Creators. Basic English + writing & comprehension. Resume building, interviews, and digital job portals. Entrepreneurship basics: business planning, marketing, and funding. Financial literacy, digital skills, customer service.",
// //     targetGrade: "For Grades 8–12 : NSDC-aligned program for career readiness",
// //     modules: [
// //       {
// //         title: "English",
// //         description: [
// //           "Basic English + writing & comprehension"
// //         ],
// //         image: "/academy/courses/3Eprogram/english.svg"
// //       },
// //       {
// //         title: "Employability",
// //         description: [
// //           "Resume building, interviews, and digital job portals"
// //         ],
// //         image: "/academy/courses/3Eprogram/Employability.svg"
// //       },
// //       {
// //         title: "Entrepreneurship",
// //         description: [
// //           "Entrepreneurship basics: business planning, marketing, and funding",
// //           "Financial literacy, digital skills, customer service"
// //         ],
// //         image: "/academy/courses/3Eprogram/Entrepreneurship.svg"
// //       }
// //     ],
// //     whyChoose: {
// //       title: "Schools Across India Are Making the Shift. Here’s Why:",
// //       points: [
// //         "Aligned with NEP 2020 and future-readiness goals",
// //         "Backed by research, psychometrics, and industry insights",
// //         "No added burden on school faculty",
// //         "Career-ready portfolios for every student",
// //         "Strengthens career guidance and boosts parent trust"
// //       ],
// //       image: "/academy/courses/3Eprogram/Employability.svg"
// //     }
// //   }
// // ];
export interface CourseModule {
  title: string;
  description: string[];
  image: string;
}

// export interface Course {
//   id: string;
//   name: string;
//   shortName: string;
//   description: string;
//   targetGrade: string;
//   modules: CourseModule[];
//   heroImage?: string;
//   whyChoose: {
//     title: string;
//     points: string[];
//     image: string;
//   };
// }

// export const coursesData: Course[] = [
//   {
//     id: "spoken-english-bootcamp",
//     name: "Spoken English & Public Speaking Bootcamps",
//     shortName: "Spoken English Bootcamp",
//     description: "Speak to Lead. Speak with Confidence. Communicate fluently in English in academic and social settings. Deliver confident speeches, presentations, and interviews. Engage in group discussions, debates, and roleplays. Build vocabulary, articulation, and everyday language skills.",
//     targetGrade: "For Grades 6–12: Building Communication Confidence",
//     modules: [
//       {
//         title: "Spoken English",
//         description: [
//           "Communicate fluently in English in academic and social settings",
//           "Build vocabulary, articulation, and everyday language skills"
//         ],
//         image: "/academy/courses/3Eprogram/english.svg"
//       },
//       {
// //         title: "Public Speaking",
// //         description: [
// //           "Deliver confident speeches, presentations, and interviews",
// //           "Engage in group discussions, debates, and roleplays"
// //         ],
// //         image: "/academy/courses/3Eprogram/Employability.svg"
// //       }
// //     ],
// //     whyChoose: {
// //       title: "Why Join the Bootcamp?",
// //       points: [
// //         "Fluency and confidence in real-world English",
// //         "Practical public speaking and presentation skills",
// //         "Interactive, activity-based learning",
// //         "Preparation for academic and career success"
// //       ],
// //       image: "/academy/courses/3Eprogram/Employability.svg"
// //     }
// //   },
// //   {
// //     id: "career-counselling-psychometric",
// //     name: "Career Counselling with Psychometric Assessments",
// //     shortName: "Career Counselling",
// //     description: "Guessing Your Career is Risky. Planning It Isn't. Self-discovery through psychometric testing. Exploring careers in AI, EVs, AgriTech, Humanities, and more. SMART goal-setting and academic planning. Roadmap creation with quarterly mentoring.",
// //     targetGrade: "For Grades 9–12: Career Blueprint Program",
// //     modules: [
// //       {
// //         title: "Psychometric Assessment",
// //         description: [
// //           "Self-discovery through psychometric testing",
// //           "SMART goal-setting and academic planning"
// //         ],
// //         image: "/academy/courses/3Eprogram/english.svg"
// //       },
// //       {
// //         title: "Career Exploration",
// //         description: [
// //           "Exploring careers in AI, EVs, AgriTech, Humanities, and more",
// //           "Roadmap creation with quarterly mentoring"
// //         ],
// //         image: "/academy/courses/3Eprogram/Employability.svg"
// //       }
// //     ],
// //     whyChoose: {
// //       title: "Why Choose Career Counselling?",
// //       points: [
// //         "Personalized career roadmap",
// //         "Expert mentoring and guidance",
// //         "Covers emerging and traditional career paths",
// //         "Evidence-based, psychometric approach"
// //       ],
// //       image: "/academy/courses/3Eprogram/Employability.svg"
// //     }
// //   },
// //   {
// //     id: "3e-program-bootcamp",
// //     name: "The 3E Program: English, Employability, Entrepreneurship",
// //     shortName: "3E Program Bootcamp",
// //     description: "Don’t Step into the Future Unprepared. Ignite the 3E Program.",
// //     targetGrade: "For Grades 8–12: Building Confidence, Clarity, and Career Readiness",
// //     modules: [
// //       {
// //         title: "English",
// //         description: [
// //           "Basic English + writing & comprehension"
// //         ],
// //         image: "/academy/courses/3Eprogram/english.svg"
// //       },
// //       {
// //         title: "Employability",
// //         description: [
// //           "Resume building, interviews, and digital job portals"
// //         ],
// //         image: "/academy/courses/3Eprogram/Employability.svg"
// //       },
// //       {
// //         title: "Entrepreneurship",
// //         description: [
// //           "Entrepreneurship basics: business planning, marketing, and funding",
// //           "Financial literacy, digital skills, customer service"
// //         ],
// //         image: "/academy/courses/3Eprogram/Entrepreneurship.svg"
// //       }
// //     ],
// //     whyChoose: {
// //       title: "Schools Across India Are Making the Shift. Here’s Why:",
// //       points: [
// //         "Aligned with NEP 2020 and future-readiness goals",
// //         "Backed by research, psychometrics, and industry insights",
// //         "No added burden on school faculty",
// //         "Career-ready portfolios for every student",
// //         "Strengthens career guidance and boosts parent trust"
// //       ],
// //       image: "/academy/courses/3Eprogram/Employability.svg"
// //     }
// //   }
// // ];
// export interface CourseModule {
//   title: string;
//   description: string[];
//   image: string;
// }

export interface Course {
  id: string;
  name: string;
  shortName: string;
  heading?: string;
  description: string;
  targetGrade: string;
  subtitle2?: string;
  subtitle?: string;
  subtexttitle?: string;
  modules: CourseModule[];
  heroImage?: string;
  whyChoose: {
    title: string;
    points: string[];
    image: string;
  };
  clarityMeetsStrategy?: {
    title: string;
    content: string;
  };
  pdfUrl?: string;
  showLoginLink?: boolean;
  showTitleSpan?: boolean;
}

export const coursesData: Course[] = [
  {
    id: "spoken-english-bootcamp",
    name: "Spoken English & Public Speaking Bootcamps",
    shortName: "Spoken English Bootcamp",
    description: "English is more than grammar—it’s your voice to the world. Confidence grows when students learn to speak, not just write. Our bootcamps transform hesitation into fluent, fearless expression.\n\nCommunication is a life skill, not just a classroom requirement. This program helps students become clear, confident, and compelling speakers—whether in the classroom, on stage, or in real life. Our structured bootcamps combine language fluency with presentation skills and interactive speaking practice, helping students overcome fear and express themselves effectively in any situation.",
    targetGrade: "For Grades 6–12: Building Communication Confidence",
    heroImage: "/academy/courseBanner/SpokenEnglish&PublicSpeakingBootcamps.png",
    showTitleSpan: true,
    modules: [
      // {
      //   title: "Everyday English Fluency",
      //   description: [
      //     "Build comfort with day-to-day conversations using role plays and situational dialogues."
      //   ],
      //   image: "/academy/courses/3Eprogram/english.svg"
      // },
      // {
      //   title: "Stage Confidence Builder",
      //   description: [
      //     "Practice speech delivery, body language, and voice modulation for formal settings."
      //   ],
      //   image: "/academy/courses/3Eprogram/Employability.svg"
      // },
      // {
      //   title: "Debate and Group Discussion Lab",
      //   description: [
      //     "Sharpen critical thinking and articulation through guided group discussions and structured debates."
      //   ],
      //   image: "/academy/courses/3Eprogram/Employability.svg"
      // },
      // {
      //   title: "Expressive Speaking Studio",
      //   description: [
      //     "Explore storytelling, poetry recitation, and emotion-driven speech formats."
      //   ],
      //   image: "/academy/courses/3Eprogram/Employability.svg"
      // },
      // {
      //   title: "Interview and Presentation Prep",
      //   description: ["Learn how to introduce oneself, answer questions, and present ideas clearly and confidently."],
      //   image: "/academy/courses/3Eprogram/Employability.svg"
      // }
    ],
    whyChoose: {
      title: "Why is Rareminds’ Program Effective?",
      points: [
        "Expert-Designed Curriculum: Built by educators and communication specialists with real classroom experience.",
        "Bilingual Delivery: English instruction supported with regional languages for better clarity and comfort.",
        "Tailored for All Tiers: Equally effective in metro schools and tier 2–3 classrooms.",
        "Confidence-First Approach: Focus on helping students overcome stage fear and speak with clarity.",
        "Future-Ready Skills: Training aligned with real-world communication needs—not just textbook grammar."
      ],
      image: "/academy/courses/3Eprogram/Employability.svg"
    }
  },
  {
    id: "career-counselling-psychometric",  
      name: "The Career Toolkit",    shortName: "Career Counselling",    heading: "Rareminds Career Toolkit – Service Overview (For Grades 9–12)",
    description: "",
    targetGrade: "",
    subtitle2: "Old methods fall short. We teach what the future demands."    ,
    subtexttitle: "That’s where 3E comes in.",
    heroImage: "/academy/courseBanner/Counseling Programs.png",
    modules: [
      
    ],
    clarityMeetsStrategy: {
      title: "",
      content: ""
    },    whyChoose: {
      title: "Smart Career Discovery",
      points: [
        "Help students discover who they are before deciding where they're going.",
        "Turn confusion into clear choices",
        "Align strengths with real opportunities",
        "Build confidence to decide",
        "Involve families in the journey",
        "Back every step with data",
      ],
      image: "/academy/courses/3Eprogram/Employability.svg"
    },
    showLoginLink: true
  },
  {
    id: "3e-program-bootcamp",
    name: "The 3E Program: English, Employability, Entrepreneurship",
    shortName: "3E Program Bootcamp",
    description: "Don’t Step into the Future Unprepared. Ignite the 3E Program.",
    targetGrade: "For Grades 8–12: Building Confidence, Clarity, and Career Readiness",
    subtitle: "Old methods fall short. We teach what the future demands. That’s where 3E comes in.",
    heroImage: "/academy/courseBanner/The 3E Program_ English, Employability, Entrepreneurship.png",
    modules: [
      {
        title: "English",
        description: [
          "Build language skills that help you speak up, stand out, and move forward from everyday conversations to professional emails."
        ],
        image: "/academy/courses/3Eprogram/english.svg"
      },
      {
        title: "Employability",
        description: [
          "Master 21st-century workplace skills from digital tools and career planning to team communication, job readiness, and financial literacy."
        ],
        image: "/academy/courses/3Eprogram/Employability.svg"
      },
      {
        title: "Entrepreneurship",
        description: [
          "Learn how to identify opportunities, build business plans, and pitch ideas to create your own path, even before college."
        ],
        image: "/academy/courses/3Eprogram/Entrepreneurship.svg"
      }
    ],
    whyChoose: {
      title: "Schools Across India Are Making the Shift. Here’s Why:",
      points: [
        "Aligned with NEP 2020 and future-readiness goals",
        "Backed by research, psychometrics, and industry insights",
        "No added burden on school faculty",
        "Career-ready portfolios for every student",
        "Strengthens career guidance and boosts parent trust"
      ],
      image: "/academy/courses/3Eprogram/Employability.svg"
    },
   
  }
];

// Detailed Module Definitions
export const spokenEnglishBootcampDetailedModules: DetailedModule[] = [
  {
    id: 1,
    title: "Fluent Communication Core",
    hours: 10,
    objectives: "Develop confidence in everyday English conversation",
    activities: "Paired practice sessions, speech drills, daily language tasks",
    outcomes: "Students communicate daily needs/ideas with reduced hesitation"
  },
  {
    id: 2,
    title: "Public Speaking Fundamentals",
    hours: 9,
    objectives: "Master basic speech delivery with clarity and confidence",
    activities: "Short speeches, impromptu talks, vocal practice",
    outcomes: "Students deliver 3-minute speeches with proper posture and voice"
  },
  {
    id: 3,
    title: "Debate & Group Discussion Lab",
    hours: 9,
    objectives: "Train students to organize thoughts and express opinions respectfully in groups",
    activities: "Moderated discussions, debate rounds, structured formats",
    outcomes: "Students engage in collaborative speaking with critical thinking and respect"
  },
  {
    id: 4,
    title: "Expressive Speaking Studio",
    hours: 8,
    objectives: "Encourage students to use emotion and storytelling in spoken formats",
    activities: "Storytelling sessions, poetry recitation, expressive speech exercises",
    outcomes: "Students improve expressive power, tone control, and creative speaking"
  },
  {
    id: 5,
    title: "Interview & Presentation Prep",
    hours: 9,
    objectives: "Prepare students for self-introduction, Q&A, and idea presentation tasks",
    activities: "Mock interviews, classroom pitch practice, visual aid use",
    outcomes: "Students confidently introduce themselves and deliver structured presentations"
  }
];

// New detailed module structure for 3E Program Employability Skills
export const threeEProgramEmployabilityModules: DetailedModule[] = [
  {
    id: 1,
    title: "Introduction to Employability Skills",
    hours: 2,
    objectives: "Understand the value of employability skills and explore skill/job platforms",
    activities: "Portal exploration, skill-mapping worksheet",
    outcomes: "Students navigate job portals and identify skill-industry links"
  },
  {
    id: 2,
    title: "Constitutional Values – Citizenship",
    hours: 2,
    objectives: "Recognize civic duties, personal values, and sustainability practices",
    activities: "Group discussions, case-based scenarios",
    outcomes: "Students demonstrate responsible citizenship and environmental awareness"
  },
  {
    id: 3,
    title: "Becoming a Professional in the 21st Century",
    hours: 4,
    objectives: "Identify key 21st-century workplace skills and lifelong learning mindsets",
    activities: "Self-assessment tools, future-readiness quiz",
    outcomes: "Students outline personal learning goals and workplace behaviors"
  },
  {
    id: 4,
    title: "Basic English Skills",
    hours: 6,
    objectives: "Improve grammar, reading, and spoken English for workplace interaction",
    activities: "Role-play, reading aloud, written tasks",
    outcomes: "Students communicate using basic English in formal/informal settings"
  },
  {
    id: 5,
    title: "Career Development & Goal Setting",
    hours: 3,
    objectives: "Set short- and long-term career goals with a plan",
    activities: "Goal-mapping chart, vision board",
    outcomes: "Students build a career roadmap with defined steps"
  },
  {
    id: 6,
    title: "Communication Skills",
    hours: 5,
    objectives: "Develop verbal, nonverbal, and team communication etiquette",
    activities: "Listening tasks, team role-plays",
    outcomes: "Students apply effective communication in teamwork and writing"
  },
  {
    id: 7,
    title: "Diversity & Inclusion",
    hours: 3,
    objectives: "Respect workplace diversity and understand inclusion and safety laws",
    activities: "Scenario cards, discussion on POSH Act",
    outcomes: "Students respond appropriately to diversity and gender situations"
  },
  {
    id: 8,
    title: "Financial and Legal Literacy",
    hours: 4,
    objectives: "Manage personal finance and understand salary components and legal rights",
    activities: "Budgeting exercise, digital safety demo",
    outcomes: "Students create a simple budget and understand financial choices"
  },
  {
    id: 9,
    title: "Essential Digital Skills",
    hours: 5,
    objectives: "Use digital devices, apps, and tools securely and responsibly",
    activities: "Email tasks, spreadsheet exercises, cybersecurity quiz",
    outcomes: "Students create basic docs and navigate digital platforms safely"
  },
  {
    id: 10,
    title: "Entrepreneurship",
    hours: 4,
    objectives: "Learn how to plan a business and explore funding options",
    activities: "Business model canvas, elevator pitch",
    outcomes: "Students design a basic business idea and explore marketing/funding"
  },
  {
    id: 11,
    title: "Customer Service",
    hours: 3,
    objectives: "Respond to customer needs and gather feedback effectively",
    activities: "Role-plays, hygiene checklist, feedback forms",
    outcomes: "Students practice service behavior and communication"
  },
  {
    id: 12,
    title: "Getting Ready for Apprenticeship & Jobs",
    hours: 4,
    objectives: "Build a CV, prepare for interviews, and apply for jobs/apprenticeships",
    activities: "Mock interviews, job portal demos",
    outcomes: "Students complete job applications and participate in interview practice"
  }
];

// Career counselling psychometric services data
export const careerCounselingServices: CareerCounselingService[] = [
  {
    id: 1,
    name: "Stream Selector",
    icon: Compass,
    features: "Matches students with suitable academic streams based on aptitude and interest",
    outcomes: "Reduces confusion and helps students make confident academic choices",
    category: "Discovery"
  },
  {
    id: 2,
    name: "Learning Style Profiler",
    icon: Brain,
    features: "Identifies if a student learns best visually, auditorily, or kinesthetically",
    outcomes: "Enables smarter study strategies and course alignment",
    category: "Discovery"
  },
  {
    id: 3,
    name: "Personality Mapping",
    icon: Users,
    features: "Maps traits like leadership, introversion, teamwork, etc.",
    outcomes: "Helps match personal style to career environments",
    category: "Discovery"
  },
  {
    id: 4,
    name: "Ideal Career Finder",
    icon: Target,
    features: "Suggests suitable careers based on interest, personality, and skill",
    outcomes: "Personalizes career exploration beyond generic options",
    category: "Discovery"
  },
  {
    id: 5,
    name: "Multiple Intelligence Test",
    icon: Lightbulb,
    features: "Identifies strengths beyond academics (logic, art, music, body, etc.)",
    outcomes: "Builds self-awareness and validates non-traditional talents",
    category: "Discovery"
  },
  {
    id: 6,
    name: "Top Colleges Database",
    icon: Building2,
    features: "Access a ranked database of colleges by stream, location, and outcomes",
    outcomes: "Saves time and enables smart, criteria-based decision-making",
    category: "Planning"
  },
  {
    id: 7,
    name: "College Compare",
    icon: GitCompare,
    features: "Compare multiple colleges on costs, rankings, location, etc.",
    outcomes: "Empowers students to evaluate options side-by-side",
    category: "Planning"
  },
  {
    id: 8,
    name: "Course Fee Calculator",
    icon: Calculator,
    features: "Estimate tuition and living expenses by city or college type",
    outcomes: "Supports financial planning with transparency",
    category: "Planning"
  },
  {
    id: 9,
    name: "Career Trends Explorer",
    icon: TrendingUp,
    features: "Explore in-demand jobs, skills, and future industry outlooks",
    outcomes: "Aligns student choices with evolving career landscapes",
    category: "Research"
  },
  {
    id: 10,
    name: "Entrance Exam Tracker",
    icon: BookOpen,
    features: "Track key exams like CUET, SAT, IELTS, etc.",
    outcomes: "Keeps students and parents organized and informed",
    category: "Planning"
  },
  {
    id: 11,
    name: "Scholarship Finder",
    icon: Award,
    features: "Filter scholarships based on course, location, merit, or need",
    outcomes: "Increases access to funding and reduces financial stress",
    category: "Research"
  },
  {
    id: 12,
    name: "Career Deep Dives",
    icon: Search,
    features: "Detailed profiles of roles, recruiters, skills, and salary trends",
    outcomes: "Equips students with real-world knowledge to make informed career decisions",
    category: "Research"
  }
];
