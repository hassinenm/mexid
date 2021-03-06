// models
var Mexican = require('./models/mexican');
var Forename = require('./models/forename');
var Lastname = require('./models/lastname');

// routes
module.exports = function(app) {
    // get all mexicans
    app.get('/api/mexicans', function(req, res) {
        
        // use mongoose to get all mexicans in the database
        Mexican.find(function(err, mexicans) {
            if (err)
                res.send(err);
            res.json(mexicans); // return all mexicans in JSON format
        });
    });
    
    // find mexican with id
    app.get('/api/mexicans/:mexican_id', function(req, res) {

        // use mongoose to get all mexicans in the database
        Mexican.findById(req.params.mexican_id, function(err, mexican) {
            if (err)
                res.send(err);
            res.json(mexican); // return mexican in JSON format
        });
    });
    
    // get mexican count
    app.get('/api/count_mexicans', function(req, res) {
        
        // use mongoose to count mexicans in the database
        Mexican.count(function(err, count) {
            if (err)
                res.send(err);
            res.json(count); // return mexican count
        });
    });    

    // create mexican and send back all mexicans after creation
    app.post('/api/mexicans', function(req, res) {
        var names = req.body.name.split(' ');
        console.log("Posted names " + names);

        // quick and dirty solution, first name from database, perhaps in future we could try find something better...
        Forename.find(function (err, forenames){
            //console.log(doc[0].name);
            if (err)
                res.send(err);
            Lastname.find(function (err, lastnames){
                if (err)
                    res.send(err);
                        // create a mexican with new names
                Mexican.create({
                    forename : forenames[0].name,
                    lastname : lastnames[0].name,
                    birth_place: 'OAXACA',
                    birth_date: '12 SEP 1975',
                    address1: '1273 TEQUILLA AVE',
                    address2: 'BUENOS AGAVES'
                }, function(err, mexican) {
                    if (err)
                        res.send(err);
                    res.json(mexican);
                });
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
                    res.send(err);
                res.json(mexicans);
            });
        });
    });
    
    // get all forenames
    app.get('/api/forename', function(req, res) {

        // use mongoose to get all forenames in the database
        Forename.find(function(err, forenames) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(forenames); // return all mexicans in JSON format
        });
    });
    
    // get all lastnames
    app.get('/api/lastname', function(req, res) {

        // use mongoose to get all forenames in the database
        Lastname.find(function(err, lastnames) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(lastnames); // return all mexicans in JSON format
        });
    });
    
        // create mexican and send back all mexicans after creation
    app.post('/api/lastnames', function(req, res) {
        var names = req.body.name.split(' ');
        console.log("Posted lastname " + req.body.name);
        Forename.create({
             name : req.body.name
         }, function(err, mexican) {
             if (err)
                 res.send(err);
             res.json(mexican);
         });   
    });
    
    app.post('/api/firstnames', function(req, res) {
        var names = req.body.name.split(' ');
        console.log("Posted firstname " + req.body.name);
        Firstname.create({
             name : req.body.name
         }, function(err, mexican) {
             if (err)
                 res.send(err);
             res.json(mexican);
         });   
    });
    
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
    
};

