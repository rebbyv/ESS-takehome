var mysql = require('../index.js');
var connection = mysql.connect;


// Create
// adds 1 course
module.exports.create = (data) => {
  let values = [data.name, data.domain, data.desription];
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO course (name, domain, description) VALUES (?, ?, ?)', values, (error, result) => {
      error ? reject(error): resolve(result);
    })
  })
};


// Read 
// identifier is either id or name
// query is what has been entered by user
module.exports.read = (identifier, query) => {
  return new Promise((resolve, reject) => {
    let mysqlQuery;
    // if there has been a query entered:
    if (query !== 'null') {
      mysqlQuery = `SELECT course.*, course.name AS course_name, test.* FROM course LEFT JOIN test ON course.id = test.course_id WHERE course.${identifier} LIKE '${query}%' ORDER BY course_name ASC`
    // otherwise grab all results from courses w/ the corresponding tests- like on portal load
    } else {
      mysqlQuery = 'SELECT course.*, course.name AS course_name, test.* FROM course LEFT JOIN test ON course.id = test.course_id ORDER BY course_name ASC';
    }
    connection.query(mysqlQuery, (error, result) => {
      console.log(result)
      error ? reject(error): resolve(result);
    })
  })
};

// Update
module.exports.update = (id, data) => {
  return new Promise((resolve, reject) => {
    let values = Object.keys(data).map(key => {if (data[key]) { return `${key} = '${data[key]}'`}}).filter(item => item !== undefined).join(', ')
    connection.query(`UPDATE course SET ${values} WHERE id = ?`, [id], (error, result) => {
      error ? reject(error): resolve(result);
    })
  })
};


// Delete
// will also delete all tests associated with this course
module.exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE course, test FROM course INNER JOIN test ON course.id = test.course_id WHERE course.id = ?`, [id], (error, result) => {
      error ? reject(error): resolve(result);
    })
  })
};