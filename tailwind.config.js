/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#E9F0FE',
            100: '#C7D9FD',
            200: '#95B6FA',
            300: '#6592F7',
            400: '#3B82F6', // Primary
            500: '#1A6DEF',
            600: '#0B5ED9',
            700: '#0A4BAE',
            800: '#083A87',
            900: '#052963',
          },
          accent: {
            400: '#9333EA', // Purple accent
          },
          success: {
            400: '#10B981', // Green success
          },
          warning: {
            400: '#F59E0B', // Amber warning
          },
          error: {
            400: '#EF4444', // Red error
          },
        },
        fontFamily: {
          'inter': ['Inter', 'sans-serif'],
        },
        boxShadow: {
          'glow': '0 0 15px rgba(59, 130, 246, 0.5)',
        },
        animation: {
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
        backdropBlur: {
          xs: '2px',
        },
      },
    },
    plugins: [],
  }