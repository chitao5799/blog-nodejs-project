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
/**mỗi socket sẽ có 1 room, tên của room trùng với giá trị của biến id của socket.
 * room có thể chứa nhiều socket
 * có thể tự tạo room của riêng mình
*/
io.on('connection',function(socket){
    console.log('co nguoi kết nối, có id:',socket.id);
    // console.log(socket);
    console.log(socket.adapter.rooms);
    socket.on('tao-room',function(data){
        /*tham số truyền vào join là tên của room
        khi chưa có room nào tên data thì hệ thống sẽ tạo mới room tên
        data và join socket này vào room data. nếu đã tồn tại room data thì socket 
        này sẽ join vào room data và room data sẽ có thêm 1 socket nữa*/
        socket.join(data);
        socket.Phong=data;//phong là thuộc tính tự tạo
        var mangRoom=[];
        for(r in socket.adapter.rooms)
            mangRoom.push(r);
        io.sockets.emit('server-send-rooms',mangRoom);
        socket.emit('server-send-clients_room',data);

      
        /*leave(tên room) cho socket này rời khỏi room, nếu socket này là cái duy nhất trong room thì sau
        khi ra khỏi room thì hệ thống sẽ loại bỏ room này*/
        // socket.leave(data);
    });
     socket.on('user-chat',function(data){
            //chỉ emit đến các clietn có cùng thuộc tính socket.phong
            io.sockets.in(socket.Phong).emit('server-chat',data);
        });
});
app.get('/',function(req,res){
    res.render('trangchu.ejs');//ko có .ejs cũng được
})