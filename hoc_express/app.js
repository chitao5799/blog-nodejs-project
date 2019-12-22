var express=require('express');
//middleware bên ngoài- ở trên trang expressjs
var cookieParser=require('cookie-parser');
var app=express();
var port=3000;
//vd người dùng nhập http://127.0.0.1:3000/assets/style.css thì dữ liệu 
//trong file style.css sẽ hiện thị trên browser
app.use('/assets',express.static(__dirname+'/public'));
app.use(cookieParser());
app.set("view engine","ejs");
app.set("views",__dirname+"/view_hocEJS");
//custom middleware
app.use('/',function(req,res,next){
    console.log('request url:',req.url);
    req.MYrequestTime=new Date();
    next();
});
//mọi đường dẫn có a  từ /a... đều thỏa mãn vd /a ; /kla/sdlo/09lk
// app.get(/a/, function (req, res) {
//     res.send('/a/');
//   });
// app.get('/vd/user/:id', function (req, res, next) {
// console.log('ID:',req.params.id)
// // if (req.params.id == 0) {
// //     next('router');
// // } else
// next()
// },function(req,res,next){
// res.send('User Info');
// //next()
// });
// app.get('/vd/user/:id',function(req,res,next){
//    console.log('đã vào get');
// res.end(req.params.id)//
// });
app.get('/',function(req,res){
    //get cookies - show lên console cmd của server
    // console.log('cookies:',req.cookies);
    // res.send(`
    // <link href="/assets/style.css" rel="stylesheet"type="text/css"/>
    // <h1> hello express</h1>
    // <p> request time: ${req.MYrequestTime}</p>
    // `);
    res.render("index");
    
});
app.get('/api',function(req,res){
    res.json({
        firstName:'mai',
        lastName:'hoa'
    });
});
// vd như nhập /user/123 trên thanh url của browser
/**vd như trang web bán hàng có thể đặt url với các tham số
 * product/:id
 * product/page/:pageNumber
 * user/:id
 */
app.get('/user/:id',function(req,res){
    //set cookies
    // res.cookie('username:',req.params.id);
    // res.send(`<h1> user:${req.params.id}</h1>`);
    res.render("user",{id:req.params.id});
});
var myServer=app.listen(port,function(){
    console.log('server is listening on port:',myServer.address().port);

})