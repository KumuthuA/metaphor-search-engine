import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7852A9', 
      // main: '#B660CD', 
      // main: '#00C9A7', 

    },
    secondary: {
      main: '#B39CD0', 
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', 
  },
});

export default theme;
