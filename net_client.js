//chạy trên cmd sau file net_server.js ở cửa sổ khác
const net = require('net');  
const client = net.connect({port:57713}, () => {//use same port of server,khi chạy server sẽ hiện port  
  console.log('connected to server!');  
  client.write('world!\r\n');  
});  
client.on('data', (data) => {  
  console.log(data.toString());  
  client.end();  
});  
client.on('end', () => {  
  console.log('disconnected from server');  
});  