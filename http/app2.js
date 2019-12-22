var http=require('http');
//resquest: là đối tượng chứa những thông tin gửi từ client lên,nhận cái tham số nào, method nào,url là gì
//response là đối tượng trả lại nội dung cho client
var server =http.createServer(function(request,response){
    console.log(request.url);
    console.log(request.method);
    var data={
        'status':200,
        "message":'this is message',
        'err':false
    }
    //return json data
    response.writeHead(200,{"Content-Type":"application/json"});
    response.write(JSON.stringify(data));
    response.end();
});
server.listen(3000,function(){
    console.log('server is running on port 3000');
});
