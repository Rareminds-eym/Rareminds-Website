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
        // NaanStrategicAlignment component dimensions
        'icon-lg': '38px',            // Desktop icon circle width/height
        'icon-md': '34px',            // Tablet icon circle width/height  
        'icon-sm': '28px',            // Mobile icon box width/height
        'card-padding-lg': '18px',    // Desktop card padding
        'card-padding-md': '12px',    // Tablet card padding
        'card-padding-sm': '14px',    // Mobile card padding Y
        'card-width': '270px',        // Desktop card width
        'card-height': '180px',       // Desktop card height
        'card-min-height': '140px',   // Tablet card minHeight
        'content-max': '520px',       // Description maxWidth
        'section-max': '860px',       // Section container maxWidth
        'desktop-width': '810px',     // Desktop layout width
        'desktop-height': '460px',    // Desktop layout height
        // NaanStrategicAlignment spacing with semantic names
        'spine-offset': '15px',       // Mobile spine positioning
        'icon-offset-sm': '17px',     // Tablet icon negative margin
        'card-gap': '20px',           // Mobile card gap, tablet icon positive margin
        'icon-offset-lg': '22px',     // Desktop icon negative margin
        'icon-margin': '23px',        // Desktop icon positive margin
        'mobile-container': '340px',  // Mobile container max width
        'tablet-height': '480px',     // Tablet layout height
        // Layout positioning values
        'tablet-dot-top': '214px',    // Tablet dot top position
        'tablet-line-top': '220px',   // Tablet line top position
        'hline-height': '3px',        // Horizontal line height
        // Pre-calculated positioning (LINE_Y = 240)
        'desktop-dot-top': '235px',   // Desktop dot top position (LINE_Y - 5)
        'desktop-card-top': '221px',  // Desktop card top position (LINE_Y - ICON_R)
        'timeline-center': '240px',   // Timeline center line position (LINE_Y)
        // Array-based positioning
        'pos-start': '0px',           // Starting position
        'pos-end': '410px',           // End position
        'pos-left': '200px',          // Left bottom position
        'pos-right': '570px',         // Right bottom position
        // Negative positioning
        'neg-offset': '6px',          // Negative positioning offset
        // Additional positioning values
        'card-top-offset': '-20px',   // Desktop card top offset
        'tablet-card-top': '30px',    // Tablet card top position
        'tablet-icon-top': '203px',   // Tablet icon top position
        'tablet-card-width': '200px', // Tablet card container width
        // NaanAboutProgramme component dimensions
        'main-card-width': '46%',     // Main course card width
        'bottom-card-height': '42%',  // Bottom course card height
        // NaanConclusion component dimensions
        'conclusion-container': '1100px',  // Container max width
        'conclusion-shape-sm': '420px',    // Tablet blue shape width
        'conclusion-shape-lg': '450px',    // Desktop blue shape width
        'conclusion-shape-h-sm': '320px',  // Tablet blue shape height
        'conclusion-shape-h-lg': '350px',  // Desktop blue shape height
        'conclusion-img-sm': '360px',      // Tablet image max width
        'conclusion-img-lg': '400px',      // Desktop image max width
        'conclusion-img-h-sm': '300px',    // Tablet image height
        'conclusion-img-h-lg': '330px',    // Desktop image height
        'conclusion-mobile-shape': '260px', // Mobile blue shape width
        'conclusion-mobile-img': '240px',   // Mobile image max width
        'conclusion-mobile-h': '210px',     // Mobile blue shape height
        'conclusion-mobile-img-h': '200px', // Mobile image height
        'conclusion-mobile-container': '220px', // Mobile container height
        'conclusion-flex-base': '480px',    // Desktop flex basis
        // Blue decorative box positioning values
        'blue-box-tablet-bottom': '-38px',  // Tablet blue box bottom position
        'blue-box-desktop-bottom': '-55px', // Desktop blue box bottom position  
        'blue-box-desktop-left': '22px',    // Desktop blue box left position
        // Card minimum heights
        'Naancard-min-height': '280px',         // NaanConclusion card minimum height
        // NaanCourseEnrollment component dimensions
        'course-card-min': '420px',        // Grid minmax minimum width
        'course-scroll-height': '144px',   // University list max height
        'course-row-height': '40px',       // University row min height
        'course-last-odd-width': 'calc(50% - 12px)', // Last odd item max width
      },
      fontSize: {
        // NaanCourseEnrollment responsive font sizes
        'course-title': 'clamp(13px, 3.5vw, 18px)',     // Course card title
        'course-count': 'clamp(13px, 3.5vw, 18px)',     // Total count
        'course-uni-name': 'clamp(11px, 3vw, 14px)',    // University name
        'course-uni-count': 'clamp(11px, 3vw, 14px)',   // University count
      },
      lineHeight: {
        'tight-plus': '1.35', // Card titles
      },
      letterSpacing: {
        'course-tight': '-1.9px',    // Mobile word spacing for course descriptions
        'conclusion-tight': '-1.8px', // NaanConclusion mobile word spacing
      },
      padding: {
        // NaanCourseEnrollment responsive padding
        'course-card': 'clamp(14px, 4vw, 32px)',        // Card padding
        'course-row': '6px clamp(6px, 2vw, 12px)',      // University row padding
      },
      transformOrigin: {
        'top-center': 'top center',   // Animation transform origin
        'left-center': 'left center', // Line growth origin
        '3d': 'preserve-3d',          // Existing 3D transform origin (DO NOT REMOVE)
      },
      boxShadow: {
        'conclusion-card': '8px 8px 20px rgba(0,0,0,0.12)', // NaanConclusion card shadow
      },
      dropShadow: {
        'blue-box': '0 8px 10px rgba(79,62,236,0.25)',
      },
      gridTemplateColumns: {
        'course-auto-fit': 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', // NaanCourseEnrollment grid
      },
      borderWidth: {
        '1.5': '1.5px',  // Card border width from NaanStrategicAlignment
      },
      ringWidth: {
        'icon-outline': '3px',     // Icon outline ring (Lines 139, 155)
      },
      ringOffsetWidth: {
        'icon-offset': '2px',      // Icon outline offset (Lines 139, 155)
        'icon-offset-sm': '1px',   // Mobile icon outline offset (Line 625)
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
        teal: {
          custom: '#3BA3C7',  // TEAL constant from NaanStrategicAlignment
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
          // Course card colors from BG_COLORS array
          'course-1': '#4a90d9',       // Primary course card
          'course-2': '#6aaee8',       // Secondary course card
          'course-3': '#8ec0f0',       // Tertiary course card
          'course-4': '#7ab8ec',       // Quaternary course card
          // NaanConclusion colors
          'conclusion-bg': '#e0eeff',  // Blue decorative background
          'conclusion-btn': '#5BA4CF', // Button background color
          'conclusion-btn-hover': '#4A93BE', // Button hover color
          // NaanCourseEnrollment colors
          'course-icon-bg': '#EDF5FF', // Course card icon background
          'course-row-bg': '#EDF5FF',  // University row background
          'course-scrollbar': '#BFDBFE', // Scrollbar color
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
        'image-column-tablet': '0 0 100%',  // Full-width flex item for image column in tablet layout - 100% ensures image spans entire container width on smaller screens},
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
        'scroll-vertical': 'scroll-vertical 25s linear infinite',
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
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(calc(-1 * var(--scroll-height, 0px)))' },
        },
        'scroll-horizontal': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-1 * var(--scroll-width, 0px)))' },
        },
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
        },
        '.course-scrollbar': {
          'scrollbar-width': 'thin',
          'scrollbar-color': '#BFDBFE transparent',
        },
      });
    },
  ],
} as const;
