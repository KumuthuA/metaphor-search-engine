// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6b0772', // Change this to your primary color
    },
    secondary: {
      main: '#FF5722', // Change this to your secondary color
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Change this to your preferred font
  },
});

export default theme;
