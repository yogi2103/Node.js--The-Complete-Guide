const http = require('http');

const express = require('express');

const app = express();

// app.use((req, res, next) => {
//     console.log('In the middleware!');
//     next(); // Allows the request to continue to the next middleware in line
// });

app.use('/add-product',(req, res, next) => {
    console.log('In another middleware!');
    res.send('<h1>Add product page</h1>');
    // res.send(302);
});

app.use('/',(req, res, next) => {
    console.log('In another middleware!');
    res.send('<h1>Home page</h1>')
    // res.send(302);
});

const server = http.createServer(app);

server.listen(3000);
