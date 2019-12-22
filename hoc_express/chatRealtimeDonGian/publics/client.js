//kết nối
var socket=io.connect('http://localhost:8000');
socket.on('connect',function(data){
    //sau khi kết nối,client xuất sự kiện join đến server
    socket.emit('join','hello server from client');
});
socket.on('thread',function(data){
    $('#thread').append('<li>'+data+'</li>');
});
//khi client submit form thì xuất sự kiện emit
$('form').submit(function(){
    var message=$('#message').val();
    socket.emit('message',message);
    this.reset();
    return false;
})