var express=require('express');
var app=express();
app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views','./views');

var server=require("http").Server(app);
var io=require('socket.io')(server);
server.listen(3000,function(){
    console.log('server running in port 3000');
});

io.on('connection',function(socket){
    console.log('co nguoi kết nối, có id:',socket.id);
    socket.on('client-send-mau',function(data){
        io.sockets.emit('server-send-mau',data);
    });

});


app.get('/',function(req,res){
    res.render('trangchu.ejs');//ko có .ejs cũng được
})
