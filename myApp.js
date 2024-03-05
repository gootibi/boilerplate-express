let express = require('express');
let app = express();
require('dotenv').config();
let bodyParser = require('body-parser');

// 1.
// console.log('Hello World');

// 2. 
// app.get('/', (req, res) => {
//     res.send('Hello Express');
// });

// 4.
app.use('/public', express.static(__dirname + '/public'));


// 11. Use body-parser to Parse POST Requests:
//
// POST /path/subpath HTTP/1.0
// From: john@example.com
// User-Agent: someBrowser/1.0
// Content-Type: application/x-www-form-urlencoded
// Content-Length: 20
//
// name=John+Doe&age=25
app.use(bodyParser.urlencoded({ extended: true }));

// 7. Implement a Root-Level Request Logger Middleware

app.use('/', (req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})

// 3.
app.get('/', (req, res) => {
    absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);
});

// 5. http://localhost:3000/json => json file see
// app.get('/json', (req, res) => {
//     res.json({"message": "Hello json"});
// });

// 6. Use the .env File: .env file created and if statement
app.get('/json', (req, res) => {

    const mySecret = process.env.MESSAGE_STYLE;

    if (mySecret === 'uppercase') {
        res.json({ "message": "HELLO JSON" });
    } else {
        res.json({ "message": "Hello json" });
    }

});

// 8. Chain Middleware to Create a Time Server
app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({ "time": req.time });
});

// 9. Get Route Parameter Input from the Client:
//
// route_path: '/user/:userId/book/:bookId'
// actual_request_URL: '/user/546/book/6754'
// req.params: {userId: '546', bookId: '6754'}

app.get('/:word/echo', (req, res) => {
    res.json({ 'echo': req.params.word });
});

// 10. Get Query Parameter Input from the Client
//
// route_path: '/library'
// actual_request_URL: '/library?userId=546&bookId=6754'
// req.query: {userId: '546', bookId: '6754'}

app.get('/name', (req, res) => {
    res.json({ name: `${req.query.first} ${req.query.last}`});
});


// 12. Get Data from POST Requests
//
// route: POST '/library'
// urlencoded_body: userId=546&bookId=6754
// req.body: {userId: '546', bookId: '6754'}
//
// POST (sometimes PUT) - Create a new resource using the information sent with the request,
//
// GET - Read an existing resource without modifying it,
//
// PUT or PATCH (sometimes POST) - Update a resource using the data sent,
//
// DELETE - Delete a resource.

app.post('/name', (req, res) => {
    res.json({ name: `${req.body.first} ${req.body.last}`});
});






module.exports = app;
