// //chạy trên cmd trước file net_client.js
// const net = require('net');  
// var server = net.createServer((socket) => {  
//   socket.write('xin chào client\n');
//   var x='xin chào thử gửi tin';
  
//   socket.end('goodbye\n');  
// }).on('error', (err) => {  
//   // handle errors here  
//   throw err;  
// });
// // //----nháp
// // var x='xin chào thử gửi tin từ server';
// // server.emit('gui_data',x);
// //----
// // grab a random port.  
// server.listen(3000,() => {  //3000,
//   address = server.address();  
//   console.log('opened server on %j', address);  
// });  
///---------------

var http = require('http');
var fs = require('fs');
var url = require('url');

// Create a server
http.createServer( function (request, response) {  
   // Parse the request containing file name
   var pathname = url.parse(request.url).pathname;
   
   // Print the name of the file for which request is made.
   console.log("Request for " + pathname + " received.");
   
   // Read the requested file content from file system
   fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         console.log(err);
         
         // HTTP Status: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      } else {	
         //Page found	  
         // HTTP Status: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});	
         
         // Write the content of the file to response body
         response.write(data.toString());		
      }
      
      // Send the response body 
      response.end();
   });   
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');