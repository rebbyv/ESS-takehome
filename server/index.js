const express = require('express');
const port = process.env.PORT || 2000;
const app = express();

// mySQL controllers for courses & tests tables
const courses = require('../database/controllers/courseControllers.js');
const tests = require('../database/controllers/testControllers.js');

// load client portal
app.use(express.static('client/dist'))
app.use(express.json()) // for parsing application/json


// Create
app.post('/ce/:type', (req, res) => {
  // type will be course or test
  if (req.params.type === 'Course') {
    courses.create(req.body)
      .then((results) => res.status(200).send(results))
      .catch((error) => res.status(500).send(error))
  } else {
    tests.create(req.params.type, req.body)
      .then((results) => res.status(200).send(results))
      .catch((error) => res.status(500).send(error))
  }
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
  if (req.params.type === 'course') {
    courses.update(req.params.id, req.body)
      .then((results) => res.status(200).send(results))
      .catch((error) => res.status(500).send(error))
  } else {
    tests.update(req.params.id)
      .then((results) => res.status(200).send(results))
      .catch((error) => res.status(500).send(error))
  }
})

// Delete
app.delete('/ce/:type/:id', (req, res) => {
  // type will be course or test
  // id is the id to delete out of the table
  if (req.params.type === 'course') {
    courses.delete(req.params.id)
      .then((results) => res.status(200).send(results))
      .catch((error) => res.status(500).send(error))
  } else {
    tests.delete(req.params.id)
      .then((results) => res.status(200).send(results))
      .catch((error) => res.status(500).send(error))
  }
})



app.listen(port, (error) => {
  error ? console.log('Error in establing server connection'): console.log(`Express server listening on port: ${port}`);
})