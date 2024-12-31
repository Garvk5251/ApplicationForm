const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); 


app.post('/submit', (req, res) => {
    const newData = req.body;

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        let jsonData = [];
        if (!err && data) {
            jsonData = JSON.parse(data);
        }

        jsonData.push(newData);

 
        fs.writeFile(DATA_FILE, JSON.stringify(jsonData, null, 2), (writeErr) => {
            if (writeErr) {
                console.error(writeErr);
                return res.status(500).send('Failed to save data.');
            }
            res.send(`<script>alert('Application Submitted Successfully!'); window.location.href='/';</script>`);
        });
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});    