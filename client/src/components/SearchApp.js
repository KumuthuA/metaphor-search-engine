import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, List, ListItem, ListItemText, Typography } from '@material-ui/core';

function SearchApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3000/search', {
        params: {
          query: searchQuery,
        },
      });

      const results = response.data;
      setSearchResults(results);
      setNoResults(results.length === 0);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Search Application
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <Button
        variant="contained"
        color="primary"
        // startIcon={<SearchIcon />}
        onClick={handleSearch}
      >
        Search
      </Button>
      {/* {noResults ? (
        <Typography variant="body1" color="textSecondary">
          No results found.
        </Typography>
      ) : (
        <List>
          {searchResults.map((result, index) => (
            <ListItem key={index}>
              <ListItemText primary={result} />
            </ListItem>
          ))}
        </List>
      )} */}
    </div>
  );
}


export default SearchApp;
