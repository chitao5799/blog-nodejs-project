//Express Router
var express=require('express');
var multer  = require('multer');

var validation=require('../validation/user.postData.validate');
var controller=require('../controller/user.controller.js');
var router=express.Router();
var upload = multer({ dest: './uploads/' })
// var authMiddleware=require('../middleware/auth.middleware');

//file này liên quan đến đường dẫn khi người dùng nhập bắt đầu bằng /users
//bôi đen các tên trùng nhau, ctrl +D , sửa 1 chỗ thì sẽ sửa tất

//vì app.js có app.use('/users',userRoute); nên ở đây "/" tương ứng /users 
//và /search tương ứng /users/search
router.get('/',controller.index);
router.get('/search',controller.search);
router.get('/cookie',function(req,res){
    //set cookie
    // res.cookie('cookieUserId',12345);
    res.send("đã set cookie");
    /**cookie ứng dụng vào authencation khi login,thì server sẽ gửi 1 cái tring lưu lại cái mã của phiên
     * làm việc(session) của người dùng ấy, sau khi login thì client cứ gửi cookie  lên(req.cookies) thì server sẽ biết ai
     * đang login cho đến khi logout thì server sẽ gửi 1 cái header để xóa cái cookie đó đi thế là coi như 
     * xong phiên làm việc, server có thể set thời gian tồn tại cookie để bảo mật. cookie có thể lưu ở bộ nhớ hoặc database
     * để nếu người dùng login trên nhiều máy thì sẽ quản lý được.
    */
})
router.get('/create',controller.create);
/**get('/users/:id' phải đặt ở dưới get('/users/create'. nếu không sẽ hiểu nhầm create là id và lỗi  */
router.get('/:id',controller.viewInfoUser);
router.post('/create',upload.single('avatar'),validation.validate,controller.postCreate);/*khi client nhập đường dẫn này thì vào validate
                            trước nếu thỏa mãn sẽ gọi hàm next, nếu next() được gọi sẽ vào hàm postCreate */

module.exports=router;