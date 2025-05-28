import { useAppSelector } from './useRedux';

export const useFAQ = () => {
  return useAppSelector((state) => state.faq.faqs);
};
