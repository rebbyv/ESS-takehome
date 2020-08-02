var sys = require('sys');
var fs = require('fs');
var pdf = require('pdf').pdf;

module.exports = () => {
  var doc = new pdf();
  doc.text(20, 20, 'hello, I am PDF.');
  doc.text(20, 30, 'i was created using node.js version: ' + process.version);
  doc.text(20, 40, 'i can also be created from the browser');
  
  doc.addPage();
  
  doc.setFontSize(22);
  doc.text(20, 20, 'This is a title');
  
  doc.setFontSize(16);
  doc.text(20, 30, 'This is some normal sized text underneath.');
  
  var fileName = "test"+new Date().getSeconds()+".pdf";
  
  fs.writeFile(fileName, doc.output(), function(err, data){
    sys.puts(fileName +' was created! great success!');
  });
}