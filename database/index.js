var mysql = require('mysql');
var dbCreds = require('../config.js');

var config = {
  host: 'localhost',
  user: dbCreds.mysqlUser,
  password: dbCreds.mysqlPassword,
  database: 'ESS'
}

var connection = mysql.createConnection(config);

connection.connect((error) => {
  error ? console.log(`Error connecting to mysql: ${error.stack}`): console.log('Connected to mysql');
})

module.exports = {
  connect: mysql.createConnection(config)
}