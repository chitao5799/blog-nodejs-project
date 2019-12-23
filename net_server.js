//chạy trên cmd trước file net_client.js
const net = require('net');  
var server = net.createServer((socket) => {  
  socket.write('xin chào client\n');
  socket.end('goodbye\n');  
}).on('error', (err) => {  
  // handle errors here  
  throw err;  
});  
// grab a random port.  
server.listen(() => {  //3000,
  address = server.address();  
  console.log('opened server on %j', address);  
});  