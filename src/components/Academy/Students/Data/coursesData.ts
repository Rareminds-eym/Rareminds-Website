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
//         title: "Public Speaking",
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
      {
        title: "Everyday English Fluency",
        description: [
          "Build comfort with day-to-day conversations using role plays and situational dialogues."
        ],
        image: "/academy/courses/3Eprogram/english.svg"
      },
      {
        title: "Stage Confidence Builder",
        description: [
          "Practice speech delivery, body language, and voice modulation for formal settings."
        ],
        image: "/academy/courses/3Eprogram/Employability.svg"
      },
      {
        title: "Debate and Group Discussion Lab",
        description: [
          "Sharpen critical thinking and articulation through guided group discussions and structured debates."
        ],
        image: "/academy/courses/3Eprogram/Employability.svg"
      },
      {
        title: "Expressive Speaking Studio",
        description: [
          "Explore storytelling, poetry recitation, and emotion-driven speech formats."
        ],
        image: "/academy/courses/3Eprogram/Employability.svg"
      },
      {
        title: "Interview and Presentation Prep",
        description: ["Learn how to introduce oneself, answer questions, and present ideas clearly and confidently."],
        image: "/academy/courses/3Eprogram/Employability.svg"
      }
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
    name: "The Career Toolkit",
    shortName: "Career Counselling",
    description: "Help students discover their own calling, not just follow the crowd. Designed for Grades 9–12 students ready to plan their future with purpose. The right choice begins with the right information. Our toolkit guides students through a process of self-discovery and planning. From identifying their ideal stream and learning style to comparing colleges, tracking exams, and finding scholarships, we equip students—and their families—with everything needed to make smart, informed, and confident career decisions.",
    targetGrade: "For Grades 9–12: Career Blueprint Program",
    subtitle2: "Old methods fall short. We teach what the future demands."    ,
    subtexttitle: "That’s where 3E comes in.",
    heroImage: "/academy/courseBanner/Counseling Programs.png",
    modules: [
      {
        title: "Stream Selector",
        description: [
          "Find the academic stream that aligns with their aptitude and interests"
        ],
        image: "/academy/courses/3Eprogram/english.svg"
      },
      {
        title: "Learning Style Profiler",
        description: [
          "Identify how each student learns best—visual, auditory, or hands-on"
        ],
        image: "/academy/courses/3Eprogram/Employability.svg"
      },
      {
        title: "Personality Mapping",
        description: [
          "Understand traits that influence teamwork, leadership, and career fit"
        ],
        image: "/academy/courses/3Eprogram/Entrepreneurship.svg"
      },
      {
        title: "Ideal Career Finder",
        description: [
          "Discover careers that match both mindset and skillset"
        ],
        image: "/academy/courses/3Eprogram/Employability.svg"
      },
      {
        title: "Multiple Intelligence Test",
        description: [
          "Explore abilities beyond academics such as creativity, logic, and more"
        ],
        image: "/academy/courses/3Eprogram/english.svg"
      }
    ],
    clarityMeetsStrategy: {
      title: "Clarity Meets Strategy",
      content: "From discovery to direction. We support every step of the journey. Our planning tools help students compare colleges, prepare for exams, track costs, and explore opportunities—step-by-step."
    },
    whyChoose: {
      title: "Resources include:",
      points: [
        "Top Colleges Database: Search trusted, ranked institutions by course, location, and outcomes",
        "College Compare: Compare colleges side-by-side on key factors",
        "Course Fee Calculator: Estimate tuition and living expenses based on city and college tier",
        "Career Trends Explorer: See which careers are rising and evolving",
        "Entrance Exam Tracker: Stay on top of test dates for CUET, SAT, IELTS, and more",
        "Scholarship Finder: Find scholarships by course, location, or eligibility",
        "Career Deep Dives: In-depth insights into job roles, required skills, top recruiters, and future growth paths"
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
    }
  }
];
