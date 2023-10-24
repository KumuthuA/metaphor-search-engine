const elasticSearch = require('elasticsearch');
require('dotenv').config();

const client = new elasticSearch.Client({
  host: process.env.ELASTIC_URL,
  ssl: { rejectUnauthorized: false, pfx: [] },
});

const getRandomPoem = async (req, res) => {
  try {
    const data = await client.search({
      index: 'sinhala-metaphors',
      size: 1,
      from: Math.floor(Math.random() * 75),
      body: {
        query: {
          function_score: {
            functions: [
              {
                random_score: {},
              },
            ],
          },
        },
      },
    });
    console.log(res);
    res.status(200).send(data.hits.hits[0]._source);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error, message: 'Internal server error' });
  }
};

const search = async (req, res) => {
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
};

const getAllPoems = async (req, res) => {
  try {
    const data = await client.search({
      index: 'sinhala-metaphors',
      size: 100,
      body: {
        query: {
          match_all: {},
        },
      },
    });

    res.status(200).send(data.hits.hits);
  } catch (error) {
    console.log('error', error);
    res.status(400).send({ error: error, message: 'Internal server error' });
  }
};

const addPoem = async (req, res) => {
  const data = req.body;
  const undefined_val = !(
    data.poem &&
    data.poet &&
    data.year &&
    data.lyrics &&
    data.mood &&
    data['metaphorical terms'] &&
    data.source_domain &&
    data.target_domain &&
    data.Meaning
  );
  const requ_fields =
    data.poem === '' ||
    data.poet === '' ||
    data.year === '' ||
    data.lyrics === '' ||
    data.mood === '';
  const meta =
    (data['metaphorical terms'] === '' ||
      data.source_domain === '' ||
      data.target_domain === '' ||
      data.Meaning === '') &&
    (data['metaphorical terms'] !== '' ||
      data.source_domain !== '' ||
      data.target_domain !== '' ||
      data.Meaning !== '');
  if (requ_fields || meta || undefined_val) {
    res
      .status(400)
      .send({ success: false, message: 'requeired fields are incomplete' });
  }

  try {
    const response = await client.index({
      index: 'sinhala-metaphors',
      body: data,
    });

    res.status(200).send({ success: true });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  getRandomPoem,
  search,
  getAllPoems,
  addPoem,
};