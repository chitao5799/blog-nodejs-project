var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
    cart: Object
});
var Session = mongoose.model('Session', sessionSchema, 'session');
module.exports = Session;