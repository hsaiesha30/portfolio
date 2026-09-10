/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        generalsans: ['General Sans', 'sans-serif'],
      },
      colors: {
        // Realistic space colors
        space: {
          DEFAULT: '#000511', // True deep space
          100: '#000715', // Slightly lighter deep space
          200: '#0F1419', // Dark space blue
          300: '#1B1F3A', // Deep space navy
          400: '#2A2D47', // Medium space
          500: '#363B5C', // Lighter space
          600: '#424A6B', // Space blue-gray
          700: '#4F5A7A', // Light space blue
          800: '#5C6B89', // Very light space
          900: '#697C98', // Lightest space blue
        },
        // Realistic cosmic colors
        cosmic: {
          nebula: '#4A148C', // Deep purple nebula
          starblue: '#B3E5FC', // Blue-white star
          staryellow: '#FFF9C4', // Yellow-white star
          starwhite: '#F8F8FF', // Pure white star  
          galaxy: '#673AB7', // Galaxy purple
          plasma: '#FF4081', // Plasma pink
          aurora: '#00E676', // Aurora green
          comet: '#40C4FF', // Comet blue
        },
        // Keep original colors for compatibility
        black: {
          DEFAULT: '#000',
          100: '#010103',
          200: '#0E0E10',
          300: '#1C1C21',
          500: '#3A3A49',
          600: '#1A1A1A',
        },
        white: {
          DEFAULT: '#FFFFFF',
          800: '#E4E4E6',
          700: '#D6D9E9',
          600: '#AFB0B6',
          500: '#62646C',
        },
      },
      backgroundImage: {
        terminal: "url('/assets/terminal.png')",
      },
    },
  },
  plugins: [],
};
