var mysql = require('mysql');
var dbCreds = require('../config.js');

var connection = mysql.createConnection({
  host: 'localhost',
  user: dbCreds.mysqlUser,
  password: dbCreds.mysqlPassword,
  database: 'ESS'
})

module.exports.connect = connection.connect((error) => {
  error ? console.log(`Error connecting to mysql: ${error.stack}`): console.log('Connected to mysql');
})