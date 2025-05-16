
import { TestimonialQuote } from "@/types/testimonial";

interface TestimonialCardProps {
  data: TestimonialQuote;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ data }) => {
  return (
    <div 
      className="rounded-xl sm:rounded-2xl bg-white/60 shadow-md px-4 sm:px-6 py-4 sm:py-5 text-left flex flex-col"
      style={{
        backdropFilter: 'blur(3px)'
      }}
    >
      <div className="font-semibold text-sm sm:text-base mb-1">{data.title}</div>
      <div className="text-sm sm:text-base text-gray-700 mb-2">{data.quote}</div>
      <div className="text-xs sm:text-sm font-medium text-gray-500">{data.author}</div>
    </div>
  );
};
