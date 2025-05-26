import { configureStore } from '@reduxjs/toolkit';
import testimonialsReducer from './features/testimonialsSlice';
import faqReducer from './features/faqSlice';
import recruitmentServiceReducer from './features/recruitmentServiceSlice';

export const store = configureStore({
  reducer: {
    testimonials: testimonialsReducer,
    faq: faqReducer,
    recruitmentService: recruitmentServiceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
