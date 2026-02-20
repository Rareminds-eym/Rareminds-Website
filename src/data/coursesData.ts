// Course data for all services
export interface Module {
  id: number;
  title: string;
  duration: string;
  topics: string[];
}

export interface Instructor {
  id: number;
  name: string;
  title: string;
  photo: string;
  bio: string;
}

export interface Course {
  id: number;
  slug: string;
  name: string;
  duration: string;
  level: string;
  mode: 'Online' | 'Offline' | 'Hybrid'; // Delivery mode
  price: number; // Course price
  currency: string; // Currency (e.g., 'INR', 'USD')
  category: 'service' | 'course'; // Database schema: distinguishes service types from individual courses
  serviceType: string; // Service type this course belongs to (e.g., 'full-semester', 'pre-placement')
  courseCategory: string; // Meaningful category (e.g., Manufacturing, Healthcare, Technology)
  description: string;
  overview: string;
  heroBannerImage?: string; // Hero banner image URL
  programBenefits: string[]; // Program benefits for all courses
  whatYouLearn: string[];
  whoShouldTake: string[];
  outcomes: string[];
  curriculum?: Module[]; // Course curriculum modules
  instructors?: Instructor[]; // Course instructors
  brochureUrl?: string; // Brochure download URL
}

// All courses organized by service type
export const coursesByService: Record<string, Course[]> = {
  'full-semester': [
    {
      id: 1,
      slug: 'good-manufacturing-practices-quality-assurance',
      name: 'Good Manufacturing Practices & Quality Assurance',
      duration: '40 hours',
      level: 'Intermediate',
      mode: 'Hybrid',
      price: 15000,
      currency: 'INR',
      category: 'course',
      serviceType: 'full-semester',
      courseCategory: 'Manufacturing',
      description: 'Master industry-standard manufacturing practices and quality control systems essential for pharmaceutical, food, and manufacturing industries.',
      overview: 'This comprehensive course covers Good Manufacturing Practices (GMP) and Quality Assurance principles that are critical in regulated industries. Students will learn about standard operating procedures, quality control, compliance requirements, and safety protocols.',
      heroBannerImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200',
      programBenefits: [
        'Industry-aligned curriculum',
        'Hands-on projects',
        'Internship opportunities',
        'Professional certification',
        'Placement assistance'
      ],
      whatYouLearn: [
        'GMP (Good Manufacturing Practices) principles',
        'SOPs (Standard Operating Procedures) development',
        'QA/QC (Quality Assurance/Quality Control) systems',
        'Compliance and documentation practices',
        'Pharmaceutical and food safety standards'
      ],
      whoShouldTake: [
        'Life Sciences students - FSSAI & lab hygiene focus',
        'Chemistry students - Pharmaceutical focus',
        'Commerce students - Audit & compliance focus',
        'Faculty - Integrating GMP compliance in lab-based teaching'
      ],
      outcomes: [
        'QA Analyst',
        'QC Executive',
        'GMP Associate',
        'Compliance Officer'
      ],
      curriculum: [
        {
          id: 1,
          title: 'Introduction to GMP',
          duration: '1 week',
          topics: [
            'History and evolution of GMP',
            'Regulatory framework',
            'GMP principles and guidelines',
            'Industry standards overview'
          ]
        },
        {
          id: 2,
          title: 'Quality Management Systems',
          duration: '2 weeks',
          topics: [
            'QMS fundamentals',
            'Documentation and record keeping',
            'Quality control procedures',
            'Audit and inspection preparation'
          ]
        },
        {
          id: 3,
          title: 'SOPs and Compliance',
          duration: '2 weeks',
          topics: [
            'Writing effective SOPs',
            'Compliance requirements',
            'Risk management',
            'Corrective and preventive actions'
          ]
        },
        {
          id: 4,
          title: 'Practical Applications',
          duration: '3 weeks',
          topics: [
            'Case studies',
            'Industry visits',
            'Hands-on lab sessions',
            'Final project and assessment'
          ]
        }
      ],
      instructors: [
        {
          id: 1,
          name: 'Dr. Rajesh Kumar',
          title: 'Quality Assurance Expert',
          photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
          bio: '15+ years in pharmaceutical QA with expertise in GMP compliance'
        },
        {
          id: 2,
          name: 'Priya Sharma',
          title: 'Manufacturing Specialist',
          photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
          bio: 'Former QC Manager at leading pharmaceutical company'
        }
      ],
      brochureUrl: '/brochures/gmp-qa-course.pdf'
    },
    {
      id: 2,
      slug: 'medical-coding-health-information-management',
      name: 'Medical Coding & Health Information Management',
      duration: '45 hours',
      level: 'Intermediate',
      mode: 'Online',
      price: 18000,
      currency: 'INR',
      category: 'course',
      serviceType: 'full-semester',
      courseCategory: 'Healthcare',
      description: 'Learn medical coding systems (CPT, ICD, HCPCS) and health information management for healthcare industry careers.',
      overview: 'This course provides comprehensive training in medical coding and health information management. Students will master CPT, ICD-10, and HCPCS coding systems, medical documentation, and prepare for CPC certification.',
      heroBannerImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200',
      programBenefits: [
        'Industry-aligned curriculum',
        'Hands-on projects',
        'Internship opportunities',
        'Professional certification',
        'Placement assistance'
      ],
      whatYouLearn: [
        'CPT (Current Procedural Terminology) coding',
        'ICD (International Classification of Diseases) coding',
        'HCPCS (Healthcare Common Procedure Coding System)',
        'Medical documentation and health records management',
        'CPC (Certified Professional Coder) preparation'
      ],
      whoShouldTake: [
        'Life Sciences students - Anatomy & physiology focus',
        'Commerce students - Claims processing focus',
        'IT students - Health data systems focus',
        'Faculty - Teaching using clinical records and coding exercises'
      ],
      outcomes: [
        'Medical Coder',
        'Health Records Analyst',
        'CPC Professional'
      ],
      curriculum: [
        {
          id: 1,
          title: 'Medical Terminology & Anatomy',
          duration: '2 weeks',
          topics: [
            'Medical terminology basics',
            'Human anatomy overview',
            'Disease classification',
            'Healthcare documentation'
          ]
        },
        {
          id: 2,
          title: 'ICD-10 Coding',
          duration: '3 weeks',
          topics: [
            'ICD-10 structure and guidelines',
            'Diagnosis coding',
            'Procedure coding',
            'Practice exercises'
          ]
        },
        {
          id: 3,
          title: 'CPT & HCPCS Coding',
          duration: '3 weeks',
          topics: [
            'CPT coding fundamentals',
            'HCPCS Level II codes',
            'Modifiers and guidelines',
            'Real-world case studies'
          ]
        },
        {
          id: 4,
          title: 'CPC Exam Preparation',
          duration: '2 weeks',
          topics: [
            'Exam format and strategy',
            'Practice tests',
            'Mock examinations',
            'Final assessment'
          ]
        }
      ],
      instructors: [
        {
          id: 1,
          name: 'Dr. Anita Desai',
          title: 'Certified Medical Coder (CPC)',
          photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400',
          bio: 'AAPC certified with 10+ years in medical coding and training'
        }
      ],
      brochureUrl: '/brochures/medical-coding-course.pdf'
    },
    {
      id: 3,
      slug: 'food-safety-organic-production',
      name: 'Food Safety & Organic Production',
      duration: '35 hours',
      level: 'Beginner',
      mode: 'Hybrid',
      price: 12000,
      currency: 'INR',
      category: 'course',
      serviceType: 'full-semester',
      courseCategory: 'Food & Agriculture',
      description: 'Understand food safety standards, FSSAI regulations, HACCP principles, and organic farming certification processes.',
      overview: 'This course covers essential food safety standards and organic production methods. Students will learn FSSAI regulations, HACCP principles, organic certification processes, and sustainable food systems.',
      heroBannerImage: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200',
      programBenefits: [
        'Industry-aligned curriculum',
        'Hands-on projects',
        'Internship opportunities',
        'Professional certification',
        'Placement assistance'
      ],
      whatYouLearn: [
        'FSSAI (Food Safety and Standards Authority of India) regulations',
        'HACCP (Hazard Analysis Critical Control Points) principles',
        'Organic certification processes and standards'
      ],
      whoShouldTake: [
        'Life Sciences students - Food microbiology focus',
        'Agriculture students - Organic farming focus',
        'Commerce students - Organic product marketing focus',
        'Faculty - Teaching sustainable food systems and certification standards'
      ],
      outcomes: [
        'Food Safety Officer',
        'Organic Certification Assistant',
        'QA Analyst'
      ]
    },
    {
      id: 4,
      slug: 'basic-advanced-computer-applications',
      name: 'Basic & Advanced Computer Applications',
      duration: '50 hours',
      level: 'All Levels',
      mode: 'Online',
      price: 10000,
      currency: 'INR',
      category: 'course',
      serviceType: 'full-semester',
      courseCategory: 'Technology',
      description: 'Master MS Office Suite, Google Workspace, and productivity tools from basics to advanced level.',
      overview: 'This comprehensive course takes students from basic to advanced computer applications. Learn MS Office (Word, Excel, PowerPoint), Google Suite, data management, and productivity tools essential for any career.',
      heroBannerImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200',
      programBenefits: [
        'Industry-aligned curriculum',
        'Hands-on projects',
        'Internship opportunities',
        'Professional certification',
        'Placement assistance'
      ],
      whatYouLearn: [
        'MS Excel - Formulas, pivot tables, data analysis, dashboards',
        'Google Suite - Docs, Sheets, Slides, Drive',
        'Dashboard creation and data visualization'
      ],
      whoShouldTake: [
        'Science students - Lab data logs and management',
        'Commerce students - Financial automation',
        'Arts students - Document design',
        'Faculty - Use of tools for teaching and student assessment'
      ],
      outcomes: [
        'Data Entry Operator',
        'MIS Executive',
        'Office Assistant'
      ]
    },
    {
      id: 5,
      slug: 'professional-communication-workplace-readiness',
      name: 'Professional Communication & Workplace Readiness',
      duration: '40 hours',
      level: 'Beginner',
      mode: 'Hybrid',
      price: 11000,
      currency: 'INR',
      category: 'course',
      serviceType: 'full-semester',
      courseCategory: 'Professional Skills',
      description: 'Develop effective communication skills, email etiquette, presentation abilities, and workplace professionalism.',
      overview: 'This course focuses on building essential communication and workplace readiness skills. Students will learn professional communication, email etiquette, presentation skills, group discussions, and workplace behavior.',
      heroBannerImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200',
      programBenefits: [
        'Industry-aligned curriculum',
        'Hands-on projects',
        'Internship opportunities',
        'Professional certification',
        'Placement assistance'
      ],
      whatYouLearn: [
        'Email etiquette and professional writing',
        'GD (Group Discussion) techniques',
        'Presentation skills and public speaking'
      ],
      whoShouldTake: [
        'MBA/Commerce students - Business communication focus',
        'Science students - Technical reports focus',
        'Arts students - Expressive writing focus',
        'Faculty - Enhancing classroom communication & mentoring'
      ],
      outcomes: [
        'Customer Support',
        'Corporate Trainee',
        'Admin Assistant'
      ]
    },
    {
      id: 6,
      slug: 'ai-data-analytics-beginners',
      name: 'AI & Data Analytics for Beginners',
      duration: '45 hours',
      level: 'Beginner',
      mode: 'Online',
      price: 16000,
      currency: 'INR',
      category: 'course',
      serviceType: 'full-semester',
      courseCategory: 'Data Science',
      description: 'Introduction to artificial intelligence, data analytics, Python basics, and data visualization tools.',
      overview: 'This beginner-friendly course introduces students to AI and data analytics. Learn Python programming basics, data visualization with Tableau, and fundamental concepts of artificial intelligence and machine learning.',
      heroBannerImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
      programBenefits: [
        'Industry-aligned curriculum',
        'Hands-on projects',
        'Internship opportunities',
        'Professional certification',
        'Placement assistance'
      ],
      whatYouLearn: [
        'Python programming fundamentals',
        'Tableau for data visualization',
        'Data visualization techniques and best practices'
      ],
      whoShouldTake: [
        'Science students - Research data analysis',
        'Commerce students - Sales analytics',
        'MBA students - Market insights',
        'Faculty - Embedding analytics tools in course delivery'
      ],
      outcomes: [
        'Data Analyst',
        'BI Executive',
        'Junior Data Scientist'
      ]
    },
    {
      id: 7,
      slug: 'digital-marketing-social-media-strategy',
      name: 'Digital Marketing & Social Media Strategy',
      duration: '40 hours',
      level: 'Intermediate',
      mode: 'Online',
      price: 14000,
      currency: 'INR',
      category: 'course',
      serviceType: 'full-semester',
      courseCategory: 'Marketing',
      description: 'Master digital marketing techniques, SEO, SEM, social media management, and campaign analytics.',
      overview: 'This course covers comprehensive digital marketing strategies including SEO, SEM, social media marketing, content creation, branding, and campaign analysis. Students will learn to create and manage effective digital marketing campaigns.',
      heroBannerImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
      programBenefits: [
        'Industry-aligned curriculum',
        'Hands-on projects',
        'Internship opportunities',
        'Professional certification',
        'Placement assistance'
      ],
      whatYouLearn: [
        'SEO (Search Engine Optimization) fundamentals',
        'SEM (Search Engine Marketing) and Google Ads',
        'Branding and online reputation management',
        'Campaign analysis and ROI measurement'
      ],
      whoShouldTake: [
        'Arts students - Content creation focus',
        'Commerce students - ROI & ads focus',
        'MBA students - Full-funnel marketing',
        'Faculty - Curriculum integration with digital tools & trends'
      ],
      outcomes: [
        'Digital Marketing Executive',
        'SEO Analyst',
        'Social Media Coordinator'
      ]
    },
    {
      id: 8,
      slug: 'interview-aptitude-bootcamp',
      name: 'Interview & Aptitude Bootcamp',
      duration: '30 hours',
      level: 'All Levels',
      mode: 'Hybrid',
      price: 9000,
      currency: 'INR',
      category: 'course',
      serviceType: 'full-semester',
      courseCategory: 'Career Development',
      description: 'Intensive preparation for job interviews, aptitude tests, logical reasoning, and placement readiness.',
      overview: 'This intensive bootcamp prepares students for job interviews and aptitude tests. Covers logical reasoning, quantitative aptitude, verbal ability, mock interviews, resume building, and placement preparation.',
      heroBannerImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200',
      programBenefits: [
        'Industry-aligned curriculum',
        'Hands-on projects',
        'Internship opportunities',
        'Professional certification',
        'Placement assistance'
      ],
      whatYouLearn: [
        'Logical reasoning and problem-solving',
        'Aptitude tests - Quantitative and verbal ability',
        'Mock interviews and feedback sessions'
      ],
      whoShouldTake: [
        'All Streams students - Tailored aptitude and interview prep',
        'Faculty - Supporting resume building and mock interviews'
      ],
      outcomes: [
        'Job-ready candidates',
        'Placement-ready profiles'
      ]
    },
    {
      id: 9,
      slug: 'ict-digital-pedagogy-teaching',
      name: 'ICT & Digital Pedagogy in Teaching',
      duration: '40 hours',
      level: 'Intermediate',
      mode: 'Online',
      price: 13000,
      currency: 'INR',
      category: 'course',
      serviceType: 'full-semester',
      courseCategory: 'Education',
      description: 'Integrate technology and digital tools in modern teaching, learn LMS platforms, gamification, and MOOCs.',
      overview: 'This course is designed for educators to integrate Information and Communication Technology (ICT) in teaching. Learn about Learning Management Systems, gamification, MOOCs, and digital pedagogy techniques.',
      heroBannerImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200',
      programBenefits: [
        'Industry-aligned curriculum',
        'Hands-on projects',
        'Internship opportunities',
        'Professional certification',
        'Placement assistance'
      ],
      whatYouLearn: [
        'LMS tools - Moodle, Google Classroom',
        'Gamification in education',
        'MOOCs (Massive Open Online Courses) development'
      ],
      whoShouldTake: [
        'Faculty - All Streams, stream-specific teaching tech tools'
      ],
      outcomes: [
        'Digital Educator',
        'LMS Admin',
        'eLearning Specialist'
      ]
    },
    {
      id: 10,
      slug: 'mentorship-counseling-skills-educators',
      name: 'Mentorship & Counseling Skills for Educators',
      duration: '35 hours',
      level: 'Intermediate',
      mode: 'Hybrid',
      price: 12500,
      currency: 'INR',
      category: 'course',
      serviceType: 'full-semester',
      courseCategory: 'Education',
      description: 'Develop mentoring and counseling capabilities for student guidance, motivation, and emotional intelligence.',
      overview: 'This course equips educators with mentorship and counseling skills. Learn student motivation techniques, emotional intelligence, career guidance, and effective mentoring strategies.',
      heroBannerImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200',
      programBenefits: [
        'Industry-aligned curriculum',
        'Hands-on projects',
        'Internship opportunities',
        'Professional certification',
        'Placement assistance'
      ],
      whatYouLearn: [
        'Student motivation techniques',
        'Emotional intelligence and empathy development'
      ],
      whoShouldTake: [
        'Faculty - Arts: Narrative mentoring',
        'Faculty - Science: Research encouragement',
        'Faculty - MBA: Career guidance'
      ],
      outcomes: [
        'Academic Mentor',
        'Student Advisor',
        'Career Counselor'
      ]
    },
    {
      id: 11,
      slug: 'inclusive-teaching-universal-design-learning',
      name: 'Inclusive Teaching & Universal Design for Learning',
      duration: '40 hours',
      level: 'Intermediate',
      mode: 'Online',
      price: 13500,
      currency: 'INR',
      category: 'course',
      serviceType: 'full-semester',
      courseCategory: 'Education',
      description: 'Create inclusive learning environments using Universal Design for Learning (UDL) and differentiated instruction.',
      overview: 'This course focuses on inclusive teaching practices and Universal Design for Learning (UDL). Learn to create accessible learning environments that accommodate diverse student needs and learning styles.',
      heroBannerImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200',
      programBenefits: [
        'Industry-aligned curriculum',
        'Hands-on projects',
        'Internship opportunities',
        'Professional certification',
        'Placement assistance'
      ],
      whatYouLearn: [
        'UDL (Universal Design for Learning) principles',
        'Differentiated instruction strategies'
      ],
      whoShouldTake: [
        'Faculty - All Streams: Inclusive teaching strategies and materials'
      ],
      outcomes: [
        'Inclusive Educator',
        'Special Needs Coordinator',
        'Program Benefits'
      ]
    },
    {
      id: 12,
      slug: 'socio-emotional-learning-mental-health-literacy',
      name: 'Socio-Emotional Learning & Mental Health Literacy',
      duration: '35 hours',
      level: 'Beginner',
      mode: 'Hybrid',
      price: 11500,
      currency: 'INR',
      category: 'course',
      serviceType: 'full-semester',
      courseCategory: 'Mental Health',
      description: 'Understand emotional intelligence, mental health awareness, and socio-emotional learning practices.',
      overview: 'This course covers socio-emotional learning (SEL) and mental health literacy. Learn about emotional intelligence, mental health awareness, stress management, and creating supportive environments.',
      heroBannerImage: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=1200',
      programBenefits: [
        'Industry-aligned curriculum',
        'Hands-on projects',
        'Internship opportunities',
        'Professional certification',
        'Placement assistance'
      ],
      whatYouLearn: [
        'SEL (Socio-Emotional Learning) practices',
        'Empathy development',
        'Mental health awareness and support'
      ],
      whoShouldTake: [
        'Faculty - Arts: SEL through literature',
        'Faculty - Science: Managing lab pressure',
        'Faculty - Commerce: SEL in work settings'
      ],
      outcomes: [
        'SEL Facilitator',
        'Wellbeing Coordinator',
        'Mental Health Liaison'
      ]
    },
    {
      id: 13,
      slug: 'curriculum-co-design-workshop',
      name: 'Curriculum Co-Design Workshop',
      duration: '30 hours',
      level: 'Advanced',
      mode: 'Offline',
      price: 14500,
      currency: 'INR',
      category: 'course',
      serviceType: 'full-semester',
      courseCategory: 'Education',
      description: 'Collaborative curriculum development using design thinking and student-centered approaches.',
      overview: 'This advanced workshop focuses on collaborative curriculum design. Learn design thinking methodologies, student-centered curriculum development, and co-creation strategies with stakeholders.',
      heroBannerImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200',
      programBenefits: [
        'Industry-aligned curriculum',
        'Hands-on projects',
        'Internship opportunities',
        'Professional certification',
        'Placement assistance'
      ],
      whatYouLearn: [
        'Outcome-based curriculum design',
        'Industry alignment strategies'
      ],
      whoShouldTake: [
        'Faculty - Engineering: Tech-based projects',
        'Faculty - Arts: Creative curriculum design',
        'Faculty - Commerce: Real-world case studies'
      ],
      outcomes: [
        'Curriculum Developer',
        'Program Coordinator'
      ]
    },
    {
      id: 14,
      slug: 'academic-project-supervision-masterclass',
      name: 'Academic Project Supervision Masterclass',
      duration: '35 hours',
      level: 'Advanced',
      mode: 'Hybrid',
      price: 15500,
      currency: 'INR',
      category: 'course',
      serviceType: 'full-semester',
      courseCategory: 'Education',
      description: 'Guide and supervise student research and academic projects effectively.',
      overview: 'This masterclass prepares educators to effectively supervise student research and academic projects. Learn project management, research guidance, mentoring techniques, and assessment strategies.',
      heroBannerImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200',
      programBenefits: [
        'Industry-aligned curriculum',
        'Hands-on projects',
        'Internship opportunities',
        'Professional certification',
        'Placement assistance'
      ],
      whatYouLearn: [
        'Research mentoring techniques',
        'Evaluation skills for academic projects'
      ],
      whoShouldTake: [
        'Faculty - Science: Lab projects',
        'Faculty - Humanities: Dissertation guidance',
        'Faculty - Commerce: Market research'
      ],
      outcomes: [
        'Research Supervisor',
        'Innovation Mentor',
        'Capstone Advisor'
      ]
    },
    {
      id: 15,
      slug: 'research-methodology-publishing-workshop',
      name: 'Research Methodology & Publishing Workshop',
      duration: '45 hours',
      level: 'Advanced',
      mode: 'Online',
      price: 17000,
      currency: 'INR',
      category: 'course',
      serviceType: 'full-semester',
      courseCategory: 'Research',
      description: 'Learn research methods, academic paper writing, and publishing in peer-reviewed journals.',
      overview: 'This comprehensive workshop covers research methodology and academic publishing. Learn research design, data collection and analysis, academic writing, and how to publish in peer-reviewed journals.',
      heroBannerImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200',
      programBenefits: [
        'Industry-aligned curriculum',
        'Hands-on projects',
        'Internship opportunities',
        'Professional certification',
        'Placement assistance'
      ],
      whatYouLearn: [
        'Research writing and academic paper structure',
        'Data tools for research analysis',
        'Ethics in research and publication'
      ],
      whoShouldTake: [
        'Students - Science: Experimental methods',
        'Students - Humanities: Literature reviews',
        'Students - Commerce: Applied papers',
        'Faculty - Mentoring research and guiding publication'
      ],
      outcomes: [
        'Research Author',
        'Academic Writer',
        'Journal Contributor'
      ]
    }
  ]
};

// Service names mapping
export const serviceNames: Record<string, string> = {
  'full-semester': 'Full Semester Skill Program',
  'short-term': 'Short-Term Certification Programs',
  'pre-placement': 'Pre-Placement Training Programs',
  'industry-training': 'Industry Training Programs',
  'faculty-development': 'Faculty Development Programs'
};

// Get courses by service type
export const getCoursesByService = (serviceType: string): Course[] => {
  return coursesByService[serviceType] || [];
};

// Get course by slug
export const getCourseBySlug = (slug: string): Course | undefined => {
  for (const courses of Object.values(coursesByService)) {
    const course = courses.find(c => c.slug === slug);
    if (course) return course;
  }
  return undefined;
};

// Get related courses (same courseCategory, exclude current)
export const getRelatedCourses = (currentCourse: Course, limit: number = 3): Course[] => {
  const allCourses = Object.values(coursesByService).flat();
  return allCourses
    .filter(c => c.courseCategory === currentCourse.courseCategory && c.id !== currentCourse.id)
    .slice(0, limit);
};
