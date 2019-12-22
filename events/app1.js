var Emitter=require('events');
var eventConfig=require('./config').events;

var emitter=new Emitter();
emitter.on(eventConfig.BAD_SCORE,function(){
    console.log('một môn nào đó đã bị điểm kém');
});
emitter.on(eventConfig.BAD_SCORE,function(){
    console.log("đã có điểm kém, cần phát thông báo tới phụ huynh");
});
//có 1 bảng điểm
var scores=[10,4];
for(var s of scores){
    if(s<5){
        console.log('điểm thấp quá',s);
        emitter.emit("bad");
    }
    //insert db
}
