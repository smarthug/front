/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dc: {
          navy: {
            900: '#0f1b4d',
            800: '#152460',
            700: '#1d2f78',
            600: '#243a90',
            500: '#2c4aa6',
          },
          yellow: {
            400: '#ffd54f',
            500: '#ffbd2f',
            600: '#f5a800',
          },
          bg: {
            main: '#f1f3f6',
            board: '#ffffff',
            hover: '#f7f8fc',
            header: '#152460',
            subheader: '#1d2f78',
            divider: '#d7dbe6',
            notice: '#fff8d7',
          },
          gray: {
            50: '#f9fafc',
            100: '#f1f3f6',
            200: '#e4e7ed',
            300: '#d3d7df',
            400: '#b2b8c3',
            500: '#9299a6',
            600: '#707785',
            700: '#4e5564',
            800: '#303846',
          },
          red: {
            500: '#ff3b30',
            600: '#e63227',
          },
          blue: {
            500: '#2f6bff',
          },
          green: {
            500: '#20b25d',
          },
        },
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.813rem', { lineHeight: '1.25rem' }],
        base: ['0.875rem', { lineHeight: '1.45rem' }],
        lg: ['1rem', { lineHeight: '1.5rem' }],
      },
      spacing: {
        0.5: '0.125rem',
        1: '0.25rem',
        1.5: '0.375rem',
        2: '0.5rem',
        2.5: '0.625rem',
        3: '0.75rem',
      },
      boxShadow: {
        'dc-card': '0 1px 3px rgba(8, 12, 40, 0.12)',
      },
    },
  },
  plugins: [],
}
