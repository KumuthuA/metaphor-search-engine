import React, { useState, useEffect } from "react";
import { Button, TextField, Grid, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
}));

const SearchResultTable = () => {
  const classes = useStyles();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [searchData, setSearchData] = useState({
    source: "",
    target: "",
    poet: "",
    poem: "",
    year: "",
    mood: "",
  });

  const [rows, setRows] = useState([]);

  const handleChange = (event) => {
    setSearchData({
      ...searchData,
      [event.target.name]: event.target.value,
    });
  };

  const handleReset = () => {
    setSearchData({
      poet: "",
      poem: "",
      source: "",
      target: "",
      year: "",
      mood: "",
    });
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/metaphors`)
      .then((response) => {
        const data = response.data;
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
          book: item._source.book,
        }));
        setRows(allData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [searchData]);

  const handleSearch = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const searchDataToSend = { ...searchData };
      console.log(searchDataToSend);

      const response = await axios.post(`${apiUrl}/search`, searchDataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const filteredData = response.data.map((item) => ({
        id: item._id,
        poet: item._source.poet,
        poem: item._source.poem,
        source: item._source.source,
        target: item._source.target,
        year: item._source.year,
        mood: item._source.mood,
        interpretation: item._source.interpretation,
        metaphor: item._source.line,
        book: item._source.book,
      }));

      setRows(filteredData);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const columns = [
    { field: "metaphor", headerName: "Metaphor", width: 300 },
    { field: "interpretation", headerName: "Interpretation", width: 400 },
    { field: "source", headerName: "Source", width: 120 },
    { field: "target", headerName: "Target", width: 120 },
    { field: "mood", headerName: "Mood", width: 100 },
    { field: "poet", headerName: "Poet", width: 150 },
    { field: "book", headerName: "Book", width: 150 },
    { field: "poem", headerName: "Poem", width: 150 },
    { field: "year", headerName: "Year", width: 100 },
  ];

  return (
    <div className={classes.root}>
      <Paper style={{ background: "#f1f1f1", padding: "20px", marginBottom: "20px" }}>
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          style={{
            marginTop: "20px",
            marginRight: "20px",
          }}
        >
          Search
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleReset}
          style={{ marginTop: "20px" }}
        >
          Reset
        </Button>
      </Paper>
      <div style={{ height: 800, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
    </div>
  );
};

export default SearchResultTable;
