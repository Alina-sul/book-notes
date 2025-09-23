import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: 'Open Sans, sans-serif',
    h1: {
      fontFamily: 'Literata, serif',
    },
    h2: {
      fontFamily: 'Literata, serif',
    },
    h3: {
      fontFamily: 'Literata, serif',
    },
    h4: {
      fontFamily: 'Literata, serif',
    },
    h5: {
      fontFamily: 'Literata, serif',
    },
    h6: {
      fontFamily: 'Literata, serif',
    },
  },
  palette: {
    primary: {
      main: '#000000',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
  },
  components: {
    // Fix IconButton hover states globally
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04) !important',
            color: '#000 !important',
          },
          '&.MuiIconButton-sizeSmall:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04) !important',
            color: '#000 !important',
          },
        },
        sizeSmall: {
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04) !important',
            color: '#000 !important',
          },
        },
      },
    },
    // Fix Button hover states for text buttons (like Cancel)
    MuiButton: {
      styleOverrides: {
        root: {
          '&.MuiButton-text:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04) !important',
            color: '#000 !important',
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04) !important',
            color: '#000 !important',
          },
        },
      },
    },
  },
});