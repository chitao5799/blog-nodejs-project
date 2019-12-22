var http=require('http');
var fs=require('fs');
http.createServer(function(request,response){
    if(request.url=='/'){
        // response.writeHead(200,{'content-Type':'text/html'});
        // response.write('<html><body> <p> This is home page</p></body></html>');
       fs.readFile('./index.html','utf8',function(err,data){
            response.writeHead(200,{'Context-Type':'text/html'});
            response.write(data);//hoặc write(data.toString())
            response.end();//kết thúc respond
       });
        
    }
    else if(request.url=='/student'){
        response.writeHead(200,{'content-Type':'text/html'});
        response.write('<html><body> <p> This is student page</p></body></html>');
        response.end();
    }else{
        response.writeHead(404);
        response.write('invalid request!');
        response.end('404 not found!');
    } 
}).listen(8000);
console.log('server running at 127.0.0.1:');