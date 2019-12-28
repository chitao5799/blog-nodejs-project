var socket=io('http://localhost:3000');
socket.on('server-send-dki-thatbai',function(){
    alert('sai username- đã tồn tại user này.');
});
socket.on('server-send-dki-success',function(data){
    $('#currentUser').html(data);
    $('#loginform').hide(2000);//2000-2s
    $('#chatform').show(1000);
});
socket.on('server-send-all-username',function(data){
    $('#boxContent').html('');
    data.forEach(element => {
        $('#boxContent').append("<div class='user'>"+ element+'</div>')
    });
});
socket.on('server-send-message',function(data){
    $('#listMessage').append('<div>'+data.username+':'+data.message+'</div>')
});
socket.on('ai-do-dang-go-chu',function(data){
    $('#thongbao').html('<img style="width:20px;heigth:20px" src="icon-2.png"/>'+data);
});
socket.on('ai-do-stop-go-chu',function(data){
    $('#thongbao').html('');
});

$(document).ready(function(){
    $('#loginform').show();
    $('#chatform').hide();

    $('#btnResgiter').click(function(){
        socket.emit('client-send-username',$('#txUername').val());
       
    });
    $('#btmLogout').click(function(){
        socket.emit('logout');
        $('#chatform').hide(500);
        $('#loginform').show(500);
        
    });
    $('#btnSendMessage').click(function(){
      
        socket.emit('user-send-message',  $('#txtMessage').val());
    });

    $('#txtMessage').focusin(function(){
        socket.emit('toi-dang-go-chu');
    });
    $('#txtMessage').focusout(function(){
        socket.emit('toi-stop-go-chu');
    });
});