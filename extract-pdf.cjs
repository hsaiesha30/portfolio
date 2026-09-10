import pdfParse from 'pdf-parse';
import fs from 'fs';

const dataBuffer = fs.readFileSync('public/assets/Resume.pdf');

pdfParse(dataBuffer).then(data => {
  console.log(data.text);
}).catch(err => {
  console.error('Error:', err);
});
