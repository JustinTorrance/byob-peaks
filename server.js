
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const express = require('express');
const app = express();

app.get('/api/v1/peaks', (request, response) => {
  database('ranges').select()
    .then((ranges) => {
      response.status(200).json(ranges);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.set('port', 3001);

app.listen(app.get('port'), () => {
  console.log(`App is now running at http://localhost:${app.get('port')}`);
});