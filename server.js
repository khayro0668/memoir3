const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const app = express();
const port = 3000;
const cors = require('cors');

const corsOptions = {
    origin: '*', // or use the specific client origin e.g., 'http://localhost:3001'
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

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