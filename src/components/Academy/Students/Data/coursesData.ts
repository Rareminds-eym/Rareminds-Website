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
// //     subtitle: "Old methods fall short. We teach what the future demands. That’s where 3E comes in.",
// //     heroImage: "/academy/courseBanner/The 3E Program_ English, Employability, Entrepreneurship.png",
// //     modules: [
// //       {
// //         title: "English",
// //         description: [
// //           "Build language skills that help you speak up, stand out, and move forward from everyday conversations to professional emails."
// //         ],
// //         image: "/academy/courses/3Eprogram/english.svg"
// //       },
// //       {
// //         title: "Employability",
// //         description: [
// //           "Master 21st-century workplace skills from digital tools and career planning to team communication, job readiness, and financial literacy."
// //         ],
// //         image: "/academy/courses/3Eprogram/Employability.svg"
// //       },
// //       {
// //         title: "Entrepreneurship",
// //         description: [
// //           "Learn how to identify opportunities, build business plans, and pitch ideas to create your own path, even before college."
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
  programHighlights?: string[];
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
   
  },
   {
    id: "Food Processing and Preservation",
    name: "Food Processing and Preservation",
    shortName: "From Farm to Future — Master the Skills of Food Processing",
   description: `Master the science of preserving food and extending its value—from field to shelf. A significant portion of agricultural produce in India is wasted due to lack of knowledge in preservation, poor infrastructure, and limited access to food processing skills. Students—even in agriculture-linked regions—rarely learn the practical science of how to prevent spoilage or build small-scale food businesses from surplus or seasonal crops.\n\nRareminds introduces students to the fundamentals of food processing and preservation through a 40-hour practical course. Covering techniques like dehydration, fermentation, freezing, canning, and quality control, this course builds hands-on skills that students can apply in real-world scenarios. It also connects preservation techniques to entrepreneurship, food safety, and rural employment opportunities.`,
    programHighlights: [
"Agri-Food Basics: Learn why processing matters in a world of growing demand",
  "Preservation Techniques: Thermal, cold, dehydration, fermentation, and new-age methods",
  "Food Safety & Hygiene: Build habits aligned with national and global food standards",
  "Business & Careers: Explore opportunities to grow your own agri-enterprise or join the food industry"
],
   targetGrade: "For Grades 11–12: Skills for Sustainability, Safety, and Self-Reliance",
    subtitle: "Old methods fall short. We teach what the future demands. That’s where 3E comes in.",
    heroImage: "/academy/courseBanner/The 3E Program_ English, Employability, Entrepreneurship.png",
    modules: [
      
    ],
    whyChoose: {
      title: "Why Schools Are Introducing It Now:",
      points: [
        "Aligned with NEP 2020 vocational education goals",
  "Promotes skill-based, experiential learning",
  "Supports sustainability, local entrepreneurship, and food security",
  "Builds student portfolios and confidence for real-world application",
  "No dependency on school kitchen; portable kits and low-cost materials used"
      ],
      image: "/academy/courses/3Eprogram/Employability.svg"
    },
   
  },
   {
    id: "Cloud Kitchen Operations",
    name: "Cloud Kitchen Operations",
    shortName: "From Home to Hustle — Build a Business Without a Dining Room",
    // description: "From Home to Hustle — Build a Business Without a Dining Room",
    description: `Launch food businesses without dining spaces—just smart kitchens and smarter strategies.\n\n Traditional food businesses require large investments in infrastructure, staff, and storefronts. Many aspiring entrepreneurs, especially youth in semi-urban or residential areas, struggle to break into the food industry due to high costs, lack of guidance, and limited access to digital operations know-how. Despite growing demand for delivery, students are not exposed to the backend skills required to manage food businesses built for the app economy.\n\nRareminds offers a hands-on, future-ready course that teaches students how to build, run, and scale a cloud kitchen from home or a small space. With modules on cost-saving operations, compliance, digital order systems, menu planning, and marketing, this program equips students to launch delivery-first food ventures using real-world tools and entrepreneurial thinking.`,
    programHighlights: [
 "Kitchen & Workflow Design: Learn to plan compact, efficient spaces that meet food safety standards",
  "Operations & Budgeting: Build a lean, cost-effective business model",
  "Digital Tools: Use tech platforms to manage orders and customers",
  "Entrepreneurship: Create and pitch your own delivery-first brand"
],
    targetGrade: "For Grades 11–12: Skills to Run a Digital-First Food Venture",
    subtitle: "Old methods fall short. We teach what the future demands. That’s where 3E comes in.",
    heroImage: "/academy/courseBanner/",
    modules: [
      
    ],
    whyChoose: {
      title: "Why Schools Are Introducing It Now",
      points: [
        "Aligned with NEP 2020’s focus on entrepreneurship and digital skills",
  "Prepares students for self-employment in the booming food delivery sector",
  "Focuses on real-world budgeting, compliance, and operational planning",
  "Enhances digital literacy, financial acumen, and teamwork",
  "Hands-on training in digital food entrepreneurship"
],
      image: "/academy/courses/3Eprogram/"
    },
    
  },
   {
    id: "Vocational Training Course on Agri-Rural Entrepreneurship",
    name: "Vocational Training Course on Agri-Rural Entrepreneurship",
    shortName: "Vocational Training Course on Agri-Rural Entrepreneurship",
    // description: "Growing Ideas, Sustaining Futures — Entrepreneurial Skills for the Rural Economy",
    description: `Transform agricultural insight into sustainable rural businesses that create impact. Rural students often grow up close to agriculture but aren’t taught how to see it through the lens of innovation, business, or sustainability. Traditional education doesn't connect farming with entrepreneurship, nor does it equip learners with the tools to turn rural challenges into business opportunities. This disconnect keeps rural youth from creating value-added enterprises in their own communities.\n\nRareminds bridges this gap by training students to build rural enterprises rooted in agriculture, sustainability, and local ecosystems. With modules on agri-business models, market trends, supply chains, risk management, and environmental impact, students learn to build business plans, think strategically, and lead locally. The program ends in a hands-on capstone project that brings their learning to life.`,
    programHighlights: [
      "Agribusiness Foundations: Learn how agriculture connects to markets, pricing, and value chains",
      "Market Insights: Analyze supply-demand trends, cost structures, and consumer patterns",
      "Strategic Planning: Develop actionable business plans and sustainability models",
      "Green Thinking: Evaluate environmental impacts and propose solutions for rural enterprise",
      "Supply Chain & Logistics: Understand how rural products reach urban and export markets",
      "Capstone Experience: Apply all modules in a final group project or business pitch"
    ],
    targetGrade: "For Grades 11–12: Building Agri-Business and Sustainability Mindsets",
    subtitle: "Old methods fall short. We teach what the future demands. That’s where 3E comes in.",
    heroImage: "/academy/courseBanner/",
    modules: [
      
    ],
    whyChoose: {
      title: "Why Schools Are Choosing It Now",
      points: [
        "Aligned with NEP 2020’s vocational education goals",
  "Builds entrepreneurial confidence in rural and semi-urban learners",
  "Develops real-world decision-making and strategy planning skills",
  "Promotes sustainability and environmentally responsible thinking",
  "Hands-on training in digital food entrepreneurship",
  "Culminates in a hands-on capstone project"
      ],
      image: "/academy/courses/3Eprogram/"
    },
    
  }
];

