const shortid = require('shortid');
var db = require('../db');
module.exports = function(req, res, next) {

    if (!req.signedCookies.sessionId) {
        var sessionid = shortid.generate();
        res.cookie("sessionId", sessionid, { signed: true });
        db.get('session').push({
            id: sessionid
        }).write();
    }
    next();
}