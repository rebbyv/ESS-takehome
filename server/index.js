const express = require('express');
const port = process.env.PORT || 2000;
const app = express();

// mySQL controllers for courses & tests tables
const courses = require('../database/controllers/courseControllers.js');
const tests = require('../database/controllers/testControllers.js');

// load client portal
app.use(express.static('client/dist'))


// Create
app.post('/ce/:type', (req, res) => {
  // type will be course or test
})

// Read
app.get('/ce/:type/:identifier/:query', (req, res) => {
  // type will be course or test
  // identifier will be id or name
  // query is the search entered by user
  if (req.params.type === 'course') {
    courses.read(req.params.identifier, req.params.query)
      .then((results) => res.status(200).send(results))
      .catch((error) => res.status(500).send(error))
  } else {
    tests.read(req.params.identifier, req.params.query)
      .then((results) => res.status(200).send(results))
      .catch((error) => res.status(500).send(error))
  }
})

// Update
app.put('/ce/:type/:id', (req, res) => {
  // type will be course or test
  // id is the course or test to update
})

// Delete
app.delete('/ce/:type/:id', (req, res) => {
  // type will be course or test
  // name will be the name of the course or test
})



app.listen(port, (error) => {
  error ? console.log('Error in establing server connection'): console.log(`Express server listening on port: ${port}`);
})