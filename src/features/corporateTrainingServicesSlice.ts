import { createSlice, createSelector } from '@reduxjs/toolkit';
import { services } from '../pages/Corporate/Training/Services/serviceData';

interface CorporateTrainingServicesState {
  services: typeof services;
  loading: boolean;
  error: string | null;
}

const initialState: CorporateTrainingServicesState = {
  services: services,
  loading: false,
  error: null,
};

const corporateTrainingServicesSlice = createSlice({
  name: 'corporateTrainingServices',
  initialState,
  reducers: {
    // Add reducers here if needed for future functionality
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Selectors
export const selectAllServices = (state: { corporateTrainingServices: CorporateTrainingServicesState }) =>
  state.corporateTrainingServices.services;

export const selectServiceById = createSelector(
  [selectAllServices, (_state: any, serviceId: string) => serviceId],
  (services, serviceId) => services.find((service: any) => service.id === serviceId)
);

export const selectServicesForDisplay = createSelector(
  [selectAllServices],
  (services) => 
    services.map((service: any) => ({
      id: service.id,
      title: service.heroTitle,
      description: service.heroSubtitle,
    }))
);

// Selector for loading state
export const selectServicesLoading = (state: { corporateTrainingServices: CorporateTrainingServicesState }) =>
  state.corporateTrainingServices.loading;

// Selector for error state
export const selectServicesError = (state: { corporateTrainingServices: CorporateTrainingServicesState }) =>
  state.corporateTrainingServices.error;

// Selector for services count
export const selectServicesCount = createSelector(
  [selectAllServices],
  (services) => services.length
);

// Selector for services by category
export const selectServicesByCategory = createSelector(
  [selectAllServices],
  (services) => {
    const categorizedServices: Record<string, any[]> = {};
    services.forEach((service: any) => {
      const category = service.id;
      if (!categorizedServices[category]) {
        categorizedServices[category] = [];
      }
      categorizedServices[category].push(service);
    });
    return categorizedServices;
  }
);

export const { setLoading, setError } = corporateTrainingServicesSlice.actions;
export default corporateTrainingServicesSlice.reducer;
export type { CorporateTrainingServicesState };
