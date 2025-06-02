import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchRecruitmentServices } from '../lib/supabaseFunctions';

interface RecruitmentServiceState {
  services: any[];
  loading: boolean;
  error: string | null;
}

const initialState: RecruitmentServiceState = {
  services: [],
  loading: false,
  error: null,
};

export const fetchServicesFromSupabase = createAsyncThunk(
  'recruitmentService/fetchServices',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchRecruitmentServices();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch services');
    }
  }
);

const recruitmentServiceSlice = createSlice({
  name: 'recruitmentService',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServicesFromSupabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServicesFromSupabase.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload || [];
      })
      .addCase(fetchServicesFromSupabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default recruitmentServiceSlice.reducer;
export type { RecruitmentServiceState };
