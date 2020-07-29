const express = require('express');
const port = process.env.PORT || 2000;
const app = express();

app.use(express.static('client/dist'))

app.listen(port, (error) => {
  error ? console.log('Error in establing server connection'): console.log(`Express server listening on port: ${port}`);
})