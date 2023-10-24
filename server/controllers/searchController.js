const elasticSearch = require('elasticsearch');
require('dotenv').config();

const client = new elasticSearch.Client({
  host: process.env.ELASTIC_URL,
});

async function getAllMetaphors(req, res) {
    try {
        const result = await client.search(
          {
            index: 'sinhala-metaphors',
            body: {
              query: {
                range: {
                  count: {
                    gte: 1
                  }
                }
              },
              size: 200,
            }
          }
        );
        res.json(result.hits.hits);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
};


async function searchMetaphors(req, res) {
    try {
        const { metaphor, lyrics, author, poem } = req.query;
        const mustQueries = [];
    
        if (metaphor) mustQueries.push({ match: { source_domain: metaphor } });
        if (lyrics) mustQueries.push({ match_phrase: { lyrics: lyrics } });
        if (author) mustQueries.push({ match: { poet: author } });
        if (poem) mustQueries.push({ match: { poem: poem } });
    
        if (mustQueries.length === 0) {
          return res.status(400).send({ message: 'search parameters are empty' });
        }
    
        const data = await client.search({
          index: 'sinhala-metaphors',
          size: 100,
          body: {
            query: {
              bool: {
                must: mustQueries,
              },
            },
          },
        });
    
        res.status(200).send(data.hits.hits);
      } catch (error) {
        console.log('error', error);
        res.status(400).send({ error: error, message: 'Internal server error' });
      }
}

module.exports = { getAllMetaphors, searchMetaphors };
