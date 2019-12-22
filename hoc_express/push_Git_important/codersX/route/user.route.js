//Express Router
var express=require('express');

var controller=require('../controller/user.controller.js');
var router=express.Router();
//file này liên quan đến đường dẫn khi người dùng nhập bắt đầu bằng /users
//bôi đen các tên trùng nhau, ctrl +D , sửa 1 chỗ thì sẽ sửa tất

//vì app.js có app.use('/users',userRoute); nên ở đây "/" tương ứng /users 
//và /search tương ứng /users/search
router.get('/',controller.index);
router.get('/search',controller.search);
router.get('/create',controller.create);
/**get('/users/:id' phải đặt ở dưới get('/users/create'. nếu không sẽ hiểu nhầm create là id và lỗi  */
router.get('/:id',controller.viewInfoUser);
router.post('/create',controller.postCreate);

module.exports=router;