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
      response.status(200).json(range)
    })
    .catch((error) => {
      response.status(500).json({ error })
    });
});

app.get("/api/v1/ranges/:id", (request, response) => {
  database("ranges")
    .where("id", request.params.id).select()
    .then(range => {
      if (range) {
        response.status(200).json(range)
      } else {
        response.status(404).json({
          error: `That range does not exist.`
        })
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/ranges/:id/mountains', (request, response) => {
  database('mountains')
    .where('range_id', request.params.id).select()
    .then(mountains => {
      if (mountains) {
        response.status(200).json(mountains)
      } else {
        response.status(404).json({
          error: `Could not find any mountains for that range`
        })
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.get("/api/v1/mountains/:id", (request, response) => {
  database("mountains")
    .where("id", request.params.id).select()
    .then(mountain => {
      if (mountain.length) {
        response.status(200).json(mountain)
      } else {
        response.status(404).json({
          error: `That mountain does not exist`
        })
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    })
})

app.post('/api/v1/ranges', (request, response) => {
  const range = request.body
  for (let requiredParameter of ['name', 'tallest_peaks']) {
    if(!range[requiredParameter]) {
      response.status(422).json({ 
        error: `Expected format: { name: <String>, tallest_peaks: <Integer> } You're missing the ${requiredParameter}.` 
      })
    }
  }
  database('ranges')
    .insert(range, 'id')
    .then(range => {
      response.status(201).json({ 
        id: range[0], message: "Success! The range has been added." 
      })
    })
    .catch(error => {
      response.status(500).json({ error });
    })
})

app.post('/api/v1/ranges/:id/mountains', (request, response) => {
  const mountain = request.body
  const rangeID = request.params.id
  for (let requiredParameter of ['name', 'elevation', 'rank']) {
    if(!mountain[requiredParameter]){
      response.status(422).json({ 
        error: `Expected format: { name: <String>, elevation: <Integer>, rank: <Integer> } You're missing the ${requiredParameter}.` 
      })
    }
  }
  database('mountains')
    .insert({ ...mountain, range_id: rangeID }, 'id')
    .then(mountain => {
      response.status(201).json( `Success! The mountain has been added.` )
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.delete('/api/v1/ranges/:id', (request, response) => {
  const id = request.params.id
  database('ranges')
    .where('id', id).del()
    .then(range => {
      if (range) {
        response.status(204).json({ 
          message: `Range was successfully deleted.`})
      } else {
        response.status(404).json({ 
          error: `This range does not exist`
        })
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.listen(app.get('port'), () => {
  console.log(`App is now running at http://localhost:${app.get('port')}`);
});