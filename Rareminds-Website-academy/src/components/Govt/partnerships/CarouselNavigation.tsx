
import { TestimonialNavigation } from "./TestimonialNavigation";
import { TestimonialCarouselProps } from "@/types/partnerships";

export const CarouselNavigation = ({
  currentIndex,
  totalItems,
  onPrevious,
  onNext,
}: TestimonialCarouselProps) => {
  return (
    <div className="w-full flex justify-center mt-6 sm:mt-8 md:mt-10">
      <TestimonialNavigation
        currentIndex={currentIndex}
        totalItems={totalItems}
        onPrevious={onPrevious}
        onNext={onNext}
      />
    </div>
  );
};
