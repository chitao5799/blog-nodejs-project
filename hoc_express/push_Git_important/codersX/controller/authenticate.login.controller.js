var db=require('../db');


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
    if(user.password!==passwordPost){
        res.render('authentication/login.pug',{
            errors:[
                'password wrong'
            ],
            value_Da_Nhap:req.body
        });
        return;
    }
    //set cookie khi user nhập đúng email và password
    res.cookie("userID",user.id);
    res.redirect('/users');
}