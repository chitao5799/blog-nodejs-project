//tích hợp lowdb - database cơ bản dùng json
var express=require('express');
var app=express();
var port=3000;

var userRoute=require('./route/user.route.js');

app.set('view engine', 'pug');//mặc định phải có
app.set('views', './view');/*views là mặc định; ./view chỉ định nơi chứa file pug,
                set này liên quan đến đường dẫn trong phương thức render()*/
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get('/',function(req,res){
    res.render('index',{ //index là tên file pug
        name:'hoa'
    });
});

app.use('/users',userRoute);

app.listen(port,function(){
    console.log('server is listening on port:',port);
});
