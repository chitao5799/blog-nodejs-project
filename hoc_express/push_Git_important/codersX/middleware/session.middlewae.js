const shortid = require('shortid');
var db = require('../db');
//var Session = require('../models/session.model');
module.exports = async function(req, res, next) {

    if (!req.signedCookies.sessionId) {
        var sessionid = shortid.generate();
        //var doc = new Session({ cart: {} });
        // var sessionid;
        // await Session.create({ cart: { "key": 1 } }, function(err, doc) {
        //     sessionid = doc._id;
        //    
        //       console.log("doc id:" + doc._id);
        //     if (err) {
        //         throw new Error('opp!! something wrong ...')
        //     }
        // })
        // await doc.save();
        res.cookie("sessionId", sessionid, { signed: true });

        db.get('session').push({
            id: sessionid
        }).write();
    }
    next();
}