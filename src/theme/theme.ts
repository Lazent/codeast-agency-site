import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8b5cf6',
    },
    secondary: {
      main: '#6366f1',
    },
    background: {
      default: '#000000',
      paper: '#0A0A0A',
    },
    text: {
      primary: '#ffffff',
      secondary: '#888888',
    },
    divider: 'rgba(255, 255, 255, 0.14)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.05em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.03em',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          scrollBehavior: 'smooth',
        },
        body: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#000000',
          overflowX: 'hidden',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          textTransform: 'none',
          fontWeight: 500,
          '&.MuiButton-containedPrimary': {
            backgroundColor: '#ffffff',
            color: '#000000',
            '&:hover': {
              backgroundColor: '#eaeaea',
            },
          },
          '&.MuiButton-outlinedPrimary': {
            borderColor: 'rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            '&:hover': {
              borderColor: '#8b5cf6',
              backgroundColor: 'rgba(139, 92, 246, 0.05)',
            },
          },
        },
      },
    },
  },
});

export default theme;