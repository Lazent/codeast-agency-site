import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#0070f3',
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
  // Замени только блок components в src/theme/theme.ts:
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          textTransform: 'none',
          fontWeight: 500,
          // Стили для contained кнопок
          '&.MuiButton-containedPrimary': {
            backgroundColor: '#ffffff',
            color: '#000000',
            '&:hover': {
              backgroundColor: '#eaeaea',
            },
          },
          // Стили для outlined кнопок
          '&.MuiButton-outlinedPrimary': {
            borderColor: 'rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            '&:hover': {
              borderColor: '#ffffff',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            },
          },
        },
      },
    },
  },
});

export default theme;