var express=require('express');
var app=express();
app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views','./views');

var server=require("http").Server(app);
var io=require('socket.io')(server);
var mangUsers=[];
io.on('connection',function(socket){
    console.log('co người vừa kết nối:',socket.id);
    socket.on('client-send-username',function(data){
        // console.log(data);
        if(mangUsers.indexOf(data)>=0)
        {
             //đăng ký fail
             socket.emit('server-send-dki-thatbai');
        }else{
            //success
            mangUsers.push(data);
            socket.UserName=data;//UserName là biến tự tạo
            socket.emit('server-send-dki-success',data);
            io.sockets.emit('server-send-all-username',mangUsers);
        } 

    });
    socket.on('logout',function(){
        mangUsers.splice(mangUsers.indexOf(socket.UserName),1);
        socket.broadcast.emit('server-send-all-username',mangUsers);
    });
    socket.on('user-send-message',function(data){
        io.sockets.emit('server-send-message',{username:socket.UserName,message:data});
    });
    socket.on('toi-dang-go-chu',function(){
        var s=socket.UserName+' đang gõ message';
        socket.broadcast.emit('ai-do-dang-go-chu',s);
    });
    socket.on('toi-stop-go-chu',function(){
        socket.broadcast.emit('ai-do-stop-go-chu');
    });
});
server.listen(3000,function(){
    console.log('server running in port 3000');
});
app.get('/',function(req,res){
    res.render('trangchu');
});
// //----
// //chạy trên cmd trước file net_client.js
// const net = require('net');  
// var server = net.createServer((socket) => {  
//   socket.write('xin chào client\n');
//   socket.end('goodbye\n');  
// }).on('error', (err) => {  
//   // handle errors here  
//   throw err;  
// });  
// // grab a random port.  
// server.listen(() => {  //3000,
//   address = server.address();  
//   console.log('opened server on %j', address);  
// });  
// //---