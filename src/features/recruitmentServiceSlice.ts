import { createSlice } from '@reduxjs/toolkit';
import { serviceData } from '../data/recruitment_serviceData';

interface RecruitmentServiceState {
  services: typeof serviceData;
}

const initialState: RecruitmentServiceState = {
  services: serviceData,
};

const recruitmentServiceSlice = createSlice({
  name: 'recruitmentService',
  initialState,
  reducers: {
    // Add reducers here if needed
  },
});

export default recruitmentServiceSlice.reducer;
export type { RecruitmentServiceState };
