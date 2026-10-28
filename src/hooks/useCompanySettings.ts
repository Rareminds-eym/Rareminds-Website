import { useQuery } from '@tanstack/react-query';
import { getCompanySettings } from '../services/companySettingsService';

export function useCompanySettings() {
  const query = useQuery({
    queryKey: ['company-settings'],
    queryFn: getCompanySettings,
  });

  const errorMessage = query.error instanceof Error
    ? query.error.message
    : query.error
      ? 'Unable to load company settings.'
      : null;

  return {
    ...query,
    settings: query.data ?? null,
    errorMessage,
  };
}
