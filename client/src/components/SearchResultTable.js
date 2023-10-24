import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
}));

const SearchResultTable = () => {
  const classes = useStyles();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [searchData, setSearchData] = useState({
    line:'',
    source: '',
    target: '',
    poet: '',
    poem: '',
    year: '',
    mood: ''
  });

  const [rows, setRows] = useState([]);

  const handleChange = (event) => {
    setSearchData({
      ...searchData,
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
    fetch(`${apiUrl}/metaphors`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        const allData = data.map((item) => ({
          id: item._id,
          poet: item._source.poet,
          poem: item._source.poem,
          source: item._source.source,
          target: item._source.target,
          year: item._source.year,
          mood: item._source.mood,
          interpretation: item._source.interpretation,
          metaphor: item._source.line,
        }));
        setRows(allData);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleSearch = () => {
    const searchDataToSend = { ...searchData };
    fetch(`${apiUrl}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(searchDataToSend), 
    })
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.map((item) => ({
          id: item._id,
          poet: item._source.poet,
          poem: item._source.poem,
          source: item._source.source,
          target: item._source.target,
          year: item._source.year,
          mood: item._source.mood,
          interpretation: item._source.interpretation,
          metaphor: item._source.line
        }));
        setRows(filteredData);
      })
      .catch((error) => {
        console.error('Error');
      });
  };

  const columns = [
    { field: 'metaphor', headerName: 'Metaphor', width: 200 },
    { field: 'interpretation', headerName: 'Interpretation', width: 300 },
    { field: 'source', headerName: 'Source', width: 150 },
    { field: 'target', headerName: 'Target', width: 150 },
    { field: 'poet', headerName: 'Poet', width: 150 },
    { field: 'poem', headerName: 'Poem', width: 150 },
    { field: 'year', headerName: 'Year', width: 150 },
    { field: 'mood', headerName: 'Mood', width: 150 }
  ];

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Poet"
            name="poet"
            value={searchData.poet}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Poem"
            name="poem"
            value={searchData.poem}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Source"
            name="source"
            value={searchData.source}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Target"
            name="target"
            value={searchData.target}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Year"
            name="year"
            value={searchData.year}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Mood"
            name="mood"
            value={searchData.mood}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
    </div>
  );
};

export default SearchResultTable;
