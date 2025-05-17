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

      transformOrigin: {
        '3d': 'preserve-3d',
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(179.38deg, rgba(194, 251, 255, 0.203) 8.57%, rgba(255, 99, 99, 0.077) 57.93%, rgba(160, 248, 184, 0.182) 113.51%)",
      },
      transitionProperty: {
        width: "width",
      },
      // colors: {
      //   "placeholder-red": "#D9D9D9", // or any shade of red you prefer
      //   "overlay-color": "#000000e6",
      // },
      animation: {
        'scroll': 'scroll 40s linear infinite',
        marquee: 'marquee 25s linear infinite',
        'testimonial-scroll': 'testimonial-scroll var(--duration, 10s) linear infinite',
        'testimonial-scroll-down': 'testimonial-scroll-down var(--duration, 10s) linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'testimonial-scroll': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        'testimonial-scroll-down': {
          '0%': { transform: 'translateY(-50%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        'scroll-pause': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
    variants: {
    extend: {
      animation: ['hover', 'group-hover'],
    },
  },
  },
   plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.transform-style-3d': {
          transformStyle: 'preserve-3d',
        },
      });
    },
  ],
} as const;