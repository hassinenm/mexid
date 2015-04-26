// define modules
var express  = require('express');
var app      = express();                                       // create our app with express
var mongoose = require('mongoose');                             // mongoose for mongodb
var morgan = require('morgan');                                 // log requests to the console (express4)
var bodyParser = require('body-parser');                        // pull information from HTML POST (express4)
var methodOverride = require('method-override');                // simulate DELETE and PUT (express4)


// read database connection parameters and connect to database
var dbURI = require('./config/db');
mongoose.connect(dbURI.url);
// CONNECTION EVENTS 
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI.url);
}); 

mongoose.connection.on('error',function (err) { 
  console.log('Mongoose default connection error: ' + err);
}); 

mongoose.connection.on('disconnected', function () { 
  console.log('Mongoose default connection disconnected'); 
});;

// set the static files location /public/images will be /images for users
app.use(express.static(__dirname + '/public'));                 

//log every request to the console
app.use(morgan('dev'));                                         

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended':'true'})); 

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride());


// configure routes
require('./app/routes')(app);

// set listening port and start application
var port = process.env.PORT || 8080;
app.listen(port);
console.log("Mexid app listening on port 8080");
