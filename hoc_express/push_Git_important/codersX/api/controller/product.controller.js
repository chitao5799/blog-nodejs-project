var db = require('../../db');
//trên trình duyệt gõ url : /api/products
module.exports.index = function(req, res) {
    var pd = db.get('products').value();
    res.json(pd);
}
module.exports.create = function(req, res) {
    db.get('products').push(req.body).write();

}