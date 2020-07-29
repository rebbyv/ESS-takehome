var mysql = require('../index.js');
var connection = mysql.connect;

// Create
// adds 1 course
module.exports.create = (data) => {
  let values = [data.courseId, data.numQuestions, data.name, data.description];
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO test (course_id, num_of_questions, name, duration) VALUES (?, ?, ?, ?)', values, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    })
  })
};

// Read 
// identifier is either id or name
// query is what has been entered by user
module.exports.read = (identifier, query) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM test WHERE ? LIKE '?%'`, [identifier, query], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    })
  })
};

// Update
module.exports.update = (id, data) => {
  return new Promise((resolve, reject) => {
    let values = Object.keys(data).map(key => `${key} = '${data[key]}'`).join(', ')
    connection.query(`UPDATE test SET ${values} WHERE id = ?`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    })
  })
};

// Delete
module.exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM test WHERE id = ?`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    })
  })
};