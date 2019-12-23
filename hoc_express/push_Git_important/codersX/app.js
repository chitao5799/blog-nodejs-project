//tích hợp lowdb - database cơ bản dùng json
var express=require('express');
var app=express();
var port=3000;
var cookieParser=require('cookie-parser');
var userRoute=require('./route/user.route.js');
var authRoute=require('./route/authentication.route');
var authMiddleware=require('./middleware/auth.middleware');

app.set('view engine', 'pug');//mặc định phải có
app.set('views', './view');/*views là mặc định; ./view chỉ định nơi chứa file pug,
                set này liên quan đến đường dẫn trong phương thức render()*/
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser('ksoiewjrlsdf234ri'));//truyền một chuỗi ngẫu nhiên để Signed Cookie

app.get('/',authMiddleware.requireAuthenticate,function(req,res){
    res.render('index',{ //index là tên file pug
        name:'hoa'
    });
});

app.use('/users',authMiddleware.requireAuthenticate,userRoute);
app.use('/auth',authRoute);
app.listen(port,function(){
    console.log('server is listening on port:',port);
});
