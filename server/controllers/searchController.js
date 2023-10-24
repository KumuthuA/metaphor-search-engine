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
        console.log(result.hits.hits)
        res.json(result.hits.hits);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
};


async function searchMetaphors(req, res) {
    try {
        const { source, target, poet, poem, year, mood} = req.query;
        const mustQueries = [];
    
        if (source) mustQueries.push({ match: { source: source } });
        if (poet) mustQueries.push({ match: { poet: poet } });
        if (poem) mustQueries.push({ match: { poem: poem } });
        if (target) mustQueries.push({ match: { target: target } });
        if (year) mustQueries.push({ match: { year: year } });
        if (mood) mustQueries.push({ match: { mood: mood } });
    
        if (mustQueries.length === 0) {
          return res.status(400).send({ message: 'Search parameters are empty' });
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
