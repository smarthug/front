import { createTheme } from '@mui/material/styles'

// 디시인사이드 스타일 색상 팔레트
const theme = createTheme({
  palette: {
    primary: {
      main: '#0a0e3c', // dc-navy-900
      dark: '#141a52', // dc-navy-700
      light: '#1e2570',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ffd400', // dc-yellow-500
      dark: '#f0c000', // dc-yellow-400
      light: '#ffe14d',
      contrastText: '#0a0e3c',
    },
    error: {
      main: '#ef4444',
      light: '#fecaca',
    },
    success: {
      main: '#10b981',
      light: '#d1fae5',
    },
    info: {
      main: '#3b82f6',
      light: '#dbeafe',
    },
    warning: {
      main: '#f59e0b',
      light: '#fef3c7',
    },
    grey: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    background: {
      default: '#f3f4f6', // dc-bg-main
      paper: '#fff',
    },
    divider: '#e5e7eb',
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.125rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontWeight: 600,
        },
        containedPrimary: {
          backgroundColor: '#0a0e3c',
          '&:hover': {
            backgroundColor: '#141a52',
          },
        },
        containedSecondary: {
          backgroundColor: '#ffd400',
          color: '#0a0e3c',
          '&:hover': {
            backgroundColor: '#f0c000',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#ffd400',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ffd400',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        },
      },
    },
  },
})

export default theme
