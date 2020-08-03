const PDFDocument = require('pdfkit');
const fs = require('fs');

module.exports = (data) => {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({bufferPages: true});
      
      let buffers = [];
      doc
      .fontSize(25)
      .text('Education Portal- Current Progress', 30, 30);
      
      doc
      .fontSize(18)
      .text('Completed', 30, 70)
      .text('Test Name', 150, 70)
      .text('Course Name', 300, 70)
      
      let height = 100;
      doc.fontSize(14);
      for (let i = 0; i < data.length; i++) {
        let newData = JSON.parse(data[i])
        if (newData.name !== null) {
          if (newData.completed) {
            doc.text('Yes', 30, height)
          }
          doc.text(newData.name, 150, height)
          doc.text(newData.course_name, 300, height)
        }
        height += 20
      }
      doc.end();
      
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', (err) => {
        let pdfData = new Uint8Array(Buffer.concat(buffers));
          resolve(pdfData)
      });
    })
}