const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

app.get('/read/cities', (_req, res) => {
  res.json(require('./mock-data/cities.json'));
});

server.listen(8080, () =>
  console.log('Mock server listening on http://localhost:8080')
);
