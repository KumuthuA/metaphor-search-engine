const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
app.use(cors());
app.use(express.json());

const {getAllMetaphors,  searchMetaphors } = require('./controllers/searchController');

app.get('/search', searchMetaphors);
app.get('/metaphors', getAllMetaphors);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});