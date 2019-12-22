var EventEmitter=require('events');
var util=require('util');

function Dialog(){
    this.message='hello world';
}
util.inherits(Dialog,EventEmitter);

Dialog.prototype.sayHello=function(){
    console.log(this.message);
    this.emit('hello');
}

var dialog=new Dialog();
dialog.on('hello',function(){
    console.log('có 1 lời chào mới');
});
dialog.sayHello('Mai hoa');
//truyền tham số vào ko thấy ý nghĩa gì và ko có vẫn chạy
/*kq:hello world
    có 1 lời chào mới
*/