const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const express = require('express');
const app = express();
app.use(express.json());

app.set('port', process.env.PORT || 3000)

app.get('/api/v1/ranges', (request, response) => {
  //Allows a GET method on the specified url
  database('ranges').select()
  //Returns an array of all ranges in our 'ranges' database
    .then((range) => {
      response.status(200).json(range)
      //If the array resolves, return the array and a status of 200
    })
    .catch((error) => {
      response.status(500).json({ error })
      //If there is a critical server error, return the error and a 500 status
    });
});

app.get("/api/v1/ranges/:id", (request, response) => {
  //Allows a GET method on the specified url
  database("ranges")
    .where("id", request.params.id).select()
    //in ranges database, only select range that matches the specified id
    .then(range => {      
      if (range) {
        response.status(200).json(range)
        //If the specific range exists, return a status 200 and the range
      } else {
        response.status(404).json({
          error: `That range does not exist.`
          //if the range doesn't exist, return a 404 status and error message
        })
      }
    })
    .catch(error => {
      response.status(500).json({ error })
      //If there is a critical server error, return the error and a 500 status      
    })
})

app.get('/api/v1/ranges/:id/mountains', (request, response) => {
  //Allow GET method to url
  //This accesses the mountains of a specific range
  database('mountains')
    .where('range_id', request.params.id).select()
    //In mountains table, find the range that matches the id
    .then(mountains => {
      if (mountains) {
        response.status(200).json(mountains)
        //if that range exists, return all of range's mountains and 200 status
      } else {
        response.status(404).json({
          error: `Could not find any mountains for that range`
          //if there is no matching range, return error message and 404 status
        })
      }
    })
    .catch(error => {
      response.status(500).json({ error })
      //If there is a critical server error, return the error and a 500 status
    })
})

app.get("/api/v1/mountains/:id", (request, response) => {
  //Allow GET method for a specific mountain
  database("mountains")
    .where("id", request.params.id).select()
    //In mountains table, find a mountain that matches the specified id
    .then(mountain => {
      if (mountain) {
        response.status(200).json(mountain)
        //if matching mountain exists, return mountain and 200 status
      } else {
        response.status(404).json({
          error: `That mountain does not exist`
          //if no matching mountain, return 404 status and error message
        })
      }
    })
    .catch(error => {
      response.status(500).json({ error });
      //If there is a critical server error, return the error and a 500 status
    })
})

app.post('/api/v1/ranges', (request, response) => {
  const range = request.body
  for (let requiredParameter of ['name', 'tallest_peaks']) {
    //specifying name and tallest_peaks as required parameters
    //these parameters must be included when posting a new range
    if(!range[requiredParameter]) {
      response.status(422).json({ 
        //if a required parameter is missing, return a 422 status and error message specifying which param is missing
        error: `Expected format: { name: <String>, tallest_peaks: <Integer> } You're missing the ${requiredParameter}.` 
      })
    }
  }
  database('ranges')
    .insert(range, 'id')
    //in database 'ranges, add the request.body and an id
    .then(range => {
      response.status(201).json({ 
        id: range[0], message: "Success! The range has been added." 
        // if successful, return the new id, message, and 201 status
      })
    })
    .catch(error => {
      response.status(500).json({ error });
      //If there is a critical server error, return the error and a 500 status
    })
})

app.post('/api/v1/ranges/:id/mountains', (request, response) => {
  //Allows us to use POST method to add a mountain to a specified range
  const mountain = request.body
  const rangeID = request.params.id
  for (let requiredParameter of ['name', 'elevation', 'rank']) {
    //name, elevation, and rank are required parameters which user must include when adding a new mountain
    if(!mountain[requiredParameter]){
      response.status(422).json({ 
        error: `Expected format: { name: <String>, elevation: <Integer>, rank: <Integer> } You're missing the ${requiredParameter}.` 
        //if a required parameter is missing, tell user which parameter they're missing
      })
    }
  }
  database('mountains')
    .insert({ ...mountain, range_id: rangeID }, 'id')
    //in mountains table, add an object with request.body, the range's id, and a new id
    .then(mountain => {
      response.status(201).json( `Success! The mountain has been added.` )
      //if successful, return 201 status and message
    })
    .catch(error => {
      response.status(500).json({ error })
      //If there is a critical server error, return the error and a 500 status
    })
})

app.delete('/api/v1/ranges/:id', (request, response) => {
  //allows us to use DELETE method on a specified range
  const id = request.params.id
  database('ranges')
    .where('id', id).del()
    //in ranges table, if a range matches the id, delete it
    .then(range => {
      if (range) {
        response.status(204).json({ 
          message: `Range was successfully deleted.`})
          //if successful and if range is found, return 204 and message
      } else {
        response.status(404).json({ 
          error: `This range does not exist`
          //if the range wasn't found, return 404 status and message
        })
      }
    })
    .catch(error => {
      response.status(500).json({ error })
      //If there is a critical server error, return the error and a 500 status
    })
})

app.listen(app.get('port'), () => {
  console.log(`App is now running at http://localhost:${app.get('port')}`);
});