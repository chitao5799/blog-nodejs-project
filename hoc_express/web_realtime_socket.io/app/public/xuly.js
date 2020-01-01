var socket=io('https://appnct99.herokuapp.com');
    socket.on('server-gui-ds',function(data){
        $('#ds').html('');
        data.map(function(hovien,index){
            $('#ds').append(`
                    <div class="hocvien">
                    <div class="hang1">id: `+(index+1)+` || <span> `+hovien.hoten +`</span></div>
                    <div class="hang2">`+hovien.email +`  -  `+hovien.sodt+`</div>
                </div>
            `);
        });
    });

$('document').ready(function(){
    $('#btnRegister').click(function(){
        socket.emit('hoc-vien-gui-thongtin',
        {hoten:$('#txtHoten').val(),
        email:$('#txtEmail').val(),
        dt:$('#txtSoDt').val()}
        );
    });
});