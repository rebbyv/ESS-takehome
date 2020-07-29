const express = require('express');
const port = process.env.PORT || 2000;
const app = express();

// load client portal
app.use(express.static('client/dist'))


// Create
app.post('/course/:type', (req, res) => {
  // type will be course or test
})

// Read
app.get('/course/:type/:identifier/:query', (req, res) => {
  // type wil lbe course or test
  // identifier will be courseId, courseName, or testName
  // query is the search entered by user
})

// Update
app.put('/course/:type/:id', (req, res) => {
  // type will be course or test
  // id is the course or test to update
})

// Delete
app.delete('/course/:type/:id', (req, res) => {
  // type will be course or test
  // name will be the name of the course or test
})


app.listen(port, (error) => {
  error ? console.log('Error in establing server connection'): console.log(`Express server listening on port: ${port}`);
})