
import { ArrowLeft, ArrowRight } from "lucide-react";
import clsx from "clsx";

interface TestimonialNavigationProps {
  currentIndex: number;
  totalItems: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const TestimonialNavigation: React.FC<TestimonialNavigationProps> = ({
  currentIndex,
  totalItems,
  onPrevious,
  onNext,
}) => {
  return (
    <div className="flex gap-3 sm:gap-4 items-center">
      <button
        aria-label="Previous testimonial"
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className={clsx(
          "h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 flex items-center justify-center rounded-full bg-[#FF6366]/80 text-white",
          "shadow transition hover:scale-105",
          currentIndex === 0 && "opacity-30 pointer-events-none"
        )}
        style={{ background: "linear-gradient(to bottom, #FF6366, #ea384c)" }}
      >
        <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
      <div className="flex gap-1.5 sm:gap-2">
        {Array.from({ length: totalItems }).map((_, dot) => (
          <span
            key={dot}
            className={clsx(
              "inline-block h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3 rounded-full transition",
              dot === currentIndex ? "bg-[#FF6366]" : "bg-[#FF6366]/30"
            )}
          />
        ))}
      </div>
      <button
        aria-label="Next testimonial"
        onClick={onNext}
        disabled={currentIndex === totalItems - 1}
        className={clsx(
          "h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 flex items-center justify-center rounded-full bg-[#FF6366]/80 text-white",
          "shadow transition hover:scale-105",
          currentIndex === totalItems - 1 && "opacity-30 pointer-events-none"
        )}
        style={{ background: "linear-gradient(to bottom, #FF6366, #ea384c)" }}
      >
        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </div>
  );
};
