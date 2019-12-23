var db=require('../db');
var md5=require('md5');
//md5 này ko bảo mật lắm, giờ ít người dùng
//https://crackstation.net/ -trang này lưu trữ số lượng lớn string thô và string đã được hash tương ứng
module.exports.login=function(req,res){
    res.render('authentication/login.pug');//có .pug cũng được, ko cũng đc
}
module.exports.postLogin=function(req,res){
    var emailPost=req.body.email;
    var passwordPost=req.body.password;
    var user=db.get('persons').find({email:emailPost}).value();
    if(!user){
        res.render('authentication/login.pug',{
            errors:[
                'user does not exist'
            ],
            value_Da_Nhap:req.body
        });
        return;
    }
    var md5PasswordPost=md5(passwordPost);
    if(user.password!==md5PasswordPost){
        res.render('authentication/login.pug',{
            errors:[
                'password wrong'
            ],
            value_Da_Nhap:req.body
        });
        return;
    }
    //set cookie khi user nhập đúng email và password
    // res.cookie("userID",user.id);
      /*sau khi login  người dùng có thể vào ấn f12 vào tab console gõ lệnh document.cookie="userID=4"
    thì khá là nguy hiểm nếu đây là trang mua bán online, giải quyết bằng cách Signed Cookie*/
    res.cookie("userID",user.id,{signed:true});
    res.redirect('/users');
}