const express = require('express');
const addServer = require('./add-server');

const app = express()
const port = 3000

app.get('/api/v1/add-server', (req, res) => {
    addServer((data) => {
        console.log('data', data);
        res.json(data);
    });
    
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))