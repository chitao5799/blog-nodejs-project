var express=require('express');
var app=express();
var server=require('http').createServer(app);
var io=require('socket.io')(server);
//đầu tiên khi truy cập trang chủ, server sẽ trả về cho browser giao diện html
app.get('/',function(req,res,next){
    res.sendfile(__dirname+'/publics/index.html');
});
app.use(express.static('./publics'));
io.on('connection',function(client){
    console.log('client connected...');
    //server luôn lắng nghe sự kiện join
    client.on('join',function(data){
        console.log(data);
    });
    //server lắng nghe sự kiện message, nhận data sau đó băn lại data cho client(emit)
    client.on('message',function(data){
        client.emit('thread',data);
        client.broadcast.emit('thread',data);//tức là tất cả các client đều nhận được sự kiện thread này
    });
});
server.listen(8000,function (){
    console.log('server is running port 8000...');
});