import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type FAQItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
};

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        className="flex w-full justify-between items-center text-left focus:outline-none"
        onClick={onClick}
      >
        <span className="font-medium text-gray-800">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "How many faculty can be trained per PDP?",
      answer: "We can typically accommodate up to 30 faculty members per Professional Development Program. However, this number can be adjusted based on your institution's specific requirements."
    },
    {
      question: "Can we customize the training to our needs?",
      answer: "Yes, all our training programs are fully customizable to meet the specific needs and goals of your faculty and institution."
    },
    {
      question: "What digital tools are covered?",
      answer: "Our training covers a wide range of digital tools including learning management systems, online assessment tools, video conferencing platforms, and other educational technology resources relevant to your faculty's needs."
    },
    {
      question: "Is this NEP-aligned?",
      answer: "Yes, our faculty development programs are designed to align with the National Education Policy guidelines and objectives for higher education."
    },
    {
      question: "Do you provide post-training support?",
      answer: "Absolutely! We offer comprehensive post-training support including follow-up sessions, resource materials, and on-demand assistance to ensure successful implementation of learned skills."
    },
    {
      question: "Can we get assessments of our faculty's progress?",
      answer: "Yes, we provide detailed assessment reports that track faculty progress, engagement, and skill development throughout the training program."
    }
  ];

  return (
    <section className="max-w-3xl mx-auto py-16 px-4 sm:px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">Still Have Questions?</h2>
        <p className="text-gray-600">Find answers to commonly asked questions about our faculty development programs</p>
      </div>
      <div className="space-y-0 text-[14px] ">
        {faqItems.map((item, index) => (
          <FAQItem 
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;