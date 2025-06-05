import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle,
  BookOpen,
  GraduationCap,
  Briefcase,
  Users,
  School,
  Building2
} from 'lucide-react';
import { services } from '@/components/institutions/sdp/Services';
import React, { useState } from 'react';

// --- PROGRAM TABLES FOR EACH SERVICE ---
const programTables: Record<string, Array<any>> = {
  // Replace these keys with the actual id values from your services array
  'full-semester': [
    {
      slNo: 1,
      title: "Good Manufacturing Practices & Quality Assurance",
      keyFocus: "GMP, SOPs, QA/QC, compliance, pharma/food safety",
      customization: "Students: Life Sciences – FSSAI & lab hygiene; Chemistry – Pharma focus; Commerce – Audit & compliance. Faculty: Integrating GMP compliance in lab-based teaching.",
      outcomes: "QA Analyst, QC Executive, GMP Associate, Compliance Officer"
    },
    {
      slNo: 2,
      title: "Medical Coding & Health Information Management",
      keyFocus: "CPT, ICD, HCPCS coding, documentation, CPC prep",
      customization: "Students: Life Sciences – Anatomy & physiology; Commerce – Claims processing; IT – Health data systems. Faculty: Teaching using clinical records and coding exercises.",
      outcomes: "Medical Coder, Health Records Analyst, CPC Professional"
    },
    {
      slNo: 3,
      title: "Food Safety & Organic Production",
      keyFocus: "FSSAI, HACCP, organic certification",
      customization: "Students: Life Sciences – Food microbiology; Agriculture – Organic farming; Commerce – Organic product marketing. Faculty: Teaching sustainable food systems and certification standards.",
      outcomes: "Food Safety Officer, Organic Certification Assistant, QA Analyst"
    },
    {
      slNo: 4,
      title: "Basic & Advanced Computer Applications",
      keyFocus: "Excel, Google Suite, dashboards",
      customization: "Students: Science – Lab data logs; Commerce – Financial automation; Arts – Document design. Faculty: Use of tools for teaching and student assessment.",
      outcomes: "Data Entry Operator, MIS Executive, Office Assistant"
    },
    {
      slNo: 5,
      title: "Professional Communication & Workplace Readiness",
      keyFocus: "Email etiquette, GD, presentations",
      customization: "Students: MBA/Commerce – Business communication; Science – Technical reports; Arts – Expressive writing. Faculty: Enhancing classroom communication & mentoring.",
      outcomes: "Customer Support, Corporate Trainee, Admin Assistant"
    },
    {
      slNo: 6,
      title: "AI & Data Analytics for Beginners",
      keyFocus: "Python, Tableau, data visualization",
      customization: "Students: Science – Research data; Commerce – Sales analytics; MBA – Market insights. Faculty: Embedding analytics tools in course delivery.",
      outcomes: "Data Analyst, BI Executive, Junior Data Scientist"
    },
    {
      slNo: 7,
      title: "Digital Marketing & Social Media Strategy",
      keyFocus: "SEO, SEM, branding, campaign analysis",
      customization: "Students: Arts – Content creation; Commerce – ROI & ads; MBA – Full-funnel marketing. Faculty: Curriculum integration with digital tools & trends.",
      outcomes: "Digital Marketing Executive, SEO Analyst, Social Media Coordinator"
    },
    {
      slNo: 8,
      title: "Interview & Aptitude Bootcamp",
      keyFocus: "Logical reasoning, aptitude, mock interviews",
      customization: "Students: All Streams – Tailored aptitude and interview prep. Faculty: Supporting resume building and mock interviews.",
      outcomes: "Job-ready candidates, Placement-ready profiles"
    },
    {
      slNo: 10,
      title: "ICT & Digital Pedagogy in Teaching",
      keyFocus: "LMS tools, gamification, MOOCs",
      customization: "Faculty: All Streams – Stream-specific teaching tech tools.",
      outcomes: "Digital Educator, LMS Admin, eLearning Specialist"
    },
    {
      slNo: 11,
      title: "Mentorship & Counseling Skills for Educators",
      keyFocus: "Student motivation, emotional intelligence",
      customization: "Faculty: Arts – Narrative mentoring; Science – Research encouragement; MBA – Career guidance.",
      outcomes: "Academic Mentor, Student Advisor, Career Counselor"
    },
    {
      slNo: 12,
      title: "Inclusive Teaching & Universal Design for Learning",
      keyFocus: "UDL, differentiated instruction",
      customization: "Faculty: All Streams – Inclusive teaching strategies and materials.",
      outcomes: "Inclusive Educator, Special Needs Coordinator"
    },
    {
      slNo: 13,
      title: "Socio-Emotional Learning & Mental Health Literacy",
      keyFocus: "SEL practices, empathy, and mental health awareness",
      customization: "Faculty: Arts – SEL through literature; Science – Managing lab pressure; Commerce – SEL in work settings.",
      outcomes: "SEL Facilitator, Wellbeing Coordinator, Mental Health Liaison"
    },
    {
      slNo: 14,
      title: "Curriculum Co-Design Workshop",
      keyFocus: "Outcome-based curriculum, industry alignment",
      customization: "Faculty: Engineering – Tech-based projects; Arts – Creative curriculum design; Commerce – Real-world case studies.",
      outcomes: "Curriculum Developer, Program Coordinator, Instructional Designer"
    },
    {
      slNo: 15,
      title: "Academic Project Supervision Masterclass",
      keyFocus: "Research mentoring, evaluation skills",
      customization: "Faculty: Science – Lab projects; Humanities – Dissertation guidance; Commerce – Market research.",
      outcomes: "Research Supervisor, Innovation Mentor, Capstone Advisor"
    },
    {
      slNo: 16,
      title: "Research Methodology & Publishing Workshop",
      keyFocus: "Research writing, data tools, ethics",
      customization: "Students: Science – Experimental methods; Humanities – Lit reviews; Commerce – Applied papers. Faculty: Mentoring research and guiding publication.",
      outcomes: "Research Author, Academic Writer, Journal Contributor"
    }
  ],
  'pre-placement': [
    {
      slNo: 1,
      title: "Aptitude & Logical Reasoning Mastery",
      keyFocus: "Quantitative aptitude, reasoning, verbal ability, practice tests",
      customization: "Engineering: Core aptitude for technical roles; Arts: Reasoning for public exams; Commerce: Quant + data sets",
      outcomes: "Aptitude Test Ready Candidates, Govt. Exam Aspirants, Placement-Ready Graduates"
    },
    {
      slNo: 2,
      title: "Technical Interview Readiness",
      keyFocus: "Domain-specific revision (CS/IT/Mech/EEE/Civil/etc), coding drills, core subjects",
      customization: "CS/IT: Data structures, OS; Mech/EEE: Circuit design, Thermo; Civil: Structural & materials",
      outcomes: "Trainee Engineer, Graduate Engineer, Developer Intern"
    },
    {
      slNo: 3,
      title: "Resume Building & Portfolio Design",
      keyFocus: "Crafting customized resumes, LinkedIn profiles, and digital portfolios",
      customization: "Design/Arts: Creative portfolios; Engineering: Tech project showcase; Commerce: Skill-based resumes",
      outcomes: "Job Applicants, Interns, Freelancer Profiles"
    },
    {
      slNo: 4,
      title: "Mock Interviews (HR + Technical)",
      keyFocus: "Real-time simulations, feedback, and body language training",
      customization: "Customized questions by stream: HR + Tech + Role-based",
      outcomes: "Confident Interview Candidates, Job-Ready Applicants"
    },
    {
      slNo: 5,
      title: "Group Discussion Dynamics",
      keyFocus: "Strategy, speaking etiquette, argument structuring, leadership in teams",
      customization: "MBA: Leadership tone; Arts: Expression and coherence; Science: Fact-based discussion",
      outcomes: "Management Trainees, Business Analysts, Team Contributors"
    },
    {
      slNo: 6,
      title: "Soft Skills & Professional Etiquette",
      keyFocus: "Communication, grooming, team interaction, email & meeting etiquette",
      customization: "All Streams: Domain-specific workplace behavior training",
      outcomes: "Corporate Trainee, Admin Assistant, Client Support Role"
    },
    {
      slNo: 7,
      title: "Personal Branding & LinkedIn Optimization",
      keyFocus: "Digital presence, LinkedIn content, endorsements, recruiter visibility",
      customization: "MBA: Thought leadership; Science: Research highlights; Arts: Creative storytelling",
      outcomes: "Higher recruiter visibility, Personal Branding Experts"
    },
    {
      slNo: 8,
      title: "Industry Trends & Job Market Awareness",
      keyFocus: "Sectors hiring, emerging roles, startup vs corporate dynamics",
      customization: "Commerce: BFSI and Fintech; Engineering: Tech and infra; Arts: Media & content industries",
      outcomes: "Career-Aware Graduates, Sector-Informed Job Seekers"
    },
    {
      slNo: 9,
      title: "Emotional Intelligence at Work",
      keyFocus: "Managing anxiety, collaboration, adaptability, and workplace resilience",
      customization: "All Streams: Role-play and situational training",
      outcomes: "Emotionally Resilient Employees, Team Players, Mentally Agile Professionals"
    },
    {
      slNo: 10,
      title: "Career Coaching & One-on-One Mentorship",
      keyFocus: "Personalized guidance, choosing the right path, and goal alignment",
      customization: "Tailored per student profile and domain",
      outcomes: "Informed Career Decision-Makers, Confident Professionals"
    },
    {
      slNo: 11,
      title: "Public Speaking & Presentation Skills",
      keyFocus: "Confidence building, storytelling, pitch delivery",
      customization: "MBA: Business pitch; Science: Research presentation; Arts: Expression and creative speech",
      outcomes: "Confident Speakers, Presenters, Thought Leaders"
    },
    {
      slNo: 12,
      title: "AI & Automation Readiness",
      keyFocus: "Basics of AI, how automation impacts hiring, and digital fluency",
      customization: "CS/IT: Automation tools; Commerce: Fintech apps; Science: Lab automation",
      outcomes: "AI-Literate Professionals, Future-Ready Employees"
    },
    {
      slNo: 13,
      title: "Internship & Project Readiness",
      keyFocus: "Mini-project ideation, documentation, and presentation skills",
      customization: "Engineering: Final year projects; Science: Research design; Arts: Fieldwork presentation",
      outcomes: "Internship Candidates, Research Interns, Project Associates"
    },
    {
      slNo: 14,
      title: "Placement Drive Orientation & Recruitment Prep",
      keyFocus: "Navigating placement portals, company research, and test platforms (AMCAT, CoCubes)",
      customization: "Stream-specific test prep strategies and company-wise analysis",
      outcomes: "Prepared Candidates for Campus Drives, Recruitment-Ready Students"
    },
    {
      slNo: 15,
      title: "Freelancing & Alternate Careers",
      keyFocus: "Gig work, remote work skills, portfolio building, and online work platforms",
      customization: "Arts: Content writing; CS/IT: Tech gigs; Commerce: Data entry/accounting freelancing",
      outcomes: "Freelancers, Gig Workers, Independent Professionals"
    }
  ],
  // Bridge Course – Foundation Program for First-Year Students Table
'bridge-courses': [
  {
    slNo: 1,
    title: "Foundational Communication Skills",
    keyFocus: "Verbal and written communication, articulation, public speaking, and basic email writing",
    customization: "Arts: Expression-focused; Science: Clarity in documentation; Engineering: Technical communication",
    outcomes: "Confident Communicators, Better Presenters, Academic Communicators"
  },
  {
    slNo: 2,
    title: "Digital Literacy & Productivity Tools",
    keyFocus: "MS Office Suite (Word, Excel, PowerPoint), Google Workspace, file management",
    customization: "Commerce: Spreadsheet usage; Science: Data presentation; Engineering: Tech documentation",
    outcomes: "Tech-Enabled Students, Digitally Literate Learners"
  },
  {
    slNo: 3,
    title: "Emotional Intelligence & Self-Awareness",
    keyFocus: "Managing emotions, understanding oneself, social skills, and personal goal setting",
    customization: "All streams: Personality profiling and domain-specific triggers",
    outcomes: "Emotionally Aware Individuals, Adaptive Learners"
  },
  {
    slNo: 4,
    title: "Time & Stress Management",
    keyFocus: "Prioritization techniques, beating procrastination, and academic planning",
    customization: "Engineering: Project deadlines; Science: Lab schedules; Arts: Study routines",
    outcomes: "Efficient Students, Balanced Individuals"
  },
  {
    slNo: 5,
    title: "Team Collaboration & Peer Interaction",
    keyFocus: "Working in groups, leadership basics, trust-building exercises, and team roles",
    customization: "All streams: Group-based activities tailored to projects and classroom culture",
    outcomes: "Team Players, Student Leaders"
  },
  {
    slNo: 6,
    title: "Professional Ethics & College Decorum",
    keyFocus: "Respect, punctuality, digital conduct, anti-ragging awareness, classroom behavior",
    customization: "All streams: Contextual ethics based on discipline (lab, studio, field, or tech)",
    outcomes: "Responsible Campus Citizens, Ethical Professionals"
  },
  {
    slNo: 7,
    title: "Growth Mindset & Adaptability",
    keyFocus: "Developing resilience, responding to feedback, and embracing challenges",
    customization: "Engineering: Handling failure in projects; Arts: Creative criticism; Science: Iterative learning",
    outcomes: "Resilient Thinkers, Growth-Oriented Students"
  },
  {
    slNo: 8,
    title: "Campus Orientation & Academic Systems",
    keyFocus: "Understanding credits, assessments, timetables, and the use of LMS (Learning Management Systems)",
    customization: "Customized for each institution’s academic rules and departmental formats",
    outcomes: "LMS-Ready Learners, Academically Confident Freshers"
  },
  {
    slNo: 9,
    title: "Intro to Research & Learning Skills",
    keyFocus: "Note-taking, referencing, online research basics, and academic honesty",
    customization: "Science: Lab records and referencing; Arts: Citation and paraphrasing; Commerce: Report-based learning",
    outcomes: "Research-Aware Students, Honest Scholars"
  },
  {
    slNo: 10,
    title: "Introduction to Critical Thinking",
    keyFocus: "Questioning assumptions, evaluating information, and basic problem-solving",
    customization: "Engineering: Logical thinking; Arts: Perspective-taking; Science: Data questioning",
    outcomes: "Critical Thinkers, Curious Learners"
  },
  {
    slNo: 11,
    title: "Social Media Literacy & Cyber Etiquette",
    keyFocus: "Safe online behavior, digital footprint, and cyberbullying awareness",
    customization: "Tech-heavy streams: Coding forums etiquette; Media: Online expression guidelines",
    outcomes: "Digitally Responsible Netizens, Cyber-Aware Students"
  },
  {
    slNo: 12,
    title: "Language Lab Practice (Optional)",
    keyFocus: "Listening, pronunciation, conversational English, vocabulary building",
    customization: "For students with weaker English skills or regional-medium backgrounds",
    outcomes: "Confident Speakers, Improved Language Proficiency"
  }
],
// Skill-Based Training – Credit-Linked Programs Table
 'skill-based' : [
  {
    slNo: 1,
    title: "Digital Marketing Essentials",
    keyFocus: "SEO, content creation, social media, Google Ads, analytics",
    customization: "Commerce/MBA: Brand building, sales funnels; Arts: Creative storytelling, campaign design",
    outcomes: "Digital Marketing Executive, Content Strategist, Social Media Manager"
  },
  {
    slNo: 2,
    title: "Data Analytics with Excel & Power BI",
    keyFocus: "Dashboards, pivot tables, visualization, and data modeling",
    customization: "Science: Lab data analysis; Commerce: Financial modeling; MBA: KPI dashboards",
    outcomes: "Data Analyst, Reporting Executive, Business Analyst"
  },
  {
    slNo: 3,
    title: "Python for Beginners",
    keyFocus: "Programming basics, logic, automation, mini-projects",
    customization: "Science: Data simulation; Arts: Chatbots & creative automation; MBA: Business tools",
    outcomes: "Junior Python Developer, Automation Assistant, Data Technician"
  },
  {
    slNo: 4,
    title: "Full Stack Web Development",
    keyFocus: "HTML, CSS, JS, backend, responsive design",
    customization: "Science/Engineering: Technical web apps; Arts: Portfolio websites",
    outcomes: "Web Developer, UI/UX Assistant, Frontend Developer"
  },
  {
    slNo: 5,
    title: "Communication Mastery",
    keyFocus: "Email etiquette, reports, presentations, and interviews",
    customization: "All Streams: Industry-specific communication formats",
    outcomes: "Communication Executive, Client Relations Assistant, Technical Writer"
  },
  {
    slNo: 6,
    title: "Advanced Excel & Google Workspace",
    keyFocus: "Advanced formulas, dashboards, Docs, Sheets, team tools",
    customization: "Manufacturing: Quality logs; Construction: Resource tracking",
    outcomes: "MIS Executive, Excel Specialist, Operations Analyst"
  },
  {
    slNo: 7,
    title: "Food Safety & Quality Control",
    keyFocus: "HACCP, GMP, hygiene, and lab documentation",
    customization: "Science: FSSAI, testing; Commerce: Compliance & audits",
    outcomes: "Food Quality Inspector, Lab Technician, QA Assistant"
  },
  {
    slNo: 8,
    title: "AI Tools for Education & Business",
    keyFocus: "Canva, ChatGPT, generative AI, ethics, automation",
    customization: "MBA: Marketing/HR automation; Arts: Creative AI; Science: Research AI",
    outcomes: "AI Assistant, EdTech Content Creator, Prompt Engineer"
  },
  {
    slNo: 9,
    title: "Workplace Ethics & Professionalism",
    keyFocus: "Code of conduct, behavior, ethics",
    customization: "All Streams: Industry-specific ethics scenarios",
    outcomes: "HR Associate, Corporate Compliance Trainee, Ethics Analyst"
  },
  {
    slNo: 10,
    title: "Interview & Resume Workshop",
    keyFocus: "CV building, grooming, mock interviews",
    customization: "All Streams: Customized formats",
    outcomes: "Career Services Assistant, HR Intern, Talent Acquisition Intern"
  },
  {
    slNo: 11,
    title: "Project Management Basics",
    keyFocus: "Gantt charts, teamwork, Trello, milestones",
    customization: "Engineering: Product dev; MBA: Agile planning",
    outcomes: "Project Coordinator, PMO Support, Scrum Team Assistant"
  },
  {
    slNo: 12,
    title: "Cyber Safety & Digital Citizenship",
    keyFocus: "Privacy, digital identity, safe tech use",
    customization: "All Streams: Domain-specific risks",
    outcomes: "Cyber Awareness Executive, IT Security Assistant, Digital Risk Analyst"
  },
  {
    slNo: 13,
    title: "Financial Literacy for Students",
    keyFocus: "Budgeting, UPI, taxes, investments",
    customization: "MBA: Stock markets; Arts/Science: Personal finance",
    outcomes: "Financial Literacy Coach, Junior Accountant, Banking Support"
  },
  {
    slNo: 14,
    title: "Personal Branding & LinkedIn Strategy",
    keyFocus: "Networking, online presence, elevator pitch",
    customization: "MBA: Thought leadership; Arts: Creative portfolios",
    outcomes: "LinkedIn Coach, Personal Branding Consultant, Portfolio Designer"
  },
  {
    slNo: 15,
    title: "AI Literacy & Prompt Engineering",
    keyFocus: "AI models, writing prompts, and real-world apps",
    customization: "Science: Research prompts; MBA: Business prompts",
    outcomes: "Prompt Developer, AI Content Curator, Research Assistant"
  },
  {
    slNo: 16,
    title: "Sustainability Awareness & Green Skills",
    keyFocus: "SDGs, waste management, green careers",
    customization: "Science: Green labs; Commerce: ESG; Arts: Impact stories",
    outcomes: "Sustainability Associate, CSR Executive, Green Consultant"
  },
  {
    slNo: 17,
    title: "Entrepreneurship & Start-up Thinking",
    keyFocus: "MVPs, business models, pitching",
    customization: "MBA: Revenue models; Arts: Social enterprise; Science: Tech startups",
    outcomes: "Startup Founder, Innovation Intern, Incubation Centre Trainee"
  },
  {
    slNo: 18,
    title: "Critical Thinking & Decision-Making",
    keyFocus: "Logic, root cause, analysis frameworks",
    customization: "Science: Experimental design; MBA: Strategic thinking",
    outcomes: "Strategy Analyst, Decision Support Executive, Research Consultant"
  },
  {
    slNo: 19,
    title: "Global Communication & Collaboration",
    keyFocus: "Virtual etiquette, intercultural fluency",
    customization: "All Streams: Global team readiness",
    outcomes: "Global Team Liaison, Remote Project Assistant, Communication Specialist"
  },
  {
    slNo: 20,
    title: "Digital Storytelling & Content Creation",
    keyFocus: "Canva, Reels, YouTube, scripting",
    customization: "Arts: Narratives; Science: Sci-com; MBA: Product videos",
    outcomes: "Content Creator, Video Scriptwriter, Digital Media Assistant"
  },
  {
    slNo: 21,
    title: "Agile & Remote Collaboration Tools",
    keyFocus: "Slack, Miro, Notion, Scrum basics",
    customization: "MBA/Tech: Team workflows; Arts: Team planning",
    outcomes: "Agile Project Assistant, Remote Ops Coordinator, Scrum Intern"
  },
  {
    slNo: 22,
    title: "Laboratory Data Management & Documentation",
    keyFocus: "Lab logs, SOPs, compliance (GLP)",
    customization: "Life Sciences: GLP; Engineering: QC reports",
    outcomes: "Lab Documentation Officer, QC Analyst, Compliance Trainee"
  },
  {
    slNo: 23,
    title: "Basics of IoT and Smart Devices",
    keyFocus: "Sensors, microcontrollers, and automation",
    customization: "Engineering: Arduino; Science: Monitoring apps",
    outcomes: "IoT Technician, Embedded Systems Intern, Automation Support"
  },
  {
    slNo: 24,
    title: "GIS & Remote Sensing for Beginners",
    keyFocus: "Spatial data, satellite mapping, QGIS",
    customization: "Env. Science: Climate maps; Civil: Land analysis",
    outcomes: "GIS Analyst, Remote Sensing Assistant, Mapping Consultant"
  },
  {
    slNo: 25,
    title: "Scientific Research Writing & Presentation",
    keyFocus: "Abstracts, citations, poster design",
    customization: "Science: Lab papers; Humanities: Thesis writing",
    outcomes: "Research Assistant, Academic Editor, Publication Support"
  },
  {
    slNo: 26,
    title: "Digital Accounting Tools & Tally",
    keyFocus: "Tally, GST, vouchers, payroll",
    customization: "Commerce: Taxation; MBA: Budgeting",
    outcomes: "Junior Accountant, Tally Operator, Finance Executive"
  },
  {
    slNo: 27,
    title: "Sales, CRM, and Retail Management",
    keyFocus: "CRM tools, customer journey, and POS",
    customization: "MBA/Commerce: CRM; Retail: Display setup",
    outcomes: "Retail Executive, CRM Analyst, Sales Coordinator"
  },
  {
    slNo: 28,
    title: "Business Analytics with Google Data Studio",
    keyFocus: "Dashboards, KPIs, data visualization",
    customization: "Commerce: Revenue analysis; MBA: Market insights",
    outcomes: "Business Analyst Intern, Data Studio Assistant, Marketing Analyst"
  },
  {
    slNo: 29,
    title: "Corporate Law & Business Ethics",
    keyFocus: "IP, contracts, compliance, governance",
    customization: "Law/MBA: Case studies; Commerce: Audits",
    outcomes: "Legal Associate, Governance Executive, IP Rights Intern"
  },
  {
    slNo: 30,
    title: "Design Thinking & Innovation",
    keyFocus: "Empathy, ideation, prototyping",
    customization: "MBA: Product dev; Humanities: Social design",
    outcomes: "Innovation Associate, Design Thinking Coach, UX Ideation Intern"
  },
  {
    slNo: 31,
    title: "Content Writing & Editorial Skills",
    keyFocus: "Blogging, grammar, and publishing tools",
    customization: "Media: Creative writing; MBA: Business writing",
    outcomes: "Content Writer, Editorial Assistant, Copywriter"
  },
  {
    slNo: 32,
    title: "Media & Visual Literacy",
    keyFocus: "Visual analysis, media bias, narrative framing",
    customization: "Mass Comm: Ethics; Sociology: Social discourse",
    outcomes: "Media Analyst, News Editor Intern, Social Media Evaluator"
  },
  {
    slNo: 33,
    title: "Event Management Fundamentals",
    keyFocus: "Budgeting, logistics, and branding",
    customization: "Arts: Event kits; MBA: Brand activations",
    outcomes: "Event Coordinator, Event Marketing Assistant, Logistics Planner"
  },
  {
    slNo: 34,
    title: "Emotional Intelligence & Self-Awareness",
    keyFocus: "Self-awareness, empathy, and team dynamics",
    customization: "All Streams: Group-based exercises",
    outcomes: "EI Coach, HR Assistant, Peer Mentor"
  },
  {
    slNo: 35,
    title: "Basics of Coding with No-Code Tools",
    keyFocus: "Glide, Zapier, and app building",
    customization: "MBA: Workflow automation; Arts: Digital portfolios",
    outcomes: "No-Code Developer, Workflow Designer, Digital Product Intern"
  },
  {
    slNo: 36,
    title: "Digital Freelancing & Gig Economy Skills",
    keyFocus: "Profiles, bidding, and team skills",
    customization: "All Streams: Stream-specific gigs",
    outcomes: "Freelancer (writer, designer, tutor), Remote Assistant, Gig Platform Intern"
  },
  {
    slNo: 37,
    title: "ESG (Environmental, Social, Governance) Literacy",
    keyFocus: "ESG, CSR, sustainability metrics",
    customization: "Commerce: ESG reports; Arts: Impact stories",
    outcomes: "ESG Analyst, CSR Coordinator, Sustainability Intern"
  }
],
// Faculty Development Programs (FDPs) Table
  'faculty-development' : [
  {
    slNo: 1,
    title: "Faculty Development Program (FDP)",
    keyFocus: "Teaching excellence, NEP alignment, industry 4.0, learner-centered methods",
    customization: "Engineering, Sciences, Commerce, Management",
    outcomes: "Academic Leaders, HODs, Senior Faculty"
  },
  {
    slNo: 2,
    title: "ICT & Digital Pedagogy in Teaching",
    keyFocus: "LMS tools, gamification, MOOCs, online assessments",
    customization: "All disciplines with digital/blended learning",
    outcomes: "Digital Educators, EdTech Facilitators"
  },
  {
    slNo: 3,
    title: "Mentorship & Counseling Skills for Educators",
    keyFocus: "Student motivation, emotional intelligence, and basic counseling techniques",
    customization: "Psychology, Social Work, Arts, General UG Faculty",
    outcomes: "Student Counselors, Faculty Mentors"
  },
  {
    slNo: 4,
    title: "Inclusive Teaching & Universal Design for Learning",
    keyFocus: "UDL principles, differentiated instruction, supporting students with disabilities",
    customization: "Special Education, Humanities, General Programs",
    outcomes: "Inclusion Coordinators, Academic Support Staff"
  },
  {
    slNo: 5,
    title: "Socio-Emotional Learning & Mental Health Literacy",
    keyFocus: "Teacher empathy, trauma-informed practices, recognizing mental health cues",
    customization: "All streams (focus on student well-being)",
    outcomes: "SEL Trainers, Pastoral Care Mentors"
  },
  {
    slNo: 6,
    title: "Curriculum Co-Design Workshop",
    keyFocus: "Experiential curriculum, outcome-based design, industry alignment",
    customization: "Faculty involved in curriculum committees",
    outcomes: "Academic Designers, Curriculum Innovators"
  },
  {
    slNo: 7,
    title: "Academic Project Supervision Masterclass",
    keyFocus: "Guiding student research, innovation mentoring, and evaluation frameworks",
    customization: "Science, Engineering, Business, IT",
    outcomes: "Project Guides, Innovation Mentors"
  },
  {
    slNo: 8,
    title: "Research Methodology & Publishing Workshop",
    keyFocus: "Writing skills, data tools, publishing ethics, Scopus/UGC journals",
    customization: "Research-oriented departments",
    outcomes: "Academic Researchers, Publication Coordinators"
  }
],
// Internship & Placement – Industry Connect Table
'internship-placement' : [
  {
    slNo: 1,
    title: "Resume Building & Personal Branding",
    keyFocus: "Crafting impactful resumes, LinkedIn profiles, and online presence management",
    customization: "Engineering: Tech portfolios; Commerce: Financial achievements; Arts: Creative showcase",
    outcomes: "Strong Candidate Profiles, Higher Shortlisting Chances"
  },
  {
    slNo: 2,
    title: "Mock Interviews & Group Discussions",
    keyFocus: "Industry-style interviews, feedback, communication & teamwork skills",
    customization: "Customized by domain (Tech HR, FMCG panels, Public sector logic)",
    outcomes: "Confident Interviewees, Team-Oriented Communicators"
  },
  {
    slNo: 3,
    title: "Technical Skill Refresher Workshops",
    keyFocus: "Quick revision sessions on core subjects relevant to job roles",
    customization: "Engineering: Core branches (coding, circuits); Science: Labs, analytics; Commerce: Tally, finance tools",
    outcomes: "Job-Ready Graduates, Domain Refreshed Candidates"
  },
  {
    slNo: 4,
    title: "Aptitude & Reasoning Training",
    keyFocus: "Logical reasoning, quantitative aptitude, and verbal ability practice",
    customization: "Core vs Non-core company test patterns customized per stream",
    outcomes: "Aptitude-Cleared Candidates, Higher Placement Test Success"
  },
  {
    slNo: 5,
    title: "Soft Skills & Communication Training",
    keyFocus: "Effective communication, personality development, and workplace etiquette",
    customization: "Stream-based scenarios: Tech support, marketing calls, public presentations",
    outcomes: "Industry-Ready Professionals, Enhanced Team Presence"
  },
  {
    slNo: 6,
    title: "Internship Preparation & Project Work",
    keyFocus: "Real-world project execution, professional reporting, and time management",
    customization: "Engineering: Mini project reporting; Science: Research reporting; Arts: Media/field documentation",
    outcomes: "Intern-Ready Students, Project-Experienced Freshers"
  },
  {
    slNo: 7,
    title: "Career Counseling & Mentoring",
    keyFocus: "Personalized career paths, job market insights, and interview readiness",
    customization: "Mentorship mapped to streams: Civil - GATE prep, CS - Startup vs MNC choice, etc.",
    outcomes: "Informed Career Decision-Makers, Aligned Job Seekers"
  },
  {
    slNo: 8,
    title: "Industry-Specific Skill Bootcamps",
    keyFocus: "Sector-focused training: AgriTech, EV technology, Healthcare coding, Food Safety",
    customization: "Mapped to department: Life Sciences - Food Safety; CS - EV/AI; BCom - FinTech",
    outcomes: "Industry-Aligned Candidates, Sector-Specific Skilled Graduates"
  },
  {
    slNo: 9,
    title: "Alumni Networking & Employer Connect",
    keyFocus: "Leveraging alumni for internships, mentorship, referrals, and job leads",
    customization: "Customized alumni pool based on department – IT, Pharma, Manufacturing, Media",
    outcomes: "Peer-Connected Job Seekers, Increased Referral Opportunities"
  },
  {
    slNo: 10,
    title: "Placement Drive Coordination",
    keyFocus: "Organizing campus recruitment events, pre-placement talks, and company presentations",
    customization: "Stream-wise preparation calendars and role-aligned drives (IT, Core Engg, BPO, EdTech)",
    outcomes: "Efficient Placement Execution, Higher Offer Conversion Rate"
  }
],
};

