import { useAppSelector } from './useRedux';

export const useRecruitmentService = () => {
  return useAppSelector((state) => state.recruitmentService.services);
};
