//file này chính là router,hiển thị các bài cho người dùng xem
var express=require("express");
var router=express.Router();
/*truy câp http://127.0.0.1:3000/blog sẽ vào hàm get này vì trong file index.js có
câu lệnh router.use('/blog',require(__dirname+"/blog")); nên ở đây chỉ cần .get("/",...);
đây là tính năng của Router() */
router.get('/',function(req,res){
    res.json({"message":"this is blog page"});
});
module.exports=router;