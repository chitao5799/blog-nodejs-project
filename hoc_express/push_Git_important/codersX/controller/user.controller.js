var db=require('../db');


module.exports.index=function(req,res){
    res.render('nguoi/user',{
        persons:db.get('persons').value()
    });
}
module.exports.search=function(req,res){
    /*q tương ứng ở q sau dấu ? trong url của browser và q trong trường name 
    của thẻ input trong file user.pug,có thể thay bằng ký tự hoặc từ khác*/
    var a=req.query.q;
    var persons=db.get('persons').value();
    var matcheUsers=persons.filter(function(user){
        return user.name.toLowerCase().indexOf(a.toLowerCase()) !== -1;
    });
    res.render('nguoi/user',{
        persons:matcheUsers,
        question: a 
    });
    console.log(req.query);
}
module.exports.create=function(req,res){
    console.log(req.cookies);//get cookie
    res.render('nguoi/createUser');
}
module.exports.viewInfoUser=function(req,res){
    var id=parseInt(req.params.id ) ;
    var timUser=db.get('persons').find({id: id}).value();
    res.render('nguoi/view',{
        varUser:timUser
    });
 }
 module.exports.postCreate=function(req,res){
    var temp=req.body;//body này trả về object của client khi post
   
    temp.id=db.get('persons').size()+1;
    db.get('persons').push(temp).write();
    res.redirect('/users');
}