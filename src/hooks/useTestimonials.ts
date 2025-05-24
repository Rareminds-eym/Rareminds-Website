import { useAppSelector } from './useRedux';

export const useTestimonials = () => {
  return useAppSelector((state) => state.testimonials.testimonials);
};
