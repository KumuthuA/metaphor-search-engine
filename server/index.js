const express = require('express');
// const { Client } = require('elasticsearch');

const app = express();
const port = 3000;

const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: 'http://localhost:9200' // Replace with your Elasticsearch server's address and port
});

app.use(express.json());

app.get('/metaphors', async (req, res) => {
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
});

app.get('/search', async (req, res) => {
  const { book, poet, year, poem, source, target, mood} = req.query;
  try {
      const result = await client.search(
        {
          index: 'sinhala-metaphors',
          body: {
              query: {
                bool: {
                  must: [
                    {
                     match: {
                        book: {book}
                      }
                    },
                    {
                      match: {
                        poet: {poet}
                      }
                    },
                    {
                      match: {
                        year: {year}
                      }
                    },
                    {
                      match: {
                        poem: {poem}
                      }
                    },
                    {
                      match: {
                        source : {source}
                      }
                    },
                    {
                      match: {
                        traget: {target}
                      }
                    },
                    {
                      match: {
                        mood: {mood}
                      }
                    }
                  ]
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
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
