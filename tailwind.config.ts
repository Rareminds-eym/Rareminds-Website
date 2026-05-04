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
      spacing: {
        'gallery-thumb': '4.5rem',    // 72px - MediaGallery mobile thumbnail height
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
        blue: {
          'card-bg': '#EFF6FF',        // Blue card background
          'timeline-bg': '#D2E8FE',    // Timeline background
          'icon-primary': '#5BA8D8',   // Icon color
          'border-light': '#DBEAFE',   // Border color
          'section-bg': '#F0F8FF',       // Blue light background
        },
        gray: {
          850: '#0f1c2e',      // Dark text
          650: '#5a6a7e',      // Medium text
        },
        green: {
          'soft-bg': '#F5F9FF',        // Green soft background (blue-green tint)
          'accent-bg': '#F2FFF9',      // Green accent background
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
      borderRadius: {
        'stat-1': '50px 15px 50px 15px',  // Custom asymmetric design - requires precise pixel values for visual balance
        'stat-2': '15px 50px 15px 50px',  // Alternating asymmetric pattern - matches design system requirements
        'blue-shape': '215px',            // Large decorative radius - specific to design mockup specifications
        'card-asymmetric': '15px 15px 80px 15px', // Unique card shape - designer-specified values for brand identity
      },
      strokeWidth: {
        'icon': '1.8',  // Icon stroke width for better visual consistency
      },
      width: {
        'mobile-player': '85%',   // Mobile media player width - 85% intentionally chosen for optimal mobile viewing (not spacing scale) to maintain responsive margins while maximizing content area
        'max-content': 'max-content',  // Width based on content size - CSS intrinsic value required for horizontal scrolling animations
      },
      left: {
        'center-offset': 'calc(50% - 195px)',  // Centers decorative elements on tablet screens - 195px is half of standard content width (390px) for precise alignment with content boundaries
      },
      flex: {
        'image-column': '0 0 480px',  // Fixed flex item for image column in desktop layout - 480px is design-specified width for optimal image display and content balance
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        scroll: 'scroll 40s linear infinite',
        marquee: 'marquee 25s linear infinite',
        'testimonial-scroll': 'testimonial-scroll var(--duration, 10s) linear infinite',
        'testimonial-scroll-down': 'testimonial-scroll-down var(--duration, 10s) linear infinite',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-out': 'fade-out 0.2s ease-in forwards',
        'slide-down': 'slide-down 0.2s ease-in forwards',
        'spin-slow': 'spin 8s linear infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'drift': 'drift 10s ease-in-out infinite',
        'scroll-vertical':   'scroll-vertical 25s linear infinite',
        'scroll-horizontal': 'scroll-horizontal 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(5deg)' },
          '66%': { transform: 'translateY(-5px) rotate(-3deg)' },
        },
        morph: {
          '0%, 100%': { 
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            transform: 'scale(1) rotate(0deg)'
          },
          '50%': { 
            borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%',
            transform: 'scale(1.1) rotate(180deg)'
          },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.3)'
          },
          '50%': { 
            boxShadow: '0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4)'
          },
        },
        drift: {
          '0%': { transform: 'translateX(0px) translateY(0px)' },
          '25%': { transform: 'translateX(20px) translateY(-10px)' },
          '50%': { transform: 'translateX(-10px) translateY(-20px)' },
          '75%': { transform: 'translateX(-20px) translateY(10px)' },
          '100%': { transform: 'translateX(0px) translateY(0px)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(16px) scale(0.96)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(16px) scale(0.96)', opacity: '0' },
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
        'scroll-vertical': {
          '0%':   { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(calc(-1 * var(--scroll-height, 0px)))' },
        },
        'scroll-horizontal': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-1 * var(--scroll-width, 0px)))' },
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
        '.card-shape-left': {
          'clip-path': 'polygon(8% 6%, 100% 0%, 100% 100%, 8% 94%)',
        },
        '.card-shape-right': {
          'clip-path': 'polygon(0% 0%, 92% 6%, 92% 94%, 0% 100%)',
        },
        '.breakout': {                             
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        width: '100vw', 
        }
      });
    },
  ],
} as const;
