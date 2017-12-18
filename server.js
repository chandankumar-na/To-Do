// Get dependencies
const express = require('express');
const path = require('path');

const http = require('http');
const bodyParser = require('body-parser');
var config_urls = require("./configFiles/dbConfig");
var mongoose = require('mongoose');

var filename = path.basename(__filename);
//connect to mongoose db
mongoose.connect(config_urls.url.mongoDB, function(err, db) {
    if (!err) {
        console.log("Connected to Database")
    } else {
        console.log("failed to connect");
    }
});

// Get our API routes
const apis = require('./routes/appRoutes/api');
const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

// Set our api routes
app.use('/api', apis);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

 // Get port from environment and store in Express.
const port = process.env.PORT || '3000';
app.set('port', port);

 // Create HTTP server.
const server = http.createServer(app);

 //Listen on provided port, on all network interfaces.
server.listen(port, () => console.log(`Server running on localhost:${port}`));
module.exports = app;