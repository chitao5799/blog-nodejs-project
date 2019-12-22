var express=require('express');
var app=express();
var port=3000;
app.set('view engine', 'pug');//mặc định phải có
app.set('views', './show');//views là mặc định; ./show chỉ định nơi chứa file pug
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.get('/',function(req,res){
    res.render('index',{ //index là tên file pug
        name:'hoa'
    });
});
var  persons=[
    {id:1, name:'văn huy'},
    {id:2,name:'quang trần'}
];
app.get('/users',function(req,res){
    res.render('nguoi/user',{
        persons:persons
    });
});
app.get('/users/create',function(req,res){
    res.render('nguoi/createUser');
});
app.post('/users/create',function(req,res){
    persons.push( req.body);//body này trả về object của client khi post
    res.redirect('/users');
    console.log(persons);
});
app.listen(port,function(){
    console.log('server is listening on port:',port);
});