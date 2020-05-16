var db = require('../db');
module.exports = function(req, res, next) {
    var sessionId = req.signedCookies.sessionId;
    var quantityProInCart = 0;
    var carts = db.get('session').value();
    var cart = db.get('session')
        .find({ id: sessionId })
        .get('cart')
        .value();
    for (var key in cart) {
        quantityProInCart += parseInt(cart[key]);
    }

    // console.log(quantityProInCart);
    res.locals.quantityProInCart = quantityProInCart;
    /*quantityProInCart sẽ dùng để hiển thị số lượng sản phẩm trong cart ở file common.pug và module này được require 
    trong file chính -app.js và dùng app.use() để gọi module này - truy cập bất cứ trang nào trong web thì đều chạy file này */

    next();
}