// Detailed Module Definitions
export const Food_Processing_and_Preservation: DetailedModule[] = [
  {
    id: 1,
    title: "Introduction to Agri-Food Processing",
    hours: 4,
    objectives: "Understand what agri-food processing is and its role in the food supply chain",
    activities: "Concept map, history timeline, group discussion",
    outcomes: "Students explain processing types and their impact on food systems"
  },
  {
    id: 2,
    title: "Methods of Food Preservation",
    hours: 10,
    objectives: "Explore traditional and modern preservation techniques",
    activities: "Interactive demos, comparison worksheets, videos",
    outcomes: "Students identify and differentiate preservation techniques"
  },
  {
    id: 3,
    title: "Practical Sessions on Food Preservation",
    hours: 10,
    objectives: "Gain hands-on experience with food preservation methods",
    activities: "Canning, fermentation, dehydration, freezing",
    outcomes: "Students complete basic preservation tasks with safety protocols"
  },
  {
    id: 4,
    title: "Food Safety and Hygiene",
    hours: 6,
    objectives: "Learn food safety principles and hygiene best practices",
    activities: "HACCP case study, hygiene audit checklist, role-plays",
    outcomes: "Students apply hygiene rules and understand food safety certification"
  },
  {
    id: 5,
    title: "Quality Control and Packaging",
    hours: 4,
    objectives: "Understand quality testing and packaging methods",
    activities: "Sample analysis, label design task, packaging demo",
    outcomes: "Students perform basic quality checks and label food products"
  },
  {
    id: 6,
    title: "Business and Career Opportunities",
    hours: 6,
    objectives: "Discover entrepreneurship opportunities in food processing",
    activities: "Business model canvas, product pitch, career path exploration",
    outcomes: "Students build a mini-business plan and identify career options"
  }
];


