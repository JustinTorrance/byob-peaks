const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const express = require('express');
const app = express();
app.use(express.json());

app.set('port', process.env.PORT || 3000)

app.get('/api/v1/ranges', (request, response) => {
  database('ranges').select()
    .then((range) => {
      response.status(200).json(range);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get("/api/v1/ranges/:id", (req, res) => {
  database("ranges")
    .where("id", req.params.id)
    .select()
    .then(range => {
      res.status(200).json(range);
      if (range) {
        res.status(200).json(range);
      } else {
        res.status(404).json({
          error: `That range does not exist.`
        });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});


app.listen(app.get('port'), () => {
  console.log(`App is now running at http://localhost:${app.get('port')}`);
});