export default function ServicePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find(s => s.id === id);
  const tableData = programTables[id as string] || [];
  const [selectedProgramIndex, setSelectedProgramIndex] = useState(0);

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

  // Other services for bookmark section (excluding current)
  const otherServices = services.filter(s => s.id !== id);

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      {/* Header Banner */}
      <div className="relative h-[38vh] overflow-hidden shadow">
        <img
          src={service.servicesimg}
          alt={service.name}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6">
            <motion.button
              onClick={() => navigate('/institutions#services')}
              whileHover={{ x: -5 }}
              className="text-white text-base mb-4 flex items-center gap-2 font-medium"
            >
              <ArrowLeft className="w-5 h-5"/>
              Back to Services
            </motion.button>
            <h1 className="pt-3 text-3xl md:text-3xl font-bold text-white mb-2 drop-shadow">{service.name}</h1>
            {service.subtitle && (
              <p className="pt-3 text-lg text-white/90">{service.subtitle}</p>
            )}
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="container mx-auto px-8 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
          {/* LEFT: About, Dynamic Details, Benefits */}
          <div className="flex-1 min-w-0 px-2">
            <motion.h2
              className="text-xl md:text:2xl font-bold mb-6 px-2 pt-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              About The Course
            </motion.h2>
            <motion.p
              className="text-gray-700 leading-relaxed text-justify text-base md:text-lg px-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {service.whatitis}
            </motion.p>

            {/* Dynamic Program Details Section (Below About Us) */}
            {tableData.length > 0 && tableData[selectedProgramIndex] && (
              <div className="mt-14 px-2">
                <h3 className="font-bold text-xl pt-2 mb-6 text-black">Program Details</h3>
                <div className="bg-white rounded-2xl p-8 shadow border border-blue-100">
                  {/* Key Focus Areas */}
                  <div className="mb-6">
                    <div className="font-semibold text-blue-700 mb-1">Key Focus Areas:</div>
                    <ul className="list-disc list-inside text-gray-800 pl-2">
                      {tableData[selectedProgramIndex].keyFocus
                        .split(',')
                        .map((item: string, idx: number) => (
                          <li key={idx}>{item.trim()}</li>
                        ))}
                    </ul>
                  </div>
                  {/* Customization by Academic Stream */}
                  <div className="mb-6">
                    <div className="font-semibold text-blue-700 mb-1">Customization by Academic Stream:</div>
                    <ul className="list-disc list-inside text-gray-800 pl-2">
                      {tableData[selectedProgramIndex].customization
                        .split(/;|\./)
                        .map((item: string) => item.trim())
                        .filter(Boolean)
                        .map((item: string, idx: number) => (
                          <li key={idx}>{item}</li>
                        ))}
                    </ul>
                  </div>
                  {/* Job Roles / Outcomes */}
                  <div>
                    <div className="font-semibold text-blue-700 mb-1">Job Roles / Outcomes:</div>
                    <ul className="list-disc list-inside text-gray-800 pl-2">
                      {tableData[selectedProgramIndex].outcomes
                        .split(',')
                        .map((item: string, idx: number) => (
                          <li key={idx}>{item.trim()}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Program Benefits Section */}
            <div className="mt-14 px-2">
              <h3 className="font-bold text-xl pt-2 mb-6 text-black">Program Benefits</h3>
              <div className="mt-10 bg-gradient-to-br from-blue-100 to-indigo-100 p-8 rounded-2xl px-8 shadow border border-indigo-100">
                <motion.ul
                  className="space-y-4"
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
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <p className="text-gray-800 text-base">{benefit}</p>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </div>
          {/* RIGHT: Bookmark & Contents Table */}
          <div className="w-full md:w-[370px] shrink-0 flex flex-col gap-8">
            {/* Bookmark Section */}
            <div className="bg-white rounded-2xl shadow p-6 border border-blue-100">
              <h3 className="font-bold mb-4 flex items-center gap-2 text-black text-xl">
                <BookOpen className="w-5 h-5 text-black" />
                Explore Other Services
              </h3>
              <ul className="space-y-2">
                {otherServices.map(s => (
                  <li key={s.id}>
                    <button
                      onClick={() => navigate(`/service/${s.id}`)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 transition flex items-center gap-2"
                    >
                      <span className="block w-2 h-2 rounded-full bg-blue-400" />
                      <span className="text-sm font-medium text-blue-900">{s.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Contents Table Section */}
            <div className="bg-white rounded-2xl shadow p-6 border border-blue-100">
              <h3 className="font-bold mb-3 text-black text-xl">Contents Table</h3>
              <div className="max-h-[720px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left py-2 text-zinc-700 font-semibold">Sl. No</th>
                      <th className="text-left py-2 text-zinc-700 font-semibold">
                        {id === 'pre-placement-accelerator' ? 'Module / Course Title' : 'Program Title'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((prog, idx) => (
                      <tr
                        key={prog.slNo}
                        className={`cursor-pointer rounded-lg transition ${selectedProgramIndex === idx ? "bg-blue-100 font-semibold" : "hover:bg-blue-50"}`}
                        onClick={() => setSelectedProgramIndex(idx)}
                      >
                        <td className="py-2 pr-2">{prog.slNo}</td>
                        <td className="py-2">{prog.title}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}