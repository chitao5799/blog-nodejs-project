const crypto = require('crypto');  
const secret = 'abcdefg';  
const hash = crypto.createHmac('sha256', secret)  
                   .update('Welcome to world')  
                   .digest('hex');  
console.log(hash);  
//858d4390f469d69a4325618cb6157f9bf73d8e37caf77244918f8af94385244f