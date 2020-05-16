var express = require('express');
var controller = require('../controller/product.controller');
var router = express.Router();
//trên trình duyệt gõ url : /api/products
router.get('/', controller.index);

/** (nếu ko có trang html tương ứng với 1 form có method post  thì)
 * để test thì dùng công cụ postman. với phương thức post và đường dẫn là /api/products 
 * chuyển sang tab: body trong menu bar chọn raw và JSON(application/json)
 * sau đó gõ 1 đối tượng json tương ứng với 1 bản ghi trong database
 * vd : { "name":"item name" , "image":"url" , "description":"hello"}
 * sau đó bấm nút Send - và xem có ghi thêm dữ liệu vào database ko
 */
router.post('/', controller.create);

module.exports = router;