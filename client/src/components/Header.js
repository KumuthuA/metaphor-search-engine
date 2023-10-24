// src/components/Header.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search'; // Import the MUI icon you want to use

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    marginRight: theme.spacing(2), 
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <SearchIcon className={classes.logo} fontSize="large" /> 
        <Typography variant="h6" className={classes.title}>
          Metaphor Search Engine
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
