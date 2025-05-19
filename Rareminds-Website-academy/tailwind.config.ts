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
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        corporate: {
          primary: "#107DFE",
          secondary: "#04DEBF",
          accent: "#F64A89",
          black: "#000000",
          purple: "#4F2D91",
          yellow: "#F4B128"
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        scroll: 'scroll 40s linear infinite',
        marquee: 'marquee 25s linear infinite',
        'testimonial-scroll': 'testimonial-scroll var(--duration, 10s) linear infinite',
        'testimonial-scroll-down': 'testimonial-scroll-down var(--duration, 10s) linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
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
      transitionTimingFunction: {
        'scroll-pause': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'group-hover'],
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
