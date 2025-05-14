import { color } from "framer-motion";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        corporate: {
          primary: "#107DFE",
          secondary: "#04DEBF",
          accent: "#F64A89",
          black: "#000000",
          purple: "#4F2D91",
          yellow: "#F4B128"
        },
      },
    },
  },
  plugins: [],
} as const;