
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../UI/accordion";
import { Button } from "../UI/button";
import { Input } from "../UI/input";
// import { toast } from "./../UI/sonner";

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "How many faculty can be trained per FDP?",
    answer: "We recommend batches of 30–50 for interactive sessions, but can scale based on your needs.",
  },
  {
    question: "Can we customize the training to suit our school's goals?",
    answer: "Absolutely. Every module can be tailored based on your institution's context, goals, and audience.",
  },
  {
    question: "What digital tools do you cover in the FDPs?",
    answer: "Google Workspace, LMS platforms, interactive quiz apps, video tools, classroom engagement tools, and more.",
  },
  {
    question: "Are your programs aligned with NEP 2020?",
    answer: "Every program is rooted in NEP 2020's objectives and designed for practical classroom transformation.",
  },
];

const FaqAndContact = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [email, setEmail] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (email) {
//       toast.success("Thank you! We'll be in touch soon.");
//       setEmail("");
//     } else {
//       toast.error("Please enter your email address.");
//     }
//   };

  return (
    <div className="flex flex-col md:flex-row gap-10 lg:gap-20 md:mt-8">
      <div className="w-full md:w-2/3">
        <div className="w-full max-w-3xl">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-gray-200 rounded-md shadow-sm overflow-hidden"
              >
                <AccordionTrigger className="flex justify-between items-center p-4 hover:bg-gray-50">
                  <span className="font-medium text-left">{item.question}</span>
                  <div className="w-6 h-6 rounded-full bg-turquoise flex items-center justify-center text-white min-w-[24px]">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2 text-gray-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* <div className="flex justify-center mt-6">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mx-1 cursor-pointer">
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </div> */}
            {/* <div className="w-8 h-8 rounded-full bg-turquoise text-white flex items-center justify-center mx-1 cursor-pointer">
              <span>2</span>
            </div> */}
          {/* </div> */}
        </div>
      </div>
      
      <div className="w-full md:w-1/3 mt-10 md:mt-0">
        <div className="flex flex-col items-center">
          <div className="w-60 h-60 mb-4">
            <img 
              src="/images/academy/TeacherQuestion.svg" 
              alt="Question mark illustration" 
              className="w-full h-full object-contain"
            />
          </div>
          
          <h2 className="text-2xl font-semibold mb-2">Any Question?</h2>
          <p className="text-gray-500 text-center mb-6 max-w-xs">
            You can ask us anything you want, we're here to answer your questions.
          </p>
          
          <div className="w-full">
            <p className="text-gray-500 mb-2 text-sm">Let me know</p>
            {/* <form onSubmit={handleSubmit} className="space-y-4">
             */}
             <form className="space-y-4">
              <Input
                placeholder="Enter email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-gray-300"
              />
              <Button 
                type="submit" 
                className="w-full bg-red-500 hover:bg-red-600 text-black rounded-full"
              >
                Send
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqAndContact;
