var emitter=require('events').EventEmitter;
function LoopProcessor(num){
    var e=new emitter();
    setTimeout(function(){
        for(var i=1;i<=num;i++){
            e.emit("beforeProcess",i);
            console.log('processing ....',i);
            e.emit('AfterProcess',i);
        }
    },2000);
    return e;
}
var lp=LoopProcessor(3);
lp.on('beforeProcess',function(data){
    console.log('about to start the process for ',data);
});
lp.on('AfterProcess',function(data){
    console.log('complete the process for ',data);
});