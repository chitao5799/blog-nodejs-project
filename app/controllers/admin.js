//file này có nhiệm vụ là router quản lý các bài blog
var express=require("express");
var router=express.Router();
/*truy câp http://127.0.0.1:3000/admin sẽ vào hàm get này vì trong file index.js có
câu lệnh use("/admin",require(__dirname+'/admin')); nên ở đây chỉ cần .get("/",...); */
router.get('/',function(req,res){
    res.json({"message":"this is admin page"});
});
module.exports=router;