// server.js

// set up ========================
var express  = require('express');
var app      = express();                           // create our app w/ express
var mongoose = require('mongoose');                 // mongoose for mongodb
var morgan = require('morgan');                     // log requests to the console (express4)
var bodyParser = require('body-parser');            // pull information from HTML POST (express4)
var methodOverride = require('method-override');    // simulate DELETE and PUT (express4)

// configuration =================

    // mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io
mongoose.connect('mongodb://localhost/mexid');

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// define model =================
var schema = new mongoose.Schema({
    forename: 'String',
    surname: 'String'
                                 });
var Mexican = mongoose.model('Mexican', schema);


// routes ======================================================================

// api ---------------------------------------------------------------------
// get all mexicans
app.get('/api/mexicans', function(req, res) {

    // use mongoose to get all todos in the database
    Mexican.find(function(err, mexicans) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(mexicans); // return all mexicans in JSON format
    });
});

// create mexican and send back all mexicans after creation
app.post('/api/mexicans', function(req, res) {

    // create a mexican, information comes from AJAX request from Angular
    Mexican.create({
        text : req.body.text,
        done : false
    }, function(err, mexican) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Mexican.find(function(err, mexicans) {
            if (err)
                res.send(err)
            res.json(mexicans);
        });
    });

});

// delete a mexican
app.delete('/api/mexicans/:mexican_id', function(req, res) {
    Mexican.remove({
        _id : req.params.mexican_id
    }, function(err, mexican) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Mexican.find(function(err, mexicans) {
            if (err)
                res.send(err)
            res.json(mexicans);
        });
    });
});

// application -------------------------------------------------------------
app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
