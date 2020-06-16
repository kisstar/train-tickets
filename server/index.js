const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

app.get('/read/cities', (_req, res) => {
  res.json(require('./mock-data/cities.json'));
});

app.get('/read/search', (req, res) => {
  const { keyword } = req.query
  const result = []
  if (keyword.length) {
    require('./mock-data/cityNames.json').forEach(item => {
      const { name } = item
      if (name.includes(keyword)) {
        result.push({
          key: name,
          display: name
        })
      }
    })
  }
  res.json({
    result,
    keyword
  });
});

server.listen(8080, () =>
  console.log('Mock server listening on http://localhost:8080')
);
