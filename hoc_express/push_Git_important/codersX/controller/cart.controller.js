var db = require('../db');
// var Product = require('../models/product.model');
// var Session = require('../models/session.model');

module.exports.addToCart = async function(req, res, next) {
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;
    //   console.log("session id:" + sessionId);
    if (!sessionId) {
        res.redirect('/products');
        return;
    }
    var countQuantity = db.get('session')
        .find({ id: sessionId }) //tìm id của session trong lowdb xem có giá trị là sessionId hay ko
        .get('cart.' + productId, 0) //nếu ko có productId thì giá trị mặc định của nó là 0
        .value();
    //--------
    // var session = await Session.findById(sessionId, function(err, adventure) {
    //     //   console.log("adventure:" + adventure);
    // });
    //  console.log("session tim đuc:" + session); //giống adventure
    // var cartOfSession = session.get('cart');
    // var countQuantity = cartOfSession[productId] || 0;
    //--------
    //  console.log("quantity:" + countQuantity);
    db.get('session')
        .find({ id: sessionId })
        .set('cart.' + productId, countQuantity + 1)
        .write();
    //--------
    // Session.findByIdAndUpdate(sessionId, {
    //     cart: {
    //         productId: countQuantity + 1
    //     }
    // }, {
    //     upsert: true
    // });

    //--------
    // Session.findById(sessionId).cart[productId] = countQuantity + 1;
    // Session.save(callback);
    //--------
    res.redirect('/products');
}
module.exports.displayProductsInCart = function(req, res, next) {
    var pd = db.get('products').value(); //lấy array là value của key products trong db
    var sessionId = req.signedCookies.sessionId;
    var cart = db.get('session')
        .find({ id: sessionId })
        .get('cart')
        .value();
    var prosInCart = [];
    for (var key in cart) {
        //với mỗi key của cart trong db thì tìm product tương ứng
        for (var item of pd) {
            if (key === item.id) {
                var obj = {};
                obj.img = item.image;
                obj.name = item.name;
                obj.quantity = cart[key];
                prosInCart.push(obj);
                break;
            }
        }
    }
    res.render('cart.pug', {
        prosInCart: prosInCart
    });
}