const dns = require('dns');  
dns.lookup('www.google.com', (err, addresses, family) => {  
  console.log('addresses:', addresses);//172.217.24.196  
  console.log(family);//4
});  