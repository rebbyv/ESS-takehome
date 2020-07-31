var mysql = require('../index.js');
var connection = mysql.connect;

// Create
// adds 1 course
module.exports.create = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO test (course_id, num_of_questions, name, duration) VALUES (?, ?, ?, ?)', data, (error, result) => {
      error ? reject(error): resolve(result);
    })
  })
};

// Read 
// identifier is either id or name
// query is what has been entered by user
module.exports.read = (identifier, query) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM test WHERE ? LIKE '?%'`, [identifier, query], (error, result) => {
      error ? reject(error): resolve(result);
    })
  })
};

// Update
module.exports.update = (id, data) => {
  return new Promise((resolve, reject) => {
    let values = Object.keys(data).map(key => {if (data[key]) { return `${key} = '${data[key]}'`}}).filter(item => item !== undefined).join(', ')
    connection.query(`UPDATE test SET ${values} WHERE id = ?`, [id], (error, result) => {
      error ? reject(error): resolve(result);
    })
  })
};

// Delete
module.exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM test WHERE id = ?`, [id], (error, result) => {
      error ? reject(error): resolve(result);
    })
  })
};