// Detailed modules for Cloud Kitchen Operations (for use in tables and detailed views)
export const Cloud_Kitchen_Operations: DetailedModule[] = [
  {
    id: 1,
    title: "Introduction to Cloud Kitchens",
    hours: 3,
    objectives: "Understand the cloud kitchen model and its relevance in today’s food industry",
    activities: "Case examples, group discussion",
    outcomes: "Students define cloud kitchen features and benefits"
  },
  {
    id: 2,
    title: "Setting Up a Kitchen Space",
    hours: 4,
    objectives: "Learn layout design, equipment selection, and safety essentials",
    activities: "Space planning exercise, checklist activity",
    outcomes: "Students sketch a compliant kitchen layout"
  },
  {
    id: 3,
    title: "Compliance & Legal Essentials",
    hours: 3,
    objectives: "Identify key permits, zoning rules, and food safety regulations",
    activities: "License mock-up, compliance quiz",
    outcomes: "Students list required approvals and steps"
  },
  {
    id: 4,
    title: "Budgeting and Cost Management",
    hours: 5,
    objectives: "Develop a realistic setup budget with cost-saving strategies",
    activities: "Budget breakdown activity, fixed vs variable cost sort",
    outcomes: "Students prepare a startup cost sheet"
  },
  {
    id: 5,
    title: "Equipment, Inventory & Suppliers",
    hours: 4,
    objectives: "Understand sourcing, stocking, and maintenance essentials",
    activities: "Inventory log demo, supplier negotiation role-play",
    outcomes: "Students create a basic inventory plan and vendor list"
  },
  {
    id: 6,
    title: "Technology in Cloud Kitchens",
    hours: 5,
    objectives: "Use digital tools like POS, KDS, and ordering platforms",
    activities: "Software simulation, order tracker exercise",
    outcomes: "Students manage a mock order system using tech tools"
  },
  {
    id: 7,
    title: "Staffing & Roles",
    hours: 2,
    objectives: "Identify key roles and build team responsibility matrices",
    activities: "Role-mapping, SOP worksheet",
    outcomes: "Students assign staff duties and outline onboarding steps"
  },
  {
    id: 8,
    title: "Menu Planning & Pricing Strategies",
    hours: 4,
    objectives: "Create a delivery-friendly menu and pricing plan",
    activities: "Menu workshop, pricing game",
    outcomes: "Students build a 5-item menu with pricing rationale"
  },
  {
    id: 9,
    title: "Marketing & Branding for Delivery",
    hours: 3,
    objectives: "Promote a food brand online and locally on a budget",
    activities: "Social media calendar, flyer draft",
    outcomes: "Students present a basic marketing strategy"
  },
  {
    id: 10,
    title: "Real-World Application & Simulation",
    hours: 3,
    objectives: "Connect all elements through role-play and scenario-based planning",
    activities: "Mock cloud kitchen setup, feedback loop",
    outcomes: "Students simulate a one-day kitchen operation"
  },
  {
    id: 11,
    title: "Capstone Activity: Business Pitch",
    hours: 4,
    objectives: "Present a full cloud kitchen business plan to peers or mentors",
    activities: "Pitch deck, visual branding, summary budget",
    outcomes: "Students pitch their own startup concept and reflect on learnings"
  }
];


