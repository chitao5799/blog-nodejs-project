var express=require('express');
var app=express();
app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views','./views');

var server=require("http").Server(app);
//để 2 client giao tiếp với nhau thì cả 2 phải kết nối đến server, A muốn nhắn tin cho B, thì A nhắn lên server và server trả lại dữ liệu cho B
var io=require('socket.io')(server);//()() là () trước trả về 1 function và ()sau nghĩa là gọi luôn function vừa đc trả về
server.listen(3000,function(){
    console.log('server running in port 3000');
});

/*server lắng nghe sự kiện là hàm on,tên sự kiện là connection nghĩa là khi
có client kết nối lên server thì sự kiện này sảy ra.
biến socket được server tạo ra khi có client connection đến, mỗi client kết nối đến thì server sẽ có biến
socket tương ứng để quản lý cho client đó.
ví dụ,ngay tại 1 tab trên browser chỉ cần refess lại trang sẽ là 1 connection mới*/
io.on('connection',function(socket){
    console.log('co nguoi kết nối, có id:',socket.id);

    //khi đóng tab hoặc trở về trang trước cùng tab hoặc refess lại trang là sự kiện disconnect
    socket.on('disconnect',function(){
        console.log(socket.id+' đã ngắt kết nối.');
    });/**trên php thì số người kết nối và ngắt kết nối nó ko bắt chính xác lăm, còn socket.io thì chuẩn,
    sockio hay làm quảng cáo vì nó biết chính sác hiển thị quảng cáo lúc nào và hiện bao nhiêu giây */
    socket.on('Client-send-data',function(data){
        console.log(data);

        //server gửi data về cho tất cả client bao gồm cả client phát-emit
        // io.sockets.emit('server-send-data',data+' '+socket.id);
        //server chỉ phát cho client đã emit lên server trước đó
        // socket.emit('server-send-data',data+' '+socket.id);
        //phát cho tất cả các client đã kết nối đến server nhưng trừ client đã phát sự kiện này lên server
        socket.broadcast.emit('server-send-data',data+' '+socket.id);
    });
});


app.get('/',function(req,res){
    res.render('trangchu.ejs');//ko có .ejs cũng được
})
