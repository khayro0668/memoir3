const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/generate-pdf', (req, res) => {
    const doc = new PDFDocument();
    const outputPath = 'output.pdf';
    const stream = fs.createWriteStream(outputPath);

    doc.pipe(stream);
    doc.font('Helvetica').fontSize(12).text("This is a sample PDF document.", 10, 25);
    doc.end();

    stream.on('finish', () => {
        res.download(outputPath); // Trigger download of the PDF file once it's created
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});