export const Agri_Rural_Entrepreneurship: DetailedModule[] = [
  {
    id: 1,
    title: "Introduction to Agribusiness & Rural Enterprises",
    hours: 3,
    objectives: "Define agribusiness and rural entrepreneurship, understand their role in the economy",
    activities: "Quiz, concept map",
    outcomes: "Students articulate differences between agribusiness and rural enterprises"
  },
  {
    id: 2,
    title: "Agriculture & Business Interplay",
    hours: 3,
    objectives: "Explore connections between agriculture and business value chains",
    activities: "Model mapping, business role-play",
    outcomes: "Students identify agri-business models and their structures"
  },
  {
    id: 3,
    title: "Economics & Market Trends",
    hours: 4,
    objectives: "Analyze market trends, pricing, and supply-demand dynamics",
    activities: "Market trend tracker, economic indicator case studies",
    outcomes: "Students interpret agri-market behavior"
  },
  {
    id: 4,
    title: "Environmental & Social Impact",
    hours: 3,
    objectives: "Evaluate the impact of enterprises on environment and community",
    activities: "Impact mapping, reflection exercise",
    outcomes: "Students propose environmentally conscious practices"
  },
  {
    id: 5,
    title: "Sustainable Agricultural Practices",
    hours: 4,
    objectives: "Learn eco-friendly farming and agri-entrepreneurship approaches",
    activities: "Crop rotation chart, water use audit",
    outcomes: "Students identify sustainable strategies for rural settings"
  },
  {
    id: 6,
    title: "Resource & Risk Management",
    hours: 4,
    objectives: "Manage market risk and plan resource allocation in rural businesses",
    activities: "Case scenarios, decision-matrix planning",
    outcomes: "Students prepare resource/risk strategy sheets"
  },
  {
    id: 7,
    title: "Business Strategy & Planning",
    hours: 4,
    objectives: "Create a rural enterprise plan with clear objectives and tactics",
    activities: "SWOT analysis, business plan template",
    outcomes: "Students design an actionable rural business plan"
  },
  {
    id: 8,
    title: "Supply Chain & Logistics",
    hours: 4,
    objectives: "Understand and optimize rural product distribution",
    activities: "Farm-to-market flowchart, transport planning simulation",
    outcomes: "Students visualize a rural supply chain strategy"
  },
  {
    id: 9,
    title: "Tools for Decision Making",
    hours: 3,
    objectives: "Use tools like cost-benefit analysis and investment scenarios",
    activities: "Role-plays, strategic thinking exercises",
    outcomes: "Students support choices with financial and market reasoning"
  },
  {
    id: 10,
    title: "Green Business & Eco-Enterprise Design",
    hours: 3,
    objectives: "Build environmental considerations into business models and consolidate course learning",
    activities: "Case study breakdown, eco-entrepreneur brainstorm, capstone pitch",
    outcomes: "Students propose an environmentally responsible rural business model"
  }
];


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

// Utility function to get detailed modules for a course
export function getDetailedModulesByCourseId(courseId: string): DetailedModule[] {
  if (courseId === 'spoken-english-bootcamp') return spokenEnglishBootcampDetailedModules;
  if (courseId === '3e-program-bootcamp') return threeEProgramEmployabilityModules;
  if (courseId === 'Vocational Training Course on Agri-Rural Entrepreneurship') return Agri_Rural_Entrepreneurship;
  if (courseId === 'Cloud Kitchen Operations') return Cloud_Kitchen_Operations;
  if (courseId === 'Food Processing and Preservation') return Food_Processing_and_Preservation;
  return [];
}

