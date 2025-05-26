import { createSlice } from '@reduxjs/toolkit';
import { testimonialsData, Testimonial } from '../data/testimonialsData';

interface TestimonialsState {
  testimonials: Testimonial[];
}

const initialState: TestimonialsState = {
  testimonials: testimonialsData, // This already includes all testimonials from the data file
};

const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {
    // You can add reducers here if you want to add/remove testimonials
  },
});

export default testimonialsSlice.reducer;
export type { TestimonialsState };
