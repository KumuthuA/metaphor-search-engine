const express = require('express');
const { Client } = require('elasticsearch');

const app = express();
const port = 3000;

const esClient = new Client({ node: 'http://localhost:9200' });

app.use(express.json());

app.get('/search', async (req, res) => {
    const { query } = req.query;
    // try {
    //     const result = await esClient.search({
    //         index: 'your_index_name', 
    //         body: {
    //             query: {
    //                 match: {
    //                     'metaphor_line': query,
    //                 },
    //             },
    //         },
    //     });
    //     res.json(result.hits.hits);
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'An error occurred' });
    // }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
