var express=require('express');
var app=express();
app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views','./views');
var server=require('http').Server(app);
var io=require('socket.io')(server);
server.listen(process.env.PORT || 3000);//process.env.PORT  -dùng khi đẩy lên heroku

var mang=[];

io.on('connection',function(socket){
    socket.on('hoc-vien-gui-thongtin',function(data){

        mang.push(  new HocVien(data.hoten,data.email,data.dt) );

        io.sockets.emit('server-gui-ds',mang);
    });
});

function HocVien(hoten,email,sodt){
    this.hoten=hoten;
    this.email=email;
    this.sodt=sodt;
}

app.get('/',function(req,res){
    res.render('trangchu.ejs');
});