var db = require('../db');

module.exports.addToCart = function(req, res, next) {
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;

    if (!sessionId) {
        res.redirect('/products');
        return;
    }
    var countQuantity = db.get('session')
        .find({ id: sessionId }) //tìm id của session trong lowdb xem có giá trị là sessionId hay ko
        .get('cart.' + productId, 0) //nếu ko có productId thì giá trị mặc định của nó là 0
        .value();
    db.get('session')
        .find({ id: sessionId })
        .set('cart.' + productId, countQuantity + 1)
        .write();


    res.redirect('/products');
}
module.exports.displayProductsInCart = function(req, res, next) {
    var pd = db.get('products').value(); //lấy array là value của key products trong db
    var carts = db.get('session').value(); // lấy arr là value của key session trong db
    var cart = carts[0].cart;
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