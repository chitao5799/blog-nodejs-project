//tự xây dựng event riêng
function Emitter(){
    this.events={};
}
Emitter.prototype.on=function (type,listener){
    //.events[type] không phải là mảng, mà là truy cập vào value của object events có key là type
    this.events[type]=this.events[type] || [];//value của events là mảng []
    this.events[type].push(listener);
}
Emitter.prototype.emit=function(type){
    if(this.events[type])
    {
        // for(var e in this.events)
        //   console.log("key: ",e," ;value: ",this.events[e]);//key:  bad  ;value:  [ [Function], [Function] ]
        this.events[type].forEach(listener => {
            listener();//duyet mang và gọi hàm
        });
    }
}
module.exports=Emitter;