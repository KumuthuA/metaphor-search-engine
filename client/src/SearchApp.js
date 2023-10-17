import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Typography } from '@material-ui/core';

function SearchApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

  // Function to handle the search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    const results = performSearch(searchQuery);
    setSearchResults(results);
    setNoResults(results.length === 0);
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
      {noResults ? (
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
      )}
    </div>
  );
}

function performSearch(query) {
  // Simulated search results, replace with your search implementation
  const mockResults = [
    'Result 1',
    'Result 2',
    'Result 3',
  ];

  const filteredResults = mockResults.filter((result) =>
    result.toLowerCase().includes(query.toLowerCase())
  );

  return filteredResults;
}

export default SearchApp;
