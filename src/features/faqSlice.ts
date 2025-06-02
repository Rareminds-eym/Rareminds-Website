import { createSlice } from '@reduxjs/toolkit';
import faqData, { FAQCategory } from '../data/faqData';

interface FAQState {
  faqs: FAQCategory[];
}

const initialState: FAQState = {
  faqs: faqData,
};

const faqSlice = createSlice({
  name: 'faq',
  initialState,
  reducers: {
    // Add reducers here if needed
  },
});

export default faqSlice.reducer;
export type { FAQState };
