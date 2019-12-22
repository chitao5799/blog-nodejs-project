var util=require("util");
var name='hoa';
var message=util.format("hello, %s",name);

console.log(message);
util.log(message);

console.log(util.isArray([]));
console.log(util.isArray(new Array));
console.log(util.isArray({}));