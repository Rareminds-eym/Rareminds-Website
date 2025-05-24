import { configureStore } from '@reduxjs/toolkit';
import testimonialsReducer from './features/testimonialsSlice';
import faqReducer from './features/faqSlice';

export const store = configureStore({
  reducer: {
    testimonials: testimonialsReducer,
    faq: faqReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
