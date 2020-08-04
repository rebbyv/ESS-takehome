const PDFDocument = require('pdfkit');
const getStream = require('get-stream');


module.exports = async (data) => {
  const doc = new PDFDocument({bufferPages: true});

  doc
  .fontSize(25)
  .text('Education Portal- Current Progress', 30, 30);
  
  doc
  .fontSize(18)
  .text('Completed', 30, 70)
  .text('Test Name', 150, 70)
  .text('Course Name', 300, 70)
  
  let lineHeight = 100;
  doc.fontSize(14);
  for (let i = 0; i < data.length; i++) {
    let newData = JSON.parse(data[i])
    if (newData.name !== null) {
      if (newData.completed) {
        doc.moveTo(60, lineHeight + 5)
          .lineTo(65, lineHeight + 10)
          .lineTo(80, lineHeight - 5)
          .stroke()
      }
      doc.text(newData.name, 150, lineHeight)
      doc.text(newData.course_name, 300, lineHeight)
    }
    lineHeight += 20
  }
  doc.end();
  try {
    return await getStream.buffer(doc)
  } catch (error) {
    return error;
  }
}