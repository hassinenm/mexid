var mongoose = require('mongoose');

module.exports = mongoose.model('Mexican', {
    forename: 'String',
    lastname: 'String',
    birth_place: 'String',
    birth_date: 'String',
    address1: 'String',
    address2: 'String',
    issue_date: { type: Date, default: Date.now },
    expiry_date: Date
});


