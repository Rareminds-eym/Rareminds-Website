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
    section: "Students (EEE Certificate Course FAQs)",
    faqs: [
      {
        question: "What exactly am I going to gain from the EEE Certificate Course?",
        answer: "You'll enhance your English communication, develop confidence for job interviews, and understand how to make your own business plan, all in a single course. It's not theory, it's skills you'll apply in real life.",
      },
      {
        question: "Will the course enable me to find a job quicker?",
        answer: "Absolutely! Students who take this course feel more confident and ready for placements. You'll discover how to create a good resume, respond to interview questions, and introduce yourself professionally, all skills that catch the attention of employers.",
      },
      {
        question: "Will this course help me speak better in English?",
        answer: "Definitely. The program comprises hands-on speaking sessions, presentations, and discussions that make you fluent and confident step by step, even if you're beginning from zero.",
      },
      {
        question: "Will we just sit through lectures, or is it hands-on?",
        answer: "It's highly interactive. You'll be engaging in group discussions, mock interviews, business planning activities, and even presenting your own ideas. It's meant to be practical, not tedious.",
      },
      {
        question: "What will I be tested on? Is it hard to pass?",
        answer: "Each module has easy assignments, projects, and activities. No intimidating exams, you'll be tested on practical exercises such as writing a resume or pitching a business concept.",
      },
      {
        question: "How long is the course and when does it happen?",
        answer: "It runs over 3 semesters (around 75 hours total), and you’ll attend classes as part of your regular timetable, so it doesn’t feel like an extra burden.",
      },
      {
        question: "Can I use this course to begin a small business of my own?",
        answer: "Yes! The entrepreneurship module will show you how to identify ideas, develop your business, handle money, and market your product or service. Many students launch side hustles or actual ventures from this course.",
      },
      {
        question: "What if I'm not good at English or don't know anything about business?",
        answer: "The course is geared for beginners and is suitable for anyone, no matter how self-assured you are or how new you are to online courses. You will have assistance at every turn.",
      },
      {
        question: "Will I work in groups?",
        answer: "Yes. You’ll collaborate on activities like brainstorming business ideas or practicing interviews. Group work helps build teamwork and communication skills.",
      },
    ],
  },
];


export default faqData;
