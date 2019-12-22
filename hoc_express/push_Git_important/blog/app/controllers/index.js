/*file này ko làm gì cả nó chỉ có nhiệm vụ include các file trong thư mục này,
 vì app.js đã require(__dirname+'/app/controllers'); nên bắt buộc forder này
phải có file index.js*/
var express=require('express');
var router=express.Router();
router.use("/admin",require(__dirname+'/admin'));//hoặc __dirname+'/admin.js'
router.use('/blog',require(__dirname+"/blog"));

router.get('/',function(req,res){
    // res.json({"message":"this is home page"});
    res.render("text");
});
module.exports=router;