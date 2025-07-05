// utils/faqData.ts

export interface FAQCategory {
  section: string;
  faqs: {
    question: string;
    answer: string;
  }[];
}

const faqData: FAQCategory[] = [
  {
    section: "Tracking (Measuring Student Progress)",
    faqs: [
      {
        question: "How can I monitor student progress during the program?",
        answer:
          "Rareminds provides real-time dashboards and periodic reports detailing student attendance, assessment scores, and engagement levels.",
      },
      {
        question: "Are there assessments to evaluate student learning?",
        answer:
          "Yes, each module includes formative and summative assessments to gauge understanding and skill acquisition.",
      },
      {
        question: "Can I receive updates on student performance?",
        answer:
          "Absolutely. Regular progress reports are shared with stakeholders to keep them informed about student achievements and areas needing improvement.",
      },
      {
        question: "Is there a system for tracking skill development?",
        answer:
          "Yes, Rareminds employs competency-based tracking to monitor the development of specific skills aligned with industry standards.",
      },
      {
        question: "How are learning outcomes measured?",
        answer:
          "Learning outcomes are assessed through a combination of quizzes, assignments, projects, and participation metrics.",
      },
      {
        question: "Do students receive feedback on their performance?",
        answer:
          "Yes, personalized feedback is provided to help students understand their strengths and areas for growth.",
      },
      {
        question: "Is there a way to compare student progress across groups?",
        answer:
          "RareMinds offers analytics tools that allow for benchmarking and comparative analysis across different student groups.",
      },
      {
        question: "Can I access historical data on student performance?",
        answer:
          "Yes, historical performance data is archived and accessible for longitudinal studies and evaluations.",
      },
      {
        question: "Are there alerts for students falling behind?",
        answer:
          "The system flags students who may need additional support, enabling timely interventions.",
      },
      {
        question: "How is data privacy maintained in tracking systems?",
        answer:
          "RareMinds adheres to strict data protection policies, ensuring that all student information is securely stored and accessed only by authorized personnel.",
      },
    ],
  },
  {
    section: "Funding (Government Support and Financial Assistance)",
    faqs: [
      {
        question: "Is government funding available for RareMinds programs?",
        answer:
          "Yes, government funding is available for programs under the Naan Mudhalvan initiative. Applicable only in Tamilnadu.",
      },
      {
        question: "What is the Naan Mudhalvan program?",
        answer:
          "Naan Mudhalvan is a Tamil Nadu government initiative aimed at enhancing the skills of youth to improve employability in collaboration with Rareminds.",
      },
      {
        question: "Who is eligible for Naan Mudhalvan funding?",
        answer:
          "Students and unemployed youth residing in Tamil Nadu are eligible for funding under this program.",
      },
      {
        question: "How can one apply for Naan Mudhalvan programs?",
        answer:
          "Applications can be submitted through the official Naan Mudhalvan portal or via affiliated universities.",
      },
      {
        question: "Are there any costs involved for students in funded programs?",
        answer:
          "No, all the programs under Naan Mudhalvan are fully funded, covering training, materials, and certification.",
      },
      {
        question: "Does RareMinds assist with the funding application process?",
        answer:
          "Yes, RareMinds provides guidance and support to students during the application process for funded programs.",
      },
      {
        question: "Are there other funding opportunities available?",
        answer:
          "While Naan Mudhalvan is the primary government-funded program, RareMinds also collaborates with other initiatives offering financial assistance.",
      },
      {
        question: "Is funding available for all courses offered by RareMinds?",
        answer:
          "Funding is primarily available for courses aligned with government initiatives like Naan Mudhalvan.",
      },
      {
        question: "Can universities partner with RareMinds for funded programs?",
        answer:
          "Yes, educational universities can collaborate with RareMinds to offer funded programs to their students.",
      },
      {
        question: "How does government funding impact program quality?",
        answer:
          "Government funding ensures that programs are accessible without compromising on quality, as they are designed to meet industry standards and requirements.",
      },
    ],
  },
  {
    section: "Courses (Offerings Aligned with College Streams)",
    faqs: [
      {
        question: "What types of courses does RareMinds offer?",
        answer:
          "RareMinds offers a range of courses, including soft skills, technical skills, and industry-specific training tailored to various academic streams. Every course is focused on employment readiness.",
      },
      {
        question: "Are courses available for both undergraduate and postgraduate students?",
        answer:
          "Yes, courses are designed to cater to both undergraduate and postgraduate students.",
      },
      {
        question: "Can courses be customized for specific college streams?",
        answer:
          "Absolutely. RareMinds collaborates with universities to tailor courses that align with specific academic disciplines and industry needs.",
      },
      {
        question: "Are there courses focused on emerging technologies?",
        answer:
          "Yes. Each course is future-ready. For example, our Agritech course covers sustainable innovations, AI, and IoT applications in agriculture to ensure relevance in the evolving tech landscape.",
      },
      {
        question: "Do courses include practical components?",
        answer:
          "Many courses incorporate hands-on projects, case studies, real-world scenarios, and hackathons to enhance practical understanding.",
      },
      {
        question: "Are certifications provided upon course completion?",
        answer:
          "Yes, students receive certificates upon successfully completing courses, which can enhance their resumes and job prospects.",
      },
      {
        question: "How are courses delivered?",
        answer:
          "Courses are delivered through online platforms, in-person sessions, and hybrid models. Trainers are bilingual and content can be made available in the participant’s native language on request.",
      },
      {
        question: "Can universities request new course development?",
        answer:
          "Yes. All our courses are customizable. RareMinds collaborates with universities to co-develop new courses based on specific goals.",
      },
      {
        question: "Are there courses aimed at entrepreneurship?",
        answer:
          "Yes, RareMinds offers courses that focus on entrepreneurial skills, business development, and startup management.",
      },
      {
        question: "How is course content kept up-to-date?",
        answer:
          "Course materials are regularly reviewed and updated to reflect the latest industry standards and technological advancements.",
      },
    ],
  },
  {
    section: "Sessions (Alignment with Academic Calendars)",
    faqs: [
      {
        question: "Can RareMinds align training sessions with our academic calendar?",
        answer:
          "Yes, RareMinds works closely with universities to schedule sessions that complement academic timetables.",
      },
      {
        question: "Are sessions available during semester breaks?",
        answer:
          "Absolutely. RareMinds offers intensive programs during breaks to maximize student engagement without interfering with regular classes.",
      },
      {
        question: "How flexible are the session timings?",
        answer:
          "Session timings are customizable to fit the institution's schedule, including options for weekends and evenings.",
      },
      {
        question: "Can sessions be conducted online?",
        answer:
          "Yes, RareMinds provides online sessions to accommodate remote learning and ensure accessibility.",
      },
      {
        question: "Is there a minimum number of participants required for a session?",
        answer:
          "We are flexible. While group sessions are ideal, RareMinds can accommodate smaller batches or even 1:1 sessions based on the requirement.",
      },
      {
        question: "Are session materials provided in advance?",
        answer:
          "Yes, preparatory materials and resources are shared with participants ahead of sessions to facilitate effective learning.",
      },
      {
        question: "Can sessions be tailored for specific departments?",
        answer:
          "Yes. RareMinds works with each department to create customized learning experiences aligned with subject expertise and department goals.",
      },
      {
        question: "How are session outcomes evaluated?",
        answer:
          "Session effectiveness is measured through feedback forms, pre/post assessments, and reflection surveys from both students and faculty.",
      },
      {
        question: "Are there options for follow-up sessions?",
        answer:
          "Yes, RareMinds offers follow-up sessions and continuous learning opportunities to reinforce and build upon initial training.",
      },
      {
        question: "How far in advance should sessions be scheduled?",
        answer:
          "We recommend reaching out 2–4 weeks in advance to ensure ample time for customization, trainer alignment, and logistics planning.",
      },
    ],
  },
];

export default faqData;
