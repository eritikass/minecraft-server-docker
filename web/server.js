const express = require('express');
const addServer = require('./add-server');

const app = express()
const port = 3000

app.get('/', (req, res) => {
    // addServer((data) => {
    //     console.log('data', data);
    // });
    
    res.sendfile(__dirname + '/page.html');
});

app.get('/createServer', (req, res) => {
    addServer((data) => {
        console.log('data', data);
    });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))