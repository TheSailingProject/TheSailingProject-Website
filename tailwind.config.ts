import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          beige: {
            50: '#fdfcfb',
            100: '#f9f5f0',
            200: '#f0e8dc',
            300: '#e8dcc8', // Primary beige from logo
            400: '#dfd0b4',
            500: '#d6c4a0',
            600: '#c3ad84',
            700: '#9d8a68',
            800: '#77684d',
            900: '#514632',
          },
          blue: {
            50: '#e8ecf1',
            100: '#d1d9e3',
            200: '#a3b3c7',
            300: '#748dab',
            400: '#46678f',
            500: '#2f4566', // Primary navy from logo
            600: '#263752',
            700: '#1c293d',
            800: '#131c29',
            900: '#090e14',
          },
          orange: {
            50: '#fef5ed',
            100: '#fceadb',
            200: '#f9d5b7',
            300: '#f6c093',
            400: '#f3ab6f',
            500: '#e88543', // Primary orange from logo
            600: '#d66b1f',
            700: '#a55218',
            800: '#743a11',
            900: '#43210a',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-cal-sans)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
