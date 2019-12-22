var EventEmitter=require('events');
var util=require('util');

function Dialog(){
   // EventEmitter.call(this);/**hàm khởi tạo của evnet emitter sẽ làm áp dụng với dialog */
    this.message='hello world';
}
util.inherits(Dialog,EventEmitter);

Dialog.prototype.sayHello=function(data){
    console.log(this.message+" "+data);
    var a=12345;
    this.emit('hello',data,a);
}

var dialog=new Dialog();
dialog.on('hello',function(data,data2){
    console.log('có 1 lời chào mới: ',data,data2);
});
dialog.sayHello('Mai hoa');
