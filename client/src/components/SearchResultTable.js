// import React from 'react';
// import Paper from '@mui/material/Paper';
// import TableContainer from '@mui/material/TableContainer';
// import Table from '@mui/material/Table';
// import TableHead from '@mui/material/TableHead';
// import TableBody from '@mui/material/TableBody';
// import TableRow from '@mui/material/TableRow';
// import TableCell from '@mui/material/TableCell';

// const SearchResultTable = ({ results }) => {
//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Column1</TableCell>
//             <TableCell>Column2</TableCell>
//             <TableCell>Column3</TableCell>
//             {/* Add more columns for your data */}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {results.map((result, index) => (
//             <TableRow key={index}>
//               <TableCell>{result.column1}</TableCell>
//               <TableCell>{result.column2}</TableCell>
//               <TableCell>{result.column3}</TableCell>
//               {/* Map and display more data as needed */}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default SearchResultTable;


// SearchComponent.js
import React, { useState } from 'react';
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
  const [searchData, setSearchData] = useState({
    poet: '',
    poem: '',
    source: '',
    target: '',
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

  const handleSearch = () => {
    const searchDataToSend = { ...searchData };
  
    fetch('http://localhost:8080/metaphors', {
      method: 'GET',
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
        }));
        setRows(filteredData);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const columns = [
    { field: 'poet', headerName: 'Poet', width: 300 },
    { field: 'poem', headerName: 'Poem', width: 150 },
    { field: 'source', headerName: 'Source', width: 150 },
    { field: 'target', headerName: 'Target', width: 150 },
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
