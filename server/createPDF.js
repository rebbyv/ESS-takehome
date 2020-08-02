var fs = require('fs');
var pdf = require('pdf').pdf;

module.exports = (data) => {
  var doc = new pdf();
  doc.text(20, 20, 'Education Portal');
  doc.text(20, 30, 'Current progress');
  
  let height = 20;
  for (let i = 0; i < data.length; i++) {
    doc.text(20, height, data.name)
    height += 10
  }
  
  var fileName = "courses.pdf";
  
  fs.writeFile('./client/dist/' + fileName, doc.output(), function(err, data){
    err ? console.log(err): console.log(fileName +' was created! great success!');
  });
} 