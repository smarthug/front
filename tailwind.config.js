/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dc: {
          // Mobile DCInside color palette
          bg: {
            main: '#F4F5F7',        // Light gray background (모바일 DC)
            board: '#FFFFFF',        // White board content
            hover: '#E8EEF3',        // Hover state (연한 파랑)
            header: '#3D5A80',       // Dark blue header (진한 파랑)
            footer: '#2C3E50',       // Dark footer
            notice: '#FFF9E6',       // Notice background
          },
          blue: {
            50: '#E3F2FD',
            100: '#BBDEFB',
            200: '#90CAF9',
            300: '#64B5F6',
            400: '#42A5F5',
            500: '#2196F3',          // Primary blue (모바일 DC)
            600: '#1E88E5',          // Link blue
            700: '#1976D2',          // Dark blue
            800: '#1565C0',
            900: '#0D47A1',
          },
          gray: {
            50: '#F8F9FA',
            100: '#F1F3F5',
            200: '#E9ECEF',          // Borders
            300: '#DEE2E6',
            400: '#ADB5BD',          // Secondary text
            500: '#868E96',
            600: '#495057',          // Primary text
            700: '#343A40',
            800: '#212529',
            900: '#0A0C0D',
          },
          border: {
            light: '#E9ECEF',        // Light borders
            default: '#DEE2E6',      // Default borders
            dark: '#ADB5BD',         // Dark borders
          },
        },
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.813rem', { lineHeight: '1.25rem' }],
        'base': ['0.875rem', { lineHeight: '1.5rem' }],
        'lg': ['1rem', { lineHeight: '1.5rem' }],
      },
      spacing: {
        '0.5': '0.125rem',
        '1': '0.25rem',
        '1.5': '0.375rem',
        '2': '0.5rem',
        '2.5': '0.625rem',
        '3': '0.75rem',
      },
    },
  },
  plugins: [],
}
