import { useAppSelector, useAppDispatch } from './useRedux';
import { useEffect } from 'react';
import { fetchServicesFromSupabase } from '@/features/recruitmentServiceSlice';

export const useRecruitmentService = () => {
  const dispatch = useAppDispatch();
  const services = useAppSelector((state) => state.recruitmentService.services);
  const loading = useAppSelector((state) => state.recruitmentService.loading);
  const error = useAppSelector((state) => state.recruitmentService.error);

  useEffect(() => {
    dispatch(fetchServicesFromSupabase());
  }, [dispatch]);

  return { services, loading, error };
};
